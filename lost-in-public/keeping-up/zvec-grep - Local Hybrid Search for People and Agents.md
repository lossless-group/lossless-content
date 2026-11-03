---
date_created: 2026-10-22
date_modified: 2026-10-22
title: zvec-grep — Local Hybrid Search for People and Agents
slug: zvec-grep-local-hybrid-search-people-agents
tags: [Developer-Tools, AI-Agents, Semantic-Search, Vector-Databases, Local-First, Model-Context-Protocol, Homebrew]
homepage: https://zvec.org/en/docs/zvec-grep/
github_repo_url: https://github.com/zvec-ai/zvec-grep
brew_page: https://formulae.brew.sh/formula/zvec-grep
install: brew install zvec-grep
---

https://github.com/zvec-ai/zvec-grep

## Why This Matters

`grep` needs you to know the words. Agents that don't know them scan broadly and spend context doing it. `zvec-grep`, whose command is `zg`, puts ripgrep, BM25, and vector search behind one local interface: find by meaning, rank by relevance, then verify with exact text. It's built on `zvec`, the in-process vector database at `alibaba/zvec`.

It landed in Homebrew core on October 22, 2026 at version 0.2.2. Apache-2.0. The version matters here. Homebrew still ships the Node.js-based 0.2.2 as of November 3, 2026, while 0.3.0, published on GitHub that same day, rebuilds the core in Rust and changes the CLI (`zg index` becomes `zg --index`). The details below reflect the 0.3.0 docs unless noted, checked November 3, 2026.

## What It Actually Does

- **Mixed content.** Indexes source code, documents, and structured text, with results linked to paths and lines. Text only, even with models that support images.
- **Per-workspace index.** Stored in `.zvec-grep/` under the project root, one embedding model per workspace, with incremental updates by rerunning the index command.
- **Agent access.** A local MCP server and an installer for Claude Code, Codex, OpenCode, and others.
- **Exact search without an index.** The ripgrep route works without building anything.

## Local by Default, With One Footnote

The default model, `local/potion-code-16m-v2`, runs on CPU. Remote embedding needs provider credentials plus a separate authorization step, and the docs are clear that it sends workspace content and queries to the provider.

The footnote is the benchmarks. The README's agent results use Qwen3.7 Text Embedding, which the docs list as a remote model. So those charts don't describe the default local setup. The project also notes that results vary by model and run, and that `zg` works best when evidence spans files and the location is unknown. The Rust release's speed figures are vendor numbers too, comparing its own two versions.

## How It Compares With Our Corpus

We run a local Chroma corpus already, but it's a different kind of tool, and `zg` isn't a substitute in either direction.

| | Our Chroma corpus | zvec-grep |
|---|---|---|
| **Scope** | Whole tree, across repos | One workspace root |
| **Contents** | `context-v/`, changelogs, Claude Code sessions, tool traces | Code, docs, and data files in that workspace |
| **Freshness** | Updated when we run `ingest-all.sh` | Incremental updates, per workspace |
| **Good question** | "What did we decide about X, and when?" | "Where is X handled in this repo?" |
| **Exact matching** | Not its job | Built in, through ripgrep |

Chroma holds our institutional memory, including prior sessions, which `zg` would never see. It doesn't index source code, though, and that's the gap `zg` might fill.

## Where It Fits in Our Workflow

We haven't run it. The fair test would be a single code-heavy repo, comparing how many tool calls an agent needs with and without it. Our largely prose repos would want a different model from the code-oriented default, since the docs point to `local/potion-retrieval-32m` for English documents. We'd also want to see how reindexing behaves with parallel sessions, and `.zvec-grep/` should stay out of git.

It could also go in the `vector-databases` study under `ai-labs/studies/`. For other local retrieval approaches in this batch, see [[deja-vu - Local Memory Across Your Agent Sessions]] and [[Hister - Self-Hosted Search over Your Browsing History]].

## Install

```bash
brew install zvec-grep        # 0.2.2 as of this writing
zg index                      # 0.2.2 syntax; 0.3.0 uses zg --index
zg query --human "where are permissions checked" --limit 3
```

Source: <https://github.com/zvec-ai/zvec-grep>
