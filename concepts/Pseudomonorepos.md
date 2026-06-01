---
date_created: 2025-06-01
date_modified: 2026-06-01
title: Pseudomonorepos
slug: pseudomonorepos
aliases:
  - Pseudomonorepo
  - Pseudo-Monorepo
  - Pseudo Monorepos
  - pseudomonorepo
  - pseudomonorepos
publish: true
authors:
  - Michael Staton
tags: [Pseudomonorepos, Context-Engineering, Repository-Architecture, Lossless-Conventions, Monorepos, Git-Submodules, Agentic-Engineering]
site_uuid: 28b781ea-3ed6-4622-8798-6771d0e9a238
at_semantic_version: 0.0.01.1
---

A **pseudomonorepo** is a parent repository that aggregates child repositories — usually as git submodules — *not* to share build tooling or a workspace manifest, but primarily to host a parent-level `context-v/` directory that captures the conventions, prompts, blueprints, and explorations spanning those children.  This is paired with [[concepts/Context Vigilance|Context Vigilance]]

It's a term we coined to describe a pattern we kept reaching for that didn't have a name. Neither a [[Monorepos|true monorepo]] (one repo, one dependency graph, one CI) nor a loosely coupled federation of independent repos — pseudomonorepos sit in the middle, optimizing for **shared context** rather than shared tooling.

## The Problem It Solves

Modern repositories that work with AI coding agents — Claude Code, Cursor, Codex, Windsurf — accumulate a parallel layer of artifacts that aren't code: spec files, prompt libraries, architectural blueprints, exploration notes, reminders about past mistakes, issue logs. This is the [[Context Engineering|context layer]], and at The Lossless Group we standardize it under a `context-v/` directory at the root of every repo.

The problem appears when a family of related repos starts to share patterns. The Lossless Group's tree includes ~27 projects organized into themed children — `ai-labs/`, `astro-knots/`, `content-farm/`, `tidyverse/` — and a convention that's true across all of `astro-knots/` (say, "no React, no JSX, no Angular") belongs *somewhere* between the individual project and the org-level conventions. A true monorepo would force them into a single dependency graph they don't need; a federation of independent repos would force every project to re-document the shared convention.

A pseudomonorepo gives that intermediate scope a home. The parent's `context-v/` documents what's true across its children. The children, as submodules, keep their own git history, their own release cadence, their own deploy targets.

## What Distinguishes It from a True Monorepo

| Dimension | True Monorepo | Pseudomonorepo |
|---|---|---|
| Dependency graph | Single, shared | Each child independent |
| Workspace tooling | npm workspaces, pnpm, Bazel, Nx | None — each child has its own |
| CI/CD | One pipeline | Per-child pipelines |
| Release cadence | Atomic across the repo | Per-child |
| Primary motivation | Shared code, atomic refactors | Shared *context* — prompts, specs, blueprints |
| Children embedded as | Directories in one repo | Git submodules (usually) |

The litmus test: if you removed the parent's `context-v/` and `changelog/`, would the parent still serve a purpose? In a true monorepo, yes — the workspace manifest, the shared build, the dependency graph remain. In a pseudomonorepo, no — the parent exists *primarily* to host that context layer.

## Anatomy

```
pseudomonorepo/
├── .git
├── .gitmodules            # children referenced as submodules
├── context-v/             # PARENT-level context spanning children
│   ├── specs/
│   ├── blueprints/        # cross-cutting patterns across children
│   ├── prompts/
│   ├── reminders/
│   ├── explorations/
│   └── issues/
├── changelog/             # ship log at the family level
├── child-a/               # submodule, has its own context-v/ + changelog/
├── child-b/               # submodule, has its own context-v/ + changelog/
└── child-c/               # could itself be a pseudomonorepo (nested)
```

Each level is authoritative for its own scope. Children own their internals. **The parent owns the space *between* children** — the cross-cutting concerns that no single child should be forced to document.

## Nesting

Pseudomonorepos compose. The Lossless tree looks roughly like:

