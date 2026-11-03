---
date_created: 2026-07-26
date_modified: 2026-07-26
title: BAML — From Prompt Language to a Programming Language for Agents
slug: baml-programming-language-for-agents
tags: [Programming-Languages, AI-Agents, Developer-Tools, Type-Systems, Structured-Outputs, Rust, Homebrew]
homepage: https://boundaryml.com
github_repo_url: https://github.com/BoundaryML/baml
brew_page: https://formulae.brew.sh/formula/baml
install: brew install baml
---

https://boundaryml.com

## Why This Matters

If you last looked at BAML ("Basically A Made-up Language") as a way to get typed output from LLM calls, look again. Boundary now pitches it as a general-purpose language designed around the idea that agents write most of the code, and that a language should make their mistakes hard to express.

The thesis is worth taking seriously even if you never adopt BAML: every invariant a language can't enforce is one an agent will eventually violate. So there's no `any` and no unchecked cast, errors are typed, and invalid states shouldn't compile. A model can't quietly cast its way out of a type error as it can with TypeScript's `as`.

The `baml` formula landed in Homebrew core on July 26, 2026 at version 0.2.2. The repo itself dates to 2023 and has about 9,500 GitHub stars. Apache-2.0, with the toolchain written in Rust. As of November 3, 2026, the Homebrew formula is at 0.2.5, and that number tracks the `baml-wrapper` release rather than the language, whose separate releases were at 0.23.x. The site says BAML 1.0 "will be GA soon" and that a live onboarding runs weekly, so treat this as pre-1.0.

## What It Actually Does

- **Familiar syntax.** Reads like TypeScript, with unions, generics, lambdas, and pattern matching.
- **AI functions.** A model call is a typed function. Schema-aligned parsing repairs malformed model output against your types.
- **Concurrency.** Go-style green threads with no sync and async function split: `spawn` runs any call, and `await` joins it.
- **Tracing.** Every function is traced locally, and agents can read those traces.
- **Testing.** A built-in framework that can generate cases from data or production traces, and grade flaky AI functions over many runs.
- **Agent tooling.** `baml describe` for agents alongside an LSP for humans, plus `baml agent install` to wire up a skill.
- **Incremental adoption.** Bridges let existing Python, TypeScript, Go, Rust, Java, Kotlin, C#, C++, and Swift code call BAML functions. Boundary's own advice is not to rewrite your codebase.

## Read the Claims Carefully

The site is confident and funny, and some of it is more marketing than measurement. It claims 6x faster tracing than OpenTelemetry in Rust and 200x in Python, and we haven't verified those numbers. It also has no package ecosystem yet, and jokes that "no packages means no supply chain attacks." That's a real limitation presented as a feature, though the team says it's rethinking package management and has shipped a thorough standard library.

The business model is open language plus paid Boundary Web Services, starting with observability. That's a common and reasonable structure, but worth knowing.

## Where It Fits in Our Workflow

We wouldn't write a site in this. Our [[Astro 6 is Released|Astro]] and TypeScript stack has no reason to move, and BAML's bridge list doesn't target plain JavaScript by design ("Never JavaScript").

Where it could earn a trial is the bounded, LLM-heavy logic in projects like augment-it: typed extraction and classification functions with graded evaluations, called from TypeScript over the bridge. That's the same problem we solve today with hand-written schemas, as covered in [[Zod 4 - A Faster Rewrite and a Long List of Breaking Changes|Zod 4]], with evals included. We haven't tested it, and we'd wait for 1.0 before depending on it.

The bigger question it raises is whether a new language can win when models were trained on the old ones. Boundary says it measures how agents write BAML. That experiment is the part most worth following.

## Install

```bash
brew install baml
baml init
baml agent install
baml run main
```

Source: <https://github.com/BoundaryML/baml>
