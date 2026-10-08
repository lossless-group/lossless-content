---
site_uuid: 4e9f39a8-7c54-4a37-a541-90f7735710d3
date_created: 2025-03-08
date_modified: 2026-10-07
url: https://neovim.io/
reddit_forum_url: https://www.reddit.com/r/neovim/
og_title: Neovim
og_description: Hyperextensible Vim-based text editor
og_image: https://raw.githubusercontent.com/neovim/neovim.github.io/master/logos/neovim-logo-social-preview.png
og_url: https://neovim.io/index.html
og_last_fetch: 2025-05-29T13:27:18.571Z
site_name: Neovim
title: Neovim
description: Hyperextensible Vim-based text editor
tags:
  - Text-Editors
  - Check-It-Out
  - Influencer-Favorites
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__Neovim.svg?updatedAt=1754477375821
cf_last_run: 2026-10-07T04:33:33.190Z
cf_last_run_model: Perplexity sonar-pro
---


[[lost-in-public/up-and-running/Up and Running with Neovim|Up and Running with Neovim]]

https://youtu.be/6pAG3BHurdM?si=JC4khGXrUeQqBxZ-

https://youtu.be/GKQ9rJ12hjc?si=Mvon7Rc49XxdEZjt

https://youtu.be/pCzSPHrLBoU?si=RliItlJ36NmA0dmS

https://youtu.be/g1gyYttzxcI?si=7mlGyiZNW6-117ud

https://youtu.be/cNK5kYJ7mrs?si=ONhwQ_JinmAmn6fd

https://youtu.be/SuKhJlqGb5A?si=SSKQL46usCUTF2Sj

https://youtu.be/BVyrXsZ_ViA?si=Pb9Of_DDv9kfL7Ks

https://youtu.be/5Welk51oDWs?si=dxG0pNQlfruCFV4E

https://youtu.be/fvRwG17XsaA?si=QUwYWOKevu4AX6Wn

# Neovim

## Vault notes that already reference Neovim

Neovim is a terminal-based text editor and therefore fits the category of [[Vocabulary/Text User Interfaces|Text User Interfaces]]. Its editor integrations also support the [[concepts/Explainers for AI/Language Server Protocol|Language Server Protocol]], enabling language-aware development workflows.

## Value Proposition & Features

Neovim is a hyperextensible, Vim-based text editor designed around programmatic control, composability, and modern editor integrations. Its architecture separates the editor core from user interfaces: a built-in terminal UI is available, while external graphical clients can connect through the Nvim UI protocol. [^vua3s2]

Core capabilities include asynchronous jobs, programmable APIs, Lua-based configuration and extensions, terminal integration, and language-server support. Neovim can also support multiple UI clients connected to the same editor instance. [^vua3s2]

- **Extensibility:** Plugins and external clients can interact with Neovim through its API and UI protocol. [^vua3s2]
- **Terminal and graphical interfaces:** Neovim includes a built-in terminal UI and supports third-party GUIs. [^vua3s2]
- **Multiple UI clients:** Multiple interfaces can connect to the same Neovim instance. [^vua3s2]
- **Language-aware development:** Neovim supports integrations built around language servers and editor tooling.
- **Tree-sitter integration:** Active development includes range-aware direct-child iteration for syntax-tree nodes. [^moe3i7]
- **Multicursor support:** Recent development includes distinct coloring for extra Kitty terminal cursors. [^uza7ns]
- **Plugin tooling:** Recent work includes the built-in `vim.pack` plugin-management functionality. [^62vnkf]

## Screenshots

No three official screenshots were identified in the available search results.

## Product Roadmap / Announcements

As of **October 7, 2026**, the available results show ongoing development rather than a consolidated public roadmap.

- **September 26, 2026:** A Neovim issue documented a `vim.pack` installation failure caused by an inherited `GIT_INDEX_FILE` environment variable. [^62vnkf]
- **September 23, 2026:** A Tree-sitter issue proposed range-aware direct-child iteration for `TSNode`. [^moe3i7]
- **September 18, 2026:** A change added color support for extra Kitty multicursors. [^uza7ns]
- **September 12, 2026:** Neovim merged an update incorporating Vim 9.2.1068. [^gr2uik]

## Recent Developments

The most recent available results show active work on plugin installation, Tree-sitter traversal, terminal multicursor rendering, and synchronization with Vim updates. [^gr2uik] [^moe3i7] [^uza7ns] [^62vnkf]

# Market Sizing

## Category, Market Size, and Category Growth

Neovim fits the category of extensible text editors and developer tools. No reliable market-size or category-growth estimate specific to Neovim was found in the available search results.

## Pricing

| Tier | Price |
|---|---:|
| Neovim | Free; no paid tiers identified |

## Revenue Trajectory Estimates

No reliable source found for Neovim revenue or ARR.

# Competitive Landscape

## Who it's for, who it's not for

Neovim is suited to developers and technical users who prefer keyboard-driven editing, terminal workflows, programmable configuration, and integrations with external tools. Its UI protocol also supports users who want graphical clients while retaining the Neovim editing core. [^vua3s2]

It is less suited to users seeking a turnkey graphical editor with minimal configuration or users who do not want to learn modal editing and maintain an extensible development environment.

## Viable Alternatives

- **Vim:** The direct historical and architectural alternative, with Neovim retaining strong compatibility and incorporating changes from Vim. [^gr2uik]
- **Visual Studio Code:** A full-featured graphical development environment that can also act as a Neovim UI through `vscode-neovim`. [^vua3s2]
- **Emacs:** Another highly extensible editor and terminal-capable development environment.
- **Helix:** A modern modal terminal editor with built-in language-oriented workflows.
- **Sublime Text:** A commercial graphical text editor emphasizing speed and extensibility.

## Competitor Table

| Competitor | Description |
|---|---|
| [Vim](https://www.vim.org/) | The primary upstream and historical alternative to Neovim; Neovim’s recent development includes merges from Vim. [^gr2uik] |
| [Visual Studio Code](https://code.visualstudio.com/) | A graphical editor that can host Neovim through a dedicated integration, using VS Code as a Neovim UI. [^vua3s2] |
| [Emacs](https://www.gnu.org/software/emacs/) | A programmable editor competing for users who want a highly extensible development environment. |
| [Helix](https://helix-editor.com/) | A modal terminal editor positioned as a modern alternative to Vim-derived workflows. |
| [Sublime Text](https://www.sublimetext.com/) | A commercial graphical editor competing on responsiveness, usability, and plugin extensibility. |


***

# Sources

[1]: [Vvars - Neovim docs](https://neovim.io/doc/user/vvars/)
[^vua3s2]: [Gui - Neovim docs](https://neovim.io/doc/user/gui/)
[^gr2uik]: [Merge pull request #41876 from zeertzjq/vim-9.2.1068 · neovim/neovim@11d2f7a](https://github.com/neovim/neovim/commit/11d2f7a1caf69b16cdaf2ff8de4ead8c2be3bad4)
[^moe3i7]: [treesitter: support range-aware direct-child iteration for TSNode · Issue #42046 · neovim/neovim](https://github.com/neovim/neovim/issues/42046)
[^uza7ns]: [feat(multicursor): color extra Kitty cursors #41935 · neovim/neovim@9047ee1](https://github.com/neovim/neovim/commit/9047ee1460ede5aa8b0f0807c15bb554f5dcb8f1)
[^62vnkf]: [vim.pack: inherited GIT_INDEX_FILE makes plugin install silently fail · Issue #42113 · neovim/neovim](https://github.com/neovim/neovim/issues/42113)