```
lossless-monorepo                 ← root pseudomonorepo
├── ai-labs/                      ← itself a pseudomonorepo
│   ├── context-vigilance-kit/    ← project
│   ├── dididecks-ai/             ← project
│   ├── memopop-ai/               ← project
│   └── augment-it/               ← project
├── astro-knots/                  ← itself a pseudomonorepo
│   └── sites/
│       ├── memopop-site/         ← project
│       ├── mpstaton-site/        ← project
│       ├── fullstack-vc/         ← project
│       ├── banner-site/          ← project
│       └── hypernova-site/       ← project
├── content-farm/                 ← itself a pseudomonorepo
│   └── obsidian-plugins/
│       ├── perplexed/            ← project
│       ├── metafetch/            ← project
│       └── cite-wide/            ← project
└── tidyverse/                    ← itself a pseudomonorepo
```

When starting work anywhere in the tree, the [[Context Engineering|search-first discipline]] is: walk *up* the tree, scanning each level's `context-v/`, until you stop finding one. That tells you you've checked every relevant context scope.

## The Five-Phase Lifecycle

Work in a pseudomonorepo follows a canonical loop:

1. **Start** — write the spec/prompt/blueprint in `project/context-v/`
2. **Progress** — log shipped work in `project/changelog/`
3. **Reflect** — lift cross-cutting lessons to `parent/context-v/`
4. **Publish** — announce at the family level in `parent/changelog/`
5. **Market** — surface in a public [[Astro Knots]] site if it warrants outside attention

The loop is aspiration, not mandate. Small fixes might stop at Progress; significant patterns should run all five. Every skipped phase is a candidate for later refactor.

## Content Roll-Up

A mature pseudomonorepo doesn't only host its own context — its splash site or gallery *rolls up* the `changelog/` and `context-v/` entries from its submodules into one feed. A reader landing on `content-farm/`'s splash sees ship notes from `image-gin`, `cite-wide`, and every other plugin, not just from content-farm itself.

The preferred mechanism is the GitHub Content API at build time: for each submodule registered in `.gitmodules`, query `/contents/changelog/` and `/contents/context-v/` against the configured branch and merge results into the parent's content collections. Provenance metadata (`from: image-gin`) lets readers filter, and keeps the parent honest about what it actually authored.

## Branch Alignment

Pseudomonorepos and their submodules share a three-tier branch model: **`development` → `main` → `master`**. `development` is where most work lands; `main` is what `development` gets promoted to when it reaches something noteworthy; `master` is *stable*, updated only when the dust has settled.

Aspiration: when the parent is on a tier, every submodule is on the same tier. Reality: humans get lazy, `development` piles up, `main` sometimes becomes the de-facto working branch, and `master` is often the most stale branch in the repo. That's expected, not broken — but it means tooling at the parent level (e.g., a `switch-all-to-development-branch.sh` script) is worth the small upfront investment.

## The Hard-Stop Edge Case: Relocation

The riskiest operation in a pseudomonorepo tree is **moving a child from one parent to another** — e.g., promoting an experiment from `ai-labs/` to a permanent home in `astro-knots/`. Done wrong, it silently destroys unpushed branches, uncommitted work, gitignored secrets (`.env`, `.secrets`), and stashes. The relocation produces a fresh clone from the new path, and the old directory — along with everything not in git — disappears.

The discipline is to verify three preconditions before any relocation, each acknowledged separately (never bundled):

1. **Every local branch synced to remote** — no `[ahead]` branches, no local-only commits, clean working tree, no stashes
2. **Every remote branch known, every local-only branch explicitly documented as disposable**
3. **Every gitignored secret backed up** — and the var list reconstructed from `grep` against actual source code, not from a `.env.example` that lags behind

This is the kind of guardrail that only exists because the failure mode has already happened.

## Why Coin the Term

The pattern existed before the name. Calling it something — *pseudomonorepo* — does three things:

1. **Distinguishes it from `monorepo`** in conversations where people otherwise default to assuming shared tooling and atomic releases
2. **Names the parent layer** so we can talk about the parent's responsibilities (context, roll-up, branch alignment) without conflating them with the children
3. **Makes the pattern teachable** — a new collaborator can be pointed at "we're building a pseudomonorepo" and infer most of the architecture from the name alone

## See Also

- [[concepts/Explainers for AI/Context Engineering|Context Engineering]]
- [[Vocabulary/Monorepo|Monorepos]]
- [[Vocabulary/Git Submodules]]
- [[Astro Knots]]
