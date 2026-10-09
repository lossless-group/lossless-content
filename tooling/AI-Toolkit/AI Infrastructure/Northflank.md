---
url: https://northflank.com/
date_created: 2026-10-04
date_modified: 2026-10-08
og_title: The runtime platform for AI-native companies
og_description: Run AI agents, services, databases, and GPUs in secure microVMs. One governed path from commit to production, on our cloud or your own.
og_image: http://assets.northflank.com/marketing/image/meta-1200.png
og_favicon: https://northflank.com/favicon.ico
og_site_name: Northflank — Deploy any project in seconds, in our cloud or yours.
og_type: website
og_last_fetch: 2026-10-08T20:47:43.810Z
site_name: Northflank
tags:
  - AI-Compute-Cloud-Providers
  - AI-Toolkit
  - Check-It-Out
  - Developer-AI
for_clients:
  - Laerdal
  - Param
  - Alpha Partners
site_uuid: dffffcf4-ed64-41c8-874e-e264f0e643c3
publish: true
title: Northflank
slug: northflank
at_semantic_version: 0.0.0.1
cf_last_run: 2026-10-08T20:49:32.434Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 1
cf_last_run_retrieval: 2026-10-08T20:49:32.434Z
---

[[Tooling/AI-Toolkit/AI Infrastructure/Lambda Labs|Lambda Labs]]
[[Tooling/AI-Toolkit/AI Infrastructure/RunPod|RunPod]]
[[Tooling/AI-Toolkit/AI Infrastructure/Pocket.ai|Pocket.ai]]

# Northflank

## Value Proposition & Features

Northflank positions itself as a full-stack deployment and infrastructure platform for AI applications, spanning source-code deployment, managed data services, GPU workloads, and isolated execution environments. Its BYOC model runs workloads inside a customer’s cloud account or VPC, while Northflank manages the platform layer.[11] The product is particularly suited to AI agents that execute generated or untrusted code because its [[concepts/Explainers for Tooling/Development Sandboxes]] provide microVM-backed isolation.[13]

- **Git-to-production deployment:** Supports Dockerfiles, Buildpacks, external images, CI/CD, Workflows, Templates, and GitOps.[12]
- **MicroVM Sandboxes:** Uses Kata Containers with Cloud Hypervisor as its primary microVM approach, with Firecracker and gVisor available where supported.[12]
- **AI-agent execution:** Provides isolated environments for coding agents and applications that need to execute generated or untrusted code.[15]
- **Managed databases and infrastructure:** Supports managed databases, caches, queues, persistent volumes, and other application services.[9]
- **GPU workloads:** Supports GPU services and GPU sandboxes for AI workloads.[9]
- **Bring-your-own-cloud:** Runs services inside customer-managed AWS, GCP, Azure, bare-metal, or other supported infrastructure while providing a managed control plane.[14]
- **Usage-based cloud pricing:** Northflank Cloud bills CPU and memory by usage, with no seat fees on its Pay-as-you-go model.[11]

## Screenshots

No three official screenshot URLs were identified in the available search results.

## Product Roadmap / Announcements

As of **October 8, 2026**, the publicly indexed announcements from the past six months include:

- **September 24, 2026:** Northflank announced that customers can install sandbox security on their own clusters and run workloads with microVM or gVisor isolation inside their own cloud.[1]
- **September 18, 2026:** Northflank described Sandboxes that boot in under one second and support configurable CPU and memory resources.[4]
- **September 8, 2026:** Northflank described its platform as supporting AI-agent sandboxes on Northflank Cloud, in customers’ own cloud accounts and VPCs, or on eligible on-premises infrastructure.[8]

## Recent Developments

In September 2026, Northflank published a series of comparisons and technical materials positioning its platform against Runloop, Blaxel, Fly.io, Porter, Qovery, and Daytona.[2][3][5][9][11][12] The material emphasizes microVM isolation, managed databases, GPU workloads, Git-based deployment, and BYOC rather than sandbox execution alone.[11][12]

# History and Origin Story

Northflank was founded in **2019** and is headquartered in London, United Kingdom. [^E1] The available search results do not provide a reliable, independently verified account of its founders or early founding story; no reliable source found.

## Fundraising History

| Round     |       Date |              Amount | Lead investor             |
| --------- | ---------: | ------------------: | ------------------------- |
| Angel     | 2019-07-25 |       Not disclosed | Not disclosed             |
| Seed      | 2020-07-07 |               $2.6M | Not disclosed             |
| Seed      | 2022-07-07 |               $2.6M | Not disclosed             |
| Seed      | 2024-11-11 |               $6.3M | [[Vertex Ventures]] US    |
| Series A  | 2024-11-11 |              $16.0M | [[Bain Capital Ventures]] |
| **Total** |          — | **$27.5M reported** | —                         |

Northflank’s supplied company metadata reports total funding of **$27.5 million**, including a $16 million Series A and three listed seed rounds. [^E1] A secondary account describes the November 2024 financing as a $16 million Series A led by Bain Capital Ventures and a $6.3 million seed led by Vertex Ventures US, with participation from Kindred Ventures, Tapestry VC, Pebblebed, and Uncorrelated Ventures.[14]

Bain Capital Ventures

[[Kindred Ventures]]

Pebblebed

[[Tapestry VC]]

Uncorrelated Ventures

Vertex Ventures US

## Notable Team Members

No reliable source found for a complete, current list of founders or notable leadership in the available search results.

## Market Sizing

## Category, Market Size, and Category Growth

