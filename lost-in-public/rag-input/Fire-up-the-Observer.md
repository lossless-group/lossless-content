---
title: Fire up the Observer
lede: Instructions for running the filesystem observer to process citations and frontmatter
date_authored_initial_draft: 2025-04-13
date_authored_current_draft: 2025-04-13
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.1.0.0
status: To-Implement
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Documentation
date_created: 2025-04-13
date_modified: 2025-04-13
site_uuid: 5f3c2e1d-8a7b-4c9d-b0e5-6f4a2d8c1b3a
tags:
  - Data-Integrity
  - File-Processing
  - Observer-System
authors:
  - Michael Staton
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