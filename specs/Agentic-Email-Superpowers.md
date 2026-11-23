---
title: "Agentic Email Superpowers"
lede: "Transform your email inbox into a powerful AI-driven workspace that automates repetitive tasks, extracts insights, and supercharges your productivity."
date_authored_initial_draft: 2025-09-12
date_authored_current_draft: 2026-11-22
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2025-11-15
date_modified: 2026-11-22
status: Iterating
publish: false
site_uuid: b332e11b-1808-474e-a5a8-811bbde0076c
hex_code: zvm2ur
tags: [Content-Automation, Email-Automation, AI-Powered-Email-Systems, Personal-Agents, Kaymail]
authors:
  - Michael Staton
summary: >-
  Retrospective spec, written 2026-11-22. From 2025 until November 2026 this was
  only a title and a lede in content/specs, an Open Spec nobody was building.
  It became kay-os, where the canonical copy now lives
  (ai-labs/kay-os/context-v/specs). This copy stays in content/specs as an
  Open Spec. Records the original idea, the one decision that changed it
  (archive first, agents second), what exists as of 2026-11-07, which parts of
  the original promise are still open, and where the working docs are.
image_prompt: "An exhausted human is at their desk in front of a large monitor with an email client. A friendly AI assistant represented by a humanoid robot character is offering them coffee and cleaning their desk."
type: Specs
---

> [!NOTE] Written after the fact
> This spec sat in `content/specs/` from September 2025 as a title, a lede and an image prompt, with no body. In November 2026 the idea got built as kay-os, so it was written up retrospectively on 2026-11-22. The canonical copy lives in [kay-os/context-v/specs](https://github.com/lossless-group/kay-os/blob/main/context-v/specs/Agentic-Email-Superpowers.md); this one stays here as an Open Spec. The lede above is the original. Everything below describes what happened to it.

## The original idea

The inbox is where most of a working life arrives, and most of it is repetitive: replies that follow a pattern, follow-ups that need remembering, contacts that need logging, threads that need summarizing before a meeting. The 2025 idea was to turn the inbox into a workspace where AI agents take those jobs off your hands and pull out what matters.

The image prompt says what it should feel like: an exhausted person at a desk, and an assistant bringing coffee and clearing the clutter. Help, not another tool to manage.

## What changed: the archive comes first

We tried a few email agents first. Each one saw a thin slice of the mail through someone else's API, and none could answer a question across ten years and several addresses. Switching agents meant starting over.

So kay-os turned the order around. Before any agent, it builds a complete copy of every mailbox on storage you control. Once the mail is there, a new agent can work over all of it from day one, and changing agents doesn't mean downloading anything again. ([2026-11-03 changelog](https://github.com/lossless-group/kay-os/blob/main/changelog/2026-11-03_01.md))

Two rules came with that decision, and they shape everything since:

- **The archive can't change your mail.** Every client opens mailboxes with `EXAMINE` and fetches with `BODY.PEEK`. Tests check every command sent to the server. Nothing gets marked, moved or deleted, and mail deleted upstream stays in the archive.
- **Email is untrusted input.** Anyone can put text into your archive by sending you a message. Agents that read mail don't also get tools that send or delete without a human approving.

## What exists (as of 2026-11-07)

| Piece | What it does | Where |
|---|---|---|
| `kaymail` | Pulls whole mailboxes to disk, newest first. Raw `.eml` files keyed by SHA-256 are the record. SQLite + FTS5 handles search, and `events.jsonl` logs new arrivals for agents. | `mail/kaymail.py`, `mail/backfill.sh` |
| R2 mirror | Copies the archive to a private Cloudflare R2 bucket so other machines can search and read it. Keys stay in 1Password and are read at run time. | `mail/r2.sh` |
| Sync Worker | A Cloudflare Worker (a cron plus one Durable Object per account) fetches new mail into the same bucket at the same paths every five minutes. | `sync-worker/` |
| Splash | Says who kay-os is for, the house rules its agents follow, and the colony roster. | `splash/`, [2026-11-07 changelog](https://github.com/lossless-group/kay-os/blob/main/changelog/2026-11-07_01.md) |

The working blueprint for all of the storage is [Mail Archive in Cloudflare R2](https://github.com/lossless-group/kay-os/blob/main/context-v/blueprints/Mail-Archive-in-Cloudflare-R2.md).

## From one email assistant to a colony

The 2025 idea was one assistant in the inbox. kay-os is a colony of narrower agents, each with one job, for people with seven inboxes, four calendars and a dozen involvements, often with ADHD or a 2e mind. That framing comes from the [ADHD and Executive Function Skills](https://github.com/lossless-group/study-adhd-and-executive-function-skills) study, which also gave the colony its seven house rules: a two-minute first step, three choices at most, numeric triggers, parking tangents, scoring effort, consent before memory, and silence by default.

The roster maps onto the original promise:

- **The Archivist** (live) keeps the archive current. Nothing else works without it.
- **The Herald** (next) is a Hermes agent on the phone, where most email actually gets handled.
- **Gatekeeper, Timekeeper, Parking Attendant and Steward** (planned) cover triage, time, tangents and upkeep.

## What's still open

Most of the original lede is still ahead. The archive answers "can an agent see everything?" It doesn't yet automate anything.

- **Mining, triage and contact sync.** [Email Repository and Agent Harness](https://github.com/lossless-group/kay-os/blob/main/context-v/explorations/Email-Repository-and-Agent-Harness.md) splits the work into the repository and the harness of agents that work it, and leaves the specific mining and triage needs as open questions.
- **Letting outside agents in safely.** [A Gateway Between Agents and My Accounts](https://github.com/lossless-group/kay-os/blob/main/context-v/explorations/A-Gateway-Between-Agents-and-My-Accounts.md) sketches kay-os holding the accounts while agents like Hermes get only what it lets through: scopes per caller, proposals instead of actions, an audit log.
- **Known limits of the archive.** Microsoft accounts need OAuth, which kaymail doesn't speak. Search reads attachment filenames, not their contents. `watch` polls instead of holding IMAP IDLE.

## Where to look

- Code and README: `ai-labs/kay-os/` ([GitHub](https://github.com/lossless-group/kay-os))
- Splash: [lossless-group.github.io/kay-os](https://lossless-group.github.io/kay-os/)
- Ship log: [`changelog/`](https://github.com/lossless-group/kay-os/tree/main/changelog)
- Explorations and blueprints: [`context-v/`](https://github.com/lossless-group/kay-os/tree/main/context-v)
