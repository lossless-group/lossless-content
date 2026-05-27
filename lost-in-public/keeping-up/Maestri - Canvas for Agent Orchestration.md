---
date_created: 2026-05-25
date_modified: 2026-05-25
title: Maestri — Canvas for Agent Orchestration
slug: maestri-canvas-agent-orchestration
tags: [macOS, AI-Agents, Orchestration, Claude-Code, Codex, OpenCode, Infinite-Canvas]
homepage: https://www.themaestri.app/
brew_page: https://formulae.brew.sh/cask/maestri
install: brew install --cask maestri
---

https://www.themaestri.app/

## Why This Matters

Most "AI orchestration" tools live in a terminal multiplexer (see [[herdr]] elsewhere in this update) or a web dashboard. `Maestri` takes the other path: an *infinite canvas* native macOS app where each agent — Claude Code, Codex, OpenCode, plain shell, embedded browser — is a window you can place, connect, and zoom. The metaphor is closer to Miro-meets-tmux than to a CLI.

Version 0.27.6 just hit Homebrew cask. macOS 26+ — bleeding-edge OS requirement, worth noting before you `brew install`.

## What It Actually Does

- **Infinite spatial canvas.** Pan, zoom, place agent windows wherever in 2D space. Workflow context is preserved spatially rather than in tab order.
- **Direct agent-to-agent communication.** Draw a line between two terminals; one agent prompts another *without* an API intermediary. The line is the wire.
- **Ombro — the on-device watcher.** A local AI companion monitors agent progress and suggests next steps. The "are they still working" question that herdr answers with a state column, Maestri answers with a proactive assistant.
- **Agent-agnostic.** Claude Code, Codex, OpenCode, plain shell, embedded browser portals. No vendor lock.
- **Architecture-diagram space.** Draw arrows, sketch flows, annotate the canvas itself — the workspace doubles as a thinking tool.

## Where It Fits in Our Workflow

This is the GUI sibling of the same insight that produced [[herdr]]: terminal multiplexers are not designed for *agents*, they are designed for shell sessions. Both products are betting that the next-decade primitive is "many agents running in parallel, all needing attention triage and inter-communication." They disagree on the surface — Maestri thinks the right one is a canvas, herdr thinks it's a TUI.

Two natural matches in our tree:

1. **`ai-labs/dididecks-ai/` and adjacent agent-orchestration experiments** — where we already run Claude Code + Codex side-by-side and the canvas-with-lines metaphor maps directly onto the workflow.

2. **`deck-iteration-workflow` for fundraise decks** — when iterating on a deck under time pressure, having Claude Code, an embedded browser showing the rendered slide, and Ombro watching for "is this done" in one canvas is materially different from cycling through windows.

Caveats: macOS 26 requirement is steep at the moment — only ships on machines that have updated. Version 0.27.6 means *early*; expect rough edges. The direct agent-to-agent wire (without an API intermediary) is the most interesting architectural claim and the part most worth stress-testing before depending on it.

Worth pairing against [[herdr]] (terminal multiplexer for agents, this same Homebrew cycle) as the two complementary 2026-era takes on this problem.

## Install

```bash
brew install --cask maestri
```

Requires macOS 26+. Check before installing.

Source: <https://www.themaestri.app/>
