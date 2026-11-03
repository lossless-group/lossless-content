---
date_created: 2026-07-20
date_modified: 2026-07-20
title: Nativ — A Native Mac App for Local MLX Models
slug: nativ-native-mac-app-local-mlx-models
tags: [Developer-Tools, Local-AI, Inference, MLX, Apple-Silicon, Open-Source, Swift, Homebrew]
homepage: https://runnativ.ai
github_repo_url: https://github.com/Neywa-Labs/nativ
brew_page: https://formulae.brew.sh/cask/nativ
install: brew install --cask nativ
---

https://github.com/Neywa-Labs/nativ

## Why This Matters

Prince Canuma wrote [mlx-vlm](https://github.com/Neywa-Labs/mlx-vlm), the Python library for running vision models on [[tooling/AI-Toolkit/AI Programming Frameworks/MLX|MLX]]. LM Studio's MLX engine pins it as a dependency. On July 20, 2026, Canuma [announced](https://x.com/Prince_Canuma/status/2079259470304362921) Nativ, a macOS app built around that library, and it reached 377 points on [Hacker News](https://news.ycombinator.com/item?id=48982681). Simon Willison [described it](https://simonwillison.net/2026/Jul/21/nativ/) as "similar in shape to LM Studio," with both a chat interface and a localhost API server.

So the author of a library other apps depend on now ships his own app. That's the news, and it's why we date this post to the launch instead of the Homebrew merge.

The Homebrew cask pull request ([#283062](https://github.com/Homebrew/homebrew-cask/pull/283062)) opened and merged on August 25, 2026, at version 0.3.4. A user wrote it with the maintainers' approval, and it had to wait because Homebrew's audit wants a repo to be at least 30 days old.

Nativ is MIT-licensed, including the app. The maker is now Neywa Labs, which describes itself as "a local AI company" and also publishes mlx-vlm and mlx-audio. The repo has moved from `Blaizzy/nativ` to `Neywa-Labs/nativ`, and Canuma isn't the only hand on it: three other contributors have more commits than he does.

Everything below reflects v0.4.4 and the `main` branch, checked November 3, 2026. That's 22 stable releases in about 14 weeks, all still 0.x. The repo had 1,572 stars and 112 forks on the same date.

## What It Actually Does

The word "native" applies to the interface. Nativ is a SwiftUI app that runs a bundled Python server, and the app and any outside tools talk to that server over localhost. The site says "no wrappers, no translation layers," which undersells how much Python is inside. That bundling is probably part of why the `.dmg` is about 426 MB at 0.4.4, up from about 320 MB at 0.3.4.

Per the README and docs, the app covers:

- **Chat.** Streaming responses, image input, reasoning output, and per-response speed metrics.
- **Models.** It finds MLX models in your [[tooling/AI-Toolkit/Hugging Face|Hugging Face]] cache and folders you add, and it downloads new ones with memory-fit warnings. Its v0.1.0 notes say it also detects models installed by LM Studio. GGUF files are excluded from downloads.
- **Local APIs.** OpenAI-compatible chat, Responses, image, audio, embeddings, and model routes, plus Anthropic Messages, at `http://127.0.0.1:8080` by default.
- **Coding tools.** It writes or documents configuration for [[tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude Code]], Codex, Pi, Aider, Goose, OpenCode, and others, plus editors such as Zed and VS Code.
- **Audio.** System-wide dictation, an optional "Hey Nativ" wake word that's off by default, and a transcript library. Meeting diarization arrived in 0.4.4.
- **Images.** Local generation and editing with compatible MLX image models.
- **Monitoring.** Per-core CPU, GPU, memory, disk health, thermal, and power readings, plus a dashboard for request and token metrics.
- **Agent features.** A shared work pane with terminals and a browser, per-chat Git worktrees, [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]] servers, and prompts that run on a schedule through launchd.

The vendor claims more than 5,000 compatible models. We haven't run the app, so we can't speak to speed or quality.

## How It Compares

The closest neighbors are [[tooling/AI-Toolkit/AI Interfaces/AI Workspaces/LM Studio|LM Studio]], [[tooling/AI-Toolkit/AI Interfaces/OLlama|Ollama]], and [[lost-in-public/keeping-up/Unsloth Desktop - Run and Train Open Models in One App|Unsloth Desktop]].

| | Nativ | LM Studio | Ollama | Unsloth Desktop |
|---|---|---|---|---|
| **App license** | MIT | Proprietary, with an MIT MLX engine | MIT | AGPL-3.0-only |
| **Runtime on a Mac** | mlx-vlm and mlx-audio | MLX and llama.cpp | MLX and GGUF models | MLX and llama.cpp |
| **Platforms** | Mac only | Mac, Windows, Linux | Mac, Windows, Linux | Mac, Windows, Linux |
| **Cask's Mac floor** | macOS 26, Apple Silicon | macOS 12 on Apple Silicon | macOS 14 | Apple Silicon |
| **Hosted option** | None found | Cloud models from Bionic, its agent | Paid plans at $20 and $100 a month | Your own provider keys |
| **Training in the app** | No | No | No | Yes, the main difference |

Does it offer anything the others don't? Less than the marketing suggests:

- **The engine isn't exclusive.** `lmstudio-ai/mlx-engine` pins mlx-vlm in its requirements, so LM Studio's MLX path already uses Canuma's library. Nativ might pick up new model support sooner, but that's a guess we haven't tested.
- **The overlap is growing.** Ollama added experimental image generation in January 2026, a [faster MLX engine](https://ollama.com/blog/mlx-performance) in June, and [speech models](https://ollama.com/blog/speech-models) in October. LM Studio's Bionic agent now does local voice transcription and computer control.
- **The site overreaches on openness.** Its manifesto is headed "Why we're open source when nobody else is," but GitHub lists Ollama as MIT and its repo includes an `app` directory. The contrast holds for LM Studio, whose terms bar reverse engineering.

What does stand out is a fully open Mac app with no hosted tier today, dictation that works outside the app, and a hardware monitor beside the inference metrics. We didn't find system-wide dictation or that monitor in the Ollama or LM Studio material we read, though we didn't search their docs exhaustively.

The costs are real too. Nativ runs MLX only, on one platform, and needs a recent OS. If you need GGUF, Linux, or an older macOS, it's out.

## Read "Nothing Leaves Your Mac" Closely

The README says "nothing leaves your Mac." The site's own FAQ is more careful: "The app goes online to download the models you pick and to check for updates, and it sends diagnostic data only if you say yes at first launch."

Inference does run on the Mac once a model is downloaded, and the site's FAQ says it works offline at that point. These parts reach out:

- **Model downloads.** Hugging Face sees the request. The app sets `HF_HUB_DISABLE_TELEMETRY=1` for its download process.
- **Updates.** Sparkle checks an appcast on GitHub, with automatic checks on.
- **Diagnostics, if you agree.** The [privacy policy](https://runnativ.ai/privacy) lists device details, crash reports, performance numbers, and which features you use. It says this excludes your content.
- **Agent tools.** The browser tool searches without an API key, and the code builds a Google search URL for it. Optional `web_search` providers such as Tavily, Exa, and Brave use your own keys. MCP servers go wherever they're built to go.

A model's search query or browsing session can carry your content off the machine even though the inference stayed local. That's the case to watch on client work.

Two things in the paperwork need a second look. We searched `main` for a Neywa endpoint, a common analytics SDK, and a diagnostics consent flow, and found none, so the public source doesn't obviously match what the policy describes. That was a grep and not an audit, and we'd watch the first-launch screen. The policy, effective September 17, also has sections on accounts, license keys, and payments, and still contains the unfilled placeholder "[PAYMENT PROCESSOR NAME]."

## Permissions and Agent Tools

Nativ asks for microphone, accessibility, and screen recording access on first launch, and you can defer them. Accessibility supports the global dictation shortcut. It also keeps a local hardware history of up to 1 GB, which the docs say "has no network code."

Agent tools come with limits worth knowing:

- **No shell sandbox.** The docs say a chat's worktree "is the default working directory, not a sandbox for shell commands." Each terminal command does need confirmation, even under Full access.
- **MCP consent is unclear.** The integrations page says each MCP call passes through the consent gate. The chat page says "Other MCP servers and custom endpoints run automatically in all three access modes." We'd test this before connecting anything that can write.
- **The default API key is the string `nativ`.** The server key is optional, so we'd treat localhost as the only boundary and leave the host setting alone.

## Free for Now

The app is free with no account, and the MIT license covers the code. The site says "No enterprise tier, no investor roadmap," and an older landing page adds "Free forever." Neywa's own site lists Nativ Pro as "Coming soon," and its terms say "The Services are currently free" and that paid plans may follow. We found no price or feature list, so it's unclear what a paid tier would add.

## Where It Fits in Our Workflow

The fit is modest, and we haven't run it. Our local data layer is Chroma, which handles retrieval, and the nearest thing we have on local inference is an old, still-open note, [[lost-in-public/issue-resolution/Running the latest and greatest LLM locally|Running the Latest and Greatest LLM Locally]], built around Ollama. We have no daily local-model workload that this would improve.

Two small tests would tell us whether that should change:

1. **Claude Code against a local model.** Point it at Nativ's Anthropic endpoint in one non-client repo, and compare the result with the same model under LM Studio.
2. **Local dictation.** [[tooling/AI-Toolkit/Generative AI/WhisprFlow|Wispr Flow]] transcribes in the cloud, so a local option is useful for client calls and notes. We'd check accuracy first, then confirm the claims above with a network monitor.

We'd hold off on recommending it for client data until the diagnostics question is settled. If all we wanted was a local API server, Ollama or LM Studio would do the job with less to grant.

## Install

```bash
brew install --cask nativ
```

- **Requirements.** The cask requires Apple Silicon and macOS 26 (Tahoe). The README adds "enough unified memory for the model you choose." The site's featured models run from a 3.20 GB download (LFM2.5-VL 1.6B) to 19.38 GB (North Mini Code).
- **Source link.** The cask's `homepage`, `blaizzy.github.io/nativ`, returned a 404 when we checked. Its download URL still works through GitHub's redirect to the new repo.
- **No CLI from the cask.** It installs `Nativ.app` and declares no `binary`.
- **Updates.** The cask is marked `auto_updates`, and the app updates itself through Sparkle.
- **Removal.** `brew uninstall --zap --cask nativ` clears the app's support files, caches, and preferences. Its list doesn't cover the Hugging Face model cache, launchd agents for scheduled tasks, or config files written for tools such as Codex and Pi. We'd delete scheduled tasks in the app first and clean up the rest by hand.

Source: <https://github.com/Neywa-Labs/nativ>
