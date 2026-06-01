---
date_created: 2026-06-01
date_modified: 2026-06-01
title: Homebrew Roundup — 2026-06-01
slug: homebrew-roundup-2026-06-01
tags:
  - Homebrew
  - macOS
  - AI-Agents
  - Local-AI
  - Virtualization
  - Design-Tools
  - Apple-Ecosystem
  - CLI-Agents
  - CLI-Applications
---

A roundup-style entry rather than one file per package. From today's Homebrew publish list, these are the formulae and casks worth flagging — short paragraph each, link straight to the brew page.

## Formulae

**[cozypkg](https://formulae.brew.sh/formula/cozypkg)** — CLI for managing [Cozystack](https://cozystack.io/) packages. Cozystack is the open-source "PaaS-on-Kubernetes" distro that's been quietly accreting mindshare as a self-hostable alternative to the hyperscaler app platforms; a first-class CLI is the kind of surface area that makes it usable from a dev machine instead of only from CI. Worth a look if we end up self-hosting anything beyond the splash sites. `brew install cozypkg`.

**[sanity](https://formulae.brew.sh/formula/sanity)** — Command-line interface for [Sanity](https://www.sanity.io/), the headless CMS. Relevant because Sanity is one of the few headless CMSes that takes the "content as structured data with a real schema" idea seriously, which is philosophically adjacent to how we treat the [[lossless-flavored-markdown]] corpus. Not something we'd switch to, but the CLI is useful for any client engagement where Sanity is already the source of truth. `brew install sanity`.

**[cc-switch-cli](https://formulae.brew.sh/formula/cc-switch-cli)** — All-in-one assistant tool for Claude Code, Codex, Gemini, OpenCode and OpenClaw. This is the "manage credentials and configs across multiple agent CLIs" category showing up as a formula. Worth a quick test against our current pattern of per-tool `.secrets` files; if it handles the multi-account-per-tool case cleanly it could simplify the env-var sprawl. `brew install cc-switch-cli`.

## Casks

**[agentsmesh](https://formulae.brew.sh/cask/agentsmesh)** — AI agent workforce platform. The "workforce" framing (vs. orchestration, vs. multi-agent) is the new vocabulary cluster — see also [[Maestri - Canvas for Agent Orchestration]] and [[Perplexity Computer - One Agent Orchestrating 19 Models]]. Worth installing just to see how it stakes out the category. `brew install --cask agentsmesh`.

**[atomcode](https://formulae.brew.sh/cask/atomcode)** — Open-source terminal AI coding agent. Another entry in the increasingly crowded terminal-coding-agent field next to Claude Code, Gemini CLI, Opencode, Kiro, Windsurf, herdr. Open-source is the differentiator to verify — check the license and the model-routing story. `brew install --cask atomcode`.

**[devin-cli](https://formulae.brew.sh/cask/devin-cli)** — Coding agent with Devin Cloud integration. Cognition shipping a local CLI that fronts Devin Cloud is a notable move — for the longest time Devin was browser-and-Slack only. Pairs with the Windsurf-now-runs-Devin-locally thread. `brew install --cask devin-cli`.

**[dbx](https://formulae.brew.sh/cask/dbx)** — Database management tool. The category (TablePlus, DBeaver, DataGrip, Sequel Ace, Beekeeper) has been static for years; new entrants are rare. Worth a quick install to see whether it's another Electron-with-skins or something more native. `brew install --cask dbx`.

**[ghostvm](https://formulae.brew.sh/cask/ghostvm)** — Native macOS Virtual Machines for Apple Silicon. Apple's Virtualization.framework keeps spawning thin GUI wrappers (UTM, VirtualBuddy, Viable, Tart). GhostVM is the latest. Useful for the "I need a clean macOS sandbox to test an install script" case that comes up whenever we onboard a new repo. `brew install --cask ghostvm`.

**[mactools](https://formulae.brew.sh/cask/mactools)** — Menu bar toolbox. Vague name, but the menu-bar-utility-grab-bag category (Bartender, Ice, iStat Menus, One Switch) is one where occasional new entrants do unseat incumbents. `brew install --cask mactools`.

**[meetily](https://formulae.brew.sh/cask/meetily)** — Meeting transcription and analysis application. Crowded space (Granola, Fireflies, Otter, Read.ai, tldv) but transcription is the cheapest part — the differentiator is whether the *analysis* layer is actually useful or another GPT-wrapper summarizer. `brew install --cask meetily`.

**[mirai](https://formulae.brew.sh/cask/mirai)** — Inference engine for AI models. Local inference is the live frontier; see also `vmlx` below. The interesting question for both is which quantization formats and which model families they support out of the box. `brew install --cask mirai`.

**[vmlx](https://formulae.brew.sh/cask/vmlx)** — Run local AI models on Apple Silicon. Almost certainly MLX-backed (the name is a tell). The MLX-on-Apple-Silicon stack is rapidly catching up to llama.cpp for usability, and a polished GUI shipping via Homebrew is a signal the category is consolidating. Pair-test with `mirai`. `brew install --cask vmlx`.

**[openpencil](https://formulae.brew.sh/cask/openpencil)** — Open-source design editor compatible with Figma. The Penpot / Figma-alternative thread continues. "Figma file compatibility" is the part to verify — many open-source design tools claim it and then only support import, not round-trip. `brew install --cask openpencil`.

**[yojam](https://formulae.brew.sh/cask/yojam)** — Open links in selected browser, profiles, or apps. The "link router" category (Choosy, Velja, Browserosaurus, Finicky) is small but loyal. For anyone juggling multiple Chrome profiles + Arc + Safari for client work, the right router saves real friction. `brew install --cask yojam`.
