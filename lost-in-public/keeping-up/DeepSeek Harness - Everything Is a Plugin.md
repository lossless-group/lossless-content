---
date_created: 2026-08-13
date_modified: 2026-08-13
title: DeepSeek Harness — Everything Is a Plugin
slug: deepseek-harness-everything-is-a-plugin
tags: [Developer-Tools, AI-Agents, Agent-Harnesses, Open-Source, DeepSeek, Plugins, Homebrew]
homepage: https://www.deepseek.com/harness/
github_repo_url: https://github.com/deepseek-ai/deepseek-harness
brew_page: https://formulae.brew.sh/cask/deepseek-harness
install: brew install --cask deepseek-harness
---

https://github.com/deepseek-ai/deepseek-harness

## Why This Matters

DeepSeek open-sourced its agent harness, `dsh`, under MIT on August 13, 2026. [The New Stack reported](https://thenewstack.io/deepseek-harness-open-source-plugins/) more than 33,000 GitHub stars within hours. As of November 3 the repo shows 270,946 stars and 32,955 forks.

The design claim is the interesting part. The model adapter, tool registry, session log, and agent loop are all plugins, with "no privileged core to patch." It is built on Cordis, a composition framework described in a paper with Peking University and DeepSeek authors.

Homebrew came later. The cask landed on September 29, 2026, at 0.2.0-rc.2, with its pull request merged the next day. It installs the desktop app that [arrived with v0.2](https://www.marktechpost.com/2026/10/03/deepseek-harness-v0-2-brings-official-desktop-apps-to-its-open-source-agent-harness/). The details below reflect cask version 0.2.1-rc.5, checked November 3, 2026. The repo is already at 0.2.2-alpha.3.

## What It Actually Does

- **Presets.** Standard is a full coding agent. Minimal strips it down, and MarkTechPost reports DeepSeek uses it for benchmark runs. Creator is for building plugins and presets. A fourth mode has the model write code against its tools instead of calling them one at a time.
- **Provider choice.** Per The New Stack, nothing ties it to DeepSeek's models. The catalog covers Anthropic, OpenAI, Bedrock, Azure, and Google, plus custom endpoints.
- **Delegation.** Disabled-by-default subagent providers hand work to Claude Code or Codex using your own installed binary and login.
- **One event stream.** Resume, fork, replay, and the web UI all build on an append-only session log.
- **Compatibility.** It has an MCP client and reads `AGENTS.md` and `CLAUDE.md`.

## The Limits

**No outside pull requests.** We verified this one. `CONTRIBUTING.md` says "we cannot accept external pull requests at the moment," GitHub's API reports pull requests turned off for the repo, and Issues are off too. Bug reports go to GitHub Discussions. The team says it's "very small" and may not reply to every post. You can fork the code and write plugins, but you can't send a fix upstream.

**Not audited.** `SAFETY.md` says the project "has not undergone a security audit and must not be treated as secure or production-ready," and recommends a disposable VM or container. It also warns that sandboxing doesn't guarantee isolation.

**Moving target.** The README promises compatibility-breaking changes during the developer preview. An experimental Claude Code Mods layer shipped in 0.2.1-alpha.1, and its release notes say the aim is to test whether the Mods API is broadly a subset of `dsh` plugins, not to offer full compatibility.

## Where It Fits in Our Workflow

We haven't run it, and the most useful first step wouldn't involve running it. `ai-labs/studies/agent-harnesses/` pins harnesses such as `opencode`, `pi`, and `goose` for reading, and this repo isn't there yet. It belongs in that study as the strongest example of a harness with no fixed core.

As a daily driver, the fit is weak. Claude Code already carries our skills, and the star count tells us about attention, not about whether a tool suits a 27-project tree. If we pilot it, the safety notice sets the terms: a container, a throwaway repo, no client content, and a deliberate choice of model provider, since sending code to DeepSeek's own endpoint is only one of the options. The Claude Code subagent could be worth a look there, since it delegates to the tool we already use.

## Install

```bash
brew install --cask deepseek-harness   # Apple silicon desktop app
npx @deepseek-ai/dsh web               # or the Web UI, from npm
```

Sources: <https://github.com/deepseek-ai/deepseek-harness> · <https://thenewstack.io/deepseek-harness-open-source-plugins/>
