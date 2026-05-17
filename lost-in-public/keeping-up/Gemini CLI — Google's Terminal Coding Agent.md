---
date_created: 2026-05-17
date_modified: 2026-05-17
title: Gemini CLI — Google's Terminal Coding Agent
slug: gemini-cli-terminal-coding-agent
tags: [AI-Coding, Developer-Tools, CLI, Google, Gemini, Claude-Code, Terminal-Agents]
homepage: https://github.com/google-gemini/gemini-cli
install: npm install -g @google/gemini-cli
release_date: 2025-06-25
---

https://github.com/google-gemini/gemini-cli

## Why This Matters

**Gemini CLI** is Google's open-source terminal coding agent — the same shape as Claude Code: natural-language input, planning, tool use, filesystem reads, command execution, git awareness. It launched **June 25, 2025** under **Apache 2.0**, sits at **~103k GitHub stars**, and as of **May 12, 2026** is on stable `v0.42.0` with a weekly release cadence (Tuesdays, stable + preview).

The reason to write this up now, eleven months after the initial launch: the field has consolidated around **three serious terminal agents** — Claude Code, Gemini CLI, and OpenAI Codex CLI — and the workflow patterns for using more than one have stabilized enough to be worth documenting.

## What It Actually Is

- **Open source.** Apache 2.0. Source at [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli). The full agent loop is auditable, unlike Claude Code (which is closed-source despite being a CLI).
- **Free tier that is actually usable.** **1,000 requests/day** on a personal Google account via OAuth, **60 req/min** throttle. No credit card. This is the part that makes it credible as a daily-driver alternative for individual developers.
- **Default model: Gemini 3 Pro.** Gemini 3.1 Pro available in preview. Scores **80.6% on SWE-bench Verified** vs. Claude Opus 4.7's 87.6% — competitive but not at the top of the leaderboard.
- **MCP support.** Yes, the same Model Context Protocol that Claude Code uses. Our existing MCP servers (`chroma`, `tavily`, etc.) work in Gemini CLI without changes.
- **Multimodal via `@filename` syntax.** Drop images or PDFs into a prompt with `@design-spec.pdf` or `@screenshot.png`. This is genuinely useful for design-doc work and is something Claude Code does not natively support in the same ergonomic way.
- **OS-level sandboxing by default.** gVisor / LXC. Stronger isolation than Claude Code's permission-prompt model out of the box.
- **VS Code integration.** Via Gemini Code Assist. GitHub Actions integration ships in the box.

## What It Doesn't Have

- **No sub-agents.** Single-agent loop only. Claude Code's `Agent` tool with specialized subagents (Explore, Plan, general-purpose) has no analog. For the kind of work where we routinely fan out to `Explore` for parallel codebase search, this is a meaningful gap.
- **No skills system.** No `/loop`, `/schedule`, `/ship`, no skill auto-loading based on directory context. The Lossless Group's heavy use of skills (`pseudomonorepos`, `context-vigilance`, `astro-knots`) does not have a Gemini-CLI equivalent.
- **No 1M-context UI/UX yet.** The model supports it; the CLI's session-management surface around long contexts is less polished than Claude Code's.
- **Closed gap on tool-use quality.** Per multiple 2026 comparisons, Claude Code "consistently produces cleaner, more maintainable code, especially for complex multi-file refactors." Gemini CLI is competitive for simpler tasks but not yet for the hardest agent workloads.

## The Emerging Multi-Agent Workflow

The pattern that has stabilized across the comparison reviews:

- **Claude Code** for production work — multi-file refactors, anything that touches `astro-knots/`, anything that needs the Lossless skill suite.
- **Gemini CLI** for free spikes, large-context greps, multimodal tasks (screenshots, PDFs), and prototyping where the 1,000 req/day free tier removes the cost-anxiety of exploration.
- **Codex CLI** as the third option for OpenAI-stack-specific work.

Worth noting: **all three accept MCP servers**. That means the Chroma corpus we built for Claude Code is *also* available from Gemini CLI without re-wiring — the corpus pays off across the whole agent fleet.

## Recent Release Cadence

| Date | Release | Notable |
|---|---|---|
| 2025-06-25 | Initial launch | Apache 2.0, ~103k stars within a year |
| 2026-01-13 | Notable updates landed (per release notes) | — |
| 2026-05-12 | **v0.42.0** stable | Voice mode polish, session management (`/exit --delete`), reduced API timeouts |
| 2026-05-12 | v0.43.0-preview.0 | Weekly preview cadence |

New preview every Tuesday 23:59 UTC; new stable every Tuesday 20:00 UTC. **Weekly release cadence on an OSS terminal agent is unusual** — most comparable tools ship monthly at best. It's the most visible signal that Google is treating this as a strategic surface, not a side project.

## Where It Fits in Our Workflow

- **Worth installing alongside Claude Code, not instead of it.** The free tier alone makes it useful for exploration that would otherwise hit our Anthropic API budget.
- **Multimodal handling is the wedge.** When the next deck-iteration or `crawl-fetch-ingest` job involves screenshots, partner logos, or PDF decks, Gemini CLI's `@filename` syntax is a faster path than the Claude Code workflow of base64-encoding and pasting.
- **Don't expect skill parity.** The Lossless skill ecosystem (auto-loaded `pseudomonorepos`, `context-vigilance`, etc.) is Claude Code-specific. Gemini CLI sessions will need explicit prompting for the conventions that Claude Code picks up from `CLAUDE.md` automatically.
- **MCP-server compatibility means tooling investment pays off twice.** Anything we build as an MCP server (and we have several) is usable from both agents.

## How Significant Is This Compared to Other Terminal Agents?

| Agent | Launch | License | Free Tier | MCP | Sub-agents | SWE-bench Verified |
|---|---|---|---|---|---|---|
| **Claude Code** | Feb 2025 (preview) → May 2025 GA | Closed | Limited | Yes | Yes | **87.6%** (Opus 4.7) |
| **Gemini CLI** | Jun 2025 | Apache 2.0 | **1,000 req/day** | Yes | No | 80.6% (3.1 Pro) |
| **Codex CLI** | 2025 | Open source | Limited | Yes | Partial | ~78% (GPT-5.5) |

The Gemini CLI value proposition is: open source + generous free tier + multimodal-first. The Claude Code value proposition is: best code quality + richest agent harness (sub-agents, skills, hooks) + tightest IDE/MCP integration. They are competing on different axes; the practical answer is to use both.

## Sources

- [google-gemini/gemini-cli — GitHub](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI release notes](https://geminicli.com/docs/changelogs/)
- [Gemini CLI vs Claude Code (May 2026) — Codersera](https://codersera.com/blog/gemini-cli-vs-claude-code-2026/)
- [Claude Code vs Gemini CLI: who is winning in April 2026? — Shipyard](https://shipyard.build/blog/claude-code-vs-gemini-cli/)
- [Codex vs Claude Code vs Gemini CLI — wetheflywheel](https://wetheflywheel.com/en/guides/codex-vs-claude-code-vs-gemini-cli/)
- [Gemini CLI vs Claude Code — DataCamp](https://www.datacamp.com/blog/gemini-cli-vs-claude-code)
- [Gemini CLI vs Claude Code for Python — Real Python](https://realpython.com/gemini-cli-vs-claude-code/)
