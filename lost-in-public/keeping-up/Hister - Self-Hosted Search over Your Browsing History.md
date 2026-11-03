---
date_created: 2026-09-10
date_modified: 2026-09-10
title: Hister — Self-Hosted Search over Your Browsing History
slug: hister-self-hosted-search-browsing-history
tags: [Search, Self-Hosted, Own-Your-Data, Digital-Preservation, Model-Context-Protocol, Local-First, Go, Homebrew]
homepage: https://hister.org
github_repo_url: https://github.com/asciimoo/hister
brew_page: https://formulae.brew.sh/formula/hister
install: brew install hister
---

https://hister.org

## Why This Matters

Browser history stores titles and URLs. The thing you remember is usually a sentence on the page. `Hister` indexes the full content of pages you visit and files you keep, then lets you search them from a web UI, a terminal, a CLI, or an AI assistant over MCP. The pitch is short: your own search engine, over things you've already found useful.

The author adds some weight. `asciimoo` is Adam Tauber, whose GitHub bio reads "Author of Hister, Searx, Colly," and the Searx authors file confirms he created it. One precision worth keeping: he created Searx, and [[Searxng|SearXNG]] is a later fork maintained by others, so he is not SearXNG's creator.

It landed in Homebrew core on September 10, 2026 at version 0.19.0. The repo dates to January 2026 and has about 6,200 GitHub stars. AGPL-3.0-or-later, written in Go. The details below reflect 0.21.0, checked November 3, 2026.

## What It Actually Does

- **Collection.** Firefox and Chrome extensions capture rendered pages as you visit. It can also import history and bookmarks, watch local folders, and crawl sites.
- **Querying.** Field filters, phrases, wildcards, negation, date ranges, aliases, and priority rules.
- **Previews.** Stored readable copies appear beside results, and versioning rules can keep earlier content of a page.
- **Rules.** Skip rules exclude URLs before capture, and it advertises sensitive content checks.
- **Deployment.** A single binary with no config for personal use, or a shared server with SQLite or PostgreSQL. Multi-user separation, Docker, and Nix are supported.

The project states no telemetry and no required cloud service. Optional semantic search sends text to the embeddings endpoint you configure, so that's where local stops being the default assumption.

## The Index Is the Risk

A faithful copy of everything you read is a sensitive thing to hold, and the docs say so plainly:

- **Not encrypted.** Hister doesn't encrypt indexed data. Use disk encryption, and HTTPS across untrusted networks.
- **Logged-in pages.** The extension captures rendered pages, so without skip rules your webmail or CRM screens could be indexed. The docs warn that backups can contain credentials accidentally captured from pages.
- **No automatic expiry.** There's no retention limit or disk quota, at around 100 KB per page by the project's estimate.
- **Deletion has limits.** Removing a document leaves version records, logs, and backups, and an active collector can submit it again. No single command erases every copy.
- **Imports re-fetch.** History and bookmark imports fetch each URL's current content, so they may not recover what you actually saw.

## Where It Fits in Our Workflow

We haven't run it. Our local Chroma corpus holds what we wrote: `context-v/` files, changelogs, and past sessions. Nothing holds what we read, so the fit is a real gap, and these Keeping Up posts are an example, since their research lives on pages we'd struggle to find again.

We'd be careful with the MCP link. Pointing an agent at browsing history gives it private material and untrusted web text in one place, and retrieved text can go on to a cloud model. A pilot would start with strict skip rules for CRMs and mail, and without MCP. If the need turns out to be local files rather than the web, [[zvec-grep - Local Hybrid Search for People and Agents|zvec-grep]] is the neighbor to compare.

## Install

```bash
brew install hister
hister listen   # then open http://127.0.0.1:4433 and add the browser extension
```

Keep the server running while you browse. The formula also defines a service for `brew services`.

Source: <https://github.com/asciimoo/hister>
