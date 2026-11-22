---
date_created: 2026-10-30
date_modified: 2026-11-21
title: Herdr App — The Agent Multiplexer Goes Native
slug: herdr-app-the-agent-multiplexer-goes-native
tags:
  - Developer-Tools
  - AI-Agents
  - Terminal-Emulators
  - Multiplexers
  - Claude-Code
  - libghostty
homepage: https://herdr.dev
github_repo_url: https://github.com/herdrdev/herdr-app
install: brew install --cask herdr-app
---

https://github.com/herdrdev/herdr-app

## Why This Matters

We covered [[herdr - Agent Multiplexer That Lives in Your Terminal|herdr]] back in May as a Rust TUI: tmux-style persistence, plus a column showing which agent is *blocked*, *working*, *done*, or *idle*. Herdr has now split into three pieces and shipped a **native desktop app**. It [hit Hacker News](https://news.ycombinator.com/item?id=50298436) on October 30, 2026 as "Herdr has released native app."

The new layout:

- **`herdr-core`**: the background server that actually runs terminals. Its CLI is `hc` (`hc ls`, `hc events`).
- **Herdr app** (`herdr-app`): a GPU-drawn window for macOS, Linux, and Windows, built on `libghostty-vt`. It arranges terminals. The core runs them.
- **herdr TUI** (`herdrdev/herdr`): the original terminal UI, still maintained (v0.9.5, October 14).

The project also moved from `ogulcancelik/herdr` to the `herdrdev` GitHub org, and the app is **Apache-2.0**. The repo has 3.3k stars, 86 contributors, and ships every few days. The current release is **0.1.16 (November 14)**.

## What It Actually Does

- **Spaces → tabs → panes.** A space holds work on one machine, usually one repo. An unnamed space follows its first terminal's folder.
- **Agents sidebar.** Collects agents from every space, including sub-agents started by another agent. It has a Priority view (blocked first, then just-done, then working) and pinning.
- **Close the window, agents keep running.** Since 0.1.12 the core runs as its own macOS app, so quitting or updating Herdr doesn't kill agents. After a reboot, panes come back with fresh shells in their last folders. The old programs don't come back.
- **Remote machines are first class.** Add an SSH host from your `~/.ssh/config`. Spaces on that machine run *there*, keep running when your laptop sleeps, and are addressable as `vps/t7`. Ctrl/Cmd-click an address an agent mentions to **peek** at that terminal.
- **Worktrees built in.** "New worktree" creates a checkout (default `~/.herdr/worktrees`, configurable as of 0.1.16) and groups it in the sidebar.
- **Mods and layouts.** Panels, menus, and dialogs are small JavaScript programs ("mods"). Layouts include Herdr, Terminals, and a joke "Herdr 98." Mods are trusted code, not sandboxed.
- **Agent-drivable.** `herdr-app --skill` prints a guide that teaches an agent to drive the window. `herdr-app shot` gives an agent a screenshot of the window so it can check its own mod work.
- **Recent polish (0.1.13–0.1.16).** Find-in-terminal, a full macOS menu bar, Ghostty-matched row heights and glyph centering, adjustable line height and cell width, kitty-protocol images, and a Dock badge mods can set (for example, "agents needing you").

There's also a companion iOS client in progress from the community ([flankr](https://github.com/flankrapp/flankr)), and the app shares seen/pinned agents with a phone app.

## Where It Fits in Our Workflow

The May post's bet was that "which agent is blocked" is the question that changes daily UX most. That bet held, and the field got crowded. See [[Agent Supervisors - Eight Tools Chasing the Same Question]]. What sets the native app apart from the other supervisors:

1. **It keeps the core/client split.** Terminals live in `herdr-core`, so the window becomes disposable. The same design shows up in [[Rex by Superlogical - Mitchell Hashimoto's Terminal Multiplexer|Rex]] and Orca. Expect it to be the norm.
2. **It's built on libghostty.** It matches Ghostty rendering without being Ghostty. That's the "building block economy" Mitchell Hashimoto describes, and it's working.
3. **Remote-first fits our multi-machine reality.** One HN commenter runs it across several Macs over Tailscale, and another does most of their work on an EC2 box over SSH.

Caveats: usage **telemetry is on by default** in release builds (Settings → Privacy). macOS builds are Apple Silicon only, and Intel Macs must build from source. Version 0.1.x means config files and mod APIs are still moving.

If you already run the TUI, the app's welcome screen gives you one line to hand to your agent so it carries your keybinds and settings across.

## Install

```bash
# macOS (Apple Silicon)
brew install --cask herdr-app

# macOS / Linux (also installs herdr-core if missing)
curl -fsSL https://releases.herdr.dev/app/install.sh | sh

# Windows (PowerShell)
irm https://releases.herdr.dev/app/install.ps1 | iex
```

Sources: [herdr-app](https://github.com/herdrdev/herdr-app) · [CHANGELOG](https://github.com/herdrdev/herdr-app/blob/master/CHANGELOG.md) · [herdr TUI releases](https://github.com/herdrdev/herdr/releases) · [HN thread](https://news.ycombinator.com/item?id=50298436)
