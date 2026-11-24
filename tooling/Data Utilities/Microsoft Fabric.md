---
date_created: 2026-06-09
date_modified: 2026-11-24
tags: [Data-Infrastructure, Data-Utilities, Data-Pipelines, Data-Quality-Tools, Enterprise-Data-Hubs, Data-Hubs]
cf_last_run: "2026-11-24T06:45:44.807Z"
cf_last_run_model: "Perplexity sonar-pro"
cf_retrieved_source_count: 6
cf_last_run_retrieval: "2026-11-24T06:45:44.807Z"
product_of: "[[organizations/Microsoft|Microsoft]]"
site_uuid: a3ca4ee4-ecf5-4c1f-a063-967ee3607f4c
publish: true
title: "Microsoft Fabric"
slug: microsoft-fabric
at_semantic_version: 0.0.0.1
---
[[Tooling/Data Utilities/Bruin|Bruin]]
[[organizations/Microsoft|Microsoft]]



https://youtu.be/5R4ejMDtCrA?si=eGpgQDYidLkneQF4

## Value Proposition & Features

Microsoft Fabric is an end-to-end intelligent data platform covering ingestion, preparation, storage, analysis, visualization, data engineering, data science, warehousing, real-time analytics, observability, and business intelligence in one architecture. [^gcgz94] It centralizes data in OneLake so Fabric engines and external services such as Snowflake can use a single copy. [^0803ci]

- **OneLake:** Organization-wide data lake and shared data layer for Fabric workloads. [^0803ci]
- **Integrated analytics:** Combines data integration, engineering, warehousing, science, real-time analytics, and BI. [^gcgz94]
- **AI and machine learning:** Supports building AI models without moving data from the central lake. [^gcgz94]
- **Real-Time Intelligence:** Ingests, transforms, stores, analyzes, visualizes, and acts on streaming data and event logs. [^E2]
- **Data governance:** Provides cataloging, security, and governance across organizational data. [^E2]
- **Cloud-native scaling:** Automatically scales resources as data volumes and complexity increase. [^gcgz94]
- **Interoperability:** Uses OneLake shortcuts and shared data access across Fabric engines and external platforms. [^0803ci]
- **Consumption billing:** Supports capacity pricing, OneLake storage charges, and preview consumption-based billing for selected operations. [^708nab] [^frya6j]

## Screenshots

No three official screenshot URLs were identified in the available results.

## Product Roadmap / Announcements

As of November 23, 2026,

- **November 19, 2026:** Microsoft announced Fabric HorizonDB, a PostgreSQL-compatible database in preview that can combine live operational data with analytical data in OneLake. [^7x8jiu]
- **November 17, 2026:** Microsoft announced general availability for Fabric apps and Database Hub, alongside preview availability for HorizonDB and database agents. [^pj2d3x]
- **Q4 2026:** OneLake Catalog search is planned to expand to OneLake tables and semantic-model tables. [^5ql9e2]
- **Q4 2026:** The Fabric Chargeback app is planned for public preview. [^5ql9e2]

## Recent Developments

Microsoft’s latest Fabric announcements move beyond analytics toward intelligent application development, operational databases, and database management. [^pj2d3x] Fabric apps are generally available, while HorizonDB and database agents remain in preview. [^pj2d3x]

## History and Origin Story

Microsoft Fabric originated as Microsoft’s unified analytics platform, bringing multiple data-lifecycle experiences under a shared architecture and OneLake data layer. [^gcgz94] Its current direction extends that foundation toward real-time intelligence, AI-enabled analytics, and operational application workloads. [^E1] The platform is headquartered in Redmond, Washington. [^E1]

## Market Sizing

### Category, Market Size, and Category Growth

Microsoft Fabric fits the unified data platform, cloud analytics, data lakehouse, business intelligence, and real-time analytics categories. [^gcgz94] [^jyri7j] No reliable market-size or category-growth estimate from an established analyst or financial publication was available in the retrieved results.

## Pricing

| Pricing component | Published information |
|---|---|
| Fabric capacity | Pay-as-you-go capacity pricing is used for Fabric compute. [^frya6j] |
| OneLake storage | Billed pay-as-you-go per gigabyte and separately from Fabric Capacity Units. [^708nab] |
| On-demand operations | Selected operations can be billed through Azure consumption meters in preview. [^frya6j] |
| Free trial | Microsoft offers a free Fabric trial with access to workloads and resources for creating and hosting Fabric items. [^gcgz94] |

## Competitive Landscape

### Who it's for, who it's not for

Fabric is aimed at organizations that want one governed environment for data engineering, warehousing, BI, AI, and real-time analytics, especially enterprises already invested in Microsoft cloud services. [^gcgz94] [^jyri7j] Its unified architecture is suited to teams seeking shared data and reduced movement between analytics workloads. [^gcgz94]

It is less suited to organizations seeking a narrowly focused standalone warehouse, lake, streaming engine, or BI tool, or to buyers that do not want capacity-based cloud consumption and Microsoft-platform integration. The available sources do not establish a specific anti-ICP beyond those product-fit implications.

### Viable Alternatives

- **[[Tooling/Data Utilities/DataBricks|DataBricks]]** — A competing lakehouse and data-engineering platform for large-scale analytical workloads.
- **[[Tooling/Software Development/Cloud Infrastructure/Snowflake|Snowflake]]** — A cloud data platform that can interoperate with OneLake and competes in warehousing and analytics. [^0803ci]
- **[[Azure Synapse Analytics]]* — Microsoft’s related analytics service for data engineering, warehousing, and real-time analytics.
- **[[Tooling/Data Utilities/PowerBI|PowerBI]]** — A focused Microsoft business-intelligence alternative when the requirement is visualization and reporting rather than a full data platform.
- **Google [[Tooling/Data Utilities/BigQuery|BigQuery]]** — A cloud analytics warehouse alternative for organizations centered on Google Cloud.

