---
date_created: 2026-08-12
date_modified: 2026-08-12
title: Muse Code — Meta's Terminal Coding Agent
slug: muse-code-metas-terminal-coding-agent
tags: [Developer-Tools, AI-Agents, Coding-Agents, Meta, Terminal, Homebrew]
homepage: https://dev.meta.ai/products/muse-code
brew_page: https://formulae.brew.sh/cask/muse-code
install: brew install --cask muse-code
---

https://dev.meta.ai/docs/muse-code

## Why This Matters

Meta now has its own entry in the category with [[Gemini CLI - Google's Terminal Coding Agent|Gemini CLI]], Codex, and Claude Code. It [announced Muse Code as a beta on August 5, 2026](https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2), alongside Muse Spark 1.2, a coding-focused model it says it co-trained with the agent. That pairing is the pitch: a model and a harness tuned together.

The Homebrew cask commit is dated August 6, 2026, at version 0.1.0-R708.1, and its pull request merged on August 12. The details below reflect 1.4.14-R7309.1, checked November 3, 2026.

## What It Actually Does

- **Background agents.** Meta describes a simple main loop plus async agents that stay alive for the whole session rather than being spawned per task.
- **Restart safety.** Every model call, tool run, approval, and edit goes into a local event log. Meta says a crashed session can resume exactly where it stopped.
- **Guardrails by default.** Approvals and an OS sandbox are on from the first run. `--yolo` removes both.
- **Headless use.** `muse exec "<prompt>"` runs one prompt to completion for CI, and `muse serve` exposes a versioned session protocol with a TypeScript SDK.
- **Migration paths.** It reads `AGENTS.md` and `CLAUDE.md`. The docs describe a `/migrate` skill for Claude Code and Codex memory notes and MCP servers, and `muse skills import` for skills.

## How Tied Is It to Meta?

Mostly tied, with a loose end. The docs say it "needs a Meta credential," the default model is `muse-spark-1.2`, and the product page says "Built for Muse models." We found no public source repo, and the cask downloads a binary from a Facebook domain. But the changelog mentions "third-party models" in the model picker, and the configuration docs refer to "other providers." We couldn't find instructions for setting those up, so treat it as Meta-first until the docs say more.

The beta status is also unclear. The announcement says beta, and the cask reached 1.0 in late August. The docs pages and product page we read don't use the word, but we also found no general-availability announcement. We'd assume it is still beta.

## Read the Pricing Table Carefully

Meta sells flat subscriptions from $5 to $200 a month, plus per-token API billing. The product page lists `muse-spark-1.3` at $1.25 input and $4.25 output per million tokens, marked "Not used to improve our products." `muse-spark-1.3-contributor` costs $0.10 and $0.20, marked "Used to improve our products." The subscription docs say that how Meta uses your prompts, code, and files depends on whether Contributor mode is on. Check that setting before pointing this at anything private.

## Where It Fits in Our Workflow

We haven't run it, and the fit is weak today. We're heavy Claude Code users, with our skills and conventions built around that setup, and nothing here is a reason to move.

As a second opinion, the switching cost looks low. Our `AGENTS.md` and its `CLAUDE.md` symlink should be read as they are. One detail needs testing: the docs say instruction lookup walks up to the nearest `.git` boundary. In our pseudomonorepo, a session started inside a child repo may never see the anchor's `AGENTS.md`.

If we try it, it would be on public or low-stakes repos, with Contributor mode off, and never on client work under `ai-labs/dididecks-ai/client-sites/`.

## Install

```bash
brew install --cask muse-code
cd your-project
muse
```

Source: <https://dev.meta.ai/products/muse-code>
