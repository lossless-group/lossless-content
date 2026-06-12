---
url: https://vast.ai/
date_created: 2025-09-06
date_modified: 2026-06-09
tags:
  - AI-Infrastructure
  - AI-Toolkit
  - AI-Compute-Cloud-Providers
  - Low-Cost-Alternatives
og_title: Rent GPUs
og_description: Rent high-performance cloud GPUs at low cost with Vast.ai. Instantly deploy GPU rentals for AI, machine learning, deep learning, and rendering. Flexible pricing, fast setup, and global availability
og_image: https://vast.ai/home/Vast_Social_Banner.png
og_favicon: https://vast.ai/icon.png
og_last_fetch: 2025-09-06T13:21:07.103Z
site_name: Vast.ai
site_uuid: e4aac9e7-ef1d-4ba4-abe5-85e5a303094a
publish: true
title: Vast.ai
slug: vast-ai
at_semantic_version: 0.0.0.1
cf_last_run: 2026-06-09T00:23:01.465Z
cf_last_run_model: Perplexity sonar-pro
---

[[concepts/Explainers for AI/AI Cloud Infrastructure|AI Cloud Infrastructure]]
[[concepts/Explainers for AI/AI Compute Cloud Providers]]

# Value Proposition & Features

Vast.ai is a **peer-to-peer GPU rental marketplace** that offers low-cost cloud GPUs by letting independent hardware owners list their GPUs and set their own prices. [^3cirjd] Vast.ai positions itself as a **“decentralized GPU cloud”** that is often the **cheapest hourly GPU option** on the market, in exchange for heterogeneous hardware and variable reliability compared with traditional cloud providers. [^3cirjd]

Core product features (2–3 sentences each):

- **Decentralized GPU marketplace:** Independent hosts (e.g., gamers with spare RTX 3090/4090s, ex-crypto mining operators, and small colocation facilities) list their hardware on Vast.ai and set custom pricing, while Vast handles user accounts, billing, and orchestration. [^3cirjd] Vast does not own data centers and instead focuses on the marketplace and platform layer. [^3cirjd]

- **Container-based compute orchestration:** Users deploy workloads via Docker containers with access through SSH and Jupyter, allowing quick spin-up of AI, ML, and rendering jobs on rented GPUs. [^3cirjd] This model targets workloads like training, fine-tuning, and batch inference where users can manage their own software stack.

- **Flexible, spot-style pricing:** Vast.ai offers multiple pricing modes such as **on-demand**, **reserved**, and **interruptible/spot-like** instances, with very low headline per-hour prices for popular GPUs (e.g., RTX 3090/4090) compared with hyperscalers. [^3cirjd] The marketplace uses bidding-like dynamics where interruptible instances can be preempted by higher bidders, pushing prices down for flexible workloads. [^3cirjd]

- **Global, heterogeneous inventory:** Vast.ai aggregates thousands of GPUs across many providers and locations, giving users access to a wide range of consumer and datacenter GPUs at varying price/performance levels. [^3cirjd] This results in deep inventory of consumer-grade GPUs that hyperscalers typically do not offer, but also introduces variability in bandwidth, uptime, and disk I/O depending on host quality. [^3cirjd]

Key features (priority order):

- **Peer-to-peer GPU marketplace with independent hosts and pricing.**[^3cirjd]  
- **Low-cost GPU rentals, often significantly cheaper than major cloud providers.**[^3cirjd]  
- **Support for container-based deployments (Docker) with SSH/Jupyter access.**[^3cirjd]  
- **Multiple pricing tiers (on-demand, reserved, interruptible/spot-style) to match workload flexibility.**[^3cirjd]  
- **Large, globally distributed inventory of consumer and datacenter GPUs (e.g., RTX 3090/4090, A100, H100).**[^3cirjd]  
- **Vast-managed billing, user accounts, and 24/7 support layer, while hosts provide the hardware.**[^3cirjd]  
- **Marketplace model that avoids Vast owning its own data centers, emphasizing capital efficiency.**[^3cirjd]

# History and Origin Story

Vast.ai was founded in **2018** in **Los Angeles, California** as a decentralized GPU cloud marketplace aimed at providing cheaper, more flexible access to GPU compute by aggregating spare capacity from independent hosts instead of building its own data centers. [^3cirjd] The company has remained relatively lean and capital efficient, funding host hardware via the marketplace model rather than direct capex. [^3cirjd]

## Fundraising History

Available information indicates early funding but not a detailed round-by-round breakdown:

| Round | Date | Amount | Lead investor |
|-------|------|--------|---------------|
| Early funding (undisclosed round type) | ~2018–2019 (approximate, not precisely disclosed) | ≈$4M | DRW Holdings / Nazare (reported as early backers) [^3cirjd] |
| Total | — | ≈$4M (estimated total funding) | — |

Investors (alphabetical):

- **DRW Holdings**[^3cirjd]  
- **Nazare**[^3cirjd]  

## Notable Team Members

**Jake Cannell (Founder / CEO):** Jake Cannell is identified as the founder and CEO of Vast.ai, leading the creation of the peer-to-peer GPU marketplace and emphasizing a decentralized, capital-efficient approach to cloud GPU infrastructure. [^3cirjd]

**Tavis Cannell (COO):** Tavis Cannell is reported as COO of Vast.ai, responsible for operations and helping scale the marketplace of independent GPU providers and users. [^3cirjd]

# Market Sizing

