---
date_created: 2026-08-04
date_modified: 2026-11-21
title: Glen — Shared Team Memory for Coding Agents
lede: "A YC startup that records every agent session across a team and injects the relevant past work into whichever agent starts the next task."
slug: glen-shared-team-memory-for-coding-agents
tags:
  - Developer-Tools
  - AI-Agents
  - Memory-Layers
  - Claude-Code
  - MCP
  - Y-Combinator
homepage: https://tryglen.com
yc_page: https://www.ycombinator.com/companies/glen
install: npx @tryglen/cli@latest install
og_favicon: https://tryglen.com/favicon.svg
og_last_fetch: 2026-11-22T04:45:34.000Z
---

https://tryglen.com

## Why This Matters

Glen (YC Summer 2026, San Francisco) is a **shared memory layer for every agent a team runs**. It records sessions from Claude Code, Codex, Cursor, and Pi. It also pulls in Slack, GitHub PRs, tickets, docs, and calls. When an agent starts a task, Glen runs "in a parallel thread" and injects the relevant prior context into that agent's context window. The pitch: "Your agents finally learn and never forget."

Solo founder Nikos Dritsakos previously led special projects at Composio. Glen says it processes over 1M messages a month for teams including Composio, Corgi Insurance, Replicas, Conifer, and Litmus.

The concrete claim is a [benchmark published August 4, 2026](https://tryglen.com/blog/replaying-100-prs). They reverted the last 100 merged PRs in a workspace that had run Glen for two months. Then Codex re-implemented each one from a one-shot prompt, five runs per arm, with and without Glen. Each run was graded against the PR's withheld tests. Result: **29% fewer tokens, 21% faster, quality at parity or better.** It's a vendor benchmark on its own workspace, but it's the right *shape* of benchmark: replayed real work, held-out tests.

## What It Actually Does

- **Context injection during the task,** not just retrieval on demand. Glen steers the running agent with the prior work that bears on it.
- **Skills, shared and distilled.** Upload skills or let Glen distill them from your team's sessions (for example, `debug-like-shawn.md`). The relevant one surfaces automatically.
- **Ask the agent that wrote the line.** In PR review, a clone of the original agent explains the reasoning behind a specific change.
- **Company brain Q&A** from Slack, any MCP client, or the web app, with sources.
- **Searchable transcript hub** for every team session.
- **Session handoff across agents.** Move your session, or a teammate's, to a different agent mid-task with full history.
- **Artifact library.** Reports, runbooks, and specs, each private, team, or org scoped.
- **Permissions at recall time.** Every memory keeps its source's permissions. It reads public Slack channels and shared transcripts, never DMs or private channels. **Incognito** keeps a session out of the store entirely. GDPR export and delete are supported.

**Pricing:** Free covers 15,000 memories and up to 3 people. Personal raises that to 250k memories plus integrations, and Team removes the limits. On day one you can import your last 30 days of sessions.

## Where It Fits in Our Workflow

This is the hosted, team-scale version of something we've built by hand. Our local Chroma corpus already ingests `claude-code-sessions` and `claude-code-tool-traces` and is queried through the `search-lossless-corpus` skill. See [[Memory Layers]] for the broader category.

The differences are instructive:

- **Ours is pull, Glen is push.** We query the corpus when a question smells like prior work. Glen injects context unprompted while the agent works. Push is more powerful and more likely to add noise. The benchmark suggests it nets out positive on a mature workspace.
- **Ours is solo, Glen is multiplayer.** Its value compounds with teammates' sessions. For client work (Palmer AI, The Water Foundation) where several people run agents on the same repos, that's the part we can't easily replicate.
- **Skill distillation is novel.** We write skills manually in `lossless-agent-skills`. A tool that proposes skills from observed sessions could feed that repo, with review.

Caveats: sending full agent transcripts to a third party is a real data-boundary decision, especially for client repos. Incognito and permission-at-recall help, but this needs a per-client yes. The company is early (YC S26, solo founder).

## Install

```bash
npx @tryglen/cli@latest install
```

You can also paste the setup prompt from tryglen.com into Claude Code, Codex, Cursor, or Pi, and the agent sets itself up. A hosted MCP server is available for any MCP client.

Sources: [tryglen.com](https://tryglen.com) · [Benchmark](https://tryglen.com/blog/replaying-100-prs) · [YC profile](https://www.ycombinator.com/companies/glen) · [Vision](https://tryglen.com/vision)
