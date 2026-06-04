---
url: https://avro.apache.org/
date_created: 2026-05-28
date_modified: 2026-06-02
og_title: Apache Avro
og_description: a data serialization system, Apache Avro is the leading serialization format for record data, and first choice for streaming data pipelines.
og_favicon: https://avro.apache.org/favicon.ico
og_site_name: Apache Avro
og_last_fetch: 2026-06-02T06:02:50.748Z
site_uuid: f7d1129c-b0dc-4763-8e8d-095c300e1ae5
publish: true
title: Apache Avro
at_semantic_version: 0.0.1.1
slug: apache-avro
cf_last_run: 2026-06-02T06:05:11.695Z
cf_last_run_model: Perplexity sonar-pro
tags:
  - Data-Formats
  - Data-Utilities
  - Data-Quality-Tools
  - Open-Source
  - Open-Source-Collaborations
aliases:
  - Avro
---
[[Vocabulary/Open Source Software|Open Source Software]]
[[organizations/The Apache Software Foundation|The Apache Software Foundation]]

# Value Proposition & Features

Apache Avro is an open source **data serialization system** that provides a compact, fast, binary format with rich data structures and a schema-based design. [^xcr415] It is widely used for **record-oriented data** and streaming pipelines, especially in ecosystems like Hadoop, Kafka, and modern data platforms. [^xcr415] [^eej3cn] [^qn7jjn] Avro’s explicit schema and strong schema‑evolution capabilities make it a common choice for interoperable data exchange across languages and systems. [^xcr415] [^eej3cn]

Core product characteristics:

- Avro uses **schemas defined in JSON** to describe data, enabling rich, nested data structures and cross‑language interoperability. [^xcr415]  
- It provides a **compact binary encoding** where the schema is stored separately (or in a header), reducing per‑record overhead and improving performance. [^xcr415] [^eej3cn]  
- Avro includes a **container file format** for persistent storage and an **RPC mechanism** for defining and executing remote procedures with Avro-encoded messages. [^xcr415]  
- It supports **dynamic languages without required code generation**, while still allowing optional code generation as an optimization for statically typed languages. [^xcr415] [^98wucj]

Key features (priority order):

- **Rich data structures and JSON-defined schemas** for complex, nested records, arrays, maps, unions, and primitive types. [^xcr415]  
- **Compact, fast binary serialization format** optimized for performance and efficient storage. [^xcr415] [^eej3cn] [^y2febd]  
- **Schema evolution support**, allowing fields to be added, removed, or changed with backward/forward compatibility in many streaming and data-lake use cases. [^eej3cn] [^jl3ipe]  
- **Container file format** for persistent on-disk storage of Avro records with embedded schema and optional compression. [^xcr415] [^y2febd] [^jl3ipe]  
- **Remote Procedure Call (RPC) framework** that uses Avro protocols and schemas for type-safe service definitions. [^xcr415]  
- **Multi-language support** with implementations for Java, C, C++, C#, Python, and others, enabling cross‑language data exchange. [^xcr415]  
- **Integration with big data and streaming systems** such as Hadoop, Apache Kafka, AWS Glue, and Databricks structured streaming. [^eej3cn] [^qn7jjn] [^y2febd] [^jl3ipe]  
- **Simple integration with dynamic languages and optional code generation** for optimized access in statically typed environments. [^xcr415] [^98wucj]

---

## Screenshots

No reliable source found for official UI screenshots of Apache Avro itself; Avro is a library/specification rather than a visual application. [^xcr415] [^g7g6up]

---

## Product Roadmap / Announcements

As of June 2, 2026,

- **2024‑11‑10 – Apache Avro 1.12.0 release candidate discussion and voting**: The project mailing list and dev communications show activity around the 1.12.0 release line, focusing on bug fixes, language binding updates, and build tooling; however, a finalized 1.12.0 GA announcement within the last 6 months is not clearly published on the main site. [^g7g6up]  
- **2024‑10‑08 – Apache Avro 1.11.4 release announcement**: The downloads/docs indicate 1.11.4 as the latest stable in the 1.11.x line, including dependency updates and bug fixes over 1.11.1; release notes emphasize stability and compatibility. [^xcr415] [^g7g6up]  

(No explicit, public forward-looking roadmap page is published; the project’s evolution is primarily visible through release notes, JIRA, and mailing lists. [^g7g6up])

---

## Recent Developments

- IBM’s May 4, 2026 deep‑dive on open data formats highlights **Apache Avro** alongside Parquet and ORC as a core component of “lakehouse architectures,” emphasizing Avro’s row‑oriented layout, schema evolution, and its use for streaming data and change-data-capture pipelines. [^jl3ipe]  
- AWS Glue documentation (regularly updated for Glue 4.x) continues to document **Avro support**, including configuration of reader/writer versions and logical types, indicating ongoing alignment of Glue’s ETL features with Avro releases. [^y2febd]  
- Azure [[Tooling/Data Utilities/DataBricks|DataBricks]] structured streaming docs emphasize **from_avro / to_avro** functions for Kafka-based pipelines, underscoring Avro’s continued role as a standard serialization format for streaming workloads. [^qn7jjn]  

---

# History and Origin Story

