---
date_created: 2026-10-05
date_modified: 2026-10-05
title: packslip — Signed Release Manifests for Vendor Binaries
slug: packslip-signed-release-manifests-vendor-binaries
tags: [Developer-Tools, Security, Supply-Chain, Sigstore, Package-Managers, Rust, Homebrew]
homepage: https://packslip.dev
github_repo_url: https://github.com/jdx/packslip
brew_page: https://formulae.brew.sh/formula/packslip
install: brew install packslip
---

https://github.com/jdx/packslip

## Why This Matters

Most vendor binaries reach you through a checksum file sitting beside the download, and that protects less than it appears to. As the packslip docs put it, "whoever can replace the binary can replace the checksum too." Installers also tend to guess which archive suits your machine from its filename.

packslip proposes a single signed file, `packslip.sigstore.json`, published next to a release's artifacts. It states the project, version, each artifact's digest and size, which platform it suits, and where the executables sit inside it. An installer verifies that file against the project's signer instead of trusting wherever the download came from.

It comes from Jeff Dickey, who wrote [mise](https://mise.jdx.dev), and Shunsuke Suzuki, who wrote [aqua](https://aquaproj.github.io/).

The Homebrew pull request opened October 4, 2026 and merged on October 5, at version 1.5.0. MIT licensed, written in Rust. The details below reflect 1.11.3, checked November 3, 2026. The project describes the format as stable at version 1.

## What It Actually Does

- **Publishing.** A GitHub Action signs with the workflow's own identity through Sigstore, so there's no long-lived key to manage. Other CI systems and Ed25519 keys are also supported.
- **Installing.** `packslip install github.com/jdx/hk` finds a signed release, checks it against the name you asked for, and installs it. It runs no downloaded code.
- **Verifying.** `packslip verify` checks an artifact you already downloaded against the bundle.
- **Remembering trust.** `packslip install` and mise remember the signer and refuse a changed workflow, repository, or weaker scheme until a person approves.
- **Release lists.** Optional signed lists add expiry, sequence numbers, and withdrawals, which handles rollback and pulled releases.

## What a Signature Doesn't Prove

The [trust docs](https://packslip.dev/docs/trust/) are unusually direct. A verified release doesn't establish that the signer or its build environment was uncompromised, that "the software is safe," or that it's the newest release.

A few sharper edges:

- **First use is trust on first use.** A name recreated before your first install gets trusted. Publishing and pinning a signer fingerprint closes that gap.
- **`packslip verify` has no memory.** Without `--pin`, it accepts a repository recreated under the same name, and the README tells you to check the project name in its output.
- **The installer is minimal.** It "has no upgrade, list, or uninstall command."

All of this only helps where vendors publish a bundle. `hk` is the example in the docs, and we couldn't establish how many other projects do.

## Where It Fits in Our Workflow

The fit is modest today, and we haven't run it. On the publishing side it barely applies, since our packages go out through registries like JSR and npm rather than as vendor binaries.

The consumer side is closer. Our Nix devshells plan, from September, records that mise manages global CLIs like `claude`, `codex`, and `gh` on our Omarchy machine, and it leaves mise's long-term scope undecided. The packslip docs describe mise enforcing these checks, so that's where this could reach us without any workflow change, if those vendors publish bundles. We haven't checked whether they do.

It's also the structural counterpart to [[bashka - Static Checks for curl-to-bash Installs|bashka]]. bashka inspects the install scripts that exist now, and packslip removes the script. We'd keep watching adoption rather than change anything yet.

## Install

```bash
brew install packslip
packslip install github.com/jdx/hk --pin ps1_snirenkjwr7m5ozgcufameodnm
```

The fingerprint above is the one shown in packslip's docs for `hk`. Record a fingerprint from outside the release itself, because `packslip pin` will print one for whichever repository signed the bundle you give it.

Source: <https://github.com/jdx/packslip>
