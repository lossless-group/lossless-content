---
date_created: 2026-09-15
date_modified: 2026-09-15
title: NVIDIA PAIR — A Local Inference Router for Your Home Network
slug: nvidia-pair-local-inference-router-home-network
tags: [Developer-Tools, Local-AI, Inference, Ollama, Privacy, NVIDIA, Go, Homebrew]
github_repo_url: https://github.com/NVIDIA/Personal-AI-Router
brew_page: https://formulae.brew.sh/cask/nvidia-pair
install: brew install --cask nvidia-pair
---

https://github.com/NVIDIA/Personal-AI-Router

## Why This Matters

Multi-agent work creates concurrent requests, and local inference tends to hit one machine's limits quickly. NVIDIA Personal AI Router (PAIR) lets a group of computers on the same network take that load together. Your application talks to a local endpoint, and PAIR routes each request to a node that can serve it.

NVIDIA spells out the limit:

> PAIR routes each independent request to one node. It does **not** pool GPU memory, combine GPUs into a larger logical GPU, shard one model across machines, or split an in-flight inference request between nodes.

So this adds throughput for many separate requests. It won't let you run a model too large for any single machine.

The Homebrew cask pull request opened September 14, 2026 and merged on September 15, at version 0.1.1. Apache-2.0, with services written in Go. The details below reflect 1.0.0, checked November 3, 2026.

## What It Actually Does

- **Mixed clusters.** Windows, Linux, and macOS nodes can pair with each other.
- **Engine management.** It installs and runs Ollama, LM Studio, or llama.cpp.
- **Familiar APIs.** Local proxy endpoints speak Ollama, OpenAI-compatible, and Anthropic Messages formats.
- **PIN pairing.** Machines pair with a six-digit PIN, and paired nodes then use mutual TLS.

## Read the Privacy Sentence Closely

The README's wording is careful:

> Prompts and responses are intended to remain on the local network when every configured client, model source, engine, and node is local.

That's "intended," and conditional on four things being local. The `SECURITY.md` in the 1.0.0 release says so directly: "'Local-first' describes the intended topology. It does not prove that no data leaves the machine or LAN. Inference engines, model catalogs, update systems, applications, and user configuration may contact external services."

The local network isn't a strong boundary either. That same file calls the PIN "low entropy" and says to pair only on a trusted network, and that some discovery and node-information traffic can use plain HTTP. The newer version on `main` adds that anyone on the subnet can read a node's hostname, hardware inventory, and utilization without pairing, and that pairing grants broad cluster authority.

## Other Limits

- **Scheduling sees load, not capacity.** Per the known issues page, it doesn't consider GPU model, available memory, or whether a model is already loaded, so work can land on the slower machine in a mixed cluster.
- **Clients need a node.** Plaintext endpoints accept local requests only. Requester-only clients and request queuing are both still unchecked on the roadmap.

## Where It Fits in Our Workflow

The fit is weak for now, and we haven't run it. The local data layer we describe in `AGENTS.md` is Chroma, which handles retrieval, not inference. In our own docs we found no local inference setup that PAIR would route. It would only make sense if we started running local models on more than one capable machine.

If we did, parallel agent sessions are the workload it describes, and the Anthropic-format endpoint would be worth testing. The privacy sentence sets the rule for client work, though. We'd want to confirm each model source, engine, and application ourselves before telling anyone that prompts stay on the network.

## Install

```bash
brew install --cask nvidia-pair
```

The cask requires macOS 13 or later and ships Apple Silicon and Intel builds. For removal, the README warns that trashing the app leaves a privileged helper registered. The cask's uninstall step only quits the app, so we'd run the bundled script first:

```bash
sudo "/Applications/NVIDIA PAIR.app/Contents/Resources/installer-tools/uninstall-macos.sh"
```

Sources: <https://github.com/NVIDIA/Personal-AI-Router> · <https://github.com/NVIDIA/Personal-AI-Router/blob/main/SECURITY.md>
