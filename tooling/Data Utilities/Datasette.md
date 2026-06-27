---
url: https://datasette.io/
og_title: Datasette
og_description: Datasette is a tool for exploring and publishing data. It helps people take data of any shape, analyze and explore it, and publish it as an interactive website and accompanying API.
og_image: https://datasette.io/static/datasette-card.png
og_favicon: https://datasette.io/favicon.ico
og_type: website
og_last_fetch: 2026-06-22T20:58:36.618Z
date_created: 2026-06-22
date_modified: 2026-06-22
tags:
  - Open-Source-Collaborations
  - Data-Science
  - Data-Analysis
site_uuid: a7d26dc4-060f-4fa8-abed-20d7f7a75e9b
publish: true
title: Datasette
slug: datasette
at_semantic_version: 0.0.0.1
cf_last_run: 2026-06-22T21:00:08.646Z
cf_last_run_model: Perplexity sonar-pro
---

[[Vocabulary/Data Analysis|Data Analysis]]
[[Vocabulary/Data Notebooks|Data Notebooks]]
[[Vocabulary/Data Labeling|Data Annotation]]
[[Open Source Collaborations|Open-Source-Collaborations]]
[[projects/Democratizing-Data/Democratizing Data|Democratizing Data]]

# Value Proposition & Features

Datasette is an open source **“multi-tool for exploring and publishing data”** that turns SQLite databases into interactive, searchable websites with a built‑in JSON API, without requiring backend programming.[1][3] It helps journalists, researchers, and data teams quickly stand up data portals, analysis dashboards, and lightweight applications while avoiding complex infrastructure.[1][2][10]

Datasette’s core product centers on taking one or more SQLite files and exposing them as browseable tables, faceted search interfaces, and parameterized queries over both HTML and JSON, suitable for public or internal data publishing.[1][3] Around this core it provides a plugin system, authentication and permissions, write interfaces, and tools like Datasette Apps so users can build and host custom HTML/JavaScript frontends directly inside the Datasette instance.[3][4][5]

**Key features (priority order):**

- **SQLite-to-website publishing:** Instantly transforms SQLite database files into interactive, searchable websites with a JSON API, without backend code.[1][3]  
- **Rich browsing and search UI:** Generates table and row pages with filtering, sorting, and query parameters for exploring data directly in the browser.[3][6]  
- **Built‑in JSON API:** Every table and query is accessible via a JSON API, making Datasette usable as an application backend.[1][4]  
- **Write interface (1.0a34):** A new write interface lets users insert, edit, and delete rows directly from Datasette’s table and row pages in the browser, eliminating the need for external tools for many updates.[2][3]  
- **Datasette Apps (host custom HTML apps):** The Datasette Apps plugin allows self‑contained HTML+JavaScript apps to be created, edited, and hosted inside Datasette, running in a secure sandbox and querying the underlying data via SQL.[4][5]  
- **Extensible plugin system:** Plugins can add capabilities such as new authentication methods, custom outputs, and integrations, including extending the Jump menu via a `jump_items_sql()` hook.[6]  
- **“Jump to” navigation (1.0a30):** A keyboard‑driven “Jump to” menu (triggered by `/` or the main menu) lets users type to jump to databases, tables, or canned queries, and is itself extensible by plugins.[6][8]  
- **LLM-powered Datasette Agent:** An LLM-powered agent can analyze tables and generate SQL queries against configured Datasette instances, including optional write SQL via an `execute_write_sql` tool.[9]  

## Screenshots

_No reliable official screenshots directly exposed as standalone image URLs were identified on datasette.io or official docs pages._  

## Product Roadmap / Announcements

As of June 22, 2026,

