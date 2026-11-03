---
date_created: 2026-07-29
date_modified: 2026-07-29
title: OpenLore — Deterministic Memory and Guardrails for Coding Agents
slug: openlore-deterministic-memory-guardrails-coding-agents
tags: [Developer-Tools, AI-Agents, Agent-Memory, Model-Context-Protocol, Local-First, Claude-Code, Homebrew]
github_repo_url: https://github.com/clay-good/OpenLore
brew_page: https://formulae.brew.sh/formula/openlore
install: brew install openlore
---

https://github.com/clay-good/OpenLore

## Why This Matters

Most "agent memory" products add a second model that summarizes, retrieves, and guesses. OpenLore goes the other way. It builds a knowledge graph of your repo through static analysis (call structure, types, tests, decisions, and infrastructure-as-code) and serves it over [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] with no LLM in the hot path and no API key. The same question returns the same answer every time.

Its sharpest idea is in the README: an agent's expensive failure mode isn't ignorance, it's confidence. A model that doesn't know a function exists will go look. A model that "knows" a stale fact builds on it, and you pay at review time.

OpenLore landed in Homebrew core on July 29, 2026 at version 2.1.6. MIT licensed, written in TypeScript. The details below reflect 3.5.0, checked November 3, 2026.

## What It Actually Does

- **Orientation.** `orient(task)` returns the relevant functions, callers, specs, tests, and insertion points in one call, replacing a run of exploratory file reads.
- **Staleness notices.** Responses carry a factual freshness note once a cached fact has aged or the repo has moved.
- **Change checks.** `certify_public_surface` classifies changed exports as breaking or not and names the affected consumers. `change_impact_certificate` flags a diff that opens a new path into a boundary you declared.
- **Claim checks.** `verify_claim` returns confirmed, refuted, or unverifiable with a citation.
- **Tool presets.** The default exposes 15 MCP tools, with a 10-tool navigation preset and the full 83 behind a flag.
- **Agent wiring.** It detects Claude Code, Cursor, Cline, Continue, Pi, and `AGENTS.md`, and ships a Claude Code skill.

## The Benchmarks Include the Losses

OpenLore publishes where it hurts, which is rare enough to be worth noting. Its own June 2026 benchmark, run with `claude -p` at N=4, reports:

| Scenario | Cost change | Round-trip change |
|---|---|---|
| Large or unfamiliar repo, deep "how does X flow through Y" | −7% to −21% | −26% |
| Small or familiar repo, shallow "who calls X" | Task-dependent (+43% in round 1) | +38% |

These are the project's numbers, not ours. The README's advice is to run `openlore prove --estimate` on your own repo before trusting them.

## Where It Fits in Our Workflow

This sits next to our local Chroma corpus without replacing it. Chroma answers "what did we decide and why" across prose, changelogs, and past sessions. OpenLore answers "what does this code call, and what will this change break" inside one repo. It belongs in the `memory-layers-for-agents` study under `ai-labs/studies/` as the deterministic counterexample to LLM-summarized memory.

We haven't run it yet, and one default needs care. `openlore install` also wires your user account, so each new git repo you open indexes itself in the background. In a 27-project pseudomonorepo with parallel agent sessions, that could be a lot of file watchers. We'd pilot it on one large repo first, using `openlore doctor` and `openlore features` to see exactly what's switched on.

## Install

```bash
brew install openlore
openlore install          # wires your agent and indexes the repo
openlore prove --estimate # estimate whether it pays for itself here
```

Source: <https://github.com/clay-good/OpenLore>
