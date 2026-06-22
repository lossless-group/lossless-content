---
site_uuid: af0ad643-4a71-4862-8bff-fc4b6b46dd25
github_repo_url: https://github.com/QwenLM
parent_org: "[[organizations/Alibaba]]"
huggingface_url: https://huggingface.co/Qwen
date_modified: 2026-06-19
date_created: 2025-03-31
tags:
  - AI-Toolkit
  - Foundation-Models
  - AI-Models
product_of: "[[Tooling/AI-Toolkit/Model Producers/Cerbras|Cerbras]]"
cf_last_run: 2026-06-19T18:04:27.930Z
cf_last_run_model: Perplexity sonar-pro
---

https://youtu.be/-_aurwwYeSc?si=fd7zk5AWompT5fhk

[[Tooling/AI-Toolkit/Model Producers/Cerbras|Cerbras]] seems to be a spin out of [[organizations/Alibaba|Alibaba]]

Another [[Large Language Models]]

https://youtu.be/y6Wh4SpRoao?si=QDMF9bqfn4GvX21x

https://youtu.be/RrXLXNr0BFM?si=OHofVqPvtJ-Ro9DS

https://youtu.be/BtVIMKQfj38?si=cdBetfOSS4Lt0dBE

https://youtu.be/jCv0KSxMqlo?si=Cbj33B_epaAUuNSs

https://youtu.be/-deQfN3rcBU?si=_TAijrWe2eZuruQf

https://youtu.be/oU0_vc1YT0k?si=01Cok9Y-exBjkg8I

https://youtu.be/EiafISs1b4s?is=9Qs_vNgdodK3m2Yo

https://youtu.be/uU10-jBcSUQ?si=y1f9EsXMO4PWTUiJ

![[IMG_2155.png]]

https://youtu.be/br2xnptRbjI?si=djh2egRz_93yy0Fw

# Value Proposition & Features

Qwen is a family of **large language and multimodal foundation models** (e.g., Qwen2, Qwen2.5, Qwen3) released by Alibaba Cloud / Alibaba Group for general-purpose AI tasks such as chat, code, reasoning, and tool use, with both cloud APIs and open-source variants for self-hosting. [^sik16k] [^eib2m7] Qwen’s value proposition centers on strong multilingual performance (especially Chinese–English), long-context reasoning, and a broad range of model sizes that cover edge deployment through enterprise-scale workloads. [^sik16k] [^eib2m7]

Core product features (each in 2–3 sentences):

- **Foundation model lineup (Qwen2 / Qwen2.5 / Qwen3 families)**  
  The Qwen project provides multiple generations of models (Qwen, Qwen1.5, Qwen2, Qwen2.5, Qwen3) spanning small to very large parameter counts and both base and instruction-tuned variants. [^sik16k] [^eib2m7] These include chat-optimized, coding, and vision-capable models, many released under permissive open-source licenses for commercial use. [^sik16k]

- **Hybrid-thinking / reasoning modes (Qwen3 “thinking” vs “non‑thinking”)**  
  Qwen3 introduces a “hybrid thinking” capability that lets users switch between a methodical, step‑by‑step *thinking* mode for complex reasoning and coding, and a faster *non‑thinking* mode for casual conversation. [^eib2m7] This is exposed in hosted offerings such as “Qwen3 235B” on platforms like Google’s Gemini Enterprise Agent Platform. [^eib2m7]

- **Long‑context understanding and document handling**  
  Newer Qwen3 variants feature large context windows suitable for deep reasoning on lengthy documents, codebases, and multi‑step workflows. [^eib2m7] Benchmarks and third‑party usage (e.g., in document extraction systems) emphasize Qwen’s ability to maintain logical and narrative consistency over thousands of tokens. [^sik16k] [^oai1ce]

- **Tooling ecosystem and integrations**  
  Qwen models are distributed via model hubs (e.g., ModelScope, Hugging Face), NGC-like catalogs, and are integrated into third‑party platforms and products (such as structured document extraction tools built “on Qwen 3.5”). [^oai1ce] This ecosystem enables developers to plug Qwen into agents, RAG pipelines, and application-specific stacks.

**Key features (5–8, in priority order):**

