---
date_created: 2026-04-28
date_modified: 2026-04-28
title: DeepSeek V4 Runs on Huawei Ascend — A Frontier Model Without NVIDIA
slug: deepseek-v4-huawei-ascend
tags: [LLMs, DeepSeek, China-AI, Huawei, Hardware, Geopolitics, Open-Weights]
release_date: 2026-04-24
---

https://fortune.com/2026/04/24/deepseek-v4-ai-model-price-performance-china-open-source/

## Why This Matters

On **April 24, 2026**, DeepSeek released **V4 Pro** (1.6T parameters, 49B active per token) and **V4 Flash** (284B / 13B active) under an **MIT license**, with a **1,000,000-token context window** across both tiers. Pricing is the part that gets headlines — V4-Pro at **$1.74 / 1M input tokens**, V4-Flash at **$0.14 / 1M** — but pricing is the second-order story.

The first-order story: V4 is **the first frontier-class model designed from the ground up to train and serve on Chinese silicon without NVIDIA anywhere in the loop**. Huawei announced "day zero" full support on their Ascend AI supernodes the same day. DeepSeek granted Huawei pre-release access to weights and kernel optimizations to ensure production-grade performance at launch.

That is the kind of milestone that the US export-control regime was explicitly designed to prevent, and it has now happened.

## What Got Released

### V4-Pro — 1.6T MoE
- 1.6 trillion total parameters, **49B active per token** (~3% activation ratio).
- 1M-token context window.
- **9.5× lower memory requirements** than comparable models at the same tier (per DeepSeek's published optimizations).
- $1.74 per million input tokens — undercuts GPT-5.5 by roughly **10×**.

### V4-Flash — 284B MoE
- 284B total, 13B active.
- Same 1M context.
- $0.14 per million input tokens — at the floor of what any frontier-adjacent model has charged.

### License
MIT. The weights are downloadable. That matters for replication, for self-hosting, and for the next labs that want to build on top.

## The Huawei Ascend Angle

This is the part that changes the geopolitical conversation:

- **Day-zero support on Ascend supernodes.** DeepSeek and Huawei coordinated the launch — pre-release weight access, kernel optimizations co-developed, full inference pipeline ready at announcement.
- **Pricing will fall further when Ascend 950 ships at scale** in H2 2026. The current $1.74 number is on current-gen Ascend hardware; the next generation is the actual production target.
- **No NVIDIA in the loop.** Not in training, not in serving, not in the optimization toolchain. This is what "AI sovereignty" looks like when it actually works.
- **Tests the export-control thesis.** US export controls on advanced GPUs to China have been the primary lever of US AI policy since 2022. V4's existence is empirical evidence on whether that lever still works at the frontier. The early read is: not as well as Washington hoped.

## How Significant Is This Compared to Prior Releases?

| Version | Year | Significance |
|---------|------|-------------|
| DeepSeek V2 | 2024 | First serious open-weights MoE from a Chinese lab |
| DeepSeek V3 | 2024 | 671B MoE; competitive with GPT-4o on benchmarks |
| DeepSeek R1 | 2025 | Reasoning-focused; sparked the "DeepSeek moment" market correction |
| **DeepSeek V4** | **2026** | **1.6T MoE, 1M context, Huawei Ascend native, MIT-licensed, undercuts GPT-5.5 by 10×** |

## Where It Fits in Our Workflow

- **Pricing pressure on every API budget.** Anything we currently route to GPT-5.5 or Claude Opus 4.6 for cost-tolerant batch work has a 10× cheaper substitute available. Worth evaluating V4-Flash for the bulk content-ingestion paths in `context-vigilance-kit`.
- **Self-hosted option.** MIT weights + 1M context + 9.5× lower memory requirements means V4-Flash is realistically deployable on a single high-end node. Pairs with the Llama 5 distilled-variants question — *both* of these are real candidates for the local-inference tier.
- **Hardware diversification matters.** We are currently NVIDIA-on-everything for compute. The V4-on-Ascend story is the first credible signal that the rest of the decade will have multiple competitive AI hardware stacks. Worth tracking what cloud providers offer Ascend capacity outside China — and whether any of our deployment targets will give us the option.

## Sources

- [DeepSeek Unveils V4 — Fortune (2026-04-24)](https://fortune.com/2026/04/24/deepseek-v4-ai-model-price-performance-china-open-source/)
- [Three reasons why DeepSeek's new model matters — MIT Technology Review](https://www.technologyreview.com/2026/04/24/1136422/why-deepseeks-v4-matters/)
- [DeepSeek V4 on Huawei Ascend — Tech Insider](https://tech-insider.org/deepseek-v4-huawei-ascend-1-6-trillion-parameter-moe-2026/)
- [DeepSeek Releases V4 With 9.5× Lower Memory Requirements — gHacks](https://www.ghacks.net/2026/04/26/deepseek-releases-v4-models-with-9-5x-lower-memory-requirements-and-huawei-ascend-support/)
- [DeepSeek V4 Pro runs on Huawei chips — undercuts GPT-5.5 by 10× — gagadget](https://gagadget.com/en/706936-deepseek-v4-pro-runs-on-huawei-chips-and-undercuts-gpt-55-by-10x-amp/)
