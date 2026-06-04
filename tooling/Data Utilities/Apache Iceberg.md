---
url: https://iceberg.apache.org/
maintained_by: "[[organizations/The Apache Software Foundation|Apache]]"
date_created: 2025-05-28
date_modified: 2026-06-02
og_title: The open table format for analytic datasets.
og_description: Iceberg is a high-performance format for huge analytic tables. Iceberg brings the reliability and simplicity of SQL tables to big data, while making it possible for engines like Spark, Trino, Flink, Presto, Hive and Impala to safely work with the same tables, at the same time.
og_image: "[]"
og_favicon: https://iceberg.apache.org/assets/images/favicon-96x96.png
og_last_fetch: 2026-06-02T05:46:44.053Z
site_name: Apache Iceberg
site_uuid: 5f59d984-921f-42e5-8828-957bac7998aa
publish: true
title: Apache Iceberg
slug: apache-iceberg
at_semantic_version: 0.0.1.1
cf_last_run: 2026-06-02T05:48:22.890Z
cf_last_run_model: Perplexity sonar-pro
---

# Value Proposition & Features

Apache Iceberg is an **open table format for huge analytic tables** that brings “the reliability and simplicity of SQL tables to big data” on data lakes. [^6tuxrx] [^mzz5on] It provides a high‑performance, engine‑agnostic metadata layer that enables **ACID transactions**, schema evolution, and time travel over data stored in object storage, while allowing multiple query engines (Spark, Trino, Flink, Presto, Hive, Impala, BigQuery, etc.) to work safely on the same tables. [^6tuxrx] [^cavu4o] [^va7cfr] Iceberg is not a storage system or compute engine; it is a **metadata management layer** that sits above data files wherever they are stored. [^6tuxrx] [^e5lle6]

Core capabilities include **open, highly scalable table metadata**, support for advanced features like schema evolution, hidden partitioning, and time travel, and interoperability across cloud and on‑prem engines. [^cavu4o] [^6tuxrx] [^e5lle6] Recent 1.11.x releases add production‑grade table‑level encryption with cloud KMS, server‑side scan planning, and a finalized file format API that standardizes access to Parquet, ORC, Avro, and other file formats. [^mzz5on] [^f8bwve]

**Key Features (priority order)**

- **Open table format for large‑scale analytics** – Iceberg is an “open table format purpose-built for large scale analytics” that delivers data‑warehouse‑like capabilities directly on data lake storage. [^6tuxrx] [^e5lle6]  
- **ACID transactions on data lakes** – Provides atomicity and consistency by writing new metadata files for each table change, enabling transactional updates over Parquet and other file formats in object storage. [^cavu4o] [^e5lle6]  
- **Schema evolution** – Supports adding, dropping, renaming columns and changing data types while preserving historical data, giving flexible, long‑lived analytic tables. [^cavu4o] [^va7cfr]  
- **Time travel & versioned snapshots** – Maintains versioned snapshots so users can query previous table states for debugging, audit, and reproducibility. [^cavu4o] [^c21abc]  
- **Hidden partitioning & advanced partition transforms** – Uses hidden partitioning and transforms (year, month, bucket, truncate, etc.) so users write simple SQL while Iceberg optimizes partition pruning and file skipping. [^cavu4o] [^b59fmn]  
- **Multi‑engine interoperability** – Designed so engines like Apache Spark, Flink, Trino, Presto, Hive, Impala, BigQuery, and others can read and write the same tables concurrently with consistency guarantees. [^6tuxrx] [^va7cfr] [^cavu4o]  
- **Rich metadata & metadata tables** – Exposes internal metadata as virtual tables (history, snapshots, files, manifests) to inspect table health, debug performance, and audit changes without touching data files. [^c21abc] [^cavu4o]  
- **Built‑in table encryption & security** – 1.11.0 introduces built‑in table encryption using envelope encryption, with key hierarchies backed by cloud KMS (including Google KMS) and support for encrypting manifest lists and metadata. [^mzz5on] [^f8bwve]

---

## Screenshots

No reliable source found for official product UI screenshots on the canonical site or GitHub.

---

## Product Roadmap / Announcements

As of June 2, 2026,

