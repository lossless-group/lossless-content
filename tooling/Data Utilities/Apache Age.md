---
url: https://age.apache.org/
maintained_by: "[[organizations/The Apache Software Foundation|The Apache Software Foundation]]"
date_created: 2026-06-17
date_modified: 2026-06-18
github_repo_url: https://github.com/apache/age
site_uuid: fed6a6af-8ba8-4e8c-8ecf-0255a31bb1ea
publish: true
title: Apache Age
slug: apache-age
at_semantic_version: 0.0.0.1
cf_last_run: 2026-06-18T17:15:53.536Z
cf_last_run_model: Perplexity sonar-pro
---

[[organizations/The Apache Software Foundation|The Apache Software Foundation]]
[[Tooling/Software Development/Databases/Postgres|Postgres]]
[[Vocabulary/AI-Ready Data|AI-Ready Data]]
[[Tooling/AI-Toolkit/Models/GraphRAG|GraphRAG]]
[[concepts/Explainers for Tooling/Graph Databases|Graph Databases]]


# Value Proposition & Features

Apache AGE is **“a PostgreSQL extension that provides graph database functionality”** so users can store and query both relational and graph data in the same Postgres instance using the openCypher query language. It targets developers who want **property graph** features without deploying a separate graph database, letting them leverage existing PostgreSQL tooling, scalability, and ecosystem. As an Apache Incubator project, it is open source and designed to integrate with Postgres-compatible platforms such as Azure HorizonDB. [^yzaso5]

Core feature highlights (2–3 sentences each):

- **PostgreSQL extension architecture** – AGE installs as an extension into an existing PostgreSQL cluster, adding new graph types and functions while preserving native SQL and relational schemas. This allows mixed workloads where relational tables and graph data coexist and can be combined in queries.
- **Property graph model** – AGE implements a labeled property graph: vertices and edges can both have labels and arbitrary key–value properties stored within PostgreSQL. This enables use cases like social networks, recommendation graphs, and knowledge graphs on top of standard Postgres storage. [^545nrv] [^w64vx9]
- **openCypher query support** – Users query graphs with openCypher, a popular declarative graph query language, via AGE’s functions in SQL. This lets developers familiar with Cypher-style syntax (e.g., MATCH patterns) work directly in Postgres without learning a proprietary language. [^545nrv] [^w64vx9]
- **Integration with Postgres ecosystem** – Because AGE runs in Postgres, it inherits SQL support, transactional consistency, backup/replication, and compatibility with Postgres tools and drivers. Cloud services like Azure HorizonDB explicitly highlight that they include Apache AGE as their graph extension. [^yzaso5]
- **Graph + AI/agents use cases** – AGE is used as the graph backend in AI-agent and GraphRAG-style systems, where Postgres acts as both relational store and graph memory. [^545nrv] [^kcsw7y] This demonstrates its suitability for modern AI workloads that need graph reasoning on top of transactional data. [^545nrv] [^kcsw7y]

Key features in priority order:

- **PostgreSQL extension providing graph database functionality within Postgres**  
- **Labeled property graph model (vertices/edges with labels and properties)**  
- **openCypher graph query language support inside SQL**  
- **Coexistence of relational and graph data in one database**  
- **Leverages PostgreSQL tooling, replication, and ecosystem**  
- **Adopted in Azure HorizonDB as its graph extension layer**[^yzaso5]  
- **Used as a graph backend for AI agents and GraphRAG workloads**[^545nrv] [^kcsw7y]  

## Screenshots

No reliable source found for official screenshots of Apache AGE on the canonical site or GitHub repository.

## Product Roadmap / Announcements

As of June 18, 2026,

- **2026‑06‑05** – A blog on [[Tooling/Software Development/Cloud Infrastructure/Azure|Azure]] [[HorizonDB]] preview notes that **Azure HorizonDB “includes Apache AGE (A Graph Extension) — a PostgreSQL extension developed under the Apache Incubator project”**, indicating active integration and relevance to modern AI data platforms. [^yzaso5]  
- No explicit public roadmap or recent versioned release announcements were found on the Apache AGE site or primary repositories in the last 6 months.

## Recent Developments

- A June 2026 article on Azure HorizonDB (Preview) highlights Apache AGE as the built‑in graph extension powering graph database capabilities in Microsoft’s new PostgreSQL-based AI data platform, underscoring AGE’s role in cloud-scale AI/graph workloads. [^yzaso5]  
- Recent technical blogs on graph databases and AI agents describe Apache AGE as a Postgres extension adding graph query capabilities (openCypher) to existing Postgres deployments, showing continued community use in knowledge-graph and GraphRAG systems. [^545nrv] [^kcsw7y]  

# Market Sizing

## Category, Market Size, and Category Growth

Apache AGE fits primarily into the **[[concepts/Explainers for Tooling/Graph Databases|Graph Databases]]** and **graph extension for relational databases** categories, specifically as a **graph layer over PostgreSQL** enabling labeled property graphs and openCypher queries. [^yzaso5] [^qs3azy] Industry research on graph databases (e.g., from analyst firms) typically projects multi‑billion‑dollar market size and strong double-digit CAGR for graph databases and knowledge graph technologies, but no source directly segments Apache AGE’s share or provides product-specific forecasts, and no such detailed analyst breakdown was found tied explicitly to Apache AGE. [^qs3azy]  

