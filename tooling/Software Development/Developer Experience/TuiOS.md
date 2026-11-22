---
date_created: 2026-11-15
date_modified: 2026-11-19
aliases:
  - tuios
url: https://tuios.dev/
tags:
  - Multiplexers
  - Agentic-Engineering
  - Graph-Engineering
  - Check-It-Out
  - Influencer-Favorites
  - Developer-AI
  - Developer-Tools
  - Developer-Agents
  - Window-Managers
  - Tiling-Managers
og_title: "tuios: a terminal window manager that knows what your agents are doing"
og_description: tuios is a terminal window manager with tiling, sessions that keep running when you detach, and one Inbox for what the coding agents in your panes are waiting on.
og_image: https://tuios.dev/og/site/image.png
og_favicon: https://tuios.dev/favicon.ico
og_site_name: tuios
authors:
  - Gaurav Gosain
og_published: 2026-11-11T00:00:00.000Z
og_last_fetch: 2026-11-19T08:17:55.356Z
site_uuid: 5bfca614-99e3-4508-843e-41183c81d4e3
publish: true
title: TuiOS
slug: tuios
at_semantic_version: 0.0.0.1
cf_last_run: 2026-11-19T08:20:08.204Z
cf_last_run_model: Perplexity sonar-pro
---

[[Vocabulary/Command-Line Interfaces|Terminal User-Interfaces]]
[[concepts/Explainers for Tooling/Terminal Multiplexers|Multiplexer]]


https://youtu.be/mSycusZaVdo?si=n8ceshzbM0NTv81w

## Value Proposition & Features

TuiOS is a terminal window manager for tiling panes across nine workspaces, with a daemon that keeps sessions running after detachment and can connect to other machines. [^0ls0g1] It is aimed at agent-assisted development by detecting coding agents, showing whether they are working, waiting, or done, and collecting approvals, questions, and failures in one Inbox. [^0ls0g1]

- **Persistent sessions:** The daemon owns the PTYs, so programs continue running after the terminal closes. [^0ls0g1]
- **Tiling and layouts:** Supports BSP splits, master-stack, scrolling columns, floating windows, and mouse-driven tiling. [^0ls0g1]
- **Agent Inbox:** Centralizes agent approvals, questions, and failures, with actions to answer, snooze, dismiss, or undo. [^0ls0g1]
- **Agent workflows:** Supports diffs, per-agent worktrees, and task-board cards. [^0ls0g1]
- **Remote machines:** Links sessions across machines and routes remote-agent activity into the local rail and Inbox. [^0ls0g1] [^jcqqo7]
- **Automation protocol:** Provides `send-keys`, `capture-pane`, `wait-for`, JSON control, and tape replay. [^0ls0g1]
- **Terminal interface:** Includes kitty graphics passthrough, Vim-style copy mode, a command palette, 340+ themes, and a browser terminal. [^0ls0g1]

Architecturally, TuiOS separates the host terminal, dock and sidebar, scratch terminal, panes, pane cells, and the daemon that owns the programs. [^0ls0g1] Its TML system lets scripts, plugins, and agents render validated markup into themed terminal surfaces, using separate Go libraries for parsing, layout, and charts. [^ft4kcj]

## Screenshots

