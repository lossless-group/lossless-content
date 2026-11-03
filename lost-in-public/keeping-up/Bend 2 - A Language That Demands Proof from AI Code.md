---
date_created: 2026-09-17
date_modified: 2026-09-17
title: Bend 2 — A Language That Demands Proof from AI Code
slug: bend-2-a-language-that-demands-proof-from-ai-code
tags: [Programming-Languages, AI-Agents, Formal-Verification, Type-Systems, Developer-Tools, Homebrew]
homepage: https://bend-lang.com
github_repo_url: https://github.com/bendlang/bend
brew_page: https://formulae.brew.sh/formula/bend
install: brew install bend
---

https://bend-lang.com

## Why This Matters

How do you trust code you won't read? In Bend 2, you declare rules in a `LAWS.bend` file, and the AI has to supply a `PROOF.bend` that the type checker accepts. The project calls this "`AGENTS.md` backed by proof."

Victor Taelin announced Bend 2 on September 17, 2026, and the formula merged into Homebrew on September 19 at 2.0.10. It was at 2.0.39 on November 3. It's Apache-2.0 and depends on Bun. The repo shows about 24,700 stars, but it dates to 2023. Many of those stars likely came from the original Bend, which [hit Hacker News in 2024](https://news.ycombinator.com/item?id=40390287). Bend 2 is effectively a different language, so the count says little about it.

We haven't run it. Claims below are the project's unless attributed.

## The Claims

The README opens with "In the post-AGI economy, humans will eventually stop writing and reading code," then claims:

- **Runtime.** "As fast as hand-written C" on one core. The site's own game-of-life figures are softer: 7.80s against C's 6.78s, which it describes as "nearly as fast," then 0.06s on an Apple M4 Max GPU.
- **Checking.** The target is to "outperform every proof assistant by several OOMs." The site shows 0.38s against Lean's 19.2s.
- **Safety.** Merging a bug is "mathematically impossible."

## What Independent Readers Found

**The checker benchmark compares different work.** A [gist by Nezk](https://gist.github.com/Nezk/dda0511c492cf9bd673885f0341dca0e) argues that Lean, Agda and Rocq spend their time on elaboration and unification, which Bend doesn't do because everything must be written explicitly. Its speed, the gist says, largely reflects that missing work.

**The proofs can be long.** [Liam Powell](https://blog.liampwll.com/posts/bend_vibe_coding/) counted 442 lines to prove simple properties, against SPARK's automated proving, and argued Bend is decades behind the state of the art. [Hacker News commenters](https://news.ycombinator.com/item?id=49753179) pushed back that SMT-style automation has scaling limits of its own.

**A real port shows both sides.** [Fabio Akita](https://akitaonrails.com/en/2026/09/19/new-ai-language-just-released-bend-2/) had agents port two Rust tools at launch. He got much smaller binaries and checks of about 0.1s, but needed 93 lines of laws and proofs for two facts about a 30-line guard, because the standard library has almost no lemmas. He says proofs stop at the C boundary, and he flags a foundation (`Type : Type`, no positivity check) that a mathematician wouldn't accept. We haven't assessed that, but it matters for a tool sold on proof.

**The compiler itself is young.** Per [gihyo](https://gihyo.jp/article/2026/09/bend-2), Taelin said the proof-checking kernel received detailed human audits while unaudited AI-generated code remains in the compiler. Akita reports the figure as 99% AI-written. Our inference: a proof can hold while the program is miscompiled. The project says "expect bugs."

**This has a history.** In 2024, one [Hacker News commenter](https://news.ycombinator.com/item?id=40390287) praised Taelin's work while citing "a history of making fantastical claims." Bend 2's better numbers still need reproducing.

## The Harder Problem

A proof only covers what the law says. In the [launch thread](https://news.ycombinator.com/item?id=49746163), one commenter ran the demo and found movement had become diagonal: the AI kept "you can't win" by changing the game. Another reported that agents tend to edit the law to fit the new feature. The README's first step has your AI write the laws, so a person still has to read them. A short law is easier to review than the code it governs, which is real progress, but not a guarantee.

## Compared With BAML

[[BAML - From Prompt Language to a Programming Language for Agents|BAML]] starts from the same premise, but asks for much less.

| | BAML | Bend 2 |
|---|---|---|
| **Enforces** | Types, no `any`, typed errors | Arbitrary laws, by proof |
| **Flaky behavior** | Grades AI functions over many runs | Not its focus |
| **Existing code** | Bridges into TypeScript and others | Emits a whole program, per Akita |

## Where It Fits in Our Workflow

It doesn't, for now. Our [[Astro 6 is Released|Astro]] sites and TypeScript services have no obvious proven core, and Akita's niche of AI-written verified cores sounds right. The idea can travel without the language, though: a short list of invariants, such as `augment-it`'s client-tagging rules, checked mechanically on every agent edit.

Source: <https://github.com/bendlang/bend>
