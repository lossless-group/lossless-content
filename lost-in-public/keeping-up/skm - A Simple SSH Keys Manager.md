---
date_created: 2026-05-14
date_modified: 2026-05-14
title: skm — A Simple SSH Keys Manager
slug: skm-ssh-keys-manager
tags: [Developer-Tools, SSH, Command-Line, Secrets-Management]
homepage: https://timothyye.github.io/skm
repository: https://github.com/TimothyYe/skm
install: brew install skm
---

https://timothyye.github.io/skm

## Why This Matters

If you have one identity on GitHub, another on a client's GitLab, a third for personal VPS boxes, and a fourth for a deploy bot, you already know the friction: a sprawling `~/.ssh/config`, symlink rituals, and the occasional "wait, which key did I just push with?" moment. `skm` is a tiny Go CLI that treats SSH keypairs as named, switchable units — alias them, list them, set one as default, rotate passphrases, copy to remote hosts.

Version 0.8.9 landed in Homebrew core this update. MIT-licensed, works on macOS and Linux.

## What It Actually Does

- **Alias-based key management.** Create, list, rename, delete RSA or ED25519 keys by alias rather than by filename.
- **Default key switching.** One command swaps which key `~/.ssh/id_*` points at — no manual symlink dance.
- **Interactive fuzzy picker.** `skm` with no args opens a prompt UI to fuzzy-search and select a key.
- **Lifecycle ops you'd otherwise script yourself.** Add/rotate/remove passphrases, copy public keys to remote hosts, inspect fingerprints.
- **Backup & restore.** Archive all keys; supports plain tar and [restic](https://restic.net) for encrypted backups.
- **Hooks.** Run a script on key switch — useful for re-loading the ssh-agent or updating an env var that downstream tools read.
- **`skm doctor`.** Diagnostic to verify environment setup (permissions, agent state, default key sanity).

## Where It Fits in Our Workflow

The Lossless tree already has the gitignored-secrets discipline baked into `CLAUDE.md` — anything in `.env*` or `.secrets*` dies with the directory in a relocation, and the recovery story is painful. SSH keys are in the same risk category. `skm`'s backup/export flow gives a clean answer to "where is the canonical copy of my work, personal, and deploy keys" that doesn't depend on remembering which laptop they live on.

The hook mechanism is also interesting for pseudomonorepo work — switching keys when you `cd` into a different child repo could plug into the same shell hook that already swaps Node/Python versions via mise or asdf.

## Install

```bash
brew install skm
skm init       # one-time setup
skm doctor     # verify environment
skm create work
skm use work
```

Source: <https://github.com/TimothyYe/skm>