![TuiOS screenshot 1](https://tuios.dev/shots/release-0110-sketch.webp)
*Source: [tuios.dev](https://tuios.dev/releases/v0-11-0)*

![TuiOS screenshot 2](https://tuios.dev/libs/loom/depth-16.webp)
*Source: [tuios.dev](https://tuios.dev/blog/an-agent-writes-markup-and-tuios-draws-it)*

![TuiOS screenshot 3](https://tuios.dev/releases/v0.8.0/themes-vertical.jpg)
*Source: [tuios.dev](https://tuios.dev/releases/v0-8-0)*

## Product Roadmap / Announcements

As of November 18, 2026, publicly visible product announcements include:

- **November 14, 2026 — v0.13.1:** Added an autonomous task board, child agents, cross-machine starts, live daemon upgrades that preserve panes, custom actions and menus, faster frames, richer quick look, and three new Go libraries. [^18h4rt]
- **November 5, 2026 — Remote machine setup:** `tuios hosts setup` automated SSH-based installation and startup, with categorized SSH failure guidance. [^jcqqo7]
- **October 31, 2026 — v0.12.1:** The release page stated that TuiOS lives at tuios.dev and the GitHub repository `Gaurav-Gosain/tuios`. [^igi64n]
- **October 30, 2026 — v0.12.0:** Added file quick look and drag-and-drop into panes, an agent task board, the Settled shelf, calm mode, return notes, and a live terminal in the rail. [^suar6u]
- **October 21, 2026 — Plugin security:** Added Git-installed plugins, lockfile pinning, declared grants, and daemon-enforced process permissions. [^9duy91]
- **October 21, 2026 — TML surfaces:** Introduced agent- and program-generated terminal UIs through validated TML documents and themed rendering. [^ft4kcj]

## Recent Developments

The latest available releases show rapid expansion from terminal multiplexing into agent orchestration, with v0.13.1 adding automated task dispatch, child agents, remote execution, and live upgrades. [^18h4rt] Plugin permissions, TML-rendered interfaces, and cross-machine session management are also recent development themes. [^9duy91] [^ft4kcj] [^jcqqo7]

# History and Origin Story

No reliable source found for TuiOS’s founding date, founder biography, or origin story. The available official material identifies the project’s GitHub repository as `Gaurav-Gosain/tuios` and presents its evolution through releases and engineering posts. [^igi64n]

## Notable Team Members

The available official results identify the GitHub repository owner as Gaurav Gosain, but do not provide a reliable biography, role description, or broader leadership roster. [^igi64n]

# Market Sizing

## Category, Market Size, and Category Growth

TuiOS fits the categories of **terminal multiplexers**, **terminal window managers**, and **agentic-development tooling**, based on its tiling, persistent-session, PTY-management, agent-status, Inbox, and task-board capabilities. [^0ls0g1] [^suar6u] [^18h4rt] No reliable market-size or category-growth estimate specific to TuiOS was found.

## Competitive Landscape

### Who it's for, who it's not for

TuiOS is for developers who run multiple terminal processes or coding agents and need persistent sessions, structured tiling, agent-state visibility, centralized approvals, task dispatch, and optional remote-machine access. [^0ls0g1] [^18h4rt] [^jcqqo7] The strongest fit is agent-heavy software development rather than occasional command-line use.

It is not clearly aimed at users seeking only a lightweight traditional multiplexer, nor is there evidence in the available results that it targets non-developer workflows, enterprise procurement, or a paid managed service.

### Viable Alternatives

- **tmux:** A conventional terminal multiplexer and likely baseline alternative for persistent sessions and pane management; TuiOS differentiates through integrated agent awareness and an Inbox.[[concepts/Explainers for Tooling/Terminal Multiplexers|Terminal Multiplexers]] [^0ls0g1]
- **GNU Screen:** A traditional terminal multiplexer alternative for persistent shell sessions.
- **Zellij:** A modern terminal multiplexer alternative for panes, layouts, and persistent terminal workflows.
- **iTerm2 or Kitty:** Terminal applications that provide pane or window workflows but do not appear in the available results to offer TuiOS’s integrated agent Inbox and daemon model.
- **Agent-specific developer environments:** Tools centered on coding-agent orchestration may overlap with TuiOS’s task board, child-agent, and dispatch features. [^18h4rt]

### Competitor Table

| Competitor | Description |
|---|---|
| [tmux](https://github.com/tmux/tmux) | Traditional terminal multiplexer focused on persistent sessions and panes. |
| [GNU Screen](https://www.gnu.org/software/screen/) | Long-established terminal multiplexer for detachable shell sessions. |
| [Zellij](https://zellij.dev/) | Modern terminal multiplexer with pane and layout workflows. |
| [Kitty](https://sw.kovidgoyal.net/kitty/) | Feature-rich terminal emulator with pane-oriented workflows; the available TuiOS material specifically mentions Kitty graphics passthrough rather than integration with Kitty itself. [^0ls0g1] |
| [iTerm2](https://iterm2.com/) | macOS terminal emulator with window and pane workflows, but no evidence in the available results of TuiOS-style agent-state and Inbox features. |


***

# Sources

[1]: 2026, Oct 25. [tuios.dev](https://tuios.dev/). [v0.11.0 | tuios](https://tuios.dev/releases/v0-11-0). Updated: 2026, Oct 28. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^0ls0g1]: 2026, Oct 26. [tuios.dev](https://tuios.dev/). [tuios: a terminal window manager that knows what your agents are doing](https://tuios.dev/?ref=blog.twms.ai). Updated: 2026, Nov 18. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[3]: 2026, Oct 26. [tuios.dev](https://tuios.dev/). [v0.11.1 | tuios](https://tuios.dev/releases/v0-11-1). Updated: 2026, Oct 30. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^suar6u]: 2026, Oct 30. [tuios.dev](https://tuios.dev/). [v0.12.0 | tuios](https://tuios.dev/releases/v0-12-0). Updated: 2026, Nov 09. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^igi64n]: 2026, Oct 31. [tuios.dev](https://tuios.dev/). [v0.12.1](https://tuios.dev/releases/v0-12-1). Updated: 2026, Nov 15. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^9duy91]: 2026, Oct 21. [tuios.dev](https://tuios.dev/). [Plugins that ask before they act - tuios](https://tuios.dev/blog/plugins-that-ask-before-they-act). Updated: 2026, Nov 09. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^ft4kcj]: 2026, Oct 21. [tuios.dev](https://tuios.dev/). [An agent writes markup, and tuios draws it](https://tuios.dev/blog/an-agent-writes-markup-and-tuios-draws-it). Updated: 2026, Nov 18. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^18h4rt]: 2026, Nov 14. [tuios.dev](https://tuios.dev/). [v0.13.1](https://tuios.dev/releases/v0-13-1). Updated: 2026, Nov 18. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[9]: 2026, Oct 21. [tuios.dev](https://tuios.dev/). [Restarting the daemon without losing your place | tuios](https://tuios.dev/blog/restarting-the-daemon-without-losing-your-place). Updated: 2026, Nov 18. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
[^jcqqo7]: 2026, Nov 05. [tuios.dev](https://tuios.dev/). [Adding a machine in one command](https://tuios.dev/blog/adding-a-machine-in-one-command). Updated: 2026, Nov 09. Generated: 2026, Nov 19. [Perplexity](https://www.perplexity.ai/) API response.
