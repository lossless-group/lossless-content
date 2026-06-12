---
date_created: 2026-06-08
date_modified: 2026-06-08
title: Homebrew Roundup — 2026-06-08
slug: homebrew-roundup-2026-06-08
tags:
  - Homebrew
  - macOS
  - CLI-Applications
  - CLI-Agents
  - Local-AI
  - Speech-to-Text
  - Terminal-Tools
  - Sales-Tools
---

A roundup-style entry rather than one file per package. From this week's Homebrew publish list, these are the formulae and casks worth flagging — short paragraph each, link straight to the brew page.

## Formulae

**[elio](https://formulae.brew.sh/formula/elio)** — Snappy, batteries-included terminal file manager with rich previews, inline images, bulk actions, and trash support. Three-pane TUI in the lf / yazi / ranger lineage, but the "batteries-included" framing is the differentiator — preview support for PDFs, archives, structured data (JSON/YAML), markdown with syntax highlighting, and media metadata with cover art works out of the box, with optional richer previews when `pdfinfo`, `ffprobe`, `resvg`, `7z` are present. The category churns a lot but the lf/yazi incumbents have entrenched muscle memory; elio's bet is that ergonomics-by-default wins over configuration-by-default. `brew install elio`.

**[kimi-code](https://github.com/MoonshotAI/kimi-code)** — Moonshot AI's terminal coding agent, written in TypeScript, distributed via npm with Homebrew packaging following. The interesting part isn't just another Claude-Code-shaped CLI — it's that Kimi Code dispatches built-in `coder`, `explore`, and `plan` subagents in isolated contexts (mirrors the Claude Code subagent pattern), supports MCP server config conversationally via `/mcp-config`, and speaks the Agent Client Protocol so the same session can drive from Zed or JetBrains. Backed by Kimi K2.6 (1T MoE, 256K context, ~58.6% SWE-bench Pro). Pair-think with [[Kiro - Three Months from Custom Subagents to CLI 2.0]] and [[Gemini CLI - Google's Terminal Coding Agent]] — the subagent-orchestration-in-CLI pattern is now the table-stakes shape.

**[rmux](https://formulae.brew.sh/formula/rmux)** — Universal Rust terminal multiplexer with a tmux-compatible CLI (~90 commands, existing keybindings just work) plus a typed async Rust SDK on the same daemon — stable pane IDs, structured snapshots, Playwright-style locator waits. The pitch is "tmux for the agentic era": a daemon-backed runtime that an agent can drive programmatically without screen-scraping, plus a `ratatui-rmux` widget for embedding live pane snapshots inside Ratatui TUIs. Native on Linux, macOS, Windows (real ConPTY, no WSL). Fresh public preview at v0.3.0 — bugs expected, but the architecture is the right shape for the [[herdr - Agent Multiplexer That Lives in Your Terminal]] / [[Maestri - Canvas for Agent Orchestration]] cluster. `brew install rmux`.

## Casks

**[buzz](https://formulae.brew.sh/cask/buzz)** — Offline audio transcription and translation, powered by OpenAI's Whisper. Imports audio and video files, exports as TXT/SRT/VTT, supports Whisper, Whisper.cpp, Faster Whisper, Hugging Face Whisper-compatible models, and the OpenAI Whisper API as a fallback. The "fully offline" framing is what distinguishes it from the meeting-recorder cohort (`meetily`, Granola, Fireflies) — Buzz is the boring, reliable batch tool for transcribing a folder of MP3s without sending them anywhere. Mac (Intel), Windows, Linux. `brew install --cask buzz`.

**[groove-omnidialer](https://formulae.brew.sh/cask/groove-omnidialer)** — Outbound sales dialer for making and managing calls, now part of Clari's revenue orchestration stack. Salesforce-integrated, with call recording, call forwarding, and SMS for sales outreach. Not interesting for our work directly, but worth noting because the SDR-tool category has been migrating off browser extensions and onto desktop apps (the cask exists because the extension model kept losing audio-routing fights with the OS) — a quiet signal about where the rest of the revenue-tooling space is headed. `brew install --cask groove-omnidialer`.

**[macparakeet](https://github.com/moona3k/macparakeet)** — Fast, local voice app for Mac: system-wide dictation, file & YouTube transcription, and meeting recording. Runs NVIDIA's Parakeet TDT on Apple's Neural Engine via FluidAudio CoreML — 25 European languages on Parakeet directly, 73 more via optional WhisperKit. Records system audio + microphone together for meetings, shows live local transcript preview, and saves to a library with export, prompts, and chat. Open-source, MIT-shaped, no account, no cloud STT. The interesting layer is "Transforms" — selected-text rewrites routed through your choice of OpenAI, Anthropic, Gemini, OpenRouter, Ollama, LM Studio, or CLI tools — which makes it a privacy-preserving alternative to the [[Fresh - Short-Term Memory for Screenshots Downloads and Clipboard]] / Granola axis for anyone who refuses cloud transcription. Pair-test with [[Buzz]] above — they serve adjacent jobs (batch transcription vs. always-on dictation + meetings).
