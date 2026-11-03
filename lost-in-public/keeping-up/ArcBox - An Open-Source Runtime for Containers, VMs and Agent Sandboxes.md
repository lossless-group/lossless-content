---
date_created: 2026-07-18
date_modified: 2026-07-18
title: ArcBox — An Open-Source Runtime for Containers, VMs and Agent Sandboxes
slug: arcbox-open-source-runtime-containers-vms-agent-sandboxes
tags: [Developer-Tools, AI-Agents, Containers, Virtual-Machines, Agent-Sandboxes, macOS, Rust, Homebrew]
homepage: https://arcbox.dev
github_repo_url: https://github.com/arcboxlabs/arcbox
brew_page: https://formulae.brew.sh/cask/arcbox
install: brew install --cask arcbox
---

https://arcbox.dev

## Why This Matters

ArcBox started as an open-source answer to [[Tooling/Software Development/Developer Experience/OrbStack|OrbStack]] and [[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]] Desktop on the Mac, written from scratch in Rust with its own VMM, VirtIO devices, and network stack. It has since added the feature that matters most to us: disposable microVMs built for coding agents.

The key command is `abctl claude`. It starts [[Tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude Code]] inside a microVM with its own kernel and switches the agent's permission prompts off, because the VM becomes the isolation boundary. That's a real alternative to approving every command or running with no protection at all.

The cask landed in Homebrew on July 18, 2026 at version 1.26.1. The details below reflect desktop 1.39.0, checked November 3, 2026. The project describes itself as in public beta.

## Two Products Share the Name

Keep these separate when reading the site:

- **ArcBox Core and Desktop** is the local runtime this post is about. It's open source under MIT/Apache-2.0 and needs no platform account or cloud control plane.
- **The Agent Computer platform** is a hosted service at arcbox.dev offering persistent machines, sandboxes, and CI runners across five operating systems. It's waitlist or sales-led, and its headline numbers (about 22 ms snapshot restore, about 50 ms warm create) describe that service.

## What the Local Runtime Does

- **Containers.** A drop-in Docker engine, so the Docker CLI, scripts, and Compose files work unchanged. `linux/amd64` images run on Apple Silicon through FEX.
- **Kubernetes.** A local k3s cluster managed by the daemon, with `kubectl` integration.
- **Sandboxes.** Firecracker microVMs nested inside the guest, each with its own kernel. You can build them from templates, images, or Dockerfiles, then checkpoint and restore them.
- **Linux machines.** Full VMs with their own kernel, disk, and distro.
- **macOS guests.** Throwaway macOS VMs cloned from a base image.

## Where It Fits in Our Workflow

The appeal is unattended agent runs that can't touch the host. Nothing from the Mac is mounted into the sandbox: `/workspace` starts empty, the agent clones what it needs, and you copy results out. That's a stronger boundary than a permission prompt, and one you can verify.

The tradeoffs are real, though, and we haven't tested any of this yet. Empty-by-default doesn't suit a pseudomonorepo with submodules unless the agent can clone everything it needs, and the example passes in `ANTHROPIC_API_KEY`, so you'd need to check how that fits a subscription login. It's also still beta software replacing something foundational, so we'd try the sandbox on its own before pointing our Docker context at it.

It extends the thread we started with [[Homebrew Roundup - 2026-06-21|socktainer]], which keeps Docker tooling working on Apple's own container runtime. ArcBox replaces the whole runtime. Its engineering blog is also worth reading for the [August 2026 piece on macOS VM memory](https://arcbox.dev/blog/macos-vm-memory-ratchet), which argues that a Linux VM on macOS can't really give freed RAM back to the host.

## Install

```bash
brew install --cask arcbox
abctl daemon start
abctl docker enable    # optional: makes ArcBox your Docker context
abctl claude           # Claude Code in a disposable microVM
```

Source: <https://github.com/arcboxlabs/arcbox>
