---
title: Filesystem Observer for Consistent Metadata in Markdown Files
lede: Let content teams develop content. Handle frontmatter inconsistencies gracefully for a seamless user experience.
date_authored_initial_draft: 2025-04-16
date_authored_current_draft: 2025-04-16
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.2
generated_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Technical-Specification
date_created: 2025-04-16
date_modified: 2025-04-17
status: Draft
site_uuid: a065f528-1a6e-4e05-93e6-e72f00c7364b
tags:
  - Filesystem
  - Observer
  - For
  - Consistent
  - Metadata
  - In
  - Markdown
  - Files
authors:
  - Michael Staton
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

# Product Management Vision & Implementation Roadmap

## Executive Summary

The Filesystem Observer system is the backbone of our content integrity and metadata consistency strategy. Its success is measured not only by technical correctness, but by its ability to empower content teams to focus on writing, while ensuring our build, search, and publication pipelines are always working with clean, reliable, and richly annotated Markdown files. This document outlines a vision and actionable roadmap for evolving our observer system into a robust, extensible, and developer-friendly platform.

---

## 1. System Pillars
- **No YAML Libraries**: The observer must never use YAML libraries to parse frontmatter or assure frontmatter consistency.  Even though this feels like the most straightforward way, the libraries all have their own implicit syntax preferences and do not handle various data types or edge cases in the desired way. We have had consistent experiences that out-of-the-box YAML libraries will corrupt the entire content library without even knowing it is happening. All frontmatter parsing must be done using a custom parser, preferrably ONLY ONE so there is a single source of truth.
- **Non-Destructive Automation**: The observer must never overwrite or destructively edit user content. All corrections and updates should be idempotent, traceable, and reversible.
- **Template-Driven Consistency**: All detection, correction, and augmentation of frontmatter and content must be governed by clearly versioned templates, with single sources of truth for each content type.
- **Transparent Reporting**: Every observer action must be logged to a persistent, human-readable report file. Reports should follow a markdown template, include absolute file paths, and summarize all property conversions, validation issues, and actions taken.
- **Extensibility by Design**: Adding new content types, metadata fields, or processing logic should require only a new template and (optionally) a new service, without core refactoring.
- **Feedback Loops**: The system must provide actionable feedback to both developers and content authors, enabling continuous improvement in both code and content.

---

## 2. Architecture Overview

```mermaid
graph TD
    A[File System Event] --> B[FileSystemObserver]
    B -->|Extract| C[Frontmatter & Content]
    C -->|Detect Idiosyncrasies| D[TemplateRegistry]
    D -->|Get Template| E[Templates]
    C -->|Missing Fields?| F[Add Missing Fields]
    F -->|Special Handling| G[date_created, tags, etc.]
    F -->|Update| H[Write Updated File]
    B -->|Process| I[Content Services]
    I -->|e.g. Citations| J[CitationService]
    I -->|e.g. OpenGraph| K[OpenGraphService]
    B -->|Log| L[ReportingService]
    L -->|Write| M[Markdown Report]
```

***

## 3. Reporting: The Heart of Trust

### Requirements
- Reports are generated on every INITIAL observer run, and then accumulated alterations to content will update a period-based report, (e.g. once per day), and on shut down.
- The report file lives in `/content/reports` and is never overwritten, always updated, appended, or newly created. Bloat will be solved by users and the content team who will decide a report has already been reviewed and is no longer important, they will delete them manually.

