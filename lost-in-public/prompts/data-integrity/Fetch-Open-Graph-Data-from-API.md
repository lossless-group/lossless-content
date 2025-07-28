---
title: Fetch Open Graph Data from API
lede: Create a Node.js script to process Markdown files and fetch OpenGraph metadata and screenshots from external APIs
date_authored_initial_draft: 2025-02-03
date_authored_current_draft: 2025-03-23
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-07-28
image_prompt: A developer interacting with an API dashboard to fetch Open Graph data, with code snippets, network request icons, and browser previews of enriched link cards. The scene emphasizes data flow, connectivity, and real-time web enhancement.
site_uuid: 0d30049e-c655-41e8-a112-6a84a1854f0b
tags: [Open-Graph, Data-Fetching, Data-Integrity, API-Integrations]
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/data-integrity/2025-05-04_portrait_image_Fetch-Open-Graph-Data-from-API_1ab9e2fe-bba5-4fd9-82a6-10cd1ca7f476_t1wAc0GSL.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/data-integrity/2025-05-04_banner_image_Fetch-Open-Graph-Data-from-API_fa90bf77-d22e-4442-83db-b335df58b5c0_nnI62qd-t.webp
---
# OpenGraph Data Fetching Script Implementation Guide

Create a Node.js script (`runFetchOpenGraphData.cjs`) that processes Markdown files to fetch and update OpenGraph metadata and screenshots. This guide provides detailed specifications for implementing a robust, error-tolerant system.

Use [[lost-in-public/prompts/workflow/Meticulous-Constraints-for-Every-Prompt|Meticulous-Constraints-for-Every-Prompt]] and [[lost-in-public/prompts/workflow/Maintain-Consistent-Reporting-Templates|Maintain-Consistent-Reporting-Templates]] for the Single Operation Process Report.

## Model Responses:
```json
{
  "hybridGraph": {
    "title": "Example Title",
    "description": "Example Description",
    "type": "Example Type",
    "image": "https://example.com/image.png",
    "url": "https://example.com",
    "favicon": "https://example.com/favicon.ico",
    "site_name": "Example Site Name",
    "articlePublishedTime": "2023-03-23T00:00:00.000Z",
    "articleAuthor": "https://example.com/author"
  },
  "openGraph": {
    "title": "Example Title",
    "description": "Example Description",
    "type": "Example Type",
    "image": {
      "url": "https://example.com/image.png"
    },
    "url": "https://example.com",
    "site_name": "Example Site Name",
    "articlePublishedTime": "2023-03-23T00:00:00.000Z",
    "articleAuthor": "https://example.com/author"
  },
  "htmlInferred": {
    "title": "Example Title",
    "description": "Example Description",
    "type": "Example Type",
    "image": "https://example.com/image.png",
    "url": "https://example.com",
    "favicon": "https://example.com/favicon.ico",
    "site_name": "Example Site Name",
    "images": [
      "https://example.com/image1.png",
      "https://example.com/image2.png",
      "https://example.com/image3.png",
      "https://example.com/image4.png"
    ]
  },
  "requestInfo": {
    "redirects": 1,
    "host": "https://example.com",
    "responseCode": 200,
    "cache_ok": true,
    "max_cache_age": 432000000,
    "accept_lang": "en-US,en;q=0.9",
    "url": "https://example.com",
    "full_render": false,
    "use_proxy": false,
    "use_superior" : false,
    "responseContentType": "text/html; charset=utf-8"
  },
  "accept_lang": "en-US,en;q=0.9",
  "is_cache": false,
  "url": "https://example.com"
}
```

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