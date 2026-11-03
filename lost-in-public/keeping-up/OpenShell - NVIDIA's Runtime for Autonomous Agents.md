---
date_created: 2026-10-01
date_modified: 2026-10-01
title: OpenShell — NVIDIA's Runtime for Autonomous Agents
slug: openshell-nvidia-runtime-autonomous-agents
tags: [Developer-Tools, AI-Agents, Agent-Sandboxes, Security, Formal-Verification, NVIDIA, Rust, Homebrew]
homepage: https://docs.nvidia.com/openshell/latest/
github_repo_url: https://github.com/NVIDIA/OpenShell
brew_page: https://formulae.brew.sh/formula/openshell
install: brew install openshell
---

https://github.com/NVIDIA/OpenShell

## Why This Matters

Agents are most useful when they can read files, install packages, call APIs, and use credentials. OpenShell is NVIDIA's answer: you declare what each agent can touch in a policy, and the runtime enforces it from below the agent.

Two claims set it apart from a typical sandbox. NVIDIA says enforcement reaches every file access, system call, and network connection, and that policy changes pass through formal verification before approval.

OpenShell landed in Homebrew core on October 1, 2026 at version 0.1.2. Apache-2.0, written in Rust. The details below reflect 0.1.6, checked November 3, 2026.

## What It Actually Does

- **Kernel confinement.** Each agent runs in a sandbox using Landlock and seccomp, and network connections pass a policy check before leaving.
- **Credentials held outside.** Per the README, "Agents never see real credentials." OpenShell adds them only to requests bound for approved endpoints.
- **A policy prover.** `openshell-prover` flags risky new access in a proposed policy. The Homebrew formula depends on the Z3 solver, and its test expects a counterexample when a candidate policy adds write access to `/tmp` beyond a read-only boundary.
- **Several runtimes.** Docker, Podman, Kubernetes through Helm, and microVMs.
- **Agent-neutral by design.** The docs say it "can run any agent that is available in a sandbox image." Their worked examples use OpenCode and Pi with OpenRouter.

## What to Check First

**macOS enforcement happens in a VM.** The support matrix is explicit: "On macOS, these kernel modules run inside the Docker Desktop Linux VM, not on the host kernel."

**Homebrew core differs from the quickstart.** The quickstart is a `curl | sh` script that sets up a local gateway, and NVIDIA documents it running as a Homebrew service. Its uninstall steps name `nvidia/openshell/openshell`, a separate tap. The core formula we read installs the CLI, prover, and gateway binaries with no service block, so you would need to start and register a gateway yourself. It also compiles out the gateway telemetry that NVIDIA's own builds collect by default.

**It's still 0.1.x.** The docs say the current qualification profile "covers part of the complete release qualification policy," and interfaces marked Experimental may change in a patch release.

## Where It Fits in Our Workflow

We haven't run it. The natural candidate is unattended work, such as the agent loops proven in `ai-labs/augment-it/context-v/loops/`, rather than interactive sessions where a person is watching.

The same obstacle we noted for [[ArcBox - An Open-Source Runtime for Containers, VMs and Agent Sandboxes|ArcBox]] applies here. A pseudomonorepo with nested submodules has to get into the sandbox somehow, and the agent has to be built into an image. We also found no Claude Code walkthrough in the pages we read, so how a subscription login would work is an open question.

The credential model is the part we'd most like to study, given how close our agents work to `.env` files and CRM connectors. The prover is the easy first step, since it checks local policy files without a sandbox. OpenShell also pairs naturally with a decision layer like [[Kontext - Local Policy for Agents, and Why It Fails Open|Kontext]], with one sharp difference: OpenShell's docs say a disabled Landlock LSM or blocked seccomp operation makes launch "fail closed."

## Install

```bash
brew install openshell
openshell --version
openshell-prover check candidate.yaml --boundary boundary.yaml
```

For the gateway set up for you, NVIDIA's route is a piped script, which is exactly what [[bashka - Static Checks for curl-to-bash Installs|bashka]] exists to inspect:

```bash
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh | sh
openshell sandbox create --name demo
```

Sources: <https://github.com/NVIDIA/OpenShell> · <https://docs.nvidia.com/openshell/latest/about/support-matrix>
