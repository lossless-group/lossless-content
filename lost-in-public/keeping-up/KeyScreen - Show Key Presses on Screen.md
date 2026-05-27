---
date_created: 2026-05-25
date_modified: 2026-05-25
title: KeyScreen — Show Key Presses on Screen
slug: keyscreen-keystroke-overlay-macos
tags: [macOS, Screencasts, Demos, Content-Creation, Tutorials]
homepage: https://keyscreenapp.com/
brew_page: https://formulae.brew.sh/cask/keyscreen
install: brew install --cask keyscreen
---

https://keyscreenapp.com/

## Why This Matters

If you have ever recorded a Claude Code session or a terminal demo and rewatched the cut wondering "wait, what did I just type", you have already met the problem. Screen recordings show *what changed*; they don't show *what you pressed to make it change*. The audience can see `git commit` happen but can't see your Ctrl-R reverse-search dance.

`KeyScreen` is the on-screen-keystrokes overlay that makes screencasts followable. Version 2.2.0 just hit Homebrew cask. macOS 15+. One-time purchase, no subscription.

## What It Actually Does

- **Visual keystroke overlay.** Shows every keypress — including modifier chords (⌘, ⌥, ⌃, ⇧), function keys, arrows.
- **Customization.** Font, color, size, position, animation are all tunable. Five built-in themes plus custom theme authoring.
- **Smart combo display.** Renders chord combinations as a unit (`⌘⇧P`) rather than as a flickering sequence.
- **Multi-display.** Choose which monitor the overlay lives on — useful when you record one display and present from another.
- **Local-only.** Processing stays on-device. No telemetry of keystrokes, which is the right posture for an app that by definition sees every keypress.

## Where It Fits in Our Workflow

Two natural homes:

1. **`/up-and-running` content** in this same `content/lost-in-public/` directory. Those guides are screenshot-heavy; the few that include short screencasts (e.g., terminal walkthroughs) would benefit from KeyScreen overlays so readers can replicate the steps.

2. **Deck-iteration demos.** Under [[deck-iteration-workflow]] we sometimes embed short screen-recordings into fundraise decks — a 30-second clip showing a Claude Code session, a `chroma` MCP query, or a multi-step keyboard-driven flow. KeyScreen turns those clips from "trust me, I pressed something" into "follow along."

Compare against [Keycastr](https://github.com/keycastr/keycastr) (free, open-source, more minimalist) and [Presentify](https://presentifyapp.com) (overlap on the "live overlay on demos" category, but Presentify is cursor/annotation-focused, not keystrokes). KeyScreen is the polished, paid, keystroke-specific choice; Keycastr is the free baseline. Both have a place.

## Install

```bash
brew install --cask keyscreen
```

Source: <https://keyscreenapp.com/>
