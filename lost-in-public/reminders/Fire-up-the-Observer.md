---
title: 'Fire up the Observer'
lede: 'Ready to automate? Learn how to launch the Observer system for seamless citation and frontmatter processing across your content library.'
image_prompt: 'A futuristic terminal window launching an observer robot, with glowing file paths, citation icons, and YAML frontmatter floating in a digital workspace.'
date_authored_initial_draft: 2025-04-13
date_authored_current_draft: 2025-04-13
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.1.0.0
status: To-Implement
augmented_with: 'Windsurf Cascade on Claude 3.7 Sonnet'
category: Documentation
date_created: 2025-04-13
date_modified: 2025-04-22
site_uuid: 92421e72-f568-4d69-8023-fda8af85b652
portrait_image: https://img.recraft.ai/pgVuGWUtAk12Z7PjRSbwOx7S0b370MBoBuB05Ug0EgY/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/56ea9dbf-4a0f-4e00-938f-1e3ad8330bd1
tags: [Data-Integrity, File-Processing, Observer-System]
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/mANjGXwnvVq1itz-vMmExJVc3YrTK_0hKasdRklxs_M/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/08958cc1-c093-4d93-8859-9bebc974a59d
---

# Running the Observer System

This document provides instructions for running the filesystem observer to process citations and frontmatter in markdown files.

## Integrated Observer System

The observer system now has fully integrated citation processing directly in the FileSystemObserver. There are no separate scripts for citation processing - it's all handled by the main observer.

## Running the Observer

To run the observer and process both citations and frontmatter:

```bash
cd /Users/mpstaton/code/lossless-monorepo/tidyverse/observers
pnpm start
```

This will run the `start` script defined in package.json, which executes `ts-node index.ts`.

You can also specify a custom content root directory as an argument:

```bash
pnpm start -- ../../content
```

This will:
1. Start the FileSystemObserver
2. Watch for file changes in configured directories
3. Process citations in markdown files (convert numeric to hex)
4. Validate and update frontmatter
5. Generate reports periodically

## How Citation Processing Works

When the observer detects a new or modified markdown file:

1. First, it processes citations using the `processCitationsInFile` method
   - Converts numeric citations to hex format
   - Updates the citation registry
   - Adds footnotes section if needed

2. Then, it processes frontmatter in a separate operation
   - Validates against templates
   - Adds missing required fields
   - Normalizes property names

## Monitoring Results

The observer will output logs to the console showing:
- Files being processed
- Citations being converted
- Frontmatter being updated
- Any errors or warnings

Reports are generated in the `content/reports` directory every 5 minutes and when the observer is shut down.