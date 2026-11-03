---
date_created: 2026-08-24
date_modified: 2026-08-24
title: Anarlog — The Open-Source Granola Alternative Once Called Hyprnote
slug: anarlog-open-source-granola-alternative-once-called-hyprnote
tags: [Speech-to-Text, Meeting-Notes, Local-First, Open-Source-Alternatives, Personal-AI, Model-Context-Protocol, macOS, Linux, Homebrew]
homepage: https://anarlog.so
github_repo_url: https://github.com/fastrepl/anarlog
brew_page: https://formulae.brew.sh/cask/anarlog
install: brew install --cask anarlog
---

https://anarlog.so

## Why This Matters

`Anarlog` is a meeting notepad that captures your mic and system audio on your own machine, with no bot in the call. The project pitches it as an open-source alternative to [[tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Vertical Wrappers/Granola|Granola]], and the shape is similar: you type rough notes during the meeting, and the summary draws on them as well as the transcript. The name is an anagram of "granola". The GitHub API showed 9,761 stars on November 3, 2026.

You may know it by an older name. It started as Hyprnote and became Char. A [May 3, 2026 founder's post](https://anarlog.so/blog/char-is-now-anarlog) then split the work in two: Anarlog is the meeting app, and Char is now a separate to-do product, which that post describes as a private alpha headed for paid SaaS. The app's macOS bundle ID is still `com.hyprnote.stable`, so old names will turn up in your Library folder.

The cask landed in Homebrew on August 24, 2026 at version 1.4.12. The details below reflect 1.4.34, checked November 3, 2026.

## What It Actually Does

- **Notepad.** Memos, generated summaries, and transcripts sit side by side, with chat over a meeting and customizable summaries.
- **Storage.** Notes and transcripts live in local SQLite, recordings are plain files, and Markdown export is built in. Audio retention runs from "Don't save" to "Forever".
- **On-device transcription.** Parakeet through Soniqo, Apple Speech on macOS 26, or a whisper.cpp model file you choose.
- **Your own AI.** Summaries and chat can use LM Studio, Ollama, Unsloth, your own API key, or an existing ChatGPT, Claude, Grok, Copilot, or Kimi subscription.
- **Automation.** It can start with a calendar event, remind you when another app is using the mic, and stop when the call ends. The docs warn that auto-stop can misfire and end a recording early.
- **Agents.** The `anarlog` executable bundles a CLI and a local MCP server. The docs say the local server opens no port and sends no meeting data to Anarlog's servers. Agent edits arrive as proposals that a person applies in the app.
- **Platforms.** The cask covers macOS 15 or later and Linux AppImages. Windows has its own installer. The project calls Windows and Linux beta, and macOS the most mature build.

## MIT, with a Commercial Corner

The license is real MIT for the community app, changed from GPLv3 in [April 2026](https://github.com/fastrepl/anarlog/commit/ab4063fdc). A homepage testimonial still praises "a GPL codebase", which is out of date. The repo is mixed, though. Everything under `enterprise/` is visible on GitHub but commercially licensed, and using it requires a written agreement with Fastrepl. The project's [licensing page](https://github.com/fastrepl/anarlog/blob/main/LICENSING.md) says the MIT layer must build without it.

The MIT license also doesn't mean every feature is free to use in the shipped app:

- **Free.** Unlimited on-device transcription, your own keys, exports, and the local API, CLI, and MCP.
- **Pro, $14 per person per month or $140 per year.** Cloud transcription and AI, sync, sharing, shared workspaces, and system-wide dictation.
- **Enterprise, custom pricing.** SSO, policy controls, and customer-hosted deployment.

Speaker labels need a closer look. The pricing page lists manual labeling as free and "better speaker identification" as Pro, while the docs describe on-device labels through Parakeet Batch. We can't tell you exactly where that line falls.

## Local Takes Some Setup

Anarlog's own wording is "local when you choose it", and that's the right way to read it. We haven't tested any of these claims.

- **Two settings.** Transcription and Intelligence are chosen separately, and making one local does nothing for the other.
- **Hardware.** Built-in on-device transcription requires supported Apple Silicon. Intel Macs and Linux need a local transcription server you run yourself, or a hosted provider, even though the cask installs on both.
- **Web search.** Chat's web search sends your query to a hosted endpoint, currently Exa, even when both models are local.
- **Analytics.** `telemetry_consent` defaults to true in the app's source. The privacy policy describes pseudonymous PostHog events, plus masked session replay on a small sample of desktop sessions, and says these are designed to exclude audio, transcripts, and notes. You can turn this off under Settings, Privacy. The docs say error reports have their own toggle, while the privacy policy says they stay on.
- **Readable copies.** Cloud Sync is end-to-end encrypted, according to the project. Shared notes and the opt-in Cloud API are not, because the server needs to read them.

## Recording Consent Is Still Yours

Nothing appears in the participant list, and the homepage adds that the app stays hidden while you share your screen. That makes it easy to record people who don't know about it. On macOS and Linux, a setting can post a disclosure in the meeting chat, but the docs note that this doesn't by itself confirm consent. The privacy policy leaves notice and consent to you, and the rules vary by location.

## Where It Fits in Our Workflow

We haven't run it. Like [[Biscotti - Meeting Transcripts That Stay on Your Mac|Biscotti]], it could produce the raw transcript that the `speech-to-text-upsert` template in our `decilehub-interface` skill starts from. Markdown export and a local MCP server suggest an easy route for that, which we'd want to confirm.

Biscotti looks like the simpler choice if you want local to be the only mode on an Apple Silicon Mac. Its license also restricts competing products, while Anarlog's MIT layer lets you fork and sell. [[OpenWhispr - Open-Source Dictation with Local or Cloud Models|OpenWhispr]] is also MIT, but it's built around dictation, which Anarlog puts behind Pro, and its README states no telemetry.

The open question is staying power. The founder's post says the team still ships updates, while its daily focus is on Char. The cask has had 22 version bumps since it landed, so the app is clearly active today. We'd want that to hold before putting years of call history in it, though local files and exports lower the risk.

## Install

```bash
brew install --cask anarlog
```

Open it and allow microphone and system audio access. The cask installs the desktop app. The docs add the CLI and MCP server from Settings, Developers, and they say a separate Homebrew channel for the CLI isn't available yet.

Source: <https://github.com/fastrepl/anarlog>
