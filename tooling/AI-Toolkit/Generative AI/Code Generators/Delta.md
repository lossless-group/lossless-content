---
date_created: 2026-11-15
date_modified: 2026-11-17
aliases:
  - DeltaDB
url: https://delta.dev/
og_title: A Multiplayer Environment for Coding with Agents
og_description: Build and review software with teammates and agents in shared threads, with every conversation and code change kept in context.
og_image: https://delta.dev/index.png?v=1794935393255
og_favicon: https://delta.dev/favicon.svg
og_site_name: Delta
og_type: website
og_last_fetch: 2026-11-17T20:36:51.838Z
tags:
  - Agentic-Engineering
  - Graph-Engineering
  - AI-Toolkit
  - Check-It-Out
  - Influencer-Favorites
  - Agentic-AI
  - Code-Generators
  - Memory-Layers
  - Large-Codebase-AI
site_uuid: fa3cde0f-00c5-4962-8b0e-dae77b25cb94
publish: true
title: Delta
slug: delta
at_semantic_version: 0.0.0.1
cf_last_run: 2026-11-17T20:45:38.532Z
cf_last_run_model: Perplexity sonar-pro
---

[[concepts/Explainers for AI/Agentic Engineering|Agentic Engineering]]
[[concepts/Explainers for AI/Graph Engineering|Graph Engineering]]
[[concepts/Explainers for AI/Large Codebase AI|Large Codebase AI]]

https://delta.dev/deltadb

[[Tooling/AI-Toolkit/Generative AI/Code Generators/Zed|Zed]]
[[concepts/Explainers for Tooling/Text Editors or IDEs|IDEs]]

https://youtu.be/T7oydtzie88?si=7bK09cIAvUe3v9Ih

# Value Proposition & Features

Delta is a collaborative software-development environment where teammates and AI agents work in shared threads, with conversations and code changes kept together. [^bf9qeb] Its underlying DeltaDB represents conversations, files, and related state as fine-grained changes, allowing local, terminal, and cloud-based participants to synchronize through the same thread. [^ifr2n4]

- **Shared agent threads:** Teammates can review, comment, and work alongside agents in real time. [^bf9qeb]
- **Conversation-linked code:** Code changes remain connected to the discussion that produced them. [^bf9qeb] [^49vsb4]
- **Delta app and CLI:** Users can work in the app or share sessions from the terminal. [^bf9qeb]
- **Claude Code collaboration:** The CLI and plugin let teammates join the same Claude Code session with shared conversation and unfinished worktree changes. [^rphla3]
- **Subthreads:** Users can branch into subthreads to explore ideas with agents without losing the parent context. [^bf9qeb]
- **DeltaDB:** A local [[Tooling/Software Development/Databases/SQLite|SQLite]]-backed CRDT and directed acyclic graph stores fine-grained edits called “deltas.” [^ifr2n4]
- **Cloud Runners:** Agents can run in [[Tooling/AI-Toolkit/Generative AI/Code Generators/Zed|Zed]]-hosted Linux sandboxes, with up to six runners at once. [^9met8z]
- **External-agent integration:** Claude Agent is available through ACP with an existing Claude subscription. [^eybt9g]

## Screenshots

No three official screenshot URLs were identified in the retrieved sources.

## Product Roadmap / Announcements

As of November 12, 2026,

- **November 12, 2026 — Claude Agent integration:** Delta added Claude Agent through ACP, allowing users to use included usage from an existing Claude subscription. [^eybt9g]
- **November 11, 2026 — Cloud Runners:** Delta introduced cloud execution on Zed-hosted Linux sandboxes using E2B, with up to six simultaneous runners. [^9met8z]
- **November 10, 2026 — Conductor import:** Delta added import of Conductor conversations as private, tagged threads. [^ppve3f]
- **November 2026 — Broader integrations:** Delta announced remote MCP servers, expanded CLI integrations, deeper Claude Code support, and planned DeltaDB integrations for Zed, Pi, and Codex. [^6lulvq]
- **October 27, 2026 — Claude Code multiplayer:** Delta launched beta sharing of Claude Code sessions through its CLI and plugin. [^rphla3]

## Recent Developments

- Delta moved agent execution beyond the local computer by adding cloud-hosted runners that can continue tasks while the user is away. [^9met8z]
- Claude Agent became Delta’s first external agent integration through ACP, while authentication, steering, and cloud-runner support remained under refinement. [^eybt9g]
- Delta continued expanding interoperability through Claude Code, Conductor imports, MCP servers, and additional planned client integrations. [^6lulvq] [^ppve3f] [^rphla3]

# History and Origin Story

