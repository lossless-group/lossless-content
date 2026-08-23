---
url: https://www.requesty.ai/
date_created: 2026-08-23
date_modified: 2026-08-23
og_title: "Requesty: AI Gateway & LLM Router for 600+ Models"
og_description: Route every LLM call through one OpenAI-compatible API. 600+ models from OpenAI, Anthropic, Google and more. Smart routing, caching, failover, observability, EU data residency and enterprise governance.
og_image: https://www.requesty.ai/opengraph-image.png?opengraph-image.074a-_634kw5z.png?dpl=dpl_6PS5f6N9t93VoiZMp8qKz947MMUv
og_favicon: https://www.requesty.ai/favicon.ico?favicon.1dhabarxrvddh.ico?dpl=dpl_6PS5f6N9t93VoiZMp8qKz947MMUv
og_site_name: Requesty
og_type: website
og_last_fetch: 2026-08-23T06:35:52.995Z
tags:
  - AI-Toolkit
  - LLM-Gateways
  - Model-Routers
  - Model-Routing
  - European-Variants
site_uuid: 908d849b-ef97-4966-be81-7707300aa33d
publish: true
title: Requesty
slug: requesty
at_semantic_version: 0.0.0.1
cf_last_run: 2026-08-23T06:38:51.119Z
cf_last_run_model: Perplexity sonar-pro
---

[[TrustedRouter]]

# Value Proposition & Features

Requesty is an **AI gateway and LLM router** that sits in front of multiple model providers and exposes them through a single **OpenAI-compatible API endpoint** and API key. [^yfq0ot] [^582k3y] [^296feu] It focuses on **smart routing, automatic failover, caching, observability, cost controls, and regional data residency**, especially an EU endpoint in Frankfurt for compliance-sensitive workloads. [^3cirso] [^ic1dwg] [^582k3y]

**Core product behavior**

Requesty provides **one base URL (`https://router.requesty.ai/v1`) and one key** to access hundreds of models from providers such as OpenAI, Anthropic, Google, Mistral and others, allowing unmodified OpenAI SDK calls after swapping base URL, key, and model name. [^e4o0x7] [^296feu] [^wti18u] [^582k3y] It routes requests to upstream providers while handling automatic failover and exposes per-endpoint pricing, context windows, and live routing/latency data in its model catalogue and rankings. [^y61gvv] [^xo83j9] [^zby20p] [^5w2o8g]

**Routing and optimization**

The gateway supports **cost, latency, and availability routing**, letting it choose or rebalance between providers to improve performance and resilience. [^3cirso] [^7mzzyi] [^hs33uh] It adds **prompt caching and smart model selection**, which can reduce effective token cost by 30–80% and cut up to 90% of input cost on repeated context in supported models. [^6a4elw] [^13jroc] [^f89f9j] [^bv253e]

**Observability and governance**

Requesty offers **real-time observability** over spend, latency, requests, and tokens via analytics dashboards and overview pages that break usage down by models, apps, groups, users, and API keys. [^6a4elw] [^s2j0x1] [^hnz80i] [^b8wsgm] [^x1vugh] Enterprise governance features include **PII scrubbing, content guardrails, RBAC, SSO, audit logs, model whitelists, budgets and alerts**, and optional EU-only logging and data retention controls. [^3cirso] [^j6ppel] [^fbu3wp] [^ic1dwg]

**Data residency and privacy**

Requesty exposes a **Frankfurt-hosted EU endpoint** for routing and data residency and documents its subprocessors and retention behavior, stating that request bodies are not retained by default and optional logging stores data encrypted in the EU for up to 30 days. [^3cirso] [^ic1dwg] [^5hs925] It positions itself as a UK-incorporated company (Requesty Ltd) with GDPR-relevant adequacy status for EU customers. [^ic1dwg]

**Model catalogue and coverage**

