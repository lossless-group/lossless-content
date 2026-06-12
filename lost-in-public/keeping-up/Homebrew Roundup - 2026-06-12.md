---
date_created: 2026-06-12
date_modified: 2026-06-12
title: Homebrew Roundup — 2026-06-12
slug: homebrew-roundup-2026-06-12
tags:
  - Homebrew
  - macOS
  - CLI-Applications
  - CLI-Agents
  - AI-Agents
  - Diagramming
  - Media-Asset-Management
  - Developer-Workspaces
---

A roundup-style entry rather than one file per package. From today's [[Tooling/Software Development/Developer Experience/Homebrew|Homebrew]] publish list, these are the formulae and casks worth flagging — short paragraph each, link straight to the brew page.

## Formulae

**[merman-cli](https://github.com/Latias94/merman)** — [[Tooling/Software Development/Frameworks/Web Frameworks/Mermaid.js|Mermaid.js]], but headless, in [[Tooling/Software Development/Programming Languages/Rust|Rust]]. A parity-focused reimplementation of `mermaid@11.15.0` that parses, lays out, and renders diagrams without a browser or JavaScript runtime — emits semantic JSON, layout JSON, SVG, raster (PNG/JPG/PDF via SVG rasterization), and ASCII/Unicode for terminals and logs. The corpus-driven benchmark harness clocks it at 4.3× to 56.4× faster than mermaid-rs-renderer and upstream Mermaid JS, median ~15.8×. Interesting for [[lossless-flavored-markdown]] pipelines that currently shell out to `mermaid-cli` (Puppeteer + headless Chrome) just to bake one diagram — replacing that with a static Rust binary collapses CI image-size, cold-start, and font-loading footguns in one move. `brew install merman-cli`.

**[mimo-code](https://github.com/XiaomiMiMo/MiMo-Code)** — [[Xiaomi]]'s open-source terminal AI coding agent, built for long-horizon tasks that span dozens of steps and multiple sessions. The differentiator is the cross-session memory architecture: a four-layer [[Tooling/Software Development/Databases/SQLite|SQLite]] FTS5–backed system with project memory (`MEMORY.md`), session checkpoints (`checkpoint.md`), scratch notes (`notes.md`), and per-task progress logs (`tasks/<id>/progress.md`), plus a dedicated background subagent that continuously condenses context when the active conversation approaches its limit. Past 200 execution steps Xiaomi claims a >65% win rate against [[Tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude Code]] — which is the right benchmark axis to argue on (single-shot quality matters less than whether the agent remembers architectural decisions you made yesterday). Pair-think with [[Tooling/AI-Toolkit/Models/Kimi|Kimi]] from the [[Homebrew Roundup - 2026-06-08|June 8 roundup]] — the Chinese-lab terminal-coding-agent cohort is now a category, not a one-off.

## Casks

**[shade](https://shade.inc/)** — AI-native media storage and asset management platform, built for video post-production studios, sports media teams, agencies, and content teams. Block-level streaming engine makes large files editable the moment they upload (no local downloads); AI processes footage on ingest — transcripts, face recognition, scene descriptions, keyframes — so editors can find a specific soundbite or visual moment via natural language query. The product thesis is collapsing the Frame.io + Dropbox + Iconik three-tool stack into one workspace; raised $14M from Khosla, Construct, and Bling in April bringing total funding to $20M. Adjacent in pattern to [[lost-in-public/keeping-up/Freepik is Now Magnific - A Stock Library Becomes an AI Studio|Freepik is Now Magnific - A Stock Library Becomes an AI Studio]] — both are AI-first reimaginings of incumbent creative-workflow categories rather than thin wrappers bolted onto them. `brew install --cask shade`.

**[terax](https://terax.app/)** — Terminal-first AI-native developer workspace built on Tauri 2 and React 19. ~7–8 MB on disk, 300ms cold boot, no Electron tax, no telemetry, no account — bundles native PTY (portable-pty + WebGL renderer, multi-tab, split panes), CodeMirror 6 editor with Vim mode and hunk-by-hunk AI edit diffs, file explorer, git graph, web preview pane, and an agentic AI side-panel into one window. BYOK across OpenAI, Anthropic, Gemini, Groq, xAI, Cerebras, OpenRouter, DeepSeek, Mistral, any OpenAI-compatible endpoint, plus fully-local via LM Studio, MLX, or Ollama. Sits in the same category fight as [[lost-in-public/keeping-up/Windsurf - Six Weeks of Changelog from Adaptive to Devin Local|Windsurf - Six Weeks of Changelog from Adaptive to Devin Local]] and [[lost-in-public/keeping-up/Kiro - Three Months from Custom Subagents to CLI 2.0|Kiro - Three Months from Custom Subagents to CLI 2.0]] but stakes out the "boring, fast, no-account" corner — closer in spirit to [[Tooling/Software Development/Developer Experience/Helix|Helix]] + [[Tooling/Software Development/Developer Experience/DevTools/tmux|tmux]] than to Cursor. `brew install --cask terax`.

## Sources

- [Latias94/merman on GitHub](https://github.com/Latias94/merman)
- [merman on crates.io](https://crates.io/crates/merman)
- [merman: Mermaid.js, but headless, in Rust — Lobsters](https://lobste.rs/s/qchywn/merman_mermaid_js_headless_rust)
- [XiaomiMiMo/MiMo-Code on GitHub](https://github.com/XiaomiMiMo/MiMo-Code)
- [Xiaomi's MiMo Code beats Claude Code at 200+ step tasks — VentureBeat](https://venturebeat.com/technology/xiaomis-new-open-source-agentic-ai-coding-harness-mimo-code-beats-claude-code-at-ultra-long-200-step-tasks)
- [MiMo Code: Scaling Coding Agents to Long-Horizon Tasks — Xiaomi MiMo blog](https://mimo.xiaomi.com/blog/mimo-code-long-horizon)
- [MiMo Code: Open-Source AI Coding Agent with Cross-Session Memory — ScriptByAI](https://www.scriptbyai.com/mimocode-free-terminal-coding-agent/)
- [Shade — shade.inc](https://shade.inc/)
- [Shade Raises $14M as Creative Teams Replace Fragmented Workflows — AlleyWatch](https://alleywatch.com/2026/04/shade-media-asset-management-cloud-file-streaming-creative-team-software-platform-brandon-fan/)
- [Shade Closes $14M Round as AI-Driven Media Asset Management Heats Up — CMSWire](https://www.cmswire.com/digital-experience/shade-closes-14m-round-as-ai-driven-media-asset-management-heats-up/)
- [crynta/terax-ai on GitHub](https://github.com/crynta/terax-ai)
- [Terax — terax.app](https://terax.app/)
- [Terax AI: The 7MB Terminal That Rethinks AI-Native Development — Starlog](https://starlog.is/articles/developer-tools/crynta-terax-ai)
