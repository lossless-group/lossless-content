---
title: "RSS Monitor Utility for the Always-On Agents"
lede: "One small, polite service that follows every feed an organization cares about and files each new item into a corpus, so agents can react to it today and draw on it a year from now."
date_authored_initial_draft: 2026-11-22
date_authored_current_draft: 2026-11-22
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.2
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2026-11-22
date_modified: 2026-11-22
status: Draft
publish: false
site_uuid: f7ef5001-fb0a-423d-9090-0e79808f6ce1
hex_code: 3fezcs
tags: [RSS, Feeds, Always-On-Agents, Corpora, Source-Curation, Agent-Tools, Self-Hosting]
authors:
  - Michael Staton
type: Specs
---

# RSS Monitor Utility for the Always-On Agents

## Why care?

Feeds are the cheapest way to know what's new. Most blogs, changelogs, GitHub releases, YouTube channels, Substacks, arXiv categories and news sites publish RSS or Atom. It's free, structured and polite, and it saves search and scrape credits for the things a feed can't tell you.

There are two reasons to follow feeds, and most tools only serve the first:

1. **Scan and react.** Spot good content ideas and source material now: a release worth a post, a company worth a look. This is what the [[Self-Generating-Content-Farm-for-Content-Marketing|Content Farm]], the [[Self-Generating-Deal-Scout-for-VC-Opportunity-Scans|Deal Scout]], the [[Self-Updating-Product-Announcement-Watcher|Product Announcement Watcher]] and the kay-os colony need first.
2. **Build a corpus.** Keep what you read, with provenance, so it grounds memos, decks, reports, RAG and agents later. Many organizations will want this more than the alerts. A feed reader throws items away once they're read. A corpus is a body of source material you keep and add to on purpose.

Scanning is where we start. Building corpora is where it matters. So this utility doesn't keep a store of its own. It files every item into a corpus, the way [corpora-builder](https://github.com/lossless-group/corpora-builder) already defines one, and both uses read from there.

## How we're building it

An open-source utility built in public, on the way to solving a problem we and our clients (startups and VCs) already have. We need it for our own agents first.

## What corpora-builder already settled

`ai-labs/corpora-builder/` exists because corpus building was rebuilt as a sub-feature three times across ai-labs ([Corpora-Builder System Design](../../ai-labs/corpora-builder/context-v/explorations/Corpora-Builder-System-Design.md)). A feed monitor is one more way of capturing sources, so it should follow these rules, not invent its own:

| Settled in corpora-builder | What it means for feeds |
|---|---|
| [Capture, Link-First](../../ai-labs/corpora-builder/context-v/specs/Capture-Link-First.md): `corpora add <url>` writes metadata only by default, and `--fetch` pulls the body | A feed item becomes a source with title, publisher, date and excerpt. Full text is fetched only for items that survive triage. "Spend grounding cost on survivors, never on candidates." |
| Dedup by `normalized_url` | The same post seen in three feeds is one source. |
| A failure is a fact | A feed that 404s or an item link that rots is recorded, not dropped. |
| [Source File Model](../../ai-labs/corpora-builder/context-v/specs/Source-File-Model.md): `status` is `candidate`, `promoted`, `archived` or `rejected`, and `verdict` is written only by a person | Every feed item lands as `candidate`. An agent may write `machine_verdict` ("relevant to the VC audience"), never `verdict`. |
| [Source Curation Gate](../../ai-labs/context-v/blueprints/Source-Curation-Gate.md), [Corpus Inbox, Capture and Triage](../../ai-labs/augment-it/context-v/specs/Corpus-Inbox-Capture-and-Triage.md) | New items go to an inbox, and a human (or a supervised agent) triages them into a corpus. |
| [Storage Seam](../../ai-labs/corpora-builder/context-v/specs/Storage-Seam.md): one `CorpusStore` over local, R2 and cache | The monitor writes through the same seam, so it works on a laptop or in the cloud unchanged. |
| [Binary Ingest and Bin Store](../../ai-labs/corpora-builder/context-v/specs/Binary-Ingest-And-Bin-Store.md) | Podcast audio, PDFs and images in enclosures are stored once by hash and fetched when asked. |
| [Corpus Change Feed](../../ai-labs/corpora-builder/context-v/specs/Corpus-Change-Feed.md) (Signed-Off) | "Twelve new items this week, three promoted" is a change record, shown to someone who will never read a diff. |
| [Autonomy Gates](../../ai-labs/corpora-builder/context-v/contracts/Autonomy-Gates.md) | Following feeds and filing candidates is unattended work. Promoting into a client's corpus is not. |

