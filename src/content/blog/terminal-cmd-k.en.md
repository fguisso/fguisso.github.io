---
title: "Cmd+K for the IA Terminal"
description: "How to bring Cursor-style Cmd+K to any shell using an AI CLI as a suggester only."
lang: "en"
canonicalSlug: "terminal-cmd-k"
pubDate: 2025-12-18T18:04:02-03:00
tags: ["ai", "shell", "zsh"]
---

Modern AI IDEs like Cursor popularized a great interaction model:

> Press **Cmd+K**, describe what you want in natural language, and get a command ready to run.

This article shows how to bring **that exact UX to a plain terminal**, using an AI CLI (in this example, `codex-cli`), **without agents, without TUI, without auto-execution, and without trusting the model to touch your filesystem**.

The result is a **shell-native, safe, extensible pattern** that can be reused with **any AI CLI**.

## The Problem

Most AI CLIs today default to an *agent model*:
- they execute shell commands
- modify files
- install packages
- escalate privileges

That is extremely powerful — and extremely dangerous.

What we want instead is:

- AI as a **suggestion engine**
- the shell as the **execution authority**
- a **human in the loop**
- no automatic side effects

## The Core Idea

We want a workflow like this:

1. Press **Cmd+K** or **Cmd+J**
2. Type what you want to do (in natural language)
3. Press Enter
4. The terminal line is filled with a shell command
5. You review it and decide whether to execute

**Nothing is executed automatically.**

This mirrors Cursor / Warp behavior, but works in **any terminal + shell**.

## Architecture Overview

The solution is intentionally split into layers:

```
┌──────────────┐
│  Keybinding  │  Cmd+K / Cmd+J
└──────┬───────┘
       │
┌──────▼───────┐
│  Shell (ZLE) │  UX, state, safety
└──────┬───────┘
       │
┌──────▼───────┐
│   AI CLI     │  Natural language → command (text only)
└──────────────┘
```

### Separation of concerns

- The shell owns UX and execution
- The AI only generates text
- No agent logic in the shell
- No shell logic in the AI

This separation is what makes the approach safe and portable.

## Modes: Plain vs Explain

We support two explicit entry modes:

| Shortcut | Mode | Behavior |
|--------|------|----------|
| **Cmd+K** | Plain | Generate the command only |
| **Cmd+J** | Explain | Generate the command and explain it |

The current mode is always visible:

```text
cmdx>             # plain
cmdx explain>     # explain
```

Example

User input:
```bash
cmdx explain> list only files in this directory that contain numbers

Explanation output (stderr):

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

Nothing runs until you press Enter again.

## The cmdx.sh Core (AI → Command Generator)

The shell integration depends on a small, shell-agnostic script called cmdx.sh.

Its responsibilities are intentionally narrow:
- accept a natural language request
- call an AI CLI
- return only one shell command on stdout
- optionally print a structured explanation on stderr
- never execute anything

Because this logic is isolated, you can replace the AI backend later without touching the shell integration.

Below, swap `codex exec` in `RAW` for your preferred AI CLI—just keep the contract of emitting exactly one command on stdout.

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

Make it executable with `chmod +x cmdx.sh`.

## Zsh Integration (ZLE)

The shell integration uses ZLE (Zsh Line Editor) widgets to create a modal, safe UX.
- Cmd+K enters plain mode
- Cmd+J enters explain mode
- Enter confirms
- Esc cancels

Add this to your `~/.zshrc`:

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
