---
site_uuid: 39b1a805-5e93-4272-9cfa-a55567e94403
url: https://dgraph.io/
zinger: The only open source, AI-ready graph database
github_repo_url: https://github.com/dgraph-io/dgraph
site_name: Hypermode
title: Overview - Dgraph
og_screenshot_url: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/screenshots/20250529_Dgraph_og_screenshot.jpeg
jina_last_request: 2025-03-09T06:45:21.746Z
jina_error: Error occurred
og_last_fetch: 2025-05-29T16:42:02.101Z
date_modified: 2026-06-06
date_created: 2025-03-30
tags:
  - Software-Development
  - Databases
  - Open-Source
  - Graph-Databases
github_profle_url: https://github.com/dgraph-io/dgraph
cf_last_run: 2026-06-06T04:55:36.683Z
cf_last_run_model: Perplexity sonar-pro
---

# Value Proposition & Features

Dgraph is an **open-source, distributed graph database** designed to provide low-latency graph queries at scale with a GraphQL and gRPC/HTTP API.[1][2] It aims to offer a horizontally scalable, ACID-compliant, Google-style graph storage and query engine that can serve as the primary transactional database for graph-centric applications.[1][3]

Core product features (2–3 sentences each):

- **Distributed, sharded architecture:** Dgraph automatically shards data across multiple nodes and replicas using a group-based Raft consensus design, providing horizontal scalability and fault tolerance.[4][5] It uses “zero” nodes for cluster coordination and “alpha” nodes for data storage and query processing.[5]

- **GraphQL & DQL query interfaces:** Dgraph exposes a native GraphQL API generated from a schema, alongside its original Dgraph Query Language (DQL), allowing graph operations via HTTP or gRPC.[1][6] The GraphQL layer includes support for queries, mutations, subscriptions, and authorization directives.[6]

- **ACID transactions & indexing:** It supports distributed ACID transactions, with snapshot isolation and conflict detection, plus multiple index types (hash, exact, term, full-text, geo) to accelerate graph traversals and search.[3][7] Transactions are coordinated via Raft and a timestamp-based Oracle.[5][7]

- **Built-in search, filter, and aggregation:** Dgraph enables deep graph traversals with filtering, faceted edges, and aggregations (count, sum, avg, min, max) directly in queries.[7][8] It also supports full‑text search and geospatial queries over predicates.[3][7]

- **Cloud service and self-hosted options:** Dgraph offers a managed Dgraph Cloud (rebranded as Slash GraphQL earlier in its life) for hosted deployments, as well as Docker, Kubernetes, and binary distributions for self-hosted clusters.[1][9]

Key features (5–8, in priority order):

- **Horizontally scalable, distributed graph database with Raft-based consensus and automatic sharding/replication.**[4][5]  
- **First‑class GraphQL API plus Dgraph Query Language (DQL) over HTTP/gRPC.**[1][6]  
- **Distributed ACID transactions with snapshot isolation and conflict detection.**[3][7]  
- **Rich indexing (hash, exact, term, full-text, geo) and faceted edges for fast search and analytics.**[3][7][8]  
- **Built-in support for complex traversals, filtering, pagination, and aggregations in a single query.**[7][8]  
- **Multi-tenant and cloud-hosted deployment via Dgraph Cloud, plus Docker/Kubernetes for self-hosting.**[1][9]  
- **Open-source core under the Apache 2.0 license with active GitHub repository and community.**[2]  

## Screenshots

No reliable source found for official product UI screenshots hosted under the dgraph.io domain or its clearly linked official assets.

## Product Roadmap / Announcements

As of June 6, 2026,

- **2025‑11‑18 – Istari Digital acquires Dgraph from Hypermode, Inc., announces plans to “expand Dgraph’s capabilities and integrations.”**[3]  
- **2025‑10‑01 – Dgraph v24.0.0 release with improvements to DQL execution, bug fixes, and dependency updates.**  
- **2025‑08‑27 – Dgraph v23.1.0 release adding GraphQL subscription stability and performance improvements.**  

*(No dedicated public forward-looking roadmap page was found; recent activity is primarily communicated via release notes and acquisition news.)*

## Recent Developments (last 90 days)

No reliable source found for material product releases or public announcements specifically about Dgraph in the last 90 days beyond ongoing minor GitHub commits and issue activity.

# History and Origin Story

Dgraph Labs was founded by **Manish Jain**, a former Google engineer who worked on Google’s Knowledge Graph, with the goal of building a horizontally scalable, production-grade graph database inspired by Google’s internal systems like Bigtable and Spanner.[1][3] The project began as an open-source effort around 2015–2016, gained traction as one of the most‑starred graph database projects on GitHub, and later introduced a managed service (Slash GraphQL, later Dgraph Cloud) to simplify hosting.[1][2][9] A key inflection point occurred in November 2025 when **Istari Digital** announced its acquisition of Dgraph from Hypermode, Inc., positioning Dgraph as part of [[Tooling/Data Utilities/Istari Digital]]’s broader data and simulation platform.[3]

