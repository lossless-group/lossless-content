---
date_created: 2026-05-03
date_modified: 2026-05-23
site_uuid: 10f31d59-0178-41ef-b462-2b0d5b210b44
publish: true
title: Charts as Code
slug: charts-as-code
at_semantic_version: 0.0.1.1
for_clients:
  - Laerdal
  - Avalanche
  - Hypernova
  - FullStackVC
---
# Open Data Fromats
[[Open Data Formats]] for charts and data ensure interoperability, enabling machine-readable and non-proprietary exchange. Key open formats include CSV and TSV for structured data, JSON and XML for metadata-rich data, and .odc (OpenDocument Chart) for visualizations. These are often packed as  for transport, with OpenSpec used in AI-driven spec development. [^2inh2d] [^5cur5f] [^hiwk9a] [^wg7jlp] [^bja76r] [^2nw23g]  
## Key Open Data & Chart Formats 

• [[Vocabulary/Comma-Separated Values|CSV]] (Comma Separated Values): The most standard, machine-readable format for raw chart data. 
• [[projects/Emergent-Innovation/Standards/JSON|JSON]] (JavaScript Object Notation): Common for structured metadata, web APIs, and configuring chart specifications (e.g., in Google Sheets API). 
• ODF ([[Open Data Format]]): Uses CSV for data and [[projects/Emergent-Innovation/Standards/Extensible Markup Language|XML]] for metadata, packaged together, supporting statistical software exchange. 
• .odc ([[OpenDocument Chart]]): Part of the [[organizations/OASIS Open|OASIS Open]] OpenDocument (ODF) technical specification, specifically for charts.  
• S57/000: An open, standard format for maritime vector charts. 
• GeoJSON/TopoJSON: Standards for mapping and geospatial chart data. [^2inh2d] [^hiwk9a] [^wg7jlp] [^bja76r] [^22nnzn] [^3e8xum] [^ol7ybg]  

# Why Use Open Specs? 

• [[concepts/Interoperability (Data and Systems)]]: Data can be imported into multiple statistical software packages. 
• Transparency: Non-proprietary formats prevent vendor lock-in. 
• Accessibility: Machine-readable formats ensure data can be easily processed and reused. 
• Structure: Standardizes metadata (DDI-Codebook 2.5) for better data interpretation. [^2inh2d] [^hiwk9a] [^3e8xum] [^ypue6l] [^sp9qh5]  

Open Spec Frameworks 

• OpenSpec: A modern approach to AI-assisted Specification Driven Development, using markdown files () for structured requirements. 
• Open Data Product Specification 4.0: A Linux Foundation standard for defining data quality and metadata. [^5cur5f] [^c6v0kw]  

Metadata and Packaging 

• Open Data often combines CSV data files with XML metadata for comprehensive datasets. 
• The  or  files are commonly used in modern AI workflows to define data structure context. [^2inh2d] [^5cur5f]  

AI responses may include mistakes.

