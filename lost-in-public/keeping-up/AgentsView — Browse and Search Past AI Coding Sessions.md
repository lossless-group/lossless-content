---
date_created: 2026-05-17
date_modified: 2026-05-17
title: AgentsView — Browse and Search Past AI Coding Sessions
slug: agentsview-ai-coding-session-browser
tags: [AI-Coding, Developer-Tools, Observability, Claude-Code, Local-First]
homepage: https://www.agentsview.io/
repository: https://github.com/wesm/agentsview
install: brew install --cask agentsview
---

https://www.agentsview.io/

## Why This Matters

This one is directly adjacent to our `claude-code-sessions` and `claude-code-tool-traces` Chroma collections — it's a packaged, local-first tool for exactly the problem we've been ingesting into the corpus ourselves. Browse, search, and analyze your past AI coding sessions across **20 different agent tools**, with full-text search, token/cost tracking, AI-generated summaries, and activity visualizations.

The repo is **Wes McKinney's** (creator of pandas, Apache Arrow), which is a meaningful signal about the engineering bar. MIT-licensed, version 0.29.0 just hit Homebrew cask.

## What It Actually Does

- **20 agent integrations, auto-discovered.** Claude Code, Codex, Copilot, Cursor, Gemini, OpenHands, VS Code Copilot, Positron Assistant, and more — it finds the session directories on disk without configuration.
- **Imports from chat too.** Pulls Claude.ai and ChatGPT chat history alongside the agent CLI sessions.
- **Local-first by default.** SQLite + embedded web frontend, no cloud, no accounts. Optional PostgreSQL sync for multi-machine or team setups — opt-in only.
- **Performance claim worth noting.** The `agentsview usage` CLI is stated as **80–220× faster** than comparable token/cost analyzers on large histories. We have large histories.
- **AI-generated session summaries.** Useful for reconstructing "what was I doing in that 4-hour Claude Code run last Tuesday."

## Where It Fits in Our Workflow

We already have the four-collection corpus (`context-vigilance-corpus`, `lossless-changelog`, `claude-code-sessions`, `claude-code-tool-traces`) wired into Chroma for the search-first discipline. AgentsView is the **UI counterpart**: when the question is "let me eyeball a specific session" rather than "what did we decide about X," the local web app is the right surface.

The 20-agent breadth also matters for the Lossless tree — we use Claude Code as the primary harness, but Trae, Codex, and Cursor have shown up in side projects. A single browser across all of them is a real win versus per-tool session directories.

## Two Install Paths

```bash
# Cask (recommended for the desktop app)
brew install --cask agentsview

# Or pip/uvx if you only want the CLI
uvx agentsview usage
```

Source: <https://github.com/wesm/agentsview>

## Open Question

Whether the AgentsView SQLite schema is rich enough that we could **point our Chroma ingestion at it** instead of parsing raw Claude Code session JSON ourselves. If so, that simplifies `ai-labs/context-vigilance-kit/scripts/` materially.
