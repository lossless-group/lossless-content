---
title: "Self-Generating Deal Scout for VC Opportunity Scans"
lede: "Watch where new companies surface, score each one against a firm's thesis, and hand partners a short, sourced list to review, instead of another newsletter to skim."
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
site_uuid: 2027b9e9-43f2-4749-a435-7e26f216e122
hex_code: gu8ib1
tags: [Venture-Capital, Deal-Sourcing, Thesis-Fit, Agent-Pipelines, Human-in-the-Loop, CRM]
authors:
  - Michael Staton
type: Specs
---

# Self-Generating Deal Scout for VC Opportunity Scans

## Why care?

Everything we've built for VC firms starts after a deal is already found. memopop writes the memo, the scorecard agent scores it, `crawl-fetch-ingest` pulls the team and logos, DidiDecks puts one slide per deal on screen, and Twenty holds it all. The front of the funnel, noticing a company worth a look, is still a partner skimming newsletters, demo days and LinkedIn.

This spec is the front of that funnel. It's the same machine as [[Self-Generating-Content-Farm-for-Content-Marketing]], aimed at companies instead of announcements.

## How we're building it

Like the [[Self-Generating-Content-Farm-for-Content-Marketing|Content Farm]], this is an open-source utility built in public, on the way to solving a problem our VC clients already have. A firm can run it as-is or adapt it, and its thesis, notes and decisions stay its own.

## What it does

1. **Watches** where companies surface: funding announcements, accelerator batches, launch sites, GitHub, papers, hiring, filings, a firm's own inbound.
2. **Resolves** each mention to one company record, deduped against what the firm already knows.
3. **Scores** the company against the firm's written thesis, with the reasons and sources shown.
4. **Drafts** a short brief for the companies that clear the bar.
5. **Queues** briefs for a partner to pass, track or pursue. Pursued companies go to the CRM and, if wanted, to a memo.

## What already exists

| Need | Prior art |
|---|---|
| Thesis and fit as data | Twenty CRM's `Thesis`, `Thesis Fit`, `Deal Prospect` and `Deal Source` objects, and the forced-choice scoring standard (`lossless-crm-interface-guidelines` skill). |
| Company and team enrichment | `crawl-fetch-ingest` and `vc-firm-profile-ingest` skills. |
| From brief to memo | memopop-orchestrator: multi-agent memo generation, scorecard agent and templates, capital-syndicate research. |
| Presenting found deals | [Quick Slides Assembly to Demo Deal Coverage](../../ai-labs/context-v/plans/Quick-Slides-Assembly-to-Demo-Deal-Coverage.md), [Build a Promotion Surface for Investment Opportunities](../../astro-knots/context-v/blueprints/Build-a-Promotion-Surface-for-Investment-Opportunities.md). |
| A practitioner's version | Toby's OpenClaw + Obsidian pipeline demo at the 2026-05-27 Dojo all-hands (`astro-knots/sites/fullstack-vc/context-v/narratives/2026-05-27_monthly-all-hands/06b_toby-openclaw-obsidian.md`). |

What's new is the watching, the entity resolution and the thesis-fit judgment.

## Shared with the Content Farm

| Stage | Content Farm | Deal Scout |
|---|---|---|
| Watch config | Per audience | Per firm thesis |
| Watchers and state | Shared | Shared |
| Tool library | Shared (search, scrape, feeds) | Shared, leaning on Exa and structured records |
| Source store | Shared | Shared |
| Judge | Relevance to an audience | Fit to a thesis |
| Routing | Queuer, Saver, Passer (see the decision tree in the Content Farm spec) | The same: unsure fits to a partner's queue, fits saved to the CRM and corpus, strong fits passed on to a brief |
| Draft | Post in a house voice | Brief in a firm's format |
| Review queue | Shared change feed | Shared change feed |
| Destination | Sites and channels | CRM, memo pipeline |

The same scan also feeds content. A company that fits a thesis is often a good story for that firm's audience, and a release a VC should know about is often a signal about a company.

## Quality bar (ranked)

1. **Every score shows its reasons and sources.** A partner can disagree with a reason, not just a number.
2. **No duplicates** of companies the firm already tracks or passed on.
3. **Short lists.** A scan that surfaces 200 companies has failed.
4. **A partner's pass is remembered** and teaches the next scan.
5. **The firm's data stays the firm's.** Thesis, notes and decisions live in the firm's own CRM or repo.

## Open questions

- Which sources are worth paying for (Crunchbase, PitchBook, Harmonic) versus scraping (Firecrawl, Alexandria providers)?
- One scout per firm, or one shared scan scored against many theses?
- Is the thesis written prose, structured criteria, or both? The CRM's Thesis object suggests both.
- Is this a Dojo product (VCs run it themselves) or a service we run for clients?

## Related

- [[Self-Generating-Content-Farm-for-Content-Marketing]]
- [[Self-Updating-Product-Announcement-Watcher]]
- [[Zero-Complexity-Content-Repositories-for-Collaboration-on-Web-Content]]
