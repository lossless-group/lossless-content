---
date_created: 2026-09-14
date_modified: 2026-09-14
title: Relay — Build Prompts from Voice, Clipboard and Screen
slug: relay-build-prompts-voice-clipboard-screen
tags: [Developer-Tools, AI-Agents, Speech-to-Text, Claude-Code, Model-Context-Protocol, Source-Available, macOS, Homebrew]
github_repo_url: https://github.com/msllrs/relay
brew_page: https://formulae.brew.sh/cask/relay
install: brew install --cask relay
---

https://github.com/msllrs/relay

## Why This Matters

Explaining something on your screen to a model usually means a run of copy, paste, screenshot, and type. `Relay` is a macOS menu bar app that collapses that. You talk, copy things, and draw on the screen, and it assembles a structured prompt with each capture placed where you mentioned it. The README frames it as the bridge between "I have stuff on screen" and "I need to explain it to an LLM."

Dictation tools are common now. The fresh idea is a prompt assembled from several kinds of input in the order you used them, which Claude Code can then pull directly.

The cask landed in Homebrew on September 14, 2026 at version 0.9.2. The details below reflect the 0.10.0 cask and the current README, checked November 3, 2026. The repo has seen pushes since that release, so the README may describe features newer than the build you'd install.

## What It Actually Does

- **Clipboard capture.** Collects what you copy, detecting code, URLs, terminal output, JSON, and text.
- **Screen annotations.** Hold a shortcut and draw. A circle means "focus here," an X means "remove this," and an arrow means "points to this," and the intent travels with the captured image.
- **Voice notes.** Native macOS speech recognition, Apple's SpeechAnalyzer on macOS 26, WhisperKit, or Parakeet, plus four cleanup modes.
- **Correction handling.** An opt-in mode resolves "20 pixels… no wait, 8 pixels" to 8 pixels.
- **Output.** Markdown or XML, with optional auto-paste into the focused app and a history of what you've sent.
- **MCP bridge.** A server bundled inside the app exposes `relay_get_context`, `relay_get_stack`, `relay_stop_and_get_context`, and `relay_add_context` to Claude Code. No Node.js is required.

## The License Isn't Open Source

GitHub doesn't recognize the license, so the repo page shows no standard one. `LICENSE.md` is PolyForm Shield 1.0.0, © 2026 Matt Sellers. You may use, change, and redistribute the software for any purpose except providing a product that competes with it, or with any product the licensor or its affiliates provide using it. The clause counts free products and those on other platforms as competing.

That makes it source-available. Daily use isn't the concern, but building a rival prompt-capture tool from this code would be.

## Permissions and Clipboard Hygiene

The app asks for a lot of trust. Annotations need Screen Recording, and auto-paste uses the Accessibility API. Our own caution is that automatic clipboard capture will happily collect an API key you copy, and history keeps recent captures and prompts. Review the stack before sending it to a cloud model, particularly since an agent can read it over MCP.

## Where It Fits in Our Workflow

We haven't run it. The most plausible use is visual feedback on UI work across our [[astro-knots|Astro Knots]] sites: circle a broken element, say what's wrong, and let Claude Code fetch it. Our browser-drive rule says a person still judges whether a surface is usable, and this is a way to hand that judgment back to an agent quickly.

The MCP registration goes in a project's `.mcp.json`, the same place we already put Playwright, and like any new MCP server it loads in the next session. The fit is weaker on long-form dictation, where [[OpenWhispr - Open-Source Dictation with Local or Cloud Models|OpenWhispr]] is the more general tool. Requires Apple Silicon and macOS 15 or later.

## Install

```bash
brew install --cask relay
```

Enable **Settings → Integration → MCP bridge for Claude Code**, then add this to `.mcp.json`:

```json
{
  "mcpServers": {
    "relay": {
      "command": "/Applications/Relay.app/Contents/MacOS/relay-mcp-server"
    }
  }
}
```

Source: <https://github.com/msllrs/relay>
