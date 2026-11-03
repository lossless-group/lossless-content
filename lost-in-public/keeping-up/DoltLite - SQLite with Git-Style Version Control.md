---
date_created: 2026-10-05
date_modified: 2026-10-05
title: DoltLite — SQLite with Git-Style Version Control
slug: doltlite-sqlite-git-style-version-control
tags: [Databases, SQLite, Version-Control, Local-First, Agentic-Engineering, Open-Source, Homebrew]
github_repo_url: https://github.com/dolthub/doltlite
brew_page: https://formulae.brew.sh/formula/doltlite
install: brew install doltlite
---

https://github.com/dolthub/doltlite

## Why This Matters

[[Dolthub|Dolt]] has offered Git semantics on SQL for years, but it runs as a server, which is the wrong shape for software that lives on a user's device. `DoltLite` is DoltHub's answer: a fork of [[SQLite]] that swaps the B-tree layer for a content-addressed prolly tree. The parser and planner stay upstream-derived. You get branch, merge, diff, push, and pull as SQL functions, in a library you link rather than a daemon you manage.

The argument in DoltHub's ["Why DoltLite?"](https://www.dolthub.com/blog/2026-04-27-why-doltlite/) is aimed at [[Local-First Applications|local-first]] software. Sync engines usually resolve conflicts with CRDTs. DoltLite surfaces them instead, in a conflicts table a person has to clear, which suits data with audit or rollback requirements.

The other story is how it was made. Tim Sehn writes that it began as a pet project to test Steve Yegge's Gas Town orchestrator, and that a team of agents got it to Beta in about 2,000 pull requests. DoltHub calls it a product of agentic engineering, and its [Beta post](https://www.dolthub.com/blog/2026-08-31-doltlite-beta/) treats the result as proof. That's the maker's framing, so the test results below are worth more than the claim.

It reached Beta at 0.50.0 on August 31, 2026, and landed in Homebrew core on October 5, 2026 at version 0.50.14. The details below reflect 0.51.6, checked November 3, 2026.

## What It Actually Does

- **Version control in SQL.** `dolt_commit`, `dolt_merge`, `dolt_rebase`, `dolt_cherry_pick`, row-level staging, history tables, and blame.
- **Remotes.** Push and pull to a file path, its own `doltlite-remotesrv`, or DoltHub.
- **Everywhere SQLite goes.** Python, Ruby, Node, Rust, Go, Swift, Android, .NET, PHP, and a browser WASM build.
- **Versioned vectors.** SQLite's `vec1` extension is built in, and vector tables branch, diff, and push like everything else.

## What Beta Means, and Where It Differs

DoltHub's own numbers: 100% of `sqllogictest` (5.8 million queries) and 99.46% of SQLite's 892,277 TCL tests, with 4,809 listed divergences. The August 31 report had file-backed reads at parity and batched writes 10% slower, while small autocommit writes ran 3.1 times slower, about 400 versus 125 microseconds.

The storage format, which changed 12 times before Beta, is now frozen at version 12, with a promised migration path for any future break.

It isn't a drop-in for every use. There's no WAL or journal, only one durable writer at a time, and a write transaction may touch only one file-backed database. Stock SQLite files open on the original engine, and version control applies only to DoltLite-format databases.

The license is split: Apache-2.0 for DoltHub's extensions and public domain for the SQLite code. GitHub doesn't detect a single license for the repo, and Homebrew lists it as `Apache-2.0 AND blessing`.

## Where It Fits in Our Workflow

We haven't run it, and the near-term fit is weak. Our canonical layer in `augment-it` is on [[SurrealDB 4.0 - A Major Release for Our Canonical Layer|SurrealDB]], and our corpus lives in Chroma. Several `dididecks-ai` client sites and `humain-web` use `@libsql/client`, but that's libSQL, a different SQLite fork, so nothing here swaps in cheaply.

Two ideas are worth keeping. An agent could work on a branch of a database and be reset with `dolt_reset('--hard')` if it goes wrong, which is the same safety we get from git with code. And versioned vectors raise an interesting question for a RAG corpus: could we diff an index between ingests instead of only rebuilding it? We have no plan to try that yet.

## Install

```bash
brew install doltlite
doltlite my.db
```

Source: <https://github.com/dolthub/doltlite>
