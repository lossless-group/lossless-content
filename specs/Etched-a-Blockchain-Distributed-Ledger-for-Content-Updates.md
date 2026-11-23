---
title: "Etched: a Blockchain Distributed Ledger for Content Updates"
lede: "A shared ledger that records who wrote and updated which content, and how much it has mattered since, so creators earn ongoing income and AI labs can commission and pay for the content they need."
date_authored_initial_draft: 2026-11-23
date_authored_current_draft: 2026-11-23
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2026-11-23
date_modified: 2026-11-23
status: Stub
publish: false
site_uuid: 43b2d4f8-bb8c-4df6-9212-0e2787e03c4c
hex_code: deqras
tags: [Blockchain, Distributed-Ledgers, Content-Provenance, Creator-Economy, AI-Training-Data, Citation-Metrics]
authors:
  - Michael Staton
type: Specs
---

## Thesis

Thoughtful content takes work to write and more work to keep current, and almost nothing rewards the second part. Once a piece is published, its author earns little from it, even as it keeps getting read, cited and used to train models.

Etched is an attempt to:

- **Reward writing and updating.** Pay for new content, and also for the continuing work of keeping it accurate.
- **Measure impact the way the h-index does,** for content instead of academic papers: how much a piece matters now, and how much it has mattered over time.
- **Let AI research labs pay for content, and ask for it.** A marketplace where labs fund the content they need and creators supply it.
- **Give creators passive income,** like dividends, for as long as their content keeps being used.

Like the patent system, but for long-tail content and micro-updates: each contribution, down to a small correction, is recorded with its author and date, and earns its share when it's used.

## Open questions

- What counts as a contribution? A new piece, a correction, a new source, a fresh example?
- How is impact measured: citations, reads, retrievals, appearances in model answers? Who reports them, and how is gaming prevented?
- Does it need a blockchain, or would a signed, append-only git history do the same job?
- How do labs prove what they used, so payments reach the right creators?