Northflank fits the categories of **[[concepts/Explainers for AI/AI Cloud Infrastructure|AI Infrastructure]]**, **developer platforms**, **cloud application deployment**, **GPU cloud orchestration**, and **secure AI-agent execution**. Its differentiator is the combination of a full application lifecycle platform with BYOC deployment and microVM-based sandbox isolation.[8][11][12]

No reliable source found for a sufficiently authoritative, Northflank-specific estimate of total addressable market or category growth.

## Pricing

| Product / tier | Published pricing |
|---|---:|
| Northflank Cloud CPU | $0.01667 per vCPU-hour |
| Northflank Cloud memory | $0.00833 per GB-hour |
| Northflank BYOC CPU | $0.01389 per vCPU-hour |
| Northflank BYOC memory | $0.00139 per GB-hour |
| Pay-as-you-go seat fees | None |

Northflank states that Cloud and BYOC pricing is usage-based and billed per second, while underlying infrastructure costs in BYOC are billed directly by the cloud provider.[5][11] GPU and storage resources are billed separately.[4]

## Revenue Trajectory Estimates

No reliable reported revenue or ARR figure was found.

## Competitive Landscape

### Who it’s for, who it’s not for

Northflank is aimed at AI-native companies and engineering teams that need to deploy services, databases, GPUs, workflows, and AI-agent sandboxes through one platform, especially when workloads must run in a customer-controlled VPC or on-premises environment.[6][8] It is also suited to teams seeking self-service Git-based deployment without managing the underlying Kubernetes or cloud platform directly.[11]

It is less suited to teams seeking only a lightweight coding-agent sandbox, a basic platform-as-a-service for conventional web applications, or a fully hands-off shared cloud with no BYOC or infrastructure-control requirements; those use cases are the focus of narrower alternatives described in Northflank’s own comparisons.[2][9][12]

### Viable Alternatives

- **Runloop:** Focuses on Devbox environments for AI coding agents, whereas Northflank combines sandboxing with broader application infrastructure.[2]
- **Daytona:** Provides development and execution environments, but Northflank emphasizes the full workflow from source code to production plus managed services and GPUs.[12]
- **Fly.io:** Supports global deployments and microVM-based workloads, but Northflank covers a broader application stack.[5]
- **Qovery:** Provides developer self-service and cloud deployment, while Northflank adds managed data services, GPU workloads, microVM sandboxes, and broader BYOC targets.[11]
- **Porter:** Offers web services, workers, cron jobs, and container jobs, while Northflank supports a wider set of workloads including databases, GPUs, and microVM sandboxes.[9]

### Competitor Table

| Competitor | Description |
|---|---|
| [Runloop](https://runloop.ai/) | AI coding-agent Devbox environments with microVM-based isolation.[2] |
| [Daytona](https://www.daytona.io/) | Development and execution environments with multiple sandbox runtime options.[12] |
| [Fly.io](https://fly.io/) | Global application deployment with microVM-based workloads.[5] |
| [Qovery](https://www.qovery.com/) | Developer self-service deployment platform with a narrower infrastructure and workload scope than Northflank.[11] |
| [Porter](https://www.porter.run/) | Platform for web services, workers, cron jobs, and container jobs.[9] |


***

# Sources

[1]: [August & September 2026 | Changelog](https://northflank.com/changelog/august-and-september-2026)
[2]: [Northflank vs Runloop: AI sandboxes, pricing, and infrastructure ...](https://northflank.com/blog/northflank-vs-runloop)
[3]: [Northflank vs Blaxel: AI sandboxes, pricing, and infrastructure ...](https://northflank.com/blog/northflank-vs-blaxel)
[4]: [Northflank vs Fly.io Sprites: which platform fits your ...](https://northflank.com/blog/northflank-vs-flyio-sprites)
[5]: [Northflank vs Fly.io: which deployment platform should you choose?](https://northflank.com/blog/northflank-vs-flyio)
[6]: [How to choose a bring your own cloud (BYOC) platform ... - Northflank](https://northflank.com/blog/how-to-choose-a-bring-your-own-cloud-platform-for-your-enterprise)
[7]: [How to build and run an AI data analysis agent | Blog - Northflank](https://northflank.com/blog/how-to-build-and-run-an-ai-data-analysis-agent)
[8]: [How to deploy an AI sandbox for developer experimentation | Blog](https://northflank.com/blog/deploy-ai-sandbox-developer-experimentation)
[9]: [Northflank vs Porter: which platform fits your requirements? | Blog](https://northflank.com/blog/northflank-vs-porter)
[10]: [How to build secure AI agents for enterprise data | Blog](https://northflank.com/blog/how-to-build-secure-ai-agents-for-enterprise-data)
[11]: [Northflank vs Qovery: which platform fits your requirements?](https://northflank.com/blog/northflank-vs-qovery)
[12]: [Northflank vs Daytona: sandboxes, pricing, and infrastructure compared | Blog — Northflank](https://northflank.com/blog/northflank-vs-daytona)
[13]: [What infrastructure do AI agents need to run code safely? - Northflank](https://northflank.com/blog/ai-agent-code-execution-infrastructure)
[14]: [Northflank's $22.3M Bet on 'Your Own Cloud, Managed for You ...](https://bex.co/blog/2026/09/17/northflank-byoc-funding-self-hosting-money)
[15]: [Best microVM sandboxes for AI coding agents in 2026 - Northflank](https://northflank.com/blog/best-microvm-sandboxes-for-ai-coding-agents)

## Sources (retrieved)

[^E1]: [Exa.ai](https://exa.ai) API response for data on [Northflank](https://northflank.com/)
