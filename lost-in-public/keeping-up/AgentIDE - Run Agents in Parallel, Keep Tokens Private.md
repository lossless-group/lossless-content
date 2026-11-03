---
date_created: 2026-09-05
date_modified: 2026-09-05
title: AgentIDE — Run Agents in Parallel, Keep Tokens Private
slug: agentide-run-agents-in-parallel-keep-tokens-private
tags: [Developer-Tools, AI-Agents, Security, Sandboxing, macOS, Claude-Code, Homebrew]
homepage: https://mikemcquaid.com/sanductor/
github_repo_url: https://github.com/MikeMcQuaid/Sanductor
brew_page: https://formulae.brew.sh/cask/agentide
install: brew install --cask agentide
---

https://mikemcquaid.com/sanductor/

## Why This Matters

Most tools for running agents in parallel focus on keeping track of them. This one starts from a harder assumption, in its author's words: "I assume any token an agent can access will eventually be misused."

The author is Mike McQuaid, who calls himself Homebrew's Project Leader on this project's site. GitHub backs that up: he's a public member of the Homebrew organization and the top contributor to `Homebrew/brew`. This is his personal project, though, not a Homebrew one.

## The Name

This landed as AgentIDE and is mid-rename. The project became **Sanductor** on October 30, 2026, and the old repo and site URLs now redirect there. Homebrew hasn't caught up: the cask is still `agentide`, and [the rename pull request](https://github.com/Homebrew/homebrew-cask/pull/298501) is still open. As of today the README's `brew install --cask sanductor` won't find anything, while the site's `brew install agentide` is the one that matches Homebrew.

The cask landed on September 5, 2026, at version 0.9.0. The details below reflect 0.9.13, checked November 3, 2026.

## What It Actually Does

It's a native macOS workspace that runs Claude Code or Codex CLI in parallel Git worktrees, using other people's tools for the hard parts:

- **[sandvault](https://github.com/webcoyote/sandvault)** runs agents under a separate non-admin macOS user, without containers or VMs, keeping your home directory and GitHub credentials out of reach even in YOLO mode.
- **[[herdr - Agent Multiplexer That Lives in Your Terminal|herdr]]** keeps agents alive after you quit the app.
- **`gh`** handles pull requests. Signing and pushing stay on your side of the boundary.

Around that sit review by agents, Copilot, or CodeRabbit, automatic fixes for review comments and selected CI failures, scheduled prompts, and an iPhone companion you build yourself.

## Caveats

- **The sandbox has edges.** The README says it plainly: YOLO mode protects your home and credentials, "but agents can change shared files and upload readable code." Your source isn't protected from the agent.
- **Personal software.** AGPL-3.0, "without support or compatibility guarantees." It has 65 stars and 48 Homebrew installs over 90 days, and McQuaid has 690 of its commits.
- **Narrow requirements.** Apple silicon and macOS 26 or later. The cask pulls in `herdr`, `ripgrep`, and `gh`, but you also need sandvault 1.29 or later set up separately, with Claude Code or Codex signed in inside the sandbox account.

## Where It Fits in Our Workflow

We haven't run it. On paper the workflow matches ours: several Claude Code sessions at once, with secrets we'd like agents not to read. Our `AGENTS.md` already treats `.env` and `.secrets` files as things that are painful to lose, and a credential boundary enforced by the operating system is stronger than a permission prompt.

The obstacle is where the code has to live. Repositories must sit inside `/Users/Shared/sv-<you>`, and the README says symlinks "cannot grant access outside the workspace." Our tree lives under `~/code/lossless-monorepo`, and moving a repo there would trigger our hard-stop relocation rule, with its three preconditions. A fresh clone of one leaf repo is the only sensible pilot. It's also unclear how much of our setup would come along, since skills linked into `~/.claude/skills` and our MCP configuration sit in the home directory the sandbox is designed to hide.

Even if we never adopt the app, McQuaid's [write-up of his setup](https://mikemcquaid.com/sandboxed-agent-worktrees-my-coding-and-ai-setup-in-2026/) is worth reading, and the sandvault approach could work without it. For the wider field, see [[Agent Supervisors - Eight Tools Chasing the Same Question]].

## Install

```bash
brew install sandvault
sv build
brew install --cask agentide
```

Source: <https://github.com/MikeMcQuaid/Sanductor>