The company markets **600+ models from 30+ providers** accessible through its gateway, with a verifiable public catalogue that lists per-model pricing and regions. [^3cirso] [^6a4elw] [^ic1dwg] [^582k3y] The catalogue shows coverage across OpenAI, Anthropic, Google Gemini, AWS Bedrock, Vertex AI, DeepInfra, Fireworks, Z.ai, Novita and others, with both managed and BYO-key endpoints. [^y61gvv] [^us95vo] [^6j3373] [^p9un7l] [^8prnyw] [^b7e6ej] [^cr0rso]

**Key features (5–8 bullets, priority order)**

- **Single OpenAI-compatible API for 600+ models from 30+ providers**, with one base URL and key across OpenAI, [[Tooling/AI-Toolkit/Model Producers/Anthropic|Anthropic]], Google, [[Tooling/AI-Toolkit/Model Producers/Mistral|Mistral]], [[Tooling/AI-Toolkit/AI Infrastructure/Amazon Bedrock|Bedrock]], [[Tooling/AI-Toolkit/Vertex AI|Vertex AI]], [[DeepInfra]], [[Tooling/AI-Toolkit/AI Infrastructure/Fireworks AI|Fireworks AI]], [[Tooling/AI-Toolkit/AI Infrastructure/Novita AI|Novita AI]] and others. [^wti18u] [^e4o0x7] [^us95vo] [^35799t] [^6j3373] [^ic1dwg] [^582k3y]  
- **Intelligent [[Vocabulary/Model Routing|Model Routing]] routing and automatic failover** across providers/endpoints, including cost-, latency- and availability-aware policies and mid-stream fallbacks. [^3cirso] [^6a4elw] [^xo83j9] [^7mzzyi] [^hs33uh]  
- **Prompt caching and cost optimization**, including automatic prompt caching on Anthropic models and routing/caching strategies that can reduce effective input costs by 30–80% and up to 90% on repeated context. [^wti18u] [^6a4elw] [^13jroc] [^f89f9j] [^bv253e]  
- **Real-time analytics and observability dashboards** for spend, latency, token usage and cache impact, plus an Overview page with breakdowns by model, app, group, user and API key. [^6a4elw] [^s2j0x1] [^hnz80i] [^b8wsgm] [^x1vugh]  
- **Governance, security and PII controls**, including PII masking/scrubbing, content guardrails, SSO, RBAC, audit logs, model whitelists, budgets, spend limits and alerts. [^3cirso] [^j6ppel] [^fbu3wp] [^ic1dwg]  
- **EU routing and data residency** via an AWS Frankfurt endpoint (`router.eu.requesty.ai`), with EU-only logging options and documented subprocessors and retention defaults. [^3cirso] [^ic1dwg] [^5hs925]  
- **Bring-your-own-key (BYOK) support and flexible billing**, allowing either list-price passthrough with no markup in some endpoints or a flat 5% markup in the pay-as-you-go plan, with 0% markup when BYOK is enabled. [^j6ppel] [^xdcg61] [^6j3373] [^vyony0] [^p9un7l] [^j4bvhj]  
- **Public model rankings and performance benchmarks** showing provider latency, error incidents, model share, cost and routing-policy improvements. [^p69lom] [^7mzzyi] [^0n5fvm] [^5w2o8g] [^hs33uh]

---

## Product Roadmap / Announcements

As of 2026-08-23,