- **2026‑06‑18 – Datasette Apps launch:** Datasette announced **Datasette Apps**, a plugin that lets users “create and host custom HTML applications inside your Datasette instance,” running in a sandboxed iframe and interacting with data via SQL queries.[4][5]  
- **2026‑06‑18 – Datasette Apps technical deep dive:** A companion blog post by Simon Willison explains that Datasette Apps are “self-contained HTML+JavaScript applications” that run in a constrained `<iframe>` sandbox, can execute read‑only or configured write SQL, and are prevented from exfiltrating data via CSP and sandbox settings.[5]  
- **2026‑06‑16 – Datasette 1.0a34 release:** Release 1.0a34 introduces the headline feature of a write interface for inserting, editing, and deleting rows directly within Datasette’s browser UI, along with other alpha‑stage improvements.[2][3]  
- **2026‑05‑XX – Datasette 1.0a30 Jump menu:** Datasette 1.0a30 added an extensible “Jump to” menu for quickly navigating within an instance and allowed plugins to contribute additional items through a `jump_items_sql()` hook.[6][8]  

## Recent Developments (past 90 days)

- **Datasette Apps and sandboxed in‑instance apps (2026‑06‑18):** Datasette Apps introduced an integrated way to build sandboxed HTML+JS apps that query Datasette data, with fine‑grained control over which databases each app can access and optional write queries via stored queries.[4][5]  
- **Write interface in alpha (1.0a34, 2026‑06‑16):** The 1.0a34 alpha release added a browser‑based write interface enabling row insert, edit, and delete operations, significantly expanding Datasette from read‑only exploration toward light data management.[2][3]  
- **Extensible Jump menu (1.0a30, ~May 2026):** The new Jump menu provides command‑palette style navigation and exposes a plugin hook so extensions can surface their own content in the menu.[6][8]  

# History and Origin Story

Datasette is an open source project maintained by Simon Willison, described as “an open source multi-tool for exploring and publishing data.”[3] It evolved over several years as a tool for data journalists, researchers, and others who needed a fast way to publish SQLite databases as browseable sites and APIs, and has steadily added capabilities such as plugins, authentication, and now write interfaces and in‑instance apps.[2][3][10] Simon’s personal blog and talks have chronicled this progression, including experimental work running Datasette in the browser via Pyodide and service workers.[7]  

## Fundraising History

_No reliable source found_ for any institutional fundraising rounds (Pre‑Seed, Seed, Series A, etc.) associated with Datasette as a company or product; available information presents it as an open source project maintained by Simon Willison rather than a funded startup.[2][3][10]  

### Funding Table

| Round | Date | Amount | Lead investor |
| --- | --- | --- | --- |
| Total | – | – | – |

**Investors (alphabetical):**  
_No reliable source found_  

## Notable Team Members

**Simon Willison – Maintainer / creator**  
Datasette is “maintained by Simon Willison,” who develops the core project, writes release notes, and publishes deep‑dive posts on new capabilities like Datasette Apps and alpha releases such as 1.0a34.[2][3][5]  

_No additional notable team members or formal leadership roles are documented in high‑quality sources; materials consistently describe Datasette as Simon Willison’s open source project._[2][3][5][10]  

# Market Sizing

## Category, Market Size, and Category Growth

Datasette fits into the categories of **open source data exploration and publishing tools**, **lightweight data portals**, and **developer‑oriented analytics tooling**, specifically centered on SQLite databases and API‑driven data access.[1][2][3] It targets data journalists, researchers, archivists, and similar roles needing to publish structured data, situating it adjacent to sectors like data cataloging, self‑service BI, and open data portals rather than full enterprise BI platforms.[1][2][10]  

No reliable analyst or financial journalism sources provide a specific market size or CAGR for the “SQLite-based open source data exploration” niche that directly maps to Datasette.  

## Pricing

| Tier | Details |
| --- | --- |
| – | Datasette is an open source project; no hosted service pricing or commercial pricing tiers are publicly described on datasette.io or in official materials.[1][3][4] |

## Revenue Trajectory Estimates

No reliable source found for revenue, ARR, or monetization data for Datasette as a standalone business or service.  

# Competitive Landscape

## Who it's for, who it's not for

Datasette is for **data journalists, researchers, analysts, archivists, local governments, scientists, museum curators, and similar roles** who have data in or convertible to SQLite and want a fast way to publish it as a browsable website and JSON API, often with minimal DevOps and backend coding.[1][2][10] These users value being able to prototype dashboards, share data with the public or collaborators, and build lightweight apps (now including Datasette Apps) on top of an existing SQLite‑backed data store.[1][4][5]  

