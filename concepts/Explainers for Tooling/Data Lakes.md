---
cf_last_run: 2026-05-25T18:53:24.585Z
cf_last_run_model: Perplexity sonar-pro
date_created: 2025-08-24
date_modified: 2026-06-02
aliases:
  - data lakes
  - data lake
  - Data Lake
  - data lakehouse
  - Data Lakehouse
augmented_with: Perplexity AI using Sonar Pro
tags:
  - DataOps
  - Data-Capture
  - Best-Practices
  - Explainers
authors:
  - Michael Staton
site_uuid: 7ce3a6d8-559d-4704-bb78-bad87748b76c
publish: true
title: Data Lakes
slug: data-lakes
at_semantic_version: 0.0.1.1
---

# Defining and Describing Data Lakes

![Conceptual diagram showing a data lake ingesting structured, semi-structured, and unstructured data from multiple sources into one raw storage layer](https://images.prismic.io/encord/ZgWZKct2UUcvBQlr_image4.png?auto=format,compress)
- _A data lake is the place where organizations keep data first and decide what it means later._ [^d7we56] [^7wfhyv] [^t4timd]
- A data lake is a centralized storage repository that holds large volumes of data in its native, raw format, often across terabytes or petabytes, and it is designed for flexible analysis rather than immediate transformation. [^d7we56] [^7wfhyv]
- The concept matters when teams need to preserve diverse data types—structured tables, JSON, logs, images, audio, or video—so analysts, engineers, and data scientists can apply schema-on-read when they need the data. [^d7we56] [^7wfhyv] [^qqz29h]
- In practice, data lakes are used to support analytics, machine learning, and broad organizational data consolidation, especially when a warehouse’s schema-on-write model would be too rigid. [^d7we56] [^t4timd] [^qqz29h]

# Uses in Context

- In enterprise data architecture, “data lake” refers to a central repository where an organization can keep “all of an organization's data in a single, central location,” saved “as is.”[^t4timd]
- In analytics and AI, the term is used for storage that keeps structured, semi-structured, and unstructured data available for later modeling and exploration. [^d7we56] [^qqz29h]
- In cloud and big-data discussions, data lakes are described as cost-effective systems that scale to terabytes and petabytes. [^d7we56] [^7wfhyv]
- In data engineering, the term invokes a “store first, analyze later” workflow, where structure is applied during analysis rather than ingestion. [^7wfhyv] [^76qinj]
- In comparison with data warehouses, the phrase often signals a shift from schema-on-write to schema-on-read. [^d7we56] [^76qinj]
- In architecture guidance, the term is used to emphasize governance problems as well as flexibility, since large raw repositories can become “swamps” without curation. [^76qinj]

# History of Use

## Origins

- The modern definition of a data lake appears in contemporary cloud and data-platform documentation as a storage repository for raw, native-format data, with Microsoft explicitly framing it as a contrast to the data warehouse’s schema-on-write model. [^d7we56]
- Sources in the retrieved results do not identify a single original author or first publication for the phrase itself, but they show the term in established use by at least the period when enterprise cloud platforms were codifying it for architecture guidance. [^d7we56] [^u9gf5q] [^qqz29h]
- Later vendor and glossary sources standardized the term around the idea of a centralized repository for structured, semi-structured, and unstructured data kept for analytics and AI. [^7wfhyv] [^u9gf5q] [^qqz29h]

## Evolution

- **2010s:** The term became widely associated with schema-on-read, raw-data retention, and flexible analytics workflows, especially in comparisons with data warehouses. [^d7we56] [^7wfhyv] [^76qinj]
- **Mid-2010s to 2020s:** The concept expanded from generic storage into enterprise platforms for analytics, AI, and machine learning, with marketing and guidance emphasizing broad ingestion and “all data” consolidation. [^7wfhyv] [^t4timd] [^qqz29h]
- **2020s:** Guidance increasingly paired data-lake benefits with governance concerns, warning that unmanaged lakes can become low-value repositories rather than usable analytical assets. [^76qinj] [^32z077]

# Best Real-World Examples

- [Azure Data Lake Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction) — Microsoft’s cloud storage platform is presented as a scalable data-lake implementation for raw, diverse data. [^d7we56]
- [Databricks Lakehouse](https://www.databricks.com/product/data-lakehouse) — Databricks positions its platform around combining data-lake flexibility with warehouse-style management, showing how the term evolved in practice. [^t4timd]
- [Amazon S3](https://aws.amazon.com/s3/) — Commonly used as underlying storage for data-lake architectures because object storage can hold large volumes of raw data. [^7wfhyv] [^ur7j23]
- [Azure Data Lake Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction) — Microsoft’s storage service is frequently used to store structured, semi-structured, and unstructured data at scale. [^d7we56] [^ur7j23]
- [SAP Data Lake](https://www.sap.com/products/technology-platform/data-lake.html) — SAP describes its offering as native-format storage for analytics and AI workloads. [^qqz29h]
- [Hadoop HDFS](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html) — Hadoop distributed storage is often cited as a distributed foundation for early data-lake deployments. [^7wfhyv]
- [Fivetran data lake catalogs](https://www.fivetran.com/learn/data-lake-catalog) — Catalog tooling illustrates the governance and metadata layer that mature data lakes need. [^32z077]

# Case Studies

A common enterprise pattern is to use a cloud object store as the raw landing zone for many data sources, then apply transformation only when a team needs a particular analysis. [^d7we56] [^7wfhyv] Microsoft’s description captures this logic directly: a data lake keeps data in its “original, untransformed state,” with schema applied on read rather than on ingest. [^d7we56] This case shows what the concept is for: preserving maximum optionality while avoiding premature modeling decisions. [^d7we56] [^7wfhyv]

Databricks’ materials reflect the next stage in the concept’s evolution, where the data lake is no longer just a repository but part of a broader analytics stack. [^t4timd] Its framing of lakes as a way to keep data “as is” highlights why organizations adopted them for machine learning and cross-functional analytics, but the governance discussions around “swamps” show the operational risk of unmanaged growth. [^76qinj] [^t4timd] [^32z077] This case shows that the value of a data lake depends not only on scale, but also on metadata, cataloging, and stewardship. [^76qinj] [^32z077]

SAP and similar enterprise vendors present data lakes as a foundation for analytics and AI that can accept structured, semi-structured, and unstructured inputs. [^qqz29h] That framing indicates how the concept moved from a storage pattern into a platform strategy: the lake becomes the shared substrate for downstream data science, reporting, and operational analytics. [^qqz29h] [^ur7j23] This case shows the concept’s broader role in modern data stacks, where raw storage is treated as an enabling layer rather than a final destination. [^qqz29h] [^ur7j23]


***

# Sources

[^d7we56]: [What Is a Data Lake? - Azure Architecture Center | Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/data-guide/scenarios/data-lake)
[^7wfhyv]: [Data Lake - GeeksforGeeks](https://www.geeksforgeeks.org/big-data/what-is-data-lake/)
[^76qinj]: [Data Ponds vs. Data Lakes: A Practical Overview - Dimensional Insight](https://www.dimins.com/blog/2025/11/20/data-pond-vs-data-lake/)
[^u9gf5q]: [Data Lake | NNLM](https://www.nnlm.gov/resources/data/data-glossary/data-lake)
[^t4timd]: [Data Lakes vs Data Warehouses Explained | Databricks Blog](https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know)
[^qqz29h]: [What Is a Data Lake? | Definition, Types, Benefits, Comparisons - SAP](https://www.sap.com/resources/what-is-a-data-lake)
[^ur7j23]: [Data Lake vs Data Warehouse: Full Comparison Guide - Exasol](https://www.exasol.com/hub/data-warehouse/vs-data-lake/)
[^32z077]: [The Definitive Guide to Data Lake Catalogs - Fivetran](https://www.fivetran.com/learn/data-lake-catalog)
[9]: [What is a Data Lake? Architecture & Benefits - SentinelOne](https://www.sentinelone.com/cybersecurity-101/data-and-ai/what-is-a-data-lake/)