- **2026-08-22** – Multiple new endpoints added with pricing and context windows: Qwen/Qwen3.5-35B-A3B:flex and Qwen/Qwen3.5-27B:flex on DeepInfra, gemma-4-31B-it:flex on DeepInfra, gemini-3.5-flash-lite:flex on Google Gemini API, deepseek-v4-flash-0731:flex on DeepInfra, and new OpenAI Responses/OpenAI Inc. GPT-5.6-sol:flex and GPT-5.6-luna:flex variants, each with documented token prices and 10% discounts vs provider list rates. [^qs1rzw] [^mdehe0] [^s0hs57] [^2qd5oy] [^bf9rvd] [^69bgfv] [^ow0h36] [^7wczsb]  
- **2026-08-21** – Anthropic Claude Opus 5 endpoints added (including Bedrock variants) with published pricing, discounts, and caching details, plus context window of 1M tokens and maximum output of 128K tokens. [^j4bvhj] [^w9nzxd] [^gn4u4f]  
- **2026-08-11** – Requesty announces a new Overview page showing AI usage across organizations, with drill-down by models, apps, groups, users and API keys, via social posts. [^y664ca] [^hnz80i] [^x1vugh]  
- **2026-07-30** – Requesty announces reduced prices for OpenAI GPT-5.6 Luna and GPT-5.6 Terra on its platform, later extended to EU endpoints with additional discounts. [^y664ca] [^0u1et5] [^ow0h36]  
- **2026-07-25** – Blog post “Opus 5, Grok 4.6, GPT-6 rumors: shipping through the model release treadmill” outlines their focus on staying current with rapid model releases and maintaining routing-focused integrations rather than frequent client rewrites. [^s38aky] [^0d2hfw] [^8eh2sm]

---

## Recent Developments

- Stripe’s talks to acquire [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/OpenRouter|OpenRouter]] for around $10 billion sparked broader interest in AI routing; Requesty stated that at least 25 companies had approached it in recent weeks about investments, acquisitions or partnerships, according to a report citing CEO Thibault Jaigu. [^8xcbip] [^sf7xmq] [^ssi6xn]  
- Requesty’s blog and rankings pages introduced “The State of Production AI,” publishing live data on model share, cost and speed across 40 models and 32 providers, including token share statistics and cost metrics. [^5w2o8g] [^qt9li1] [^v3q6vh]  
- External coverage and comparison guides (e.g., Continuum, Eden AI, Evolink, Nexos, Orq.ai) in mid-2026 positioned Requesty as a leading managed LLM gateway and a key alternative in the multi-model routing landscape. [^3cirso] [^j6ppel] [^vzj8qb] [^uzl69h] [^dn7haa] [^rzvq56]

---

# History and Origin Story

Requesty is described as a **hosted LLLM gateway from a London-based company founded in 2023**, operating as Requesty Ltd registered in England. [^ccuu8y] [^ic1dwg] A review states it raised a **$3M seed round led by 20VC in September 2025**, with additional investors Tapestry VC, Insiders Ventures and Tiny Supercomputer, while another database still lists it as bootstrapped, indicating some data conflict. [^ccuu8y] [^9d9tyr] [^nzm3pv] The company’s founder and CEO, **Thibault Jaigu**, has publicly described Requesty as a five-person UK startup routing trillions of tokens for customers like Siemens, ZoomInfo and Mango and emphasized demand for routing to balance workloads between legacy and emerging models as AI usage costs rise. [^sf7xmq] [^tms5la]

---

## Fundraising History

| Round | Date (approx/announced) | Amount | Lead investor |
| --- | --- | --- | --- |
| Seed | 2025-09-26 (announced) | $3M | 20VC |
| – | – | – | – |
Sources for Table: [^nzm3pv]

**Total reported funding:** Approximately **$3M** in seed financing. [^nzm3pv]

*(Note: GetLatka still lists Requesty as bootstrapped with $0 funding; the Continuum review citing a $3M seed led by 20VC in September 2025 is treated here as the more specific and recent narrative, though this conflict should be considered when relying on figures.) [^9d9tyr] [^nzm3pv]*

**Investors (alphabetical)**

- 20VC [^nzm3pv]  
- Insiders Ventures [^nzm3pv]  
- Tapestry VC [^nzm3pv]  
- Tiny Supercomputer [^nzm3pv]  

---

## Notable Team Members

**Thibault Jaigu (Co-founder & CEO)**  
Media coverage identifies Thibault Jaigu as CEO and co-founder of Requesty, describing it as a five-person UK startup and quoting him on inbound interest from at least 25 companies regarding investment, acquisition or partnership opportunities and on developer demand for routing technology to allocate workloads across providers. [^sf7xmq] [^ssi6xn] His LinkedIn post notes the company is London-based, has “10x’d in the last 7 months,” routes trillions of tokens for enterprise customers and is hiring a founding GTM lead. [^tms5la]

