---
title: Integrate new content thread by creating a template
lede: Use Astro Collections, audit frontmatter, and create template that can be used in Scripts, Observers, and Watchers
date_authored_initial_draft: 2025-04-21
date_authored_current_draft: 2025-04-21
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on GTP 4.1
category: Prompts
date_created: 2025-04-21
date_modified: 2025-04-21
image_prompt: "A robot with a clipboard, reviewing a list on a chalkboard. The right side shows a whiteboard with better handwriting."
tags:
  - File-Processing
  - YAML
  - Frontmatter
  - Data-Integrity
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/uwWQdPWqtZd_nIDIizXGf146UJKuj0F9Hk6fzDCDCsE/rs:fit:1820:1024:0/raw:1/plain/abs://external/images/ec5cb419-1466-4b77-a8e9-d6da0f9f000a
banner_image: https://img.recraft.ai/G0iadvwFcRdPQ4uxWYxyxg7VsQOVLsSbufR5fOUQN5c/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/78642f04-8bd3-40c7-82a7-62c851bf4508
---

# Role
You are a content manager for a small but productive marketing team.  You are the "technical" lead that works most closely with developers who build and maintain a content-driven application and site.  

# Objective
Introduce a "Reminders" content collection along the same lines as "Prompts", and "Specifications." 


### First, the template for the observer. 

The Observer is the master orchestrator. Watchers are "mini-observers" that watch specific directories and apply templates to files, or call specific services. Services generally perform some kind of transformation, validation, or reporting -- often using an API. 

Observer: `tidyverse/observers/fileSystemObserver.ts`
Templates: `tidyverse/observers/templates`
Watchers: `tidyverse/observers/watchers`
Services: `tidyverse/observers/services`

## Task at Hand:
1. Audit the Markdown frontmatter from the following directory:
> `content/lost-in-public/reminders`
2. Review the "patterns" we have used in other templates, such as `tidyverse/observers/templates/prompts.ts`.
3. Create a template that can be used in Scripts, Observers, and Watchers. The starter file has a copy of one of the frontmatter sections from a reminders file. `tidyverse/observers/templates/reminders.ts`

# Patterns from Existing Templates (prompts.ts)

Below are the patterns and conventions extracted from `tidyverse/observers/templates/prompts.ts` for use in designing a canonical reminders template:

---

**Field Order and Structure:**
- Required fields are listed first, followed by optional fields.
- Each field includes: type, description, validation function, and default value logic.
  - **NOTE:** Validation functions are intended to prevent errors, not cause them. By default, validation functions should only generate reports on detected issues; they should never attempt to automatically fix or mutate the content. All remediation must be manual or explicitly triggered by the user or a higher-level process.
- All dates use strict `YYYY-MM-DD` format (never include time component).
- Arrays (e.g., `authors`, `tags`) are validated for non-empty values and can accept both array and string (comma-separated) formats.
- Use of utility functions for UUIDs, file creation/modification dates, and tag generation from file paths.

**Required Fields (with validation and defaults):**
- `title` (string, required, auto-generated from filename if missing)
- `lede` (string, required, brief description)
- `date_authored_initial_draft` (date, required, default = today)
- `date_authored_current_draft` (date, required, default = today)
- `at_semantic_version` (string, required, default = 0.0.0.1)
- `authors` (array or string, required, default = ['Michael Staton'])
- `status` (string, required, default = 'To-Prompt')
- `augmented_with` (string, required, default = 'Windsurf Cascade on Claude 3.5 Sonnet')
- `category` (string, required, default = 'Prompts')
- `tags` (array or string, required, auto-generated from path if possible)
- `date_created` (date, required, default = file creation date)
- `date_modified` (date, required, default = now)
- `site_uuid` (string, required, default = generated UUID)

**Optional Fields:**
- `date_authored_final_draft` (date, optional)
- `date_first_published` (date, optional)
- `date_last_updated` (date, optional)
- `date_first_run` (date, optional)

**Reusable Patterns:**
- Always provide a validation function for each field.
- Use default value functions for auto-population (e.g., title, tags, dates).
- Normalize and capitalize tags from directory structure for consistency.
- Use robust error handling in default generators.
- Comment each field with purpose and usage.

---

**Next Step:**
When creating the reminders template, mirror this structure and logic for all frontmatter fields. Use the same validation rigor, defaulting, and commenting style. Adjust field names and defaults as appropriate for reminders, but preserve the DRY, robust, and machine-parseable conventions.
