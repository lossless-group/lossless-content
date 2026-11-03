---
date_created: 2026-08-31
date_modified: 2026-08-31
title: jcode — A Rust Harness for Multi-Agent Work
slug: jcode-rust-harness-for-multi-agent-work
tags: [Developer-Tools, AI-Agents, Agent-Harnesses, Rust, Multi-Agent, Y-Combinator, Homebrew]
homepage: https://jcode.sh
github_repo_url: https://github.com/1jehuang/jcode
brew_page: https://formulae.brew.sh/formula/jcode
install: brew install jcode
---

https://github.com/1jehuang/jcode

## Why This Matters

jcode bets that memory is what limits how many agents you can run at once. Instead of one heavy process per session, a shared server hosts cheap ones, and the project says that lets you run dozens in parallel. The repo was created on January 5, 2026, and shows 21,438 stars. Its founder, Jeremy Huang, went through [Y Combinator's Summer 2026 batch](https://www.ycombinator.com/companies/jcode).

The formula pull request opened on August 30, 2026, at version 0.81.3 and merged on August 31. MIT licensed. The details below reflect 0.99.1, checked November 3, 2026. The repo is also tagging `v1.0.0-preview` builds.

## What It Actually Does

- **Swarms.** Agents in one repo are coordinated by the server. If agent A edits a file agent B has read, B is told. Agents can message each other and spawn their own workers.
- **Self-dev mode.** The agent edits, builds, and tests jcode's own source, then reloads its binary mid-session.
- **Many providers.** Including Claude and OpenAI Codex sign-ins.

## Reading the Numbers Critically

**The benchmarks are the project's own, and the headline depends on the metric.** The README reports 3.3 MB per additional session against 169.3 MB for Claude Code, a 51x gap. For the first session it's 71.3 MB against 272.9 MB, about 3.8x. YC's page says 20x. A shared-server design wins the extra-session figure by construction. The script is published, but an [outside review](https://wavect.io/blog/jcode-vs-claude-code-rust-agent-harness/) noted that an earlier, widely repeated figure had local embeddings turned off.

**The stars are hard to read.** GitHub's stargazer endpoint returned a 404 for us, so we couldn't check the growth curve. The README's badge claims 3.11M downloads, and Homebrew shows 555 installs over 90 days. Curl is the main install route, so the two can't really be compared, and we don't know what the badge counts.

**It's one person moving very fast.** YC lists a team of one, and `1jehuang` has 10,929 of about 11,400 commits, roughly 38 a day across the repo's life. There are 595 open issues and 191 open pull requests.

**Security needs the most care:**

- **Claude login.** jcode offers `jcode login --provider claude` and, after asking, can read Claude Code's stored credentials. [Anthropic's docs](https://code.claude.com/docs/en/legal-and-compliance) say it doesn't permit third-party developers to offer Claude.ai login in their own applications or route requests through Free, Pro, Max, or Ultra credentials on behalf of users. That looks hard to square with this feature, so we'd use an API key.
- **Credentials.** An [open issue](https://github.com/1jehuang/jcode/issues/2052) filed November 2 argues model-run tools can reach provider keys, because they share a process and user. jcode's own docs call session environment overrides "not a security sandbox."
- **Telemetry.** Default usage telemetry may include your provider OAuth email, and `TELEMETRY.md` says these records "are not anonymous." `JCODE_NO_TELEMETRY` and `DO_NOT_TRACK` are documented opt-outs.

## Where It Fits in Our Workflow

We haven't run it. We do run parallel agents, but RAM doesn't look like our constraint. Our [[herdr - Agent Multiplexer That Lives in Your Terminal|herdr]] notes put the bottleneck at human dispatch attention, which a lighter process doesn't change. We haven't measured this, so it's a judgment rather than a finding.

The swarm notification is the idea worth keeping. Parallel sessions stepping on each other is a real risk in our tree, and "tell the other agent its file changed" is a simple answer. That makes jcode good reading for `ai-labs/studies/agent-harnesses/`.
We wouldn't move daily work to it. A pilot would mean an API key, telemetry off, and a throwaway repo.

## Install

```bash
brew install jcode
export JCODE_NO_TELEMETRY=1
```

Source: <https://github.com/1jehuang/jcode>