**Other leadership**  
No reliable publicly-sourced data naming other specific C-level roles (e.g., CTO, COO) or their holders could be confirmed beyond mentions of team posts on company social media and LinkedIn, so they are omitted here to avoid speculation. [^qiiv7i] [^k16d81] [^ac31aq]

---

# Market Sizing

## Category, Market Size, and Category Growth

Requesty fits within the **Enterprise AI Gateway / LLM Gateway** category, defined as a proxy layer between applications and model providers that centralizes routing, observability, governance and cost controls. [^xkn3c6] [^1y1tj0] [^582k3y] An SNS Insider report estimates the **Enterprise AI Gateway market** at **$0.88B in 2025**, projected to reach **$11.32B by 2035** with a **29.12% CAGR** from 2026–2035, noting that LLM gateways held about 42.8% share in 2025. [^jged2p] Broader **AI inference infrastructure** markets are projected to grow from **$22.8B in 2025 to $229.95B by 2035** at a **26.02% CAGR**, underscoring the expansion of managed inference layers that products like Requesty target. [^sfn055] [^a1icfx] [^v5nicv]

---

## Pricing

Requesty’s pricing structure is summarized by an external review referencing the official pricing page:

| Tier | Price | What you get |
| --- | --- | --- |
| Free | **$0** | 200 requests/day on free models, routing, caching, fallbacks, EU residency, no card required. |
| Pay as you go | **5% markup on model cost** | Full catalogue access, bring-your-own-keys, all routing policies, observability, MCP gateway, spend limits, EU data residency. |
| Enterprise | **Custom** | SSO, RBAC, audit logs, model whitelists, guardrails, PII detection, custom SLAs. |
Sources for Table: [^3e598v] [^j6ppel]

Model detail pages often state that Requesty **charges exactly what the upstream provider charges with no markup and no per-request fees**, while clarifying on others that **Pay as you go adds 5%, or 0% if you bring your own keys**, indicating that BYOK removes the markup. [^us95vo] [^j8zk0q] [^6j3373] [^vyony0] [^p9un7l] [^j4bvhj]

---

## Revenue Trajectory Estimates

A SaaS data site estimates that **Requesty generated $330K in annual revenue in 2025**, labeling this as estimated ARR and noting it reached $330K revenue in June 2025. [^ionj1w] The same source states that the company has shown consistent revenue growth since launch in 2023 and was previously characterized as bootstrapped without outside funding, though this conflicts with later reporting of a $3M seed round. [^ionj1w] [^9d9tyr] [^ccuu8y] [^nzm3pv]

---

# Competitive Landscape

## Who it’s for, who it’s not for

Requesty targets **engineering teams and enterprises running multi-model AI in production** that want a managed routing layer rather than building their own proxy, especially those needing centralized governance, budgets, observability and EU routing for compliance (e.g., European or global companies with strict data residency requirements). [^ic1dwg] [^582k3y] [^uzl69h] It is also positioned for teams that want to use OpenAI-compatible SDKs without refactoring code, while gaining access to a broad catalog of models and providers. [^e4o0x7] [^9qy7g8] [^582k3y]

Requesty is less suited to teams that **insist on fully self-hosted or open-source gateways**, or those that already consolidate all traffic behind a single provider and do not need multi-provider routing and governance. [^9qy7g8] [^qh05bx] [^dlwr19] It may also be a weaker fit for organizations that have already standardized on alternative gateways (e.g., Cloudflare AI Gateway, [[Tooling/AI-Toolkit/AI Programming Frameworks/Portkey|Portkey]], LiteLLM, Bifrost, Kong AI Gateway) and prefer to keep governance embedded within existing infrastructure. [^9qy7g8] [^qh05bx] [^dlwr19] [^dn7haa]

---

## Viable Alternatives

