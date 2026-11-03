---
date_created: 2026-07-23
date_modified: 2026-07-23
title: APM — Microsoft's Dependency Manager for Agent Configuration
slug: apm-microsoft-dependency-manager-agent-configuration
tags: [Developer-Tools, AI-Agents, Package-Managers, Agent-Skills, Model-Context-Protocol, Supply-Chain-Security, Homebrew]
homepage: https://microsoft.github.io/apm/
github_repo_url: https://github.com/microsoft/apm
brew_page: https://formulae.brew.sh/formula/apm
install: brew install apm
---

https://microsoft.github.io/apm/

## Why This Matters

Every coding agent now needs instructions, skills, prompts, hooks, plugins, and MCP servers, and most teams set these up by hand on each machine. APM treats that as a dependency problem: declare it in `apm.yml`, run `apm install`, and every developer who clones the repo gets the same agent setup, with a lockfile. Think `package.json`, but for agent configuration.

Two things make this more than another convenience tool. It comes from Microsoft, and it works across harnesses: GitHub Copilot, Claude Code, Grok Build, Cursor, OpenCode, Codex, Gemini, Windsurf, and Kiro. It also treats a prompt as a program and secures it accordingly, which the industry badly needs.

APM landed in Homebrew core on July 23, 2026 at version 0.26.0. MIT licensed. The details below reflect 0.35.0, checked November 3, 2026.

## What It Actually Does

- **Manifest and lockfile.** `apm.yml` declares dependencies, and `apm.lock.yaml` pins the resolved tree with content hashes.
- **Transitive resolution.** Packages can depend on packages, sourced from GitHub, GitLab, Bitbucket, Azure DevOps, or any git host.
- **Content scanning.** Every install checks for hidden Unicode that can hijack an agent, and `apm audit` runs the same checks on demand.
- **Drift detection.** `apm audit` rebuilds the agent context from scratch and diffs it against your working tree to catch hand-edits.
- **MCP trust.** Transitive MCP servers need explicit consent.
- **Org policy.** `apm-policy.yml` lets a security team limit allowed sources and primitives, with inheritance that can only tighten from enterprise to org to repo.
- **SBOM export.** Lockfile contents can be exported as CycloneDX or SPDX.
- **Plugin authoring.** Build plugins with real dependency management, then export standard `plugin.json` packages.
- **`npx skills add` compatibility.** `apm install vercel-labs/agent-skills` follows the same pattern and adds a manifest and lockfile.

## Where It Fits in Our Workflow

We've already felt this exact pain. Our skills live in one repo, `lossless-agent-skills`, and reach each harness through `sync-skills-symlinks.sh` on Macs and GNU Stow on Linux. That setup once left six skills silently invisible because nothing had linked them. APM's manifest and drift checks are aimed at this class of failure.

The models do differ, however. Ours is one source of truth for a person across every project, with edits taking effect immediately. APM is project-scoped and reproducible, built to pin versions per repo. Adopting it wholesale would mean rethinking our "edit skills in one place" rule, and a manifest in each of 27 projects has its own maintenance cost.

The more realistic first step is to borrow from it. We could run `apm audit`-style checks for hidden Unicode against skills we vendor from elsewhere, since that's a real risk today. And for client repos that need a reproducible agent setup, APM could be the right delivery format. We haven't tested either yet.

It's also worth comparing with [[Smithery CLI - Acquired by Arcade, Shut Down Three Months Later|what happened to the Smithery CLI]]. APM installs from any git host, so your agent dependencies don't rely on one registry staying open.

## Install

```bash
brew install apm
apm install    # in a repo with an apm.yml
apm audit      # scan and check for drift
```

Use `brew upgrade apm` rather than `apm self-update` when installed through Homebrew.

Source: <https://github.com/microsoft/apm>