- **Wide model family from lightweight to very large (e.g., up to Qwen3 235B parameters) for different latency and quality trade‑offs. [^eib2m7]**  
- **Hybrid “thinking” vs “non‑thinking” reasoning modes in Qwen3 for complex tasks vs fast chat. [^eib2m7]**  
- **Multilingual support, with strong Chinese–English performance in both general and domain tasks. [^sik16k] [^eib2m7]**  
- **Long-context support for large documents, code, and multi-step reasoning. [^eib2m7]**  
- **Variants specialized for coding, chat, and vision, including models used in structured data extraction from documents. [^sik16k] [^oai1ce]**  
- **Availability as both open-source self‑hostable models and managed cloud APIs / MaaS deployments. [^sik16k] [^eib2m7]**  
- **Active benchmarking and tuning, with recent “Max” variants optimized for enterprise IT and agentic tasks. [^if7rp4]**

## Product Roadmap / Announcements

As of 2026-06-19,

- **2026-06-18 – Qwen3 235B GA on Gemini Enterprise Agent Platform**  
  Google’s Gemini Enterprise Agent Platform lists “Qwen3 235B” as a GA (“Launch stage: GA”) MaaS model, with the model card last updated 2026‑06‑18 and a release date of 2025‑08‑13 for the current variant. [^eib2m7]

- **2026-06-18 – Continued emphasis on hybrid thinking and long-context in Qwen3 model card**  
  The same Qwen3 235B model card highlights “hybrid thinking” and large-context capabilities, indicating ongoing positioning of Qwen3 as a flagship reasoning model in 2026. [^eib2m7]

- **2026-06-xx – Qwen3.7‑Max benchmark update**  
  The official Qwen account announced that “Qwen3.7‑Max just hit #3 on ITbench‑AA — a fresh benchmark testing how well models handle real-world enterprise IT tasks, agentic-style,” signaling active optimization for enterprise/agentic workloads. [^if7rp4]

*(No public Trello/Notion-style roadmap specific to Qwen’s own site was found; communication appears to occur via model cards, GitHub releases, and social posts.)*

## Recent Developments (last ~90 days)

- The Qwen3 235B model card on Gemini Enterprise Agent Platform was updated on 2026‑06‑18, confirming GA status and emphasizing hybrid thinking and long-context features. [^eib2m7]  
- Qwen3.7‑Max’s result of #3 on the ITbench‑AA benchmark was publicized by the official Alibaba Qwen social account, indicating competitive performance in enterprise IT and agentic tasks. [^if7rp4]

# History and Origin Story

Qwen originated as Alibaba’s internal large language model initiative and evolved into a publicly released family of open and hosted foundation models under the Qwen branding, with successive generations (Qwen, Qwen1.5, Qwen2, Qwen2.5, Qwen3) focused on improving multilingual capability, reasoning, and deployment flexibility. [^sik16k] [^eib2m7] Over time, Qwen models have been integrated into [[Alibaba Cloud]] offerings and external platforms (such as Google’s Gemini Enterprise Agent Platform) and adopted by third-party developers for tasks like structured document extraction and game content generation. [^sik16k] [^eib2m7] [^oai1ce] Public communications and branding associate Qwen closely with Alibaba Cloud / Alibaba Group, though detailed early founding narratives are sparse in readily available sources. [^sik16k] [^eib2m7]

## Notable Team Members

- **[[organizations/Alibaba|Alibaba]] / Alibaba Cloud leadership and AI research teams**  
  Public-facing materials attribute Qwen to Alibaba Cloud’s AI and large model teams rather than to named individual founders; Qwen is positioned as a corporate model family under Alibaba Group’s broader AI strategy. [^sik16k] [^eib2m7] No authoritative sources in the last several years highlight specific individuals as the “founders” of Qwen as a separate entity.

# Market Sizing

## Category, Market Size, and Category Growth

Qwen fits in the **foundation model / large language model (LLM) and multimodal model** category, specifically as part of the **AI toolkit** and **model-as-a-service (MaaS)** market segment. [^sik16k] [^eib2m7] The broader LLM and foundation-model market is typically sized in tens of billions of USD by 2030–2032 by major analysts, but precise breakouts for Qwen or Alibaba’s model revenue share are not provided in the cited sources; Qwen itself is positioned to compete in enterprise AI, cloud AI services, and open-source model ecosystems rather than a distinct market of its own. [^sik16k] [^eib2m7]


