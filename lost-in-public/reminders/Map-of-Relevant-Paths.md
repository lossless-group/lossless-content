---
title: 'Map of Relevant Paths'
lede: 'Review this file to ensure code generation is using the correct paths and directory structure in this complex monorepo.'
date_authored_initial_draft: 2025-04-06
date_authored_current_draft: 2025-04-12
date_authored_final_draft: null
date_first_published: null
at_semantic_version: 0.0.0.1
status: Routine
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
image_prompt: 'A digital blueprint of a monorepo, with highlighted directory paths, warning signs, and strict folder boundaries—emphasizing correct structure and navigation.'
date_created: 2025-04-06
date_modified: 2025-04-22
site_uuid: 05e41630-1753-4bae-a4d6-20bf9147d76b
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_portrait_image_Map-of-Relevant-Paths_6eafc83b-f4ca-472f-b81e-37b00af3c97b_ze33S8bam.webp
tags: [Code-Style, Software-Architecture, Code-Generators, Bug-Prevention]
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_banner_image_Map-of-Relevant-Paths_adc5bcaa-0b61-45dd-846c-7817cdf66597_AAS_MDchj.webp
---
# Project Directory Structure

## ⚠️ CRITICAL PATH STRUCTURE WARNING ⚠️

This is a complex, loosely coupled monorepo with 12 submodules. Path structure must be strictly respected:

- `/content/` - Root-level content directory (NOT inside site/)
- `/content/reports/` - Reports always go here
- `/site/` - Astro project with its own internal structure
- `/tidyverse/` - Tidyverse submodule with its own internal structure\
- Other submodules with their own internal structures

NEVER create files in incorrect locations or mirror directories across submodules.
ALWAYS verify the correct path before creating or modifying files.

## Core Project Structure
- `site/` - Default directory for all work, self-contained Astro project
  - Files in root directory are for containers and ephemeral environments

## Source Code Structure (`site/src/`)
- `src/utils/` - Utilities and helpers
  - All utility functions and helper code
  - Includes markdown processors, error handlers, and other shared functionality
  - Example: `preventFrontmatterIrregularitiesFromCausingErrors.ts`
  - `routing/` - Routing utilities
    - `routeManager.ts` - Manages content path to web route mappings

- `src/types/` - TypeScript type definitions
  - Single source of truth for all type definitions
  - No duplicate type definitions allowed in other directories

## Content Structure (`/content/`) - ROOT LEVEL, NOT IN SITE
- `content/lost-in-public/`
  - `prompts/` - Contains prompts for work
    - `render-logic/` - Contains render-related prompts
    - `workflow/` - Contains workflow-related prompts
    - `Meticulous-Constraints-for-Every-Prompt.md` - Required context file for all prompts
  - `sessions/` - HISTORICAL RECORD, append-only
    - All session logs should be placed here, NOT in rag-input
    - Naming format: `[Topic]-Session-Log-[YYYY-MM-DD].md`
  - `issue-resolution/` - HISTORICAL RECORD, append-only
  - `rag-input/` - Contains reference materials for RAG
    - `Map-of-Relevant-Paths.md` - This file
    - `Maintain-a-Session-Log.md` - Template for session logs

- `content/specs/` - Technical Specifications
- `content/changelog--code/` - Changelog entries
- `content/tooling/` - Content Markdown files with frontmatter
- `content/data/` - JSON data files (no database, file-based storage)
- `content/vocabulary/` - Markdown files with frontmatter for vocabulary terms
- `content/concepts/` - Markdown files with conceptual frameworks and important ideas

## Astro Content Structure (`site/src/content/`)
- Different from root `/content/` directory
- Used for Astro's content collections
- Collections defined in `site/src/content.config.ts`
  - `vocabulary` - Maps to `/content/vocabulary/`
  - `concepts` - Maps to `/content/concepts/`
- Do NOT place prompts, specs, or other content here unless specifically instructed

## Dynamic Routing
- `site/src/pages/more-about/[content-item].astro` - Dynamic router for vocabulary and concepts
- `site/src/pages/more-about/index.astro` - Index page for all reference content
- `site/src/pages/more-about/vocabulary.astro` - Index page for vocabulary terms
- `site/src/pages/more-about/concepts.astro` - Index page for concepts

## Scripts (`site/scripts/`)
- Purposefully outside src directory
- `build-scripts/` - Run during `pnpm build`
- `tidy-up/` - Issue-specific cleanup scripts

## Tidyverse Submodule (`tidyverse/`)
- `tidyverse/observers/` - Filesystem observer system
  - `fileSystemObserver.ts` - Main observer implementation
  - `index.ts` - Entry point for the observer
  - `services/` - Observer services
    - `templateRegistry.ts` - Manages templates for frontmatter
    - `reportingService.ts` - Generates reports on file processing
  - `templates/` - Template definitions
    - `tooling.ts` - Template for tooling directory
    - `prompts.ts` - Template for prompts directory
  - `types/` - Type definitions for the observer
  - `utils/` - Utility functions
    - `commonUtils.ts` - Common utilities (date formatting, etc.)
  - `scripts/` - One-off scripts for the observer
    - Place all tidyverse-related scripts here

## Submodule Conventions

*   **`tidyverse`**: All scripts or code intended to clean, enforce consistency, or assert data integrity across content and data files should reside within this submodule.

## Important Rules
1. NEVER create directories without explicit permission
2. NEVER duplicate type definitions
3. NEVER make destructive edits to files in:
   - `content/lost-in-public/sessions/`
   - `content/lost-in-public/issue-resolution/`
4. ALWAYS append to historical record files, never modify existing content
5. ALWAYS place scripts in the appropriate directory:
   - For site-related scripts: `site/scripts/`
   - For tidyverse-related scripts: `tidyverse/observers/scripts/`
6. ALWAYS follow the Single Source of Truth principle:
   - For date formatting: use `formatDate` in `tidyverse/observers/utils/commonUtils.ts`
   - For type definitions: use types in `src/types/` or submodule-specific types
7. NEVER modify frontmatter in content files without using the observer system
8. ALWAYS double-check paths when creating new files - DO NOT confuse `/content/` (root) with `/site/src/content/` (Astro)
9. ALWAYS place session logs in `/content/lost-in-public/sessions/`, NOT in `/rag-input/`
10. ALWAYS place scripts for data cleaning and consistency enforcement in the 'tidyverse' submodule.
