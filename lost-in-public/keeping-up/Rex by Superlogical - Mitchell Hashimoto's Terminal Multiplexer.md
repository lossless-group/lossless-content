---
date_created: 2026-11-17
date_modified: 2026-11-21
title: Rex by Superlogical — Mitchell Hashimoto's Terminal Multiplexer
slug: rex-by-superlogical-mitchell-hashimotos-terminal-multiplexer
tags:
  - Developer-Tools
  - Terminal-Emulators
  - Multiplexers
  - AI-Agents
  - libghostty
homepage: https://www.superlogical.com
docs: https://www.superlogical.com/rex/docs/installation
announcement_url: https://www.superlogical.com/updates/public-testing-beginning
---

https://www.superlogical.com/updates/public-testing-beginning

## Why This Matters

Mitchell Hashimoto (HashiCorp co-founder; creator of Vagrant, Terraform, and Ghostty) [announced Superlogical](https://mitchellh.com/writing/superlogical) on July 29, 2026: "Superlogical will begin by shipping a terminal multiplexer." That multiplexer is **Rex**. The other co-founders are Jack Pearkes, Alasdair Monk, and Hector Simpson. The company's tagline is bigger: "the multiplexer for all work," covering local development, remote access, coding agents, background jobs, live debugging, shared terminals, and incident response.

The timeline so far:

- **July 29:** Superlogical announced; newsletter waitlist opens.
- **October 5:** [Public testing begins](https://www.superlogical.com/updates/public-testing-beginning) for the macOS app, with invites going out in waves. A private program of about 50 people had already used it daily "for months."
- **November 17:** [Rex for Windows alpha](https://x.com/mitchellh/status/2122731286175580550) starts. Hashimoto: "I think this is a better terminal than Windows Terminal, and I think WT is pretty good."

Ghostty itself stays a non-profit. Superlogical consumes the same MIT-licensed `libghostty` that everyone else does and says it will keep sending shared terminal work upstream.

## What It Actually Does

- **Terminal + multiplexer in one app.** It's a "drop-in replacement for whichever terminal you use today," with splits and tabs (tabs on the left).
- **Persistent sessions on a Rex server.** The macOS app hosts its own server and can connect to other Rex servers. Close the window, reconnect from another device, and pick up where you left off. Sessions survive closing the app but not a full reboot.
- **Cross-platform servers.** Rex servers already run on Linux and Windows. Clients for iOS, Linux, and Windows are "at varying stages of readiness." Remote connections are designed to be fast and responsive, with Tailscale integration noted in early coverage.
- **Program activity status.** Rex reports whether a program is idle, working, or blocked. Coverage describes an escape-sequence protocol (OSC 7501) that agents like Claude Code can use to report their state, instead of Rex scraping the screen.
- **Scriptable CLI with JSON output:** `rex ls`, `rex split`, `rex run --wait`.
- **Sharing is part of the vision.** The Superlogical site describes web and native macOS/iOS access to sessions, with live session sharing built in.

## Cost and Licensing

From the public-testing post: "Rex is and will always be free." You don't need an account, you can fully self-host the servers, and Superlogical says it does not see or share your data. Rex is **closed source for now**. The commercial plan hasn't been announced, but they say clients and servers "are not going to be directly monetized." The stable release will be downloadable without sharing contact info. For now, the beta requires joining the mailing list.

## Where It Fits in Our Workflow

Rex joins [[Herdr App - The Agent Multiplexer Goes Native|herdr]] and Orca in the "persistent server + disposable window + agent status" pattern. One daily.dev commenter asked the obvious question: "But we have already Herdr, or what is herdr missing on this?"

Our honest read:

- **Rex's edge is craft and the team.** The people who built Ghostty's renderer and HashiCorp's distributed tooling are building this. Persistent sessions with responsive remote connections are exactly the hard problem they've solved before.
- **Herdr's edge is that it's open (Apache-2.0) and available today** on all three platforms, with a mod system.
- **The agent-status protocol is the piece worth tracking.** If OSC 7501 (or something like it) becomes a shared standard that Claude Code, Codex, and others emit, every multiplexer benefits. Screen-scraping agent state is fragile, and herdr already moved Codex status detection to screen parsing after its hooks proved noisy.

We're on the waitlist side of this for now. Worth requesting an invite to test against a remote box running long agent sessions.

## Install

macOS: join the waitlist at <https://www.superlogical.com> (invites go out in waves). Windows alpha: invites to the mailing list, download after Discord login. See the [installation docs](https://www.superlogical.com/rex/docs/installation).

Sources: [Superlogical](https://www.superlogical.com) · [Mitchell's post](https://mitchellh.com/writing/superlogical) · [Public testing](https://www.superlogical.com/updates/public-testing-beginning) · [daily.dev summary](https://daily.dev/posts/mitchell-hashimoto-s-superlogical-is-building-rex-a-terminal-for-coding-agents-gvhfnhzuo)