It is not ideal for organizations that require a full‑stack enterprise BI platform with complex visualizations, drag‑and‑drop dashboards for non‑technical business users, or deep integration with large data warehouses and non‑SQLite databases, nor for cases needing highly opinionated data modeling and governance workflows out of the box.[1][2][3] Teams needing heavy‑duty, multi‑engine analytics, broad SaaS integrations, or strict enterprise SLAs typically look toward commercial BI and data‑platform products instead.  

## Viable Alternatives

- **[[Metabase]]** – Open source [[Vocabulary/Business Intelligence|Business Intelligence]] and dashboarding tool that connects to many SQL databases and provides a non‑technical, question‑driven interface and dashboards, more focused on visualization than on turning [[Tooling/Software Development/Databases/SQLite|SQLite]] into a general API and app host.  
- **Superset ([[Apache Superset]])** – Open source data exploration and visualization platform with rich dashboards and SQL Lab, oriented toward data warehouses and BI use cases rather than lightweight SQLite‑first publishing.  
- **CKAN** – Open source open-data portal platform used by governments and organizations to publish datasets, more opinionated around catalogs and metadata compared to Datasette’s lightweight SQLite‑centric model.  
- **Redash** – SQL-based dashboarding and visualization frontend for multiple data sources, providing collaborative queries and charts but not the same SQLite‑to‑website/API focus.  
- **[[organizations/Hasura|Hasura]] (on SQLite or other DBs)** – GraphQL engine that auto‑generates APIs over databases, useful for app backends but requiring more infrastructure and not providing Datasette’s out‑of‑the‑box browsing UI or plugin ecosystem.  

## Competitor Table

| Competitor | Description |
| --- | --- |
| [Metabase](https://www.metabase.com) | Open source BI and analytics tool that connects to many databases and provides dashboards and question‑driven querying for non‑technical users. |
| [Apache Superset](https://superset.apache.org) | Open source data exploration and visualization platform focused on interactive dashboards, charts, and SQL exploration over data warehouses and databases. |
| [CKAN](https://ckan.org) | Open source data portal platform used to publish, catalog, and manage open datasets for governments and organizations. |
| [Redash](https://redash.io) | SQL-based analytics and dashboarding tool for querying multiple data sources and sharing visualizations and alerts. |
| [Hasura](https://hasura.io) | GraphQL engine that auto‑generates real-time APIs over relational databases, emphasizing application backends more than in‑browser data exploration UIs. |


***

# Sources

[1]: [Datasette VPS Docker | Pubblicazione dati con un clic - Hostinger](https://www.hostinger.com/it/applications/datasette)
[2]: [Datasette publishes new 1.0a34 release for data exploration](https://letsdatascience.com/news/datasette-publishes-new-10a34-release-for-data-exploration-1a8b584d)
[3]: [Release: datasette 1.0a34 - Simon Willison's Weblog](https://simonwillison.net/2026/Jun/16/datasette/)
[4]: [Host applications inside Datasette with Datasette Apps](https://datasette.io/blog/2026/datasette-apps/)
[5]: [Datasette Apps: Host custom HTML applications inside Datasette](https://simonwillison.net/2026/Jun/18/datasette-apps/)
[6]: [The extensible "Jump to" menu in Datasette 1.0a30](https://datasette.io/blog/2026/jump-menu/)
[7]: [Datasette in the browser - Simon Willison simonw](https://simonw.github.io/research/pyodide-asgi-browser/datasette.html)
[8]: [Fun new feature in Datasette 1.0a30 - a "jump to" menu, also ...](https://x.com/simonw/status/2058704797612785849)
[9]: [An LLM-powered agent for Datasette - GitHub](https://github.com/datasette/datasette-agent)
[10]: [Host custom HTML applications inside Datasette | Hacker News](https://news.ycombinator.com/item?id=48593731)
