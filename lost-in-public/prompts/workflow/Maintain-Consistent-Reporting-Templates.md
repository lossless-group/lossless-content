---
date_created: 2025-02-28
date_modified: 2025-04-12
title: Maintain Consistent Reporting Templates
lede: Brief description of the prompt functionality and purpose
date_authored_initial_draft: 2025-04-10
date_authored_current_draft: 2025-04-10
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
tags:
  - Workflow
authors:
  - Michael Staton
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