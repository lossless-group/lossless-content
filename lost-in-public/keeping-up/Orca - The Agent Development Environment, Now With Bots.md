---
date_created: 2026-11-21
date_modified: 2026-11-21
title: Orca — The Agent Development Environment, Now With Bots
slug: orca-the-agent-development-environment-now-with-bots
tags:
  - Developer-Tools
  - AI-Agents
  - Agent-Development-Environments
  - Git-Worktrees
  - Claude-Code
  - Open-Source
homepage: https://orca.dev
github_repo_url: https://github.com/stablyai/orca
install: brew install --cask stablyai/orca/orca
maintained_by: Stably AI (Lovecast Inc.)
---

https://orca.dev

## Why This Matters

Orca calls itself an **ADE**, an Agent Development Environment: "IDEs were built for you. An ADE is built for you and your agents." It's a desktop app (macOS, Windows, Linux) that runs Claude Code, Codex, Gemini, Grok, and 20+ other CLI agents in parallel, each in its own git worktree. It also bundles terminals, an embedded browser, an editor, and a diff review in one window. It's from Stably AI (YC-backed), MIT-licensed, and has passed 100k GitHub stars.

The newest layer is **Orca Bots**: long-running bots you hand jobs to from Slack, Linear, GitHub, Gmail, or a webhook. They run on the Claude Code or Codex subscription you already pay for, on your own machines. The latest release, **v1.4.269 (November 21, 2026)**, expands bots to eight more agents (Kiro, Kimi Code, Auggie, Gemini CLI, Kilo Code, MiMo Code, Droid, Goose) and brings the phone app close to desktop parity. They really do "ship daily."

## What It Actually Does

**The ADE:**

- **Worktree per task.** Split work into isolated workspaces so several agents edit the same repo without colliding.
- **Coordinator → workers.** One agent can start worker agents on other models (for example, `orca worktree create --agent grok --prompt "..."`) and wait for `worker_done`.
- **Chat UI or terminal, switch anytime.** A GPU-rendered terminal with splits, plus a chat view.
- **Embedded Chromium with Design Mode.** Click any element to copy its HTML, styles, and selector into the agent's prompt.
- **Mobile emulator.** Run an iOS Simulator or Android emulator beside the agent and let it tap, type, and check its own work.
- **Computer use.** When there's no CLI or API, agents can drive desktop apps and external browsers.
- **Usage and accounts.** See Claude, Codex, and Grok limit usage and reset times, and switch accounts without logging out.
- **Automations.** Scheduled prompts per repo: nightly dependency bumps, weekly triage, flaky-test sweeps.
- **Remote hosts.** SSH machines and cloud VMs, plus an iOS/Android companion app for answering agents from your phone.
- **Orca CLI, MCP, hooks, skills, and plugins** (themes, an Excalidraw editor, and so on).

**Orca Bots:**

- **Triggers:** schedules ("every weekday at 9"), PR opened, check failed, or a webhook fired.
- **Memory in plain Markdown:** each bot's `SOUL.md` and `MEMORY.md` are files you can read and edit.
- **Acts through MCP** in Slack, Linear, GitHub, Gmail, Google Calendar, Sentry, Vercel, and Notion.
- **Comes back with a tested PR.** When it needs you, the bot shows up under "Needs you," and its worktree is one tab away.

## Where It Fits in Our Workflow

Orca sits at the "replace the whole environment" end of the spectrum we mapped in [[Agent Supervisors - Eight Tools Chasing the Same Question]]. [[Herdr App - The Agent Multiplexer Goes Native|Herdr]] and [[Rex by Superlogical - Mitchell Hashimoto's Terminal Multiplexer|Rex]] are terminals that know about agents. Orca is an IDE with no human-first editor at its center.

A few things line up with how we already work:

- **Parent-folder chat across repos.** One testimonial describes adding a top-level folder of several repos and chatting from the parent. That's our [[concepts/Pseudomonorepos|pseudomonorepo]] shape exactly.
- **`SOUL.md` / `MEMORY.md` as plain files** follows the same instinct as `context-v/` and `CLAUDE.md`. Bot state you can `git diff` is the right call.
- **Bring-your-own-subscription.** Bots burn the Claude Max seat we already have rather than a separate metered API. That changes the cost math for scheduled triage and changelog bots.

Caveats: the surface area is huge, and daily releases mean daily change. Note that `brew install --cask orca` is an **unrelated Plotly app**. Always use the full `stablyai/orca/orca` tap name.

## Install

```bash
# macOS
brew install --cask stablyai/orca/orca

# Arch Linux
yay -S stably-orca-bin
```

Windows and Linux installers are at <https://orca.dev/download>. Mobile companion: [App Store](https://apps.apple.com/us/app/orca-ide/id6766130217) · [Google Play](https://play.google.com/store/apps/details?id=dev.orca.app).

Sources: [orca.dev](https://orca.dev) · [Orca Bots](https://orca.dev/bots) · [GitHub](https://github.com/stablyai/orca) · [Releases](https://github.com/stablyai/orca/releases)
