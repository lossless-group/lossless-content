---
date_created: 2026-11-03
date_modified: 2026-11-03
title: agent-desktop — Computer Use Through the Accessibility Tree
slug: agent-desktop-computer-use-accessibility-tree
tags: [Developer-Tools, AI-Agents, Computer-Use, Accessibility, Desktop-Automation, Rust, Homebrew]
homepage: https://agent-browser.dev/desktop
github_repo_url: https://github.com/vercel-labs/agent-desktop
brew_page: https://formulae.brew.sh/formula/agent-desktop
install: brew install agent-desktop
---

https://agent-browser.dev/desktop

## Why This Matters

Computer use usually means an agent looking at screenshots and guessing at pixels, which is expensive in tokens and fragile. `agent-desktop`, from Vercel Labs, reads the operating system's accessibility tree instead and returns it as JSON, with a ref for every element an agent can act on. The agent acts on a ref, reads the UI again to check the result, and repeats.

It's the same reasoning behind our browser-drive rule, which prefers accessibility snapshots to screenshots because raster is token-expensive. This applies that idea to native apps.

It landed in Homebrew core on November 3, 2026 at version 1.0.2. Apache-2.0, written in Rust. The details below reflect 1.1.0, checked November 3, 2026.

## What It Actually Does

- **Snapshots and refs.** `snapshot --app Finder -i` lists interactive elements. Refs carry their snapshot's id, so a stale one fails with `STALE_REF` instead of clicking the wrong thing.
- **Map, then drill.** A skeleton view followed by a drill-down into one region keeps output small.
- **Cross-platform.** One set of 60 command names over the AX API on macOS, UI Automation on Windows, and AT-SPI on Linux. Four of them refuse to run for now.
- **Background actions.** Actions are headless by default, with no pointer movement or focus change. `--headed` sends physical input.
- **No model inside.** It's a tool, not an agent. Every command prints one JSON envelope and exits, and it also ships as a C library.
- **Skills included.** The binary carries version-matched guides (`agent-desktop skills get desktop`).

It's also clear about its limits. It doesn't automate web pages, which is the job of its sibling `agent-browser`, and it can't see a UI that publishes no accessibility tree. A successful action doesn't prove the UI changed, which is why the loop ends with a read.

## The Privacy Warning

The README says it near the top: snapshots, clipboard reads, screenshots, command output, and debug artifacts can contain private desktop content, and should stay out of public logs and uploads.

This one touches us directly. Whatever a tool returns lands in the session transcript, and our session ingest writes tool output into the local `claude-code-tool-traces` Chroma collection. That script redacts by pattern, catching tokens and env-var lines, so it wouldn't catch an email, a message, or a contact name read off a window. It also isn't limited to the app you meant. A clipboard read returns whatever you last copied.

## Where It Fits in Our Workflow

We haven't run it, and we don't have an obvious need today. Our browser drives use Playwright MCP, wired per repo as in `ai-labs/augment-it`, and this doesn't replace that because it doesn't drive web pages. The candidates would be desktop-only surfaces, which we'd need to name before installing anything.

If we did try it, our browser-drive rules carry over, with one complication. Rule 3 says reads are unrestricted and writes go only against a safe target. On a browser that's a test site. A desktop is the operator's real mail, CRM, and files, so "reads are unrestricted" is the wrong default here. We'd use a separate macOS user account or a VM. The macOS Accessibility grant goes to the app that runs `agent-desktop`, so it's worth thinking about what else that app can do once it has the grant.

## Install

```bash
brew install agent-desktop
agent-desktop status              # platform, permissions, supported surfaces
agent-desktop permissions --guide # macOS: walks through the Accessibility grant
```

Source: <https://github.com/vercel-labs/agent-desktop>