- Reports must:
  - List all files processed, using Obsidian backlink syntax, in paragraph form with each file processed comma separated. 
    - (e.g. `[[lost-in-public/prompts/workflow/Maintain-Consistent-Reporting-Templates.md|Maintain-Consistent-Reporting-Templates.md]]`)
  - Changes will be aggregated and listed for each type of change, to whatever field or set of fields were changed. 
    - (e.g. Property key syntax changes:
      - `tags: kebab-case → snake_case`
      - `category -> categories)
  - Summarize validation errors, warnings, and any auto-corrections
  - Include a timestamp and observer version
  - Follow a markdown template with frontmatter for traceability

### Example Report Structure
```markdown
---
title: Filesystem Observer Report
date: 2025-04-16
observer_version: 0.2.0
---

# Summary
- Files processed: 124
- Files with changes: 37
- Validation errors: 3
- Auto-corrections: 12

# File Details
## /absolute/path/to/file1.md
- **Property conversions:**
    - tags: kebab-case → snake_case
    - date_created: added from file birthtime
- **Validation:**
    - Missing required: authors (auto-added)

## /absolute/path/to/file2.md
...

# Conversion Map
| Property | Before | After |
|----------|--------|-------|
| tags     | ["Data-Integrity"] | ["data_integrity"] |
| ...      | ...    | ...   |

# Observer Activity Log
- 15:21:02 Processed [[/path/to/file1.md|file1]]
- 15:21:03 Processed [[/path/to/file2.md|file2]]
...

---

## 4. Implementation Roadmap

### Phase 1: Foundation & Stability
- Refactor observer to ensure all file writes are atomic and idempotent.
- Set USER_OPTIONS at the top of any file to assure easy changes by the user. 
  - Most importantly, the paths of directories to process using which detection, correction, and reporting templates. 
- Strictly enforce the two-phase processing model (initial batch, then watch mode) to prevent infinite loops.
- Centralize all template definitions and ensure versioning.
- Implement a robust ReportingService (if not already) that handles all report writing, using a markdown template as above.
  - If possible, try to reference or import from standardardized reporting templates.  If none exists, do not create it within the observer or detection templates. Instead, search for ask where reporting templates are being maintained. 

### Phase 2: Extensibility & Registry
- Modularize content processors (citations, OpenGraph, etc.) so new ones can be plugged in via template config.
- Ensure the citation registry and any future registries are single sources of truth, updated atomically, and referenced in reports.
- Add cross-file validation (e.g., duplicate UUIDs, missing registry entries).

### Phase 3: Developer & Author Experience
- Create a CLI or dashboard for running observer tasks, viewing reports, and managing templates.
- Add hooks for pre-commit or CI validation using the observer.
- Provide clear, actionable feedback in both logs and reports for content authors (e.g., how to fix validation errors).

---

## 5. Conventions & Best Practices

- **File/Function Naming:** All observer-related files and functions should be named for clarity (e.g., `addMissingRequiredFields`, `processCitationsInFile`).
- **Directory Structure:** All observer code lives in `tidyverse/observers/` with clear subfolders for templates, services, and utils.
- **Template Versioning:** Each template should specify a version and be referenced in reports for traceability.
- **Error Handling:** All errors, warnings, and changes -- even unintentional -- must be caught and logged, never silently swallowed. Reports should include a section for errors encountered, warnings, and changes.
- **DRY Principle:** Utilities (e.g., date formatting, YAML generation) must be single-source-of-truth and imported everywhere needed.

---

## 6. Open Questions & Next Steps

- How do we assure that any AI Code Assistant or developer consultant uses our existing templates, functions, utilities, patterns and conventions?  How do we prevent runaway code bloat? 
- How can we implement an out of the box test suite for observers, such as Vitest?  
- Should we autogenerate a test content library with files that will be processed, thus having a standardized way of assessing observer behavior? 
- Is there a low-commitment, low-maintenance way for users/developers to work through any edge cases or scenarios that require user-input? 
- How do we ensure the observer NEVER EVER EVER makes unintential changes that are not immediately recorded, and thus challenging to restore? 

---

## 7. References
- [Use Filesystem Observer to Assert Frontmatter Updated](../lost-in-public/prompts/data-integrity/Use-Filesystem-Observer-to-Assert-Frontmatter-Updated.md)
- [Refactored Citations Observer](../lost-in-public/prompts/data-integrity/Refactored-Citations-Observer.md)
- [Handle Citations in Markdown Content](../lost-in-public/prompts/render-logic/Handle-Citations-Logic-and-Render-Citations-Component.md)
- [Cases and Corrections for YAML Content Wide](Cases-and-Corrections-for-YAML-Content-Wide.md)
- [Create a Content Registry for Markdown Files](Create-a-Content-Registry-for-Markdown-Files.md)

---

# End of Product Management Section

---

# Implementation Details & Developer Reference

## 1. Template Definition Example

**Source:** `tidyverse/observers/templates/tooling.ts` and `citations.ts`

```typescript
// tooling.ts (abridged for clarity)
const toolingTemplate: MetadataTemplate = {
  id: 'tooling',
  name: 'Tooling Document',
  appliesTo: { directories: ['content/tooling/**/*'] },
  required: {
    site_uuid: {
      type: 'string',
      description: 'Unique identifier for the tool/service',
      validation: (value) => typeof value === 'string' && value.length > 0,
      defaultValueFn: () => generateUUID()
    },
    tags: {
      type: 'array',
      description: 'Categorization tags',
      validation: (value) => Array.isArray(value) && value.length > 0,
      defaultValueFn: (filePath: string) => { /* ... */ }
    },
    date_created: {
      type: 'date',
      description: 'Creation date',
      defaultValueFn: (filePath: string) => getFileCreationDate(filePath)
    },
    date_modified: {
      type: 'date',
      description: 'Last modification date',
      defaultValueFn: () => getCurrentDate()
    }
  },
  optional: {
    url: { type: 'string', description: 'Official website URL', validation: (value) => typeof value === 'string' && value.startsWith('http') },
    // ... other optional fields
  }
};
```

**Content Processing Example** (`citations.ts`):
```typescript
export const citationsTemplate: MetadataTemplate = {
  id: 'citations',
  appliesTo: { directories: ['content/lost-in-public/prompts/**/*', 'content/specs/**/*'] },
  citationConfig: { registryPath: 'site/src/content/citations/citation-registry.json', hexLength: 6 },
  contentProcessing: {
    enabled: true,
    processor: async (content: string, filePath: string) => {
      return await processCitations(content, filePath, citationsTemplate.citationConfig);
    }
  }
};
```

---

## 2. ReportingService API Contract

**Source:** `tidyverse/observers/services/reportingService.ts`  
**Reference:** `content/lost-in-public/prompts/workflow/Maintain-Consistent-Reporting-Templates.md`

### Main Methods (TypeScript signatures):

```typescript
class ReportingService {
  constructor(baseDir: string);

  logConversion(file: string, fromKey: string, toKey: string): void;
  logValidation(file: string, result: ValidationResult): void;
  logOpenGraphProcessing(filePath: string, status: 'success' | 'failure' | 'skipped'): void;
  logScreenshotProcessing(filePath: string, status: 'success' | 'failure'): void;
  logCitationConversion(filePath: string, count: number): void;
  logFieldAdded(file: string, field: string, value: any): void;
  hasProcessedFiles(): boolean;
  resetStats(): void;

  generateReport(): string | null;
  writeReport(): Promise<string | null>;
}
```

**How to Use:**
- Log every mutation, validation, and service action with the appropriate method.
- Call `generateReport()` to get the markdown report as a string.
- Call `writeReport()` to persist the report and reset stats.
- All errors during report generation/writing are caught and logged.

**Flush Timing:**  
Flush (write) after major batch operations, on shutdown, or at periodic intervals (e.g., every 5 minutes).

---

## 3. FileSystemObserver Event Flow

**Checklist for Each File Event:**

1. **Assure Metadata**
   - Parse frontmatter.
   - Validate against the template.
   - Add missing required fields with default values.
   - Log all conversions and additions.

2. **Preprocess Markdown**
   - Apply any custom preprocessing for markdown “flavors” not handled by remark/unified (e.g., citations, custom code blocks).
   - Transform content ahead of time so the AST and downstream renderers can process it safely.

3. **AST Creation & Rendering**
   - Parse markdown to AST.
   - Apply remark/unified plugins in the correct order.
   - Ensure all custom transformations are injected into the AST before rendering to HTML.

4. **Registry Updates**
   - If citations or other registries are involved, update the registry (e.g., JSON file) atomically.
   - Log registry changes in the report.

5. **Error Handling**
   - If the file is malformed, log the error, skip destructive changes, and report the issue.
   - If a template is missing, log a warning and skip processing.
   - If a registry update fails, log the error and roll back changes if possible.

---

## 4. Registry Update Example

**Citation Registry Example:**  
`site/src/content/citations/citation-registry.json`
```json
{
  "sources": {
    "hex123abc": {
      "title": "Some Book",
      "author": "Author Name",
      "year": 2022,
      "url": "https://example.com"
    }
  },
  "citations": {
    "file/path/to/doc.md": [
      { "hex": "hex123abc", "context": "Used in section 2" }
    ]
  }
}
```

**TypeScript Interface:**
```typescript
interface CitationRegistry {
  sources: Record<string, { title: string; author: string; year: number; url: string }>;
  citations: Record<string, Array<{ hex: string; context: string }>>;
}
```
- Updates are performed by the citation service and logged in the report.

---

## 5. Edge Cases & Error Handling

**Sources:**  
- `tidyverse/getKnownErrorsAndFixes.cjs`
- `content/specs/Cases-and-Corrections-for-YAML-Content-Wide.md`

**Key Patterns:**
- If frontmatter is missing required fields (e.g., `site_uuid`), attempt to auto-correct; if not possible, log and skip.
- If tags are in the wrong format, normalize or log and skip.
- If YAML is malformed (unbalanced quotes, block scalars, duplicate keys), attempt to correct using known fix functions; otherwise, log for manual intervention.
- If the registry file is locked or corrupted, log the error, skip the update, and flag for manual review.
- Never delete or overwrite user content unless the fix is idempotent and reversible.

---

## 6. Testing Expectations

**Recommendations:**
- Use **Vitest** for unit and integration testing.
- Each observer service (template validation, reporting, registry updates) should have:
  - Unit tests for all edge cases (malformed YAML, missing fields, registry errors).
  - Integration tests simulating file changes and verifying correct logging, reporting, and registry updates.
  - A “dry-run” mode to validate changes without writing to disk.
- CI should run all tests and fail on any unhandled error or regression.
- “Done” means: all required tests pass, reports are generated as expected, and no destructive changes occur on real content during dry-run.

---

## 🔥 ABSOLUTE NON-NEGOTIABLE RULE: FILESYSTEM OBSERVER MUST NEVER CORRUPT FILES

### Context
A catastrophic bug caused by the observer system resulted in the deletion or corruption of critical metadata fields (such as `url`) and the introduction of block scalar syntax and malformed strings in properties like `og_screenshot_url`. This broke downstream parsing, validation, and rendering, and risked permanent data loss.

### Rule
**UNDER NO CIRCUMSTANCES, LIFE AND DEATH, COMPANY LIVE OR DIE, SHOULD OUR OBSERVER OPERATIONS CORRUPT OUR FILES.**

- The observer must NEVER:
  - Delete or overwrite existing required fields (e.g., `url`) unless explicitly instructed and validated.
  - Replace valid URLs with screenshot URLs or any other data.
  - Use block scalar syntax (`>-` or `|-`) for any URL or screenshot fields.
  - Split or wrap URLs in a way that breaks YAML parsing or downstream processing.
  - Produce malformed YAML of any kind.
- All observer operations must be atomic, non-destructive, and fully validated before writing to disk.
- Any operation that would result in the loss or corruption of a field must be aborted and logged as a critical error.
- All changes must be validated against a schema before being committed.
- If any operation fails validation, the file must be left untouched and the error reported.

### Examples of Catastrophic Failure
```yaml
# ❌ BAD (corrupted)
url: >-
https: //og-screenshots-prod.s3.amazonaws.com/1920x1080/80/false/1c9130e65f488a59a8a4b45dddd2a47e645d778065e48ba904c49e612c16bd37.jpeg
og_screenshot_url: >-

# ✅ GOOD
url: "https://www.intel.com/arc"
og_screenshot_url: "https://og-screenshots-prod.s3.amazonaws.com/1920x1080/80/false/1c9130e65f488a59a8a4b45dddd2a47e645d778065e48ba904c49e612c16bd37.jpeg"
```

### Implementation Requirements
- The observer must always read, validate, and preserve existing field values unless a new value is explicitly and validly provided.
- All YAML output must be validated for correctness (no block scalar, no broken lines, no accidental whitespace or splitting).
- If the observer cannot guarantee atomic, schema-valid, non-destructive output, it must NOT write to disk.
- All destructive or overwriting actions must be logged and require explicit user approval.

---

## Next Steps

- Integrate these examples and checklists into the specification (done here).
- Review with developers for feedback and further clarifications.

---
