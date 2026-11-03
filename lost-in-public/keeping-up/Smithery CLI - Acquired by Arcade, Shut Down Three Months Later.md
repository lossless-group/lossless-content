---
date_created: 2026-10-31
date_modified: 2026-10-31
title: Smithery CLI — Acquired by Arcade, Shut Down Three Months Later
slug: smithery-cli-acquired-by-arcade-shut-down
tags: [Model-Context-Protocol, Acquisitions, Developer-Tools, Agent-Infrastructure, Shutdowns, Homebrew]
homepage: https://smithery.ai
github_repo_url: https://github.com/arcadeai-labs/smithery-cli
brew_page: https://formulae.brew.sh/formula/smithery-cli
---

https://www.smithery.ai/future

## Why This Matters

Don't install this one. We queued `smithery-cli` as a promising package manager for [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] servers when it appeared in a Homebrew sweep. By the time we went to write it up, the service behind it had gone away.

Smithery was one of the best-known public MCP registries. Arcade.dev [acquired it on August 5, 2026](https://www.arcade.dev/blog/smithery-joins-arcade/), and Smithery's notice set October 31 as the date its connection services would shut down. The acquisition post said Smithery was "still the fastest way" to get a tool running. Under three months later, most of what it ran was scheduled to be gone.

## The Timeline

| Date | Event |
|---|---|
| April 30, 2026 | `@smithery/cli` 4.11.1 published to npm |
| May 31, 2026 | Last release in the CLI repo, under the newer `smithery` npm package (1.2.0) |
| July 8, 2026 | `smithery-cli` lands in Homebrew core at 4.11.1 |
| August 5, 2026 | Arcade.dev announces the acquisition |
| October 31, 2026 | Smithery's stated shutdown date for connection services |

The Homebrew formula arrived after the project had already moved on. It installs `@smithery/cli`, not the newer `smithery` package.

## What Changed

From [Smithery's notice](https://www.smithery.ai/future):

**Stopped working on October 31:**

- Server URLs on `run.tools` and `server.smithery.ai`
- The Smithery API, Connect, and Toolbox
- Smithery accounts and API keys
- The Smithery CLI and SDKs

**Stays:**

- `smithery.ai` as a public, non-proxied directory, now powered by Arcade
- Verified servers, whose pages show the vendor's direct MCP URL

Paid plans were cancelled, with charges since August 5 refunded.

## The Packages Are Still Out There

We're relying on the notice for the shutdown and didn't run the CLI to confirm it. But the packaging hasn't caught up. As of November 3, 2026, Homebrew doesn't flag the formula as deprecated, and neither npm package carries a deprecation notice, although the notice said current versions would be marked. Nothing warns you at install time, so you could still install a CLI that the vendor says no longer works.

## Where It Fits in Our Workflow

No direct damage. We searched our project MCP configs and Claude Code settings and found no references to Smithery or `run.tools`. If you do have one, switch to the vendor's official MCP URL, which the server's Smithery page should list.

The lesson is about the layer rather than the company. A registry that also proxies your traffic and holds your credentials is a dependency with a runtime failure mode: when it closes, your tools stop working. A plain directory that points at direct URLs fails far more gently. That's a good reason to prefer vendors' direct endpoints, and it's the same argument for declaring dependencies against any git host, as [[APM - Microsoft's Dependency Manager for Agent Configuration|APM]] does.

It also says something about where the market is going. As [Forbes noted](https://www.forbes.com/sites/janakirammsv/2026/08/10/arcade-acquires-smithery-to-own-the-agent-tool-supply-chain/), this was the first time an MCP registry with real developer mindshare was bought by a vendor that governs tool execution. Discovery is getting folded into the paid layer that runs the tools.

For us, it's a process lesson too: a verdict in a sweep ages quickly, so check again before writing it up.

Sources: <https://www.smithery.ai/future> · <https://www.arcade.dev/blog/smithery-joins-arcade/>
