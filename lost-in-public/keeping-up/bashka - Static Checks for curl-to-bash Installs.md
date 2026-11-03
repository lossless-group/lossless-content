---
date_created: 2026-09-17
date_modified: 2026-09-17
title: bashka — Static Checks for curl-to-bash Installs
slug: bashka-static-checks-curl-to-bash-installs
tags: [Developer-Tools, Security, Supply-Chain, Shell, CLI, Rust, Homebrew]
github_repo_url: https://github.com/dmtrKovalenko/bashka
brew_page: https://formulae.brew.sh/formula/bashka
install: brew install bashka
---

https://github.com/dmtrKovalenko/bashka

## Why This Matters

`curl https://example.com/install.sh | bash` means running a stranger's script at the moment you've given it the least scrutiny. Everyone knows this and does it anyway, because that's how the install docs read. bashka doesn't try to change the habit. It changes two letters: you add "ka" to the end, and the script gets parsed and scored before anything runs.

```sh
curl -fsSL https://pyenv.run | bashka
```

It landed in Homebrew core on September 17, 2026 at version 0.7.0, two days after the repo was created. MIT licensed, written in Rust. The details below reflect 0.12.0, checked November 3, 2026. That release dates from September 18, and `main` has had one later commit. It's a young, small project, at about 246 stars.

## The Obvious Irony

The README knows exactly how this looks:

> Install via bash. One last time.

```sh
curl --proto '=https' --tlsv1.2 -fsSL https://bashka.dmtrkovalenko.dev | bash
```

It follows that with "We guarantee absolute safety of this script!" and a link to read it yourself. It's a joke, and it points at a real bootstrapping problem: the checker has to arrive somehow. Happily, you can skip the piped install, because Homebrew, Cargo, mise, and release binaries with checksums are all listed.

## What It Actually Does

- **Four kinds of finding.** Critically malicious blocks hard, such as credential theft or a reverse shell. Red marks dangerous behavior, like `eval` of opaque code or writes to shell rc files. Yellow is advisory, like unpinned downloads, and green marks good practice, like checksums or `set -euo pipefail`.
- **Chain following.** It follows forwarded scripts so each layer gets analyzed, with a default `max_depth` of 5.
- **An install registry.** It records what it installed in a lock file, so `bashka list`, `info`, `update`, and `remove` work for software that usually leaves no trace.

## What It Can't Tell You

The README's limitations are worth taking at face value:

- "Bash is Turing-complete," so obfuscation can evade static analysis.
- "A server may serve different bytes at run time than at fetch-ahead."
- The shim intercepts `bash` and `sh` through `PATH`, but `/bin/bash` bypasses it.

There's also a boundary that follows from the design. bashka checks the script, not the binary the script downloads. A clean verdict means the installer looks well behaved, not that the software is safe.

## Where It Fits in Our Workflow

We haven't run it, but the target is familiar. A rough search of our Claude Code session logs finds piped installs in 17 session files, including Determinate's Nix installer and Omarchy-on-Mac scripts. That count mixes commands we ran with ones we only discussed. Fresh examples keep arriving too, such as the [[OpenShell - NVIDIA's Runtime for Autonomous Agents|OpenShell]] quickstart.

The agent angle is what we'd test first. The default for red findings is `on_red = "ask"`, which assumes someone is there to answer. For agent sessions we'd try `abort`, though we don't yet know how it behaves without a terminal. We wouldn't add it to our standard setup until that's clear.

It's a stopgap by nature. [[packslip - Signed Release Manifests for Vendor Binaries|packslip]] tackles the same habit from the other end, removing the script entirely, but only for vendors who publish a signed manifest. bashka works on the installers that exist today.

## Install

```bash
brew install bashka
curl -fsSL https://pyenv.run | bashka
bashka list
```

To make red findings stop instead of prompt, set this in `~/.config/bashka/config.toml`:

```toml
[interaction]
on_red = "abort"
```

Source: <https://github.com/dmtrKovalenko/bashka>
