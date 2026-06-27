---
date_created: 2026-06-22
date_modified: 2026-06-22
title: Up And Running With Skills In Claude Desktop
at_semantic_version: 0.0.0.1
slug: up-and-running-with-skills-in-claude-desktop
publish: true
authors:
  - Michael Staton
tags:
  - Context-Engineering-Kits
  - Context-Vigilance
site_uuid: 802439e1-a3d9-4ae5-816e-40cdec59954b
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__Claude.png?updatedAt=1757078166433
---

Adding a skill to the **Claude Desktop** app is a different mechanism from Claude Code. In Claude Code a skill is discovered by a symlink at `~/.claude/skills/<name>` (see [[Up and Running with Agent-Skills]]). Claude Desktop has no symlink path — every skill is **uploaded as a ZIP, one at a time, private to your account**. The same skill therefore has to be added in *both* places independently.

## The to-do

- [ ] **Enable code execution first.** Settings → **Capabilities** → turn on **"Code execution and file creation"**. Skills will not run without it, and the Skills section will not even be visible until it is on.
- [ ] **Open the Skills manager.** **Customize → Skills**.
- [ ] **Start an upload.** Click **"+"** → **Create skill** → **Upload a skill**.
- [ ] **Pick the ZIP.** Select the ZIP of the skill folder. After upload, Claude reads the `SKILL.md` frontmatter and shows the skill's name and description.
- [ ] **Repeat per skill.** There is no "link the whole directory" shortcut like the Claude Code symlink approach — each skill is its own upload.

## The format gotcha

The ZIP must contain the **skill folder at its root**, not a bare `SKILL.md`:

```
decile-hub-connector.zip
└── decile-hub-connector/
    ├── SKILL.md
    └── references/
        └── endpoint-inventory.md
```

Zipping the loose `SKILL.md` (no enclosing folder) will fail to register. One skill per ZIP.

## What ports cleanly — and what does not

Claude Desktop runs skills in a **sandbox with no access to your local machine**. That changes which of our skills are worth uploading:

> [!check] Ports cleanly — pure-guidance skills
> Skills that are just instructions and reference docs work as-is: `decile-hub-connector` (the API contract), `git-conventions`, `changelog-conventions`, `context-vigilance`, `pseudomonorepos`.

> [!warning] Does not port — local-tool skills
> Any skill whose steps read a local file, run a local script, or reach a local service will break in the sandbox: `search-lossless-corpus` (local Chroma), `crawl-fetch-ingest` (API keys in `~/.secrets`), `generate-consistent-og-images` (Ideogram + local paths), and anything referencing `context-v/` paths or `sync-skills-symlinks.sh`.

## Constraints worth knowing

- Available on Free, Pro, Max, Team, and Enterprise plans (code execution required).
- Uploaded skills are **private to your individual account** — not shared org-wide and not centrally pushed by an admin (Team/Enterprise provisioning aside).

## Sources

- [Use skills in Claude — Claude Help Center](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
- [Getting started with Skills on Claude](https://support.claude.com/en/articles/12512173-getting-started-with-skills-on-claude-ai)
- [How to create custom skills — Claude Help Center](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
