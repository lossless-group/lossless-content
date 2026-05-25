---
date_created: 2026-03-02
date_modified: 2026-03-02
title: Perplexity Computer — One Agent Orchestrating 19 Models
slug: perplexity-computer-multi-model-agent
tags: [AI-Agents, Perplexity, Multi-Model-Orchestration, Foundation-Models, AI-Workflows]
announcement_url: https://www.perplexity.ai/hub/blog/introducing-perplexity-computer
release_date: 2026-02-27
---

https://www.perplexity.ai/hub/blog/introducing-perplexity-computer

## Why This Matters

On **February 25, 2026** Perplexity announced — and on **February 27, 2026** shipped — **Computer**, a cloud-based multi-agent system that pitches itself as a "general-purpose digital worker." The hook: a single chat surface that decomposes a goal into subtasks and **routes each subtask to whichever of 19 frontier models is best suited to it** — Opus 4.6 for reasoning, Gemini for research, Grok for lightweight work, ChatGPT 5.2 for long-context, plus design and video generators — running in isolated compute environments with real filesystems, browsers, and tool access.

This is the first launch from a major AI consumer brand where the **orchestration layer is the product** and the underlying models are deliberately interchangeable. Everyone else (OpenAI, Anthropic, Google) is selling vertical integration with their own model family. Perplexity is selling the meta-layer that picks among everyone else's.

## What It Actually Does

- **Multi-model routing across 19 models.** You don't choose the model; Computer does, per subtask.
- **End-to-end project execution.** Research → design → code → deploy → ongoing management, all in one session.
- **Parallel agents.** Dozens of agents running simultaneously on the same goal.
- **Isolated compute environments.** Each run gets its own filesystem, browser, and tool surface.
- **Async, long-running workflows.** Tasks can span "hours to months" — not the few-minute envelope most agent products live in.
- **API + web integrations.** Browsing, fetching, calling external services as first-class tools.

## Pricing & Access

| Tier | Price | Notes |
|---|---|---|
| Perplexity Max | $200/mo | Initial access tier — currently the only way in |
| Perplexity Pro | $40/mo | Standard; Computer access TBD |
| API | $0.20–$5 / 1M tokens | Pay-as-you-go, model-dependent |
| Enterprise Max | $34/seat/yr | SSO, audit logs, custom integrations — "soon" |

SDK is `pip install perplexityai`, with an **OpenAI-compatible** interface for easy migration.

## How It Compares

The comparison set is **Claude Computer Use, OpenAI Operator, and ChatGPT Agent** — all of which expose roughly the same primitive (an agent that can drive a virtual desktop / browser / shell). Where Computer differs is the **single-model assumption**. Each competitor runs one provider's model end-to-end. Computer treats model selection as a per-subtask routing problem.

A developer quote from early-access coverage gets at it: *"Claude has 'Computer Use' too but setting up Docker and API keys takes a few hit and tries… Perplexity Computer just asks what you want."* And: *"the part that gets me is how it picks the right model for the job without you having to think about it. That's the orchestration problem nobody else has cleanly solved yet."*

The honest read: **the orchestration problem is real, and treating it as a product is novel — but it also means Perplexity is publicly betting that no single frontier model will dominate.** That's a defensible bet today; less so if any one lab pulls cleanly ahead.

## What's Interesting About It Strategically

1. **Perplexity owns no frontier model.** This product reframes that from a weakness into a position: *we're the only ones who can route to all of them.*
2. **The price ladder ($40 / $200 / $34-per-seat enterprise) implies the heavy lifting is at Max tier.** That's where the model-orchestration overhead is being paid for.
3. **"Hours to months" async** is the most consequential capability claim. If it holds up, this is the first agent product positioned for genuinely long-horizon work rather than session-bounded automation.

## Our Take

The 19-model orchestration angle is the right framing for a market that increasingly looks **multi-model by default**. Most teams we work with already juggle Claude + GPT + Gemini for different tasks; an explicit router that handles that switching is a useful primitive.

The skepticism: routing-as-a-product only stays valuable if no single model becomes good enough at everything to make routing redundant. If that happens — and it has happened before in adjacent markets — the orchestration layer collapses into a thin wrapper. Worth watching whether Computer accumulates enough workflow-specific value (memory, environment state, tool integrations) to matter even in a world where the routing question gets easier.
