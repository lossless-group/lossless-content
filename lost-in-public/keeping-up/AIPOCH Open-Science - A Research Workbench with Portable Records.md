---
date_created: 2026-10-14
date_modified: 2026-10-14
title: AIPOCH Open-Science — A Research Workbench with Portable Records
slug: aipoch-open-science-research-workbench-portable-records
tags: [AI-Agents, AI-Research, Research-Tools, Model-Context-Protocol, Agent-Skills, Local-First, Open-Source, Homebrew]
homepage: https://aipoch.com/open-science
github_repo_url: https://github.com/aipoch/open-science
brew_page: https://formulae.brew.sh/cask/open-science
install: brew install --cask open-science
---

https://aipoch.com/open-science

## Why This Matters

Plenty of agent tools can write an analysis. Far fewer help the next person check how it was made. AIPOCH Open-Science is a desktop workbench that keeps the agent, the Python and R runs, the papers, and the outputs in one project. It can then export a chosen slice of that work as a `.science` package: conversation branches, file versions, notebook records, and verification evidence.

The receiving side is the careful part. By the README's account, an imported package is read-only, and opening it doesn't run code, call a model, or restore credentials. To continue the work, you make a writable copy. Verification records in a package describe the sender's checks, not a rerun on your machine.

AIPOCH, whose GitHub organization lists Singapore, announced the formal public release on October 14, 2026, alongside v1.0.0 and an arXiv preprint submitted two days earlier. That's the bigger news, so this post is dated to it. The cask landed in Homebrew earlier, on September 7, 2026, at version 0.26.0, in a pull request from the repo's top committer.

It's Apache-2.0 licensed and written in TypeScript. This is real open source, not source-available, and the site says it needs no seat license. Checked November 3, 2026: version 1.0.7, about 5,400 GitHub stars, and 550 forks. The details below reflect the README and docs on that date, and they're moving quickly. The launch press release claimed 36 connectors and four agent backends.

## What It Actually Does

