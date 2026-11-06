---
site_uuid: cc338791-32de-4637-a16c-a28f21a2fc62
title: Phi-Series Models
site_visibility: public
date_modified: 2026-11-06
date_created: 2025-03-31
tags:
  - AI-Toolkit
  - AI-Models
cf_last_run: 2026-11-06T19:10:22.699Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 6
cf_last_run_retrieval: 2026-11-06T19:10:22.699Z
created_by: "[[Tooling/AI-Toolkit/Model Producers/Microsoft Research|Microsoft Research]]"
---

An [[AI Models|AI Model]] by [[organizations/Microsoft]] [[Microsoft Research]]

https://youtu.be/w22WT1bgn5s?si=H6JKCx1tBg4tJ6TT

https://youtu.be/qAgAQQ41P3A?si=9NkRcoAR3zmXxAwS

## Value Proposition & Features

Phi-Series Models is Microsoft’s family of small language models (SLMs), designed to provide capable language-model functionality with lower deployment overhead than larger models. Microsoft reports that the family has exceeded 60 million downloads, representing threefold year-over-year growth. [^vmd7pd]

Core capabilities include efficient local inference, instruction following, reasoning, and chat across multiple model sizes. Phi Silica is optimized for hardware-accelerated execution on Windows Copilot+ PCs and supported Windows devices, including NPU and GPU deployment paths. [^csbs32]

- Small-footprint language models for local and resource-constrained deployments. [^csbs32]
- Phi-4 and Phi-4 Mini Instruct model variants for reasoning, chat, and lightweight instruction following. [^m53n1n]
- On-device execution through Phi Silica on Copilot+ PCs. [^csbs32]
- GPU support for selected NVIDIA and AMD hardware with at least 6 GB of VRAM. [^csbs32]
- Availability through Microsoft Foundry and Azure model catalogs. [^71g9fw] [^2yvj8u]
- Deployment options through ONNX and vLLM in Foundry Local. [^m53n1n]
- Integration with Windows applications through Windows AI APIs. [^csbs32]

Phi-Series Models belongs in the broader [[Vocabulary/AI Models|AI Models]] landscape and is especially relevant to compact [[Vocabulary/Large Language Models|Large Language Models]] used at the edge.

## Screenshots

No three official public screenshots were identified in the available results.

# Product Roadmap / Announcements

As of November 9, 2026, publicly indexed announcements indicate the following:

- October 2026 — Microsoft reported that Phi-family downloads had surpassed 60 million. [^vmd7pd]
- October–November 2026 — Microsoft documentation listed Phi models in Azure AI Foundry and Foundry Local catalogs. [^71g9fw] [^2yvj8u] [^m53n1n]
- November 2026 onward — Microsoft documentation stated that Phi Silica would be replaced by Aion Instruct on Windows devices, with retail rollout planned for January 2027. [^csbs32]

## Recent Developments

Microsoft’s recent product direction emphasizes distributing Phi models through [[Tooling/AI-Toolkit/AI Programming Frameworks/Azure AI Foundry|Azure AI Foundry]] Foundry and local Windows execution environments. [^71g9fw] [^2yvj8u] Phi Silica remains available during the transition to Aion Instruct, with support spanning [[concepts/Explainers for AI/AI Copilots|Copilot]]+ PC [[Vocabulary/Neural Processing Units|NPUs]] and selected discrete [[Vocabulary/Graphics Processing Units|GPUs]]. [^csbs32]

## Notable Team Members

No reliable source found in the available results identifying individual Phi-Series Models founders or product leaders.

# Market Sizing

## Category, Market Size, and Category Growth

Phi-Series Models fits the small language model, edge AI, on-device AI, and enterprise model-deployment categories. Microsoft’s reported 60 million-plus downloads indicate substantial adoption, but no credible market-size or category-growth estimate was provided in the available results. [^vmd7pd]

## Pricing

| Tier | Price |
|---|---|
| Phi-Series Models | No public standalone pricing found |
| Azure AI Foundry | Usage-based; pricing depends on the services and features used. [^71g9fw] |

## Revenue Trajectory Estimates

No reliable standalone revenue or ARR estimate was found for Phi-Series Models.

# Competitive Landscape

## Who it's for, who it's not for

Phi-Series Models is suited to developers and enterprises needing compact language models for local, private, latency-sensitive, or resource-constrained applications, including Windows applications and Azure deployments. [^71g9fw] [^csbs32]

It is not the clearest fit for workloads requiring the broadest frontier-model capability, very long-context processing, or a fully managed model experience without deployment and hardware considerations.

## Viable Alternatives

