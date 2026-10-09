---
aliases:
  - Amazon DynamoDB
date_created: 2026-10-09
date_modified: 2026-10-09
maintained_by: "[[organizations/Amazon|Amazon]]"
site_uuid: 1014dbc9-becc-4f10-a6b7-2d19113ae232
publish: true
title: DynamoDB
slug: dynamod-b
at_semantic_version: 0.0.0.1
tags:
  - Document-Databases
  - NoSQL-Databases
url: https://aws.amazon.com/dynamodb/
og_title: Amazon DynamoDB
og_description: Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database that runs high-performance applications at any scale, with built-in security, continuous backups, and automated multi-region replication.
og_image:
og_favicon: https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico
og_site_name: Amazon Web Services, Inc.
og_type: website
og_last_fetch: 2026-10-09T01:12:58.789Z
cf_last_run: 2026-10-09T01:49:28.491Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 6
cf_last_run_retrieval: 2026-10-09T01:49:28.491Z
---

[[concepts/Explainers for Tooling/NoSQL|NoSQL]]
[[concepts/Explainers for Tooling/Document Databases|Document Databases]]

[[organizations/Amazon|Amazon]] DynamoDB is a fully managed, serverless [[concepts/Explainers for Tooling/NoSQL|NoSQL]] key-value and [[concepts/Explainers for Tooling/Document Databases|Document Databases]] service provided by AWS. [^vn905k] [^1gwlde] 
## Core Features & Architecture

* Performance: Delivers consistent single-digit millisecond response times at any scale. [^vn905k] 
* [[Vocabulary/Serverless|Serverless]] & Scalable: Offers zero infrastructure management, automatic partitioning, and instant scaling to handle traffic spikes. [^274ebv] 
* Data Model: Organizes data into tables, items, and attributes using simple or composite primary keys (partition key and sort key). [^p6j8sl] [^9fgblb] 
* Item Size Limit: Each item can hold up to 400 KB of data. [^4dg5se] 
* Global Tables: Provides multi-Region, multi-active replication with up to 99.999% availability. [^274ebv] [^twc3sp] 
* Key Capabilities: Supports [[Vocabulary/ACID Transactions|ACID]] transactions, secondary indexes (GSI/LSI), change data capture via DynamoDB [[Vocabulary/Streaming Data|Streaming Data]], and native vector search. [^274ebv] [^p6j8sl] [^y62flp] 

For official guides and documentation, visit the [Amazon DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/). [^j58akf] 
Would you like help with data modeling strategies, writing a query, or comparing DynamoDB to another database?

# Value Proposition & Features

Amazon DynamoDB is a **fully managed, serverless key-value and document database** designed for high-performance applications at any scale. It provides usage-based pricing, automated scalability, AWS integration, multi-Region replication, granular security controls, continuous backups, and import/export tools via an API. [^E1]

Its architecture abstracts infrastructure management from customers: AWS handles scaling, maintenance, and database operations, while applications access data through DynamoDB’s API. The service is designed for single-digit-millisecond performance and supports globally distributed workloads through multi-Region, multi-active tables. [^i4e45h]

Priority features:

- **Serverless, fully managed operation:** Customers avoid infrastructure provisioning, upgrades, and maintenance windows. [^i4e45h]
- **Key-value and document data models:** DynamoDB supports both key-value records and document-oriented data. [^mks31g]
- **Automatic scaling:** Capacity can adjust to workload demand without manual infrastructure management. [^i4e45h]
- **Usage-based billing:** Pay-per-request billing is available for variable workloads. [^i4e45h]
- **Global tables:** Multi-Region, multi-active replication supports globally distributed applications. [^i4e45h]
- **Consistency options:** Applications can use eventual consistency or strong consistency, including multi-Region strong consistency. [^ow4iyq]
- **Security and encryption:** The service provides granular access controls and encryption capabilities. [^E1]
- **Backups and data mobility:** Continuous backups plus import and export tools support resilience and migration. [^E1]

## Screenshots

No three official screenshot URLs were identified in the available search results.

## Product Roadmap / Announcements

As of October 9, 2026, the available results did not identify a reliable, official public roadmap or a sufficiently documented product announcement published within the preceding six months.

## Recent Developments

