---
date_created: 2026-08-24
date_modified: 2026-08-24
title: ThoughtDAG — A Canvas Where Wires Are the Context
slug: thoughtdag-canvas-where-wires-are-the-context
tags: [AI-Interfaces, Context-Engineering, Infinite-Canvas, Claude-Code, Model-Context-Protocol, Open-Source, macOS, Homebrew]
homepage: https://chenxiachan.github.io/thoughtdag/
github_repo_url: https://github.com/chenxiachan/thoughtdag
brew_page: https://formulae.brew.sh/cask/thoughtdag
install: brew install --cask thoughtdag
---

https://chenxiachan.github.io/thoughtdag/

## Why This Matters

In a linear chat, the model's context is whatever came before, and you mostly can't see or change it. `ThoughtDAG` makes that context an object you edit. Each exchange becomes a node, and its one rule is "wires are the context": the app walks a node's incoming wires, orders the relevant ancestors, and builds the messages sent to the model. Disconnect a path and it stays on the canvas but leaves the next request. You can preview that request before sending it.

On a whiteboard, a line is decoration. Here it changes the model's input.

It landed in the Homebrew cask list on August 24, 2026 at version 0.3.28. MIT licensed, written in TypeScript, by Xia Chen, with about 740 GitHub stars. The details below reflect 0.5.27, checked November 3, 2026.

## What It Actually Does

- **Branching from sources.** Ask from a passage in an answer, a PDF, an image, or a web page, and keep the source attached.
- **Session Atlas.** Opens local Claude Code, Codex, DeepSeek Harness, and Pi sessions as graphs. Each turn becomes a node, tool calls attach to it, and subagent runs appear as branches beside the turn that launched them.
- **A mirror, not a rewrite.** The docs say Atlas never rewrites the source session. You can prune and annotate the mirror while the agent keeps running, and new turns append.
- **Handoff.** Compile a node's upstream context to Markdown, paste it into a new CLI session, and mount the result back onto the graph. The docs say plainly this isn't autonomous orchestration.
- **A headless layer.** `npx thoughtdag why src/lib/api.ts` lists the turns that read or changed a file, and `thoughtdag mcp` offers the same over read-only MCP.
- **Models.** Bring your own provider key, or run locally with Ollama or another OpenAI-compatible endpoint.

The project also publishes research, attributed here to its author. One report found the answer a person reads was 1 to 7% of an agent turn's tokens across 3,237 turns, drawn from the author's own logs. Another, a pilot, reports that removing a contaminated subgraph repaired all 162 derailed outcomes in its test. Both are small and self-run, so treat them as interesting, not settled.

## Where It Fits in Our Workflow

We haven't run it. Session Atlas reads the same `~/.claude/projects` transcripts that feed our `claude-code-sessions` and `claude-code-tool-traces` collections, but it answers a different question. Chroma finds things across sessions by search. ThoughtDAG would show you the structure of one long session, including its subagents, which a list of retrieved chunks can't do.

The nearest comparison in our notes is [[Maestri - Canvas for Agent Orchestration|Maestri]], but the wires mean different things. In Maestri, a line lets one live agent prompt another. In ThoughtDAG, a line decides what a model reads. And `thoughtdag why` overlaps with `deja blame` in [[deja-vu - Local Memory Across Your Agent Sessions|deja-vu]], so we probably wouldn't need both.

Three cautions. Remote model calls send the relevant content to your provider, so session history containing client material needs care. The curated context doesn't feed back into the source agent's memory unless you hand it over. And enabling handoff installs a `/thoughtdag` command into the local Claude Code command directory. We'd try it first on one long session we already know, to see whether the graph shows anything the transcript didn't.

## Install

```bash
brew install --cask thoughtdag
```

Open **Agent conversations** from the welcome screen to reach Session Atlas. A [browser demo](https://app.thoughtdag.workers.dev) opens an example canvas without a key.

Source: <https://github.com/chenxiachan/thoughtdag>
