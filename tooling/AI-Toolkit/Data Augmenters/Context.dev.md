---
url: https://www.context.dev/
date_created: 2026-10-10
date_modified: 2026-11-22
og_title: Web Scraping API for AI Agents & LLMs
og_description: Scrape any URL to markdown, crawl entire websites, and extract structured data. One REST web scraping API built for AI agents and LLM pipelines.
og_image: https://www.context.dev/api/og?title=Every+piece+of+web+context+your+agent+needs.
og_favicon: https://www.context.dev/favicon-32x32.png
og_type: website
og_last_fetch: 2026-10-10T16:28:26.733Z
tags:
  - Web-Scrapers
  - AI-Powered-Data-Capture
  - Data-Augmenters
  - API-based-Services
  - API-Services
  - AI-Readiness
site_uuid: 3b1397e8-06a6-47f5-8197-cf4a5f59aa84
publish: true
title: Context.dev
slug: context-dev
at_semantic_version: 0.0.0.1
cf_last_run: 2026-10-10T16:44:17.970Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 1
cf_last_run_retrieval: 2026-10-10T16:44:17.970Z
for_clients:
  - Lossless
  - Edviro
  - AI-Camp
  - Laerdal
---

[[Vocabulary/REST API|REST API]]
[[vertical-toolkits/Alternatives/Venture-Capital-Firms/Y Combinator|Y-Combinator]]
[[Vocabulary/Web Scraping|Web Scraping]]
[[concepts/Explainers for AI/AI Web Crawlers|AI-Powered Web Crawling]]
[[Vocabulary/AI-Ready Data|AI-Ready Data]]
[[Vocabulary/API Integrations|API-based integrations]]
[[concepts/Explainers for Tooling/API-as-a-Service|API-as-a-Service]]

# Context.dev

## Value Proposition & Features

Context.dev provides a managed web-data [[Vocabulary/Application Programming Interface|APIs]] for AI agents and LLM pipelines: it retrieves web pages, renders JavaScript, crawls sites, and returns LLM-ready Markdown or structured [[projects/Emergent-Innovation/Standards/JSON|JSON]] through one interface. [^rbz9lm] It also supports browser actions, MCP, REST APIs, and SDK-based integrations for applications and data pipelines. [^l0qenp]

