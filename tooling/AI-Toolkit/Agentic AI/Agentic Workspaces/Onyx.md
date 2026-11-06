---
url: https://onyx.app/
date_created: 2026-06-18
date_modified: 2026-11-05
github_repo_url: https://github.com/onyx-dot-app/onyx
github_profile_url: https://github.com/onyx-dot-app
for_clients:
  - Laerdal
  - Parslee
  - Param
  - Tonguc
site_uuid: cc31d30e-f985-48e4-9ba7-597b90d590be
publish: true
title: Onyx
slug: onyx
at_semantic_version: 0.0.0.1
tags:
  - Agentic-AI
  - Open-Source-Alternatives
  - Public-Repos
cf_last_run: 2026-11-05T22:30:18.815Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 1
cf_last_run_retrieval: 2026-11-05T22:30:18.815Z
---

Onyx is an open-source, permission-aware AI platform for enterprise search, chat, custom assistants, and agentic actions. It can be deployed through Onyx Cloud or self-hosted, supports multiple LLM providers, and connects to organizational knowledge sources. [^E1]

## Value Proposition & Features

Onyx provides a single AI context layer across an organization’s internal knowledge while remaining open-source, app-agnostic, and compatible with different LLMs. [^c079u5] Its permission-aware retrieval ensures users see only documents they are authorized to access. [^t4elv6]

- **Enterprise search and RAG:** Searches indexed internal documents, live federated sources, and the public web, then generates answers with numbered citations. [^t4elv6]
- **AI chat:** Provides conversational access to connected organizational knowledge through configurable models and sources. [^E1]
- **Custom agents and actions:** Agents can use MCP servers, OpenAPI plugins, and built-in tools to retrieve live data or take actions. [^rt9cd2]
- **Plugins and integrations:** Supports tools such as Linear, Notion, Atlassian, Slack, Gmail, Google Drive, GitHub, HubSpot, and Zendesk. [^rt9cd2]
- **Coding Agent:** Investigates public GitHub repositories inside an isolated sandbox and returns written answers about their code. [^1vu8e7]
- **Multimodel support:** Administrators can configure compatible model providers, including OpenAI-compatible endpoints such as Nebius TokenFactory. [^aphw1k]
- **Enterprise administration:** Business and Enterprise editions add SSO, user groups, permissions, analytics, and an OpenAI-compatible LLM Gateway. [^yozcj4]
- **Secure code execution:** Craft runs model-generated code in isolated sandboxes with optional Kubernetes or Docker deployment. [^7lpqtq]

Onyx’s security-first deployment model pairs naturally with [[Tooling/AI-Toolkit/Agentic AI/Akto|Akto]] when organizations need to govern agentic systems alongside the knowledge and action layer.

## Product Roadmap / Announcements

As of March 24, 2026, no reliable source found for public roadmap announcements from the preceding six months.

## Recent Developments

No reliable source found for developments within the past 90 days. The available result announcing Onyx’s Zoom acquisition is dated October 21, 2026, which is later than the current date and therefore cannot be treated as a current development. [^c079u5]

## History and Origin Story

Onyx was founded in 2023 by Chris Weaver and Yuhong Sun. [^E1] The company describes its founding goal as closing the gap between organizational knowledge and AI, and it later positioned the product as an open-source, standalone context layer for enterprise information. [^c079u5]

## Fundraising History

| Round | Date | Amount | Lead investor |
|---|---:|---:|---|
| Pre-seed | 2024-04-03 | $500,000 | No reliable source found |
| Seed | 2024-03-01 | $125,000 | No reliable source found |
| Seed | 2025-03-12 | $10,000,000 | No reliable source found |
| **Total** | — | **$10,625,000** | — |

The reported funding total is $10.625 million. [^E1]

## Notable Team Members

Chris Weaver and Yuhong Sun are Onyx’s co-founders. [^c079u5] No reliable source found for additional notable leadership in the available results.

# Market Sizing

## Category, Market Size, and Category Growth