## Pricing

Apache AGE is an **open-source Apache Incubator project**, and there is **no public commercial pricing** for the software itself on its official materials; it is available as a PostgreSQL extension under Apache governance. [^yzaso5]

| Tier | Price | Notes |
| --- | --- | --- |
| – | no public pricing | Open-source Apache Incubator project; packaged and priced only indirectly when bundled by cloud providers such as Azure HorizonDB. [^yzaso5] |

## Revenue Trajectory Estimates

No reliable source found for revenue or ARR figures specifically attributable to Apache AGE, as it is an open-source Apache project rather than a standalone commercial vendor. [^yzaso5]

# Competitive Landscape

## Who it's for, who it's not for

Apache AGE is best suited for **PostgreSQL users who need graph database capabilities**—for example, teams building recommendation systems, network analysis, knowledge graphs, or AI/agent memory layers—while wanting to keep data and operations inside a single Postgres environment. [^545nrv] [^kcsw7y] [^yzaso5] It also fits organizations that prefer open-source Apache projects and want to exploit Postgres’ operational maturity (backup, replication, monitoring) while adding property graph and openCypher querying. [^yzaso5]

It is less suitable for users who require **specialized, standalone graph databases** with their own storage engines and cluster management (e.g., massive-scale graph analytics with non-Postgres storage), or for teams not using PostgreSQL at all. [^qs3azy] It may also be a weaker fit where a fully managed, proprietary graph database with integrated tooling and vendor support is mandated instead of an extension-based approach. [^qs3azy]

## Viable Alternatives

- **pg_graphql** – A Postgres extension that adds a GraphQL API layer over PostgreSQL, mentioned alongside Apache AGE as another “graph layer” option, suited to users who prefer GraphQL semantics rather than property graph/openCypher. [^qs3azy]  
- **JanusGraph** – An open-source, distributed graph database; a separate system from Postgres, suitable when users want a dedicated graph store and can tolerate running and operating another database. [^pufw8n]  
- **Native cloud graph services (e.g., Neo4j Aura, Amazon Neptune, Azure Cosmos DB Gremlin API)** – Managed graph databases for organizations that prefer turnkey SaaS graph solutions over embedding graph functionality into Postgres; no direct Apache AGE mentions, but they occupy the same broad graph-database problem space.  
- **Other Postgres-based graph extensions** – Articles discussing graph layers over PostgreSQL position Apache AGE alongside alternatives such as pg_graphql and other approaches for adding graph capabilities on top of existing relational stores. [^qs3azy]  

## Competitor Table

| Competitor | Description |
| --- | --- |
| [pg_graphql] | PostgreSQL extension providing a GraphQL API and “graph layer” over Postgres, positioned as an alternative graph-oriented interface next to Apache AGE. [^qs3azy] |
| [JanusGraph] | Open-source, distributed graph database that runs as a separate system from PostgreSQL, used when a standalone, horizontally scalable graph store is required. [^pufw8n] |
| [Neo4j] | Widely used native graph database implementing the property graph model and the Cypher query language; serves similar use cases but as a separate database rather than a Postgres extension. |
| [Amazon Neptune] | AWS managed graph database service supporting property graph and RDF models, offering fully managed infrastructure instead of embedding graph features in Postgres. |
| [Azure Cosmos DB (Gremlin API)] | Microsoft’s globally distributed multi-model database with Gremlin-based graph support, offering a managed graph capability for Azure users who do not need Postgres integration. |


***

# Sources

[^545nrv]: [Graph Database AI Agents: GraphRAG & Memory Guide - FalkorDB](https://www.falkordb.com/blog/graph-database-ai-agents/)
[^kcsw7y]: [Agent Memory Systems and Knowledge Graphs: Letta, Mem0 ...](https://codepointer.substack.com/p/agent-memory-systems-and-knowledge)
[^w64vx9]: [Graph database-ball! Exploring the Game with the graph capabilities ...](https://theconsensus.dev/p/2026/05/29/ladybug-duckdb-and-postgresql.html)
[^yzaso5]: [Azure HorizonDB (Preview) – Cluster Creation, Compute Scaling ...](https://praveenkumarsreeram.com/2026/06/05/azure-horizondb-preview-cluster-creation-compute-scaling-graph-db-ai-pipelines/)
[5]: [Apache Polaris 1.5 Release: Open Source Data Catalog - Snowflake](https://www.snowflake.com/en/blog/engineering/apache-polaris-1-5-release/)
[^pufw8n]: [Working with JanusGraph? Here's how gdotv compares to ...](https://gdotv.com/blog/janusgraph-visualizer-vs-gdotv/)
[7]: [Principal Machine Learning Engineer, Accelerated Apache Spark](http://jobs.nvidia.com/careers/job/893395221999)
[8]: [semantica/README.md at main - Context Graphs - GitHub](https://github.com/Hawksight-AI/semantica/blob/main/README.md)
[^qs3azy]: [pg_mentat 1.3.0 released -- Datomic-compatible Datalog inside ...](https://www.postgresql.org/about/news/pg_mentat-130-released-datomic-compatible-datalog-inside-postgresql-3306/)
