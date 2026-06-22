---
date_created: 2026-06-21
date_modified: 2026-06-21
title: Homebrew Roundup — 2026-06-21
slug: homebrew-roundup-2026-06-21
tags:
  - Homebrew
  - macOS
  - CLI-Applications
  - CLI-Agents
  - Terminal-Emulators
  - Speech-to-Text
  - File-Transfer
  - Containers
  - Digital-Preservation
---

A roundup-style entry rather than one file per package. From today's [[Tooling/Software Development/Developer Experience/Homebrew|Homebrew]] publish list, these are the formulae and casks worth flagging — short paragraph each, link straight to the project. Three formulae and six casks made the cut; the rest of the day's list (language servers, bioinformatics tools, firmware updaters, a privacy browser fork) didn't.

## Formulae

**[msgvault](https://github.com/kenn-io/msgvault)** — archive a lifetime of email and chat with offline search, analytics, and AI query over your full message history. It's a terminal-first tool (interactive TUI for browsing) that ingests from Gmail, IMAP, PST, MBOX, and Apple Mail into a single local, full-text-searchable archive with multi-account support — the data lives on your machine, not a SaaS. The interesting angle for us is that it's another instance of the "personal corpus, queryable offline" pattern we already lean on internally with [[chroma-local|local Chroma over the Lossless corpus]] — same instinct (own your history, make it searchable) applied to the inbox instead of the codebase. Useful as a digital-preservation move before a provider deprecates an export format out from under you. `brew install msgvault`.

**[socktainer](https://github.com/socktainer/socktainer)** — a Docker-compatible REST API on top of [[Apple]]'s containerization framework. It's a Swift CLI/daemon that exposes the familiar Docker API surface over Apple's native `container` runtime, so existing Docker tooling — the CLI, [[Testcontainers]], and friends — can drive Apple containers without a Docker Desktop license or a Linux VM layer. This matters because Apple's own `container` tool shipped without API compatibility, stranding the whole Docker tooling ecosystem; socktainer is the shim that reconnects them. For anyone on Apple Silicon trying to shed the Docker Desktop tax while keeping their `docker`-shaped muscle memory and CI integrations, this is the bridge. `brew install socktainer`.

**[tubeup](https://github.com/bibanon/tubeup)** — uses [[yt-dlp]] to download a video and all its metadata from YouTube (or any of yt-dlp's hundreds of supported providers) and then uploads the whole package to the [[Internet Archive]]. Maintained by the Bibliotheca Anonoma archival collective, it's a pure preservation utility: the moment a channel looks likely to get nuked, `tubeup` mirrors it to archive.org with descriptions, thumbnails, and subtitles intact. Squarely in the same digital-preservation spirit as [[msgvault]] above — capture-before-it-vanishes, on infrastructure you don't control but can't be silently rug-pulled by a single platform. `brew install tubeup`.

## Casks

**[altersend](https://altersend.com/)** — free, open-source, encrypted peer-to-peer file transfer with no accounts, no size limits, and no central server. You pair two devices with a QR scan and files travel directly between them. The distinction from [[LocalSend]] (the obvious comparison) is that AlterSend isn't confined to the same LAN — it brokers a direct connection across the internet, so it covers the "send a huge file to someone far away without uploading it to anyone's cloud" gap that AirDrop and LocalSend leave open. Open source on GitHub (denislupookov/altersend). `brew install --cask altersend`.

**[cotypist](https://cotypist.app/)** — system-wide AI autocomplete for the Mac. It activates inline in nearly any text field in any app, offering completions you accept wholesale or word-by-word, and it learns your vocabulary, names, and phrasing in one app and carries them to the next. Everything stays encrypted on-device — the privacy posture is the pitch. Pairs naturally with **[typewhisper](https://www.typewhisper.com/en/)** below as the two halves of a local-first text-input stack: one predicts what you're typing, the other lets you skip typing entirely. `brew install --cask cotypist`.

**[typewhisper](https://www.typewhisper.com/en/)** — speech-to-text and AI text processing for macOS that runs **100% on-device** — no cloud, no API keys, no subscriptions. It offers system-wide dictation, file transcription, and a layer of workflows on top: history, a custom dictionary, snippets, and integrations, plus AI text processing (cleanup/reformatting) applied to what you dictate. The on-device Whisper inference is the whole point — your voice never leaves the machine, which is the same local-first line [[cotypist]] draws for typed text. A strong free/open alternative to the cloud-dictation tools for anyone who won't send audio off-box. `brew install --cask typewhisper`.

**[palmier-pro](https://www.palmier.io/)** — a video editor built for AI, where [[Tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude]] and Codex can edit your timeline directly — trimming, reordering, and generating footage — and AI generation is native to the timeline rather than bolted on via export/re-import. It's a Y Combinator company pitching at the "CapCut ads outperform professional shoots" moment: start from AI, edit in place. This is the video-editing instance of the same pattern we flagged with [[lost-in-public/keeping-up/Freepik is Now Magnific - A Stock Library Becomes an AI Studio|Freepik becoming Magnific]] and Shade in the [[Homebrew Roundup - 2026-06-12|June 12 roundup]] — agentic AI driving an incumbent creative-workflow category from the inside, not wrapping it. Notably, the agents here are the same coding agents (Claude, Codex) we use for code, now pointed at a video timeline. `brew install --cask palmier-pro`.

**[supaterm](https://supaterm.com/)** — a [[Ghostty]]-based native Mac terminal "for the coding-agents age," with built-in agent automation and skills. It wraps native [[Tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude]] and Codex CLI integration into the terminal itself — a sidebar showing agent activity, notifications, and the ability to script Supaterm (or tell your agents to script it) to spawn new git worktrees in new panes or tabs. By supabitapp. It sits in the same terminal-as-agent-workspace fight as [[lost-in-public/keeping-up/herdr - Agent Multiplexer That Lives in Your Terminal|herdr]] and the `terax` workspace from the [[Homebrew Roundup - 2026-06-12|June 12 roundup]], but stakes out the "Ghostty rendering + worktree orchestration" corner — directly relevant to our own multi-worktree agent workflows. `brew install --cask supaterm`.

**[sxitch](https://www.reddit.com/r/MacOS/comments/1uarrya/giveaway_sxitch_the_tree_based_app_switcher/)** — a tree-based app switcher for macOS, built in [[Tooling/Software Development/Programming Languages/Rust|Rust]] with the `iced` GUI toolkit. Instead of the flat Cmd-Tab MRU list, it organizes open apps (and presumably windows) into a navigable tree — a different mental model for anyone who runs dozens of windows and finds linear switching too lossy. Small, native, fast by virtue of its Rust/`iced` foundation; ships with a trial mode so you can live in it before committing. A niche quality-of-life pick rather than a category mover, but the kind of native-Rust desktop utility worth knowing exists. `brew install --cask sxitch`.

## Sources

- [kenn-io/msgvault on GitHub](https://github.com/kenn-io/msgvault) · [msgvault.io](https://msgvault.io/) · [Terminal Trove listing](https://terminaltrove.com/msgvault/)
- [socktainer/socktainer on GitHub](https://github.com/socktainer/socktainer) · [AGENTS.md (Swift CLI/daemon over Apple containerization)](https://github.com/socktainer/socktainer/blob/main/AGENTS.md)
- [bibanon/tubeup on GitHub](https://github.com/bibanon/tubeup)
- [AlterSend — altersend.com](https://altersend.com/) · [denislupookov/altersend on GitHub](https://github.com/denislupookov/altersend)
- [Cotypist — cotypist.app](https://cotypist.app/) · [Press kit](https://cotypist.app/press)
- [TypeWhisper — typewhisper.com](https://www.typewhisper.com/en/) · [r/macapps launch (100% local)](https://www.reddit.com/r/macapps/comments/1r4t83f/os_typewhisper_speechtotext_for_macos_100_local/)
- [Palmier Pro — palmier.io](https://www.palmier.io/) · [Palmier on Y Combinator](https://www.ycombinator.com/companies/palmier)
- [Supaterm — supaterm.com](https://supaterm.com/) · [supabitapp/supaterm on GitHub](https://github.com/supabitapp/supaterm)
- [Sxitch giveaway/launch — r/MacOS (Rust + iced)](https://www.reddit.com/r/MacOS/comments/1uarrya/giveaway_sxitch_the_tree_based_app_switcher/)
