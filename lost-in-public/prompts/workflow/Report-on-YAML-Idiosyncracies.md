---
title: Report on YAML Idiosyncracies
lede: Write or run a script that iterates through content libraries and reports on YAML idiosyncracies.
date_authored_initial_draft: 2025-04-18
date_authored_current_draft: 2025-04-18
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_modified: 2025-04-18
date_created: 2025-04-18
image_prompt: "An inspector with a clipboard is looking at a cloud of files, laid out like an operating system folder structure"
tags:
  - Scripting
  - YAML
  - Reporting
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/Bmsys2lPl3XVyt9LxJL_AzpOyXcZUcRP9aZFrce5SbQ/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/4ffaed10-89d5-41ef-9541-6201dbb1ded9
---

# Higher-Order Objective:

Assure all files in the:
`content/lost-in-public/prompts/` directory
have an image_prompt, then run the 
`generate-banner-images-recraft.py` script for files that lack a banner_image property.

# Task at Hand:

Write a script in 
`tidyverse/tidy-up/tidy-one-property/assure-image-prompts-banner-image/checkForImagePromptsBannerImage.cjs`


That script will Report files that lack an "image_prompt" property and/or a "banner_image" property.

From the directories:

- `content/lost-in-public/prompts/

Report files that lack a
1. "image_prompt" property.
2. "banner_image" property.

using the base patterns and conventions defined in:
`content/lost-in-public/rag-input/Maintain-Consistent-Reporting.md`

## Relevant Previous Directories:
`ai-labs/apis/recraft`

## Relevant Previous Files:

`ai-labs/apis/recraft/generate-banner-images-recraft.py`


# Context:

We have done a lot of scripting, as a team.  We probably ALREADY have code related to the Task-at-Hand.  Let's search the relevant directories for releant code.  

## Standardized reporting template and directory:

`content/lost-in-public/rag-input/Maintain-Consistent-Reporting.md`
`content/reports`

