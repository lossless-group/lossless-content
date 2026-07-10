---
url: https://hermes-agent.nousresearch.com/
product_of: "[[Tooling/AI-Toolkit/Model Producers/Nous Research|Nous Research]]"
date_created: 2026-03-22
date_modified: 2026-07-08
tags:
  - Agentic-AI
  - Vibe-Coding
  - Developer-AI
  - Developer-Tools
  - Terminal-Applications
  - Agentic-Framework
  - Influencer-Favorites
  - Agent-Harnesses
og_title: The Agent That Grows With You
og_description: An open-source agent that grows with you. Install it, give it your messaging accounts, and it becomes a persistent personal agent.
og_image: https://hermes-agent.nousresearch.com/img/hermes-og-image.png
og_favicon: https://hermes-agent.nousresearch.com/favicon.ico?favicon.0b3bf435.ico
og_last_fetch: 2026-04-27T18:47:34.159Z
site_name: Hermes Agent
for_clients:
  - FullStackVC
  - Laerdal
  - Param
  - Tonguc
  - Lossless
site_uuid: 597e4ed4-d957-4843-b692-41ab6561f78e
slug: hermes-agent
cf_last_run: 2026-07-07T03:38:53.676Z
cf_last_run_model: Perplexity sonar-pro
---

Created and maintained by [[Tooling/AI-Toolkit/Model Producers/Nous Research|Nous Research]]. 

[[concepts/Explainers for AI/Agent Harnesses|Agent Harnesses]]

Similar to [[Tooling/AI-Toolkit/Agentic AI/OpenClaw|OpenClaw]]

https://youtu.be/n32qq7Kwzh0?is=XXx7ZWsfbvf7S-l4

https://youtu.be/G47mnkGkYwQ?is=decoQbOZ6k4N-95W 

# Value Proposition & Features

Hermes Agent is a **local-first, self-improving AI agent framework** built by Nous Research that runs as a persistent process on infrastructure you control, reachable via a terminal interface and multiple messaging platforms. [^ire2js] [^n9yc1y] [^0wqah0] It is designed to “grow with you” by creating its own **skills**, maintaining **persistent memory**, and building a long‑term model of your workflows and preferences across sessions. [^ire2js] [^uzrkg2] [^n9yc1y]

Unlike single-session chatbots or IDE copilots, Hermes acts as a **continuous personal agent** that you access via Telegram, Slack, Discord, WhatsApp, Signal, CLI, and other channels, while it executes tools, shell commands, web browsing, and scheduled tasks in its own environment. [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0] It is **open-source**, supports multiple model providers (OpenAI, Anthropic, Google, OpenRouter, local models), and can run on anything from a $5 VPS to serverless backends or GPU clusters. [^vzik2z] [^ire2js] [^n9yc1y] [^0wqah0]

### Core Product Capabilities

- **Self-improving learning loop**  
  Hermes incorporates a “closed learning loop” where it creates reusable **skills** after complex multi-step tasks, improves them during use, and nudges itself to persist knowledge, building a deepening model of the user over time. [^ire2js] [^uzrkg2] [^n9yc1y] It stores curated memory, searches past conversations, and maintains user-specific files (e.g., MEMORY.md, USER.md) with FTS5-based search and LLM summarization for cross-session recall. [^ire2js] [^n9yc1y]

- **Local-first, multi-provider agent runtime**  
  Hermes runs on user-controlled infrastructure (local machines, VPS, Docker, SSH, Singularity, Modal, Daytona) and is not tied to a single cloud host, with support for OpenAI, Anthropic, Google Gemini, OpenRouter, and local LiteRT-LM models. [^vzik2z] [^ire2js] [^n9yc1y] [^0wqah0] This architecture avoids provider lock-in and allows users to bring their own API keys while keeping data on their own hardware. [^vzik2z] [^ire2js] [^n9yc1y] [^0wqah0]

- **Terminal TUI + messaging gateway**  
  The project provides a full terminal UI with multiline editing, slash-command autocomplete, conversation history, streaming tool output, and six terminal backends (local, Docker, SSH, Singularity, Modal, Daytona). [^ire2js] [^0wqah0] A built-in gateway process connects the same agent to more than 15–20 messaging channels (Telegram, Slack, Discord, WhatsApp, Signal, email, SMS, Microsoft Teams, Matrix, etc.) for cross-platform continuity. [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0]

