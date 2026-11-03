---
date_created: 2026-08-24
date_modified: 2026-08-24
title: Atlas — Source Control for Coding Agents
slug: atlas-source-control-for-coding-agents
tags: [Developer-Tools, AI-Agents, Observability, Version-Control, Claude-Code, Tauri, Homebrew]
homepage: https://www.tryatlas.cc/
github_repo_url: https://github.com/pacifio/atlas
brew_page: https://formulae.brew.sh/cask/atlas-app
install: brew install --cask atlas-app
---

https://github.com/pacifio/atlas

## Why This Matters

Atlas asks a question Git can't answer: when something breaks, whose agent changed it, and what was it told? Its tagline is "Know which prompt shipped which line."

"Source control" is the vendor's phrase, and it's a little generous. Git stays your version control. Atlas records agent sessions and links them to the commits they produced, which is a provenance layer on top rather than a replacement. That smaller description is also the more interesting one.

The Homebrew dating takes some untangling. The new-cask commit is dated August 21, 2026, UTC (August 22 in the submitter's timezone), under the token `atlas-ai`. The token was renamed to `atlas-app` on August 22, "per maintainer request," before anything merged, and the pull request landed on August 24 at version 0.2.6. So `atlas-ai` never existed on Homebrew's main branch. The details below reflect cask version 0.3.4, checked November 3, 2026. The repo's newer `alpha-0.4.1` is marked as a prerelease.

## What It Actually Does

- **Checkpoints.** With capture on, which is off until you enable it per project, sessions go to a local `.atlas/sessions.db`. Commits are observed rather than intercepted, so one made from another tool still finds its session. Atlas says links survive amend and rebase by patch ID, and orphan rather than guess after an ambiguous squash.
- **History import.** It can backfill existing Claude Code transcripts, so the record starts before installation.
- **Shared memory.** An on-device index lets one agent see another's notes. Claude Code and Codex run as subprocesses over the Agent Client Protocol, and `CLAUDE.md` and `AGENTS.md` feed each new session's briefing.
- **Two front ends.** A desktop "control-surface IDE," or [`atlas-cli`](https://github.com/tryatlas/cli), which hooks into agents you already run.
- **Team layer.** Optional organizations add a shared timeline, comments on tool calls, and a dashboard of cost per commit. Atlas says only the record of agent work syncs, not your source tree.

## Caveats

- **Alpha.** The release tags say so, and the project is under six months old. Apache-2.0, 9,563 stars.
- **Telemetry.** Anonymous usage analytics are on by default, sent to PostHog. The README says they carry "never code or prompts," and `TELEMETRY.md` catalogs the events.
- **Secret scrubbing.** The README says redaction runs before anything is written, so the store is "never itself a disclosure risk." That's a strong claim, and we haven't tested it. A session database is a concentrated record of everything an agent saw.
- **Thin Homebrew use.** The cask shows 31 installs over 90 days. The app also auto-updates and has other download routes, so that undercounts real use.

## Where It Fits in Our Workflow

We haven't run it. It overlaps with something we already have and adds something we don't. Our `claude-code-sessions` and `claude-code-tool-traces` Chroma collections let us search what past sessions said and did across the tree. What they don't do is tie a specific commit back to the session that wrote it. `git-conventions` puts the reasoning in commit messages by hand, and Atlas proposes to capture it automatically.

Two things need checking first. Capture is per project, so a 27-project tree means 27 decisions. And Atlas enables skills by symlinking them into each agent's skills directory, which is the same place our `sync-skills-symlinks.sh` manages, so we'd want to see how the two interact.

If we try it, the CLI on one leaf repo looks like the smaller commitment, with capture off for client work until the scrubbing has been checked.

## Install

```bash
brew install --cask atlas-app
```

The token matters: `atlas` is an unrelated Homebrew formula, Ariga's database toolkit.

Source: <https://github.com/pacifio/atlas>