## Category, Market Size, and Category Growth

Vast.ai operates in the **cloud GPU / AI infrastructure** category, specifically as a **decentralized GPU cloud / peer-to-peer GPU marketplace** offering compute for AI, machine learning, deep learning, and rendering workloads. [^3cirjd] The broader AI infrastructure and cloud GPU market is part of the AI value chain’s “infrastructure” layer, which includes data centers and cloud services that support intensive model training and inference and is expected to grow significantly as AI adoption accelerates, according to financial market analysis of the AI value chain. [^7mstuh]

## Pricing

The jimmy·research profile reports three main pricing tiers with approximate floor rates as of 2026: [^3cirjd]

| Tier           | Description                                                                                         | Indicative pricing (approximate) |
|----------------|-----------------------------------------------------------------------------------------------------|-----------------------------------|
| On-Demand      | Standard on-demand GPU rentals with immediate access.                                               | Floor around **$0.29/GPU/hour**. [^3cirjd] |
| Reserved       | Longer-term reservations for more stable access.                                                    | Around **$0.20/GPU/hour**. [^3cirjd] |
| Interruptible  | Spot-style bidding where instances can be preempted by higher bidders (highest savings, less SLA). | Around **$0.10/GPU/hour**. [^3cirjd] |

Example headline GPU rates cited (all approximate): RTX 3090 from **~$0.12/hr**, RTX 4090 from **~$0.29/hr**, A100 PCIe from **~$0.52/hr**, H100 PCIe from **~$1.47/hr** on the platform. [^3cirjd]

## Revenue Trajectory Estimates

Vast.ai is reported to have approximately **$2.2M ARR** with around **38 employees** circa 2025, based on aggregated data from Crunchbase and public profiles referenced by jimmy·research. [^3cirjd] The analysis notes this figure likely reflects platform take-rate revenue (commission on GMV) rather than total transaction volume across the marketplace, which would be higher. [^3cirjd]

# Competitive Landscape

## Who it's for, who it's not for

Vast.ai is aimed at **ML researchers, indie developers, and teams running cost-sensitive training, fine-tuning, or batch/offline inference workloads** that can tolerate some variability and occasional interruptions, especially those priced out of major [[Hyperscale Cloud Providers|Hyperscalers]]. [^3cirjd] It is also suitable for users wanting access to **consumer GPUs like RTX 3090/4090** that are not typically available on large cloud platforms. [^3cirjd]

It is not ideal for organizations needing **strict production-grade SLAs, uniform infrastructure, and highly predictable performance**, because host quality, bandwidth, uptime, and disk I/O vary across independent providers. [^3cirjd] Workloads that cannot tolerate interruptions or require strong enterprise reliability guarantees may be better suited to more traditional or fully managed GPU clouds. [^3cirjd]

## Viable Alternatives

- **RunPod:** A close competitor offering both a peer-to-peer-style **Community Cloud** and a more vetted **Secure Cloud**, typically with higher prices than Vast but stronger developer experience and features like serverless and autoscaling. [^3cirjd]  
- **Lambda Labs (Lambda Cloud):** A [[concepts/Explainers for AI/AI Compute Cloud Providers]] with its own infrastructure, often used for ML training and inference workloads, positioned as an alternative to hyperscalers for dedicated GPU servers. [^3cirjd]  
- **CoreWeave:** A specialized GPU cloud that attracts many H100-class hosts and offers more traditional data-center-grade infrastructure, making it a common alternative for high-end, production workloads. [^3cirjd]  
- **Nebius:** Another GPU-focused cloud provider noted as a competitor in the high-performance AI compute market. [^3cirjd]  

## Competitor Table

| Competitor                                                                     | Description                                                                                                                                                                                                                                        |     |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| [[Tooling/AI-Toolkit/AI Infrastructure/RunPod\|RunPod]]                        | GPU cloud with a **Community Cloud** (peer-to-peer style) and **Secure Cloud** (vetted data centers), generally more expensive per hour than Vast.ai but with stronger “just works” developer experience, serverless features, and autoscaling. [^3cirjd] |     |
| [[Tooling/Software Development/Cloud Infrastructure/Lambda Labs\|Lambda Labs]] | GPU cloud provider (Lambda Cloud) that offers dedicated GPU instances from its own infrastructure as a lower-cost alternative to hyperscalers for ML training and inference. [^3cirjd]                                                                    |     |
| [[Tooling/AI-Toolkit/AI Infrastructure/CoreWeave\|CoreWeave]]                  | Specialized GPU cloud focused on high-end datacenter GPUs like A100/H100, appealing to hosts and customers needing production-grade performance and SLAs. [^3cirjd]                                                                                       |     |
| [[Nebius]]                                                                     | GPU and AI-focused cloud provider operating in the same high-performance compute market segment as Vast.ai and other GPU clouds. [^3cirjd]                                                                                                                |     |
|                                                                                |                                                                                                                                                                                                                                                    |     |


***

# Sources

[^3cirjd]: [Vast.ai - jimmy·research](https://jimmyresearch.com/entities/vast-ai/)
[2]: [Webex AI Agent Studio Administration guide](https://help.webex.com/article/ncs9r37/Webex-AI-Agent-Studio-Administration-guide)
[^7mstuh]: [The AI buzz in financial markets - CaixaBank Research](https://www.caixabankresearch.com/en/economics-markets/financial-markets/ai-buzz-financial-markets)
