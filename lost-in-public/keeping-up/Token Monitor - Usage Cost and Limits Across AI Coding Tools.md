---
date_created: 2026-08-31
date_modified: 2026-08-31
title: Token Monitor — Usage, Cost, and Limits Across AI Coding Tools
slug: token-monitor-usage-cost-limits-ai-coding-tools
tags: [Developer-Tools, AI-Agents, Observability, Token-Usage, Cost-Tracking, Local-First, Claude-Code, Homebrew]
homepage: https://javis-ai.com/token-monitor/
github_repo_url: https://github.com/Javis603/token-monitor
brew_page: https://formulae.brew.sh/cask/token-monitor
install: brew install --cask token-monitor
---

https://github.com/Javis603/token-monitor

## Why This Matters

If you run several coding agents at once, you have two questions: how much have we used, and how close are we to a limit? Token Monitor answers both in one desktop app across many tools, without an account or a hosted service.

Those answers come from two separate pipelines, and they deserve different levels of trust. Token counts are parsed from log files on your machine. Limit percentages come from each provider, using your credentials. The project's "local-first" label fits the first pipeline better than the second.

Token Monitor landed in Homebrew on August 31, 2026 at version 0.50.0. It's MIT licensed, with no paid tier or required account in the README or on the site. It's an Electron app, and one maintainer accounts for nearly all the commits. Everything below was checked November 3, 2026, at version 0.85.0 and 3,533 GitHub stars.

## What It Actually Does

- **Usage tracking.** Tokens and estimated cost by tool, model, device, session, or project. The project says the display updates within seconds of each turn.
- **Limits.** Session, weekly, billing, and credit windows with reset times, across multiple accounts per provider.
- **Live sessions.** Which agents are running, and how much context Claude Code, Codex, and DeepSeek Harness sessions have left.
- **Surfaces.** A main window, floating bubble, and history dashboard. The README also lists a notch panel and native widgets on macOS, plus a menu bar or tray readout and an edge dock on macOS and Windows. Usage exports as CSV and JSON.
- **Multi-device sync, opt-in.** A hub you host inside the app, on a Node server, or on Cloudflare Workers, or iCloud Drive between Macs. A headless agent reports from servers and WSL.
- **One action.** It can switch the active local Codex account. Otherwise it only observes. Neither the README nor the configuration reference mentions alerts or budgets, and it can't pause an agent.

The "48+ tools" figure needs unpacking. The README's table has 48 rows, but only 38 report token usage. The other 10 are limits-only sources such as OpenRouter, Ollama, and Notion AI. The project's site says "44+" in one place and "30+" in another.

## How It Gets Its Data