- **Agent backends.** Claude Code, OpenCode, Codex, CodeBuddy, and Pi, the last added in 1.0.7. Which model providers work depends on the backend and the API protocol it speaks.
- **Models.** 25 preset providers, Claude and Codex subscription logins, xAI sign-in, or a custom gateway.
- **Execution.** Python, R, notebook, and shell work runs locally, or on SSH hosts and [[Slurm Workload Manager|Slurm]] clusters you've set up. Managed cloud GPUs were out of scope at 1.0.
- **Provenance.** Each artifact is an immutable, checksummed version, linked to whatever producer code, inputs, execution history, and environment details were captured. The README says evidence it can't verify is marked unavailable, not inferred.
- **Literature.** A reference library with PDF reading and annotation, Semantic Scholar discovery, BibTeX and RIS export, screening against your criteria, and a one-way import from [[Zotero]] 10 or later.
- **Extensions.** 48 built-in connectors, 24 built-in [[Agent Skills|skills]], 525 more in a marketplace, and 10 installable Specialist agent profiles.
- **[[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] in both directions.** You can add custom local or remote MCP servers as connectors. Since v1.0.4, the standalone CLI can also act as a server through `open-science mcp`, over local stdio only.

## Does "Local-First" Hold Up?

For storage, yes. For the work itself, only as far as you configure it. The project says so too: its roadmap states that "local-first does not mean automatically offline."

| Part | Where it runs |
|---|---|
| Projects, sessions, files, artifact versions, provenance, logs | Local, per the README. Logs aren't uploaded automatically |
| API keys | Local, in the OS credential store when one is available |
| Python, R, and shell execution | Local, unless you choose a remote host |
| The model | Wherever you point it. Setup asks you to validate a model connection, and the README describes no bundled chat model |
| Connectors, web search, Crossref checks | External services, which receive the query or tool arguments |
| Updates, marketplace catalogs, runtime and model downloads | The app can contact these services. The cask is marked `auto_updates` |
| Phone access | Goes through Remote.It and needs a signed-in account there |

A fully local setup looks possible on paper. Custom gateways on loopback addresses can skip HTTPS and API keys, with presets for [[OLlama|Ollama]], LM Studio, llama.cpp, and vLLM. But the README's benchmarks name GPT and DeepSeek models, not a local setup, so they say little about how this performs on a model running on your own machine.

We found no AIPOCH account requirement in the README or docs we read. The costs sit elsewhere: the site says model, data, and compute providers may charge separately. The Apache license covers the workbench, not the third-party agent runtimes and models it drives.

Two limits in AIPOCH's own security docs matter more than the marketing line:

- **The sandbox has gaps.** Notebook and shell processes are confined on macOS and Linux, but agent-native file tools run outside that sandbox, under whatever rules the chosen backend applies.
- **The network boundary isn't an allowlist.** The command gateway can allow HTTPS GET and HEAD requests to otherwise unknown public hosts, and the docs warn that paths and query strings can still carry sensitive data.

The known-limitations file also tells you to measure traffic from each runtime and version yourself before claiming it's offline or free of telemetry. Environment flags alone don't establish that. We respect the candor, and it means the "local-first" label can't stand in for that check on client or patient data.

## Read the Benchmarks and the Author List Carefully

The README badge advertises the "highest scores in reported benchmark comparisons" across AstaBench, ASI-Bench, and BiomniBench-DA. Its fine print is more modest. These are self-reported local or internal runs, not official leaderboard submissions, and they weren't rerun for the current release. The README also says numerical gaps don't establish statistically significant improvements. One of the ASI-Bench margins is 0.02 points.

The press release says the preprint's authors span 76 institutions beyond AIPOCH, and that this shows the approach has been "validated by many of the participating institutions." The paper itself is narrower. Its abstract describes a controlled test of whether `.science` exports preserve version and review relationships, plus one case that reproduced two saved CSV tables byte for byte. That's useful evidence about a file format. It isn't evidence that the agents do good science, and AIPOCH's own docs say provenance and review findings don't establish scientific validity.

The pace is worth weighing as well. We counted 81 tagged releases between July 10 and November 2, 2026, and security fixes go only to the latest stable release and `main`, with no backports.

## Where It Fits in Our Workflow

We haven't run it, and we aren't its core user. We don't run bioinformatics pipelines, and much of the catalog leans toward the life sciences. What interests us is the record format. Our Chroma collections, like [[deja-vu - Local Memory Across Your Agent Sessions|deja-vu]], help find what happened in past sessions. [[ThoughtDAG - A Canvas Where Wires Are the Context|ThoughtDAG]] hands context to the next session. `.science` tries to make a session a reviewable object you can pass to another person, with explicit gaps where evidence is missing. That design, which AIPOCH says is informed by the RO-Crate standard for packaging research data, belongs in the `open-specs-and-standards` study under `ai-labs/studies/`.

If we tried it, we'd start with a public dataset and "Ask for approval" mode, then export a package and inspect it on a second machine. Three cautions:

- The shared Claude subscription mode stores its login in the default `~/.claude` profile. We'd use isolated mode to keep it apart from our working setup.
- `open-science mcp` isn't a sandbox or a read-only view. It inherits the profile's permissions, so a connected client can persist changes and incur model costs.
- Marketplace skills and imported connectors are code and instructions from other people. AIPOCH says saving a GitHub skill repository doesn't certify it as safe.

## Install

```bash
brew install --cask open-science
```

The cask installs the desktop app, on macOS 12 or later. A first-run wizard walks through environment, data location, agent runtime, model provider, and an optional notebook runtime. The standalone CLI is separate, from AIPOCH's own tap, and its release may differ from the cask:

```bash
brew install aipoch/tap/open-science
```

Source: <https://github.com/aipoch/open-science>
