---
date_created: 2026-08-24
date_modified: 2026-08-24
title: Skills Manager — Sync Agent Skills Across Coding Tools
slug: skills-manager-sync-agent-skills-across-coding-tools
tags: [Developer-Tools, AI-Agents, Agent-Skills, Supply-Chain-Security, Desktop-Apps, Homebrew]
homepage: https://skillsmanager.dev
github_repo_url: https://github.com/xingkongliang/skills-manager
brew_page: https://formulae.brew.sh/cask/skills-manager
install: brew install --cask skills-manager
---

https://skillsmanager.dev

## Why This Matters

Every coding agent reads skills from its own folder, so using several means copying directories around. Skills Manager is a desktop app that keeps one library and deploys from it to each agent, by symlink by default or by copy. The site claims support for 56 agents.

The cask landed in Homebrew on August 24, 2026 at version 1.34.2. MIT licensed, built with Rust and Tauri. The details below reflect 1.43.3, with 7,210 GitHub stars, checked November 3, 2026. We haven't run it.

## What It Actually Does

- **Central library.** Installs from Git URLs, local folders, archives, or the skills.sh marketplace into `~/.skills-manager`.
- **Per-agent view.** Lists what's in each agent's folder, including skills it didn't install.
- **Agent control.** A CLI and a `manage-skills` skill let your agents install and deploy skills themselves.

The vendor says there's no account and no telemetry, and that it refuses to overwrite folders it doesn't manage.

## How It Compares With Our Setup

Our skills live in one repo, mounted at `context-v/agent-skills/`. On Macs, `sync-skills-symlinks.sh` links each skill into `~/.claude/skills`. On Linux, GNU Stow links them into whichever harness directory we name.

The mechanism matches. Skills Manager is ahead in two places:

- **Fan-out.** Our Mac script only targets Claude Code, while its agent badges cover every tool from one screen.
- **Visibility.** Six of our skills, including `decile-hub-connector`, once sat invisible because nothing had linked them. A per-agent view would make that kind of gap easier to see, though only for skills already in its library. Our fix is still a habit: someone has to run the sync.

It conflicts with how we work in two others:

- **Source of truth.** Its library would be a second home for skills, against our rule of editing them only in `lossless-agent-skills`. Linked Workspaces can point at any directory, so it might work as a viewer over our repo. We haven't tested that.
- **Git discipline.** We make focused commits by hand. Its backup commits in the background to its own repo, and its own docs warn that an update silently overwrites local edits to files the new version also ships.

[[APM - Microsoft's Dependency Manager for Agent Configuration|APM]] answers a different question. It uses a manifest and lockfile per project, so everyone who clones a repo gets the same pinned setup. Skills Manager is a personal library per machine. We found no lockfile in its docs. Ours is personal too.

## The Safety Check

A one-click marketplace is also a fast way to install untrusted instructions and scripts that run with your agent's permissions. Skills Manager's site says updates "can run on their own," and its agents can install skills too. We found no content scanner in its README or changelog. Version 1.33.1, ten days before the cask landed, also fixed a crafted Git URL that could copy a directory from outside the clone into your library.

That's the job for [[SkillSpector - NVIDIA's Security Scanner for Agent Skills|SkillSpector]]. NVIDIA's README reports that 26.1% of a 31,132-skill research subset contained vulnerabilities and 5.2% showed likely malicious intent. It can scan a folder, archive, or Git URL before anything lands in a library. It wouldn't catch a later automatic update unless you scan again.

## Our Take

We wouldn't replace our setup with this. If we need the same skills across several agents on a Mac, it's worth trying on a spare machine. The idea to borrow now is a per-agent view of what each tool can actually see.

## Install

```bash
brew install --cask skills-manager
```

Source: <https://github.com/xingkongliang/skills-manager>
