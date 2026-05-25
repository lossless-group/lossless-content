---
date_created: 2026-05-13
date_modified: 2026-05-13
title: Presentify — Annotate, Highlight, and Zoom on macOS
slug: presentify-screen-annotation-macos
tags: [macOS, Presentations, Screen-Recording, Demos, Content-Creation]
homepage: https://presentifyapp.com/
install: brew install --cask presentify
---

https://presentifyapp.com/

## Why This Matters

A native macOS menubar app for the demo-and-screen-sharing motion: draw on top of any window, highlight the cursor with a customizable halo, spotlight a region while dimming the rest, zoom into small details. Works app-agnostically — Zoom, Meet, Keynote, PowerPoint, OBS, anything.

One-time purchase (not subscription — increasingly rare). Available through Mac App Store, Setapp, or direct download. Version 8.0.6 just hit Homebrew cask. macOS 13+.

## What It Actually Does

- **Live annotation** over any on-screen content — pens, highlighters, text, shapes. Persists until cleared.
- **Cursor highlight halo** — adjustable color, shape (rings, squircles), and click animations. The "demo cursor" problem solved.
- **Spotlight** — dims everything except a follow-the-cursor circle. Good for "look here, ignore the rest."
- **Zoom** — magnify a region for small text or fine UI details during recording or live presentation.
- **Digital whiteboard** — separate scratch surface for sketching diagrams that don't belong on the underlying app.
- **Tiny footprint** — 1MB download, ~25MB memory, claims zero reported crashes.

## Where It Fits in Our Workflow

Directly relevant to the deck-iteration and fundraise-deck work we do under the `deck-iteration-workflow` skill. Several of our slide decks include software demos and screen-share segments where the audience needs to follow the cursor or focus on a specific region of a UI.

It's also the right tool for **`/up-and-running` content** in this very directory — those guides routinely benefit from screenshots with annotation, and Presentify is faster than dropping every image into a separate annotation tool. The spotlight + zoom combo in particular means we can produce demo videos without the post-production zoom step in DaVinci or Final Cut.

Worth comparing against [CleanShot X](https://cleanshot.com) (which we may already own) — CleanShot is screenshot-first with annotation as a feature; Presentify is **live overlay** first. They overlap but don't replace each other.

## Install

```bash
brew install --cask presentify
```

If you already have it via Setapp or Mac App Store, the cask install will likely conflict — check existing installs first.