- **Tooling, automation, and cron scheduling**  
  Hermes can browse the web, edit files, run shell commands, manage code via git, and integrate tools like Firecrawl, Tavily, Exa, and Parallel for search and scraping. [^vzik2z] [^n7hvw6] [^ire2js] [^n9yc1y] It supports scheduled tasks via a built-in cron system, delivering results to messaging platforms when jobs complete. [^ire2js] [^n9yc1y] [^0wqah0]

- **Persistent personal agent for mobile and desktop**  
  With Telegram and other chat integrations, Hermes serves as a personal assistant that can summarize documents, manage emails, generate code, or deliver daily briefs (e.g., news) from a phone while models run locally or on remote infrastructure. [^lu9v3a] [^fqvha3] [^0wqah0] Android and Umbrel packaging make it accessible as a mobile app or a self-hosted service in a sandboxed environment. [^vzik2z] [^n7hvw6]

### Priority Feature List

- **Self-improving skills system**: Automatically creates and refines reusable “skills” after complex tool-using tasks, forming a private playbook tailored to each user. [^ire2js] [^uzrkg2] [^n9yc1y]
- **Persistent memory across sessions**: Curated memory of user preferences, projects, and past conversations, searchable via FTS5 with LLM summarization. [^ire2js] [^uzrkg2] [^n9yc1y]
- **Local-first, multi-model support**: Runs on local or self-hosted infrastructure with support for OpenAI, Anthropic, Google, OpenRouter, and LiteRT-LM local models. [^vzik2z] [^ire2js] [^n9yc1y] [^0wqah0]
- **Terminal TUI interface**: Full-featured terminal UI with multiline editing, command autocomplete, history, and streaming tool outputs. [^ire2js] [^0wqah0]
- **Multi-channel messaging gateway**: Single agent reachable from Telegram, Slack, Discord, WhatsApp, Signal, email, SMS, Teams, Matrix, and more, with session continuity. [^n7hvw6] [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0]
- **Web search and extraction with Firecrawl**: Default web provider for search, scraping, and multi-page crawling, plus support for Tavily, Exa, and Parallel. [^n9yc1y]
- **Cron-based automation and scheduled tasks**: Built-in cron allows recurring jobs whose outputs can be delivered to messaging channels. [^ire2js] [^n9yc1y] [^0wqah0]
- **Umbrel and Android distributions**: Packaged as an Umbrel app and an Android app with a built-in Linux terminal, code execution, memory system, dashboard, and Hermes Pro option. [^vzik2z] [^n7hvw6]

---

## Product Roadmap / Announcements

As of July 07, 2026,

- **2026-06** – Firecrawl blog notes a **June 2026 update** to Hermes’ web reading pipeline, making web reading “up to 60x faster and 49x cheaper” by dropping a redundant summarization step and passing backend markdown directly to the agent. [^n9yc1y]
- **2026-06 (early)** – Commentary on X describes **Hermes Desktop** as having “officially launched the first week of June 2026,” coinciding with NVIDIA’s announcement of post-training support via Spark/NIM integrations. [^t0usqo]
- **2026-05** – PM’s field guide reports Hermes overtook OpenClaw in May to become “the most-used open-source agent on OpenRouter’s daily inference rankings,” a milestone implying recent prioritization of scalability and inference volume. [^uzrkg2]

---

## Recent Developments (past 90 days)

- A **June 2026 Firecrawl integration update** optimized Hermes’ web-reading stack, reducing cost and latency significantly for search and crawl operations while keeping Firecrawl as the default web provider. [^n9yc1y]
- NVIDIA’s DGX Spark documentation shows Hermes Agent featured as a supported “self-improving AI agent” that can run with local models on NIM/Spark infrastructure, highlighting growing support from hardware vendors. [^0wqah0] [^t0usqo]
- Community and commentary (e.g., on X and tutorials) emphasize the **Hermes Desktop** launch and its rapid adoption among builders, framing it as “suddenly everywhere” and “cracked” due to ease of local deployment. [^fqvha3] [^t0usqo]

