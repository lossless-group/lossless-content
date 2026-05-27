---
date_created: 2026-05-25
date_modified: 2026-05-25
title: panache — Language Server, Formatter, and Linter for Markdown, Quarto, and R Markdown
slug: panache-markdown-quarto-rmarkdown-lsp
tags: [Developer-Tools, Markdown, Quarto, RMarkdown, LSP, Rust, Authoring]
homepage: https://panache.bz
github_repo_url: https://github.com/jolars/panache
brew_page: https://formulae.brew.sh/formula/panache
install: brew install panache
---

https://panache.bz

## Why This Matters

The Markdown tooling landscape has a quiet split: there are *good* tools for CommonMark + GFM (Prettier, markdownlint, remark), and then there is Pandoc-flavored Markdown — the one Quarto and R Markdown both build on — which adds fenced divs, grid tables, definition lists, citations, and inline footnotes. The CommonMark tools "work" on Pandoc files by silently flattening the extensions into prose. Then you save, and your fenced div is gone.

`panache` is a Rust-built LSP + formatter + linter that *understands* the Pandoc extensions directly. Version 2.48.0 just landed in Homebrew core. MIT license. The unification matters: one tool defines correctness across your editor (LSP), your pre-commit hook (CLI formatter), and your CI lint job.

## What It Actually Does

- **Multi-format coverage.** CommonMark, GFM, Pandoc-flavored Markdown, Quarto `.qmd`, R Markdown `.Rmd` — handled as first-class dialects, not lossy approximations.
- **Three modes from one binary.** Language server for live editor diagnostics + format-on-save; CLI formatter for pre-commit / CI; linter for style + correctness rules.
- **Pandoc extension fidelity.** Fenced divs, grid tables, citations (`@key`), inline footnotes, definition lists — none of them get flattened.
- **Configurable.** Per-project config tunes wrapping, flavor, which extensions are active, and linting rules.
- **Pluggable code-block formatters.** Embedded code blocks (R chunks, Python chunks, SQL) can be routed to external formatters — `styler`, `black`, `sqlfluff`. The LSP becomes the orchestrator rather than reinventing every language's formatter.
- **Speed.** Rust + LSP architecture, intended for keystroke-latency diagnostics on multi-thousand-line documents.

## Where It Fits in Our Workflow

This one is squarely on-target for the Lossless tree. We author in Markdown *constantly* — `content/`, every `context-v/` directory, every `changelog/` entry, every splash page body. We also use Quarto under `tidyverse/` for R-flavored data work. The current state-of-the-art is "Prettier for the easy stuff, hand-care for everything Pandoc-y." `panache` collapses that into one tool.

Two specific intersections:

1. **[[lossless-flavored-markdown]] (LFM).** LFM normalizes directives across CommonMark, GFM, Obsidian callouts, and `remark-directive`. `panache` is the *upstream-formatter* tier — it keeps the source file well-formed before LFM's renderer ever sees it. They are complementary, not competing.

2. **[[context-vigilance]] frontmatter discipline.** Every `context-v/` file has YAML frontmatter with a strict shape. A linter that *actually understands* the wider document — not just the prose body — is what we have been missing for pre-commit-time validation of those files.

Compare against Prettier (the de-facto default) — Prettier is great at CommonMark/GFM and quietly wrong at Pandoc/Quarto. If your content is ever rendered through Quarto, Pandoc, or R Markdown, `panache` is the right choice.

## Install

```bash
brew install panache
panache format path/to/file.qmd
panache lint  path/to/file.md
# LSP: wire `panache lsp` into your editor's language-server config.
```

Source: <https://panache.bz>