| Reading | Source | What that means for accuracy |
|---|---|---|
| Tokens, most tools | Transcripts and databases on disk (for Claude Code, `~/.claude/projects/`), parsed by a pinned fork of [tokscale](https://github.com/junhoyeo/tokscale) | As good as what the tool writes down and what the scanner finds |
| Tokens, Cursor | Cursor's account-level usage export | Covers the account, not just this machine. Recent sessions can lag by a few minutes |
| Dollars | Provider-reported cost where a source has it, otherwise an estimate from token counts and a price list. tokscale's README names LiteLLM's data, with OpenRouter as a fallback | An estimate. On a subscription, it's API-equivalent value, not your bill |
| Limits | Provider services, reached with your credentials and refreshed every 5 minutes by default | The provider's own figures, so likely the most reliable numbers here |

The README's notes list specific gaps:

- **Command Code** transcripts have no token counts, so usage is estimated from the text.
- **Devin Desktop**'s default cloud agent meters server-side, so it reports no Desktop tokens.
- **Goose** counts all of a session's usage on the day the session was created.
- **LM Studio** tracking excludes its built-in chat.
- **Claude Code**'s context limit is estimated from the model.

GitHub issues add some field evidence. These are user reports, not our measurements:

- **Which folders get scanned matters most.** In [#375](https://github.com/Javis603/token-monitor/issues/375), a user on 0.42.1 found Claude usage 51.7% below their billing export, while parsing the same transcripts directly landed within 4.2%. The cause was usage stored outside the scanned folders. The `CLAUDE_CONFIG_DIR` part was fixed in 0.48.0. The current docs describe scanning Claude Desktop's folders too, but the issue is still open.
- **Past costs can move.** [#603](https://github.com/Javis603/token-monitor/issues/603) asks why an old day's dollar figure changes after a rescan when its token count doesn't. The issue is closed. A later comment says upstream tokscale added a label for where a cost came from, which still wouldn't explain why an estimate changed.
- **Time zones can inflate history.** [#986](https://github.com/Javis603/token-monitor/issues/986) describes a daily total inflated after a time zone round trip. The maintainer shipped a related fix in 0.73.0 but doesn't plan to rewrite history that's already wrong.

## Credentials and Privacy

The usage pipeline needs no credentials, but the limits pipeline does. The first-run code turns on limits for the tools it detects, and limits collection defaults to on.

For Claude, the provider docs say it finds Claude Code's OAuth credentials through the environment, a file, or the macOS Keychain, then calls `api.anthropic.com/api/oauth/usage`. We didn't check whether Anthropic documents or supports that endpoint. If that path fails, it can run the Claude CLI's `/usage`, and the docs call any account-side session creation from that "unverified." Other sources use pasted cookies. The README says Manus relies on an undocumented internal endpoint, and that Notion AI has only been validated against fixtures.

The project says it sends no analytics or telemetry to the maintainer, and that prompts, code, and raw logs never sync. Three details are worth knowing:

- **Stored credentials are plaintext.** Credentials you enter in the app go in a `credentials.json` file with restricted permissions, which the architecture doc says is "not protection from same-user processes."
- **The site understates what syncs.** The landing page says the account behind each limit is "a one-way hash, never the login itself." The privacy policy and a comment in the code say the authenticated hub can also receive the account email and plan label. Public stats endpoints drop these.
- **Plugins aren't sandboxed.** The README says their Node backends run with your user's permissions.

## Where It Fits in Our Workflow

We haven't run it. It answers a question our [[Agent Supervisors - Eight Tools Chasing the Same Question|agent supervisors roundup]] didn't cover: those tools track which agent needs you, while this one tracks how much runway you have left. Limit percentages come from the provider, so they should reflect the whole account, including sessions on other machines. Token totals only cover this device unless you set up sync.

For parallel sessions, the best news is status detection. Running and waiting states are native for Claude Code and Codex, with no change to Claude's settings, so it avoids the hooks some supervisors install. For other tools, "running" is an estimate of about 10 minutes after the last activity. It isn't a replacement for [[herdr - Agent Multiplexer That Lives in Your Terminal|herdr]], since it can't answer a prompt or start a session.

Heavy use is also where the main warning lands. In [#856](https://github.com/Javis603/token-monitor/issues/856), still open, a macOS user with 10+ concurrent Claude Code sessions and about 2,900 transcript files reports 12% of a core on average over 13 days on 0.74.0, with about 750 MB of memory. After updating to 0.84.0, switching to 30-minute interval collection, and cutting tracked tools and Discord presence, they saw 0.0 to 0.6%. That's close to how we work, and interval mode gives up the live numbers.

Three other things would affect us:

- **Linux.** The Homebrew cask is macOS-only, and the README lists the notch, menu bar, and edge dock features for other platforms only. Our Linux machines would use the x64 AppImage, or the headless agent, which needs Node 22.15+, a cloned repo, and a hub to report to. An open report, [#1011](https://github.com/Javis603/token-monitor/issues/1011), describes the floating window locking the mouse on X11.
- **Worktrees and nested repos.** The docs we read don't mention worktrees, so we don't know how project breakdowns would treat them or our 27-project tree.
- **Release pace.** It shipped about 35 minor versions in the nine weeks after landing, and the app updates itself. Expect the details here to drift.

This wouldn't replace our Chroma corpus, which holds what past sessions said, not live quota. If we only wanted historical cost, the usage CLI in [[AgentsView - Browse and Search Past AI Coding Sessions|AgentsView]] asks for less.

We'd pilot it on one Mac, with collection set to interval from the start and only Claude Code and Codex tracked. We'd compare a week of its numbers against the providers' own usage pages, and leave sync and plugins off.

## Install

```bash
brew install --cask token-monitor
```

Windows and Linux builds are on [GitHub Releases](https://github.com/Javis603/token-monitor/releases).

Source: <https://github.com/Javis603/token-monitor>