- AWS’s current DynamoDB product page highlights multi-Region strong consistency, which is intended to let applications read the same data from any supported Region while maintaining continuous availability. [^i4e45h]
- A September 2026 report claimed that AWS announced general availability of vector search in DynamoDB, but the available result came from a low-authority press-release site and was not independently confirmed by an official AWS source; it should therefore be treated as unverified. [^6hegiy]
- Perplexity reportedly replaced DynamoDB with an internally developed key-value database and claimed potential annual savings of up to $100 million; the claim was reported by secondary sources and was not independently verified in the available results. [^52cmyi]

# History and Origin Story

DynamoDB was launched by Amazon in 2012 as a managed evolution of ideas associated with Amazon’s earlier Dynamo distributed-storage system. [^ow4iyq] The service’s later architecture, described in a 2022 SIGMOD paper by the DynamoDB team, separates request routing, metadata management, journaling, storage, caching, and autoscaling behind a managed API. [^ow4iyq] No reliable source in the available results identified individual founders.

# Market Sizing

## Category, Market Size, and Category Growth

DynamoDB operates in the **managed NoSQL database**, **key-value database**, and **document-database** categories. AWS positions it as a serverless key-value and document database, while its service documentation describes DynamoDB as a database for AWS customers. [^E1] [^mks31g]

The available market estimates were not sufficiently authoritative to attribute a precise DynamoDB-specific market share or revenue figure. One industry estimate placed the broader data and database management market at $125.21 billion in 2025, forecasting $137.8 billion in 2026 at a 10.1% compound annual growth rate, but this category is much broader than DynamoDB’s addressable segment. [^6ceif8]

## Pricing

| Pricing option | Description |
|---|---|
| Pay-per-request | Usage-based billing for variable workloads. [^i4e45h] |
| Provisioned capacity | Capacity-based billing for workloads with predictable demand; no specific rates were returned in the available results. |
| Reserved or commitment pricing | No specific rates were returned in the available results. |

AWS describes DynamoDB as offering usage-based pricing and pay-per-request billing. [^E1] [^i4e45h]

## Revenue Trajectory Estimates

No reliable public source in the available results reported DynamoDB’s standalone revenue or ARR. AWS reports DynamoDB as part of its broader cloud-services business rather than as a separately disclosed revenue segment.

# Competitive Landscape

## Who it's for, who it's not for

DynamoDB is suited to AWS-native teams building high-throughput, low-latency applications that need automated scaling, managed operations, and optional multi-Region replication. [^E1] [^i4e45h] Typical workloads include globally distributed applications and systems requiring predictable millisecond-level performance. [^i4e45h]

It is less suited to workloads that depend on relational joins, broad ad hoc SQL analytics, or database portability outside AWS; the available sources establish DynamoDB’s key-value/document orientation but do not provide a formal AWS anti-ICP statement. [^E1] [^mks31g]

## Viable Alternatives

- **Amazon Aurora:** A managed relational database alternative for SQL workloads and relational schemas.
- **Amazon DocumentDB:** An AWS-managed document-database alternative for applications using document-oriented access patterns.
- **MongoDB Atlas:** A managed document-database alternative for teams seeking a multi-cloud or MongoDB-compatible platform, adjacent to [[concepts/Explainers for Tooling/Document Databases|Document Databases]].
- **Apache Cassandra / managed Cassandra services:** Distributed wide-column alternatives for high-scale workloads.
- **Microsoft Azure Cosmos DB:** A managed globally distributed NoSQL alternative with multiple data models.

## Competitor Table

