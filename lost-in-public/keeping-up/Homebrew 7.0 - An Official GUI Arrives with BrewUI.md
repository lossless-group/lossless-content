---
date_created: 2026-09-13
date_modified: 2026-09-13
title: Homebrew 7.0 — An Official GUI Arrives with BrewUI
slug: homebrew-7-0-an-official-gui-arrives-with-brewui
tags: [Homebrew, Package-Managers, macOS, Security, Breaking-Changes, Developer-Tools]
homepage: https://brew.sh
github_repo_url: https://github.com/Homebrew/brew
brew_page: https://formulae.brew.sh/cask/homebrew-app
install: brew install --cask homebrew-app
---

https://brew.sh/2026/09/13/homebrew-7.0.0/

## Why This Matters

[[Tooling/Software Development/Developer Experience/Homebrew|Homebrew]] is where our Keeping Up sweeps start. Most of what lands in the [[Homebrew Sweep - Hitlist|Hitlist]] was first noticed as a new formula or cask, so changes to the tool affect how we find things.

Homebrew 7.0.0 shipped September 13, 2026, three months after 6.0.0. Project lead Mike McQuaid lists the main changes as faster installs and upgrades, stronger sandboxing, a native macOS app, built-in vulnerability checks with an advisory database, the end of macOS 10.15 support, and Intel Macs moving to Tier 3. The GUI gets the attention, but the security work will probably matter more to us.

The operator's machine reported Homebrew 7.0.12 when checked November 3, 2026. We haven't installed BrewUI or tried the new commands, so the descriptions below are Homebrew's.

## BrewUI

[BrewUI](https://github.com/Homebrew/BrewUI) is the official macOS GUI, written in Swift and SwiftUI and licensed AGPL-3.0. Its stated audience is "CLI-averse users." It brings browsing, search and installed-version details into one window, and it shows the underlying `brew` commands, which the README describes as never hiding what Homebrew is doing.

Three details are worth knowing:

- **It requires macOS Tahoe 26 or later.**
- **Version numbers are still 0.x.** The release notes call it "fully released." The cask was added on August 26 at 0.3.0, ahead of the announcement, and was at 0.6.0 as of November 3.
- **Shell configuration doesn't reach it.** Options go in `brew.env`, because aliases and exported variables don't configure the app.

BrewUI isn't aimed at us. A person who types `brew` all day and an agent that calls it don't need a window. Its value is for the people around us who'd never touch a terminal, and that's a reasonable thing for a volunteer project to invest in.

## The Rest of the Release

**Performance.** Downloads and package preparation now overlap, including `brew bundle` batches. Startup launches fewer subprocesses, and parsed API data is reused on warm runs while signatures are still verified on every load.

**Sandboxing.** Sandboxed builds can no longer read your home directory by default. Structured setup now arrives as signed data, which cuts down on arbitrary Ruby. Homebrew is careful about the limits: tap trust "remains the primary protection against malicious third-party casks," applications run with your privileges, and vendor `.pkg` installers run outside the sandbox.

**Vulnerabilities.** `brew vulns` is built in and checks against OSV.dev, with flags such as `--severity=high`, `--brewfile` and `--fix-available`. A new [advisory database](https://github.com/Homebrew/advisory-database) under CC0 records vulnerabilities against what Homebrew actually ships, including backported fixes. The notes also list eight advisories fixed since 6.0.0. The most serious, rated High and fixed in 6.0.12, let unsigned cask-removal metadata execute commands with `sudo`.

**Platforms.** Intel macOS moves to Tier 3 with no new bottles, and Homebrew stops running there on September 1, 2027. Homebrew points Intel users to MacPorts, reasoning that if Apple and GitHub are retreating from Intel, a volunteer project can't carry it. macOS 10.15 and earlier are dropped, Sonoma 14 moves to Tier 3, and macOS Golden Gate 27 on Apple Silicon is Tier 1. On Linux, Landlock replaces Bubblewrap, one major version after Bubblewrap was introduced.

**Removals.** The [migration guide](https://brew.sh/7.0.0-migration-guide/) is long. The items most likely to bite:

| Interface | Status | Replacement |
|---|---|---|
| `--ask`, `HOMEBREW_ASK` | Disabled | Plan display and confirmation are now the default |
| `brew bundle install --cleanup` | Disabled | Run `brew bundle cleanup` afterwards |
| `HOMEBREW_BUNDLE_JOBS` | Disabled | `HOMEBREW_DOWNLOAD_CONCURRENCY` |
| `HOMEBREW_EVAL_ALL`, `--eval-all` | Disabled | Trusted-tap evaluation is the default |
| `Homebrew/actions/*@master` | Removed | A CalVer release or full SHA |
| `ghcr.io/homebrew/ubuntu22.04` | Removed | `ghcr.io/homebrew/brew` |
| Third-party `brew` wrappers | Tier 3 | Seek support from the wrapper project |
| `post_install` and cask flight blocks | Deprecated until December 11, 2027 for third-party taps | Declared `*_steps` |

## Where It Fits in Our Workflow

**Our tree looks clear.** We searched our YAML, shell scripts and Dockerfiles for `Homebrew/actions`, `ghcr.io/homebrew` and several of the disabled flags and variables, and found nothing. We also found no Brewfiles near the top of the tree. This was a text search, so it wouldn't catch usage in a personal script outside the repo.

**Tap trust is the one to watch.** The operator's machine has four third-party taps: `libsql`, `modem-dev`, `surrealdb` and `tursodatabase`. `HOMEBREW_NO_REQUIRE_TAP_TRUST` is deprecated, and the replacement is `brew trust` for each non-official source. Since agents sometimes install tools, a trust prompt or refusal is a likely place for one to stall. We haven't tested that, and likewise don't yet know how the new confirmation default behaves in a non-interactive shell.

**The sweep could use some of this.**

- The formula API now publishes advisory findings, so a sweep could check them for a candidate alongside its landing date.
- `brew info` marks uninstallable packages with `⊘`, which helps when triaging a package that may not run on our machine.
- `brew install --dry-run` previews formulae and casks together, and `brew doctor --json` gives structured diagnostics. Both suit agents.
- `HOMEBREW_AUTO_UPDATE_QUIET` suppresses automatic-update package details. The sweeps have worked from pasted `brew` output, so setting it could hide what we're looking for. It isn't set in the operator's shell profiles.

**A dating note.** The Hitlist records `homebrew-app` as September 13, though the cask's first commit is August 26. That matches the Hitlist's rule that a bigger event can carry the date, and the release is the event here.

## The Pace

Homebrew shipped 5.0.0 in November 2025, 6.0.0 in June 2026 and 7.0.0 in September 2026. Its volunteers also report no open issues in Homebrew/brew at the time of writing. That pace is impressive, but it means behavior changes under our sweeps and agents every few months, without any choice on our part. Homebrew auto-updates by default, so reading these notes when they come out is the only real upgrade gate we have.

Sources: <https://brew.sh/2026/09/13/homebrew-7.0.0/> · <https://brew.sh/7.0.0-migration-guide/> · <https://github.com/Homebrew/BrewUI>
