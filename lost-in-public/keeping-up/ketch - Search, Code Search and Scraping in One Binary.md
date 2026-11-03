---
date_created: 2026-09-16
date_modified: 2026-09-16
title: ketch — Search, Code Search and Scraping in One Binary
slug: ketch-search-code-search-scraping-one-binary
tags: [Developer-Tools, AI-Agents, Web-Scraping, Web-Search, Model-Context-Protocol, Go, Homebrew]
homepage: https://ketch.run
github_repo_url: https://github.com/1broseidon/ketch
brew_page: https://formulae.brew.sh/formula/ketch
install: brew install ketch
---

https://github.com/1broseidon/ketch

## Why This Matters

Giving an agent research tools usually means wiring up several providers, each with its own auth and response shape. `ketch` puts them behind one stateless binary. An operator sets the backend once, and every agent just calls `ketch search` or `ketch scrape` without knowing which provider answered.

It comes from George Dikeakos (`1broseidon`), who also wrote the tree-sitter code navigation CLI `cymbal`. It landed in Homebrew core on September 16, 2026 at version 0.16.2. MIT licensed, written in Go. It releases quickly: the details below reflect 0.20.4, released and checked November 3, 2026.

## What It Actually Does

- **Web search.** `ketch search` works with no key. The default `auto` backend falls back through hosted keyless providers, and prefers anything you've configured. `--multi` queries several at once and fuses the rankings.
- **Code search.** `ketch code` greps public open-source repos through Grep, Sourcegraph, or GitHub.
- **Library docs.** `ketch docs` queries Context7.
- **Scrape and crawl.** Clean markdown from HTML and text-based PDFs, with an automatic fallback to headless Chrome for JavaScript-rendered pages.
- **Tags.** Bookmarks that group sources by project and survive cache clears.
- **Agent wiring.** `--json` everywhere, documented exit codes, a `ketch doctor` health check, a bundled skill, and an MCP server (`ketch mcp serve`).

## What to Check First

Keyless is convenient, but `auto` means your queries go to a chain of third-party services, so check which one served a result. The output's `backend:` field reports it, and setting `search_order` pins the list.

The README also says private and internal HTTP(S) addresses remain fetchable from the machine running `ketch`. An agent pointed at an untrusted URL could reach your local network, so that matters if `ketch` runs near anything internal. And cookie support (`--cookie-file`) comes with a plain note that respecting a site's terms is the operator's responsibility. Authenticated pages also get cached locally unless you pass `--no-cache`.

## Where It Fits in Our Workflow

This overlaps with our `crawl-fetch-ingest` skill, though less neatly than a list of backends suggests. We haven't run it.

That skill routes each URL by need: Jina Reader for page text, [[Firecrawl]] with a JSON schema for structured extraction, [[Tavily AI|Tavily]] for discovery, and OpenGraph.io for metadata. In `ketch`, Firecrawl and Tavily are search backends. Its scraper is its own extraction pipeline, and the README describes nothing like Firecrawl's schema-filled extraction, which the skill relies on to pull `{name, title, bio, headshot}` from a team page. So `ketch` doesn't replace that step.

Where it could help is the cheaper end. It might stand in for Tavily when we're finding a firm's homepage, or for Jina Reader when we only need the text of a page. Its keyless search could also serve as a backup when a keyed service runs out of credits. The skill's checkpoints, human confirmation gates, and per-firm cache would stay as they are: `ketch`'s page cache defaults to a 72-hour TTL, which is a different job from keeping a firm's data across decks.

Scanned PDFs need OCR, so image-heavy pitch decks may not extract with the built-in parser. We'd test that before relying on it for a deck.

`ketch code` is the separate surface worth trying, since it answers "how do other projects use this API?" with no setup at all.

## Install

```bash
brew install ketch
ketch doctor
ketch scrape https://go.dev/doc/effective_go
```

Source: <https://github.com/1broseidon/ketch>
