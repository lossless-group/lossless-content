---
date_created: 2026-08-23
date_modified: 2026-08-23
title: Obscura — A Headless Browser for Agents, Without Chromium
slug: obscura-headless-browser-agents-without-chromium
tags: [Developer-Tools, AI-Agents, Headless-Browsers, Web-Scraping, Model-Context-Protocol, Rust, Homebrew]
homepage: https://obscura.sh
github_repo_url: https://github.com/h4ckf0r0day/obscura
brew_page: https://formulae.brew.sh/formula/obscura
install: brew install obscura
---

https://github.com/h4ckf0r0day/obscura

## Why This Matters

Chromium is heavy when each agent needs its own browser. Obscura is a separate engine written in Rust, with V8 for JavaScript and its own renderer, that speaks the Chrome DevTools Protocol so Puppeteer and Playwright can connect to it. It also ships an MCP server.

The idea has real credit behind it. [Cloudflare says](https://blog.cloudflare.com/kitesurf/) it "got the initial inspiration from obscura" for Kitesurf, its agent-first browser, starting by porting it to Workers. That validates the idea, not the project's production readiness.

It landed in Homebrew core on August 23, 2026 at version 0.2.0. Apache-2.0. The details below reflect 0.2.6, checked November 3, 2026.

## Claims Against Evidence

The README headlines 30 MB and 85 ms page loads, against 200+ MB and about 500 ms for Chrome. The memory claim holds up better than the speed claim, even in the project's own [benchmarks](https://github.com/h4ckf0r0day/obscura-benchmark) across 98 live public pages:

| Engine | Rendered | Median latency | Median peak memory |
|---|---|---|---|
| Obscura | 94 / 98 | 5.2 s | 64.2 MB |
| Headless Chrome | 85 / 98 | 2.1 s | 201.2 MB |

So on real pages Chrome's median was faster. The project attributes most of Chrome's misses to anti-bot walls served to datacenter IPs. The README warns that long-tail CSS, some Web APIs, and media may differ from Chromium. One [independent write-up](https://jacar.es/en/obscura-rust-headless-browser-ai-agents/) on 0.2.1 found the same pattern: far less memory, no speed gain on Hacker News, and visible rendering errors on the first site it tried.

## Who's Behind It

The repo was created April 13, 2026 and has about 30,300 stars. Its owner, `h4ckf0r0day`, is an account opened two weeks earlier, with no name attached. Most of the commits come from `SGavrl`, whose profile says "Co-founder of Obscura" and which was opened that April. We found no real name or legal entity in the README, the landing page, or either profile. Pseudonymity isn't a fault in itself, and the code is public, but this software runs untrusted JavaScript and may hold your sessions, and we couldn't identify who would answer for it.

Stars measure attention. Our attempt to sample the stargazer list returned an API error, so we can't judge their quality. Homebrew reports 197 installs over 30 days, though that excludes release binaries and Docker.

The site asks you to book a demo, a hosted cloud with residential proxies is on a waitlist, and the README carries a proxy vendor's discount codes, with "No KYC required" among its selling points.

## Stealth

Obscura pitches itself as "stealthy" and headlines anti-detection. Evading bot detection can breach a site's terms of service, whatever a tool makes possible, and a high star count doesn't change that. Respecting `robots.txt` is opt-in (`--obey-robots`). The Homebrew formula compiles the `render` feature and not the separate stealth build.

## Where It Fits in Our Workflow

We haven't run it, and we wouldn't start with stealth. Our browser-drive rule stands: reads are unrestricted, but browser-driven writes go only against a repo's designated safe target.

It doesn't suit browser-drive verification either. Playwright MCP drives a mainstream browser engine, and a drive that passes on an independent renderer says little about what a person sees in Chrome.

The possible use is low-risk text extraction from public pages in our `crawl-fetch-ingest` skill, where JavaScript-heavy sites currently go to [[Firecrawl]]. It would have to beat that on correctness, not only memory.

## Install

```bash
brew install obscura
obscura fetch https://example.com --dump text
```

Obscura blocks private and internal addresses by default. Local dev servers need `--allow-private-network`.

Source: <https://github.com/h4ckf0r0day/obscura>
