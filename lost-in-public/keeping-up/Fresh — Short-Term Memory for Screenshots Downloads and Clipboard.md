---
date_created: 2026-05-14
date_modified: 2026-05-14
title: Fresh — Short-Term Memory for Screenshots, Downloads, and Clipboard
slug: fresh-general-software-temp-file-manager
tags: [macOS, Productivity, File-Management, Clipboard]
homepage: https://general.software/fresh/
install: brew install --cask general-software-fresh
---

https://general.software/fresh/

## Why This Matters

The pitch: "a calm second brain for everything temporary." Screenshots that pile up on the desktop, downloads that accumulate in `~/Downloads`, the clipboard contents that vanish the moment you copy the next thing, files dragged to the desktop that are gone three days later because you forgot they were there. Fresh treats all of these as one unified short-term-memory layer with a Spotlight-style picker.

Free forever, no account, native macOS, 14+ required. Version 1.0.5 just hit Homebrew cask.

## What It Actually Does

Three surfaces, one model:

- **The Panel** — `⌘⌥Space` opens a Spotlight-style window over recently captured items: screenshots, downloads, clipboard history, fresh desktop drops. Filter, preview, open.
- **Pocket** — a menubar drop zone. Drag a file, screenshot, link, or snippet to it to park between apps without polluting the desktop.
- **Auto-cleanup suggestions** — background monitor on Desktop, Downloads, Screenshots, Clipboard. **Never deletes without your nod** — surfaces cleanup candidates, you approve.

## Pricing & Privacy

- **Free, forever.** No pro tier, no nag screens, no upsell. (Worth noting because that's an unusual stance for a polished native macOS utility — the "General Software" team seems to be using Fresh as a flagship rather than a revenue product.)
- **Privacy model is implicit, not explicit.** The site doesn't loudly say "local-only" but the architecture (tiny native app, no account, no sync mention) strongly implies it. Worth a follow-up read of their privacy page before trusting it with sensitive clipboard contents — passwords, API keys, secrets pasted from `~/.secrets`.

## Where It Fits in Our Workflow

The clipboard history piece is the most interesting one for the Lossless tree. We routinely paste API keys, env-var blocks, and short-lived auth tokens during pseudomonorepo work — and we already have a `~/.secrets` discipline because the `CLAUDE.md` relocation rule treats clipboard-as-leak-vector implicitly.

A local clipboard history with **explicit-confirm deletion** is friendlier than the macOS default (one item, gone), but it's *also* a new place where a copied secret persists. Treat the clipboard buffer in Fresh the same way you'd treat a `.env` file — assume it's recoverable, and don't paste anything into Pocket you wouldn't want sitting on disk for a week.

## Install

```bash
brew install --cask general-software-fresh
```

(Note: the cask is named `general-software-fresh` to disambiguate from an unrelated `fresh` formula that's about shell config management.)