Onyx fits the categories of enterprise search, retrieval-augmented generation, AI assistants, and agentic workplace software. Its documentation specifically describes RAG over indexed and federated organizational sources, while its product materials cover chat, assistants, agents, and actions. [^t4elv6] [^E1]

## Competitive Landscape

### Who it's for, who it's not for

Onyx is suited to organizations that need permission-aware search and AI assistance across multiple internal knowledge systems, especially teams requiring self-hosting, model flexibility, extensibility, or enterprise identity controls. [^yozcj4] [^t4elv6] [^rt9cd2]

It is less suited to individuals seeking a simple consumer chatbot, teams that need only a single-source search tool, or organizations unwilling to configure connectors, models, permissions, and deployment infrastructure.

### Viable Alternatives

- **[[Tooling/AI-Toolkit/Knowledge AI/Glean|Glean]]:** Enterprise search and workplace knowledge assistant for organizations seeking a managed commercial product.
- **Atlassian Rovo:** Relevant for teams centered on Jira, Confluence, and Atlassian-connected workflows.
- **Danswer:** An open-source enterprise-search alternative with a similar self-hosted orientation.
- **[[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/AnythingLLM|AnythingLLM]]:** A self-hostable AI workspace for teams prioritizing flexible document and model configuration.

### Competitor Table

| Competitor                                                               | Description                                                                         |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [Glean](https://www.glean.com/)                                          | Managed enterprise search and workplace AI platform.                                |
| [Atlassian Rovo](https://www.atlassian.com/software/rovo)                | Enterprise search, chat, and agent capabilities integrated with Atlassian products. |
| [Danswer](https://github.com/danswer-ai/danswer)                         | Open-source enterprise search and knowledge assistant alternative.                  |
| [AnythingLLM](https://anythingllm.com/)                                  | Self-hostable AI workspace supporting documents, models, and agents.                |


***

# Sources

[^c079u5]: 2026, Oct 21. [onyx.app](https://onyx.app/). [Onyx joins Zoom to provide the context layer for “Conversation to Completion”](https://onyx.app/blog/onyx-joins-zoom). Updated: 2026, Oct 23. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[^yozcj4]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Enterprise Edition - Onyx Documentation](https://docs.onyx.app/deployment/enterprise_edition). Updated: 2026, Oct 29. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[^7lpqtq]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Deploying Craft - Onyx Documentation](https://docs.onyx.app/deployment/local/craft). Updated: 2026, Oct 29. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[4]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [High Availability and Scaling - Onyx Documentation](https://docs.onyx.app/deployment/production/high_availability). Updated: 2026, Oct 31. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[^t4elv6]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [RAG and Search - Onyx Documentation](https://docs.onyx.app/admins/managing_features/rag_and_search). Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[6]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Overview & Auth before v4.7 - Onyx Documentation](https://docs.onyx.app/developers/overview_legacy). Updated: 2026, Oct 29. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[7]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Get My Usage - Onyx Documentation](https://docs.onyx.app/developers/api_reference/usage/get_my_usage). Updated: 2026, Nov 05. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[^aphw1k]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Nebius TokenFactory - Onyx Documentation](https://docs.onyx.app/admins/ai_models/nebius_tokenfactory). Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[^rt9cd2]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Plugins - Onyx Documentation](https://docs.onyx.app/overview/core_features/plugins). Updated: 2026, Oct 29. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.
[^1vu8e7]: 2026, Oct 28. [docs.onyx.app](https://docs.onyx.app/). [Coding Agent - Onyx Documentation](https://docs.onyx.app/overview/core_features/coding_agent). Updated: 2026, Nov 01. Generated: 2026, Nov 05. [Perplexity](https://www.perplexity.ai/) API response.

## Sources (retrieved)

[^E1]: [onyx.app](https://onyx.app/). [Onyx (acquired by Zoom)](https://onyx.app/). Generated: 2026, Nov 05. [Exa.ai](https://exa.ai) API response.
