---
title: "Cmd+K para o Terminal com IA"
description: "Como trazer o fluxo Cmd+K do Cursor para qualquer shell usando um CLI de IA apenas como sugeridor."
lang: "pt"
canonicalSlug: "terminal-cmd-k"
pubDate: 2025-12-18T18:04:02-03:00
tags: ["ai", "shell", "zsh"]
---

IDEs modernas com IA, como o Cursor, popularizaram um ótimo modelo de interação:

> Aperte **Cmd+K**, descreva em linguagem natural o que quer fazer e receba um comando pronto para executar.

Este artigo mostra como trazer **esse mesmo UX para um terminal comum**, usando um CLI de IA (neste exemplo, `codex-cli`), **sem agentes, sem TUI, sem autoexecução e sem confiar no modelo para tocar no seu filesystem**.

O resultado é um padrão **nativo do shell, seguro e extensível**, que pode ser reaproveitado com **qualquer CLI de IA**.

## O problema

A maioria dos CLIs de IA hoje assume um *agent model*:
- executam comandos de shell
- modificam arquivos
- instalam pacotes
- escalam privilégios

Isso é extremamente poderoso — e extremamente perigoso.

Queremos algo diferente:

- IA como **motor de sugestão**
- o shell como **autoridade de execução**
- um **humano no circuito**
- sem efeitos colaterais automáticos

## A ideia central

Queremos um fluxo assim:

1. Aperte **Cmd+K** ou **Cmd+J**
2. Digite o que quer fazer (em linguagem natural — pode ser em português; vai ficar estranho no prompt, mas vai funcionar)
3. Pressione Enter
4. A linha do terminal é preenchida com um comando de shell
5. Você revisa e decide se executa

**Nada é executado automaticamente.**

Isso espelha o comportamento do Cursor / Warp, mas funciona em **qualquer terminal + shell**.

## Visão geral da arquitetura

Dividimos a solução em camadas:

```
┌──────────────┐
│  Keybinding  │  Cmd+K / Cmd+J
└──────┬───────┘
       │
┌──────▼───────┐
│  Shell (ZLE) │  UX, estado, segurança
└──────┬───────┘
       │
┌──────▼───────┐
│   AI CLI     │  Linguagem natural → comando (apenas texto)
└──────────────┘
```

### Separação de responsabilidades

- O shell controla UX e execução
- A IA apenas gera texto
- Nada de lógica de agente no shell
- Nada de lógica de shell na IA

Essa separação mantém a abordagem segura e portátil.

## Modos: Plain vs Explain

Dois modos explícitos:

| Atalho | Modo | Comportamento |
|--------|------|---------------|
| **Cmd+K** | Plain | Gera apenas o comando |
| **Cmd+J** | Explain | Gera o comando e explica |

O modo atual fica visível:

```text
cmdx>             # plain
cmdx explain>     # explain
```

Exemplo

Entrada do usuário:
```bash
cmdx explain> list only files in this directory that contain numbers

# Saída explicação (stderr):

Command parts:
  find
    .              → current directory
    -maxdepth 1    → do not recurse
    -mindepth 1    → skip the directory itself
    -printf '%f\n' → print file names only

  |
    pipe output to grep

  grep
    -E             → extended regex
    '[0-9]'        → match any digit

Notes:
  - Read-only operation
  - -printf may not exist on BSD/macOS

Command inserted into the terminal line:

find . -maxdepth 1 -mindepth 1 -printf '%f\n' | grep -E '[0-9]'
```

Nada roda até você pressionar Enter de novo.

## O núcleo cmdx.sh (IA → gerador de comando)

A integração com o shell depende de um script pequeno e agnóstico chamado cmdx.sh.

Responsabilidades (deliberadamente estreitas):
- receber um pedido em linguagem natural
- chamar um CLI de IA
- devolver um único comando de shell em stdout
- opcionalmente imprimir uma explicação estruturada em stderr
- nunca executar nada

Como essa lógica fica isolada, você pode trocar o backend de IA depois sem tocar na integração do shell.

Abaixo, troque `codex exec` em `RAW` pelo seu CLI preferido — apenas mantenha o contrato de emitir exatamente um comando em stdout.

