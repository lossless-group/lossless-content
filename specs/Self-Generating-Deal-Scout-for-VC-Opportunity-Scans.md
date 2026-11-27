---
title: Self-Generating Deal Scout for VC Opportunity Scans
lede: Watch where new companies surface, score each one against a firm's thesis, and hand partners a short, sourced list to review, instead of another newsletter to skim.
date_authored_initial_draft: 2026-11-22
date_authored_current_draft: 2026-11-26
date_authored_final_draft:
date_first_published:
date_last_updated: 2026-11-26
at_semantic_version: 0.0.0.2
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2026-11-22
date_modified: 2026-11-24
status: Draft
publish: true
site_uuid: 2027b9e9-43f2-4749-a435-7e26f216e122
hex_code: gu8ib1
tags:
  - Venture-Capital
  - Deal-Sourcing
  - Thesis-Fit
  - Agent-Pipelines
  - Human-in-the-Loop
  - CRM
authors:
  - Michael Staton
type: Specs
image_prompt: A robot scout with binoculars on a ridge overlooking a valley of small startup buildings, marking the promising ones on a map for a team of venture capitalists waiting at base camp. Adventurous and optimistic.
banner_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Self-Generating-Deal-Scout-for-VC-Opportunity-Scans_banner_image_1795477924032_vq5ZJ_Cw6.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Self-Generating-Deal-Scout-for-VC-Opportunity-Scans_portrait_image_1795477924377_Z0DO4s_AN.webp
square_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Self-Generating-Deal-Scout-for-VC-Opportunity-Scans_square_image_1795477924664_tGWXSgaCN.webp
banner_image_taller: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Self-Generating-Deal-Scout-for-VC-Opportunity-Scans_banner_image_taller_1795477924991_52mPvfW8u.webp
---

# Self-Generating Deal Scout for VC Opportunity Scans

## Why care?

Everything we've built for VC firms starts after a deal is already found. memopop writes the memo, the scorecard agent scores it, `crawl-fetch-ingest` pulls the team and logos, DidiDecks puts one slide per deal on screen, and Twenty holds it all. The front of the funnel, noticing a company worth a look, is still a partner skimming newsletters, demo days and LinkedIn.

This spec is the front of that funnel. It's the same machine as [[specs/Lasso-Self-Generating-Content-Farm-for-Content-Marketing]], aimed at companies instead of announcements.

## How we're building it

Like the [[specs/Lasso-Self-Generating-Content-Farm-for-Content-Marketing|Content Farm]], this is an open-source utility built in public, on the way to solving a problem our VC clients already have. A firm can run it as-is or adapt it, and its thesis, notes and decisions stay its own.

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

## Watching with Perplexity's Search and Monitor APIs

The Content Farm spec covers both APIs in "Running searches and monitors through Perplexity": what they cost, what they take off our plate, and where they clash with our principles. This is how they map onto a thesis. It's from Perplexity's docs, read on 2026-11-26.

| Where companies surface | How to watch it | Notes |
|---|---|---|
| New rounds and launches in a thesis's sectors | An **Agent monitor**. Its task (`input`) asks for companies that announced a round or a launch since the last check, and its `goal` is the thesis prose. | Each run keeps at most five updates, each with up to five sources. That suits "short lists". It's billed as Agent API usage, at `low`, `medium` or `high` effort. |
| A known signal, such as a sector plus "seed round" | A **Search monitor** per signal, with short keyword queries and `include_domains` set to the announcement sources the firm trusts. | One query per monitor, $0.001 a run. It returns only URLs it hasn't seen before. |
| Pages where companies first appear: accelerator batch lists, demo-day pages, a portfolio company's competitors' careers pages | A **Page monitor** with 1 to 10 URLs and a goal such as "new companies added to the batch". | It returns text diffs, so a new name on a batch page is a change. A competitor's careers page that grows is a hiring signal. |
| A new thesis, or a firm's first scan | **Search API** calls with publication-date windows, one week at a time, five queries per request. | This backfills what a monitor would have caught. A monitor's first run only looks back one schedule period, at most seven days. |
| Founders and teams, during Resolve | **People Search** (`search_type: "people"`, up to 50 results). | Check each profile's current employer before using it, as Perplexity's own docs advise. |

What still belongs to us:

- **Resolve.** A monitor dedupes URLs, not companies. Three articles about one company's round are three changes. Matching them to one company record, and against what the firm already tracks, stays our step.
- **The decision.** A monitor's goal is a judge, and it drops what it rejects without showing it. Its `confidence` feeds the thesis-fit score as one input with its reasons. A partner's pass is still the only verdict, and it has to be remembered on our side, because the monitor's memory is of URLs.

## Quality bar (ranked)

1. **Every score shows its reasons and sources.** A partner can disagree with a reason, not just a number.
2. **No duplicates** of companies the firm already tracks or passed on.
3. **Short lists.** A scan that surfaces 200 companies has failed.
4. **A partner's pass is remembered** and teaches the next scan.
5. **The firm's data stays the firm's.** Thesis, notes and decisions live in the firm's own CRM or repo.

## Open questions

- Which sources are worth paying for (Crunchbase, PitchBook, Harmonic) versus scraping (Firecrawl, Alexandria providers)?
- One scout per firm, or one shared scan scored against many theses? A monitor's goal holds one thesis, so per-firm monitors fit the first. A shared scan fits Search API calls on our own clock, with our own judge scoring each result against every thesis.
- If we run this as a service, whose Perplexity organization holds the monitors? Every monitor counts against that organization's limit of 100 to 500 active monitors, and is billed to it.
- Is the thesis written prose, structured criteria, or both? The CRM's Thesis object suggests both.
- Is this a Dojo product (VCs run it themselves) or a service we run for clients?

## Related

- [[specs/Lasso-Self-Generating-Content-Farm-for-Content-Marketing]]
- [[Self-Updating-Product-Announcement-Watcher]]
- [[Zero-Complexity-Content-Repositories-for-Collaboration-on-Web-Content]]
