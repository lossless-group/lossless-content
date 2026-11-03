---
date_created: 2026-07-27
date_modified: 2026-07-27
title: mcpsnoop — Wireshark for MCP
slug: mcpsnoop-wireshark-for-mcp
tags: [Developer-Tools, Model-Context-Protocol, Observability, OpenTelemetry, TUI, Go, Homebrew]
github_repo_url: https://github.com/kerlenton/mcpsnoop
brew_page: https://formulae.brew.sh/formula/mcpsnoop
install: brew install mcpsnoop
---

https://github.com/kerlenton/mcpsnoop

## Why This Matters

Debugging an [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] server usually means guessing. A tool silently isn't called, capabilities don't line up, or a call just hangs, and you end up digging through logs.

The official MCP Inspector doesn't solve this, because it connects as its own client. It never sees what *your* client (Claude Code, Cursor, Codex) actually sends. `mcpsnoop` sits in the real data path instead: wrap your server command with it, and it records every JSON-RPC frame between your real client and your real server, with no change to either.

It landed in Homebrew core on July 27, 2026 at version 0.16.0, about a month after the repo was created. MIT licensed, written in Go. It has kept moving quickly, and the details below reflect 0.28.0, checked November 3, 2026.

## What It Actually Does

- **Live view.** A terminal UI shows frames as they happen, and on stdio it shows the server's `stderr` beside them.
- **Try it instantly.** `mcpsnoop demo` works with nothing set up.
- **Config wrapping.** `mcpsnoop wrap my-server` edits `claude_desktop_config.json` for one server and keeps a backup, and `unwrap` restores it.
- **CI gate.** A GitHub Action checks a captured session, files findings as code scanning alerts, and fails the job on what you've gated.
- **Replay.** Record one session with your real client, commit it, and replay it against every build with no model or API key. The job also fails if the server got worse than in the recording.
- **OpenTelemetry.** Exports spans that follow the semantic conventions for MCP, either from a capture or live as calls complete. This matters more now that MCP revision 2026-07-28 deprecates protocol-level logging in favor of `stderr` and OpenTelemetry.

## Where It Fits in Our Workflow

This looks like the most immediately useful tool in this batch for us. We run a growing set of MCP servers, including Chroma over our corpus, and our own connectors for CRMs and other systems. "Why didn't the agent call that tool?" is a recurring question, and it's one you can't answer from server logs, since a call the model never made leaves no trace on the server. mcpsnoop shows what the client actually offered and sent.

The replay feature is the one to try first for servers we build ourselves. A committed session that runs in CI with no API key would be an inexpensive regression test against real client behavior.

One caution of our own: captures record real traffic, so assume they can contain tokens, customer data, or private content. Review a session before committing it as a test fixture, particularly from anything touching a CRM. We haven't run it yet.

## Install

```bash
brew install mcpsnoop
mcpsnoop demo
```

To use it for real, put it in front of your server's command in your MCP config:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "mcpsnoop",
      "args": ["--", "node", "build/index.js"]
    }
  }
}
```

Source: <https://github.com/kerlenton/mcpsnoop>