- **2026‑05‑22 – Apache Iceberg 1.11.0 release**: Google Open Source blog announced Iceberg 1.11.0 with support for Apache Spark 4.1 and Flink 2.1, server‑side scan planning in the REST catalog, a new partition statistics scan API, built‑in table encryption (envelope encryption with Google KMS), finalized File Format API, SQL UDF metadata format, and GCS Analytics Core integration for faster GCS workloads. [^mzz5on]  
- **2026‑05‑22 – Apache Iceberg 1.11 video highlights**: A YouTube release overview for Iceberg 1.11 describes production‑complete encryption (including encrypted manifest lists and KMS across AWS, Azure, GCP), new spatial types and partition pruning, a new content stats API, and variant/semistructured data support. [^f8bwve]  

Public, forward‑looking roadmap documents beyond release notes are not prominently published on the canonical site; development direction is mainly reflected through release announcements and community discussions. [^1f1dm8] [^mzz5on]

---

## Recent Developments (last 90 days)

- **2026‑05‑22 – Iceberg 1.11.0 released**: Adds Spark 4.1 and Flink 2.1 as default targets, server‑side scan planning in REST catalog, partition stats scan API, built‑in table encryption with envelope encryption and Google KMS, finalized File Format API, SQL UDF metadata format, and GCS Analytics Core integration for GCS performance. [^mzz5on]  
- **2026‑05‑22 – Iceberg 1.11 feature video**: Highlights production‑ready table encryption (including key encryption key auto‑rotation and Hive catalog wiring), new bounding‑box spatial types with intersects predicate for geospatial workloads, a new content stats API, and a variant type for semi‑structured data. [^f8bwve]  

---

# History and Origin Story

Apache Iceberg originated at Netflix as an internal table format to address scalability, correctness, and multi‑engine access issues in large Hadoop data lakes before being contributed to the Apache Software Foundation as an open‑source project. [^6tuxrx] [^e5lle6] Cloudera describes Iceberg as an “open table format purpose-built for large scale analytics” that evolved to provide warehouse‑style reliability directly on data lake storage, separating metadata from storage and compute so multiple engines can share the same data safely. [^6tuxrx] Over time, major platforms including Databricks, Google BigQuery, and others added native Iceberg table support, solidifying it as a core standard for open lakehouse architectures. [^cavu4o] [^va7cfr] [^52nfaa]

## Notable Team Members

Because Apache Iceberg is an Apache community project, stewardship is distributed across multiple maintainers and contributors rather than a traditional corporate executive team; various engineers from companies like Netflix, Apple, Alibaba, [[Tooling/Data Utilities/Cloudera|Cloudera]], and others have historically contributed, but authoritative, up‑to‑date leadership and PMC membership lists are not clearly summarized in a single, citable page on the canonical site. [^6tuxrx] [^1f1dm8] No reliable, current source listing specific founders or individual leaders for profiling purposes was found.

---

# Market Sizing

## Category, Market Size, and Category Growth

Apache Iceberg fits in the **open table format** and **[[concepts/Explainers for Tooling/Data Lakes|Data Lakehouse]] / data lake table format** category, alongside formats like Delta Lake and Apache Hudi. [^cavu4o] [^6tuxrx] [^e5lle6] Analyst and vendor materials describe Iceberg as a foundation for **open‑format lakehouses**, enabling lakehouse architectures on platforms like BigQuery and [[Tooling/Data Utilities/DataBricks|DataBricks]] where data is stored in object storage but governed and queried like warehouse tables. [^va7cfr] [^52nfaa] No precise, independent market‑size figure for the “[[Open Table Format]]” segment is published, but it participates in the broader cloud data platform and analytics market, which major analyst firms characterize as a rapidly growing multi‑billion‑dollar space driven by the shift to open lakehouse architectures; specific Iceberg‑only TAM numbers are not broken out in citable primary sources.

## Pricing

Apache Iceberg is an **open‑source Apache project** with no direct licensing fees or official pricing tiers. [^6tuxrx] [^1f1dm8]

| Tier                                             | Price | Notes                                                                                              |
| ------------------------------------------------ | ----- | -------------------------------------------------------------------------------------------------- |
| [[Vocabulary/Open Source Software\|OSS]] project | Free  | Open‑source under the Apache Software License; no official commercial pricing. [^6tuxrx] [^1f1dm8] |

Downstream cloud services (e.g., Iceberg tables in Databricks, BigQuery Iceberg managed tables) are priced by those vendors, not by the Apache Iceberg project itself. [^cavu4o] [^va7cfr] [^52nfaa]