[^2inh2d]: [https://opendataformat.github.io/specification.html](https://opendataformat.github.io/specification.html)
[^5cur5f]: [https://www.youtube.com/watch?v=wZFOW89Lsc0](https://www.youtube.com/watch?v=wZFOW89Lsc0)
[^hiwk9a]: [https://data.europa.eu/elearning/en/module9/](https://data.europa.eu/elearning/en/module9/)
[^wg7jlp]: [https://libguides.uccs.edu/opendata/overview](https://libguides.uccs.edu/opendata/overview)
[^bja76r]: [https://en.wikipedia.org/wiki/OpenDocument_technical_specification](https://en.wikipedia.org/wiki/OpenDocument_technical_specification)
[^2nw23g]: [https://geo-data-support.sites.uu.nl/open-science-open-data/fair-file-formats/](https://geo-data-support.sites.uu.nl/open-science-open-data/fair-file-formats/)
[^22nnzn]: [https://resources.data.gov/resources/podm-field-mapping/](https://resources.data.gov/resources/podm-field-mapping/)
[^3e8xum]: [https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/charts](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/charts)
[^ol7ybg]: [https://opencpn.org/wiki/dokuwiki/doku.php?id=opencpn:manual_advanced:charts:formats](https://opencpn.org/wiki/dokuwiki/doku.php?id=opencpn:manual_advanced:charts:formats)
[^ypue6l]: [https://www.min.io/learn/open-table-format](https://www.min.io/learn/open-table-format)
[^sp9qh5]: [https://opendataformat.github.io/specification.html](https://opendataformat.github.io/specification.html)
[^c6v0kw]: [https://opendataproducts.org/v4.0/](https://opendataproducts.org/v4.0/)





## Visualization Specifications (JSON)

**[Vega and Vega-Lite](https://vega.github.io/vega-lite/docs/spec.html)** are the gold standard for declarative, agent-writable visualization specs. They're JSON objects that describe charts by mapping data columns to visual properties (x-axis, y-axis, color, size). Agents can write these fluently because the grammar is explicit: you specify the mark type (bar, point, line), the encoding (which column → which visual channel), and Vega auto-generates axes, legends, and scales. [^5knti2] [^h7ye3w] [^u0aist]

Vega-Lite is the simplified, high-level version — a minimal spec that compiles to full Vega under the hood. For users, this means you can collaborate with an agent to prototype a chart by describing the data and desired visualization in natural language, and the agent outputs a complete JSON spec you can render in Observable, embed in a notebook, or save as a standalone HTML file. [^h7ye3w] [^xev8x2] [^w7m60l]

**[Observable Plot](https://observablehq.com/plot/what-is-plot)** follows the Grammar of Graphics but uses JavaScript API syntax rather than pure JSON. It's more code-like than Vega-Lite but still declarative — agents write `Plot.barY(data, {x: "column", y: "value"})` and the library handles the rest. It's rapidly becoming the standard for embedded web-based analytics visualizations. [^zpc0st] [^8lqxea] [^rx7cqn]

## Tabular Data Formats Beyond CSV

**[Apache Parquet](https://docs.pola.rs/user-guide/io/parquet/)** is the columnar storage format that's replaced CSV for analytics workflows. It's binary, not text, but agents understand the semantic layer: they know when to recommend Parquet over CSV (large datasets, columnar access patterns, type preservation). Tools like Polars and DuckDB treat `.parquet` as a first-class citizen — agents can write Python code that generates, queries, and transforms Parquet files with the same fluency they handle CSVs. [^32wybb] [^r3udn7] [^zxh7tq]

**[Apache Arrow IPC format](https://arrow.apache.org/docs/cpp/ipc.html)** is the in-memory columnar format that Parquet serializes to disk. It's becoming the universal interchange format for analytics — DuckDB, Polars, Pandas, and Spark all understand it natively. For agents, Arrow is the "assembly language" of dataframes — when an agent needs to move data between systems without serialization overhead, it writes Arrow. [^xsm5b6] [^zss1u0] [^c870ii]

## Analytics Workflow Specs (YAML)

**[dbt's YAML model specification](https://docs.getdbt.com/docs/build/latest-metrics-spec)** defines data transformations, semantic models, and metrics as structured YAML files. Agents can read and write these because they're declarative descriptions of data pipelines: which tables to join, which columns to aggregate, how to define a "revenue" metric. The dbt Semantic Layer compiles these YAML specs into optimized SQL at query time. [^tmiuv3] [^kvx1po]

For users working with an agent on data modeling, this means the agent can generate complete dbt project files — `schema.yml`, `dbt_project.yml`, metric definitions — that another analyst can immediately run. [^kvx1po] [^3i133g]

## SQL-as-Format (DuckDB's innovation)

**[DuckDB](https://duckdb.org/docs/current/sql/introduction.html)** blurs the line between database and file format. Agents write SQL queries that operate directly on CSV, Parquet, JSON files without loading them into a database first. The query itself becomes the transformation spec: `SELECT * FROM read_parquet('data/*.parquet') WHERE year > 2020` is both the format description and the execution plan. [^gwqbe1] [^tw80hh] [^flzdf2]

This is agent-fluent because SQL is already a lingua franca for agents — but DuckDB extends that fluency to ad-hoc file analysis. [^flzdf2] [^gwqbe1]

## Why These Work for Agents

The pattern: **declarative grammars with explicit semantics**. Vega specs say "this column is the x-axis, this is the y-axis" — there's no ambiguity. Parquet files carry their schema inline. dbt YAML models declare dependencies explicitly. Agents don't need to guess intent; the format *is* the intent. [^h7ye3w] [^zpc0st]

For users, this creates a powerful collaboration pattern: you describe what you want to visualize or analyze, the agent writes the Vega-Lite JSON or dbt YAML, you tweak it in a text editor, and the tooling renders the result. It's the same "diagrams as code" philosophy you identified with Mermaid, but for data.


# Sources

[^5knti2]: [Vega-Lite View Specification](https://vega.github.io/vega-lite/docs/spec.html)
[^h7ye3w]: [A High-Level Grammar of Interactive Graphics | Vega-Lite](http://vega.github.io/vega-lite-v3/)
[^u0aist]: [Vega-Lite Specification](https://vega.github.io/vega-lite-v1/docs/spec.html)
[^xev8x2]: [Introduction to Vega-Lite (JSON version) / UW Interactive Data Lab](https://observablehq.com/@uwdata/introduction-to-vega-lite-json)
[^w7m60l]: [Best Practices for Creating Charts with Vega and Vega-Lite - Turboline](https://turboline.ai/blog/vega-vegalite-best-practices)
[^zpc0st]: [Grammar of Graphics in practice: Observable Plot](https://data.europa.eu/apps/data-visualisation-guide/grammar-of-graphics-in-practice-observable-plot)
[^8lqxea]: [Data visualization with Observable JavaScript | InfoWorld](https://www.infoworld.com/article/2336882/data-visualization-with-observable-javascript.html)
[^rx7cqn]: [What is Plot? - Observable Notebooks](https://observablehq.com/plot/what-is-plot)
[^32wybb]: [polars.DataFrame.write_parquet — Polars documentation](https://docs.pola.rs/docs/python/dev/reference/api/polars.DataFrame.write_parquet.html)
[^r3udn7]: [Parquet - Polars user guide](https://docs.pola.rs/user-guide/io/parquet/)
[^zxh7tq]: [Exporting CSV files to Parquet file format with Pandas, Polars, and ...](https://www.markhneedham.com/blog/2023/01/06/export-csv-parquet-pandas-polars-duckdb/)
[^xsm5b6]: [Reading and writing the Arrow IPC format — Apache Arrow v24.0.0](https://arrow.apache.org/docs/cpp/ipc.html)
[^zss1u0]: [FAQ | Apache Arrow](https://arrow.apache.org/faq/)
[^c870ii]: [Streaming, Serialization, and IPC — Apache Arrow v24.0.0](https://arrow.apache.org/docs/python/ipc.html)
[^tmiuv3]: [How the dbt Semantic Layer works with MetricFlow](https://www.getdbt.com/blog/how-the-dbt-semantic-layer-works)
[^kvx1po]: [Migrate to the latest YAML spec | dbt Developer Hub](https://docs.getdbt.com/docs/build/latest-metrics-spec)
[^3i133g]: [A Simple Guide to configuring dbt_project.yml file | dbt | data build tool](https://www.youtube.com/watch?v=LpsEK_qL3_c)
[^gwqbe1]: [How to use DuckDB: A fast, self-contained analytics database](https://www.youtube.com/watch?v=eYZ-dXPhGqU)
[^tw80hh]: [Using DuckDB for Data Analytics - CODE Magazine](https://www.codemag.com/Article/2305071/Using-DuckDB-for-Data-Analytics)
[^flzdf2]: [Hands-on Introduction to DuckDB - To Data & Beyond - Substack](https://todatabeyond.substack.com/p/hands-on-introduction-to-duckdb)
[^1x4nl9]: [Elm - Vega Integration for functional declarative visualization - GitHub](https://github.com/gicentre/elm-vega)
[^w59aau]: [Specification - Vega](https://vega.github.io/vega/docs/specification/)
[^1gdv2i]: [Introduction to Data Visualization in Observable Plot Course: Part 1](https://www.youtube.com/watch?v=tHorkp-WCQY)
[^mf2hx7]: [Vega](https://data.europa.eu/apps/data-visualisation-guide/vega)
[^cyu0jh]: [Write Polars DataFrame as parquet dataset - bneijt.nl](https://bneijt.nl/blog/write-polars-dataframe-as-parquet-dataset/)
[^a8uyok]: [polars.DataFrame.write_parquet — Polars documentation](https://docs.pola.rs/docs/python/version/0.19/reference/api/polars.DataFrame.write_parquet.html)
[^xbi453]: [polars.read_parquet — Polars documentation](https://docs.pola.rs/docs/python/dev/reference/api/polars.read_parquet.html)
[^5qqbht]: [Reading and writing files on S3 with Polars | Rho Signal](https://www.rhosignal.com/posts/reading-from-s3-with-filters/)
[^on9r8e]: [Input/output — Polars documentation](https://docs.pola.rs/py-polars/html/reference/io.html)
[^gsh5kh]: [SQL Introduction - DuckDB](https://duckdb.org/docs/current/sql/introduction.html)


The key difference is **format versus API** — and that fundamentally shapes how agents interact with each.

## Vega-Lite: Pure Declarative JSON

Vega-Lite is a **JSON specification format**. You write a complete JSON object describing the entire visualization — data, encoding, mark type, scales, legends — and a renderer consumes it. For agents, this means: [^2mommt] [^h7bidu] [^lakg43]

- **Format portability**: The spec is data, not code. An agent writes JSON that can be serialized, stored as a file (`.vl.json`), sent over an API, or embedded in a notebook. [^h7bidu]
- **LLM-friendly constraints**: JSON schemas provide clear validation boundaries. Agents know exactly what properties are valid, and spec errors surface immediately. [^h7bidu]
- **Multi-agent systems**: Databricks reports that agents using Vega-Lite in production see 80-90% faster insights and 3-4x more questions per session because the JSON spec is **governed, portable, and API-native**. An agent can return a chart spec to Microsoft Teams, Slack, or a dashboard without rendering it first. [^h7bidu]

The downside: **verbosity**. Even simple charts require explicit encoding objects, mark definitions, and axis configurations. Agents write more tokens per chart. [^9whr8a] [^2mommt]

## Observable Plot: JavaScript API (Concise Imperative)

Observable Plot is a **JavaScript library with a functional API**. You call functions like `Plot.barY(data, {x: "category", y: "value"})` and it returns a rendered SVG. For agents, this means: [^z0p2mk] [^xdipk5] [^2mommt]

- **Concise syntax**: Plot prioritizes terseness. A bar chart is one line of code versus ~20 lines of Vega-Lite JSON. [^2mommt] [^9whr8a]
- **Sane defaults**: Plot auto-generates axes, scales, and legends based on data types. Agents don't need to specify every detail. [^z0p2mk]
- **Reactive integration**: In Observable notebooks, Plot charts can drive dataflow — brushing a scatterplot updates downstream cells. Agents leverage this for interactive analysis workflows. [^9whr8a]

The downside: **not portable as data**. Plot code is JavaScript, not a serializable spec. An agent can't "save" a Plot chart as a file format — it has to execute the code to produce SVG. [^9whr8a]

## When Agents Use Each

| Use Case | Vega-Lite | Observable Plot |
|----------|-----------|----------------|
| **Multi-agent systems** | ✅ Preferred — JSON spec is API-native, portable [^h7bidu] | ❌ Harder — requires JS runtime |
| **Rapid prototyping** | ⚠️ Verbose, slower iteration [^2mommt] [^9whr8a] | ✅ Preferred — concise, fast [^2mommt] [^vmj67s] |
| **Governed visualizations** | ✅ Schema-validated, self-documenting [^h7bidu] | ⚠️ Code requires review |
| **Embedded in chat tools** | ✅ Teams, Slack can render JSON specs [^h7bidu] | ❌ Requires server-side rendering |
| **Complex custom viz** | ✅ Full Vega for fine control [^wc1gox] | ⚠️ Falls back to D3 for edge cases [^z0p2mk] |
| **Exploratory analysis** | ⚠️ Higher token cost per iteration [^9whr8a] | ✅ Preferred — less syntax overhead [^vmj67s] [^xdipk5] |

## Agent Workflow Patterns

**Vega-Lite workflow**: Agent writes JSON spec → User validates in Vega Editor → Agent refines spec → Final JSON stored in version control or served via API. This is the pattern Databricks recommends for production multi-agent systems where visualizations need to be **governed** and **portable** across tools. [^h7bidu]

**Observable Plot workflow**: Agent writes JavaScript → Renders immediately in Observable notebook → User brushes/filters interactively → Agent updates code in response to user selections. This is faster for **exploratory sessions** but doesn't produce a reusable artifact. [^vmj67s] [^9whr8a]

## The Layer Confusion

One common mistake: comparing Vega (low-level) to Plot (high-level). The correct comparison is **Vega-Lite vs. Plot** — both are high-level grammars. Full Vega is lower-level, analogous to D3. [^wc1gox] [^7em05g] [^2mommt]

## Agent Generation Quality

Research shows agents (GPT-3.5/4) generate **valid Vega-Lite JSON ~70-80% of the time** but make common mistakes: invalid property names, incorrect nesting, misunderstanding data types. Plot's JavaScript API has higher initial success rates because syntax errors fail loudly, but debugging is harder because there's no schema to validate against. [^5ch4jg]

## Bottom Line for Agent Workflows

- **Choose Vega-Lite** if you need the chart to exist **as data** (saved, versioned, sent via API, rendered by non-JS tools). [^h7bidu]
- **Choose Observable Plot** if you're in an **interactive session** where speed matters more than portability. [^xdipk5] [^vmj67s] [^2mommt]

The trend in 2026: production multi-agent systems are standardizing on Vega-Lite because the JSON spec is **governed, portable, and self-validating**. Exploratory analysis still favors Plot for speed. [^xdipk5] [^vmj67s] [^h7bidu]

# Sources

[^2mommt]: [Plot & Vega-Lite - Observable Notebooks](https://observablehq.com/@observablehq/plot-vega-lite)
[^h7bidu]: [Bringing Visualizations to Life in Multi‑Agent Systems With Vega‑Lite](https://www.databricks.com/blog/bringing-visualizations-life-multi-agent-systems-vega-lite)
[^lakg43]: [Vega-Lite View Specification](https://vega.github.io/vega-lite/docs/spec.html)
[^9whr8a]: ['how is this different from vega lite'. An ans... - Hacker News](https://news.ycombinator.com/item?id=27041415)
[^z0p2mk]: [Observable Plot: Simplicity Meets Expressiveness in Charts](https://openvisualizationacademy.beehiiv.com/p/observable-plot-simplicity-meets-expressiveness-in-charts)
[^xdipk5]: [How open-source pro Tanner Linsley uses Observable Plot for ...](https://observablehq.com/blog/linsley-observable-plot)
[^vmj67s]: [The same chart in Vega-lite, D3 and Plot - Observable Notebooks](https://observablehq.com/@cobus/the-same-chart-in-vega-lite-and-d3)
[^wc1gox]: [Best Practices for Creating Charts with Vega and Vega-Lite - Turboline](https://turboline.ai/blog/vega-vegalite-best-practices)
[^7em05g]: [How does Vega compare to Observable Plot? I'm going to be ...](https://news.ycombinator.com/item?id=41332158)
[^5ch4jg]: [A Quick review of LLM for Data Visualization - vizGPT](https://vizgpt.ai/docs/blog/llm-for-viz)
[^cs9ofg]: [Observable: Vega-Lite: A Crash Course - YouTube](https://www.youtube.com/watch?v=ZV_Yjcs5WtM)
[^kvvuk2]: [Getting Started with Vega-Lite & Observable - YouTube](https://www.youtube.com/watch?v=3Bl5Zm422Q4)
[^xtq5mu]: [What is the different between observable vega lite and actual vega ...](https://talk.observablehq.com/t/what-is-the-different-between-observable-vega-lite-and-actual-vega-lite/5995)
[^y1m9u7]: [Getting started | Plot - Observable Notebooks](https://observablehq.com/plot/getting-started)
[^wqb0qv]: [Week 1 Lab: Introduction to Observable and Vega-Lite](https://observablehq.com/@nyu34/week-1-lab-introduction-to-observable-and-vega-lit)
[^n9xad8]: [Plot | The JavaScript library for exploratory data visualization](https://observablehq.com/plot/)
