---
date_created: 2026-06-22
date_modified: 2026-06-22
title: Up And Running With Composio
at_semantic_version: 0.0.0.1
slug: up-and-running-with-composio
publish: true
authors:
  - Michael Staton
tags:
  - API-Integrations
  - AI-Orchestrators
  - MCP
site_uuid: 005399a3-fe3d-4a0d-aa41-ff249d3c5621
---

[Composio](https://composio.dev) is a hosted catalog of authenticated tool integrations for LLM agents — you connect an account once (OAuth, API key) and your agent gets typed actions against that service without you writing the client. We added it to **augment-it** to evaluate whether its **LinkedIn** toolkit could speed up our common enrichment tasks. Short answer on LinkedIn below; it is not what we hoped, and the *why* is worth recording.

## Installation

In the `augment-it` pnpm workspace root:

```zsh
pnpm add -w @composio/core @composio/claude-agent-sdk @anthropic-ai/claude-agent-sdk
```

The `-w` is required — pnpm refuses a bare `pnpm add` at a workspace root (`ERR_PNPM_ADDING_TO_ROOT`) to stop you accidentally hanging a dependency off the root instead of a package. These three *are* root-level, so `-w` is correct.

> [!warning] Two unmet peer-dependency warnings (install still succeeds)
> `@anthropic-ai/claude-agent-sdk` wants `zod@^4.0.0` (workspace has `3.25.76`) and `@anthropic-ai/sdk@>=0.93.0` (resolved `0.69.0`). pnpm does **not** auto-upgrade peers. These are warnings, not failures — bump `zod` and `@anthropic-ai/sdk` only if the agent SDK throws at import or type-check time (zod v3→v4 had breaking changes).

It installs into the workspace `node_modules`, not globally.

## The finding: Composio's LinkedIn toolkit is a *write* surface, not a *read* surface

This is the part to remember. Our [[Augment-It-as-CRM-Augmentation-Pipeline|augment-it]] context-v corpus wants LinkedIn for **reads on arbitrary entities** — find a stranger's profile URL, location, headline, and current role given only a name. That need recurs across nearly every enrichment design:

- **Profile discovery for any entity** — `Common-Six-Social-Packs`, `Entity-Profile-Augmentation-Workflow`, `Connector-Inventory-and-Per-Record-Palette`
- **Location inference over a network** — `LinkedIn-Network-Explorer-For-Curated-Invites`, `Joined-People-UI-and-the-Network-First-Pivot`
- **Personal-network extraction** — list your own connections, then enrich
- **Sparse-person resolution** — `Sparse-Person-Enrichment-Surface`

Composio's LinkedIn toolkit is the **official LinkedIn OAuth2 API**. Its ~22 actions are overwhelmingly *write/marketing*: create post, create comment, create article, upload image/video, ad-targeting facets, audience counts, organization-page statistics. The only reads are **"Get my info"** (your own profile) and **"Get person profile"** by member ID — and per LinkedIn's API policy that second one only returns the authenticated member or members who have explicitly authorized your app.

> [!warning] There is no people-search, and no way to fetch a stranger's location/headline
> This is not a Composio limitation — it is LinkedIn policy. Our own `LinkedIn-Network-Explorer-For-Curated-Invites` already documented the wall: the `/me/connections` endpoint was deprecated ~2015, there is no public search API, and scraping gets accounts banned. **Composio does not change that reality.** Enrichment, location inference, profile discovery, and sparse-person resolution correctly stay on the search-inference path (SearXNG / Tavily / SerpApi).

One architectural consequence: `Connector-Inventory-and-Per-Record-Palette` slots a future `linkedin-public` connector to serve the `search.social.linkedin` intent. **Composio cannot fill that slot** — that intent is a people-*search*, which the official API does not offer.

## Where Composio's LinkedIn toolkit *does* earn its place

The **outbound + client-reporting** side — barely touched in our corpus today, but real consulting work:

> [!check] Legitimate, API-blessed, no scraping risk
> - **Client org-page analytics for reporting** — `Get organization page statistics`, `Get share statistics`, `Get network size`, `Get company info` give authoritative impressions / clicks / follower-growth for a **client org the operator manages**. Good raw material for a VC-client dashboard.
> - **The actual outreach step of the invite workflow** — `LinkedIn-Network-Explorer` ends in *inviting* a curated list. Composio can post the announcement to the operator's or client's company page and manage comments — turning "build the list" into "build the list *and* publish."
> - **Own identity / managed orgs** — `Get my info` + `Get company info` (orgs where you hold posting rights).

These scope cleanly to our per-client `client_access[]` / workspace model, because they act as the operator's *own* authenticated identity — not arbitrary-entity data.

## Recommendation

- **Do not** wire Composio LinkedIn to accelerate enrichment — it can't, and pretending it can would corrupt the connector-inventory model.
- **Do** use it narrowly for client org-page analytics and outbound posting.
- If you want Composio to speed up augment-it's actual common tasks, the high-value toolkits are **not LinkedIn** — they are the CRM/comms connectors (**Gmail, Google Calendar**, a CRM alongside the existing [[decile-hub-connector|Decile]] integration) that map onto the `land-back` side of the augmentation pipeline, where official-OAuth connectors genuinely shine.

> [!note] The general lesson
> When evaluating any "agent gets superpowers" integration catalog, check the **read/write asymmetry of the underlying API** before the toolkit's marketing. A platform that locks down reads (LinkedIn) exposes a toolkit that is necessarily lopsided toward writes — no wrapper can give you data the source API refuses to return.
