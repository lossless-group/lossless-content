---
date_created: 2026-06-22
date_modified: 2026-06-22
title: GLM-5.2 — An Open-Weights Model Built for Long-Horizon Coding
slug: glm-5-2-long-horizon-coding
tags:
  - LLMs
  - Open-Weights
  - Coding-Agents
  - Long-Context
  - MIT-License
  - Chinese-AI
  - Open-Source-Alternatives
  - Public-Repos
announcement_url: https://z.ai/blog/glm-5.2
release_date: 2026-06-16
---

https://z.ai/blog/glm-5.2

## Why This Matters

On **June 16, 2026**, Z.ai (formerly Zhipu AI) released **GLM-5.2**, a **~753B-parameter** open-weights model built specifically for **long-horizon agentic coding** — the kind of task that runs for hours, spans dozens of tool calls, and accumulates a long, messy trajectory the model has to keep coherent. It ships under an **unrestricted MIT license**, with a **stable 1M-token context window**, and it is — per Z.ai's own benchmark table — **the highest-ranked open-source model on every long-horizon coding benchmark they report**.

The headline that traveled fastest: GLM-5.2 **beats GPT-5.5 on multiple long-horizon coding benchmarks at roughly 1/6th the API cost**, and lands within a few points of Claude Opus 4.8 — while being something you can download and run on your own hardware. That combination (frontier-adjacent coding capability + MIT weights + no regional restrictions) is the actual story, and it arrives at a moment when proprietary frontier access is getting *less* predictable, not more (Anthropic pulled Fable 5 / Mythos 5 entirely after a US export-control order the week prior).

This is the same pattern we flagged with [[deepseek-v4-huawei-ascend]]: a Chinese lab shipping open weights that compress the gap to the closed frontier and undercut it on price by an order of magnitude. GLM-5.2 is that pattern aimed squarely at **coding agents**.

## What Got Released

