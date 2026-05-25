---
date_created: 2026-05-15
date_modified: 2026-05-15
title: Windsurf — Six Weeks of Changelog from Adaptive to Devin Local
slug: windsurf-changelog-rollup-april-may-2026
tags: [AI-Coding, Windsurf, Devin, Cognition, IDEs, Model-Routing, Developer-Tools]
announcement_url: https://windsurf.com/changelog
release_window_start: 2026-04-06
release_window_end: 2026-05-12
---

https://windsurf.com/changelog

## Why This Matters

Six weeks of Windsurf shipping in one place. The story across the window — **April 6 through May 12, 2026** — is the **Cognition-era reshaping** of Windsurf into something more than a Cursor-shaped IDE. Three threads run through it:

1. **Adaptive model routing** ships as a first-class quota-extending strategy, then gets polished and bug-fixed across two releases.
2. **Windsurf 2.0** lands with Devin (the cloud agent from the Cognition acquisition) **integrated directly into the editor**, plus an Agent Command Center.
3. **Devin Local** (terminal CLI agent, Rust-implemented) ships shortly after, then graduates into a same-harness in-IDE agent that's **~30% more token-efficient than Cascade**.

If you're tracking the consolidation of "AI IDE" and "agentic dev tooling" into a single product, this six-week window is the consolidation happening in public.

## The Timeline

### April 6, 2026 — v1.9600.38: Introducing Adaptive
The Adaptive model router debuts as a new entry in the model picker. The premise: **intelligently select the optimal model per task** and **draw quota at a fixed per-token rate** rather than per-model. Available immediately to Pro, Max, and Teams self-serve. Promotional pricing for the first two weeks — **$0.50 / 1M input, $2.00 / 1M output, $0.10 / 1M cache-read**.

Same release: the model picker gets **inline token pricing**, a **prompt-cache timer** in the context-window indicator, and **per-response token counts** on response cards. This is the cost-transparency push that the whole AI-IDE category has been moving toward — Windsurf is the first to put per-model rates and cache state directly in the picker.

### April 6, 2026 — v1.9600.40: Adaptive Model Visibility
Same day, second release. Adaptive's display in the model picker gets a UI polish — a small change, but worth noting because the team shipped a same-day follow-up specifically to make the new routing option more discoverable. Read that as a signal of how much they want users to actually try Adaptive rather than stay on a default Claude/GPT pin.

### April 7, 2026 — v1.9600.41: Adaptive Fix
A bug in the adaptive router was preventing model switching after the initial request — i.e., Adaptive was picking once and sticking. Fixed within 24 hours. **Affected users had quota reset and overage restored.** That's the right way to handle a billing-adjacent bug.

### April 15, 2026 — v2.0.44: Windsurf 2.0
The major release of the window. Three structural changes:

- **Devin in Windsurf.** The Devin cloud agent is integrated into the editor for all self-serve plans. One-click delegation from local session → Devin Cloud with a dedicated VM. Review changes and test results without leaving the editor. First Devin Cloud session gets up to **$50 credit**. Enterprise is disabled by default; admins enable per-org.
- **Agent Command Center.** Kanban-style view of all local and cloud agent sessions by status. Sessions, PRs, files, and context group into **Spaces** — task-level containers you switch between.
- **Refined Windsurf Browser** with toolbar integration and a Cascade tool that can read page content directly.

Plus accelerated Cascade sidebar load, improved `.gitignore`/`.codeiumignore` handling, remote-extension stability (WSL, SSH, Dev Containers), and typing performance in large active diff zones.

### April 16, 2026 — Claude Opus 4.7
Opus 4.7 lands in Windsurf the day after 2.0 ships.

### April 16 / April 17 / April 20 / April 21, 2026 — v2.0.50 / 2.0.61 / 2.0.63 / 2.0.67
Stabilization sequence after 2.0. Windows Terminal spawning fix, OAuth regression on certain MCP servers patched and re-patched, Devin Cloud connection reliability improvements. The cadence (four point releases in six days) tells you 2.0 shipped with real edges and the team chose visibility over polish.

### April 24, 2026 — GPT-5.5
GPT-5.5 lands in Windsurf.

### April 28, 2026 — v2.1.29: Devin for Terminal + Devin Local in Windsurf
The second structural shift of the window:

- **Devin for Terminal.** A new CLI agent running **locally** on the user's machine, **Rust-implemented**, with seamless handoff to Devin Cloud (dedicated VM, testing). Multi-model support across **Opus 4.7, GPT-5.5, and SWE-1.6**. All Windsurf users get it with existing subscriptions.
- **Devin Local in Windsurf.** Same agent harness as the terminal CLI, **sharing session access** with it. Up to **30% greater token efficiency than the existing Cascade agent.**

This is the more important release of the two. It collapses the gap between the IDE agent and the terminal agent into a single substrate, and the token-efficiency number is the kind of claim that, if it holds, changes the per-task cost math.

Plus: streaming search subtitle layout, drag-and-drop fix in Cascade tabs, `Ctrl+Shift+G` keybinding fix on Windows/Linux, server-driven extension deny lists.

### April 29, 2026 — v2.1.32
Bug-fix release. Crash on switching between Cascade conversations fixed. Auth issue preventing Devin Cloud session startup fixed. Agent-question response routing fixed. All three are usability-blocking; getting them out the door within 24 hours of v2.1.29 is appropriate.

### May 6, 2026 — v2.2.17: Devin Review + Quick Review
**Devin Review and Quick Review** become available to all Windsurf IDE users on existing subscriptions. Self-serve users get a two-week free trial on Devin Review specifically. **Enterprise users need a Cognition platform agreement** to get Devin Review — the line where "Windsurf plan" stops being enough.

Also: list display option for agent inbox, sessions sidebar sorting/filtering, performance improvements for session loading and switching. A Windows update bug that was blocking upgrades got patched — workaround was killing `devin.exe` processes before updating.

### May 12, 2026 — Claude Opus 4.7 (Fast Mode)
Opus 4.7's fast mode lands in Windsurf. *"Full Opus 4.7 intelligence with approximately 2.5x faster output speeds."* For an IDE where latency on inline edits matters a lot, this is a meaningful daily-driver improvement, not just a model addition.

## What The Shape Tells You

Three observations across the six weeks:

1. **Adaptive is the strategic feature.** Cost-per-task is the line that AI IDEs are starting to compete on, and a routing layer that picks among Opus / GPT / SWE-1.6 / whatever-comes-next is a more durable position than betting on any single provider being cheapest. The same-day visibility patch on April 6 is the giveaway — they want this used.

2. **Cognition's Devin is being absorbed methodically.** April 15 → Devin Cloud in the IDE. April 28 → Devin terminal CLI + Devin Local in-IDE sharing the same harness. May 6 → Devin Review and Quick Review. That's the acquisition payoff sequencing: cloud → local → review surfaces, each two weeks apart.

3. **The token-efficiency claim on Devin Local (~30% better than Cascade)** is the line in this window most worth verifying in real use. If it holds, Cascade has a short shelf life as the in-IDE agent. If it doesn't, this is a marketing number.

## Our Take

The interesting thing about the Windsurf release stream is that it's no longer a Cursor-style "IDE with AI bolted on" — it's converging on **an agent platform that happens to ship with an editor and a terminal client**. The Spaces / Agent Command Center / shared-harness work is the structural change that signals where the product is going. Worth a fresh look for anyone who evaluated Windsurf earlier in the year and made a Cursor-vs-Windsurf-vs-Claude-Code decision based on the Cascade-era product.
