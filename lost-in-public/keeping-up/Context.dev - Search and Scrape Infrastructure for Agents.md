---
date_created: 2026-10-30
date_modified: 2026-11-21
title: Context.dev — Search and Scrape Infrastructure for Agents
slug: context-dev-search-and-scrape-infrastructure-for-agents
tags:
  - Developer-Tools
  - AI-Agents
  - Web-Scraping
  - APIs
  - MCP
  - Brand-Data
homepage: https://www.context.dev
docs: https://docs.context.dev
mcp_url: https://mcp.context.dev/mcp
install: npm install context.dev
---

https://www.context.dev

## Why This Matters

Context.dev is the company formerly known as **Brand.dev**. It started as a "give me a company's logo, colors, and fonts from a domain" API and has grown into a full web-context layer for agents: search, scrape, crawl, map, research answers, monitors, *and* the brand data it began with. Two recent announcements:

- **October 19, 2026:** [$9M seed led by General Catalyst](https://www.context.dev/blog/context-dev-raises-9m-seed-led-by-general-catalyst), with Y Combinator also backing. Founder: Yahia Bakour.
- **October 30, 2026:** [Web search monitors](https://www.context.dev/blog/introducing-web-search-monitors). Give it a search query plus a plain-language description of what counts as news, and it runs the search on a schedule and alerts you only when something genuinely new shows up. You can set one up "in a sentence" through the Context MCP.

Customer logos include Upstash (Context7's docs crawling runs on it, reportedly 2.4x faster median crawls after switching), Mintlify, Similarweb, Klarna, daily.dev, and Zero. One case study is literally titled "Instant switches from Firecrawl to Context.dev in under a day."

## What It Actually Does

- **Scrape:** any URL or PDF to Markdown, HTML, screenshots, images, or schema-shaped JSON. JS rendering is always on, and proxy escalation and retries are automatic. They claim a 99.96% scrape success rate "with no configuration."
- **Search:** web and news search that returns ranked results *with clean page content*, not just links.
- **Crawl, Map, Batches:** up to 500 pages per crawl call, URL discovery for a domain, and background batches of thousands of URLs with completion webhooks.
- **Answers API:** a research question in, structured JSON in your shape with source URLs out (10 credits Fast, 100 Ultra).
- **Context Highlights:** returns only the passages relevant to your query, for token-efficient agent reads.
- **Monitors:** page monitors (pricing changes, new pages) and the new web search monitors, delivered to webhooks.
- **Brand data (the original product):** company profile, logo, colors, fonts, and style guide from a domain. Logo Link has its own quota.
- **Agent-native onboarding:** an MCP server, a CLI, SDKs (TS, Python, Ruby, Go, PHP), and an `auth.md` that lets an agent sign itself up.
- **Enterprise:** SOC 2 Type 2, zero data retention mode, and web access policies (blocked sites are refused and not charged).

**Pricing:** 1,000 free credits/month with no card. Paid plans: Developer $20, Pro $90, Growth $300, Scale $500, and Scale 2.5M $950 per month. A scrape is 1 credit; JSON extraction adds 4.

## Where It Fits in Our Workflow

This competes directly with Firecrawl and Tavily, which are the two providers already wired into our [`crawl-fetch-ingest`](https://github.com/lossless-group/lossless-agent-skills/tree/main/crawl-fetch-ingest) cascade (Firecrawl → Tavily → OpenGraph.io). Two parts are interesting:

1. **Brand data is the gap in our current cascade.** The credibility-ingest workflow needs logos (SVG preferred), brand colors, and fonts for VC firms and portfolio companies. Today that's scraped and guessed. In `setup-new-firm` we explicitly warn not to trust Firecrawl's primary-color field. A purpose-built brand endpoint could replace a lot of manual verification. It's worth a side-by-side on a few firms we've already onboarded.
2. **Web search monitors overlap with how we produce `keeping-up` itself.** A monitor per tool we track (new releases, funding, launches) would surface candidates for posts like this one without manual sweeps.

Not a reason to rip anything out. Firecrawl's Alexandria providers and per-domain tools are deeper for structured records. But Context.dev is a strong candidate for a third fallback, and possibly the primary for brand assets.

## Install

```bash
npm install context.dev

# MCP in Claude Code
claude mcp add --transport http --scope user context https://mcp.context.dev/mcp
```

Sources: [context.dev](https://www.context.dev) · [Seed announcement](https://www.context.dev/blog/context-dev-raises-9m-seed-led-by-general-catalyst) · [Web search monitors](https://www.context.dev/blog/introducing-web-search-monitors) · [Docs](https://docs.context.dev)
