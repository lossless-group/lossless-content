---
date_created: 2025-04-15
date_modified: 2026-06-01
title: Gemma 3 Released
slug: gemma-3-released
tags: [Gemma, Google-DeepMind, Open-Models, Multimodal, Local-AI, Long-Context]
homepage: https://deepmind.google/models/gemma/gemma-3/
release_date: 2025-03-12
---

Google DeepMind released **[Gemma 3](https://deepmind.google/models/gemma/gemma-3/)** on March 12, 2025 — the third generation of its open-weight model family, and the first that takes the "small enough to run locally, smart enough to matter" pitch seriously across the whole size range.

## What Shipped

Four sizes: **1B, 4B, 12B, and 27B parameters**, in both base and instruction-tuned variants. The 4B, 12B, and 27B models are **multimodal** (image + text in, text out); the 1B is text-only. All four support a **128K-token context window** — a 16× jump from Gemma 2's 8K — and **140+ languages** out of the box.

The headline result is the 27B: on the LMArena leaderboard at launch it posted a Chatbot Arena Elo of ~1338, putting it ahead of Llama-3-405B and within striking distance of Gemini 1.5 Pro despite being roughly an order of magnitude smaller. Hugging Face's [launch writeup](https://huggingface.co/blog/gemma3) confirms the 4B model beats the previous-generation Gemma-2-27B on most benchmarks — a generational compression that's the actual story here.

## Why It Matters

Gemma 3 is the first widely available open model where the "run it on a single consumer GPU or a recent MacBook" promise lines up with "actually competitive with the frontier closed models for general tasks." The 27B fits on a single H100 or a 2× consumer-GPU rig; the 4B runs comfortably on Apple Silicon. Combined with the 128K context window and native vision support, it collapses three previously-separate model categories — *local chat model*, *local vision model*, *long-context summarizer* — into one set of weights.

For the [[concepts/Pseudomonorepos]] tree this is the kind of model that makes local-first agent workflows actually viable. Pair it with the local-inference stacks showing up in the [[Homebrew Roundup - 2026-06-01]] (`mirai`, `vmlx`) and the "run a capable model on my own machine without sending the [[context-vigilance]] corpus to a third party" path stops being aspirational.

Worth pairing with [Simon Willison's notes](https://simonwillison.net/2025/Mar/12/gemma-3/) for the practitioner's-eye view of what shipped and what's actually new versus marketing.

Sources:
- [Gemma 3 — Google DeepMind](https://deepmind.google/models/gemma/gemma-3/)
- [Welcome Gemma 3 — Hugging Face](https://huggingface.co/blog/gemma3)
- [Notes on Google's Gemma 3 — Simon Willison](https://simonwillison.net/2025/Mar/12/gemma-3/)
- [Gemma releases — Google AI for Developers](https://ai.google.dev/gemma/docs/releases)