- **OpenRouter** – Hosted OpenAI-compatible router offering broad model access and provider routing with a per-token markup; often cited as the closest functional peer in multi-model access. [^1y1tj0] [^9qy7g8] [^vzj8qb] [^dn7haa]  
- **Portkey** – Managed and open-source AI gateway emphasizing governance controls, observability and cost monitoring, with a unified API across many models and providers; suitable for teams wanting strong policy and traceability. [^9qy7g8] [^qh05bx] [^dlwr19] [^cfwm7x] 
- **[[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/LiteLLM|LiteLLM]]** – Open-source, self-hosted proxy that provides an OpenAI-compatible interface to 100+ LLMs, appealing to teams wanting full control and on-premise deployment. [^9qy7g8] [^qh05bx] [^dlwr19] [^amom2i]  
- **Cloudflare AI Gateway** – Managed edge gateway integrated with Cloudflare, offering dynamic routing, quotas, analytics and cost metrics for teams already on Cloudflare’s platform. [^9qy7g8] [^uzl69h] [^dlwr19]  
- **[[Tooling/AI-Toolkit/Kong|Kong]] AI Gateway / [[Bifrost]] / Vercel AI Gateway / [[OrcaRouter]]** – Various gateways that offer managed or self-host options with different focuses (governance, cost, edge integration, no markup) and are frequently mentioned in 2026 comparisons as Requesty or OpenRouter alternatives. [^1y1tj0] [^9qy7g8] [^dn7haa] [^gd5q2k] [^j0at06] [^dlwr19] [^cfwm7x]

---

## Competitor Table

