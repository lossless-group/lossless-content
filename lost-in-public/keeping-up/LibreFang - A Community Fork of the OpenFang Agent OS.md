---
date_created: 2026-07-08
date_modified: 2026-07-08
title: LibreFang — A Community Fork of the OpenFang Agent OS
slug: librefang-community-fork-openfang-agent-os
tags: [AI-Agents, Agent-Operating-Systems, Self-Hosted, Rust, Model-Context-Protocol, Open-Source-Governance, Homebrew]
homepage: https://librefang.ai
github_repo_url: https://github.com/librefang/librefang
brew_page: https://formulae.brew.sh/formula/librefang
install: brew install librefang
---

https://librefang.ai

## Why This Matters

LibreFang is a self-hosted "agent operating system" in Rust. Instead of waiting for a prompt, it runs agents on schedules, around the clock, and reports to a dashboard on your own machine. It's another bet that the layer agents run on should be something you can own.

The more interesting part is its origin. LibreFang is a community fork of [RightNow-AI/openfang](https://github.com/RightNow-AI/openfang), started in March 2026, and its reason for existing is governance rather than technology. Its `GOVERNANCE.md` sets a merge-first policy and explicitly bans closing a pull request to re-implement it privately without attribution.

It was accepted into Homebrew core on July 8, 2026 at version 2026.6.29. MIT licensed. The details below reflect v2026.10.16, checked November 3, 2026.

## What It Actually Does

All counts here are the project's own claims, from its README.

- **Hands.** Autonomous capability packages defined by a `HAND.toml` manifest, a system prompt, and optional `SKILL.md` files. Community examples include Researcher, Collector, Lead, Trader, DevOps, and social posting for Twitter, Reddit, and LinkedIn.
- **Channels.** 45 messaging adapters, including Slack, Telegram, WhatsApp, Signal, Matrix, and email.
- **Models.** 28 LLM providers with routing, fallback, and cost tracking, including local models through Ollama.
- **Protocols.** A built-in MCP client and server, plus Google's Agent-to-Agent protocol.
- **Security.** A claimed 16 layers, including a WASM sandbox, a Merkle audit trail, taint tracking, and Ed25519 signing.
- **Packaging.** CLI, daemon, and web dashboard on port 4545, with a desktop app available through the project's tap.
- **Migration.** `librefang migrate --from openclaw` imports agents, history, skills, and config.

## The Fork's Numbers

As of November 3, 2026, the fork is active but much smaller than its parent. LibreFang has about 400 GitHub stars and was pushed to that day. OpenFang has over 18,000 stars, and its last push was July 2, 2026. Stars measure attention rather than quality, but anyone choosing between them is picking momentum against name recognition, and a fork's governance promise only holds up if contributors actually arrive.

## Where It Fits in Our Workflow

The `SKILL.md` support is the practical hook, because our skills use the same format and might carry over, though we haven't tested that. The scheduled-agent model is also a different shape from our usual interactive Claude Code sessions, so it could suit recurring jobs like monitoring and briefings.

We'd evaluate it carefully and wouldn't rush to deploy it. The README sells agents that generate leads and manage social media around the clock, and an always-on agent with channel credentials has a large blast radius, whatever the number of security layers. Start with one read-only Hand on an isolated machine and read what it does before giving it anything that can post, trade, or send.

## Install

```bash
brew install librefang
librefang start     # initializes on first run, dashboard at http://localhost:4545
```

Source: <https://github.com/librefang/librefang>
