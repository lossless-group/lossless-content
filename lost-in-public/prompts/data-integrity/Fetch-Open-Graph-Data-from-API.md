---
title: 'Fetch Open Graph Data from API'
lede: 'Create a Node.js script to process Markdown files and fetch OpenGraph metadata and screenshots from external APIs'
date_authored_initial_draft: 2025-02-04
date_authored_current_draft: 2025-03-24
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.1'
authors: 
- Michael Staton
status: To-Prompt
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
tags:
- Open-Graph
- API-Integration
- Data-Fetching
- Data-Integrity
date_created: 2025-02-04
date_modified: 2025-03-24
---

# OpenGraph Data Fetching Script Implementation Guide

Create a Node.js script (`runFetchOpenGraphData.cjs`) that processes Markdown files to fetch and update OpenGraph metadata and screenshots. This guide provides detailed specifications for implementing a robust, error-tolerant system.

Use [[Lost in Public/prompts/workflow/Meticulous-Constraints-for-Every-Prompt|Meticulous-Constraints-for-Every-Prompt]] and [[Lost in Public/prompts/workflow/Maintain-Consistent-Reporting-Templates|Maintain-Consistent-Reporting-Templates]] for the Single Operation Process Report.

## Core Components

### 1. File System Structure
```
scripts/
  build-scripts/
    runFetchOpenGraphData.cjs       # Main script
    utils/
      addReportNamingConventions.cjs  # Report filename generation
      addReportFrontmatterTemplate.cjs # Report frontmatter formatting
```

### 2. Environment Setup
```javascript
// Required environment variables
OPEN_GRAPH_IO_API_KEY=your_api_key

// Configuration constants
const TARGET_DIR = process.env.TARGET_DIR || '../content/tooling/AI-Toolkit';
const REPORT_OUTPUT_DIR = 'src/content/data_site';
const REPORT_NAME = 'open-graph-fetch-report';
```

### 3. Core Functions

#### A. Frontmatter Management
- Use plain text parsing (NOT gray-matter) to handle frontmatter
- Extract content between `---` markers
- Preserve exact line positioning for updates
- Handle both YAML and non-YAML frontmatter gracefully

```javascript
function extractFrontmatter(content) {
  // Returns: { frontmatter: Object, content: string }
  // Preserves original formatting
}

function updateMarkdownFile(filePath, frontmatter, content) {
  // Atomic write operation
  // Maintains file permissions
}
```

#### B. OpenGraph Data Fetching
- Implement retry logic (3 attempts)
- Handle rate limits with exponential backoff
- Validate response data structure
- Strip quotes from values

```javascript
async function fetchOpenGraphData(url, filePath) {
  // Returns: Promise<{
  //   og_title: string,
  //   og_description: string,
  //   og_image: string,
  //   og_url: string,
  //   og_last_fetch: string
  // } | null>
}
```

#### C. Screenshot Fetching
- Non-blocking parallel operations
- Track in-progress fetches
- Cache results to prevent duplicates

```javascript
async function fetchScreenshotUrl(url, filePath) {
  // Returns: Promise<string | null>
  // string = screenshot URL
  // null = fetch failed
}
```

### 4. Processing Logic

#### A. Skip Conditions
Skip OpenGraph fetch if ANY of these exist:
- `image`
- `og_image`
- `og_last_error`

Skip Screenshot fetch if:
- `og_screenshot` exists

#### B. Error Handling
- Mark files with errors:
  ```yaml
  og_error: "Error message"
  og_last_fetch: "2025-03-24T05:59:57.811Z"
  ```
- Categories of errors:
  1. API errors (rate limits, timeouts)
  2. Invalid responses
  3. Missing required properties
  4. Network failures

#### C. Statistics Tracking
```javascript
const stats = {
  filesProcessed: 0,
  filesWithIssues: new Set(),
  openGraph: {
    skippedDueToYaml: 0,
    properOpenGraphDataFound: 0,
    newSuccesses: new Set(),
    newErrors: new Set()
  },
  screenshots: {
    newSuccesses: new Set(),
    errors: new Set()
  }
};
```

### 5. Report Generation

#### A. Report Structure
```markdown
---
date: 2025-03-24
datetime: 2025-03-24T05:59:57.811Z
authors: 
 - Michael Staton
augmented_with: 'Windsurf on Claude 3.5 Sonnet'
category: Data-Augmentation
tags:
- Data-Augmentation
- OpenGraph
- Automation
- Content-Processing
---

## Summary of Files Processed
Files processed: <count>
Total Files with issues: <count>

Open Graph data fetches:
- Skipped bc YAML inconsistency: <count>
- Skipped bc prior Open Graph Data: <count>
- New Open Graph data: <count>
- New Screenshots: <count>
- New Errors: <count>

### Files with Issues that were skipped completely
[[path/to/file1]], [[path/to/file2]]

### Files that have new open graph data 
[[path/to/file3]], [[path/to/file4]]

### Files that have a new screenshot
[[path/to/file5]], [[path/to/file6]]

### Files that OpenGraphIo returned an error for core og data:
[[path/to/file7]]

### Files that OpenGraphIo returned an error for screenshot:
[[path/to/file8]]
```

#### B. Report Naming Convention
Format: `YYYY-MM-DD_reportName_runIndex.md`
Example: `2025-03-24_open-graph-fetch-report_07.md`

### 6. Implementation Notes

1. **File Safety**
   - Use atomic write operations
   - Verify file existence before operations
   - Maintain proper file permissions
   - Handle concurrent access gracefully

2. **Performance**
   - Process files in parallel
   - Implement request throttling
   - Cache API responses when possible
   - Track memory usage for large directories

3. **Logging**
   - Use emoji indicators for visibility:
     - ✅ Success
     - ⚠️ Warning
     - ❌ Error
   - Include file names in all log messages
   - Log both to console and report

4. **Dependencies**
   - Node.js built-ins: fs, path
   - External: dotenv (for API key)
   - Custom utils: addReportNamingConventions.cjs, addReportFrontmatterTemplate.cjs

This implementation provides a robust, maintainable solution for fetching and managing OpenGraph data across a collection of Markdown files.