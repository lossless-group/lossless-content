---
date_created: 2026-05-18
date_modified: 2026-05-18
title: Opencode — Three Months from Bun Segfaults to Background Subagents
slug: opencode-changelog-rollup-feb-may-2026
tags: [AI-Coding, Opencode, TUI-Agents, Anomaly, Developer-Tools, Open-Source, Subagents]
announcement_url: https://github.com/anomalyco/opencode/commits/dev/
release_window_start: 2026-02-15
release_window_end: 2026-05-17
---

https://github.com/anomalyco/opencode/commits/dev/

## Why This Matters

Three months of Opencode's `dev` branch — **February 15 through May 17, 2026** — covers ~120 tagged releases spanning **v1.2.3 → v1.15.4**. The project is moving fast enough that a meaningful version of "what's new" requires looking at the whole stretch rather than any single release. Major themes across the window:

1. **Platform reach expanded** — Node.js as a first-class runtime alongside Bun, GitLab Agent Platform support, full HTTP proxy, OTLP observability.
2. **Frontier models tracked aggressively** — Opus 4.7 defaults, GPT-5.5 OAuth fixes, Mistral Medium 3.5 with reasoning, Azure gpt-5.5 routing.
3. **Session model matured** — git-backed review, multistep auth, worktree/orphan-branch recovery, instruction precedence, forked-session compaction integrity.
4. **Background subagents land experimentally** — the late-window feature that signals where the agent UX is going.

The pace is the story. Opencode is shipping the kind of week-over-week incremental refinement that's hard to track from outside but adds up to a substantially different product over 90 days.

## The Arc, In Five Phases

### Phase 1 — Mid-Feb to Mid-March (v1.2.3 → v1.2.27): Stabilization
The window opens with platform stability work — Windows segfault fixes against Bun 1.3.10, an `fsmonitor` daemon leak that was accumulating 60GB+ of committed memory after test runs, TUI/server config split, and the start of a permission-system refactor toward Effect. Quiet but load-bearing — the foundation work that everything later in the window depends on.

### Phase 2 — March 22 (v1.3.0): The First Big Feature Drop
The major release of the window's first half. Five things land at once:

- **GitLab Agent Platform support** with automatic discovery of workflow models from your GitLab instance. Workflow models can drive opencode's local tools (file read/write, shell, etc.) over WebSocket. The first time the project committed to a non-GitHub platform integration at this depth.
- **Git-backed Session Review** — review uncommitted changes and branch diffs directly within opencode. Git changes become the **default** review source, with the desktop review tree synchronized to whatever source you select.
- **Multistep Authentication** for TUI and Desktop, which is what makes GitHub Copilot Enterprise actually work.
- **Interactive Update Flow** — major/minor updates show a confirmation dialog before upgrading, with the option to skip specific versions.
- **Node.js support** alongside Bun, with a dedicated entry point and a build script that bundles the server with database migrations.

Also notable: the Anthropic OAuth plugin was **removed** in this release — a signal about how the project is thinking about auth boundaries.

### Phase 3 — April 8 (v1.4.0): SDK Breaking Changes + Subagent Polish
A smaller-but-sharper release. Breaking SDK changes to fix performance issues:

- **Diff metadata** no longer carries `to`/`from` full file contents — only a `patch` field with the unified diff. Applies to edit/patch tool metadata and to all snapshot diffs in user messages and session diffs.
- **`UserMessage.variant`** moved under `model` (i.e., `userMessage.model.variant`).

Plus OTLP observability export, full HTTP proxy support, PDF drag-and-drop for attachments, `opencode run --dangerously-skip-permissions` for auto-approving non-denied prompts, and subagent session improvements (clearer titles, navigation, progress states).

### Phase 4 — Mid-April to Early-May (v1.14.17 → v1.14.40): Model + LSP Maturation
The version-numbering jump from v1.4.x to v1.14.x catches you out, but the substance is consistent — a stretch of refinement focused on **model integrations** and **LSP behavior**:

- **Opus 4.7** defaults to `display: summarized` for Anthropic Bedrock requests.
- **GPT-5.5 with OpenAI OAuth** gets correct context limits, avoiding compaction issues.
- **Mistral Medium 3.5 with reasoning** added by community contributor `@rubdos`.
- **Roslyn LSP** added for Razor / `.cshtml` / C# script files.
- **LSP permission prompts** include request details (operation, file, cursor position).
- **Instruction precedence** made more predictable — global before project before skill.
- **Forked-session compaction integrity** — compacted history stays intact across forks (`@spark4862`).
- **Sessions filter to current path by default**, with a setting to show the whole project.
- **`.well-known/opencode`** configs supported, pointing to a separate remote config file.

The community contributor density across this phase is striking — many of the most useful fixes in the window came from outside the core team.

### Phase 5 — May 14–17 (v1.14.50 → v1.15.4): Background Subagents + Effect Event System
The window closes with two structural changes:

- **Experimental background subagents** — tasks can keep running while you continue working. This is the feature most worth tracking forward. Background-by-default is the direction the entire agent-UX space is moving in, and Opencode is now there as an experimental flag.
- **Effect-based core event system** for more complete event delivery across sessions and integrations. Pairs with the earlier Effect-ification of the permission and question subsystems — the codebase is converging on Effect as its concurrency substrate.

Plus required billing-origin headers for NVIDIA endpoints, Azure `gpt-5.5` request fixes, Linux/Windows auto-hidden menu bar in Desktop, restored markdown rendering by default in TUI, and a project-scoped bus event fix so file watchers reach the right instance.

## What The Shape Tells You

Three observations across the 90-day window:

1. **Effect is becoming the architectural commitment.** PermissionService, QuestionService, the core event system — successive subsystems are getting Effectified. That's the kind of decision that's invisible from outside but constrains everything downstream.

2. **Platform reach is the explicit strategy.** Node.js runtime, GitLab platform integration, full HTTP proxy, OTLP observability, multistep auth for enterprise providers. Each of these unlocks a specific class of user (enterprise, on-prem, GitLab-shop) that the previous version couldn't serve. The product is being made deployable in environments that pure-Bun-pure-GitHub couldn't reach.

3. **Background subagents is the leading edge.** Most of the window is incremental — bug fixes, model additions, refinements. The experimental background-subagent flag in v1.14.51 is the only thing in the window that hints at a meaningfully different interaction model. Worth watching whether it graduates out of experimental before the next major version.

## Our Take

Three months of Opencode is more product change than most projects ship in a year. The thing it doesn't have — yet — is a single anchor feature you can point at as "the reason to switch." The arc instead is the cumulative effect of consistent weekly shipping against a clear roadmap: more platforms, more models, more reliable sessions, more first-class enterprise capabilities, and now the beginnings of background work.

If you evaluated Opencode in February and bounced off, the version you'd be looking at today is meaningfully different — particularly if your blockers were Node.js support, GitLab integration, multistep enterprise auth, or fork/worktree session stability. Worth a fresh look.
