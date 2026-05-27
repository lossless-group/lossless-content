---
date_created: 2026-05-25
date_modified: 2026-05-25
title: mercury-cli — Mercury Banking from the Terminal
slug: mercury-cli-banking-terminal
tags: [Developer-Tools, Banking, Fintech, CLI, Startups]
github_repo_url: https://github.com/MercuryTechnologies/mercury-cli
brew_page: https://formulae.brew.sh/formula/mercury-cli
install: brew install mercury-cli
---

https://github.com/MercuryTechnologies/mercury-cli

## Why This Matters

Mercury is the bank a meaningful slice of US-incorporated startups actually use — the dashboard is fine, the API has been around for years, but until now there was no first-party CLI. If your accounting, runway, or burn calculations live in scripts (and ours largely do, under `tidyverse/`), you were either calling the REST API by hand or copy-pasting CSVs out of the web UI.

`mercury-cli` is Mercury's *official* Go-based CLI — version 0.8.2 landed in Homebrew core this cycle. Apache-2.0, which is the right license for first-party banking tooling (no AGPL surprises in your finance scripts).

This is the first-party version. Treat anything else you find with a similar name with suspicion — banking creds are a credential-stuffing target.

## What It Actually Does

The CLI mirrors the Mercury REST API surface — account list, balance queries, transaction history, transfer initiation (within the limits Mercury's API permits), and recipient management. Auth is via API token, which Mercury issues per-workspace from the dashboard.

The interesting bits, from a scripting perspective:

- **Programmatic balance + transaction reads** — pipe into `jq`, dump to Parquet, feed into your finance notebook without re-auth ceremony.
- **Recipient-managed transfers** — useful for recurring vendor payments where you don't want a human re-typing a routing number.
- **Workspace switching** — if you operate multiple Mercury workspaces (parent entity + portfolio companies, fiscal sponsor + sub-orgs), the CLI handles the auth boundary.

## Where It Fits in Our Workflow

Two angles:

1. **Runway / burn dashboards.** The `tidyverse/` child pseudomonorepo hosts our R + Quarto financial reporting. A scheduled `mercury-cli` pull → DuckDB → Quarto render is a cleaner pipeline than the current CSV-export-and-tidy ritual. Plays nicely with [[panache]] (also in this cycle's Homebrew update) for the Quarto authoring side.

2. **Credibility-card data.** Our [[crawl-fetch-ingest]] flow already pulls public portfolio data for VC firms. For our *own* fundraise material under `deck-iteration-workflow`, an authenticated read of our actual cash position is one of the things you want auto-current rather than copy-pasted into a slide three weeks before the meeting.

Caveats: it's a CLI to a bank. Keep the API token in `~/.secrets` per the CLAUDE.md secrets discipline, never check it in, and audit transfers carefully if you wire any to automation.

## Install

```bash
brew install mercury-cli
mercury-cli auth login    # one-time
mercury-cli accounts list
```

Source: <https://github.com/MercuryTechnologies/mercury-cli>
