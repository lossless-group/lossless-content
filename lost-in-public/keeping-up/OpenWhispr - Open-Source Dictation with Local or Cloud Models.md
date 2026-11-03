---
date_created: 2026-07-23
date_modified: 2026-07-23
title: OpenWhispr — Open-Source Dictation with Local or Cloud Models
slug: openwhispr-open-source-dictation-local-or-cloud-models
tags: [Speech-to-Text, Local-First, Open-Source-Alternatives, Personal-AI, Model-Context-Protocol, macOS, Homebrew]
homepage: https://openwhispr.com
github_repo_url: https://github.com/OpenWhispr/openwhispr
brew_page: https://formulae.brew.sh/cask/openwhispr
install: brew install --cask openwhispr
---

https://openwhispr.com

## Why This Matters

[[Tooling/AI-Toolkit/Knowledge AI/OpenWhispr|OpenWhispr]] pitches itself as the open-source, free alternative to Wispr Flow and [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Vertical Wrappers/Granola|Granola]]: press a hotkey, speak, and your words appear at the cursor. It has over 10,000 GitHub stars, which makes it one of the more established projects in this batch.

It covers two categories people usually pay separately for, dictation and meeting notes, under an MIT license. On-device speaker labelling and voice fingerprinting are also part of the package.

The cask landed in Homebrew on July 23, 2026 at version 1.7.6. It's community-maintained, not published by the project. The details below reflect 1.11.0, checked November 3, 2026.

## Private Is a Setting, Not a Guarantee

OpenWhispr is privacy-first by option. Transcription, AI reasoning, speaker diarization, and semantic search can each run locally, and in that mode your audio stays on your device. The README also states no data collection and no telemetry.

But the same app offers cloud models, cloud note sync, web sharing, and team spaces. If local-only is the reason you're installing it, set that deliberately and check each feature, rather than assuming the default is what you want. That's a real difference from something like [[Homebrew Roundup - 2026-06-21|TypeWhisper]], which markets itself as 100% on-device.

## What It Actually Does

- **Dictation.** A global hotkey types into any app, with a separate hotkey for dictating in one language and pasting in another.
- **Voice assistant.** A hotkey sends speech straight to GPT-5, Claude, Gemini, Groq, OpenRouter, or local models. Highlighted text is edited in place, and sending a screenshot is opt-in.
- **Meetings.** Detects Zoom, Teams, and FaceTime calls, with live diarization, voice fingerprinting, and calendar integration.
- **Notes.** Folders, semantic search, and AI actions.
- **Audio import.** Transcribes dragged-in files, batches, or a pasted YouTube or audio URL.
- **Local models.** Whisper, NVIDIA Parakeet, Cohere Transcribe, and others, with GPU acceleration on Metal, CUDA, and Vulkan.
- **Integrations.** A public API and an MCP server for notes and transcriptions.

## Where It Fits in Our Workflow

The MCP server is the reason it's more than another dictation app for us. Meeting transcripts that an agent can query would be a natural extra source alongside our local corpus, as long as they stay local. We haven't tried that connection yet.

The Mac and Linux coverage also suits how we work, as local dictation tools are often Mac-only. One thing to weigh is that recording voice fingerprints and meetings brings consent questions, even on-device, so be clear with people on your calls.

## Install

```bash
brew install --cask openwhispr
```

Source: <https://github.com/OpenWhispr/openwhispr>
