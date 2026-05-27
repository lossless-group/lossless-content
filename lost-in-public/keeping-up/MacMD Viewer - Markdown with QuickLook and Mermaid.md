---
date_created: 2026-05-25
date_modified: 2026-05-25
title: MacMD Viewer — Markdown with QuickLook and Mermaid Support
slug: macmd-viewer-markdown-quicklook-mermaid
tags: [macOS, Markdown, Mermaid, QuickLook, AI-Output, Reading]
homepage: https://macmdviewer.com/
brew_page: https://formulae.brew.sh/cask/macmd-viewer
install: brew install --cask macmd-viewer
---

https://macmdviewer.com/

## Why This Matters

Selecting a `.md` file in Finder and hitting space gives you, by default, raw text — backslashes, asterisks, code-fence backticks, the whole syntax mess. This was fine when Markdown files came from humans and looked like prose. Now most Markdown that crosses your filesystem is *AI-generated*: long Claude / ChatGPT outputs saved as `.md`, design specs with embedded Mermaid diagrams, READMEs from agent runs. Raw-text QuickLook is no longer the right default.

`MacMD Viewer` is a native macOS app whose entire pitch is "QuickLook for Markdown files, rendered, with Mermaid." Version 1.2.1 just hit Homebrew cask. macOS 14+. $19.99 single license, $39.99 family pack — paid, but one-time.

## What It Actually Does

- **QuickLook integration.** Spacebar on any `.md` in Finder renders it as formatted output, no app-open needed. This is the killer feature.
- **Mermaid rendering inline.** Flowcharts, sequence diagrams, Gantt charts — rendered, not displayed as a fenced code block of source.
- **Syntax highlighting** across 190+ languages for fenced code blocks; theme-aware coloring.
- **Live reload.** ~50ms refresh when the file is edited in another app — useful as a side-by-side preview against any editor.
- **Pinch-zoom.** Diagrams, tables, code blocks zoom for accessibility / projection.
- **Dark / Light mode.** Follows system appearance.

## Where It Fits in Our Workflow

The Lossless tree generates Markdown the way other shops generate logs. Every `context-v/` file, every `changelog/` entry, every Claude Code session transcript is `.md`. Mermaid is the diagram-of-choice for `context-v/specs/` documents. The current ritual for "preview this AI output" is: open VS Code → install a Markdown preview extension → trust its Mermaid renderer (which often lags upstream). MacMD Viewer collapses that to *select-file → spacebar*.

Two specific intersections:

1. **`changelog/` and `context-v/` Mermaid blocks.** These already exist throughout the tree and currently render only in the splash pages (after [[maintain-splash-pages]] build). MacMD Viewer makes them legible at filesystem-browse time, before any build.

2. **AI-generated `.md` outputs.** Claude Code regularly emits long Markdown reports — research summaries, spec drafts, agent-trace digests. Reading them in raw form is friction; opening every one in a real editor is overkill. Spacebar-to-render is exactly right.

Compare against [Marked 2](https://marked2app.com) (the established paid choice, Markdown-focused editor-companion) and [Glance](https://github.com/samuelmeuli/glance) (free, QuickLook-only, no Mermaid). MacMD Viewer's specific bet is "Mermaid + QuickLook + AI-friendly defaults" — a niche the existing options leave open.

## Install

```bash
brew install --cask macmd-viewer
```

Free trial in-app, then $19.99 one-time.

Source: <https://macmdviewer.com/>
