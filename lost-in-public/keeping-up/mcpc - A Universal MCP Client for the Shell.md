---
date_created: 2026-10-09
date_modified: 2026-10-09
title: mcpc — A Universal MCP Client for the Shell
slug: mcpc-universal-mcp-client-for-the-shell
tags: [Developer-Tools, Model-Context-Protocol, Command-Line-Tools, AI-Agents, OAuth, TypeScript, Homebrew]
homepage: https://www.npmjs.com/package/@apify/mcpc
github_repo_url: https://github.com/apify/mcpc
brew_page: https://formulae.brew.sh/formula/mcpc
install: brew install mcpc
---

https://github.com/apify/mcpc

## Why This Matters

Most agents use [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] by loading tool definitions into the prompt, and the context bill climbs with every server you add. That cost is the source of the popular conclusion that CLIs beat MCP. `mcpc` from Apify argues the two are complementary: the shell is the local interface, and MCP stays the remote one. Every MCP operation becomes a shell command, so an agent with one `Bash()` tool can reach any server and find tools as it needs them.

It landed in Homebrew core on October 9, 2026 at version 0.7.0. Apache-2.0, written in TypeScript. The details below reflect 0.7.0, which is still the Homebrew version, checked November 3, 2026. The repo has moved on to 0.8.0 betas.

## What It Actually Does

- **Named sessions.** `mcpc connect mcp.apify.com @test` keeps a connection alive, and later commands go through `@test`. Several can run in parallel, and agents on the same machine can share them.
- **Tool discovery on demand.** `mcpc grep <pattern>` searches tools and instructions across active sessions, in place of loading every schema up front.
- **Scripting.** `--json` output composes with `jq` and `xargs`, so a repeatable MCP workflow can be a shell script.
- **Credentials.** OAuth 2.1 profiles, stored in the OS keychain. On headless Linux it falls back to a `0600` file.
- **Credential proxy.** `--proxy` exposes a session as a local MCP server that never hands the original tokens to its clients, for use with sandboxed code.
- **Suspicious config handling.** A bare `mcpc connect` discovers config files, but skips project-scope entries that reference a `${VAR}`, so a checked-in `.mcp.json` can't quietly send your secrets to its server. You have to name the file to trust it.
- **Payments.** Experimental support for the x402 protocol, which we'd leave off.

## Read the Claims as a Vendor's

The README calls `mcpc` the most specification-compliant MCP CLI client available, and it backs that with a comparison table Apify wrote and maintains. The table is useful for finding alternatives, including `mcpdo` from the official Inspector project, but it isn't an independent review. Apify also runs an MCP server of its own, which is the example used throughout the docs.

## Where It Fits in Our Workflow

We haven't run it. The plain use is a smoke test: calling a server from a script without opening an agent session. Our Chroma server is stdio, and bulk connects skip stdio by default, so it has to be named from the root `.mcp.json`. Then the corpus can be queried from a shell, using the `chroma_query_documents` tool our agents already use.

It pairs naturally with [[mcpsnoop - Wireshark for MCP|mcpsnoop]]: one calls a server and the other watches the traffic. There's a limit to that pairing. mcpsnoop's value is showing what your real client sends, and with `mcpc` in front you'd see what `mcpc` sends, not Claude Code. It would give you repeatable traffic to capture, but it wouldn't answer "why didn't the agent call that tool?"

Our caution is about shared sessions. "Authenticate once, reuse everywhere" is convenient, but we run parallel agent sessions and connectors that reach CRMs. Any agent with a shell on that machine could potentially use a saved session, so we'd test with read-only servers and least-privilege tokens first. The README's own advice applies: treat MCP servers the way you treat shells.

## Install

```bash
brew install mcpc
mcpc connect ./.mcp.json:chroma @chroma
mcpc @chroma tools-list
```

Source: <https://github.com/apify/mcpc>
