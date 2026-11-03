---
date_created: 2026-10-25
date_modified: 2026-10-25
title: Kontext — Local Policy for Agents, and Why It Fails Open
slug: kontext-local-policy-agents-fails-open
tags: [Developer-Tools, AI-Agents, Security, Policy-Enforcement, Claude-Code, macOS, Go, Homebrew]
homepage: https://kontext.security
github_repo_url: https://github.com/kontext-security/kontext
brew_page: https://formulae.brew.sh/formula/kontext
install: brew install kontext
---

https://github.com/kontext-security/kontext

## Why This Matters

Kontext's pitch is simple: "Stop risky AI-agent actions before they run." It puts local policy between an agent and its tools, evaluates supported actions before they execute, and records each decision in an authorization ledger. You start in observe mode, then move to enforce mode.

The most important paragraph in its README is the one that limits that promise. It sits near the top:

> Policy evaluation errors, a policy that is not ready (missing, corrupt, or expired), and an unresolved identity allow the tool call, including in enforce mode, and remain visible as failures in the activity record. Only completed policy denies and unavailable required approvals block. When the hook cannot get a decision at all, because the daemon is down, restarting, too slow, or returns something unreadable, the tool call is not blocked and Kontext returns no decision, so the agent's own permission settings apply.

"Fails open" is our label, not theirs. The wording was already there at the Homebrew landing version and is unchanged in the current one.

It merged into Homebrew core on October 25, 2026 at version 1.13.1. MIT licensed, written in Go. The details below reflect 1.17.1, checked November 3, 2026.

## What Failing Open Means in Practice

Enforce mode doesn't mean "nothing runs without an approving policy." It means a completed deny blocks. So:

- If a policy expires, tool calls proceed, and the failure shows up in the record afterward.
- If the daemon is down or slow, calls proceed under the agent's own permissions.

A broken guard that halts every developer's agent gets uninstalled, which may be why it's built this way, though that's our inference. Either way, read Kontext as a guardrail and an audit trail, not as containment. The README agrees: "Kontext does not claim kernel-level isolation."

## What It Actually Does

- **Pre-action hooks.** It can block at pre-tool-use for Claude Code, Claude Cowork, and Codex. The README names those three, while the coverage matrix also lists Cursor.
- **Two paths.** `kontext guard` is documented as local-only, with no login. `kontext setup` needs an install token from the dashboard and streams ledger batches to Kontext's hosted backend, though decisions stay local.
- **Default data collection to review.** `KONTEXT_AUTHORITY_SCAN=off` disables authority collection and transmission on a Mac.

## Where It Fits in Our Workflow

We haven't run it. The appeal is real, since Claude Code and Codex are both in our toolset. Some rules in `AGENTS.md` are written as instructions an agent is trusted to follow, like the hard stop on repo relocations. A deterministic policy could put a second check on destructive commands or on reads of `.env` files.

Two limits stand out. The Homebrew formula requires macOS and self-serve setup is macOS-only, so it wouldn't cover our Linux machines. And failing open means we couldn't treat it as the thing protecting those rules.

Before relying on it, we'd test three cases: what `kontext doctor` reports when a policy has expired, whether anything alerts someone rather than waiting for a person to read the record, and whether a fail-open "allow" skips Claude Code's own permission prompt. The README doesn't answer those. For hard boundaries, a sandbox like [[OpenShell - NVIDIA's Runtime for Autonomous Agents|OpenShell]] is the better layer.

## Install

```bash
brew install kontext   # macOS only; update with brew upgrade
kontext guard --help   # the local-only path
```

The README prefers the self-updating cask, `brew install --cask kontext-security/tap/kontext`.

Source: <https://github.com/kontext-security/kontext>
