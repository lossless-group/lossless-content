---
date_created: 2026-08-11
date_modified: 2026-08-11
title: Unsloth Desktop — Run and Train Open Models in One App
slug: unsloth-desktop-run-train-open-models-one-app
tags: [Developer-Tools, Local-AI, Fine-Tuning, Inference, MLX, Apple-Silicon, Open-Source, Homebrew]
homepage: https://unsloth.ai/
github_repo_url: https://github.com/unslothai/unsloth
brew_page: https://formulae.brew.sh/cask/unsloth
install: brew install --cask unsloth
---

https://github.com/unslothai/unsloth

## Why This Matters

[[tooling/AI-Toolkit/Unsloth|Unsloth]] made its name as a Python library for [[concepts/Explainers for AI/Fine Tuning|fine-tuning]] on NVIDIA GPUs. On August 11, 2026 it published Unsloth Desktop, a beta app that puts running models, training them, and connecting them to coding agents in one window. Unsloth calls it "the first desktop app to run and train models." We haven't tested that claim, but no-code training next to local chat is the part that sets it apart from a plain model runner.

The Homebrew cask pull request opened August 20 and merged August 26, 2026, at version 0.1.803-beta. The PR's title still says 0.1.800-beta because the version was refreshed just before merge. The app has no stable release, and the PR said so when claiming Homebrew's exception for that.

Everything below reflects 0.1.914-beta and the `main` branch, checked November 3, 2026. That's 32 tagged releases in 12 weeks, counting the launch, so details will move. The repo had 79,014 stars on the same date, but that count is shared with the library and says little about the app.

## What It Actually Does

One repo holds three things at different stages:

| | Unsloth Core | Unsloth Studio | Unsloth Desktop |
|---|---|---|---|
| **What it is** | Python library | Browser UI, `unsloth studio` | Tauri app around Studio |
| **First shipped** | Repo created November 2023 | March 17, 2026 | August 11, 2026 |
| **Maturity** | Date-versioned, 2026.11.1 on PyPI | Beta | Beta |
| **License** | Apache-2.0 | AGPL-3.0-only | AGPL-3.0-only |
| **On a Mac** | Not in the README's install steps | MLX training since May 2026 | Same as Studio |

Per the vendor's docs, the app covers:

- **Running models.** GGUF through llama.cpp, MLX on Apple Silicon, image, video, and audio models, plus an OpenAI-compatible API.
- **Training.** No-code LoRA and full fine-tuning, with datasets built from PDF, CSV, or DOCX files and export to GGUF.
- **Agents.** `unsloth start claude` points [[tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude Code]] at a local model, and Codex, OpenCode, Pi, and others work the same way. The docs say the provider configuration is session-scoped and isn't added to the agent's normal config files.
- **Tools.** Python and Bash execution, DuckDuckGo-backed web search, [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]], and "self-healing" tool calls that Unsloth says are up to 50% more accurate.

## Mac and NVIDIA Take Different Paths

The headline "2x faster with 70% less VRAM" is a training claim, and Unsloth's benchmark page says it "recorded benchmarks on NVIDIA GPUs." We found no equivalent number for Macs.

