---
date_created: 2026-09-22
date_modified: 2026-09-22
title: Agent Supervisors — Eight Tools Chasing the Same Question
slug: agent-supervisors-eight-tools-chasing-the-same-question
tags: [Developer-Tools, AI-Agents, Terminal-Emulators, Tmux, Git-Worktrees, Claude-Code, Homebrew]
---

## Why This Matters

Eight agent supervisors reached Homebrew between September 1 and September 22, 2026, six of them in the ten days from September 13. They ask two questions: which agent needs me, and how do I keep them in separate worktrees?

We've covered this ground with [[herdr - Agent Multiplexer That Lives in Your Terminal|herdr]], [[Maestri - Canvas for Agent Orchestration|Maestri]], [[Otty - A Native Terminal Tuned for Code Agents|Otty]], and supaterm in the [[Homebrew Roundup - 2026-06-21|June 21 roundup]]. What's new is the pile-up. Waiting, working, and done are becoming standard features, so the real choice is how much of your setup you're willing to replace.

Landing dates are Homebrew pull request merge dates, in UTC. Versions come from the first commit. Everything else was checked November 3, 2026. We haven't run any of these, so features below are as each project describes them.

## The Comparison

| Tool | Form | Built on | License | How it knows agent state | Stars |
|---|---|---|---|---|---|
| workmux | Formula, CLI | Rust, tmux (also Kitty, WezTerm, Zellij) | MIT | Hooks or plugin installed by `workmux setup` | 2,992 |
| ccmux | Formula, daemon + TUI | TypeScript, tmux | MIT | Discovers agents in panes; optional hooks make matching reliable | 239 |
| agent-manager | Formula, TUI | Go, tmux | Apache-2.0 | Per-session hooks for Claude Code, plus regex rules on pane contents | 632 |
| Calyx | Cask, terminal | Swift, Ghostty | MIT | Hooks, shell integration, and plugins report in | 354 |
| Zentty | Cask, terminal | Swift, libghostty | GPL-3.0-only | Agent hooks and its Agent Status Protocol | 325 |
| Kaku | Cask, terminal | Rust, WezTerm | MIT | Terminal signals such as BEL and OSC sequences | 6,181 |
| Ghostex | Cask, workspace app | Rust, GPUI, Ghostty | MIT | Hooks and activity handled by its `gxserver` | 1,584 |
| Waku | Cask, desktop app | Rust, GPUI | GPL-3.0-only | Drives each CLI over its structured interface | 1,592 |

## Layers on Your Existing Tmux

- **workmux** (September 18 at 0.1.263, now 0.1.278) is the worktree specialist. One tmux window per task, with `workmux merge` handling the cleanup. It can also copy `.env` files and link dependencies into new worktrees.
- **ccmux** (September 22 at 1.4.1, now 1.4.5) is the most direct answer to "which agent needs me." You don't change how you launch agents, and desktop notifications can carry approve and deny buttons. It also spawns sessions into worktrees.
- **agent-manager** (September 13 at 0.37.0, now 0.47.1) launches sessions itself, in one list with live status, diff review, and optional worktrees.

## A New Terminal to Adopt

These change your daily driver, as Otty and supaterm would.

- **Calyx** (September 14 at 0.41.0, now 0.50.1) has the most distinctive idea: one approval inbox for Claude Code and Codex prompts across every pane. It also offers worktree tasks. It needs macOS 26 on Apple Silicon.
- **Zentty** (September 8 at 0.3.0, now 0.5.0) has an agent-aware sidebar with menu bar status and session restore. Its README doesn't pitch a worktree flow, and it warns of rough edges and breaking changes.
- **Kaku** (September 17 at 0.20.0, now 0.28.0) is a polished WezTerm-based Mac terminal first. It shows the active agent and flags panes wanting attention, making it the lightest supervisor here despite the most stars.

## A Separate App

These move the work into their own window, closer to Maestri.

- **Ghostex** (September 14 at 9.4.0, now 10.44.0) is the most ambitious, with chat views, coordinator agents, phone apps, a Kanban plugin, and account switching.
- **Waku** (September 1 at 0.1.16, now 0.1.20) drives agents through native protocols and checkpoints your working tree on every prompt. Its last push and release were October 2, while most of this group pushed within days of our check. It isn't archived and issues kept arriving, so this looks like a pause, not abandonment.

## The Catch for Our Tree

Worktrees don't drop cleanly into our layout. Git's own documentation calls submodule support in multiple checkouts incomplete and says multiple checkouts of a superproject aren't recommended. The anchor monorepo and this content repo both carry submodules, so these worktree flows look safer in leaf repos than at the parent levels. Neither the workmux nor the ccmux README mentions submodules.

Our Linux machines rule out Calyx, Zentty, and Kaku, which are macOS-only.

## What We'd Pilot

Our [[herdr - Agent Multiplexer That Lives in Your Terminal|herdr post]] described our pattern as iTerm tabs plus tmux, with heavy Claude Code use and parallel sessions. We'd start at the layer that asks the least, and we haven't run any of these yet.

1. **ccmux first.** It works with sessions as they already run and on both Mac and Linux. Two cautions: `ccmux setup` writes hooks into `~/.claude/settings.json` (`--uninstall` removes them), and it has the fewest stars here. We'd try it without hooks first.
2. **agent-manager if that disappoints.** Its Claude Code hooks live in a generated per-session settings file instead of global config. The trade is that sessions must start from its manager.
3. **workmux in one leaf repo**, as a separate test of the worktree half.
4. **Calyx as a short trial** on a macOS 26 machine, only to see whether the approval inbox beats notifications.

We'd hold off on the separate apps. Our work already lives in terminals, and the question we need answered is small.
