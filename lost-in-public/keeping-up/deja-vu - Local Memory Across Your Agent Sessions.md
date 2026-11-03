---
date_created: 2026-08-23
date_modified: 2026-08-23
title: deja-vu — Local Memory Across Your Agent Sessions
slug: deja-vu-local-memory-across-agent-sessions
tags: [Developer-Tools, AI-Agents, Agent-Memory, Model-Context-Protocol, Local-First, Claude-Code, Go, Homebrew]
homepage: https://vshulcz.github.io/deja-vu/
github_repo_url: https://github.com/vshulcz/deja-vu
brew_page: https://formulae.brew.sh/formula/deja-vu
install: brew install deja-vu
---

https://github.com/vshulcz/deja-vu

## Why This Matters

Coding agents already save every session to disk, and almost nothing reads those files back. `deja-vu` indexes them locally and hands relevant history to the next session over MCP and hooks, with zero LLM calls in the default setup and no cloud account. Its pitch is that your agents stop re-debugging what you already fixed.

We care because we built a version of this ourselves, so we can compare it against something concrete.

It landed in Homebrew core on August 23, 2026 at version 0.18.0, about six weeks after the repo was created. MIT licensed, written in Go. The details below reflect 0.23.5, checked November 3, 2026.

## What It Actually Does

- **Reads what's there.** The README lists 43 supported agents, including Claude Code, Codex, Cursor, and Gemini CLI, so months of existing transcripts are searchable from the first index.
- **Pushes recall.** Hooks surface prior sessions at session start, before a file edit or command, and when a command fails.
- **Indexes the work, not only the chat.** It tracks opened files, commands with exit codes, and exact edit spans. `deja blame <file>:<line>` traces a line to the session that wrote it, and `deja fix <error>` shows what this machine ran after the same error.
- **Tracks decisions.** `deja promote --state rejected` marks a reverted approach so later hits warn why it was dropped.
- **Redacts at index time.** Keys and tokens become `[redacted:<kind>]`, though the project is clear that the source transcripts still hold them. `deja secrets` names the affected sessions.
- **One MCP tool.** A single `deja` tool with modes, which the vendor measures at 477 tokens of definitions per turn.

The vendor also reports 97.2% recall at five on LongMemEval-S and 13.6 seconds to index 19,195 sessions. It publishes its drivers and scoring, but these are its numbers, not ours.

## Where It Fits in Our Workflow

deja-vu is the closest kin we've found to our `claude-code-sessions` and `claude-code-tool-traces` Chroma collections. We haven't run it. On paper, the honest comparison goes both ways.

| | Our collections | deja-vu |
|---|---|---|
| Sources | Claude Code only | 43 agents |
| Retrieval | Vector search | Lexical with fuzzy fallback; semantic is opt-in via `deja embed` |
| Delivery | Agent queries when told to | Hooks and MCP, automatic |
| Freshness | `ingest-all.sh`, run deliberately | Incremental, with a freshness check at query time |
| Code links | Tool traces, unlinked to lines | `blame`, `restore`, per-line attribution |
| Neighbors | Sits beside `context-vigilance-corpus` and `lossless-changelog` | Sessions only |

It beats us on push delivery, other harnesses, and line-level provenance. Ours can match by meaning without an extra service, and a query can span sessions, specs, and changelogs at once, with the `search-lossless-corpus` skill as the discipline on top.

The caution is the install. `deja install --auto` wires MCP and hooks into every detected agent and writes user-level guidance files, which is a lot of ambient change for a tree with parallel sessions and a rule against silent normalization. The README documents a quieter path: the binary alone is enough for searching, and `--no-guidance` skips the guidance files. We'd start with search only and compare answers against Chroma on questions we already know.

## Install

```bash
brew install deja-vu
deja "jwt refresh token"   # search; run `deja install --auto` only if you want hooks and MCP
```

Source: <https://github.com/vshulcz/deja-vu>
