---
date_created: 2026-09-04
date_modified: 2026-09-04
title: tgrep — Microsoft's Trigram-Indexed Search for Large Codebases
slug: tgrep-microsoft-trigram-indexed-search-large-codebases
tags: [Developer-Tools, Code-Search, Microsoft, Large-Codebases, AI-Agents, Rust, Homebrew]
github_repo_url: https://github.com/microsoft/tgrep
brew_page: https://formulae.brew.sh/formula/tgrep
install: brew install tgrep
---

https://github.com/microsoft/tgrep

## Why This Matters

Agents grep constantly, and on a very large repo every one of those searches reads a lot of files. `tgrep` builds an index first. It maps three-byte sequences (trigrams) to the files containing them, uses the index to narrow a regex down to candidate files, then verifies those candidates with the full regex engine. Microsoft says it's integrated into GitHub Copilot CLI to power grep across large repositories, which we haven't confirmed independently.

It landed in Homebrew core on September 4, 2026 at version 1.0.2. MIT licensed, written in Rust. The details below reflect 1.2.6, checked November 3, 2026.

## What It Actually Does

- **Client and server.** `tgrep serve .` builds the index and runs in the foreground. `tgrep -- "pattern" .` connects to it over loopback TCP.
- **Fallbacks.** Without a server it uses the on-disk index, and with no usable index it scans the filesystem.
- **Live updates.** The server watches for changes, with polling or `--no-watch` as alternatives.
- **Agent integration.** `install-agent.sh` sets up MCP search tools and startup hooks for Codex or pi. Claude Code isn't named.
- **Shared daemon.** An opt-in mode serves several Git worktrees from one daemon. Microsoft's own baseline says it saves memory and storage on LF files but has higher startup and query latency.

## Reading the Benchmarks

These are Microsoft's numbers, from an August 24, 2026 sweep on GitHub-hosted runners, and they measure search time only with the index already built.

| Repo | Files | Windows | macOS | Linux |
|---|---:|---:|---:|---:|
| `mozilla/gecko-dev` | 387,841 | 38.6x | 51.9x | 7.36x |
| `chromium/chromium` | 504,351 | 17.6x | 15.8x | 3.81x |
| `kubernetes/kubernetes` | 31,300 | 7.08x | 2.81x | 0.93x |
| `golang/go` | 15,833 | 7.53x | 3.12x | 1.29x |

Those are four of the six repos, with speedup measured against ripgrep, and tgrep won 17 of 18 combinations. Two things stand out. The gap is far narrower on Linux, and it generally shrinks as repos get smaller: ripgrep narrowly wins on Kubernetes on Linux. The README also warns that patterns without useful trigrams may still search every indexed file.

The other tradeoff is freshness. Indexes can lag behind the filesystem, so a search that has to see the current files needs `--no-index`. That matters for an agent searching for its own edit.

## Where It Fits in Our Workflow

We haven't run it, and for a single repo here we probably don't need it. Our `content` repo has about 5,600 tracked files, well below the smallest repo in that table, where the Linux gain is already small.

The more interesting case is the tree as a whole. The `pseudomonorepos` skill tells agents to search before creating anything, and that means searching across 27 projects. There are roughly 450,000 files under the monorepo root on disk, excluding `node_modules` and `.git`. We haven't checked how many are gitignored, so the searchable number would be lower, but it could be large enough to show a benefit. The README says builds exclude nested repositories' Git internals, which suggests it walks into submodules, though we'd confirm that on a real index.

If we tried it, we'd start at the root with `.tgrep/` gitignored, which the README insists on. We'd also watch the file-watcher load with parallel agent sessions and time some ordinary searches against ripgrep before changing any agent's habits.

## Install

```bash
brew install tgrep
tgrep serve .        # builds the index if needed; runs in the foreground
tgrep -- "fn main" . # in another terminal
```

Source: <https://github.com/microsoft/tgrep>