- **Llama** — Open-weight model family with broad ecosystem support and multiple deployment sizes.
- **Mistral** — Compact and general-purpose models suitable for self-hosted and cloud deployments.
- **Qwen** — Broad multilingual and multimodal model family available through multiple infrastructure platforms.
- **Gemma** — Google’s smaller-model family aimed at efficient developer and research use.
- **GPT-4.1 Mini/Nano** — Managed Azure alternatives when hosted inference is preferred over local execution. [^2yvj8u]

## Competitor Table

| Competitor | Description |
|---|---|
| [Llama](https://www.meta.com/) | Open-weight model family competing in compact and general-purpose deployment scenarios. |
| [Mistral](https://mistral.ai/) | Efficient language models available for cloud and self-hosted use. |
| [Qwen](https://qwenlm.ai/) | Broad model family spanning language and multimodal workloads. |
| [Gemma](https://deepmind.google/models/gemma/) | Smaller models designed for efficient developer deployment. |
| [GPT-4.1](https://azure.microsoft.com/) | Azure-hosted model family offering managed inference rather than primarily local execution. [^2yvj8u] |


***

# Sources

[^vmd7pd]: 2026, Oct 28. [microsoft.com](https://www.microsoft.com/). [Microsoft Fiscal Year 2026 First Quarter Earnings Conference Call](https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q1?msockid=3e2ff63e04ed642e2bd0ee3e0552653f). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^71g9fw]: 2026, Oct 29. [azure.microsoft.com](https://azure.microsoft.com/). [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry/?msockid=344c86e94b1a61db3b1d91194a1a6022). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^csbs32]: 2026, Oct 19. [learn.microsoft.com](http://www.learn.microsoft.com/). [Get started with Phi Silica in the Windows App SDK](http://www.learn.microsoft.com/en-us/windows/ai/apis/phi-silica). Updated: 2026, Oct 30. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^2yvj8u]: 2026, Oct 29. [learn.microsoft.com](https://learn.microsoft.com/). [Foundry Models sold by Azure - Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?view=azureml-api-1). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^m53n1n]: 2026, Nov 03. [learn.microsoft.com](https://learn.microsoft.com/). [Model catalog and sourcing in Foundry Local on Azure Local](https://learn.microsoft.com/he-il/azure/azure-sovereign-clouds/private/foundry-local/concept-model-catalog). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[6]: 2026, Oct 13. [techcommunity.microsoft.com](https://techcommunity.microsoft.com/). [Inference Options on Azure: An Architect’s View | Microsoft Community Hub](https://techcommunity.microsoft.com/blog/StartupsatMicrosoftBlog/inference-options-on-azure-an-architect%E2%80%99s-view/4563542). Updated: 2026, Nov 05. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[7]: 2026, Oct 26. [marketplace.microsoft.com](https://marketplace.microsoft.com/). [HIPAA Azure AI Foundry Agent PoC (Healthcare Agent Service ...](https://marketplace.microsoft.com/en-nz/product/krivaiinc1765740253584.m3-hipaa-foundry-agent-poc). Updated: 2026, Oct 29. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[8]: 2026, Oct 19. [learn.microsoft.com](https://learn.microsoft.com/). [Tutorial: ASP.NET Core chatbot with SLM extension - Azure App Service](https://learn.microsoft.com/en-my/azure/app-service/tutorial-ai-slm-dotnet). Updated: 2026, Nov 05. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[9]: 2026, Oct 28. [microsoft.com](https://www.microsoft.com/). [Microsoft Fiscal Year 2027 First Quarter Earnings ...](https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1). Updated: 2026, Oct 30. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[10]: 2026, Nov 03. [marketplace.microsoft.com](https://marketplace.microsoft.com/). [Philter](https://marketplace.microsoft.com/en-ca/product/philterdllc1687189098111.philter). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.

## Sources (retrieved)

[^E1]: [phitech.io](https://phitech.io/). [Phi Technologies s.r.o.](https://phitech.io/). Generated: 2026, Nov 06. [Exa.ai](https://exa.ai) API response.
[^E2]: [bfl.ai](https://bfl.ai/). [Black Forest Labs](https://bfl.ai/). Generated: 2026, Nov 06. [Exa.ai](https://exa.ai) API response.
[^E3]: [flower.ai](https://flower.ai/). [Flower Labs](https://flower.ai/). Generated: 2026, Nov 06. [Exa.ai](https://exa.ai) API response.
[^E4]: [phi3d.com](https://phi3d.com/). [Phi](https://phi3d.com/). Generated: 2026, Nov 06. [Exa.ai](https://exa.ai) API response.
[^E5]: [minimax.io](https://minimax.io/). [MiniMax](https://minimax.io/). Generated: 2026, Nov 06. [Exa.ai](https://exa.ai) API response.
[^E6]: [hpc-ai.com](https://hpc-ai.com/). [HPC-AI Tech](https://hpc-ai.com/). Generated: 2026, Nov 06. [Exa.ai](https://exa.ai) API response.
