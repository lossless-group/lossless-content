---
date_created: 2026-07-20
date_modified: 2026-07-20
title: Libation — Keep the Audible Books You Bought
slug: libation-keep-the-audible-books-you-bought
tags: [Digital-Preservation, Own-Your-Data, DRM, Audiobooks, Open-Source, macOS, Homebrew]
homepage: https://getlibation.com
github_repo_url: https://github.com/rmcrackan/Libation
brew_page: https://formulae.brew.sh/cask/libation
install: brew install --cask libation
---

https://getlibation.com

## Why This Matters

Libation downloads your Audible library, removes the DRM, and leaves you with ordinary audio files that play anywhere. Its tagline is "Liberate your Library," and it belongs on the same shelf as [[Homebrew Roundup - 2026-06-21|tubeup and msgvault]]: get your stuff out while you still can, in a format no single company controls.

It isn't new. The repo dates to 2019 and has over 6,000 GitHub stars. The news is that it reached the official Homebrew cask list on July 20, 2026 at version 13.5.1, making it easier to install and keep updated on a Mac. GPL-3.0, written in C#. The details below reflect 14.2.5, checked November 3, 2026.

## What It Actually Does

- **Library download.** Scans your Audible account and downloads your books, with DRM removed, as `.m4b` or `.mp3`.
- **Organization.** Search, filter, and tag, plus import of an existing library with cover art.
- **Coverage.** Windows, macOS, and Linux, plus Docker. Several Audible regions are supported, and it can find titles bought through another country's marketplace.
- **Self-hosting.** Can upload liberated books to [Audiobookshelf](https://www.audiobookshelf.org/) automatically.

## The Limits

The project's FAQ is frank about where this gets harder, and it shows that preservation is a moving target:

- **Audible pushes back.** Its changes in early September 2026 can cause license refusals on existing device registrations. The documented fix is a full re-registration, or sometimes waiting a few days.
- **Spatial audio is gone.** Dolby Atmos and spatial titles can't be downloaded, and the project's answer on whether that will return is simply "No."
- **Subscriptions don't count as ownership.** Audible Standard books work only while the subscription is active. After that, Libation can't get a license to download them.

There's also the legal side. Removing DRM can breach Audible's terms and may be restricted by law depending on where you live, even for books you paid for. Check what applies to you, and don't redistribute what you download.

## Where It Fits in Our Workflow

This is less a tool for our stack than a clear example of the preservation thesis. A purchased digital library is really a revocable license plus a client app, and the September license changes show how fast the terms can shift. If you keep a library like this, the practical lesson is to run your backup before you need it, on a schedule, and to store the results somewhere you control.

We haven't run it ourselves. The Audible Standard limit is the point we'd underline: for anything that matters to you, buying is the only version with an exit.

## Install

```bash
brew install --cask libation
```

Docs: <https://getlibation.com/docs/getting-started>
