---
date_created: 2025-04-16
date_modified: 2025-04-22
title: Maintain Consistent Reporting Templates
lede: "Build trust and clarity with consistent, reusable reporting templates that make every audit, fix, and automation step transparent and repeatable."
date_authored_initial_draft: 2025-04-10
date_authored_current_draft: 2025-04-10
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
image_prompt: "A dashboard of reporting templates, each with structured tables, summary cards, and visual checkmarks, all glowing with clarity and order in a digital workspace."
site_uuid: b8994593-83f1-4adb-accb-c475b6a70e4b
tags: [Workflow]
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/H6gFujGhdHfc78opUSEH-kV7DgHW6kachmSU1cu11OY/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/853bc931-9e5c-4299-9e1b-b139b1bd4cc8
banner_image: https://img.recraft.ai/BBfZveiUJE7yX3ukYbvXipqkavYYPaH7JdXS-vhh3Xc/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/d8dd5569-ec14-4483-bb3b-7290ed69b0a7
---

### Single Operation Process Report

```javascript
const fs = require('fs');
const path = require('path');

// ============================================================================
// Single Issue resolution reporting section
// ============================================================================

const singleIssueReportTemplate =
```markdown
---
title: ${errorCase.reportName}
date: ${today.format("YYYY-MM-DD")}
backLinkWithPath = \`"[[${filePath.firstLetterCapitalized}/${basename}]]\`
---

## Summary of Files Processed
Files processed: ${filesProcessed}
Total Files with detected YAML inconcsistency: ${namesOfFilesWithIssue.length}

Open Graph data fetches:
- Skipped bc YAML inconcsistency: ${stats.openGraph.updatedThisRun}
- Skipped bc prior Open Graph Data ${stats.openGraph.properOpenGraphDataFound}
- New Successes: ${stats.openGraph.newSuccessesThisRun}
- New Errors: ${stats.openGraph.newErrrorsThisRun}


### Files with Issues that were skipped completely
${namesOfFilesWithIssue.map(file => `[[${path.basename(file, '.md')}]]`).join(', ')}

### Files that have new open graph data 
${namesOfFilesWithNewOpenGraphData.map(file => `[[${path.basename(file, '.md')}]]`).join(', ')}

### Files that have a newscreenshot
${namesOfFilesWithNewScreenshot.map(file => `[[${path.basename(file, '.md')}]]`).join(', ')}

### Files that OpenGraphIo returned an error for core og data:
${namesOfFilesWithResponseErrors.map(file => `[[${path.basename(file, '.md')}]]`).join(', ')}

### Files that OpenGraphIo returned an error for screenshot:
${namesOfFilesWithErrorOnScreenshot.map(file => `[[${path.basename(file, '.md')}]]`).join(', ')}

`;

```