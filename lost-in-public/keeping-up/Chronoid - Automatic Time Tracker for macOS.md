---
date_created: 2026-05-25
date_modified: 2026-05-25
title: Chronoid — Automatic Time Tracker for macOS
slug: chronoid-automatic-time-tracker
tags: [macOS, Productivity, Time-Tracking, Freelance, Privacy]
homepage: https://chronoid.app/
brew_page: https://formulae.brew.sh/cask/chronoid
install: brew install --cask chronoid
---

https://chronoid.app/

## Why This Matters

The two failure modes of every time tracker: *manual* ones (Toggl, Harvest) demand you remember to start and stop a timer — you don't, so the data is fiction. *Automatic* ones (RescueTime, Timing) capture everything but ship it to a cloud you don't control — which is fine for personal analytics, less fine for client work that's under NDA.

`Chronoid` is the latter shape (automatic, no-timer-needed) with the privacy posture of the former. 100% local storage by default, optional cloud sync only if you opt in. One-time purchase from $49, no subscription. Version 1.0.84 just hit Homebrew cask. macOS 14+.

## What It Actually Does

- **Background activity capture.** Monitors active app, document title, and URL across hundreds of apps — VS Code, Figma, Chrome, Slack, Terminal, etc.
- **Project attribution.** Maps activity → client/project based on rules (this Figma file = Client A, anything in `/Users/me/code/lossless-monorepo` = our work).
- **Idle detection.** Knows when you stepped away, so the timesheet stops counting.
- **AI Chat over your time data.** Natural-language queries — "how many hours on Client B this month", "what did I spend Tuesday afternoon on?" — answered locally over your own data.
- **Visual analytics.** Breakdowns by client, project, app, time-of-day.
- **Focus tooling.** Built-in Pomodoro + website blocker, for the times you *want* to constrain rather than just measure.
- **Apple-Silicon-native.** Lightweight footprint, idle-aware so it's not running hot when you're not.

## Where It Fits in Our Workflow

Directly relevant to the small-team consulting + portfolio-company-advisory motion. Across the Lossless tree, work spans many client repos, many GitHub orgs, many "is this billable, and to whom" judgment calls. A passive recorder that lets you reconstruct *what you actually did* on a given day — without performing the timesheet ritual — is the right shape.

The AI-chat-over-local-data angle is genuinely interesting. Most "AI time tracking" tools ship your activity to a hosted LLM. Chronoid's pitch is the opposite — your activity stays local and the model queries it locally. Worth a sanity check on actually verifying that claim (Little Snitch + ProcMon during a session), but if it holds, this is the privacy posture our [[crawl-fetch-ingest]] and `~/.secrets` discipline expect from a tool touching this much workflow context.

Compare against [Timing](https://timingapp.com) (subscription, cloud) and [RescueTime](https://rescuetime.com) (cloud-first). Chronoid's local-by-default + one-time-purchase positioning is the differentiator.

## Install

```bash
brew install --cask chronoid
```

Free trial in-app, then $49+ one-time per license.

Source: <https://chronoid.app/>
