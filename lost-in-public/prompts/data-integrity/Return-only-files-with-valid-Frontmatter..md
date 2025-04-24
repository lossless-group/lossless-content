---
title: Return only files with valid Frontmatter
lede: Filter and validate markdown files based on frontmatter content
date_authored_initial_draft: 2025-03-17
date_authored_current_draft: 2025-03-17
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A code utility scanning a directory and returning only Markdown files with valid YAML frontmatter, visualized as a digital checklist, file icons, and highlighted metadata. The mood is efficient, organized, and focused on data quality assurance."
site_uuid: 8d09aab2-a159-4016-9167-ea0f880c10b9
tags:
  - Frontmatter-Validation
  - Error-Handling
  - File-Processing
  - Build-Scripts
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/S01cfWsTdyzV6AKwynwQnZNSrOvMiAMYhNgDO7W-grs/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/cdbd461a-d504-4914-8dae-edb471909890

## Objective: 
Filter out any markdown files that have frontmatter content that could cause errors in another operation. Diagnose each error, and create a report listing all diagnosed errors. Return only files that have valid frontmatter to other functions that will perform operations on markdown files.  

## Constraints
Using only the `fs` and `path` node libraries, 
Process ALL files in a target directory, however nested.  Any error should be non-blocking. 

## User Options