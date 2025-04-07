---
date_created: 2025-04-06
date_modified: 2025-04-06
---

# Project Directory Structure

## Core Project Structure
- `site/` - Default directory for all work, self-contained Astro project
  - Files in root directory are for containers and ephemeral environments

## Source Code Structure (`site/src/`)
- `src/utils/` - Utilities and helpers
  - All utility functions and helper code
  - Includes markdown processors, error handlers, and other shared functionality
  - Example: `preventFrontmatterIrregularitiesFromCausingErrors.ts`

- `src/types/` - TypeScript type definitions
  - Single source of truth for all type definitions
  - No duplicate type definitions allowed in other directories

## Content Structure (`site/src/content/`)
- `content/lost-in-public/`
  - `prompts/` - Contains prompts for work
    - `Meticulous-Constraints-for-Every-Prompt.md` - Required context file for all prompts
  - `sessions/` - HISTORICAL RECORD, append-only
  - `issue-resolution/` - HISTORICAL RECORD, append-only
  - `rag-input/` - Contains Map of Relevant Paths
    - `Map-of-Relevant-Paths.md` - This file

- `content/specs/` - Technical Specifications
- `content/changelog--code/` - Changelog entries
- `content/tooling/` - Content Markdown files with frontmatter
- `content/data/` - JSON data files (no database, file-based storage)

## Scripts (`site/scripts/`)
- Purposefully outside src directory
- `build-scripts/` - Run during `pnpm build`
- `tidy-up/` - Issue-specific cleanup scripts

## Important Rules
1. NEVER create directories without explicit permission
2. NEVER duplicate type definitions
3. NEVER make destructive edits to files in:
   - `content/lost-in-public/sessions/`
   - `content/lost-in-public/issue-resolution/`
4. ALWAYS append to historical record files, never modify existing content