- **Scraping:** Returns [[projects/Emergent-Innovation/Standards/Markdown|Markdown]], [[Tooling/Software Development/Programming Languages/HTML|HTML]], images, screenshots, or [[projects/Emergent-Innovation/Standards/JSON|JSON]] from a URL. [^6gkbf3]
- **JavaScript rendering:** Handles dynamic pages without requiring users to operate their own browser infrastructure. [^6gkbf3]
- **Browser actions:** Supports ordered click, type, wait, and scroll operations on rendered pages. [^l0qenp]
- **Crawling:** Synchronously crawls up to 500 pages with controls for page count, depth, paths, and time limits. [^6gkbf3]
- **Structured extraction:** Accepts JSON Schema and returns schema-shaped data; successful JSON extraction adds four credits. [^6gkbf3]
- **Research answers:** The Answers API returns structured JSON with source URLs; Fast mode costs 10 credits and Ultra mode costs 100 credits. [^rbz9lm]
- **Agent connectivity:** Supports MCP with [[projects/Emergent-Innovation/Standards/OAuth|OAuth]] alongside REST APIs and [[Vocabulary/SDK|SDKs]]. [^l0qenp]
- **Additional data tools:** The product surface includes search, sitemaps, PDF parsing, brand enrichment, batches, monitors, and [[Vocabulary/Webhooks|Webhooks]]. [^6gkbf3]
- **Search:** Web and news search returns ranked results with clean page content, not just links. [^a7c2e1]
- **Monitors:** Page monitors watch for pricing, content, or new-page changes. Web search monitors run a query on a schedule and alert a webhook only when a genuinely new, relevant result appears. [^d41b9f]
- **Context Highlights:** Returns only the passages of a page that are relevant to a query, for token-efficient agent reads. [^zbi1gh]
- **Brand data (the original product):** Company profile, logo, brand colors, fonts, and style guide from a domain. Logo Link has its own quota separate from API credits. [^a7c2e1]
- **Reliability claim:** JS rendering is always on, proxies escalate automatically, and retries adapt on Context.dev's side. They claim a 99.96% scrape success rate "with no configuration." [^a7c2e1]
- **Agent-native onboarding:** A hosted MCP server at `https://mcp.context.dev/mcp`, a CLI, SDKs for TypeScript, Python, Ruby, Go and PHP, and an `auth.md` that lets an agent sign itself up. [^a7c2e1]
- **Enterprise controls:** SOC 2 Type 2, a zero-data-retention mode, and web access policies that refuse (and don't charge for) blocked sites. [^a7c2e1]

## Screenshots

![Context.dev screenshot 1](https://www.context.dev/brand-guidelines/overview.png)
*Source: [context.dev](https://www.context.dev/brand)*

![Context.dev screenshot 2](https://www.context.dev/_next/image?url=%2Fbrand-guidelines%2Fmonitors.png&w=3840&q=75&dpl=dpl_4EeVer1TQcupsUC8UxeF32zwQBWa)
*Source: [context.dev](https://www.context.dev/brand)*

![Context.dev screenshot 3](https://www.context.dev/brand-guidelines/api-preview.png)
*Source: [context.dev](https://www.context.dev/brand)*

## Product Roadmap / Announcements

As of November 21, 2026,

- **October 30, 2026 — Web search monitors:** Give it a search query plus a plain-language description of what counts as news, and it runs the search on a schedule and alerts only on genuinely new developments. Can be set up "in a sentence" through the Context MCP. [^d41b9f]
- **October 19, 2026 — $9M seed:** Led by [[vertical-toolkits/Alternatives/Venture-Capital-Firms/General Catalyst|General Catalyst]]. [^b83f0d]
- **October 17, 2026 — Rusteerio:** Context.dev ported Cheerio to Rust for faster HTML processing. [^a7c2e1]
- **September 28, 2026 — Context Highlights:** Context.dev announced a feature that returns passages relevant to a webpage query, reducing the number of tokens an agent must process. [^zbi1gh]
- **September 16, 2026 — Answers API:** Context.dev introduced an API that converts a question or research task into structured JSON with source URLs. [^rbz9lm]

## Recent Developments

- Context.dev published documentation and examples for [[concepts/Explainers for AI/Model Context Protocol|MCP]], browser agents, production scraping pipelines, and web-scraping integrations during September and October 2026. [^l0qenp] [^f3hogg] [^5n8034]
- Its October 2026 pricing guidance describes a free plan with 1,000 monthly credits for work-email accounts or a one-time 250-credit allowance for personal-email accounts. [^6gkbf3] By November 2026 the homepage describes the free tier simply as 1,000 credits a month with no credit card. [^a7c2e1]
- **Customers:** Published case studies and logos include [[Tooling/Data Utilities/Upstash|Upstash]] (whose [[Tooling/Enterprise Jobs-to-be-Done/Context7|Context7]] docs crawling runs on Context.dev at millions of requests a day, with Context7 reporting 2.4x faster median crawls after switching), [[Tooling/Software Development/Developer Experience/DevOps/Documentation Engines/Mintlify|Mintlify]], Similarweb, [[vertical-toolkits/FinTech/Klarna|Klarna]], daily.dev, Zero, Mastra, Tinfoil, Squad and Instant. [^a7c2e1] [^c5e8a2]
- One case study is titled "Instant switches from Firecrawl to Context.dev in under a day," which makes the competitive target explicit. [^a7c2e1]
- See also our write-up: [[lost-in-public/keeping-up/Context.dev - Search and Scrape Infrastructure for Agents|Context.dev — Search and Scrape Infrastructure for Agents]].

## History and Origin Story

Context.dev was founded in 2025 and is associated with [[vertical-toolkits/Alternatives/Venture-Capital-Firms/Y Combinator|Y Combinator]]’s Summer 2026 batch. [^E1] Founder Yahia Bakour started the company as **Brand.dev**, an API that returned a company's logo, colors and fonts from a domain, and renamed it Context.dev as the product grew into a full web-context layer for agents. [^b83f0d] Its public product direction has expanded from URL scraping and crawling toward agent-oriented research, structured answers, MCP connectivity, and context-reduction tools such as Context Highlights. [^rbz9lm] [^zbi1gh]

## Fundraising History

| Round | Date | Amount | Lead investor |
|---|---|---:|---|
| Y Combinator S26 | 2026 | No reliable amount found | Y Combinator |
| Seed | 2026-10-19 | $9M | General Catalyst |
| **Total** | — | **At least $9M** (YC amount not disclosed) | — |

Y Combinator also participated in backing the seed round. [^b83f0d]

[[vertical-toolkits/Alternatives/Venture-Capital-Firms/Y Combinator|Y Combinator]]
[[vertical-toolkits/Alternatives/Venture-Capital-Firms/General Catalyst|General Catalyst]]


## Market Sizing

### Category, Market Size, and Category Growth

Context.dev operates in the **managed web-scraping, web-crawling, structured-data extraction, and AI-agent data infrastructure** categories. Its positioning specifically targets applications that need live web context delivered as Markdown, rendered content, structured JSON, or research answers. [^rbz9lm] [^6gkbf3]

No reliable analyst-firm or financial-journalism estimate for Context.dev’s addressable market or category growth was found in the available search results.

## Pricing

As of November 21, 2026: [^a7c2e1]

| Tier | Monthly price | Auto-top-up per 1K credits |
|---|---:|---:|
| Free | $0 (1,000 credits/month, no card) | — |
| Developer | $20 | $3.00 |
| Pro | $90 | $2.00 |
| Growth | $300 | $1.50 |
| Scale | $500 | $1.00 |
| Scale 2.5M | $950 | $0.75 |
| Enterprise | Custom (above 2.5M credits/month) | — |

Concurrency limits scale by plan: Free 2, Developer 10, Pro 100, Growth 250, Scale 500. Annual billing saves two months, and eligible startups and nonprofits can get 30% off an annual plan for 12 months. [^a7c2e1]

**Credit costs:** Scrape is 1 credit (2 with browser actions). Successful JSON extraction adds 4, and Highlights and Product add 1 each. Brand and Styleguide are 10. Answers is 10 in Fast mode or 100 in Ultra. Web and news search cost 1 credit per 10 results. People Search is 10 per call and People Enrich 20 per match. JS rendering, anti-bot bypass and proxies are included. [^a7c2e1]

*In October 2026 the published tiers were Developer $19, Pro $99, Growth $299 and Scale $499, with 7,500 / 125,000 / 500,000 / 1,000,000 included credits respectively.* [^6gkbf3]

## Revenue Trajectory Estimates

No reported or reliable estimated revenue or ARR was found in the available search results.

## Competitive Landscape

### Who it’s for, who it’s not for

Context.dev is aimed at developers building AI agents, LLM pipelines, research workflows, monitoring systems, and applications that need rendered web content or structured data without maintaining browsers, proxies, anti-bot systems, and site-specific extraction logic. [^6gkbf3] [^vrgqx2]

It is less suitable for teams seeking a self-hosted, open-source crawler or highly specialized scraping infrastructure that they want to control directly; the service uses a managed, usage-based API model rather than an open-source package model. [^km4963] [^60hucb]

### Viable Alternatives

- **[[Tooling/AI-Toolkit/Agentic AI/Firecrawl|Firecrawl]]:** The most direct managed competitor: scrape, crawl, search and structured extraction for agents, plus a catalogue of typed data providers. Context.dev publishes a case study of a customer switching from Firecrawl. [^a7c2e1]
- **Tavily:** A search-and-extract API aimed at agents and RAG pipelines, overlapping with Context.dev's search and Answers APIs.
- **[[Tooling/AI-Toolkit/Data Augmenters/Scrapy]]:** An open-source framework for teams that want direct control over crawl logic and infrastructure. [^60hucb]
- **Browser automation stacks:** Suitable when an application needs persistent, user-controlled browser sessions rather than stateless managed retrieval. [^cmubd3]
- **Self-managed proxy and browser infrastructure:** An alternative for organizations willing to operate rendering, proxy rotation, retries, and anti-bot systems themselves. [^cmubd3]
- **Other managed scraping APIs:** Viable where teams prioritize a different mix of rendering, extraction, crawling, pricing, or proxy capabilities; the available results do not establish a definitive market ranking.

### Competitor Table

| Competitor | Description |
|---|---|
| [Firecrawl](https://www.firecrawl.dev/) | Managed scrape, crawl, search and extraction API for agents; the competitor Context.dev names in its own case studies. |
| [Tavily](https://www.tavily.com/) | Search and extraction API for agents and RAG, overlapping with Context.dev Search and Answers. |
| [Scrapy](https://scrapy.org/) | Open-source crawling framework that provides more infrastructure control but requires teams to manage rendering, retries, scheduling, and extraction components themselves. |
| Browser automation frameworks | Tools for controlling browsers directly, useful for interactive or persistent sessions but requiring more operational infrastructure than Context.dev’s managed API. |
| Self-managed scraping stacks | Internally operated combinations of browsers, proxies, anti-bot systems, and extraction code, offering customization at the cost of maintenance. |
| Managed scraping APIs | Commercial alternatives that provide some combination of rendering, proxying, crawling, and structured extraction; the available results do not identify a specific competitor with sufficient reliable detail.
Sources for Table: [^60hucb] [^l0qenp] [^cmubd3]


***

# Sources

[^rbz9lm]: [Introducing the Answers API](https://www.context.dev/blog/introducing-answers-api)
[^6gkbf3]: [Best Node.js Scraping APIs in 2026](https://www.context.dev/blog/best-node-js-scraping-apis-in-2026-why-context-dev-is-the-one-to-pick)
[^l0qenp]: [6 Best Browser Agents in 2026](https://www.context.dev/blog/best-browser-agents-2026)
[^vrgqx2]: [Best Python Stacks for Price Monitoring Across Hundreds ...](https://www.context.dev/blog/best-python-stacks-for-price-monitoring-at-scale)
[^zbi1gh]: [Introducing Context Highlights](https://www.context.dev/blog/introducing-context-highlights)
[^f3hogg]: [MCP Server vs REST API for Web Scraping: When to Use ...](https://www.context.dev/blog/mcp-server-vs-rest-api-for-web-scraping)
[^5n8034]: [Production Web Scraping Pipelines in Python - Context.dev](https://www.context.dev/blog/production-web-scraping-pipelines-in-python)
[^cmubd3]: [Browser Fingerprinting Explained: Headless Browsers and ...](https://www.context.dev/blog/browser-fingerprinting-explained)
[9]: [www.roundfunded.com › en › yc-startups233 YC Companies in the S26 Batch (Summer 2026)](https://www.roundfunded.com/en/yc-startups/summer-2026)
[10]: [Guides](https://www.context.dev/guides)
[^km4963]: [Best Node.js Web Scraping Libraries in 2026](https://www.context.dev/blog/best-nodejs-web-scraping-libraries-2026)
[12]: [Why Your Web Scraper Returns Empty Results: 5 Causes and Fixes](https://www.context.dev/blog/web-scraper-empty-results)
[13]: [www.context.dev · blog · how-to-build-web-scrapersHow to Build Web Scrapers That Survive Layout Changes](https://www.context.dev/blog/how-to-build-web-scrapers-that-survive-layout-changes)
[^60hucb]: [Replace Scrapy With A...](https://www.context.dev/blog/what-is-scrapy)
[15]: [Parasma (YC S26) competitors — 5 similar Summer 2026 companies](https://mentionfox.com/funding/yc-parasma/competitors)

[^a7c2e1]: [Context.dev homepage, pricing and FAQ](https://www.context.dev/) (retrieved 2026-11-21)
[^b83f0d]: [We raised $9M to give agents the internet](https://www.context.dev/blog/context-dev-raises-9m-seed-led-by-general-catalyst) (2026-10-19)
[^d41b9f]: [Introducing web search monitors](https://www.context.dev/blog/introducing-web-search-monitors) (2026-10-30)
[^c5e8a2]: [Context7 on switching its crawling infrastructure to Context.dev](https://x.com/Context7AI/status/2118006952869687748)

## Sources (retrieved)

[^E1]: [Exa.ai](https://exa.ai) API response for data on [Context.dev (YC S26)](https://www.context.dev/)
