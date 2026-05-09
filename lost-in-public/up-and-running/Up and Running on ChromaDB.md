---
date_created: 2026-05-07
date_modified: 2026-05-08
title: Up And Running On ChromaDB
at_semantic_version: 0.0.0.1
slug: up-and-running-on-chroma-db
publish: true
authors:
  - Michael Staton
tags:
  - Vector-Databases
  - Context-Engineering-Kits
  - Context-Vigilance
  - Local-LLMs
site_uuid: f3621a38-15d0-ad45-8201-266e99df62f7
---
Open questions left for the next pass:

embedding model choice, chunking strategy, redaction layer for transcript ingestion (those leak secrets), and whether Track 4 (open spec) should include the Chroma ingestion pipeline as part of the publishable shape.

```shell
uv venv
source .venv/bin/activate 
uv pip install -r requirements.txt
```

Installed ChromaDB at 21 megabytes.

  1. Write the real ingest-to-chroma.py — production-shape version of the smoke test that reads
  sources.md, walks the included files, chunks at ## headings with frontmatter as metadata, and
  writes to a stable Chroma collection (not the throwaway smoke-test-corpus).
  2. Wire the Chroma MCP server into Claude Code for this project — so within future sessions you can
   @-mention the corpus directly and get retrieval without a CLI roundtrip. That's the "zero glue
  code" payoff from the exploration.
  3. Manual triage on sources.md first — flip the false-positive entries (the splash/src/rollup/...,
  splash/src/pages/..., etc.) to include: false, then re-run the corpus + skills manifests so the
  numbers and fill-out lists reflect reality before we ingest.



⏺ Bash(git -C /Users/mpstaton/code/lossless-monorepo/context-v/skills submodule add
      https://github.com/chroma-core/agent-skills.git chroma-agent-skills 2>&1 && echo "-…)
  ⎿  Cloning into '/Users/mpstaton/code/lossless-monorepo/context-v/skills/chroma-agent-skills'.
     ..
     ---status---
     … +14 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

⏺ Added cleanly. Quick peek at what skills came in, since the directory shape is richer than I
  expected:

  Listed 1 directory (ctrl+o to expand)

⏺ End-of-turn:

  Submodule added at lossless-skills/chroma-agent-skills/ (clone of chroma-core/agent-skills). Staged
   in lossless-skills' index but not committed per your submodule-propagation rule.

  What's inside — two top-level skills, each substantial:

  - chroma-local — for open-source/self-hosted Chroma (your current setup). 14 markdown docs covering
   caching, collections, CLI, data-model, error-handling, forking, metadata, querying, quotas, regex,
   schema, search-api, understanding-a-codebase, updating-deleting, plus the canonical SKILL.md.
  - chroma-cloud — for Chroma Cloud (CloudClient, schema, search, cloud CLI). Out of scope
  until/unless you go Cloud.

  Plus tooling: biome.json, bun.lock, requirements.txt, a scripts/ build pipeline, and registry.json
  (machine-readable index of the built skills).

  One thing worth flagging: Claude Code auto-discovers skills via
  ~/.claude/skills/<skill-name>/SKILL.md. The new skills live one level deeper at
  ~/.claude/skills/chroma-agent-skills/skills/<skill-name>/SKILL.md — they won't load automatically.
  Three ways to fix:

  1. Symlink the two skills up: ln -s chroma-agent-skills/skills/chroma-local chroma-local (and the
  same for chroma-cloud) inside lossless-skills. Cleanest for Claude Code discoverability.
  2. Use the upstream installer: npx skills add chroma-core/agent-skills --skill "chroma-local" — but
   that would install a copy outside the submodule, which kind of defeats the submodule pinning.
  3. Leave them nested as reference material only — read them via filesystem, don't surface as Claude
   Code skills.


# How to Access the Data?

Two answers:

MCP path: roll our own.

Our configs being custom is exactly the argument

for

rolling our own, not against. Three reasons: 1.

The custom metadata shape is an asset.

Our

source_root

,

source_repo_slug

,

kind

,

bucket

,

chunk_index

, stable IDs — these let us cross-query "find sessions that touched docs in

image-gin

" or "show me sessions where the

worked-on

corpus was retrieved." A separate

claude-code-sessions

collection in

the same

.chroma

directory, with metadata that

parallels

the corpus shape, is the leverage. djm81 auto-creates collections with its own schema; we'd lose that alignment. 2.

djm81's

auto_log_chat

mechanism is Cursor-IDE-rule-targeted.

Making it fire from Claude Code requires writing a hook anyway — at which point we've replaced one component of "roll our own" without saving any work. 3.

One MCP server is simpler than two.

Adding djm81 alongside

chroma-core/chroma-mcp

doubles the moving parts in

~/.claude.json

and the project

.mcp.json

files. What we'd give up: djm81's

bidirectional linking

(auto-link a session to the code changes that came out of it) and

auto-summarization

. Both are real features. Both are also addable as scripts on top of a roll-our-own foundation when we want them.

Build sketch (rough, 1-2 hours):

filesystem watcher on

~/.claude/projects/-Users-mpstaton-code-lossless-monorepo-ai-labs/

reading the JSONL session files, chunking by user-turn boundaries (vs. by

##

headings since transcripts have no headings), upserting into

claude-code-sessions

collection with metadata

{session_id, turn_index, role,

timestamp, project, tools_used}

.

Pre-req: redaction layer

— the ChromaDB exploration already flagged this and it absolutely has to land before transcripts hit Chroma.

UI question: there isn't one —

PersistentClient

is an embedded library, not a service.

What you have is a SQLite database in

.chroma/

plus the MCP server which exposes CRUD over stdio when Claude Code spawns it — there's no HTTP server bound to a port to "open." Three real paths to a browseable UI, increasing in commitment: 1.

Quickest — write a

scripts/inspect-chroma.py

that prints collections, counts, sample chunks, and runs ad-hoc queries from the CLI. ~30 lines, drop-in. Not a UI per se but the fastest "see what's in there" surface. 2.

Run

chroma run --path .chroma --port 8000

in a separate terminal — exposes HTTP API (no bundled web UI). Then point a community admin tool at it (chroma-admin, vector-admin). Caveat: while

chroma

run

is up, our MCP server's PersistentClient and the running server both want write-locks on the same SQLite — read-only inspection is fine, ingestion while server is up is risky. Also requires reconfiguring the MCP to

--client-type http

if we want consistent access. 3.

Proper Lossless answer — add a

/chroma

route to the splash.

An Astro page that queries the local Chroma at build time (or via a small API endpoint) and renders collections, sample docs, search box. Fits the [[maintain-splash-pages]] / Astro Knots aesthetic; turns "inspection" into "the splash also doubles as a corpus browser." Maybe a couple of hours. If you're just trying to

see what's in there right now before sleep eats this thought

, I'd write the

inspect-chroma.py

in a few minutes — gives you visibility immediately, doesn't fight the MCP's lock, and is throwaway when the splash gets a

/chroma

route. Want me to do that?

✻ Baked for 1m 20s · 1 shell still running