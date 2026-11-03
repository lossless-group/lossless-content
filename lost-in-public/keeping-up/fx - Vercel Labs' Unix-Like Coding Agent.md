---
date_created: 2026-08-23
date_modified: 2026-08-23
title: fx — Vercel Labs' Unix-Like Coding Agent
slug: fx-vercel-labs-unix-like-coding-agent
tags: [Developer-Tools, AI-Agents, Coding-Agents, Vercel, Zig, Terminal, Homebrew]
homepage: https://fx.sh
github_repo_url: https://github.com/vercel-labs/fx
brew_page: https://formulae.brew.sh/formula/fx-agent
install: brew install fx-agent
---

https://fx.sh

## Why This Matters

Most terminal agents take over the screen with a full UI. `fx` from Vercel Labs behaves more like an ordinary command: the conversation prints into your terminal's scrollback, so you can scroll, search, and copy it, and tmux keeps working. It is one native Zig binary with no runtime to install, and scripts can call it like any other program.

The formula pull request opened on August 22, 2026, at version 0.0.5 and merged early on August 23 UTC. The repo itself is only from August 11. Apache-2.0, 3,745 stars. The details below reflect 0.0.16, checked November 3, 2026.

## What It Actually Does

- **Scriptable.** `fx ask --json "summarize the failing tests"` writes the result to stdout and diagnostics to stderr, and exits nonzero on failure.
- **Embeddable.** `fx acp` serves editors over the Agent Client Protocol. `libfx` runs the same agent core from JavaScript, natively or in WebAssembly.
- **Your own shell.** Commands run in your login shell with your aliases and `PATH`.
- **Small on purpose.** Per the README, CI fails a pull request if a benchmarked command such as `fx help` takes longer than 2 ms on Linux. The changelog puts the macOS arm64 binary at 5.97 MiB.
- **Shared conventions.** It follows `AGENTS.md`, including nested files, and discovers skills from `.claude/skills`, `.agents/skills`, and their home-directory equivalents.

The 0.0.16 changelog claims 41% fewer uncached input tokens than 0.0.15 across its caching scenarios. That is Vercel's own comparison between its own versions.

## Caveats

The README's status line is "Experimental. Use at your own risk," and a 0.0.x version number agrees. GitHub's contributor list shows one account, `fazxes`, with 3,753 commits, against 82 for the next, so this is close to a one-person project under the Vercel Labs name.

The default permission mode deserves a look. In `auto`, routine work such as editing project files and running tests goes ahead without asking. Anything else is first checked by a model for prompt injection or malicious behavior. Switch to `ask` if you want to approve each action.

Sign-in is the other thing to check. The documented options are Vercel AI Gateway, a ChatGPT or Grok subscription, or an OpenAI-compatible endpoint such as Ollama or OpenRouter. There's no Claude subscription login. The docs do show Claude models by ID through AI Gateway, so Claude here means gateway billing rather than an existing plan.

The formula also conflicts with Homebrew's existing `fx` formula, because both install an `fx` binary.

## Where It Fits in Our Workflow

We haven't run it. It wouldn't replace Claude Code for us, partly because of that billing point and partly because at 0.0.16 it's too early to build on.

It looks unusually easy to trial, though. Our `AGENTS.md` should work as it is. Our `~/.claude/skills` entries are symlinks into `~/code/lossless-monorepo/context-v/agent-skills/`, and since fx allows links that resolve inside your home folder, the docs suggest they'd load without extra configuration. That would make it a cheap test of how portable our skills really are outside Claude Code.

The other possibility is `fx ask --json` as a small step in a script, on a local model through Ollama. We don't have a specific job waiting for it.

## Install

```bash
brew install fx-agent
fx login          # or: fx login codex, fx login grok
cd your-project
fx
```

Source: <https://github.com/vercel-labs/fx>