Macs use a separate path. [PR #5265](https://github.com/unslothai/unsloth/pull/5265) routes Studio training through [[tooling/AI-Toolkit/AI Programming Frameworks/MLX|MLX]], "replacing the torch / `SFTTrainer` path that doesn't run on Mac." It merged in May 2026, so Mac training is about six months old.

| | Apple Silicon Mac | NVIDIA on Linux or Windows |
|---|---|---|
| **Studio and Desktop training** | Through MLX | Through PyTorch and CUDA |
| **Needs** | No GPU drivers | NVIDIA drivers, plus the CUDA toolkit on Linux (12.4+ recommended) |
| **Core library** | Requirements page says Apple Silicon/MLX is "in the works" | Supported, minimum CUDA capability 7.0 |
| **Published speed claims** | None we found | Yes, on H100, A100, and Blackwell GPUs |

The docs say training, MLX, and GGUF inference are "ALL supported" on Mac, and the code is narrower than that. On `main`, the training route rejects these on MLX:

- continued pretraining
- embedding models
- audio datasets
- LoftQ
- streaming datasets

Export refuses FP8, FP4, and INT quantization on macOS and says to use 16-bit or GGUF. One changelog entry says MLX added streaming datasets and continued pretraining, which doesn't match the route, so we'd test before planning around either.

Unsloth's memory table is written in GPU VRAM and calls its figures absolute minimums. An 8B model needs 6 GB for 4-bit QLoRA and 22 GB for 16-bit LoRA. A 27B model needs 22 GB and 64 GB. For local coding agents, its Claude Code guide suggests a 24 GB unified-memory machine.

## Read "100% Local" Closely

The site says "Open-source. Free. 100% Local." The FAQ says "No telemetry" and that the app can run entirely offline. We didn't audit that, and a few features do reach out by design:

- model downloads from Hugging Face
- app updates from GitHub
- web search
- connections to OpenAI, Anthropic, or OpenRouter
- the Cloudflare tunnel for remote access

We found no paid Unsloth tier or required account. Hosted providers need your own API key or subscription.

Tool execution is the bigger risk. The docs say server-side tools "run as your user and are on by default," and "Anyone who can reach the server with the API key can run code on this machine." They advise `--disable-tools` when exposing it. OS-level sandboxing arrived October 8 in 0.1.905-beta, after the cask merged, using Seatbelt on Mac. The lower "software" mode is regex, string, and AST checks by the vendor's own description, and "Full Access" turns all of it off.

## The License Is Split

Both licenses are open source, and neither is source-available. GitHub's sidebar shows only Apache-2.0, which undersells the split. `COPYING` holds the AGPL, Studio's backend files carry `AGPL-3.0-only` headers, and the desktop bundle declares the same.

The boundary doesn't follow the package either. PyPI lists `unsloth` as Apache-2.0, but the 2026.11.1 wheel also contains `studio/backend`, along with both license files. MLX training also leans on `unsloth-zoo`, which GitHub lists as LGPL-3.0. Running it unmodified for ourselves is the simple case, but AGPL's network clause matters if we ever modify Studio and offer it to others. Model weights and datasets carry their own terms.

## Where It Fits in Our Workflow

The fit is narrow, and we haven't run it. Our machines are Macs, so we'd get the younger training path, without the published speed numbers or the Core library. We also have no fine-tuning project today. Our local corpus in Chroma handles retrieval, and a search of it turned up no local-model work to plug this into.

The cheap experiment is `unsloth start claude` against a local model in one non-client repo, compared with what [[tooling/AI-Toolkit/AI Interfaces/AI Workspaces/LM Studio|LM Studio]] or [[tooling/AI-Toolkit/AI Interfaces/OLlama|Ollama]] already offer. Its Claude Code guide also says Claude Code's attribution header invalidates the local model's cache and makes inference "90% slower." It fixes that with a settings change, and we'd apply that per session rather than globally.

If we did need to train something real, we'd try the free Colab notebook or a rented NVIDIA GPU, where the speed claims apply, then export to GGUF and run the result on a Mac. For client data, we'd leave the tunnel off and keep the OS sandbox on, and we'd confirm the network paths ourselves first.

## Install

```bash
brew install --cask unsloth
```

- **Architecture.** On macOS the cask requires Apple Silicon, though Unsloth's site offers its `.dmg` for Intel too.
- **What you get.** Unsloth's Mac install page files this command under manual Studio installs and says that section "does not install Unsloth Desktop." The cask does install the desktop app: `Unsloth.app`. It declares no `binary`, so we'd confirm `unsloth` is on the path before relying on `unsloth start`.
- **First launch.** The 0.1.803-beta `.dmg` is about 45 MB, and the app then runs its own setup. Its upgrade from a Chat-only to a full install asks for at least 5 GB, before any model files.
- **Updates.** The cask is marked `auto_updates`, and the app updates itself from GitHub Releases.
- **Removal.** `brew uninstall --zap --cask unsloth` also clears `~/.unsloth/studio`. The docs place chats, checkpoints, and exports under `~/.unsloth`, so copy out anything you trained first. The Hugging Face model cache isn't in the zap list.

Source: <https://github.com/unslothai/unsloth>
