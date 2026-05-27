---
date_created: 2026-05-25
date_modified: 2026-05-25
title: Tuna — A Modern Native macOS Application Launcher
slug: tuna-application-launcher
tags: [macOS, Launcher, Productivity, Swift, Quicksilver]
homepage: https://tunaformac.com/
brew_page: https://formulae.brew.sh/cask/tuna
install: brew install --cask tuna
---

https://tunaformac.com/

## Why This Matters

The macOS launcher category — Spotlight, Alfred, Raycast, LaunchBar, Quicksilver — has had remarkably little turnover. Alfred is decade-plus. Raycast won the last cycle by adding a plugin store and a subscription pricing model. Quicksilver, the OG, is still around as a beloved-but-stagnant freebie. Net result: if you want a modern, native, *one-time-purchase* launcher in 2026, the field is thin.

`Tuna` is a recent entry built entirely in native Swift, drawing explicit inspiration from Quicksilver. Version 0.73 (build 1425) just hit Homebrew cask. macOS 15+. Free tier with usage limits; $49 one-time unlock for Pro.

## What It Actually Does

The headline feature is **modal interaction** — Tuna ships with four distinct interaction modes layered on the same launcher:

- **Fuzzy Mode** — the standard "type a few characters, get matches" pattern Alfred and Raycast popularized.
- **Combo Mode** — chain operations together (the "verb on noun" composition that made Quicksilver famous: pick a file → pick "compress" → pick a destination, all without a mouse).
- **Text Mode** — for text-first inputs and snippet-style expansions.
- **Talk Mode** — voice input as a first-class launcher modality.

Plus: native Swift (i.e., not Electron, not a webview-with-extras), extension architecture in the works (third-party extensions coming), and a freemium/one-time-purchase model rather than subscription.

## Where It Fits in Our Workflow

The category is contested but the pricing model is the actual differentiator. Raycast's subscription has gradually moved its most interesting features behind the paywall; Alfred is still one-time-purchase but feels frozen. Tuna's bet is "modern + native + own-it-once."

For our context:

1. **Quicksilver-style verb-on-noun composition** is the right mental model for working across a [[pseudomonorepos]] tree — "open this child repo in Finder," "show this changelog in Marked," "encode this path and ship it to clipboard." Raycast can do these but slowly accreted the muscle; Tuna is starting from that primitive.

2. **Talk Mode** is the wildcard. Most launchers have a voice afterthought; building it in as one of four primary modes is a different bet. Worth a real test against the "narrate a multi-step file operation while looking at a different window" use case.

Caveats: 0.73 means *young*. The "extensions coming soon" pitch means today the ecosystem is empty — if you depend on Raycast's plugin library, Tuna will feel sparse. macOS 15 floor cuts out anyone on older OS.

Compare against [Raycast](https://raycast.com) (huge plugin library, subscription), [Alfred](https://alfredapp.com) (stable, one-time, plugin ecosystem aging), and [LaunchBar](https://obdev.at/products/launchbar/) (also Quicksilver-descended, one-time, mature). Tuna's positioning is "Raycast's polish, Alfred's pricing model, Quicksilver's verb-on-noun soul."

## Install

```bash
brew install --cask tuna
```

Free tier with usage limits; $49 one-time for Pro.

Source: <https://tunaformac.com/>
