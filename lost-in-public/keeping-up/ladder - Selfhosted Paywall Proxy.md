---
date_created: 2026-05-25
date_modified: 2026-05-25
title: ladder — Selfhosted Alternative to 12ft.io
slug: ladder-selfhosted-paywall-proxy
tags: [Developer-Tools, Self-Hosted, Web-Proxy, Go, Docker]
github_repo_url: https://github.com/everywall/ladder
brew_page: https://formulae.brew.sh/formula/ladder
install: brew install ladder
---

https://github.com/everywall/ladder

## Why This Matters

`12ft.io` famously let you "lift the paywall" on a URL by rewriting headers and stripping client-side scripts. It also went down, got blocked by major publishers, then came back, then went down again. Anytime your tooling depends on someone else's free public proxy, you are one shutdown away from broken workflows.

`ladder` is the same idea, self-hosted: a small Go HTTP proxy you run yourself that modifies requests and responses to let you observe how a page is served to different clients. Version 0.0.23 just landed in Homebrew core. GPL-3.0.

The official framing is *testing paywall implementations* and *simulating client environments* — important context, because the same mechanism that lets a publisher's engineer test their own paywall is what lets a reader-side researcher render an article. The tool is neutral; the intent is yours.

## What It Actually Does

- **Request rewriting.** Custom User-Agent, custom `X-Forwarded-For` — i.e., serve the page as Googlebot, as a different geographic origin, as an archive crawler.
- **Response rewriting.** Strips/edits CORS, Content-Security-Policy, and other headers; injects custom CSS/JS.
- **URL rewriting via rulesets.** Per-domain YAML rules for header tweaks, regex replacements, and HTML injection.
- **Cloudflare passthrough.** Optional FlareSolverr integration for sites that gate on a Cloudflare challenge.
- **Multiple deploy paths.** Binary, Docker (amd64/arm64), Docker Compose, Helm chart for Kubernetes.
- **Auth.** Basic-auth via `USERPASS` so you can put it behind a reverse proxy without leaving it open.

## Where It Fits in Our Workflow

The `crawl-fetch-ingest` skill — used for credibility-card ingest of VC firms and portfolio companies — already chains Firecrawl → Tavily → OpenGraph.io as cross-tool fallbacks. `ladder` is an interesting *fourth* fallback for the specific case where a page is gated by a client-side soft-paywall (rather than a real auth wall) and we have a legitimate research reason to render it as a crawler would.

The other use case is **testing our own publishing surfaces.** When we ship a splash page or a deck under [[maintain-splash-pages]], it is useful to render the page through `ladder` with Googlebot's UA to verify our `og:image`, `llms.txt`, and structured data are served *to crawlers* the way we expect. The `open-graph-share-seo-geo` skill cares about exactly this contract.

Run it on a workstation port for ad-hoc work, behind Caddy for shared use. Don't open it to the public internet — abuse is the obvious failure mode and the rulesets make it trivial to weaponize.

## Install

```bash
brew install ladder
ladder           # serves on :8080 by default

# or docker:
docker run -p 8080:8080 ghcr.io/everywall/ladder:latest
```

Source: <https://github.com/everywall/ladder>
