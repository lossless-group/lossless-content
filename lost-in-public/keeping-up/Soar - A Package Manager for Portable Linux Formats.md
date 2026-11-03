---
date_created: 2026-07-10
date_modified: 2026-07-10
title: Soar — A Package Manager for Portable Linux Formats
slug: soar-package-manager-portable-linux-formats
tags: [Developer-Tools, Package-Managers, Linux, Portable-Formats, Rust, Homebrew]
homepage: https://soar.qaidvoid.dev
github_repo_url: https://github.com/pkgforge/soar
brew_page: https://formulae.brew.sh/formula/soar
install: brew install soar
---

https://soar.qaidvoid.dev

## Why This Matters

Soar installs static binaries, AppImages, and other self-contained formats (AppBundle, FlatImage, RunImage, onelf) on any Linux distribution, with no superuser and no system packages touched. Everything lands under your home directory.

The design choice worth noticing is the split between client and repository. Soar neither builds nor hosts packages. It reads metadata in a standard format, so `soarpkgs` is only the default source, and you can add a third party's repository or run your own. That matches how we like to think about portable formats: the artifact and the index shouldn't be tied to one vendor's distribution.

Soar landed in Homebrew core on July 10, 2026 at version 0.12.6. MIT licensed, written in Rust. The details below reflect 0.14.0, checked November 3, 2026.

**This one is Linux-only.** The Homebrew formula requires Linux and ships only Linux bottles, so it won't install on a Mac despite appearing in a Homebrew publish list.

## What It Actually Does

- **One static binary.** No runtime dependencies, no root, any distribution.
- **Install from anywhere.** Use a repository, a direct URL, or a local file. Packages installed from a GitHub or GitLab release keep tracking that release.
- **Run without installing.** `soar run ripgrep` runs a package once.
- **Delta updates.** AppImages that advertise a zsync feed fetch only the parts that changed.
- **System integration.** Desktop entries, icons, man pages, and shell completions go where your system already looks.
- **Verification.** Checksums and signatures are checked before installation.
- **Architectures.** `soarpkgs` publishes for x86_64, aarch64, and riscv64.

## Where It Fits in Our Workflow

Narrowly. Our primary machines are Macs, so this is only for the Linux side of the tree, the same machines where we manage skills with GNU Stow. There it has a clear use: giving a locked-down or disposable box current tools without root or a distro's package lag.

We haven't tried it. Its larger value to us is as an example of the client-and-index split, which is worth remembering whenever we talk about distributing skills or agent configuration.

## Install

```bash
# Linux only
brew install soar
soar sync
soar install ripgrep
```

Source: <https://github.com/pkgforge/soar>