| Competitor | Description |
|---|---|
| [Amazon Aurora](https://aws.amazon.com/rds/aurora/) | Managed relational database for SQL-oriented applications and transactional workloads. |
| [Amazon DocumentDB](https://aws.amazon.com/documentdb/) | AWS-managed document database for document-oriented applications. |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Managed document database available across major cloud providers. |
| [Apache Cassandra](https://cassandra.apache.org/) | Distributed wide-column database designed for scalable, fault-tolerant workloads. |
| [Azure Cosmos DB](https://azure.microsoft.com/products/cosmos-db) | Globally distributed managed NoSQL database from Microsoft Azure. |


***

# Sources

[^i4e45h]: [Amazon DynamoDB](https://aws.amazon.com/dynamodb/?trk=5fa2d842-4ea7-471c-b68f-6855f38d19ae&sc_channel=ps&trk=5fa2d842-4ea7-471c-b68f-6855f38d19ae&sc_channel=ps&ef_id=CjwKCAjwq8PVBhAKEiwA2i3SHaxOwMvbJg7fcrrWa3bSAipo-7_-Xeox_MiJYShVelAcxP1e6hHoMxoCnskQAvD_BwE:G:s&s_kwcid=AL!4422!3!808827088727!p!!g!!dynamodb!23846236262!198027689722)
[^ow4iyq]: [The Amazon DynamoDB Paper, Explained: How a Managed NoSQL Service...](https://www.nosqlsummer.org/blog/amazon-dynamodb-paper-explained-2026/)
[^mks31g]: [Amazon DynamoDB Resources](https://aws.amazon.com/dynamodb/resources/?trk=229f4fd3-f0f0-4f63-b739-9aa8c90e89a9&sc_channel=el&refid=229f4fd3-f0f0-4f63-b739-9aa8c90e89a9)
[^6hegiy]: [Vector Database Market Size Worth USD 17.37 Billion ...](https://www.openpr.com/news/4646158/vector-database-market-size-worth-usd-17-37-billion-by-2034-cagr)
[5]: [dynamodb](https://bittide.aicompass.dev/tag/dynamodb?locale=zh)
[6]: [www.aboutchromebooks.com · vector-database-marketVector Database Market Statistics 2026 - aboutchromebooks.com](https://www.aboutchromebooks.com/vector-database-market-statistics/)
[7]: [Deux ingénieurs et un essaim d'IA remplacent AWS DynamoDB, économisant $100M par an](https://thespecialtynews.com/fr/article/perplexity-ai-agents-replace-aws-dynamodb)
[8]: [Key Value Database Market Valuation and Forecast 2026 ...](https://www.linkedin.com/pulse/key-value-database-market-valuation-forecast-2026-2033-49-zej0e)
[9]: [Aravind Srinivas](https://x.com/AravSrinivas/status/2099957318935028173)
[10]: [What is DynamoDB?](https://nodique.com/guides/what-is-dynamodb)
[^6ceif8]: [Data And Database Management Market Size Report 2026-2030](https://www.thebusinessresearchcompany.com/report/data-and-database-management-market-report)
[12]: [nosqlsummer — Distributed databases paper club, 1970 to today](http://www.nosqlsummer.org/)
[13]: [Database Management Services Market Insights Highlight Segment Expansion And Market Leadership](https://www.openpr.com/news/4640791/database-management-services-market-insights-highlight)
[^52cmyi]: [Perplexity CobbleDB Replaces DynamoDB, With a Claimed $100 ...](https://www.remio.ai/post/perplexity-cobbledb-replaces-dynamodb-with-a-claimed-100-million-annual-saving)
[15]: [Dynamo: Amazon's Highly Available Key-value Store - ScaleDojo](https://scaledojo.dev/papers/dynamo-amazons-highly-available-key-value-store)
[^vn905k]: [https://docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
[^1gwlde]: [https://www.w3schools.com](https://www.w3schools.com/aws/aws_cloudessentials_amazondynamodb.php)
[^274ebv]: [https://aws.amazon.com](https://aws.amazon.com/dynamodb/)
[^p6j8sl]: [https://en.wikipedia.org](https://en.wikipedia.org/wiki/Amazon_DynamoDB)
[^9fgblb]: [https://www.youtube.com](https://www.youtube.com/watch?v=PVUofrFiS_A)
[^4dg5se]: [https://www.hellointerview.com](https://www.hellointerview.com/learn/system-design/deep-dives/dynamodb)
[^twc3sp]: [https://aws.amazon.com](https://aws.amazon.com/dynamodb/faqs/)
[^y62flp]: [https://www.youtube.com](https://www.youtube.com/watch?v=kxW3-k7NXwo&t=1)
[^j58akf]: [https://docs.aws.amazon.com](https://docs.aws.amazon.com/dynamodb/)

## Sources (retrieved)

[^E1]: [Exa.ai](https://exa.ai) API response for data on [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
[^E2]: [Exa.ai](https://exa.ai) API response for data on [Amazon Web Services](https://aws.amazon.com/cn)
[^E3]: [Exa.ai](https://exa.ai) API response for data on [AWS Elemental](https://aws.amazon.com/media)
[^E4]: [Exa.ai](https://exa.ai) API response for data on [AWS Public Sector](https://aws.amazon.com/government-education)
[^E5]: [Exa.ai](https://exa.ai) API response for data on [AWS Canada](https://aws.amazon.com/local/canada)
[^E6]: [Exa.ai](https://exa.ai) API response for data on [2lemetry (Acquired by Amazon)](https://aws.amazon.com/iot)
