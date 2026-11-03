---
date_created: 2026-08-31
date_modified: 2026-08-31
title: tailcat — Netcat over Tailscale's Data Plane
slug: tailcat-netcat-over-tailscale-data-plane
tags: [Developer-Tools, Networking, Tailscale, WireGuard, Peer-To-Peer, Go, Homebrew]
homepage: https://tailscale.com/tailcat
github_repo_url: https://github.com/tailscale/tailcat
brew_page: https://formulae.brew.sh/formula/tailcat
install: brew install tailcat
---

https://github.com/tailscale/tailcat

## Why This Matters

[[Tailscale]] released a tool that doesn't need Tailscale: its tagline is "Tailscale without Tailscale, by Tailscale." `tailcat` takes the company's data plane, which provides WireGuard-encrypted tunnels with NAT traversal and DERP relays as a fallback, and drops the control plane. There's no account, no root access, and no change to your routing or DNS. One side runs a server and prints a short address, and the other side connects with it. You exchange that address however you like.

The repo dates to 2024 and the project to 2023, but the README says it was open sourced in August 2026. It landed in Homebrew core on August 31, 2026 at version 0.3.0. BSD-3-Clause, written in Go. The details below reflect 0.7.0, checked November 3, 2026.

## What It Actually Does

- **Pipes.** `echo hello | tailcat <address>` sends stdin to the server's stdout.
- **Ports.** `tailcat serve 8080` exposes a local port, and `forward` makes a remote one available locally.
- **Files.** `tailcat recv ~/inbox` runs a write-only drop box, and `tailcat cp` sends to it.
- **SSH.** Public-key-authenticated SSH, plus a `no-auth-ssh` mode.
- **Go library.** The CLI is built on an importable package.

Two warnings from the README are worth keeping. A tailcat address is normally a secret, because knowing it is what lets a client connect, and `no-auth-ssh` trusts whoever has it. Separately, nothing here is stable: the API, the flags, and the wire format may change, and the free public relays are rate-limited, carry no uptime promise, and can be revoked at any time.

## Where It Fits in Our Workflow

Weakly. We haven't run it, and nothing in our agent instructions calls for it. The nearest possibility is moving a one-off file between a Mac and one of our Linux machines without any setup. If both machines are already on a tailnet, regular Tailscale does that with less to think about, and we wouldn't pass secrets through free public relays on a tool with no stability promises.

We're noting it mainly because it comes from the Tailscale team and has an interesting shape: a networking primitive that needs no account. If we ever build something where two agents on different networks have to talk, it's worth a second look.

## Install

```bash
brew install tailcat
tailcat                     # server: prints an address, then waits
tailcat <address>           # client, on the other machine
```

Source: <https://github.com/tailscale/tailcat>