# Competitive Landscape

## Who it’s for, who it’s not for

Qwen is for **developers, enterprises, and researchers** who need strong Chinese–English multilingual models, want the option to self-host open-source checkpoints or consume managed APIs, and are building applications that benefit from long-context reasoning, hybrid chain-of-thought modes, or specialized variants (e.g., coding, document extraction). [^sik16k] [^eib2m7] [^oai1ce] It is particularly appealing for organizations already using Alibaba Cloud, or for workloads targeting Chinese-language users and regulatory environments where a China-based provider is advantageous. [^sik16k] [^eib2m7]

Qwen is not an obvious fit for teams that require tight integration with exclusively Western hyperscaler stacks where other proprietary models dominate, or for users who prefer a fully managed, single-vendor “agent platform” without managing any model choice themselves. [^eib2m7] It may also be less attractive for hobbyists who are deeply invested in alternative ecosystems (e.g., only OpenAI- or only Meta-based tooling) or for organizations with policies restricting use of Chinese-vendor AI services, even though open-source Qwen checkpoints can be self-hosted. [^sik16k] [^eib2m7]

## Viable Alternatives

- **OpenAI GPT‑4 / GPT‑4.1 / GPT‑4o family** – Strong general-purpose closed-source models with extensive ecosystem and tools, often a default choice for English-centric applications and hosted APIs.  
- **Anthropic Claude family** – Safety-focused, instruction-tuned models popular in enterprise and legal/knowledge-work scenarios, emphasizing constitutional AI and long-context.  
- **Google Gemini family** – Multimodal models integrated tightly with Google Cloud; Qwen3 235B is actually hosted as a third-party model within Google’s Gemini Enterprise Agent Platform, but Gemini itself is a core competitor as a foundation model family. [^eib2m7]  
- **Meta Llama 3 family** – High-performance open-source LLMs with strong community and tooling support, a key alternative for self-hosted or hybrid deployments.  
- **Mistral AI models (e.g., Mistral Large / Mixtral)** – Open and closed models optimized for efficiency and European data-sovereignty considerations.

## Competitor Table

| Competitor | Description |
|-----------|-------------|
| [OpenAI GPT‑4 family] | Closed-source frontier LLMs with strong general reasoning, coding, and ecosystem integrations, widely used via API in SaaS and enterprise applications. |
| [Anthropic Claude] | Instruction-tuned LLMs focused on safety and reliability, popular for knowledge work and long-context document tasks. |
| [Google Gemini] | Google’s multimodal foundation models integrated into Google Cloud; competes directly with Qwen for cloud-based AI workloads, even while also hosting Qwen3 235B as a MaaS option. [^eib2m7] |
| [Meta Llama 3] | Open-source LLM family with strong benchmarks and a large open ecosystem, a major alternative for developers who want permissive licensing and self-hosting. |
| [Mistral AI models] | Efficient and high-quality models (open and proprietary) suitable for European and global enterprises seeking flexible deployment and data control. |


***

# Sources

[^sik16k]: [Qwen 3.6 27B vs Gemma 4 31B: 500-Prompt Game Dev Test](https://aithinkerlab.com/qwen-3-6-27b-vs-gemma-4-31b-game-dev-benchmark/)
[^eib2m7]: [Qwen3 235B | Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/qwen/qwen3-235b)
[^if7rp4]: [Qwen3.7-Max just hit #3 on ITbench-AA](https://x.com/Alibaba_Qwen/status/2059891171405787169)
[^oai1ce]: [NuExtract3 Adds Vision to Structured Extraction, Built on Qwen 3.5 ...](https://www.instagram.com/p/DYvor9fjMxt/)
[5]: [Local Qwen isn't a worse Opus, it's a different tool - Hacker News](https://news.ycombinator.com/item?id=48580209)
[6]: [VSS Dev Profiles Sample Data - NGC Catalog - NVIDIA](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/vss-developer/resources/dev-profile-sample-data)
[7]: [Update! Qwen 3.6 (Qwen3.6-Coder-35B-A3B) is definitely usable for ...](https://www.instagram.com/reel/DZEEM5hNJB9/)
