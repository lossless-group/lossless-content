---
date_created: 2026-08-28
date_modified: 2026-08-28
title: Readwise CLI — Your Reading Library, Reachable by Agents
slug: readwise-cli-reading-library-reachable-by-agents
tags: [Developer-Tools, AI-Agents, Reading, Personal-Knowledge-Management, Model-Context-Protocol, Claude-Code, Homebrew]
homepage: https://readwise.io/cli
github_repo_url: https://github.com/readwiseio/readwise-cli
brew_page: https://formulae.brew.sh/formula/readwise-cli
install: brew install readwise-cli
---

https://readwise.io/cli

## Why This Matters

If you've spent years saving articles and highlights into Readwise and Reader, that library is a useful private corpus that your agents can't normally see. The official `readwise` CLI puts it one command away. Readwise says its documents are semantically indexed, and the commands include hybrid search over highlights and over full document text.

The design is the notable part. This isn't a separate client with its own logic. According to the README, the CLI connects to the hosted Readwise MCP server, discovers the tools, and exposes each one as a command, caching the list for 24 hours. So it's MCP for agents that would rather call a shell command.

It landed in Homebrew core on August 28, 2026 at version 0.5.9. The CLI is MIT licensed and written in TypeScript. The details below reflect 0.5.11, checked November 3, 2026.

## You Need a Paid Account

The CLI is free. The service behind it isn't, and your library lives in that service.

- **No free plan.** Readwise's billing FAQ says there's no free plan after the trial. Its pricing page says the first 30 days are free.
- **Prices checked November 3, 2026, billed yearly:** Full Readwise at $9.99 a month, Reader only or Highlights only at $7.99, and Highlights Lite at $5.59.
- **Plan decides reach.** The pricing page lists CLI and MCP access under Full, Reader only, and Highlights only, each scoped to what the plan includes. It doesn't list them under Highlights Lite, so confirm before picking that one.

This is also the opposite of the local-first tools nearby. Every search goes over the network to Readwise, and credentials sit in `~/.readwise-cli.json`.

## What It Actually Does

- **Search.** `reader-search-documents` and `readwise-search-highlights`.
- **Read.** `reader-get-document-details` returns a saved document as Markdown.
- **Manage.** Save URLs, move documents, tag, create highlights, and edit metadata in bulk.
- **Review.** Daily review, plus Readwise Books commands for shelves and reading sessions.
- **Export.** `reader-export-documents` produces a ZIP of Markdown files, which is the exit if you ever leave.
- **Agent skills.** `readwise skills install claude` adds workflows such as inbox triage and a quiz on something you've read.

The feature we like best is a guardrail. `readwise config set readonly true` hides every write command, and turning it back off through the CLI logs you out, so an agent can't quietly re-enable writes. The README notes the TUI settings screen doesn't have that requirement.

## Where It Fits in Our Workflow

The fit depends on someone already keeping a library there, and we can't claim that today. We haven't run it, and in the content repo and `context-v/` directories we searched, the only reference to Readwise is our own list of tools to review.

If that changes, the shape is appealing. Our Chroma collections cover what we've written, and a reading library would cover what we've read, reachable with a single command during research. The cheapest trial would be readonly mode with a token, used from one session. For anything durable, the Markdown export could feed a separate local collection, so the corpus doesn't depend on a subscription. We'd treat that as an idea, not a plan.

## Install

```bash
brew install readwise-cli
readwise login
readwise config set readonly true
readwise --refresh
```

Source: <https://github.com/readwiseio/readwise-cli>
