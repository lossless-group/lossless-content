---
date_created: 2026-08-11
date_modified: 2026-08-11
title: kata — A Local-First Issue Tracker for Agents and Humans
slug: kata-local-first-issue-tracker-agents-humans
tags: [Developer-Tools, AI-Agents, Issue-Tracking, Local-First, Model-Context-Protocol, SQLite, Go, Homebrew]
homepage: https://katatracker.com
github_repo_url: https://github.com/kenn-io/kata
brew_page: https://formulae.brew.sh/formula/kata
install: brew install kata
---

https://katatracker.com

## Why This Matters

Agents lose their place. Chat context gets compacted, and a markdown plan left in an abandoned worktree can't tell the next session who is working on what. `kata` is a task ledger for that gap: a daemon on your own machine, backed by SQLite, that agents drive from a CLI and humans supervise from a terminal or browser UI.

Its sharpest idea is that closing an issue is a completion claim. `kata close --done` requires a message and can cite a commit, a test, or other typed evidence, and `kata audit closes` lets a reviewer replay the closes that look lazy.

kata comes from `kenn-io`, the org behind [[Homebrew Roundup - 2026-06-21|msgvault]]. It landed in Homebrew core on August 11, 2026 at version 0.14.2. MIT licensed, written in Go. The project promises backward compatibility across upgrades since 0.14.0. The details below reflect 0.20.0, checked November 3, 2026.

## What It Actually Does

- **Claim flow.** `kata next --unowned` returns at most one candidate. `kata claim` fails if another worker got there first, so the loser takes different work.
- **Planning state.** Parent and child issues, blockers, schedules, deadlines, and a `someday` shelf. `ready` surfaces only unblocked work.
- **Event stream.** Every mutation lands on a durable stream with a named actor. `kata events --tail` follows it live.
- **Retry safety.** Search-before-create is the contract, and idempotency keys keep a crashed run from creating duplicates.
- **Surfaces.** CLI with `--agent` and `--json` output, `kata tui`, `kata ui`, an MCP server, an HTTP API, and an embeddable Go service.
- **Sync when you opt in.** Remote daemons, federation between daemons, optional Postgres, and connectors for GitHub, Linear, Notion, Plane, Todoist, TickTick, and [[Twenty]].

The headline number is the vendor's: 4ms for a query against a local daemon versus about 250ms for GitHub's issues API, measured once on one M5 Max laptop against a 330-issue project on v0.15.1. kata itself says it isn't a Linear replacement: keep roadmaps and reporting in the hosted tracker, and give the working loop a ledger.

Its README is candid about [[Beads]], the nearest alternative. Beads keeps state in a project-local Dolt database that travels with the repo. kata keeps it outside the repo, which keeps code history clean but means it doesn't ride git remotes.

## Where It Fits in Our Workflow

We haven't run it, and the fit is real but contested. Our task conventions point the other way: the `gh-cli-projects-tasks-conventions` skill makes a GitHub link to a `context-v/` file the body of a task, and `lfm` 0.6.1 added assignable tasks to plain Markdown, rolled up for GitHub. Both keep the work visible in git. kata's ledger is deliberately not in git, so it wouldn't replace those.

The gap it could fill is coordination between the parallel agent sessions we run on one machine. GitHub tasks tell a session what's planned, while kata's claim flow is built to tell it what another session has already taken.

Two things to check before a pilot. `kata init --with-agents` writes a managed briefing into `AGENTS.md` and `CLAUDE.md`, and in our tree `CLAUDE.md` is a symlink to `AGENTS.md`, so we'd test that on a throwaway repo first. And the Twenty connector mirrors built-in tasks from one workspace into one project, so it wouldn't touch our custom CRM objects.

## Install

```bash
brew install kata
cd your-repo
kata init
kata create "fix login race"
kata tui
```

Source: <https://github.com/kenn-io/kata>
