---
date_created: 2026-08-12
date_modified: 2026-08-12
title: Delta — The Zed Team's Multiplayer Environment for Agents
slug: delta-zed-teams-multiplayer-environment-for-agents
tags: [Developer-Tools, AI-Agents, Collaboration, Version-Control, Zed, Claude-Code, Homebrew]
homepage: https://delta.dev/
brew_page: https://formulae.brew.sh/cask/zed-delta
install: brew install --cask zed-delta
---

https://delta.dev/

## Why This Matters

Delta is the Zed team's answer to a specific complaint: a pull request shows the diff but loses the conversation that produced it. In Delta, teammates join the same thread as your agent, see the same worktree, and can ask that agent why it made a choice. Zed is open about the ambition, and its [public beta post](https://zed.dev/blog/delta-public-beta) calls this a "quest to replace GitHub.com." Pull requests are the first thing it wants gone.

Zed [introduced Delta](https://zed.dev/blog/introducing-delta) in private beta on August 12, 2026, and opened a public beta on September 16. The Homebrew cask commit followed on October 7, at version 0.19.0, merging early on October 8 UTC. The details below reflect 0.23.0, checked November 3, 2026.

## What It Actually Does

- **Threads.** Conversation and code live together. A review gets its own subthread with an isolated copy of the worktrees, so a reviewer's experiments don't disturb the original work.
- **DeltaDB.** A [CRDT-based layer](https://delta.dev/blog/future-of-version-control) that records edits between commits and ties them to the person, agent, and prompt behind them. Git stays underneath, and a commit is still what you push and build from. Teammates who never open Delta see a normal repository.
- **Claude Code plugin.** Since [October 27](https://delta.dev/blog/claude-code-multiplayer), in beta, `/delta share` and `/delta join` let two people work one thread from their own Claude Code sessions.

Zed says 33 of its people had landed 570 changes to main without pull requests by mid-September. A team that builds the tool is a friendly test. Personal is $0 with your own keys or external agents. Pro is $10 a month with $5 of tokens included. The Claude Code plugin is open source under AGPL-3.0. We found no public repo for the app itself.

## What Sharing Sends

[The plugin docs](https://delta.dev/docs/cli/claude-code) are specific, and worth reading before the first `/delta share`:

- **Shared:** your messages, Claude's replies including thinking, tool calls with inputs and outputs, images, and your checkout's files, including staged, unstaged, and untracked changes.
- **Not shared:** Git-ignored files, local Git state such as branches, and `--add-dir` folders.
- **One-way:** a conversation that already syncs can't become private again.
- **Takeovers:** sending a prompt takes over any running turn, including a teammate's.
- **Deletion:** leaving a joined session deletes its checkouts, along with ignored files and local branches.

The untracked-files rule is the one to watch. A secret sitting in a file that isn't ignored goes along with everything else. The plugin also doesn't support `claude -p`, SDK sessions, or Claude Code cloud sessions yet.

## Where It Fits in Our Workflow

We haven't run it. Most of what our `AGENTS.md` describes is one operator running parallel sessions, and shared threads pay off when a second person is actually in them. So the app is a weak fit today, and replacing pull requests isn't a problem we're trying to solve.

The plugin is the part worth trying, because we'd stay in Claude Code, and its default mode only syncs when you ask. A good test would be handing a half-finished session to a collaborator on one leaf repo. We couldn't find anything in the docs we read about submodules, so we wouldn't start at a pseudomonorepo root with dirty gitlinks. Client repos should wait until we've read how Zed stores this data.

DeltaDB also belongs in `ai-labs/studies/sync-and-content-version-control/`, alongside `jj` and `automerge`, as reading material regardless of whether we adopt the product.

## Install

```bash
brew install --cask zed-delta
```

Or, for the Claude Code route:

```bash
claude plugin marketplace add zed-industries/delta-claude
claude plugin install delta@zed-industries
```

Source: <https://delta.dev/>
