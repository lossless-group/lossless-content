---
date_created: 2026-05-07
date_modified: 2026-06-22
title: Up And Running With Agent-Skills
at_semantic_version: 0.0.0.2
slug: up-and-running-with-agent-skills
publish: true
authors:
  - Michael Staton
tags:
  - Context-Engineering-Kits
  - Context-Vigilance
site_uuid: d8c3aa58-a5d0-bd3e-8201-266e99df62f7
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__Claude.png?updatedAt=1757078166433
---

An **Agent Skill** is a directory containing a `SKILL.md` file — "organized folders of instructions, scripts, and resources that give agents additional capabilities." Skills are how you capture procedural knowledge and organizational context once and have Claude reach for it automatically, instead of building a fragmented, custom-designed agent for every use case.

## The anatomy of a skill

Every skill is a folder whose entry point is `SKILL.md`, opening with YAML frontmatter that carries two required fields:

```yaml
---
name: decile-hub-connector
description: How augment-it talks to the Decile Hub API. Use whenever pulling from or pushing to Decile Hub, wiring the connector for a new client, or when the user mentions "Decile" or "DECILE_API_URL".
---

# Decile Hub Connector

## Instructions
[step-by-step guidance for Claude]
```

Field rules worth knowing before you name one:

- **`name`** — max 64 chars, lowercase letters / numbers / hyphens only, and it **cannot contain the reserved words "claude" or "anthropic".**
- **`description`** — non-empty, max 1024 chars. Write both *what it does* and *when to use it* — this is the only text Claude sees until the skill triggers, so it is doing all the discovery work.

Larger skills bundle more files — `REFERENCE.md`, a `references/` folder, executable scripts — that Claude reads only when it needs them:

```text
decile-hub-connector/
├── SKILL.md
└── references/
    └── endpoint-inventory.md
```

## Progressive disclosure — why skills don't blow up your context

Skills load in three levels, so installing many of them costs almost nothing until one is actually used:

| Level | When loaded | Token cost | What |
|---|---|---|---|
| **1 — Metadata** | Always, at startup | ~100 tokens/skill | `name` + `description` from frontmatter |
| **2 — Instructions** | When the skill triggers | < ~5k tokens | the `SKILL.md` body |
| **3+ — Resources** | As needed, via bash | effectively unlimited | bundled files & scripts |

The metadata is "just enough information for Claude to know when each skill should be used without loading all of it into context." Only when your request matches a skill's `description` does Claude read the full `SKILL.md`; bundled reference files and scripts are pulled in (or executed, with only their *output* entering context) one at a time. Because unused files never cost tokens, "the amount of context that can be bundled into a skill is effectively unbounded."

## Where skills work — and the catch

Skills run across all of Claude's surfaces: **claude.ai (web + desktop), Claude Code, the Agent SDK, and the Claude API.** But —

> [!warning] Custom skills do **not** sync across surfaces
> A skill added to one surface is not available on the others. Claude Code skills are filesystem-based; claude.ai skills are uploaded as ZIPs in Settings; API skills are uploaded via the Skills API. You manage each surface separately.

Sharing scope also differs: claude.ai skills are **per individual user** (no org-wide push), API skills are **workspace-wide**, and Claude Code skills are **personal (`~/.claude/skills/`) or project (`.claude/skills/`)** — or shared via Claude Code Plugins.

## How we run skills in Claude Code (the Lossless setup)

Claude Code supports **custom skills only**, discovered from the filesystem — no upload step. Our skills live as folders in `lossless-skills` (the `lossless-agent-skills` repo, mounted at `context-v/skills/`). Claude Code discovers a skill only when it has its **own** direct-child symlink at `~/.claude/skills/<name>`; a symlinked *parent* directory does **not** expose the skills nested inside it.

So the one-repo discipline still holds — `lossless-skills` stays the single source of truth — but every skill needs its own top-level symlink at `~/.claude/skills/<name>` to load. Keep that in sync with:

```bash
bash /Users/mpstaton/code/lossless-monorepo/context-v/skills/sync-skills-symlinks.sh
```

Run it at session start and after authoring any new skill (newly-linked skills appear in the *next* session, not the current one).

For the **Claude Desktop** side — which is upload-based, not symlink-based — see [[Up and Running with Skills in Claude Desktop]].

## Security

Treat installing a skill like installing software: use only skills you wrote or got from Anthropic. A malicious skill can direct Claude to run code or invoke tools in ways that don't match its stated purpose — audit the `SKILL.md`, every bundled script, and especially anything that fetches from external URLs before trusting it.

## Sources

- [Equipping agents for the real world with Agent Skills — Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Agent Skills overview — Claude Developer Platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
