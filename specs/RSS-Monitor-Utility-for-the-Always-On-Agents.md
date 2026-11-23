---
title: "RSS Monitor Utility for the Always-On Agents"
lede: "One small, polite service that follows every feed our agents care about, keeps what it reads, and tells agents what's new, so no agent has to poll the web on its own."
date_authored_initial_draft: 2026-11-22
date_authored_current_draft: 2026-11-22
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2026-11-22
date_modified: 2026-11-22
status: Draft
publish: false
site_uuid: f7ef5001-fb0a-423d-9090-0e79808f6ce1
hex_code: 3fezcs
tags: [RSS, Feeds, Always-On-Agents, Monitoring, Agent-Tools, Self-Hosting]
authors:
  - Michael Staton
type: Specs
---

# RSS Monitor Utility for the Always-On Agents

## Why care?

Several things we're building need to know when something new appears on the web: the [[Self-Generating-Content-Farm-for-Content-Marketing|Content Farm]], the [[Self-Generating-Deal-Scout-for-VC-Opportunity-Scans|Deal Scout]], the [[Self-Updating-Product-Announcement-Watcher|Product Announcement Watcher]], and the kay-os colony. If each one polls on its own, we pay for the same fetches several times, get rate-limited, and spend search and scrape credits on things a free feed already says.

RSS and Atom are old, free, structured and polite. Most blogs, changelogs, GitHub releases, YouTube channels, Substacks, arXiv categories and news sites publish one. A shared feed monitor turns all of that into one stream of new items that any agent can read.

## What it does

1. **Keeps a list of feeds**, each tagged with who cares about it (an audience, a thesis, a tool in `tooling/`). The list is plain text in git, importable and exportable as OPML.
2. **Finds feeds** from a site URL (`<link rel="alternate">`, common paths like `/feed` and `/rss.xml`), and falls back to RSSHub or change detection for sites without one.
3. **Polls politely**, with `ETag` and `If-Modified-Since`, backing off on errors, and using WebSub push where a feed offers it.
4. **Keeps every item it reads**, deduped by GUID and content hash, so agents can search history, not just new arrivals.
5. **Emits new items as events** to an append-only log that agents read, the same shape as kaymail's `events.jsonl` in kay-os.
6. **Serves it as a tool** in the shared tool library: `feed.subscribe`, `feed.discover`, `feed.new_since`, `feed.search`, over MCP.

## Principles

- **Archive first, agents second.** This is the lesson from kay-os's mail work: agents are only as useful as what they can reach, so build the copy first. ([kay-os changelog, 2026-11-03](https://github.com/lossless-group/kay-os/blob/main/changelog/2026-11-03_01.md))
- **A first backfill raises no events.** Otherwise subscribing to a feed floods agents with years of "new" items. (Also from kaymail.)
- **Feed text is untrusted input.** Anyone can publish a feed. Agents that read items don't also hold tools that publish or send without a human approving.
- **Health is checked, not assumed.** A feed that stops updating, starts erroring or changes format is flagged, which makes it one of the self-maintaining tools in the Content Farm's tool library.

## Where it runs

The kay-os pattern fits: a Cloudflare Worker on a cron, with state in a Durable Object or D1 and the item archive in R2. A local mode (SQLite plus a polling loop) is useful for development and for anyone self-hosting.

## Prior art to study before building

| Tool | Why look |
|---|---|
| Miniflux | Minimal, self-hosted, has an API. Might be enough to run as-is behind an MCP adapter. |
| FreshRSS | Self-hosted, multi-user, Google Reader-compatible API. |
| RSSHub | Generates feeds for sites that don't publish them. |
| changedetection.io | Watches pages with no feed at all. |

The first question is whether to run one of these and wrap it, or write our own small service. The `study-repos-first` skill says to pin and read them before deciding.

## Open questions

- Wrap Miniflux, or build our own on a Worker?
- One feed list for everything, or one per consumer, merged?
- Does item content get fetched in full (via Jina Reader or Firecrawl) at read time, or only on demand?
- How are feeds for the 1,400+ entries in `tooling/` discovered and kept current: a one-time sweep, or part of the watcher?

## Related

- [[Self-Generating-Content-Farm-for-Content-Marketing]]
- [[Self-Generating-Deal-Scout-for-VC-Opportunity-Scans]]
- [[Self-Updating-Product-Announcement-Watcher]]
