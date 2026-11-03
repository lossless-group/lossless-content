---
date_created: 2026-07-07
date_modified: 2026-07-07
title: Otty — A Native Terminal Tuned for Code Agents
slug: otty-native-terminal-tuned-for-code-agents
tags: [Developer-Tools, AI-Agents, Terminal-Emulators, macOS, Homebrew]
homepage: https://otty.sh
docs: https://docs.otty.sh
brew_page: https://formulae.brew.sh/cask/otty
install: brew install --cask otty
---

https://otty.sh

## Why This Matters

The terminal is turning into the main workspace for coding agents, and that fight is getting crowded. We've already flagged [[herdr - Agent Multiplexer That Lives in Your Terminal|herdr]], [[Maestri - Canvas for Agent Orchestration|Maestri]], and supaterm in the [[Homebrew Roundup - 2026-06-21|June 21 roundup]].

Otty's position is deliberately modest: a good terminal first, agent features second. Its site says it sits "between a traditional terminal and a full agent dev environment," keeping a keyboard-first UI without an IDE's panels and buttons. Its agent section is even headed "Also, plays well with the agents you already run."

The cask landed in Homebrew on July 7, 2026 at version 1.2.3. The details below reflect the website and cask 1.6.2, checked November 3, 2026.

## What It Actually Does

- **Terminal basics.** Native and GPU-accelerated, with ligatures, full Unicode, 24-bit color, inline images, and clickable files, URLs, and paths.
- **Workspace.** Vertical or horizontal tabs with live badges and unread dots, free-form splits, and session recovery after closing the lid.
- **Process watching.** Tracks long-running jobs and notifies you when they finish.
- **Keyboard tools.** Command palette, inline autocomplete, Open Quickly, and reusable snippets, commands, and layouts.
- **Agent features.** Parallel tasks with progress monitoring, session history, fork and branch for chats, a composer with a prompt queue, and Send to Chat for piping output to the agent.
- **CLI.** The cask also installs an `otty` command with shell completions.

## Where It Fits in Our Workflow

The live badges, unread dots, and process notifications go after the same recurring question herdr's state column does: which agent is waiting on me? The prompt queue and Send to Chat could also cut some copying and pasting between panes.

The difference is where the state lives. Herdr runs inside whatever terminal you have and survives an SSH drop. Otty is the terminal itself, so adopting it means changing your daily driver. We haven't tried it.

Two things to weigh first. It's free for macOS and Windows (beta) with no account required, but Linux is still waitlisted, and we run Linux machines too. We also didn't find a public source repository, so treat it as closed source unless that changes. For a tool that sees everything your agents do, that matters more than usual.

## Install

```bash
brew install --cask otty
```

Docs: <https://docs.otty.sh>