---

# History and Origin Story

Hermes Agent is described as a **self-improving AI agent built by Nous Research**, positioned as a local-first agent framework that runs continuously on machines controlled by the user (laptop, low-cost VPS, or serverless backends). [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0] A May 2026 field guide notes that by then Hermes had overtaken OpenClaw to become the most-used open-source agent on OpenRouter, suggesting its inflection point in early–mid 2026 as daily token volume surpassed 220 billion, and its core differentiator—the learning loop of memory and skill creation—was formalized as the centerpiece of the project. [^uzrkg2]

---

## Fundraising History

No reliable source found for any **funding rounds** (Pre-Seed, Seed, Series A, etc.) specifically associated with Hermes Agent or a distinct corporate entity around it; available materials treat Hermes as an open-source project by Nous Research without disclosing venture or institutional funding. [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0]

### Funding Table

| Round | Date | Amount | Lead investor |
|-------|------|--------|---------------|
| No public data | – | – | – |
| **Total** | – | – | – |

Investors (alphabetical):

- No public investor list found for Hermes Agent specifically. [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0]

---

## Notable Team Members

Public sources consistently attribute Hermes Agent to **Nous Research** but do not list specific individual founders or named maintainers for the Hermes project itself; the GitHub org and docs describe it generically as “built by Nous Research” without person-level attribution. [^ire2js] [^n9yc1y] [^0wqah0] External guides and tutorials (e.g., PM’s field guide, community YouTube content) are authored by independent practitioners, not by the core Hermes team, so they cannot be treated as notable team members of the project. [^uzrkg2] [^lu9v3a] [^fqvha3]

---

# Market Sizing

## Category, Market Size, and Category Growth

Hermes Agent fits into several overlapping categories: **agentic AI frameworks**, **developer tools for AI agents**, **terminal applications**, and **personal AI agents** that run on user-controlled infrastructure. [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0] No source provides direct market sizing for Hermes’ exact subcategory, but its comparison against products like Anthropic’s Claude Code Routines and its ranking on OpenRouter suggests it participates in the broader AI agent and tooling market, where analyst and trade press often project rapid growth in agentic AI systems, though specific quantitative estimates are not tied to Hermes in the retrieved sources. [^uzrkg2] [^n9yc1y]

---

## Pricing

Hermes Agent itself is **open-source** and local-first, with tutorials emphasizing it can be run “for free, with zero server and zero paid subscriptions,” apart from API usage or infrastructure costs. [^lu9v3a] [^fqvha3] [^n9yc1y] [^0wqah0] The Android app includes an optional **Hermes Pro** one-time purchase to remove ads, but detailed tiered pricing is not enumerated publicly. [^vzik2z]

| Tier                 | Description                                               | Price                         |
| -------------------- | --------------------------------------------------------- | ----------------------------- |
| Open-source core     | Hermes Agent framework (local-first, bring your own keys) | No public pricing / free OSS. |
| Hermes Pro (Android) | One-time purchase to remove all ads in the Android app    | No public price listed.       |

Sources: [^ire2js] [^n9yc1y] [^0wqah0] [^vzik2z]


---

# Competitive Landscape

## Who it’s for, who it’s not for

Hermes Agent is primarily for **technical users, builders, and power users** who want a persistent, programmable AI agent that runs on infrastructure they control, integrates with developer workflows (terminal, shell, git), and spans many messaging platforms. [^n7hvw6] [^ire2js] [^uzrkg2] [^n9yc1y] [^0wqah0] It appeals to users who care about long-term memory, custom skills, cross-device continuity, and avoiding lock-in to a single vendor, including PMs and engineers evaluating agentic systems as part of full-stack applications. [^uzrkg2] [^n9yc1y] [^0wqah0]

It is less suitable for **non-technical users** who only want a simple chat interface with minimal setup, or organizations that require fully managed, vendor-hosted SaaS with strict turnkey governance and without needing to manage servers, API keys, or local models. [^lu9v3a] [^uzrkg2] [^n9yc1y] [^0wqah0] It is also not positioned as a traditional IDE copilot or single-session chatbot, so users seeking lightweight in-IDE completion rather than a persistent agent process may find other tools more appropriate. [^uzrkg2] [^n9yc1y]

