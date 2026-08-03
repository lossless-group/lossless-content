---
date_created: 2026-08-02
date_modified: 2026-08-02
title: Homebrew Sweep — Hitlist
slug: homebrew-sweep-hitlist
tags:
  - Homebrew
  - macOS
  - CLI-Applications
  - CLI-Agents
  - AI-Agents
  - Model-Context-Protocol
  - Digital-Preservation
  - Local-First
---

The single working hitlist for the [[Tooling/Software Development/Developer Experience/Homebrew|Homebrew]] sweep — one list, not a file per package. Each new formula/cask off the publish list lands here with a one-line verdict against our thesis (agent-native tooling, local-first / own-your-data, [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]], portable formats, digital preservation). Anything marked **⭐** stands out enough to promote to its own [[Homebrew Roundup - 2026-06-21|Roundup]]-style entry; **✓** is worth a line in a roundup; **—** didn't make the cut. Ordered by fit, most promotable first.

## Sweep — 2026-08-02

| Package | What it is | Fit | Angle for us / why |
|---|---|:---:|---|
| **librefang** | Self-hostable operating system for autonomous AI agents | ⭐ | Agent-OS you host yourself — the "own the substrate your agents run on" play. Squarely our infra thesis. |
| **otty** | Terminal emulator built for code agents | ⭐ | Terminal-as-agent-workspace, same fight as [[Homebrew Roundup - 2026-06-21\|supaterm]] and [[herdr - Agent Multiplexer That Lives in Your Terminal\|herdr]]. |
| **openlore** | Persistent architectural memory and structural cognition for AI coding agents | ⭐ | Agent memory layer — direct kin to our [[chroma-local\|local corpus]] and the memory-layers-for-agents line. |
| **baml** | Programming language for agents | ⭐ | A language purpose-built for agents; category-defining if it holds up. |
| **mcpsnoop** | Transparent proxy and TUI for debugging MCP traffic | ⭐ | We debug MCP servers constantly — a Wireshark-for-MCP is immediately useful and on-thesis. |
| **openwhispr** | Privacy-first voice-to-text dictation with AI agents | ⭐ | Local-first speech-to-text, same line as [[Homebrew Roundup - 2026-06-21\|typewhisper]]. Voice never leaves the box. |
| **arcbox** | Runtime for containers, Linux VMs, and AI agent sandboxes | ⭐ | Agent sandboxing runtime — pairs with the containerization thread ([[Homebrew Roundup - 2026-06-21\|socktainer]]). |
| **smithery-cli** | Install and list MCP servers from Smithery | ⭐ | Package-manager surface for MCP — the "npm for MCP servers" moment. |
| **apm** | Dependency manager for AI agent configuration | ⭐ | Agent config as a managed dependency graph — infra maturity signal. |
| **soar** | Fast, modern package manager for Static Binaries, Portable Formats and more | ⭐ | "Portable formats" is literally our language; a portable-first package manager is worth a look. |
| **libation** | Audible audiobook manager and liberator | ⭐ | DRM liberation / own-your-library — same preservation spirit as [[Homebrew Roundup - 2026-06-21\|tubeup]] and msgvault. |
| **clarify** | Autonomous CRM | ✓ | Autonomous-CRM angle relevant to our [[twenty-interface\|Twenty]] work; worth a line. |
| **raycast-glaze** | Create desktop apps by chatting with AI | ✓ | Agentic app-gen; incumbent-workflow-from-inside pattern. |
| **cate** | Infinite zoomable canvas with editor, terminal, and browser panels | ✓ | Canvas-workspace, like [[Maestri - Canvas for Agent Orchestration\|Maestri]] / tldraw. |
| **claude-status-bar** | Menu bar status indicator for Claude Code | ✓ | Claude Code ecosystem utility — we live in Claude Code. |
| **onit-sidekick** | AI chat panel | ✓ | System-wide AI panel; local-first candidate, needs a look. |
| **podcast-dl** | CLI for downloading and archiving podcasts | ✓ | Preservation utility, tubeup family. |
| **snippety** | Snippet manager & text expander | ✓ | Part of the local text-input stack (cotypist/typewhisper). |
| **tight-studio** | Screen recorder and video editor | ✓ | Palmier-pro adjacent, though no AI angle stated. |
| **deepline** | CLI for Deepline data enrichment and durable plays | ✓ | Data enrichment CLI; "durable plays" wording intriguing, verify. |
| **neon-vision-editor** | Native code and text editor | ✓ | Native editor; low differentiation until we see the hook. |
| **tpack** | Drop-in replacement for tmux-plugin-manager (tpm) with a TUI | ✓ | Terminal QoL; minor but on-terrain. |
| **annotate** | Keyboard-driven screen annotation tool | ✓ | Presentify/[[KeyScreen - Show Key Presses on Screen\|KeyScreen]] family; niche macOS utility. |
| **keeperdb** | Database management tool for Postgres, MySQL, SQLite, MSSQL, Oracle, Redshift | — | Generic DB GUI; crowded category, no thesis hook. |
| **flite** | Small fast and portable speech synthesis system | — | Portable TTS, but a classic lib, not news. |
| **oh-my-reddit** | Beautiful Reddit threads, live in your terminal | — | Terminal-fun; off-thesis. |
| **bettercmdtab@beta** | Replacement for the built-in Cmd+Tab app switcher | — | Cmd+Tab utility, like sxitch; niche, pass. |
| **spacejump** | Menu bar utility to name and switch desktop Spaces | — | macOS Spaces QoL; off-thesis. |
| **droast** | Opinionated Dockerfile linter | — | Narrow devtool; no hook. |
| **webfont** | Generator of fonts from SVG icons (TTF encoding, WOFF/WOFF2 decoding) | — | Asset tooling; off-thesis. |
| **platinum-notes** | Improve audio quality of music files | — | Audio mastering; off-thesis. |
| **auth0** | Build, manage and test your Auth0 integrations from the command-line | — | Vendor CLI; off-thesis. |
| **openturns** | Probabilistic modelling and uncertainty quantification library | — | Scientific lib; off-thesis. |
| **pypy3.11** | Implementation of Python 3 in Python | — | Runtime update; not news. |

## Promote queue

Pull these into their own [[Homebrew Roundup - 2026-06-21|Roundup]]-style entries first — they cluster into two thesis-clean themes:

- **Agent substrate & MCP plumbing** — `librefang`, `otty`, `arcbox`, `apm`, `smithery-cli`, `mcpsnoop`, `baml`, `openlore`. Arguably one strong entry: *"the agent operating layer is arriving as Homebrew formulae."*
- **Local-first & liberation** — `openwhispr`, `libation`, `soar`. Fits the own-your-data / portable-formats / preservation line we already run.
