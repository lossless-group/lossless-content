---
date_created: 2026-10-15
date_modified: 2026-10-15
title: Biscotti — Meeting Transcripts That Stay on Your Mac
slug: biscotti-meeting-transcripts-stay-on-your-mac
tags: [Speech-to-Text, Meeting-Notes, Local-First, Source-Available, Personal-AI, Model-Context-Protocol, macOS, Homebrew]
homepage: https://biscottiapp.com
github_repo_url: https://github.com/scosman/Biscotti
brew_page: https://formulae.brew.sh/cask/biscotti
install: brew install --cask biscotti
---

https://biscottiapp.com

## Why This Matters

Most AI meeting notes follow one of two patterns: a bot joins the call, or your audio goes to someone's cloud. `Biscotti` claims neither. It records your mic and your Mac's system audio from any meeting app, then transcribes, labels speakers, and summarizes on the device, with no account or subscription. It's a native Swift app by Steve Cosman, an ex-Apple engineer by his own description.

The cask landed in Homebrew on October 15, 2026 at version 0.3.0, and was soon bumped to 1.0.0, which had already shipped upstream on October 8. The details below reflect 1.0.0, checked November 3, 2026. A 1.1.0 pre-release also exists on GitHub.

## What It Actually Does

- **Local models.** Whisper V3 Turbo through WhisperKit, Pyannote through SpeakerKit, and Google's Gemma 4 on llama.cpp, per the project's FAQ.
- **Speaker names.** It matches voiceprints against your past labeled meetings, and weighs clues like "Hi, I'm Steve" and calendar data.
- **Works beyond calls.** Zoom, Teams, Meet, FaceTime, Slack, and in-person conversations through the microphone.
- **Calendar and auto-stop.** It offers to record upcoming meetings and stops when the call ends. Nothing records until you click, per the project.
- **MCP.** You can chat with your notes in apps like Claude Desktop or LM Studio.
- **Requirements.** Apple Silicon, macOS 15 or later, and 16GB of RAM recommended.

"Your audio never leaves your Mac" is the vendor's claim, and we haven't tested it. Connect MCP to a cloud-hosted chat app, and what the model reads goes to that provider.

## Source-Available, Not Open Source

The code is on GitHub, and the project itself correctly says "source available." The license is PolyForm Perimeter 1.0.1. It lets you use, change, and redistribute the software for any purpose except providing others a product that competes with it. Marketing something as a substitute counts, and so does offering it free or on another platform. Because of that field-of-use restriction, it isn't open source under the usual definition.

For someone recording their own meetings, this likely changes nothing. It matters if you'd want to fork it into a notetaking product, even a free one. For an MIT alternative, see [[OpenWhispr - Open-Source Dictation with Local or Cloud Models|OpenWhispr]].

## Recording Consent Is Still Yours

Local processing solves custody, not consent. Biscotti's own FAQ says "nothing appears in the call and other participants aren't notified."

Laws differ by place, and some jurisdictions require everyone's consent to record. Saved voiceprints may raise separate questions under biometric privacy rules, and in-person capture can make this worse, since no meeting app is involved. Tell people you're recording, and check what applies to you and to any confidentiality terms you've signed. This isn't legal advice.

## Where It Fits in Our Workflow

We haven't run it. The interesting connection is the `speech-to-text-upsert` template in our `decilehub-interface` skill, which turns a pasted call transcript into updates to Decile Hub records, using a `[call-transcript:<date>]` marker to prevent double-logging. It starts from a raw transcript, and something has to produce that transcript. Biscotti could, while keeping sensitive investor calls off a third-party server.

We'd want to learn how easily transcripts export, and we'd treat MCP as optional. Our `stenographer` plugin covers a different case: a link goes in and a transcript comes out, for talks and podcasts rather than your own calls.

## Install

```bash
brew install --cask biscotti
```

Open it and grant microphone, system audio, and calendar access. The project says it works offline once its models have downloaded.

Source: <https://github.com/scosman/Biscotti>
