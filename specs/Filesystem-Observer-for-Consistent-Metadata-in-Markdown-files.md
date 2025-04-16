---
title: 'Filesystem Observer for Consistent Metadata in Markdown Files'
lede: Let content teams develop content. Handle frontmatter inconsistencies gracefully for a seamless user experience.
date_authored_initial_draft: 2025-04-16
date_authored_current_draft: 2025-04-16
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.2
authors:
  - Michael Staton
generated_with: "Windsurf Cascade on Claude 3.5 Sonnet"
category: Technical-Specification
tags: [YAML, Data-Wrangling, Frontmatter, Error-Detection, Error-Handling, Workflow-Automation, Content-Management, Build-Scripts, Markdown]
date_created: 2025-04-16
date_modified: 2025-04-16
---
# Context

## Goal:
1. To assert both frontmatter consistency in markdown files, as well as 
2. process markdown content, making targeted transformations to assert consistent extended markdown syntax for safe and consistent rendering. 
3. Maintain an "index" style registry of important, shared content across markdown files across our content library.  
4. Have confidence our code is stable and maintainable, and follows patterns and conventions well known to developers and AI Code Assistant LLMs.

## Unique cases caused by favored tool use.
A content team uses Obsidian as a markdown editor. Obsidian has a built-in YAML frontmatter manager, but it is not always perfect. The way Obsidian handles various frontmatter properties and their values, especially the "data type" -- to the extent it can be called that -- is often inconsistent with various other common YAML frontmatter related-libraries.  (Particularly, grey-matter and js-yaml.) 

The content team is naturally focused on generating content, and not on maintaining metadata. Therefore, the metadata is often incomplete or has errors or does not exist at all.  

## Circles and circles of scripting
Much effort has gone into write and running javascript scripts to correct frontmatter inconsistencies. We have scripts that try to solve all the problems at once, and scripts that try to correct one problem at a time. The result is that the volume of code was out of hand, and with using AI Code Assistants for expediency, we were often solving one problem while recreating another. 

For fun, here are some examples:
- In correcting the "tags" array formatting, and standardizing the values on the unordered list format with Train-Case values and no quote delimiters, the script somehow put "block-scalar" syntax on multi-line URLs. (Which can break obsidian, or other scripts). 
- In correcting "block scalar" syntax, a script put quote delimiters around URLs, often inconsistently, often unbalanced. This created errors in being able to parse the frontmatter, which then led to enormous inconsistencies across hundreds of files. 

## Disorderly and nonsensical massive code volume.

The volume of scripting code became so large, we needed to move it to its own submodule.  

At this point, barely anyone can make sense of it. No one can tell you what works or how to use it.  

No one wants to try to refactor it, yet we all know there is plenty of "good stuff" in there somewhere.  

## Early promise: Initial attempt at a Filesystem observer. 

Our initial attempt at implementing a filesystem observer was a success in the first, very limited functionality we implemented.

We were able to: 

Initiate a pattern that made sense with `templates` and `services`, managed by an orchestrator and initiated with a `watcher`.

The main directory is 
@[tidyverse/observers/]

Initializer: @[tidyverse/observers/index.ts]
Orchestrator: @[tidyverse/observers/fileSystemObserver.ts]

Subdirectories:
- Templates: @[tidyverse/observers/templates/]
   - prompts.ts
   - specifications.ts
   - tooling.ts
   - vocabulary.ts

- Services: @[tidyverse/observers/services/]
   - openGraphService.ts
   - reportingService.ts
   - templateRegistry.ts

This pattern was able to assert frontmatter consistency in a limited way for specific directories for which we authored a template. 

Notably, it was able to orchestrate making requests of the OpenGraph.io API on our 'tooling' directory, generating Open Graph metadata for any new content file. Hyperfast, and with no errors. 

## The Snag: complexity and who knows what caused the error. 

Getting excited, one of our next features we wanted was to enhance the markdown citations capability by asserting our "flavor", and creating a content-wide registry for both unique "sources" as well as any number of connected "citations".

So, a more comprehensive and sophisticated service, the `citationService.ts`. Accompanied, the template `citations.ts`

### The Infinite Loop: 

Observers watch for file changes, and when a change is detected, they process the file. If the file is modified, the observer will detect the change and process it again, creating an infinite loop. This is particularly true because as a file is modified, it updates the "date_modified" property in the frontmatter, which triggers the observer to process the file again.

### Side Effects of Corruption in unintended properties:

IT WORKED. But, a day later we noticed that something had corrupted our markdown files and their frontmatter, throughout our content library. We traced the issue back to the observer, and the infinite loop. Yet, the properties that were corrupted were generally NOT PART OF THE OBSERVER SYSTEM.  Yet nothing else had programmatically altered files.  

Unable to diagnose the source and correct it, we gave up. 

## Prior Prompts related to the Observer intention:

1. [[lost-in-public/prompts/data-integrity/Use-Filesystem-Observer-to-Assert-Frontmatter-Updated.md|Use Filesystem Observer to Assert Frontmatter Updated]]

2. [[lost-in-public/prompts/data-integrity/Refactored-Citations-Observer.md|Refactored Citations Observer]]

# Objectives:
Converge on a known and elegant set of patterns and conventions for file organization, file naming, and function naming in a transformation pipeline. 

Achieve confidence in stability of the Observer code and patterns. 

Achieve confidence that adding additional functionality will be straightforward, reduced effort, and low likelihood of introducing more errors. 

Reuse existing logic across efforts. 

Prefill metadata from template. 

Amend metadata with new key value pair. 

## Consolidate Extended Markdown Render Logic

1. [[lost-in-public/prompts/render-logic/Handle-Citations-Logic-and-Render-Citations-Component.md|Handle Citations in Markdown Content]]

2. [[lost-in-public/prompts/render-logic/Handle-Custom-Codeblocks-in-Astro-Comprehensive.md|Handle Custom Codeblocks in Astro Comprehensive]]

3. [[lost-in-public/prompts/render-logic/Handle-Codeblocks-in-Astro.md|Handle Codeblocks in Astro]]

4. [[lost-in-public/prompts/render-logic/Rendering-Extended-Markdown-through-AST.md|Rendering Extended Markdown through AST]]

5. [[lost-in-public/prompts/render-logic/Rendering-Callout-Blocks-with-Classes.md|Rendering Callout Blocks with Classes]]

## Consolidate Frontmatter Preprocessing

1. [[specs/Prescreen-and-Triage-Iconsistencies-in-YAML.md|Prescreen and Triage Iconsistencies in YAML]]

2. [[lost-in-public/prompts/data-integrity/Create-or-Update-Open-Graph-Data.md|Create or Update Open Graph Data]]

3. [[lost-in-public/prompts/data-integrity/Refactored-Citations-Observer.md|Refactored Citations Observer]]

4. [[lost-in-public/prompts/data-integrity/Use-Filesystem-Observer-to-Assert-Frontmatter-Updated.md|Use Filesystem Observer to Assert Frontmatter Updated]]


JUST MOVE THE FUCKING CONTENT TO HYGRAPH.

Unit Tests. Sanity Check. 

# Seeking Conventions
Model vs Feature approach.
Feature approach is harder to maintain. 

## Current Approach, Patterns, Conventions

### 1. File Organization

### 2. File Naming

### 3. Function Naming


`content/specs/Cases-and-Corrections-for-YAML-Content-Wide.md`

`content/specs/Create-a-Content-Registry-for-Markdown-Files.md`