### Competitor Table

| Competitor | Description |
|---|---|
| [Databricks](https://www.databricks.com/) | Lakehouse platform focused on data engineering, analytics, and AI. |
| [Snowflake](https://www.snowflake.com/) | Cloud data platform competing in warehousing, analytics, and data sharing; Microsoft identifies interoperability with OneLake. [^0803ci] |
| [Azure Synapse Analytics](https://azure.microsoft.com/products/synapse-analytics) | Microsoft analytics service spanning warehousing, data integration, and big-data workloads. |
| [Power BI](https://powerbi.microsoft.com/) | Business-intelligence and visualization platform that overlaps with Fabric’s BI capabilities. |
| [Google BigQuery](https://cloud.google.com/bigquery) | Fully managed cloud analytics warehouse competing for enterprise data workloads. |


***

# Sources

[^5ql9e2]: [learn.microsoft.com](http://learn.microsoft.com/). [Find Fabric items and tables from Copilot CLI with OneLake Catalog Planned General availability Q4 2026](http://learn.microsoft.com/en-us/fabric/release-plan). Updated: 2026, Nov 07. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[2]: 2026, Nov 03. [learn.microsoft.com](https://learn.microsoft.com/). [November 2026 announcements - Partner Center](https://learn.microsoft.com/en-us/partner-center/announcements/2026-november). Updated: 2026, Nov 21. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^gcgz94]: [microsoft.com](https://www.microsoft.com/). [What is Microsoft Fabric?](https://www.microsoft.com/en-us/microsoft-fabric/resources/data-101/what-is-fabric?msockid=1e5847e68eda6c0a05715ff78f716d91). Updated: 2026, Nov 14. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^0803ci]: [microsoft.com](https://www.microsoft.com/). [Microsoft OneLake | Microsoft Fabric](https://www.microsoft.com/en/microsoft-fabric/features/onelake?msockid=2a44e8ba89a365f10889f0aa880e64a9). Updated: 2026, Nov 13. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^708nab]: 2026, Nov 20. [learn.microsoft.com](https://learn.microsoft.com/). [OneLake consumption - Microsoft Fabric](https://learn.microsoft.com/en-ca/fabric/onelake/onelake-consumption). Updated: 2026, Nov 22. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^frya6j]: 2026, Nov 20. [learn.microsoft.com](https://learn.microsoft.com/). [On-Demand Billing overview (preview) - Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/enterprise/on-demand-billing). Updated: 2026, Nov 22. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^jyri7j]: 2026, Oct 27. [learn.microsoft.com](https://learn.microsoft.com/). [Unified data platform adoption - Cloud Adoption Framework](https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/data-management/best-practices/data-lake-services). Updated: 2026, Nov 23. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^7x8jiu]: 2026, Nov 19. [news.microsoft.com](https://news.microsoft.com/). [Microsoft Ignite 2026 | Book of News](https://news.microsoft.com/events/ignite/2026/book-of-news/). Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[9]: 2026, Nov 06. [learn.microsoft.com](http://learn.microsoft.com/). [What's New? - Microsoft Fabric](http://learn.microsoft.com/en-ca/fabric/get-started/whats-new). Updated: 2026, Nov 18. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.
[^pj2d3x]: 2026, Nov 17. [community.fabric.microsoft.com](https://community.fabric.microsoft.com/). [Build and operate intelligent apps with Microsoft Fabric: New capabilities at ...](https://community.fabric.microsoft.com/blog/fbc_fabricupdatesblogs/build-and-operate-intelligent-apps-with-microsoft-fabric-new-capabilities-at-ign/5423020). Updated: 2026, Nov 23. Generated: 2026, Nov 24. [Perplexity](https://www.perplexity.ai/) API response.

## Sources (retrieved)

[^E1]: [microsoft.com](https://www.microsoft.com/). [Microsoft Fabric](https://www.microsoft.com/en-us/microsoft-fabric). Generated: 2026, Nov 24. [Exa.ai](https://exa.ai) API response.
[^E2]: [learn.microsoft.com](https://learn.microsoft.com/). [Fabric Real-Time Intelligence](https://learn.microsoft.com/en-us/fabric/real-time-intelligence). Generated: 2026, Nov 24. [Exa.ai](https://exa.ai) API response.
[^E3]: [osmos.io](https://osmos.io/). [Osmos (Acquired by Microsoft)](https://osmos.io/). Generated: 2026, Nov 24. [Exa.ai](https://exa.ai) API response.
[^E4]: [linkedin.com](https://linkedin.com/). [Fractal + Microsoft Partnership](https://linkedin.com/company/fractal-azure-partnership). Generated: 2026, Nov 24. [Exa.ai](https://exa.ai) API response.
[^E5]: [bluetalon.com](https://bluetalon.com/). [BlueTalon, Inc. (A Microsoft Company)](https://bluetalon.com/). Generated: 2026, Nov 24. [Exa.ai](https://exa.ai) API response.
[^E6]: [fabric.so](https://fabric.so/). [Fabric](https://fabric.so/). Generated: 2026, Nov 24. [Exa.ai](https://exa.ai) API response.