---

## Viable Alternatives

- **Claude Code Routines** – Anthropic-hosted routine system compared directly to Hermes, offering tool-using agents but with provider lock-in, daily run limits, and session-scoped memory rather than local-first, persistent agents. [^n9yc1y]
- **OpenClaw** – Previously the “open-source darling” on OpenRouter before Hermes overtook it, representing another prominent open-source agent framework in the same inference ecosystem. [^uzrkg2]
- **Generic OpenAI function-calling agents / tool frameworks** – While not named explicitly, Hermes’ documentation contrasts itself with typical hosted agents tied to single providers, making such frameworks a conceptual alternative for simpler hosted use cases. [^ire2js] [^uzrkg2] [^n9yc1y]
- **Other agent frameworks integrating Firecrawl, Tavily, Exa, etc.** – Firecrawl’s blog positions Hermes among agent frameworks that use its search and crawl tools, implying alternative frameworks that rely on the same stack but are not local-first. [^n9yc1y]
- **Umbrel-hosted AI apps** – Users on Umbrel who want AI assistants but not Hermes specifically can choose other AI apps that run inside the Umbrel sandbox as alternatives in the self-hosted ecosystem. [^n7hvw6]

---

## Competitor Table

| Competitor | Description |
|-----------|-------------|
| [Claude Code Routines](https://www.anthropic.com) | Anthropic-hosted agentic routine system with tool use and code capabilities, but with provider lock-in, daily run limits, and session-scoped memory, contrasted against Hermes’ local-first, unlimited-run design. [^n9yc1y] |
| [OpenClaw](https://openrouter.ai) | Open-source agent framework that previously led OpenRouter’s daily inference rankings before Hermes surpassed it, representing a high-usage alternative in open-source agent tooling. [^uzrkg2] |
| [Generic OpenAI-based agents](https://platform.openai.com) | Hosted agents built on OpenAI’s APIs and function calling, offering easier SaaS-style usage but lacking Hermes’ self-improving learning loop and local-first control. [^ire2js] [^uzrkg2] [^n9yc1y] |
| [Umbrel AI apps](https://apps.umbrel.com) | Alternative self-hosted AI assistants in the Umbrel App Store, offering sandboxed deployments for users who prefer different agent implementations. [^n7hvw6] |
| [Other Firecrawl-integrated agent frameworks](https://www.firecrawl.dev) | Agent systems that use Firecrawl for search and crawling but are not designed as persistent, local-first, multi-channel personal agents in the way Hermes is. [^n9yc1y] |


***

# Sources

[^vzik2z]: [Hermes Agent - Android - Apps on Google Play](https://play.google.com/store/apps/details?id=com.hermesagent.android)
[^n7hvw6]: [Hermes Agent | Umbrel App Store](https://apps.umbrel.com/app/hermes-agent)
[^lu9v3a]: [How to Setup & Use Open Source AI Agent for Beginners - YouTube](https://www.youtube.com/watch?v=uSdVgSY7ryU)
[^ire2js]: [NousResearch/hermes-agent: The agent that grows with you - GitHub](https://github.com/nousresearch/hermes-agent)
[^uzrkg2]: [A PM's Field Guide and how to set up | Hermes Agent Certification](https://marily.substack.com/p/hermes-agent-a-pms-field-guide-and)
[^fqvha3]: [Hermes Agent Full Tutorial for Beginners (Full Step-by-Step Setup)](https://www.youtube.com/watch?v=fNj1CUuTMik)
[^n9yc1y]: [Hermes Agent: What It Is and How to Use It With Firecrawl](https://www.firecrawl.dev/blog/hermes-agent)
[^0wqah0]: [Run Hermes Agent with Local Models | DGX Spark - Nvidia NIM](https://build.nvidia.com/spark/hermes-agent)
[9]: [three months with Hermes Agent: what i wish i had understood earlier](https://www.reddit.com/r/hermesagent/comments/1u8fm0t/three_months_with_hermes_agent_what_i_wish_i_had/)
[^t0usqo]: [Hermes Agent Is CRACKED Now And Most Builders Have No Idea ...](https://x.com/PrajwalTomar_/article/2064324584254710262)
