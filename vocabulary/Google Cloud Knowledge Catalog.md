---
docs_url: "https://docs.cloud.google.com/knowledge-catalog/docs/metadata-overview"
date_created: 2026-11-06
date_modified: 2026-11-09
site_uuid: 77b01e6f-4250-4c62-9584-c54756786fa1
publish: true
title: "Google Cloud Knowledge Catalog"
slug: google-cloud-knowledge-catalog
at_semantic_version: 0.0.0.1
---

# Google Cloud Knowledge Catalog

Formerly Dataplex Universal Catalog, renamed on 2026-04-10. The API, client library, CLI and IAM names are still Dataplex.

## For a lay user

**What it is:** Google Cloud's company-wide card catalog for data. It records what data a company has, what each table or column means, who owns it, whether it's trustworthy, and how it connects to everything else. People search it, and AI agents use it to find the right data and understand it.

**How it fills up:**
- Google adds entries automatically for anything you keep in Google Cloud, like databases, BigQuery tables, dashboards and AI models.
- Your team adds the business context: plain-English definitions, owners, which fields hold private information.
- A glossary connects business terms to the actual data, so a search for "revenue" finds the right table.

**What OKF has to do with it:** a connector copies a folder of OKF docs into the catalog, so they sit next to the company's data and agents can search them. You can also pull them back out as the same markdown files.

**For us:** it only matters for anyone running on Google Cloud. The git repo stays the original. The catalog would only ever hold a copy.

## For a developer user

### The catalog's data model

| Concept | What it is |
|---|---|
| **EntryGroup** | A container per region. It's the unit of access control (IAM). Google creates system ones like `@bigquery`; you create custom ones. |
| **Entry** | One asset, such as a table, model or file. Its columns are schema paths written with dots (`customer.address.zip`). |
| **AspectType** / **Aspect** | A typed schema for metadata (string, enum, record, array, map, datetime and so on), and an instance of it attached to an entry, a column or a link. |
| **EntryType** | A template that makes certain aspects required, for governance. |
| **EntryLink** | A typed relationship: `synonym`, `related`, `definition` or `schema-join`. Links can carry aspects too. |

There's also a REST API, search, and change feeds that publish create, update and delete events to Pub/Sub. You pay for the amount of metadata stored. Searching and managing these resources is free.

### How the OKF connector works

It uses `kcmd` from `GoogleCloudPlatform/knowledge-catalog/toolbox/mdcode`.

1. **Prerequisites:** a GCP project with the Dataplex API turned on, `gcloud` with application default credentials, and both the project and region set in `gcloud config`. Those settings are the only way to choose them; there's no flag or environment variable. You also need Bun.
2. **Build:** `npm install && npm run build` produces `dist/kcmd`.
3. **Copy the demo:** copy `demo/okf`, then change the hardcoded EntryGroup name (`okf_ga4`) and the path to `kcmd`.
4. **Set up the catalog:** `bun setup.ts` creates the EntryGroup, a custom `okf` aspect type and `catalog.yaml`. It's safe to run again.
5. **Push:** copy your bundle into `catalog/`, then run `bun push.ts`.
6. **Check the round trip:** run `bun pull.ts`. The first pull reformats the YAML in every frontmatter block, but no values change. Commit that once, and later pulls come back identical.

**Each doc maps like this:**
- `title`, `description` and `tags` become native entry fields. Tags turn into labels set to `"true"`.
- `resource` becomes the entry's resource name.
- `type`, `generated` and `sources` are stored on the `okf` aspect.
- The markdown body is carried as-is.

### Limits that matter for context-v

- **Only 7 frontmatter keys are carried.** Everything else context-v uses, like `status`, `verified`, dates, `hex_code` and `site_uuid`, is dropped unless you add fields to `okf-aspect.json` and `okf.ts`.
- **Links between docs don't resolve.** They're stored as plain text, so the catalog gives you no graph of your docs.
- **Only `.md` files go across.** Images and HTML are skipped.
- **It's one-way in practice.** Renaming a doc orphans its old entry, deleting one leaves the entry behind, and there's no merging. Treat git as the source of truth and push when you merge.
- **Access isn't per doc.** Anyone with Viewer on the project can read and export the whole EntryGroup.
- **It's only been tested on the 14-file demo.** Each file is a separate API call, and Google enforces quotas.

For context-v repos, push the strict copy from `okf_export.py` rather than the raw folders. Even then, most of what makes context-v useful is lost unless you widen the aspect.

## Sources

- [About metadata in Knowledge Catalog](https://docs.cloud.google.com/knowledge-catalog/docs/metadata-overview)
- [Publishing an OKF bundle to Google Cloud Knowledge Catalog](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/connectors/gcp-knowledge-catalog.md)
- [kcmd (toolbox/mdcode)](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/toolbox/mdcode)
