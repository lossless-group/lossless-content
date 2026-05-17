---
date_created: 2026-05-07
date_modified: 2026-05-17
title: Up And Running On ChromaDB
at_semantic_version: 0.0.2.0
slug: up-and-running-on-chroma-db
publish: true
authors:
  - Michael Staton
tags:
  - Vector-Databases
  - Context-Engineering-Kits
  - Context-Vigilance
  - Local-LLMs
  - MCP
  - Agent-Memory
site_uuid: f3621a38-15d0-ad45-8201-266e99df62f7
---

# Why we changed our minds

We went into a call with the [Chroma](https://www.trychroma.com/) founding team confident we did not need a vector database. Our curated corpus across the four Lossless pseudomonorepos was about 700 markdown files — small enough to fit in RAM, small enough that Pagefind would handle keyword search on the splash, small enough that the operational overhead of standing up a vector DB looked indulgent for a team our size.

We were measuring the wrong thing. The product Chroma has become in 2026 is not "a place to put embeddings" — it is an **ingestion layer** that pulls in agent traces, session transcripts, Slack messages, Notion pages, and code-graph signal, then keeps a self-healing knowledge base alive on top of all of it. The retrieval API is the surface; the ingestion network is the moat. For a small team, the value is not at retrieval — the value is that every Claude Code session, every tool failure, every shipped changelog entry compounds into a corpus that future sessions get smarter against. The benefit scales with **session count**, not corpus size.

This piece walks the path we walked over the course of one focused week — from skeptical install to four populated collections wired into Claude Code via MCP — so anyone reading along can replicate it in an afternoon.

# What you end up with

By the end of this you have, on your laptop:

- **A local Chroma database** at `<project>/.chroma/` — a SQLite file plus an HNSW index, ~21 MB to install, no API keys, no hosted service.
- **An MCP server** that exposes the database to Claude Code, so `@`-mentions of your corpus work natively in any session.
- **Four collections**, each populated by a small Python script:
  - `context-vigilance-corpus` — every `context-v/` markdown file across your monorepo tree, chunked by `##` heading
  - `lossless-changelog` — every `<repo>/changelog/` entry across the tree, one document per file
  - `claude-code-sessions` — every user/assistant message turn from every Claude Code session you've ever run
  - `claude-code-tool-traces` — every tool invocation (input, output, error flag) from those same sessions
- **A redaction layer** that catches `.env` reads, API tokens, and env-var-shaped lines before they hit the embedder.

The total cost: zero dollars, one Python virtualenv, four scripts.

# Setup — 30 minutes from `brew` to first query

We use [`uv`](https://docs.astral.sh/uv/) instead of plain `pip` because it is fast and because it makes the virtualenv lifecycle explicit. If you prefer `pip`, every command below has an obvious translation.

```shell
# in your project root — for us this is ai-labs/context-vigilance-kit/
uv venv
source .venv/bin/activate
```

Your `requirements.txt` only needs two lines for this whole pipeline:

```text
pyyaml==6.0.2
chromadb==1.5.9
```

```shell
uv pip install -r requirements.txt
```

`chromadb` installs in ~21 MB. It bundles its own default embedding model (`all-MiniLM-L6-v2` via `onnxruntime`) so you do not need to pay an API to embed your corpus — the embedder runs on your CPU, locally, and is fast enough that we have not yet felt the need to upgrade.

That is the whole install. There is no service to start, no port to bind, no Docker container. `chromadb` is an embedded library — when your Python script asks for a `PersistentClient`, it opens the SQLite file and you have a working vector store.

# The four-line proof of life

Before writing any pipeline, write a four-line smoke test so you can see the database respond:

```python
import chromadb
client = chromadb.PersistentClient(path=".chroma")
collection = client.get_or_create_collection("smoke-test")
collection.add(
    ids=["doc1", "doc2"],
    documents=[
        "ChromaDB is a vector database optimized for AI applications.",
        "FastAPI is a Python web framework for building APIs.",
    ],
)
print(collection.query(query_texts=["what stores embeddings?"], n_results=1))
```

If `doc1` comes back as the top hit, you are done with installation. Now we wire it into Claude Code.

# Wiring the MCP server — zero glue code

The Chroma team ships a [first-party MCP server](https://github.com/chroma-core/chroma-mcp) that exposes any local Chroma directory as a set of tools and resources. Claude Code consumes it natively.

Drop this `.mcp.json` at the root of the project where Chroma lives:

```json
{
  "mcpServers": {
    "chroma": {
      "command": "uvx",
      "args": [
        "chroma-mcp",
        "--client-type", "persistent",
        "--data-dir", "/absolute/path/to/.chroma"
      ]
    }
  }
}
```

The next Claude Code session you open in that project finds the MCP server, spawns it on stdio, and exposes commands like `chroma_list_collections`, `chroma_query_documents`, and `chroma_add_documents` directly to the agent. No CLI roundtrip. No custom RAG loop. The integration layer is the MCP server itself.

This is the single most important reason a small team should adopt Chroma in 2026. The cost-benefit math we walked in with assumed we would have to build the retrieval surface ourselves. We did not. The retrieval surface is the MCP server, and it took an afternoon to configure.

# Collection #1 — the context-v rollup

The first thing worth indexing is the documentation your team actually writes. In our world this is the `context-v/` directory at every level of the pseudomonorepo tree — specs, plans, blueprints, explorations, issues. Reading [[context-vigilance]] explains the philosophy; what matters here is that **every project has one**, every team member writes into it, and the corpus grows fast.

The shape of the ingester is straightforward — walk the tree, chunk each file at `##` headings, embed with the default model, upsert into a stable collection. The four design choices that matter:

**Chunk at section boundaries, not fixed token windows.** A `##` heading is a thought boundary the author already drew; respecting it produces semantically coherent chunks. We considered the [MemPalace](https://www.analyticsvidhya.com/blog/2026/05/mempalace-explained/) shape (fixed 512-token chunks with 64-token overlap) and may revisit if section chunks ever exceed ~1500 tokens.

**Stable, path-derived IDs.** For chunk N of a file, the ID is `{repo_slug}::{relative_path}::{N:04d}`. Re-running the ingest hits the same IDs and `upsert` overwrites cleanly — no orphan records, no version drift.

**Frontmatter as filterable metadata.** YAML frontmatter at the top of a markdown file (title, status, semantic_version, tags, etc.) gets flattened into Chroma metadata with an `fm_` prefix. Chroma metadata only stores primitives, so lists join to comma-separated strings. This lets future queries filter on `fm_status == "open"` or `fm_tags LIKE "%Context-Engineering%"` without losing the structure the author already encoded.

**Prefix every chunk with its title and heading.** Embedders see the chunk in isolation, so giving them the file title and section heading at the top dramatically improves retrieval quality. A chunk that reads `## Privacy redaction\n\nThe redactor runs before any text...` is far more retrievable when prefixed with `[ChromaDB-as-Context-Improvement]\n## Privacy redaction\n\n...`.

The full ingester is ~370 lines of Python — read it [in the kit](https://github.com/lossless-group/lossless-ai-labs/blob/main/context-vigilance-kit/scripts/ingest-to-chroma.py). The skeleton:

```python
client = chromadb.PersistentClient(path=".chroma")
collection = client.get_or_create_collection("context-vigilance-corpus")
for source in walk_curated_sources():
    for file in source.markdown_files():
        fm, body = split_frontmatter(file.read_text())
        if fm.get("private"):
            continue
        for idx, (heading, chunk) in enumerate(chunk_by_heading(body)):
            cid = f"{slug}::{file.relative_path}::{idx:04d}"
            doc = f"[{fm['title']}]\n## {heading}\n\n{chunk}"
            collection.upsert(ids=[cid], documents=[doc], metadatas=[{...}])
```

# The realization about versioning

The most useful conversation we had while building this was about iteration. Your context-v files are not write-once — you edit specs, you revise plans, you iterate on explorations. So how does Chroma "version" them?

**Chroma does not version automatically.** It is overwrite-by-ID. If you upsert with the same `id`, the new embedding/content/metadata replaces the old. There is no history.

This sounds like a flaw until you realize you already have a version system: **git**. Every prior version of every file is content-addressable by commit SHA. You do not need Chroma to duplicate that.

The two-system mental model:

- **Git = version history.** Authoritative, complete, free.
- **Chroma = live index of HEAD.** Refreshed when files change, queryable now.

To make iteration cheap, store `content_sha256` and `mtime` in each record's metadata, then on re-run compare the file's current hash to what is stored. If unchanged, skip. If changed, delete by `source_path` (clears stale chunks for that file) and re-insert the new chunks. For 4,500 files this turns "re-index the world" into "re-index the 20 you touched today." Forty lines of Python.

The trap that bites people: if you chunk and the chunk count changes (a file went from 8 chunks to 5), the IDs 6-8 are still in the collection with stale content. Always delete-by-source_path before re-inserting a changed file. This is the discipline that makes the index trustable.

If you ever genuinely need time-travel queries (*"what did this spec say in March?"*), `git show <sha>:path/to/spec.md` answers it without Chroma involvement. The few real research uses for "versioned vector search" — diff-of-stance over time, for example — are not Chroma features and probably not what you actually want.

# Collection #2 — the changelog rollup

Once the context-v pipeline works, the next obvious ingestion target is your changelog directories. Every Lossless repo has a `<repo>/changelog/` (or `<repo>/context-v/changelogs/`) directory where we log shipped work. Across the four pseudomonorepos and their submodules that is 30 canonical directories and 239 entries.

Changelog entries are **append-only**, which makes them the easiest possible ingestion target. One file = one document. No chunking. Stable IDs derived from the path. Content-hash skip means re-runs are nearly free.

Two gotchas we hit:

**False-positive directories.** A naive walk for `changelog/` matches Astro page routes (`src/pages/changelog`), content collections (`src/content/changelog`), components, build output (`.vercel/output/static/changelog`), and vendored study repos. Per our convention, the canonical location is `<repo-root>/changelog/` — *at the root of a git repo or submodule, not under `src/`*. The filter that gets this right: check for a `.git` (file or directory) in the parent of any `changelog/` directory. Submodules have `.git` as a file pointing into the parent worktree; full repos have it as a directory. Either way, the marker is unambiguous.

**Author drift on the `publish` flag.** Some teams use `publish: false` in frontmatter to mark drafts. The ingester respects this — drafts are skipped — which means the index is always production-shaped.

After the first ingest we had 239 entries spanning every repo in the tree, queryable by semantic similarity. The first query that surprised us was `"submodule relocation safety"` — it returned the changelog entry from a prior incident across three different repos. That kind of cross-tree recall was previously a `grep` campaign.

# Collections #3 and #4 — the unlock

Here is where the Chroma value proposition stops being about "search across our docs" and starts being about **agents getting better at our codebase over time**.

Every Claude Code session writes a JSONL transcript to `~/.claude/projects/<encoded-project-path>/<session-uuid>.jsonl`. Each line is a structured message: user input, assistant response, tool call, tool result. The files accumulate every time you open the agent. For a project we have been working in for a few months, this directory was 39 MB.

Two collections come out of one parse of this data:

**`claude-code-sessions` — one document per message turn.** Stable ID: `{session_id}::{message_uuid}`. Metadata: session_id, project_path, turn_role, timestamp, cwd, git_branch. The query *"what did we decide about X two weeks ago"* hits this collection. You no longer need to remember which session you were in.

**`claude-code-tool-traces` — one document per tool invocation.** Stable ID: the tool_use_id. Metadata: tool_name, is_error, input, output, session_id. The query *"when did Bash with `git rebase` last fail and how did we recover"* hits this. The result is the actual prior failure with the actual prior fix — not training-data folklore, not a hallucination.

Both come from a single parse pass over the JSONL — the script walks each file line by line, extracts top-level user/assistant messages for the sessions collection, pairs each `tool_use` content item with its matching `tool_result` by `tool_use_id` for the traces collection, and upserts both into Chroma in batches.

For us, this one ingester produced **2,289 session turns and 3,712 tool traces** from a single project. We noticed 166 trace IDs collided silently during upsert — that turned out to be Claude Code's session-resume feature replaying prior turns into new JSONL files. Since `upsert` is keyed on the stable `tool_use_id`, the same invocation in two files collapses into one record. Resume is gracefully handled by the data model, with no extra logic.

# The redactor — the gate that has to land before transcripts hit Chroma

Session transcripts contain **everything the agent saw**. Read tool output, environment dumps, git status, raw file contents. Occasionally that includes secrets you forgot to gitignore. The redactor is the gate that has to land before you ingest a single line.

Ours is three layers, all running before any text reaches the embedder:

```python
ENV_VAR_LINE_RE = re.compile(r"(?m)^([A-Z][A-Z0-9_]{2,})\s*=\s*[^\n]+$")
TOKEN_PATTERNS = [
    (re.compile(r"sk-ant-[A-Za-z0-9_\-]{20,}"), "[REDACTED_ANTHROPIC_KEY]"),
    (re.compile(r"sk-[A-Za-z0-9]{20,}"),         "[REDACTED_OPENAI_KEY]"),
    (re.compile(r"gh[pousr]_[A-Za-z0-9]{20,}"),  "[REDACTED_GITHUB_TOKEN]"),
    (re.compile(r"AKIA[0-9A-Z]{16}"),            "[REDACTED_AWS_ACCESS_KEY]"),
    (re.compile(r"Bearer\s+[A-Za-z0-9._\-]+"),   "Bearer [REDACTED]"),
]
ENV_PATH_RE = re.compile(r"(?:^|/)\.(?:env|secrets)(?:\.[^/\s]+)?(?:/|$)")
```

The first layer replaces values on env-var-shaped lines. The second layer replaces known token prefixes anywhere they appear. The third layer is the most aggressive: if a `Read`/`Edit`/`Write` tool call's `file_path` argument looks like an env or secrets file, the *entire output* of that tool call is replaced with `[REDACTED_SECRETS_FILE_CONTENTS]` before anything is embedded. We do not attempt to selectively redact — the whole payload goes.

This is intentionally over-eager. False positives — say, a chunk of documentation that contains an env-var-shaped example line — get redacted alongside real secrets. That is the correct trade. The cost of over-redaction is a slightly less informative chunk. The cost of under-redaction is your team's API keys in a vector database.

On our first real run the redactor fired:
- 15 env-var-shaped redactions in session/trace records
- 3 wholesale `.env`/`.secrets` file-read redactions
- 3 token-prefix redactions catching actual sk-/ghp_ patterns in tool output

Three actual secret-file reads got caught. Without this layer, those would be sitting in the embedded text, ready to surface on a future query.

# The four-collection mental model

After all four ingesters run, you have a Chroma database with this shape:

| Collection | Granularity | Best for |
|---|---|---|
| `context-vigilance-corpus` | Section-level chunks of context-v files | "what do we believe about X" |
| `lossless-changelog` | Whole changelog entries | "what shipped about X and when" |
| `claude-code-sessions` | Message turns | "what did we decide about X" |
| `claude-code-tool-traces` | Tool invocations | "when did X last fail and how did we recover" |

The MCP server exposes all four simultaneously to Claude Code. A query against the database can target one collection (most queries do) or several (when the answer might be in our docs *or* a prior session). In practice we find ourselves typing `@chroma` and letting the agent decide which collection to search.

# A master script

The four ingesters are independent — different data, different collections, different cadence — but the master script that runs the safe ones with one command is worth having:

```bash
./scripts/ingest-all.sh                  # context-v + changelog (safe to rerun)
./scripts/ingest-all.sh --with-claude    # + sessions + traces (opt-in, privacy-sensitive)
./scripts/ingest-all.sh --reset          # drop and rebuild every collection
./scripts/ingest-all.sh --only-claude    # only the transcripts
```

Sessions and traces are **opt-in** because they ingest your Claude Code transcripts, and the redactor — however carefully written — is a heuristic. The default invocation runs only the context-v and changelog rollups, which contain no personal data.

# Browsing the data — Chroma Explorer

Once the four collections are populated, the obvious next question is *how do I look at any of this?* The first answer we tried — Chroma's own built-in view — was bad enough that we ran a research pass to see what was actually shipping in 2026.

The landscape in May 2026 has three real categories:

- **Web admin UIs** that point at a `chroma run` server: [`flanker/chromadb-admin`](https://github.com/flanker/chromadb-admin) (most mature, Next.js, Docker-friendly), [`BlackyDrum/chromadb-ui`](https://github.com/BlackyDrum/chromadb-ui) (more recent, runs queries and edits records), [`thakkaryash94/chroma-ui`](https://github.com/thakkaryash94/chroma-ui) (CSV export, vector viewer).
- **VS Code extensions**: [ChromaDB Viewer](https://marketplace.visualstudio.com/items?itemName=MichaelErmer.vsex-chromadb-viewer) and a [FAISS + Chroma extension](https://medium.com/@gitaramkanawade/exploring-faiss-chroma-embeddings-inside-vs-code-af23ac68c488) — for people who live in the editor anyway.
- **Embedding visualization**: [`chromaviz`](https://github.com/mtybadger/chromaviz) renders the collection as a 3D point cloud (Flask + react-three-fiber, ~10K+ docs). Different value — you are looking at cluster shape, not browsing rows. Worth running on your `claude-code-sessions` collection once just to see what shape your conversations actually take.

The pick for us — and for any other Mac-first reader — is **[Chroma Explorer](https://github.com/stepandel/chroma-explorer)** by Stepan Arsent (MIT, free). It is a native macOS app with browse / search / similarity-score inspection, multi-profile connections, and 13+ embedding-provider support. v0.4.1 (April 2026) ships as a signed `.dmg` for Apple Silicon.

```shell
# direct download (Apple Silicon, ~403 MB)
open https://github.com/stepandel/chroma-explorer/releases/download/v0.4.1/chroma-explorer-0.4.1-arm64.dmg
```

The one wrinkle: Chroma Explorer (like every UI in the landscape above) talks **HTTP**, not directly to a `PersistentClient` directory. So you point it at `http://localhost:8000` and run a Chroma server in the same data directory in another terminal:

```shell
uvx --from chromadb chroma run \
  --path /path/to/your/.chroma \
  --host localhost \
  --port 8000
```

For us that path is `/Users/mpstaton/code/lossless-monorepo/ai-labs/context-vigilance-kit/.chroma`. Chroma 1.0+ handles file locking correctly via the Rust core rewrite, so the running server and any concurrent `PersistentClient` reads from ingest scripts can share the same directory without corrupting each other. (Don't run two writers at once — that part still bites.)

A couple of things worth flagging about the executable name: it is `chroma`, not `chromadb`. If you `uvx chromadb run …` you will get `The executable 'chromadb' was not found` — the package is `chromadb`, the binary is `chroma`. The `uvx --from chromadb chroma run …` form above resolves both.

The hosted [ChromaDB Viewer on Vercel](https://chroma-viewer.vercel.app/) is genuinely nice but means exposing your data to a remote service. For corpora that include Claude Code transcripts — even redacted ones — keep the browser local.

If you ever want a faceted, SQL-shaped view of the raw `chroma.sqlite3` (without similarity search, but with everything else), [Datasette](https://datasette.io/) pointed at the sqlite file is a one-line option: `uvx datasette /path/to/.chroma/chroma.sqlite3`. Simon Willison's pattern for [combining `sqlite-vec` with Datasette](https://til.simonwillison.net/sqlite/sqlite-vec) extends that to vector search inside the same UI — a future-tense option we have not needed yet.

# What this unlocks for a small team

The frame we walked in with assumed Chroma was for retrieval at scale. The frame we walked out with is different:

**Cross-session memory.** Every session you have run in your codebase is queryable from the next session. *"What did we figure out about the migration two weeks ago?"* used to require you to remember which session. Now it does not.

**Debugging memory.** Every time a tool errored, the record persists. *"When did Bash with `git rebase` last fail?"* returns the actual prior failure with the prior fix. We have already used this twice to short-circuit problems we had solved before but forgotten.

**Cross-repo recall.** Your changelog spans every project in your tree. *"What shipped about OG images in May?"* returns hits across `ai-labs`, `content-farm`, `dark-matter`, `image-gin` — four repos, one query. Before Chroma this was four `grep` campaigns.

**Author-time amplification.** Every spec you write, every changelog entry you ship, every session you run with Claude Code compounds. The corpus you have today is smaller than the corpus you will have in three months, and the corpus you will have in a year is small compared to where it goes. For a team of three, this is the closest thing we have seen to *infrastructure that gets smarter while you sleep.*

The math that did not pencil at our scale at the start pencils now because the cost of the integration was hours, not weeks, and the value compounds across every dimension we measure.

# Where to take it next

The collections above are the V0 shape. The natural next moves, in roughly the order we expect to ship them:

**Local → Cloud continuity.** Chroma supports the same API across `EphemeralClient` (in-memory), `PersistentClient` (local SQLite), `chroma run` (HTTP server, single machine, multi-process), and Chroma Cloud (distributed). The ladder is rewrite-free. We will stay on PersistentClient until something forces the move — a collaborator joining, the splash needing live query, multi-machine ingest.

**Context-1 as the retrieval subagent.** Chroma's [Context-1](https://www.trychroma.com/research/context-1) is a 20B-parameter agentic search model that decomposes complex queries into subqueries, iteratively searches, and **self-edits its own context** mid-search. It pairs cleanly with the *retrieval subagent / reasoning generalist* split — Context-1 does the searching, Claude does the thinking. We have not yet wired this in. When we do, the bottleneck will move from query quality to ingestion completeness.

**More ingestion sources.** Slack messages, Notion pages, GitHub PR review threads, deck slide content, the lossless-content corpus (4,500+ markdown files). Each is one script and one collection.

**Schema for Context-1 evaluation.** Once we have a query set with ground-truth relevance, we can grade alternative embedding models (hosted vs. local Ollama) against the same corpus. Until we do, the default `all-MiniLM-L6-v2` is free, fast enough, and on by default — three properties that beat any model we cannot evaluate.

# Source files

If you want to read the full code — both the working scripts and the exploration that produced them — these are the canonical references in our tree:

- [`ai-labs/context-vigilance-kit/scripts/ingest-to-chroma.py`](https://github.com/lossless-group/lossless-ai-labs/blob/main/context-vigilance-kit/scripts/ingest-to-chroma.py) — context-v rollup
- [`ai-labs/context-vigilance-kit/scripts/ingest-changelogs-to-chroma.py`](https://github.com/lossless-group/lossless-ai-labs/blob/main/context-vigilance-kit/scripts/ingest-changelogs-to-chroma.py) — changelog rollup
- [`ai-labs/context-vigilance-kit/scripts/ingest-claude-sessions-to-chroma.py`](https://github.com/lossless-group/lossless-ai-labs/blob/main/context-vigilance-kit/scripts/ingest-claude-sessions-to-chroma.py) — sessions + traces, with redactor
- [`ai-labs/context-vigilance-kit/scripts/ingest-all.sh`](https://github.com/lossless-group/lossless-ai-labs/blob/main/context-vigilance-kit/scripts/ingest-all.sh) — master script
- [[ChromaDB-as-Context-Improvement-Across-Everything-Everyone]] — the exploration doc that produced the architecture

The setup is ~30 minutes if you read this end-to-end. The compounding starts the next time you open Claude Code.