# Competitive Landscape

## Who it’s for, who it’s not for

Iceberg is for **data platform teams and enterprises** building large‑scale analytic data lakes or lakehouses who need open, engine‑agnostic tables with [[Vocabulary/ACID Transactions|ACID Transactions]] guarantees, schema evolution, time travel, and strong governance across multiple processing engines. [^6tuxrx] [^cavu4o] [^va7cfr] It particularly suits organizations standardizing on open formats across Spark, Flink, Trino/Presto, Hive, Impala, and cloud warehouses while keeping data in object storage they control. [^6tuxrx] [^va7cfr]

It is **not ideal** for very small datasets or simple analytics where a single proprietary warehouse or database can meet requirements without the complexity of a separate table format layer. [^6tuxrx] [^e5lle6] It also does not address transactional OLTP workloads directly, as it is not a database or storage engine, and organizations that are fully locked into a single closed cloud data warehouse with no need for open multi‑engine access may see limited incremental value. [^6tuxrx] [^cavu4o]

## Viable Alternatives

- **Delta Lake** – An open table format originally from Databricks providing ACID transactions, schema enforcement, and time travel on data lakes, tightly integrated with the Databricks Lakehouse platform and also available as open source. [^cavu4o] [^e5lle6]  
- **Apache Hudi** – An open‑source data lake table format focused on streaming ingest, incremental processing, and record‑level upserts/deletes for large analytic datasets on object storage.  
- **BigQuery native tables** – Fully managed BigQuery storage offering ACID semantics and rich SQL without managing a separate table format, but not engine‑agnostic and primarily accessible via BigQuery. [^va7cfr]  
- **Snowflake native tables** – Proprietary cloud data warehouse tables with strong governance and performance but closed‑format and accessible only via Snowflake’s engine.  

## Competitor Table

| Competitor | Description |
|-----------|-------------|
| [Delta Lake] | Open table format providing ACID transactions, schema enforcement, and time travel on data lakes, closely associated with Databricks’ lakehouse offering and supporting multiple engines via connectors. [^cavu4o] [^e5lle6] |
| [Apache Hudi] | Open‑source table format and data management framework for data lakes, optimized for streaming ingestion, incremental processing, and record‑level upserts/deletes on large analytic datasets. |
| [BigQuery native tables] | Google BigQuery’s built‑in table storage with fully managed ACID, governance, and performance, but in a proprietary format mainly accessible via BigQuery rather than as an open, engine‑agnostic table format. [^va7cfr] |
| [Snowflake native tables] | Snowflake’s proprietary cloud data warehouse tables that deliver strong performance and governance within the Snowflake ecosystem but do not expose an open table format for external engines. |


***

# Sources

[^mzz5on]: [Announcing Apache Iceberg 1.11.0 | Google Open Source Blog](https://opensource.googleblog.com/2026/05/announcing-apache-iceberg-1110.html)
[^f8bwve]: [Apache Iceberg™ 1.11 is here! - YouTube](https://www.youtube.com/watch?v=152P1IpZc8k)
[^52nfaa]: [Iceberg v3 GA, Open Sharing, and Unified Governance - Databricks](https://www.databricks.com/blog/unity-catalog-and-next-era-apache-icebergtm)
[^cavu4o]: [What is Apache Iceberg in Databricks?](https://docs.databricks.com/aws/en/iceberg/)
[^6tuxrx]: [Apache Iceberg Open Table Format (OTF) | Open source - Cloudera](https://www.cloudera.com/open-source/apache-iceberg.html)
[^va7cfr]: [Apache Iceberg managed tables | BigQuery](https://docs.cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery)
[^b59fmn]: [Apache Iceberg Support — Spark RAPIDS User Guide](https://docs.nvidia.com/spark-rapids/user-guide/latest/additional-functionality/iceberg-support.html)
[^e5lle6]: [What is Apache Iceberg? Open table format explained - Fivetran](https://www.fivetran.com/learn/apache-iceberg)
[^1f1dm8]: [Releases - Apache Iceberg™](https://iceberg.apache.org/releases/)
[^c21abc]: [Apache Iceberg Metadata Tables: Querying the Internals](https://dev.to/alexmercedcoder/apache-iceberg-metadata-tables-querying-the-internals-jgb)
