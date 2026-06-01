---
date_created: 2026-05-25
date_modified: 2026-05-25
title: herdr — Agent Multiplexer That Lives in Your Terminal
slug: herdr-agent-multiplexer-terminal
tags: [Developer-Tools, AI-Agents, Terminal, TUI, Claude-Code, Multiplexer]
homepage: https://herdr.dev
github_repo_url: https://github.com/ogulcancelik/herdr
brew_page: https://formulae.brew.sh/formula/herdr
install: brew install herdr
---

https://herdr.dev

## Why This Matters

If you run more than one terminal coding agent — Claude Code in one pane, Codex in another, an OpenCode worker in a third — you already feel the friction tmux wasn't designed for. Tmux gives you persistence and panes. It doesn't tell you which agent is *blocked waiting for input*, which one *finished ten minutes ago*, or which one *is still chewing on a tool call*. You end up cycling through panes like a hawk because the multiplexer has no concept of "agent."

`herdr` is a TUI written in Rust that fills exactly that gap: tmux-style session persistence, but with first-class awareness of the agents running inside the panes. Version 0.6.2 just landed in Homebrew core. AGPL-3.0, macOS + Linux.

## What It Actually Does

- **Agent state awareness.** The TUI shows at a glance which agents are *blocked*, *working*, *done*, or *idle* — no need to peek into every pane to find the one waiting for you.
- **Real PTYs, not a wrapper.** Each pane is a true terminal — your shell, fonts, keybinds, and SSH setup are preserved. Herdr does not reimplement the agents' interfaces.
- **Session persistence.** Agents keep running in the background after disconnect or SSH loss, the same way `tmux attach` rescues a long-running build.
- **Mouse-native + keyboard-capable.** Click panes, tabs, and menus, or drive everything from the keyboard.
- **Local or remote.** Runs locally, over SSH, or as a thin client to a remote host.
- **Agent control API.** A CLI and socket API let agents themselves create panes, run commands, read output, and orchestrate their own workspace — i.e., one agent can spawn helpers.
- **Named integrations:** Pi, Claude Code, Codex, OpenCode, Droid, Amp, Grok CLI, Gemini CLI. Plus a generic "any terminal agent" path.

## Where It Fits in Our Workflow

We are deeply terminal-agent-heavy: Claude Code in this very repo, plus Codex and OpenCode on adjacent experiments. The current pattern is iTerm tabs + tmux + a *lot* of human dispatch attention. The "which agent is blocked" question is real and recurring. Herdr's state column is the small thing that would change daily UX the most.

It also matches the [[concepts/Pseudomonorepos]] tree shape — agents spanning multiple child repos benefit from a single persistent multiplexer at the root, rather than per-repo tmux servers. And the API-driven pane creation opens an interesting door for the `claude-code-tool-traces` collection: an orchestrator agent that fans out work into named panes whose names you can grep later.

Compare against [Maestri](https://www.themaestri.app) in this same cask roundup — Maestri solves the same "orchestrate multiple agents" problem with a native macOS canvas. Herdr stays inside the terminal. Different tastes, same insight.

## Install

```bash
brew install herdr
herdr            # launch
```

Source: <https://github.com/ogulcancelik/herdr>
