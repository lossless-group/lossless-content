---
date_created: 2025-03-02
date_modified: 2025-03-24
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