Delta’s creators describe the project as growing from Zed Industries, which Nathan, Max, and Antonio founded in 2021 to build a fast code editor and change how software teams collaborate. [^ifr2n4] Delta extends that collaboration goal into agentic development by treating a thread as a document containing conversation, files, and synchronized edits. [^bf9qeb] [^ifr2n4]

## Notable Team Members

Nathan, Max, and Antonio are identified as the founders of [[Tooling/AI-Toolkit/Generative AI/Code Generators/Zed|Zed]] Industries, the organization from which Delta’s development story emerged. [^ifr2n4]

# Market Sizing

## Category, Market Size, and Category Growth

Delta appears to operate in collaborative AI-assisted software development, combining agentic coding tools, developer collaboration, and fine-grained version control. [^bf9qeb] [^ifr2n4] No reliable market-size or category-growth estimate specific to Delta was identified in the retrieved sources.

# Competitive Landscape

## Who it's for, who it's not for

Delta is aimed at software teams that want humans and coding agents to share context, review work, branch explorations, and synchronize code changes across an app, terminal, or cloud runner. [^bf9qeb] [^rphla3] [^9met8z]

It is less suited to users seeking only a conventional code editor, an isolated single-user coding assistant, or a mature standalone version-control product; the retrieved sources position Delta around shared agent threads and collaborative context rather than those use cases. [^bf9qeb] [^ifr2n4]

## Viable Alternatives

- **[[Tooling/AI-Toolkit/Generative AI/Code Generators/Claude Code|Claude Code]]:** A terminal-based coding-agent environment that Delta extends with multiplayer session sharing. [^rphla3]
- **[[Tooling/AI-Toolkit/Generative AI/Code Generators/Zed|Zed]]:** The fast code editor associated with Delta’s founding team and broader collaboration efforts. [^ifr2n4]
- **Conductor:** Delta provides an import path for Conductor conversations, making it a directly adjacent agent-workflow product. [^ppve3f]
- **[[Tooling/Software Development/Developer Experience/DevTools/Pi Coding Agent|Pi]]:** A planned DeltaDB integration indicates overlap in agent and developer-tool workflows. [^6lulvq]
- **[[Tooling/AI-Toolkit/Generative AI/Code Generators/Codex|Codex]]:** A planned DeltaDB integration indicates potential overlap for users working with coding agents. [^6lulvq]

## Competitor Table

| Competitor | Description |
|---|---|
| [Claude Code](https://claude.ai/code) | Coding-agent environment that Delta supports through shared-session collaboration. [^rphla3] |
| [Zed](https://zed.dev/) | Fast code editor linked to Delta’s founding organization and collaboration lineage. [^ifr2n4] |
| [Conductor](https://conductor.build/) | Agent-conversation product whose chats Delta can import as private threads. [^ppve3f] |
| [Pi](https://github.com/badlogic/pi-mono) | Agent/developer tool named among planned DeltaDB integrations. [^6lulvq] |
| [Codex](https://openai.com/codex/) | Coding-agent tool named among planned DeltaDB integrations. [^6lulvq] |


***

# Sources

[^6lulvq]: 2026, Nov 05. [delta.dev](https://delta.dev/). [The Diff: October 2026 — Delta Blog](https://delta.dev/blog/the-diff-2026-10). Updated: 2026, Nov 12. Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^bf9qeb]: 2026, Nov 10. [delta.dev](https://delta.dev/). [A Multiplayer Environment for Coding with Agents](https://delta.dev/?ref=notacompany). Updated: 2026, Nov 12. Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^ifr2n4]: 2026, Oct 29. [delta.dev](https://delta.dev/). [Building fine-grained version control for agents with Rust ...](https://delta.dev/blog/fine-grained-version-control-for-agents). Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^eybt9g]: 2026, Nov 12. [delta.dev](https://delta.dev/). [Claude Agent is now in Delta](https://delta.dev/blog/claude-agent-in-delta). Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^ppve3f]: 2026, Nov 10. [delta.dev](https://delta.dev/). [Bring your Conductor conversations into Delta](https://delta.dev/blog/import-conductor-chats). Updated: 2026, Nov 12. Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^rphla3]: 2026, Oct 27. [delta.dev](https://delta.dev/). [Claude Code is now multiplayer — Delta Blog](https://delta.dev/blog/claude-code-multiplayer). Updated: 2026, Nov 12. Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^9met8z]: 2026, Nov 11. [delta.dev](https://delta.dev/). [Cloud Runners are now in Delta](https://delta.dev/blog/cloud-runners). Updated: 2026, Nov 12. Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
[^49vsb4]: 2026, Nov 09. [delta.dev](https://delta.dev/). [Building a thread UI on hard mode — Delta Blog](https://delta.dev/blog/building-a-thread-ui-on-hard-mode). Updated: 2026, Nov 13. Generated: 2026, Nov 17. [Perplexity](https://www.perplexity.ai/) API response.