Apache Avro originated in the **[[Tooling/Data Utilities/Hadoop|Hadoop]] ecosystem** as a project of the Apache Software Foundation to provide a language‑neutral, schema-based, binary serialization system for data exchange and persistent storage. [^eej3cn] [^g7g6up] [^jl3ipe] It was created to address limitations of earlier Hadoop serialization approaches (like [[Writable]]) by offering rich schemas, interoperability across languages, and better support for dynamic data and schema evolution in large distributed systems. [^eej3cn] [^jl3ipe] As an Apache project, Avro is governed by a Project Management Committee (PMC) and community contributors rather than traditional corporate founders. [^g7g6up]

## Notable Team Members

As an ASF project, Apache Avro is managed by a **Project Management Committee (PMC)** and contributors rather than a traditional executive leadership team. [^g7g6up] The public “Project” page lists PMC members and committers who collectively oversee releases, technical direction, and community processes, but no single individual is presented as a founder or CEO. [^g7g6up]

# Market Sizing

## Category, Market Size, and Category Growth

Apache Avro fits primarily into the categories of **data serialization format**, **open data format**, and **row-based storage format** used in data platforms and streaming systems. [^xcr415] [^eej3cn] [^jl3ipe] Analyst-style overviews (such as IBM’s open‑data formats article) place Avro alongside Parquet and ORC as a backbone technology for **data lakehouse and big data analytics** markets, which are large and growing, but they report market sizes at the platform level (e.g., lakehouse/big data platforms) rather than for individual formats. [^jl3ipe] No credible source provides a standalone TAM or growth rate specifically for the Avro format itself. [^jl3ipe]

# Competitive Landscape

## Who it's for, who it's not for

Apache Avro is for **engineering teams and data platforms** that need efficient, schema-validated serialization for record data across services, languages, and systems—especially in **streaming (Kafka), Hadoop, ETL (Glue / [[Tooling/Data Utilities/DataBricks|DataBricks]]), and lakehouse contexts** where schema evolution and compact binary encoding matter. [^eej3cn] [^qn7jjn] [^y2febd] [^jl3ipe] It suits organizations standardizing on open formats, building polyglot microservices, or integrating with tooling that natively understands Avro schemas and container files. [^eej3cn] [^qn7jjn] [^y2febd] [^jl3ipe]

It is not ideal for teams that primarily need **human-readable formats** (e.g., JSON or CSV), ad‑hoc data exchange without schema management, or columnar analytics storage where formats like Parquet or ORC are better suited. [^eej3cn] [^jl3ipe] It is also less appropriate for mobile/embedded ecosystems heavily standardized on other IDLs like Protocol Buffers, or for environments where a fully managed proprietary serialization service is preferred over open-source libraries. [^eej3cn] [^jl3ipe]

---

## Viable Alternatives

- **Protocol Buffers ([[Protobuf]])** – A binary serialization format from Google with an [[concepts/Interface Description Language|Interface Definition Language]] (IDL), strong typing, and wide use in microservice RPC; often chosen for gRPC and service‑to‑service communication. [^eej3cn]  
- **JSON Schema + JSON** – Human-readable [[projects/Emergent-Innovation/Standards/JSON|JSON]] documents validated against JSON Schema, favored when ease of inspection and debugging outweighs binary compactness. [^eej3cn]  
- **Apache [[projects/Emergent-Innovation/Standards/Parquet File Format|Parquet]]** – A columnar storage format optimized for analytics queries over large datasets, preferred in lakehouses and [[Vocabulary/Data Warehouses|Data Warehouses]] for scan-heavy workloads. [^jl3ipe]  
- **Apache ORC** – Another columnar format for big data analytics with strong compression and predicate pushdown, competing with Parquet at the storage layer. [^jl3ipe]  

---

## Competitor Table

| Competitor       | Description                                                                                                                                                                                       |     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Protocol Buffers | Binary serialization format with strongly typed schemas and code generation, widely used for RPC and microservices, offering compact messages and backward‑compatible schema evolution. [^eej3cn] |     |
| JSON Schema      | Schema specification for validating JSON documents, used with human-readable JSON payloads where interoperability and readability are prioritized over binary size. [^eej3cn]                     |     |
| Apache Parquet   | Open source columnar storage format for big data, optimized for analytical queries in data lakes and warehouses rather than row-oriented serialization. [^jl3ipe]                                 |     |
| Apache ORC       | Columnar format for big data processing that provides efficient compression and query performance, primarily a competitor in analytics storage rather than message serialization. [^jl3ipe]       |     |


***

# Sources

[^xcr415]: [Apache Avro™ 1.11.1 Documentation](https://avro.apache.org/docs/1.11.1/)
[^98wucj]: [Avro file | Databricks on AWS](https://docs.databricks.com/aws/en/query/formats/avro)
[^eej3cn]: [Avro vs Protobuf vs JSON Schema: Kafka Serialization Compar…](https://www.conduktor.io/glossary/avro-vs-protobuf-vs-json-schema)
[^qn7jjn]: [Read and write streaming Avro data - Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/structured-streaming/avro-dataframe)
[5]: [Avro File Viewer in VS Code - DBCode](https://dbcode.io/docs/supported-databases/avro)
[6]: [Upgrade transitive Avro dependency resolved by spring-cloud ...](https://github.com/awspring/spring-cloud-aws/issues/1618)
[^y2febd]: [Using the Avro format in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-avro-home.html)
[^g7g6up]: [Project | Apache Avro](https://avro.apache.org/project/)
[^jl3ipe]: [A Deep-Dive in Open‑Data Formats: Parquet, ORC, and Avro](https://community.ibm.com/community/user/blogs/ghareeb-falazi/2026/05/04/opendata-formats-deep-dive)
