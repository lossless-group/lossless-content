---
date_created: 2026-06-15
date_modified: 2026-06-15
title: Up And Running With SurrealDB
at_semantic_version: 0.0.1.0
slug: up-and-running-with-surrealdb
publish: true
authors:
  - Michael Staton
tags:
  - Databases
  - Graph-Databases
  - Vector-Databases
  - Document-Databases
  - Context-Engineering-Kits
  - MCP
  - Agent-Memory
site_uuid: b8421c38-25a0-4d05-9201-356e99df62f8
---

# Why we looked at it

We came at [SurrealDB](https://surrealdb.com) sideways. Our local stack already has [[ChromaDB-as-Context-Improvement-Across-Everything-Everyone|Chroma]] for embeddings, SQLite scattered behind small Astro sites, and a recurring temptation to add Neo4j every time the wikilink graph across the lossless corpus comes up. Each new data shape was pulling us toward a new database, and the operational sprawl was starting to outweigh the leverage.

SurrealDB's pitch is the inverse of that sprawl: **one binary, one query language, and document, graph, key-value, time-series, and vector models living in the same engine**. The 3.x line has the multi-model story stable, a built-in MCP server (`surreal mcp`), and an in-memory mode that means the proof of life takes less time to run than to read.

This piece is the first hour of poking at it on a Mac — install via the official script, smoke-test in memory, run the persistent server, and wire the MCP server into Claude Code.

# What you end up with

After the install script finishes you have:

- **A single ~105 MB binary** at `~/.surrealdb/surreal` — no Docker, no service to register, no separate client to install. The same binary is the server, the SQL REPL, the importer/exporter, and the MCP server.
- **Four useful subcommands** out of the gate:
  - `surreal start` — boot the database (in-memory by default, file-backed when you give it a path)
  - `surreal sql` — interactive SurrealQL REPL with pipe support
  - `surreal mcp` — MCP server over stdio for Claude Code / any AI assistant
  - `surreal import` / `surreal export` — SurrealQL script round-trip
- **Multi-model storage in one engine** — records (documents), record links (graph edges), vector indexes, time-series, key-value — addressable from a single query language.

No API keys, no hosted account, no `~/.config` clutter. The install script is the only thing that touches your machine outside of `~/.surrealdb/`.

# Setup — install via the official script

The canonical install line is one shell command:

```shell
curl -sSf https://install.surrealdb.com | sh
```

For anyone uneasy about piping `curl` to `sh` (you should be — it's executing remote code), the safer two-step is:

```shell
curl -sSf https://install.surrealdb.com -o /tmp/surrealdb-install.sh
less /tmp/surrealdb-install.sh   # inspect
sh /tmp/surrealdb-install.sh
```

The script drops the binary at `~/.surrealdb/surreal` and prints a one-liner suggestion to add it to your `PATH`. On our machine the install footprint was 105 MB — almost all of it the embedded storage engines, the SurrealQL parser, the vector indexer, and the HTTP/WebSocket server. There is no separate "server" and "client" install.

```shell
~/.surrealdb/surreal version
# 3.1.4 for macos on aarch64
```

If you want it on `PATH` without thinking about it again:

```shell
ln -s ~/.surrealdb/surreal /opt/homebrew/bin/surreal
```

That gives you `surreal` as a command for the rest of this piece.

# The four-line proof of life — in-memory

Before any persistence, run an in-memory database for a few seconds to confirm the binary works:

```shell
surreal start --user root --pass root memory
```

`memory` is the storage backend — RocksDB is the persistent default; `memory` is a non-persistent backend that lives inside the process and dies with it. Good for smoke tests, good for unit tests, good for nothing else.

In another terminal:

```shell
surreal sql --endpoint http://127.0.0.1:8000 \
  --user root --pass root \
  --ns test --db test
```

Then drop four queries into the REPL:

```surql
CREATE concept:discovery_driven_planning SET title = "Discovery-Driven Planning", coined_by = "McGrath";
CREATE concept:effectuation SET title = "Effectuation", coined_by = "Sarasvathy";
RELATE concept:discovery_driven_planning->influences->concept:effectuation;
SELECT *, ->influences->concept.* AS influenced FROM concept;
```

The fourth statement is the whole pitch in miniature: a single query traverses a graph edge that was created the line before, returns the documents on the other side, and never touches a separate graph database. If that returns the `concept:effectuation` record nested inside the `concept:discovery_driven_planning` row, the engine is working end-to-end.

# Switching to persistent storage

Swap `memory` for a directory path and the same command boots a persistent database:

```shell
mkdir -p ~/.surrealdb/data
surreal start --user root --pass root \
  --bind 127.0.0.1:8000 \
  file:///Users/$USER/.surrealdb/data
```

The file backend is RocksDB under the hood — the same engine that backs Chroma's SQLite + HNSW layout, just exposed differently. The directory grows as you write; nothing else on the machine changes.

For day-to-day local use, the launchctl recipe SurrealDB ships in [their docs](https://surrealdb.com/docs/surrealdb/installation/running) is fine, but a `tmux` session named `surreal` is enough for the first month — you only need the database up when you're using it.

# Wiring the MCP server into Claude Code

The detail that pulled us in deeper than we planned: `surreal mcp` is a first-party MCP server, shipped in the same binary, exposed over stdio. No separate `chroma-mcp`-style package to install.

Drop this `.mcp.json` at the root of the project where SurrealDB lives:

```json
{
  "mcpServers": {
    "surrealdb": {
      "command": "/Users/mpstaton/.surrealdb/surreal",
      "args": [
        "mcp",
        "--ns", "lossless",
        "--db", "knowledge",
        "--user", "root",
        "--pass", "root",
        "file:///Users/mpstaton/.surrealdb/data"
      ]
    }
  }
}
```

The next Claude Code session in that project finds the MCP server, spawns it on stdio, and exposes SurrealDB's query and mutation tools directly to the agent. Same shape as the Chroma MCP wiring in [[Up and Running on ChromaDB|Up and Running on ChromaDB]] — the surface area Claude sees is the MCP tools, not a hand-rolled adapter.

The two flags worth knowing about up front:
- `--ns` / `--db` — SurrealDB is namespaced two levels deep before you reach a table. Setting these in the MCP args saves the agent from having to `USE NS … DB …;` on every query.
- The `PATH` argument — `memory` for a non-persistent agent scratchpad, a `file://` URL for the canonical local store. Use a file path here; otherwise the agent's working memory dies with the MCP process.

# SurrealQL in two minutes

The query language is its own thing — SQL-like enough that you can read it, different enough that copy-pasting Postgres won't work.

Three things to know on day one:

**Record IDs are first-class.** `concept:discovery_driven_planning` is a fully-qualified ID — table name `concept`, record ID `discovery_driven_planning`. You don't need a join table to point at a specific record; you point at the ID directly.

**Graph edges are records too.** `RELATE a->influences->b` creates an `influences` table row whose source is `a` and target is `b`. You can `SELECT * FROM influences` like any other table, or traverse with `a->influences->concept` in a query.

**Live queries are built-in.** `LIVE SELECT * FROM concept WHERE coined_by = "McGrath"` opens a WebSocket subscription that pushes diffs to the client whenever a matching record changes. Closer to Firebase than to Postgres `LISTEN/NOTIFY`. For agent-driven workflows where multiple processes write into the same graph, this collapses the polling layer.

The [SurrealQL reference](https://surrealdb.com/docs/surrealql) covers the rest. The mental model that takes the longest to internalize: a single `SELECT` can traverse multiple graph edges, return nested subqueries, and filter on vector similarity all at once. Most of the apparent complexity in the language is there to make those compose.

# Where this fits next to ChromaDB

The honest framing: SurrealDB is not a Chroma replacement, and Chroma is not a SurrealDB replacement.

- **Chroma** is the **ingestion layer** — every Claude Code session, tool trace, changelog entry, and context-v chunk compounds into a corpus tuned for semantic recall. The retrieval API is the surface; the embedder and metadata filters are the value.
- **SurrealDB** is the **relational + graph layer** — explicit relationships between concepts, sources, organizations, and people across the lossless content corpus. The wikilink graph that markdown already encodes implicitly becomes a queryable graph explicitly.

The overlap is the vector index. SurrealDB does ship vector search, and for some shapes of corpus it would be enough on its own. For our shape — 4,500+ markdown files where the value is in the *links between them* as much as the content of them — running both is cheaper than running either alone with the wrong shape.

The next move we expect to ship: a one-script ingester that walks the lossless-content corpus, extracts every wikilink, and writes `concept->mentions->concept` edges into SurrealDB. The query *"which sources cite Rita McGrath and which concepts do those sources discuss"* becomes a single SurrealQL statement instead of three `grep` passes.

# Where to take it next

The natural sequence after a working install:

**Persistent dev database with a known schema.** A `DEFINE TABLE` / `DEFINE FIELD` schema for the lossless content shape (concepts, sources, people, organizations, tools) committed to the repo, so re-creating the database from scratch is one `surreal import`.

**The wikilink-to-edges ingester.** Walk the `content/` tree, parse `[[…]]` references, write `RELATE` statements. Roughly the same shape as the Chroma context-v ingester, but writing edges instead of embeddings.

**SurrealKV.** SurrealDB 3.x ships [SurrealKV](https://surrealdb.com/docs/surrealkv) as an alternative single-file storage backend — pure Rust, no RocksDB, smaller footprint. Worth evaluating once the database has real content in it.

**SurrealDB Cloud as the deploy path.** Same API as the local binary, hosted. The local → cloud ladder is rewrite-free, the same way Chroma's `PersistentClient` → `chroma run` → Chroma Cloud ladder is. We will stay local until something forces the move.

**Studio.** SurrealDB ships [Surrealist](https://surrealist.app), a Tauri-based desktop client for browsing namespaces, editing schema, and running queries. The role Chroma Explorer plays for the embeddings store, Surrealist plays for the relational graph.

The install is 30 seconds. The leverage starts the first time you write a query that walks a graph edge into a vector search and gets back a document — without standing up a second database to do it.