The open issue [Source Pointers vs. Master](../../ai-labs/corpora-builder/context-v/issues/Need-Elegant-Resolution-to-Source-Pointers-vs-Master.md) applies directly: one feed item can belong to several corpora (a tool's history, an audience's ideas, a client's sector), and the body shouldn't be stranded in an untriaged inbox file.

## What it does

The Content Farm's watchers come in different kinds (announcement, entity, topic, source, question, opportunity), each watching a cluster of content and each combining RSS with search. This utility is the RSS half they share. Search fills in where no feed exists, and when search keeps finding good items on a site, the site's feed gets proposed here. See "Watchers: kinds and clusters" in [[Self-Generating-Content-Farm-for-Content-Marketing]].

1. **Keeps a list of feeds**, each tagged with the clusters, corpora and consumers it serves (an audience, a thesis, a tool in `tooling/`, a client). The list is plain text in git, importable and exportable as OPML.
2. **Finds feeds** from a site URL (`<link rel="alternate">`, common paths like `/feed` and `/rss.xml`), and falls back to RSSHub or change detection for sites without one. YouTube channels and playlists have their own feeds, which is how the Content Farm watches video (see "YouTube and other spoken sources" there).
3. **Polls politely**, with `ETag` and `If-Modified-Since`, backing off on errors, and using WebSub push where a feed offers it.
4. **Files each new item** as a `candidate` source in the right corpus inbox, metadata only, deduped by normalized URL.
5. **Emits an event per new item** to an append-only log that agents read (the shape of kaymail's `events.jsonl` in kay-os). This is the "scan and react" path. It points at the source file rather than carrying its own copy.
6. **Serves it as a tool** in the Content Farm's shared tool library: `feed.subscribe`, `feed.discover`, `feed.new_since`, over MCP. Search across what's been kept belongs to the corpus ([Search Index](../../ai-labs/corpora-builder/context-v/specs/Search-Index.md), [Ranked Search](../../ai-labs/corpora-builder/context-v/specs/Ranked-Search.md)), not to the monitor.

## Principles

- **Archive first, agents second.** The lesson from kay-os's mail work: agents are only as useful as what they can reach. ([kay-os changelog, 2026-11-03](https://github.com/lossless-group/kay-os/blob/main/changelog/2026-11-03_01.md))
- **A first backfill raises no events.** Subscribing to a feed files its history into the corpus but doesn't flood agents with years of "new" items. (Also from kaymail.)
- **Reachability is not approval.** A filed item is a candidate until a person says otherwise.
- **Feed text is untrusted input.** Anyone can publish a feed. Agents that read items don't also hold tools that publish or send without a human approving.
- **Health is checked, not assumed.** A feed that stops updating, starts erroring or changes format is flagged. That makes it one of the self-maintaining tools in the Content Farm's tool library.

## Where it runs

The kay-os pattern fits: a Cloudflare Worker on a cron, with feed state in a Durable Object or D1, writing sources through `CorpusStore` to R2. A local mode (polling into a local corpus) serves development and anyone self-hosting. corpora-builder's [MVP plan](../../ai-labs/corpora-builder/context-v/plans/Corpora-Builder-MVP-R2-Native-With-Checkpoint-History.md) and [multi-org plan](../../ai-labs/corpora-builder/context-v/plans/Didi-Auth-and-Multi-Org-Corpora.md) decide where an organization's corpora live. The monitor follows them.

corpora-builder's own rule is that patterns travel "knots-style", copied from blueprints and sample code, not imported as a shared package. The monitor could be a corpora-builder capture source (alongside link-first and screen capture) or a separate service that writes in its format. That's the first decision.

## Prior art to study before building

| Tool | Why look |
|---|---|
| Miniflux | Minimal, self-hosted, has an API. Might be enough to run as-is behind an adapter that files into a corpus. |
| FreshRSS | Self-hosted, multi-user, Google Reader-compatible API. |
| RSSHub | Generates feeds for sites that don't publish them. |
| changedetection.io | Watches pages with no feed at all. |

The `study-repos-first` skill says to pin and read these before deciding whether to wrap one or build our own.

## Open questions

- Is this a capture source inside corpora-builder, or its own service that writes corpora-builder's format?
- Wrap Miniflux, or build a small Worker?
- Which items get `--fetch` automatically: none, the ones an agent's `machine_verdict` flags, or everything from trusted feeds?
- One corpus per feed list, or one item filed into many corpora (the pointers-vs-master issue)?
- How are feeds for the 1,400+ entries in `tooling/` discovered and kept current?

## Related

- `ai-labs/corpora-builder/`, especially the [System Design exploration](../../ai-labs/corpora-builder/context-v/explorations/Corpora-Builder-System-Design.md)
- [Corpus-Grounded Generation of Decks and Memos](../../ai-labs/context-v/explorations/Corpus-Grounded-Generation-of-Decks-and-Memos.md), the consumption side
- [[Self-Generating-Content-Farm-for-Content-Marketing]]
- [[Self-Generating-Deal-Scout-for-VC-Opportunity-Scans]]
- [[Self-Updating-Product-Announcement-Watcher]]