| Competitor | Description |
| --- | --- |
| [OpenRouter](https://openrouter.ai) | Hosted OpenAI-compatible routing layer that exposes many models via a single endpoint with provider routing, failover and a per-token platform fee, widely referenced as a primary alternative in LLM gateway comparisons. |
| [Portkey](https://portkey.ai) | Managed and open-source AI gateway focused on governance, observability and cost monitoring, covering 1,600+ models across 45+ providers with both OSS core and hosted control plane. |
| [LiteLLM](https://github.com/BerriAI/litellm) | MIT-licensed open-source proxy and library that lets teams call 100+ LLMs via an OpenAI-compatible format, typically self-hosted for maximum control. |
| [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway) | Managed edge AI gateway integrated into Cloudflare, providing dynamic routing, retries, analytics, logs and cost metrics, aimed at teams already using Cloudflare infrastructure. |
| [Kong AI Gateway](https://konghq.com) | AI gateway built on Kong’s API infrastructure, offering strong governance and policy controls with options for managed and self-host deployment, listed among top gateways for infrastructure-level control. |
| [Bifrost](https://github.com) | Low-overhead, fully self-hosted Go-based LLM gateway (Apache 2.0) with routing, caching and observability features, recommended for enterprises needing OSS and self-host governance. |
| [Vercel AI Gateway](https://vercel.com) | Managed AI gateway that routes to hundreds of models across 45+ providers with zero markup on tokens, positioned as a multi-model routing and cost control layer. |
| [OrcaRouter](https://orcarouter.ai) | Managed LLM router pitching itself as a Requesty alternative with no per-token markup, 200+ models, high routing-accuracy scores, prompt grading and fast failover. |
Sources for Table: [^1uz2hn] [^1y1tj0] [^9qy7g8] [^dn7haa] [^qh05bx] [^cfwm7x] [^dlwr19] [^amom2i] [^uzl69h] [^j0at06] [^myjiu5]


***

# Sources

[^3cirso]: [Requesty review 2026: pricing, features, vs OpenRouter](https://continuumcode.ai/guides/requesty-review/)
[^wti18u]: [Pi - Quickstart - Requesty Docs](https://docs.requesty.ai/integrations/pi)
[^6a4elw]: [Requesty AI Gateway: 600+ Models, Routing & Analytics](https://ragwiki.dev/tool/requesty-ai)
[^e4o0x7]: [Overview - Quickstart - Requesty Docs](https://docs.requesty.ai/api-reference/inference-apis)
[^y61gvv]: [claude-opus-5 - Google LLC (Vertex AI) - Requesty](https://www.requesty.ai/models/vertex/claude-opus-5-eu)
[6]: [List Models - Quickstart - Requesty Docs](https://docs.requesty.ai/api-reference/endpoint/models-list)
[^us95vo]: [OpenAI Inc. gpt-5.2:flex API Pricing & Cost: Context Window & Benchmarks | Requesty](https://www.requesty.ai/models/openai/gpt-5.2-flex)
[^35799t]: [Anthropic PBC claude-opus-5 API Pricing & Cost - Requesty](https://www.requesty.ai/models/anthropic/claude-opus-5)
[9]: [OpenAI Inc. gpt-5.4:flex API Pricing & Cost: Context Window & Benchmarks | Requesty](https://www.requesty.ai/models/openai/gpt-5.4-flex)
[10]: [OpenAI Inc. gpt-5.6-luna:flex API Pricing & Cost - Requesty](https://www.requesty.ai/models/openai/gpt-5.6-luna-flex)
[^j6ppel]: [Continuum vs Requesty - AI routing gateway](https://continuumcode.ai/compare/requesty/)
[12]: [OpenAI Responses gpt-5.4-nano:flex API Pricing & Cost](https://www.requesty.ai/models/openai-responses/gpt-5.4-nano-flex)
[^j8zk0q]: [DeepInfra Inc. deepseek-ai/DeepSeek-V4-Flash:flex API Pricing & Cost: Context Window & Benchmarks | Requesty](https://www.requesty.ai/models/deepinfra/deepseek-ai-deepseek-v4-flash-flex)
[14]: [AWS Bedrock claude-opus-5 API Pricing & Cost - Requesty](https://www.requesty.ai/models/bedrock/claude-opus-5-eu-west-1)
[15]: [OpenAI Responses gpt-5.2:flex API Pricing & Cost - Requesty](https://www.requesty.ai/models/openai-responses/gpt-5.2-flex)
[^1uz2hn]: [LiteLLM Vs OpenRouter: Which Is Right For You?](https://www.truefoundry.com/blog/litellm-vs-openrouter)
[^vzj8qb]: [10 Best OpenRouter Alternatives in 2026 (Free & Paid)](https://www.edenai.co/post/best-alternatives-to-openrouter)
[^1y1tj0]: [Best LLM gateways 2026: 9 compared and scored](https://continuumcode.ai/guides/best-llm-gateways/)
[^9qy7g8]: [Unified LLM API Providers and AI Gateway Comparison 2026](https://therouter.ai/blog/unified-llm-api-providers-gateway-comparison-2026/)
[^dn7haa]: [Best 7 Requesty alternatives to consider in 2026](https://nexos.ai/blog/requesty-alternatives/)
[^uzl69h]: [Best OpenRouter Alternatives in 2026: Routing, Control & Fit](https://evolink.ai/blog/openrouter-alternatives-ai-model-routing-2026)
[22]: [OpenRouter Alternatives 2026: LLM Gateway Comparison for ...](https://therouter.ai/blog/openrouter-alternatives-llm-gateway-comparison-2026/)
[^qh05bx]: [Best Portkey Alternatives in 2026: 7 AI Gateways Compared](https://www.edenai.co/post/best-portkey-alternatives-7-ai-gateways-compared)
[^gd5q2k]: [Best LLM Router 2026: AI Gateways & Model ... - TrustedRouter](https://trustedrouter.com/best-llm-router)
[^j0at06]: [AI Model Routing Platforms Expand 'Bring Your Own API Key' Options as Businesses Seek Cost Control](https://news.geobrowser.io/story/3d8cc5e4a77a4cf39df488b6eb4f1e59)
[^dlwr19]: [Top 10 Vercel AI Gateway Alternatives for LLM Apps (2026)](https://www.respan.ai/articles/vercel-ai-gateway-alternatives)
[27]: [Best LLM Gateways in 2026: Top Picks Compared](https://fastrouter.ai/feeds/blog/best-llm-gateway)
[^cfwm7x]: [Requesty Alternatives 2026: Skip the 5% on Every Token](https://www.orcarouter.ai/blog/requesty-alternatives)
[29]: [9 OpenRouter Alternatives for Multi-Model AI in 2026 | DigitalOcean](https://www.digitalocean.com/resources/articles/openrouter-alternatives)
[^amom2i]: [Best OpenRouter Alternatives for Production AI Systems](https://www.truefoundry.com/blog/openrouter-alternatives)
[^3e598v]: [Fireworks AI qwen3.8-max API Pricing & Cost](https://www.requesty.ai/models/fireworks/qwen3.8-max)
[^xdcg61]: [gemini-3-pro-preview:flex](https://www.requesty.ai/models/google/gemini-3-pro-preview-flex)
[^6j3373]: [gpt-5-pro: Compare 1 Provider, API Pricing & Performance](https://www.requesty.ai/model/openai/gpt-5-pro)
[34]: [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo:flex - Requesty](https://www.requesty.ai/models/deepinfra/meta-llama-meta-llama-3.1-8b-instruct-turbo-flex)
[^vyony0]: [Z.ai glm-5.3 API Pricing & Cost](https://www.requesty.ai/models/zai/glm-5.3)
[^13jroc]: [gemini-3-flash-preview:flex](https://www.requesty.ai/models/google/gemini-3-flash-preview-flex)
[37]: [Fireworks AI kimi-k3 API Pricing & Cost - Requesty](https://www.requesty.ai/models/fireworks/kimi-k3)
[38]: [AWS Bedrock claude-opus-5 API Pricing & Cost](https://www.requesty.ai/models/bedrock/claude-opus-5-ap-northeast-1)
[39]: [Requesty (@RequestyAI) / Posts / X](https://x.com/RequestyAI)
[^p9un7l]: [Google LLC (Gemini API) gemini-2.5-pro:flex API Pricing & Cost](https://www.requesty.ai/models/google/gemini-2.5-pro-flex)
[41]: [OpenAI Inc. gpt-5.1:flex API Pricing & Cost - Requesty](https://www.requesty.ai/models/openai/gpt-5.1-flex)
[42]: [AWS Bedrock claude-opus-5 API Pricing & Cost](https://www.requesty.ai/models/bedrock/claude-opus-5)
[43]: [Fireworks AI deepseek-v4-pro-0813 API Pricing & Cost](https://www.requesty.ai/models/fireworks/deepseek-v4-pro-0813)
[44]: [Thibault Jaigu's Post - Founding GTM Lead](https://www.linkedin.com/posts/thibaultjaigu_were-hiring-a-founding-gtm-lead-at-requesty-activity-7489981609610297344-lQjO)
[45]: [Slawomir Baran Johansen's Post](https://www.linkedin.com/posts/slawomir-johansen_requesty-ai-gateway-llm-router-for-600-activity-7493630795321098240-IX-k)
[46]: [Interesting piece of analysis by Requesty on this year's AI ...](https://www.linkedin.com/posts/audrey-miller1_interesting-piece-of-analysis-by-requesty-activity-7495491310494261249-Z1_J)
[^qiiv7i]: [Requesty Revenue 2025: $330K Est. ARR (Bootstrapped)](https://getlatka.com/companies/requesty.ai)
[48]: [Granular AI Spend Controls with Requesty - LinkedIn](https://www.linkedin.com/posts/requesty_requesty-budgets-and-alerts-activity-7491162681173913600-GmGW)
[49]: [Introducing Prompt Library in Requesty for versioned prompts](https://www.linkedin.com/posts/requesty_most-teams-keep-their-prompts-in-the-codebase-activity-7487891574224306179-TfT5)
[50]: [New Overview Page in Requesty Tracks AI Usage](https://www.linkedin.com/posts/requesty_weve-shipped-a-new-overview-page-in-requesty-activity-7492976723639238656-Jnfl)
