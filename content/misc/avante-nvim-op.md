---
title: "Integrando o <span>Avante.nvim</span> com o <span>1Password CLI</span>"
description: "Integrando o Avante.nvim com o 1Password"
date: 2025-02-18T10:42:45-03:00
showTableOfContents: true
showDate: true
tags: ["nvim", "vim", "ai", "1password"]
categories:
- VIM 
---

No mundo do Neovim, plugins que agregam funcionalidades avançadas podem, às vezes, exigir integrações com serviços externos. Um exemplo interessante é o **avante.nvim**, um plugin que oferece suporte a provedores de inteligência artificial (como Claude ou outros) para auxiliar na edição de código e na escrita de mensagens.

O avante.nvim requer o uso de uma chave de API para se comunicar com o serviço de IA. Inicialmente, a ideia era definir essa chave como uma variável de ambiente global; contudo, isso não era o ideal por dois motivos:

1. **Segurança e Organização:** Não queremos expor a chave de API globalmente, pois ela pode ser utilizada por outros plugins ou processos desnecessariamente.
2. **Performance:** Se configurássemos o plugin para buscar a chave na inicialização do Neovim, acabaríamos realizando uma chamada ao 1Password CLI (o comando `op`) a cada vez que abríssemos o editor – o que atrasa o startup.

Para resolver esses problemas, passamos a carregar o plugin de forma lazy (apenas quando realmente necessário) e, consequentemente, executar o comando `op` somente quando o plugin é efetivamente utilizado.

## O que é o Avante.nvim?

O **avante.nvim** é um plugin do Neovim que integra ferramentas de inteligência artificial para oferecer sugestões, autocompletar, e até mesmo ajuda na escrita de código. Ele suporta diferentes provedores, como Claude, e permite customizar comportamentos, mapeamentos e outras funcionalidades. 

## O que é o `op` (1Password CLI)?

O comando `op` refere-se à ferramenta de linha de comando do 1Password, que possibilita acessar e gerenciar seus segredos (como senhas e tokens) diretamente pelo terminal. No nosso caso, usamos o `op read "op://<vault>/<item>/<campo_do_item>"` para obter a chave de API necessária para o avante.nvim. Essa abordagem é segura, pois evita armazenar a chave em arquivos de configuração de forma permanente ou globalmente no ambiente do Neovim.

## Problema Inicial

Inicialmente, a chave de API era obtida na fase de inicialização do Neovim usando o bloco `init` da configuração do lazy.nvim. Isso fazia com que o comando `op` fosse executado a cada vez que o Neovim era aberto, mesmo se o plugin não fosse utilizado naquele momento. Tal comportamento não só atrasava o startup como também gerava chamadas desnecessárias ao 1Password CLI.

## A Solução: Lazy Loading e Execução Condicional

Para resolver o problema, movemos a chamada para obter a chave de API para dentro do bloco `config` do plugin e configuramos o plugin para ser carregado somente quando um comando específico (`AvanteAsk`) for chamado. Dessa forma, o comando `op` só é executado quando o usuário realmente utiliza o plugin.

### Exemplo de Configuração

**Arquivo de configuração do plugin (`nvim/lua/plugin/avante.lua`):**

```lua
return {
  "yetone/avante.nvim",
  cmd = { "AvanteAsk", "AvanteEdit", "AvanteRefresh", "AvanteToggle", "AvanteShowRepoMap" },
  version = false, -- Atualiza para a versão mais recente a cada mudança no código
  config = function()
    -- Chamada ao 1Password CLI para obter a chave da API apenas quando necessário
    local op = 'op read "op://<vault>/<item>/<campo_do_item>"'
    local token = vim.fn.system(op)
    token = vim.trim(token)
    vim.env.ANTHROPIC_API_KEY = token

    -- Carrega a biblioteca auxiliar do Avante e configura o plugin
    require("avante_lib").load()
    require("avante").setup({
      provider = "claude",
      claude = {
        endpoint = "https://api.anthropic.com",
        model = "claude-3-5-sonnet-20241022",
        temperature = 0,
        max_tokens = 4096,
      },
      behaviour = {
        enable_token_counting = true,
      },
    })
  end,
  
  ...
```
### Mapeamento para Executar o Comando

Para facilitar o uso do plugin, foi criado um keymap que chama diretamente o comando `AvanteAsk`, visto que como ele não é caregado no inicio, os keymaps ainda não estão disponiveis. Como o plugin está configurado com lazy-loading via `cmd`, ao invocar o comando, o plugin é carregado automaticamente, e a chamada ao 1Password CLI acontece somente nesse momento.

**Arquivo de keymaps (keymap.lua):**

```lua
vim.keymap.set("n", "<leader>aa", "<cmd>AvanteAsk<CR>", { desc = "Load and execute AvanteAsk" })
```

*Explicação:*  
- `<cmd>AvanteAsk<CR>`: Executa o comando `AvanteAsk` ao pressionar `<leader>aa`.  
- `<CR>` representa o "Carriage Return" (Enter), que confirma a execução do comando.

## Conclusão

Essa abordagem de lazy-loading permite que o avante.nvim, juntamente com a obtenção da chave de API via 1Password CLI, seja carregado apenas quando necessário. Isso melhora significativamente o tempo de startup do Neovim e mantém a segurança, evitando a exposição global da chave.

Resumo da solução:
- **Lazy Loading:** Configuramos o plugin para carregar somente quando um comando específico for chamado (neste caso, `AvanteAsk`).
- **Execução Sob Demanda:** A chamada ao comando `op` para buscar a chave de API foi movida para o bloco `config`, garantindo que ocorra somente na utilização do plugin.
- **Keymap Simples:** Um keymap (`<leader>aa`) foi criado para invocar o comando `AvanteAsk`, acionando o carregamento automático do plugin.

Essa solução demonstra como integrar de forma inteligente funcionalidades avançadas no Neovim, mantendo o desempenho e a segurança da configuração.

### Demonstração

<video width="800" controls autoplay>
    <source src="/video/avante-op.mov" type="video/mp4">
</video>

## Conclusão

Com essa abordagem, conseguimos otimizar a performance do Neovim e garantir que o acesso à chave de API via 1Password CLI aconteça somente quando necessário. Esse método não apenas melhora o tempo de startup do editor, mas também mantém a segurança e a organização da sua configuração, evitando expor a chave de API globalmente.

Espero que este artigo ajude você a entender e implementar soluções similares em seus projetos com Neovim!