### The model
- **~753B total parameters** (built on the GLM-5 MoE backbone — 744B total / 40B active), MoE sparse-attention architecture.
- **1M-token context** — up 5× from GLM-5.1's 200K. Z.ai's framing is pointed: *"A 1M context is easy to claim, but much harder to keep reliable under real engineering pressure."* They expanded 1M-context training specifically for coding-agent trajectories (large-scale implementation, automated research, perf optimization, complex debugging).
- **Effort-level control** — selectable **High** or **Max** thinking modes, letting you trade capability against latency/token cost per task. Max pushes peak intelligence at ~85k output tokens/task; High sacrifices a few points while roughly halving token output.
- **MIT license, "Pure Open."** Weights on [HuggingFace](https://huggingface.co/zai-org/GLM-5.2) and ModelScope. Runs on transformers, vLLM, SGLang, xLLM, ktransformers. No regional limits, no acceptable-use governance, no vendor lock-in.

### The architecture — IndexShare
The new trick is **[IndexShare](https://arxiv.org/abs/2603.12201)**: every 4 sparse-attention (DSA) layers **share one lightweight indexer** — the indexer runs on the first of the 4 layers, and its top-k indices are reused for the other 3. This cuts the indexer dot-product and top-k compute in 3/4 of layers, reducing **per-token FLOPs by 2.9×** at 1M context. They also reworked the **MTP layer** for speculative decoding (IndexShare + KV-share + rejection sampling + end-to-end TV loss), lifting acceptance length **+20%** (4.56 → 5.47 on coding scenarios).

### The training infra
Post-training ran on **slime**, Z.ai's agentic-RL framework, using **critic-based PPO** (single-rollout, token-level advantages) rather than group-relative optimization — a deliberate fit for *compaction*, where one super-long trajectory gets split into many variable-length sub-traces. They also shipped an **anti-hack module**: coding RL is uniquely vulnerable to reward hacking (an agent can `curl` the reference solution or `cat` the hidden test cases), so an online rule-filter + LLM-judge guard blocks those calls mid-rollout and returns dummy results instead of aborting the trajectory.

## The Benchmarks That Matter

| Benchmark | GLM-5.2 | GLM-5.1 | GPT-5.5 | Claude Opus 4.8 | Gemini 3.1 Pro |
|---|---|---|---|---|---|
| **Terminal-Bench 2.1** (Terminus-2) | **81.0** | 63.5 | 84.0 | 85.0 | 74.0 |
| **SWE-bench Pro** | **62.1** | 58.4 | 58.6 | 69.2 | 54.2 |
| **FrontierSWE** (dominance) | **74.4** | 30.5 | 72.6 | 75.1 | 39.6 |
| **PostTrainBench** | **34.3** | 20.1 | 28.4 | 37.2 | 21.6 |
| **SWE-Marathon** | **13.0** | 1.0 | 12.0 | 26.0 | 4.0 |
| **MCP-Atlas** (tool use) | **76.8** | 71.8 | 75.3 | 77.8 | 69.2 |
| **AIME 2026** | **99.2** | 95.3 | 98.3 | 95.7 | 98.2 |

The shape of it: **GLM-5.2 edges out GPT-5.5 on the long-horizon coding benchmarks** (FrontierSWE, SWE-bench Pro, PostTrainBench, SWE-Marathon), **trails Opus 4.8 by small margins** (1% on FrontierSWE, 4 points on Terminal-Bench), and is **the first open-weights model to cross 80% on Terminal-Bench**. It also took **1st place on the crowdsourced Design Arena** (ELO 1360), beating even Claude Fable 5. The improvement over GLM-5.1 is the loudest signal — Terminal-Bench 63.5 → 81.0, FrontierSWE 30.5 → 74.4 — a genuine generational jump in one point release.

## Pricing — The Other Half of the Story

| | Input / 1M | Output / 1M | Total |
|---|---|---|---|
| **GLM-5.2** | **$1.40** | **$4.40** | **$5.80** |
| GPT-5.5 | $5.00 | $30.00 | $35.00 |
| Claude Opus 4.8 | $5.00 | $25.00 | $30.00 |
| DeepSeek-V4-Pro | $0.435 | $0.87 | $1.305 |

- API pricing **matches GLM-5.1's exact rates** — the capability jump came free.
- **Cached input at $0.26 / 1M** (with a limited-time free cached-input storage offer) — meaningful for long-context coding where the repo context is re-sent constantly.
- **GLM Coding Plan** from **$12.60/mo** (Lite) → $50.40 (Pro, 5× usage) → $112 (Max, 20× usage), with out-of-the-box support for Claude Code, OpenCode, Cline, Kilo Code, Crush, Factory, and Z.ai's own **ZCode** desktop agent.
- Note the quota mechanics if you subscribe: GLM-5.2 burns quota at **3× peak / 2× off-peak** (off-peak billed 1× as a promo through end of September). Peak is 14:00–18:00 Beijing time.

## How Significant Is This Compared to Prior Releases?

| Version | Year | Significance |
|---|---|---|
| GLM-4.5 | 2025 | 355B / 32B active MoE; the "vibe coding" generation |
| GLM-5 | 2026 | Scaled to 744B / 40B active, 28.5T training tokens; *"from vibe coding to agentic engineering"* |
| GLM-5.1 | 2026 | 200K context; strong open coding model, still trailing the closed frontier |
| **GLM-5.2** | **Jun 2026** | **~753B, 1M context, IndexShare, effort-level control, MIT — first open model past 80% on Terminal-Bench, beats GPT-5.5 on long-horizon coding** |

## Where It Fits in Our Workflow

- **A real self-hosted coding-agent option.** MIT weights + 1M context + 2.9× FLOPs reduction at full context means GLM-5.2 is the strongest open candidate yet for a *local* agentic-coding tier — work that today routes to Opus or GPT-5.5 but doesn't need to leave our own infrastructure. Pairs with the local-inference thread from [[Tooling/AI-Toolkit/Model Producers/DeepSeek|DeepSeek]] [[deepseek-v4-huawei-ascend]] and the Llama 5 distilled-variants question.
- **Drop-in for the harnesses we already use.** It speaks [[Tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude Code]] and [[Tooling/AI-Toolkit/Agentic AI/OpenCode]] natively (`GLM-5.2[1m]` enables the 1M window in Claude Code — note the `[1m]` suffix convention, same shape as our own `claude-opus-4-8[1m]`). Worth a side-by-side on a real long-horizon task in this tree — a content roll-up or a cross-submodule refactor is exactly the "hours-long, messy trajectory" it's tuned for.
- **Cost lever for batch coding work.** At $5.80 total per 1M tokens (and $0.26 cached input), GLM-5.2 is ~1/6th of GPT-5.5 and ~1/5th of Opus 4.8 for output-heavy agent loops. For cost-tolerant bulk work it's a serious substitute.
- **The "effort level" idea is worth stealing conceptually.** High vs. Max as an explicit per-task knob — rather than a hidden reasoning budget — is a cleaner mental model than what most frontier models expose. Useful framing when we decide how much compute a given agent task in the tree deserves.

## Sources

- [GLM-5.2: Built for Long-Horizon Tasks — Z.ai blog (2026-06-16)](https://z.ai/blog/glm-5.2)
- [Z.ai's open-weights GLM-5.2 beats GPT-5.5 on multiple long-horizon coding benchmarks for 1/6th the cost — VentureBeat](https://venturebeat.com/technology/z-ais-open-weights-glm-5-2-beats-gpt-5-5-on-multiple-long-horizon-coding-benchmarks-for-1-6th-the-cost)
- [GLM-5: From Vibe Coding to Agentic Engineering — Z.ai blog](https://z.ai/blog/glm-5)
- [zai-org/GLM-5 — GitHub](https://github.com/zai-org/GLM-5)
- [GLM-5.2 weights — HuggingFace](https://huggingface.co/zai-org/GLM-5.2)
- [IndexShare — arXiv 2603.12201](https://arxiv.org/abs/2603.12201)