```bash
#!/usr/bin/env bash
set -euo pipefail

EXPLAIN=0
VERBOSE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --explain) EXPLAIN=1; shift ;;
    --verbose) VERBOSE=1; shift ;;
    *) break ;;
  esac
done

PROMPT="$*"
[[ -z "${PROMPT// }" ]] && {
  echo "usage: cmdx [--explain] <request>" >&2
  exit 2
}

SYS_RULES=$'You generate shell commands.\n\
- Output exactly ONE command, on a single line.\n\
- Output ONLY the command.\n\
- No markdown, no quotes, no commentary.\n\
- Do NOT ask questions.\n\
- If ambiguous, choose a safe default.\n\
- Avoid destructive actions unless explicitly requested.'

CTX=$'Context:\n\
- OS: '"$(uname -srm)"$'\n\
- Shell: '"$(basename "${SHELL:-unknown}")"$'\n\
- CWD: '"$(pwd)"

CODEX_FLAGS=${CMDX_CODEX_FLAGS:-"--sandbox read-only --skip-git-repo-check"}

RAW="$(
  codex exec $CODEX_FLAGS \
    "$SYS_RULES"$'\n\n'"$CTX"$'\n\nRequest: '"$PROMPT"
)"

COMMAND="$(
  printf "%s\n" "$RAW" |
  sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' |
  awk 'NF{print; exit}'
)"

[[ -z "$COMMAND" ]] && {
  echo "error: no command generated" >&2
  exit 3
}

if [[ "$EXPLAIN" -eq 1 ]]; then
  EXPL_PROMPT=$'Explain the following shell command.\n\n\
Rules:\n\
- Explain each command, flag, and parameter separately.\n\
- Explain pipes and redirections explicitly.\n\
- Use short bullet-style lines.\n\
- No markdown.\n\
- No filler text.\n\n\
Structure:\n\
Command parts:\n\
  <command>\n\
    <flag> → <meaning>\n\n\
Notes:\n\
  <optional safety or portability notes>\n\n\
Command:\n'"$COMMAND"

  codex exec $CODEX_FLAGS "$EXPL_PROMPT" >&2
  echo >&2
fi

echo "$COMMAND"
```

Deixe executável com `chmod +x cmdx.sh`.

## Integração no Zsh (ZLE)

A integração com o shell usa widgets do ZLE (Zsh Line Editor) para criar um UX modal e seguro.
- Cmd+K entra no modo plain
- Cmd+J entra no modo explain
- Enter confirma
- Esc cancela

Adicione ao seu `~/.zshrc`:

```zsh
cmdx_generate() { /root/cmdx.sh "$*"; }
cmdx_generate_explain() { /root/cmdx.sh --explain "$*"; }

CMDX_ACTIVE=0
CMDX_MODE="plain"
CMDX_PREFIX_PLAIN="cmdx> "
CMDX_PREFIX_EXPLAIN="cmdx explain> "

cmdx_enter_plain() {
  zle -I
  CMDX_ACTIVE=1
  CMDX_MODE="plain"
  BUFFER="$CMDX_PREFIX_PLAIN"
  CURSOR=${#BUFFER}
}
zle -N cmdx_enter_plain

cmdx_enter_explain() {
  zle -I
  CMDX_ACTIVE=1
  CMDX_MODE="explain"
  BUFFER="$CMDX_PREFIX_EXPLAIN"
  CURSOR=${#BUFFER}
}
zle -N cmdx_enter_explain

bindkey -M emacs '^[k' cmdx_enter_plain
bindkey -M emacs '^[j' cmdx_enter_explain

cmdx_run() {
  local prompt cmd

  if [[ "$CMDX_MODE" == "explain" ]]; then
    prompt="${BUFFER#$CMDX_PREFIX_EXPLAIN}"
  else
    prompt="${BUFFER#$CMDX_PREFIX_PLAIN}"
  fi

  CMDX_ACTIVE=0
  BUFFER=""
  zle redisplay

  [[ -z "${prompt// }" ]] && return 0

  if [[ "$CMDX_MODE" == "explain" ]]; then
    cmd="$(cmdx_generate_explain "$prompt")" || return 1
  else
    cmd="$(cmdx_generate "$prompt")" || return 1
  fi

  BUFFER="$cmd"
  CURSOR=${#BUFFER}
}

cmdx_accept_line() {
  if [[ "$CMDX_ACTIVE" -eq 1 ]]; then
    cmdx_run
  else
    zle .accept-line
  fi
}
zle -N accept-line cmdx_accept_line

cmdx_cancel() {
  if [[ "$CMDX_ACTIVE" -eq 1 ]]; then
    CMDX_ACTIVE=0
    BUFFER=""
    zle redisplay
  else
    zle .send-break
  fi
}
zle -N send-break cmdx_cancel
```
