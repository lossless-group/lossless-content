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
    *   **MUST** use plain text paths relative to the `content/` directory (e.g., `tooling/AI-Toolkit/Some-File.md`). Use the `formatRelativePath` utility function.
    *   **MUST NOT** use Markdown header syntax (e.g., `### tooling/AI-Toolkit/Some-File.md`).
    *   **MUST NOT** use Obsidian backlink syntax (e.g., `[[tooling/AI-Toolkit/Some-File.md|Some-File]]`). Lists should be simple, plain text relative paths.

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