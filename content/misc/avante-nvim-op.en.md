---
title: "Integrating <span>Avante.nvim</span> with <span>1Password CLI</span>"
description: "Integrating Avante.nvim with 1Password"
date: 2025-02-18T10:42:45-03:00
showTableOfContents: true
showDate: true
tags: ["nvim", "vim", "ai", "1password"]
categories:
- VIM 
---

In the Neovim world, plugins that add advanced functionalities sometimes require integration with external services. An interesting example is **avante.nvim**, a plugin that provides support for artificial intelligence providers (like Claude or others) to assist in code editing and message writing.

Avante.nvim requires an API key to communicate with the AI service. Initially, the idea was to set this key as a global environment variable; however, this wasn't ideal for two reasons:

1. **Security and Organization:** We don't want to expose the API key globally, as it could be unnecessarily accessed by other plugins or processes.
2. **Performance:** If we configured the plugin to fetch the key during Neovim initialization, we would end up making a call to the 1Password CLI (the `op` command) every time we opened the editor – which delays startup.

To solve these problems, we started loading the plugin lazily (only when really necessary) and, consequently, executing the `op` command only when the plugin is effectively used.

## What is Avante.nvim?

**Avante.nvim** is a Neovim plugin that integrates artificial intelligence tools to offer suggestions, autocompletion, and even help with code writing. It supports different providers, such as Claude, and allows customization of behaviors, mappings, and other functionalities.

## What is `op` (1Password CLI)?

The `op` command refers to the 1Password command-line tool, which allows you to access and manage your secrets (like passwords and tokens) directly from the terminal. In our case, we use `op read "op://<vault>/<item>/<field_name>"` to obtain the API key needed for avante.nvim. This approach is secure as it avoids storing the key in configuration files permanently or globally in the Neovim environment.

## Initial Problem

Initially, the API key was obtained during Neovim's initialization phase using the `init` block of the lazy.nvim configuration. This caused the `op` command to be executed every time Neovim was opened, even if the plugin wasn't used at that moment. Such behavior not only delayed startup but also generated unnecessary calls to the 1Password CLI.

## The Solution: Lazy Loading and Conditional Execution

To solve the problem, we moved the API key retrieval call inside the plugin's `config` block and configured the plugin to load only when a specific command (`AvanteAsk`) is called. This way, the `op` command is only executed when the user actually uses the plugin.

### Configuration Example

**Plugin configuration file (`nvim/lua/plugin/avante.lua`):**

### Command Execution Mapping

To facilitate plugin usage, a keymap was created that directly calls the `AvanteAsk` command, since as it's not loaded at startup, the keymaps are not yet available. As the plugin is configured with lazy-loading via `cmd`, when invoking the command, the plugin is automatically loaded, and the 1Password CLI call happens only at that moment.

**Keymaps file (keymap.lua):**

*Explanation:*  
- `<cmd>AvanteAsk<CR>`: Executes the `AvanteAsk` command when pressing `<leader>aa`.  
- `<CR>` represents "Carriage Return" (Enter), which confirms the command execution.

## Conclusion

This lazy-loading approach allows avante.nvim, along with obtaining the API key via 1Password CLI, to be loaded only when necessary. This significantly improves Neovim's startup time and maintains security by avoiding global key exposure.

Solution summary:
- **Lazy Loading:** We configured the plugin to load only when a specific command is called (in this case, `AvanteAsk`).
- **On-Demand Execution:** The `op` command call to fetch the API key was moved to the `config` block, ensuring it only occurs when the plugin is used.
- **Simple Keymap:** A keymap (`<leader>aa`) was created to invoke the `AvanteAsk` command, triggering automatic plugin loading.

This solution demonstrates how to intelligently integrate advanced functionalities in Neovim while maintaining configuration performance and security.

### Demonstration

<video width="800" controls autoplay>
    <source src="/video/avante-op.mov" type="video/mp4">
</video>

## Final Thoughts

With this approach, we've managed to optimize Neovim's performance and ensure that API key access via 1Password CLI only happens when necessary. This method not only improves editor startup time but also maintains the security and organization of your configuration, avoiding global API key exposure.

I hope this article helps you understand and implement similar solutions in your Neovim projects!
