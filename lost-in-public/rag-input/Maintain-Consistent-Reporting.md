---
date_created: 2025-03-26
date_modified: 2025-04-15
---
# Reports always always ALWAYS ALWAYS go in the following directory:
`content/reports/`

## Mandatory Utilities

All scripts within `tidyverse/tidy-up` MUST utilize centralized utility modules for consistency and maintainability:

1.  **Path Management (`tidyverse/tidy-up/utils/constants.cjs`):**
    *   This module (to be created) will define and export essential **absolute** path constants.
    *   Key constants include: `MONOREPO_ROOT`, `CONTENT_ROOT`, `REPORTS_DIR`, `CONTENT_TOOLING_DIR`, `ASSETS_SRC_DIR`.
    *   Scripts **MUST** import and use these constants for accessing any file or directory outside their own immediate location.
    *   **CRITICAL:** The use of `__dirname`, `process.cwd()`, or hardcoded relative paths (e.g., `../content`, `src/assets`) for cross-directory access is **STRICTLY FORBIDDEN**.

2.  **Reporting Functions (`tidyverse/tidy-up/utils/reportUtils.cjs`):**
    *   This module (to be created) will provide standardized reporting functions.
    *   Key functions include:
        *   `formatRelativePath(absoluteFilePath)`: Takes an absolute path and returns the plain text path relative to `CONTENT_ROOT` (e.g., `tooling/AI-Toolkit/Models/Dolphin.md`). This is MANDATORY for listing files in reports.
        *   `writeReport(reportContent, reportNamePrefix)`: Takes the report markdown string and a base name, generates a timestamped filename, ensures `REPORTS_DIR` exists, and writes the report to the correct location (`content/reports/`).

## Mandatory Report Generation

*   **Every script** that performs checks, analysis, or modifications (including asset manipulation) **MUST** generate a Markdown report file summarizing its actions.
*   The report MUST include:
    *   A clear title and date.
    *   Summary statistics (e.g., files scanned, files modified, errors encountered).
    *   Detailed lists of affected files or specific findings.
*   The report **MUST** be written to the standard `REPORTS_DIR` using the `writeReport` utility function.
*   Console logging is acceptable for real-time progress updates but **DOES NOT** replace the mandatory report file.

## File Listing Format in Reports

*   When listing files within a report:
    * **ALWAYS** check to see if there are any syntax or casing modifcations needed to the paths or filenames.  There will be cases where in order for the content team to use Obsidian backlinks to accurately navigate to the files, some modifications may be needed. (e.g. `tooling/AI-Toolkit/Some-File.md` MAY need to become `Tooling/AI Toolkit/Some-File.md`)
    *   **MUST** use Obsidian backlink syntax, formatted as:
        `[[relative/path/to/File-Name-for-Backlink.md|File Name for Backlink]]`
        - The link target is the relative path from the `content/` directory (e.g., `tooling/AI-Toolkit/Some-File.md`).
        - The link text is the file name, with dashes replaced by spaces, extension removed, and title case (e.g., `Some File`).
    *   **MUST** list backlinks in comma-separated paragraphs, not as bullet lists or headers.
    *   **MUST NOT** use Markdown header syntax (e.g., `### tooling/AI-Toolkit/Some-File.md`).
    *   **MUST NOT** use plain text paths as the primary format (plain text may be included for compatibility, but the canonical format is the backlink).

    **Example:**
    ```markdown
    [[tooling/AI-Toolkit/Some-File.md|Some File]], [[vocabulary/Example-File.md|Example File]], [[tooling/Another-Example.md|Another Example]]
    ```

## Observer and Pipeline Logging & Reporting Standard

### Conditional Console Logging
- All scripts and observer steps must keep all `console.log` statements in the codebase for stepwise debugging and traceability.
- Logging must be controlled by user-configurable flags (e.g., `services.logging` in config), allowing per-step and per-directory toggling without code deletion.
- Example:
  ```typescript
  services: {
    logging: {
      addSiteUUID: true,
      openGraph: false
    }
  }
  if (logging?.addSiteUUID) {
    console.log('After addSiteUUID:', updatedFrontmatter);
  }
  ```
- This ensures logs can be enabled/disabled as needed for any pipeline step, supporting rapid debugging while keeping the codebase DRY and auditable.

### Reporting Service Integration
- All file mutation operations (e.g., frontmatter writes) must accept and use a `reportingService` parameter.
- The reporting service must be called with full context (file path, new frontmatter, template order, etc.) after each mutation.
- The reporting service is responsible for logging and tracking events such as YAML property reordering, frontmatter changes, and other structural mutations.
- Example:
  ```typescript
  reportingService.logFileYamlReorder({
    filePath,
    previousOrder,
    newOrder,
    changedFields
  });
  ```
- This provides a robust audit trail for all significant changes, supporting debugging, traceability, and confidence in the automation pipeline.

**These standards are mandatory for all scripts and observer/pipeline operations that mutate file metadata or structure.**

```javascript
/**
 * Generate report content
 */
function generateFixTagReport(results) {
   const timestamp = new Date().toISOString();
   let content = `---
date: 2025-03-25
datetime: ${timestamp}
authors: 
- Michael Staton
augmented_with: 'Windsurf on Claude 3.5 Sonnet'
category: Data-Integrity
from_operations: # if possible, list operation functions that were used
- fixCasingInPaths
- assertQuoteDelimitersAroundErrors
from_codefiles: # if possible, list relative paths to code files that contain operations
- /tidyverse/tidy-up/services/assertFrontmatterByTemplates.ts
- /tidyverse/tidy-up/templates/prompts.ts
tags:
- Documentation-Standards
- YAML
- Memory-Management
- Session-Logs
- Prompts
---

# Tag Irregularities Report

## Summary
- Total files processed: ${results.totalFiles}
- Files with tag irregularities: ${results.irregularFiles.length}

## Files with Tag Irregularities
${results.irregularFiles.map(item => {
  const relativePathFromContent = formatRelativePath(item.file);
  return `
### ${relativePathFromContent}
- Line: \`${item.line}\`
- Issues: ${item.issues.join(', ')}
`;
}).join('\n')}
`;

   writeReport(content, 'Tag-Irregularities-Report');
}

export default generateFixTagReport;