---
date_created: 2026-09-01
date_modified: 2026-09-01
title: SkillSpector — NVIDIA's Security Scanner for Agent Skills
slug: skillspector-nvidia-security-scanner-agent-skills
tags: [Developer-Tools, AI-Agents, Agent-Skills, Security, Supply-Chain, NVIDIA, Python, Homebrew]
homepage: https://docs.nvidia.com/skills/scanning-agent-skills
github_repo_url: https://github.com/NVIDIA/SkillSpector
brew_page: https://formulae.brew.sh/formula/skillspector
install: brew install skillspector
---

https://github.com/NVIDIA/SkillSpector

## Why This Matters

A skill is instructions and sometimes scripts, loaded into an agent that already has your permissions. SkillSpector asks one question: "Is this skill safe to install?"

Its README leads with a striking number from [Agent Skills in the Wild](https://arxiv.org/abs/2601.10338) (Liu et al., 2026): of 31,132 analyzed skills, 26.1% contained at least one vulnerability and 5.2% showed patterns suggesting malicious intent. The paper itself says the 26.1% figure "requires careful interpretation." A [later study](https://arxiv.org/abs/2602.06547v1/) behaviorally verified 98,380 skills from community registries and confirmed 157 as malicious. The datasets and methods differ, so these figures aren't directly comparable. Pattern matches and confirmed attacks are different measurements.

The Homebrew pull request opened August 4, 2026 and merged on September 1 at version 2.11.0. Apache-2.0, written in Python. The details below reflect 2.13.3, checked November 3, 2026.

## What It Actually Does

- **Static analysis.** NVIDIA lists 71 patterns across 17 categories, using regex, Python AST checks, and YARA signatures. It never executes the skill.
- **LLM review.** A second stage evaluates context and intent. Findings the model doesn't confirm stay in the report, tagged rather than dropped.
- **Dependency checks.** It queries OSV.dev for known vulnerabilities, with a small offline fallback list.
- **Usable output.** A 0 to 100 risk score, plus JSON, Markdown, and SARIF reports, and a baseline file for accepted findings.
- **An MCP server.** `skillspector mcp` lets an agent gate its own installs. It requires the `mcp` extra, and we didn't find those packages in the Homebrew formula's resources, so expect to use the `uv` install for this.

## Read Before Scanning

- **LLM analysis is on by default**, and it sends file contents to your configured provider. Use `--no-llm` to keep contents local.
- **OSV lookups always run.** Dependency names and versions go to OSV.dev even with `--no-llm`.
- **The default exit code is lenient.** `SAFE` and `CAUTION` both exit `0`, so a CI gate needs `--fail-on-findings` or its own policy on the JSON.
- **It's "defense-in-depth, not a sandbox."** NVIDIA describes the static stage as moderate precision.

## Where It Fits in Our Workflow

This is directly relevant, and we haven't run it. Our skills live in one repo, `lossless-agent-skills`, mounted at `context-v/agent-skills/`. It holds 36 skills as direct children, plus vendored upstream skills in `archify` and `chroma-agent-skills`. Its only GitHub workflow today is `pages.yml`, so nothing scans a skill on push.

The vendored submodules are the most obvious target. We don't write them and our rules forbid committing inside them, so we can't fix a finding there. We can only review it before bumping the pointer, which makes a submodule bump the natural moment for a scan. [[APM - Microsoft's Dependency Manager for Agent Configuration|APM]] and [[Skills Manager - Sync Agent Skills Across Coding Tools|Skills Manager]] address how skills get distributed, but neither one replaces reading what's in them.

For our own skills, expect noise. Skills that discuss secrets, fetch pages, or instruct an agent firmly may trip patterns, and a triaged baseline would absorb that. One practical snag: the README on `main` documents a `--recursive` mode that defaults to 32 skills. We have 36, so it would need `--max-skills`, and that flag isn't in the 2.13.3 README. For the Homebrew version, a loop is simpler. It also won't reach the vendored skills nested a level deeper.

## Install

```bash
brew install skillspector
cd context-v/agent-skills
for d in */; do
  [ -f "$d/SKILL.md" ] && skillspector scan "$d" --no-llm --format json --output "/tmp/${d%/}.json"
done
```

Source: <https://github.com/NVIDIA/SkillSpector>
