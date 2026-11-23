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

## Git history and a ledger, together

Git already records each change with its author, date and parent, down to a one-line correction. That's most of what a ledger of contributions needs, and agents and writers already work in it. What git can't do is pay anyone. A shared ledger is good at exactly that: holding balances, splitting payments among many contributors, and paying out on a schedule without one company keeping the books.

So the likely shape uses both:

- **Git holds the content and its micro-history.** Every contribution is a commit, ideally signed, so authorship can be checked.
- **The ledger holds a fingerprint of that history and the money.** It records commit hashes (not the content), who owns which share of a piece, what labs have paid in, and what each contributor is owed. Payouts follow from those shares, like dividends.

It may turn out a blockchain isn't needed. But dividend payments to many small contributors across borders, and the idea of a single ledger nobody owns, are what blockchains are built for, so it's worth exploring before ruling out.

### Platforms to explore

| Platform | Why look at it |
|---|---|
| **Ethereum** | The most widely used platform for smart contracts, with the most tools and wallets. Fees on the main chain are high, so payouts would likely run on a cheaper layer-2 network built on top of it. |
| **Solana** | Fast and cheap per transaction, which suits frequent micro-payments and many small updates. |
| **Avalanche** | Lets a project run its own chain with its own rules and fees, while still connected to the wider network. Useful if Etched needs custom rules for contributions and payouts. |

Questions for each: what a payout to thousands of contributors costs, how creators without a wallet get paid, and how a lab pays in ordinary money.

## Open questions

- What counts as a contribution? A new piece, a correction, a new source, a fresh example?
- How is impact measured: citations, reads, retrievals, appearances in model answers? Who reports them, and how is gaming prevented?
- Which part needs the ledger, and which can stay in git?
- How do labs prove what they used, so payments reach the right creators?