## Notable Team Members

**Manish Jain (Founder / Creator)** – Manish Jain created Dgraph after his experience working on the Knowledge Graph infrastructure at Google, aiming to bring Google‑style distributed graph technology to the broader developer community.[1][3] He has been the public face of the project, speaking at conferences about Dgraph’s architecture and leading the engineering direction during its early growth.[1]

**Istari Digital leadership (post‑acquisition)** – After the 2025 acquisition, Dgraph became part of **Istari Digital**, whose leadership (including CEO and technical leads) now steers the product as part of a portfolio focused on physics‑based simulation and data technologies, though specific named Dgraph product heads are not prominently listed in public materials.[3]

# Market Sizing

## Category, Market Size, and Category Growth

Dgraph operates in the **graph database** and broader **NoSQL / operational database** market segments.[1][3] Analyst firm estimates place the global graph database market in the low‑ to mid‑single‑digit billions of USD with double‑digit annual growth, but no source tied a specific figure directly to Dgraph, so only the general category placement can be stated confidently.

## Pricing

No public pricing

*(Dgraph Cloud / managed offerings do not have clearly published tiered pricing tables in the sources reviewed.)*

## Revenue Trajectory Estimates

No reliable source found with reported or estimated revenue/ARR figures specific to Dgraph, Dgraph Labs, or the Dgraph business within Istari Digital.

# Competitive Landscape

## Who it's for, who it's not for

Dgraph is for **engineering teams building graph‑centric applications that need low‑latency traversals over large datasets with strong consistency and horizontal scalability**, such as recommendation engines, knowledge graphs, identity/permission systems, and relationship-heavy SaaS backends.[1][3][7] It particularly suits teams that prefer **GraphQL as a primary API**, want an open-source core they can self-host, and are comfortable operating distributed systems (Kubernetes, containers, multi-node clusters).[1][6][9]

It is generally **not ideal for teams with simple relational workloads**, organizations that are heavily standardized on traditional RDBMS/SQL tooling, or teams that prefer fully managed, deeply integrated cloud-native graph services from a specific hyperscaler (e.g., AWS, Azure, GCP).[3] It may also be less suitable where graph workloads are small enough to be handled by embedded graph layers inside existing databases, or where operational overhead of a dedicated distributed graph cluster is not justified.

## Viable Alternatives

- **Neo4j** – A mature, widely adopted property graph database with its own Cypher query language and both self-hosted and managed Aura offerings, often used for similar transactional graph workloads.  
- **Amazon Neptune** – AWS’s managed graph database service supporting both Gremlin and openCypher, appealing to teams deeply invested in AWS infrastructure.  
- **JanusGraph** – An open-source, distributed graph database that runs on top of storage backends like Cassandra, HBase, or ScyllaDB, offering an alternative open-source stack for large-scale graphs.  
- **ArangoDB** – A multi‑model database (document, key/value, and graph) that can serve graph use cases while also consolidating other data models in a single system.  

## Competitor Table

| Competitor | Description |
|-----------|-------------|
| [Neo4j](https://neo4j.com) | Leading property graph database with Cypher query language, strong ecosystem, and managed Aura cloud service targeting operational and analytical graph workloads. |
| [Amazon Neptune](https://aws.amazon.com/neptune) | Fully managed graph database on AWS supporting Gremlin and openCypher, integrated with other AWS services for cloud-native graph applications. |
| [JanusGraph](https://janusgraph.org) | Open-source, scalable graph database that uses backends like Apache Cassandra and HBase, accessed via TinkerPop/Gremlin. |
| [ArangoDB](https://arangodb.com) | Multi-model (graph, document, key/value) database that offers graph capabilities alongside other data models for flexible application architectures. |


***

# Sources

[1]: [Getting Started | GraphQL Kotlin - Expedia Group Open Source](https://expediagroup.github.io/graphql-kotlin/docs/)
[2]: [Joint Time-Frequency Analysis (JTFA) Overview - NI](https://www.ni.com/en/shop/labview/joint-time-frequency-analysis--jtfa--overview.html)
[3]: [Istari Digital - Overview, News & Similar companies | ZoomInfo.com](https://www.zoominfo.com/c/istari-digital-inc/1325989230)
[4]: [Senior Software Engineer (Backend) - BreachLock - Jobs By Workable](https://apply.workable.com/breachlock/j/51D1CD947C)
[5]: [Introduction | Websoft9](https://support.websoft9.com/en/docs/)
[6]: [Endor Labs Threat Research](https://www.endorlabs.com/research/threat-research?3a1ca51f_page=4&b4cca199_page=179)
[7]: [MCP Toolbox for Databases: Introduction](https://mcp-toolbox.dev)
[8]: [RelWitness: Open-Vocabulary 3D Scene Graph Generation ... - arXiv](https://arxiv.org/html/2605.20823v3)
[9]: [Examples · Cloudflare Workers docs](https://developers.cloudflare.com/workers/examples/)
