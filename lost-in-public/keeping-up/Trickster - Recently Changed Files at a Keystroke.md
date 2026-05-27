---
date_created: 2026-05-25
date_modified: 2026-05-25
title: Trickster — Recently Changed Files at a Keystroke
slug: trickster-recent-files-macos
tags: [macOS, Productivity, File-Management, Keyboard-Driven]
homepage: https://www.apparentsoft.com/trickster
brew_page: https://formulae.brew.sh/cask/trickster
install: brew install --cask trickster
---

https://www.apparentsoft.com/trickster

## Why This Matters

The Finder's "Recent" view exists, sort of, but it's slow, lives behind a sidebar click, and conflates "files you used in apps" with "files that changed on disk." If you work across a tree like `lossless-monorepo/` — where 27 child repos and a half-dozen content directories are all churning — the question that actually matters is *"what changed in the last hour, across everywhere?"* and Finder is bad at answering it.

`Trickster` is a small menubar app that has been quietly doing exactly this for years. It surfaces recently modified files across the filesystem, accessible via a keyboard shortcut, with filtering by app, by location, by file type. Version 3.9.11 just hit Homebrew cask. macOS 12+.

## What It Actually Does

- **Recent-files popover** triggered by a global hotkey. Files appear sorted by modification time across all locations you care about (configurable scopes).
- **Filter by source app.** "Show me what Figma touched today" vs. "what `make` produced in the last 10 minutes."
- **Filter by file type / location.** Per-folder watchlists; per-extension filters.
- **Pin frequently used items.** Stable shortcuts at the top of the popover.
- **Hide noise.** Exclude paths, exclude file types, exclude apps that spew temp files.
- **Drag-out support.** Drag from the popover directly into email, Slack, an upload field.

## Where It Fits in Our Workflow

Two natural uses across the Lossless tree:

1. **"What did I just change" recovery.** Working across `ai-labs/`, `content/`, `astro-knots/sites/*` simultaneously, it's not uncommon to lose track of *where* a small edit landed. Trickster's chronological view across configured roots is a faster answer than `find . -mmin -60` plus mental filtering.

2. **Pre-commit triage.** Before a [[git-conventions]]-style commit, Trickster's "all recently modified files in this tree" view is a useful sanity check against `git status` — particularly for catching untracked files in submodules that `git status` shows ambiguously.

Caveats: this is mature, niche software (3.x for years, modest install base) — the upside of which is "stable, predictable, no surprises"; the downside is the UI is unmistakably from an earlier era of macOS design. The functionality, however, is exactly the functionality. It is not trying to be a launcher (see [[tuna-application-launcher]] this cycle for that). It is trying to be a chronological file index, and it is.

Compare against `fzf` over `find -mmin` (free, terminal-only) and Raycast's "Quicklinks / Recent Files" extension (subscription, GUI-launcher-centric). Trickster is the focused-tool answer.

## Install

```bash
brew install --cask trickster
```

Free trial in-app, paid thereafter.

Source: <https://www.apparentsoft.com/trickster>
