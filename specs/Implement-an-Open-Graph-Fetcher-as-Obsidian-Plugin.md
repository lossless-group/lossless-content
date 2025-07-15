---
title: Implement an OpenGraph fetcher as an Obsidian Plugin
lede: Open Graph APIs can come in a number of flavors, here we use OpenGraph.io to return the objects.
date_authored_initial_draft: 2025-07-15
date_authored_current_draft: 2025-07-15
date_authored_final_draft: 
date_first_published: 
date_last_updated: 2025-07-15
at_semantic_version: 0.0.0.3
status: Iterating
augmented_with: Windsurf Cascade on SWE-1
category: Content-Management
publish: true
date_created: 2025-03-12
date_modified: 2025-07-15
site_uuid: c4f72e37-bb5b-4f21-b8a7-93c3fc99a89f
tags: [Frontmatter, OpenGraph]
authors:
  - Michael Staton
image_prompt: A robot representing API calls is fishing off a boat. There are several fishing poles that have been cast onto a large representation of a web browser.  The web browser has a web page loaded with headers and images. The fishing lines are hooked into images and text and are pulling copies of them off the web browser page and towards the boat.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_banner_image_Build-Script-Spec_39259b0d-6bed-4157-baf7-53c35deebb35_rr5hYOulP.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_portrait_image_Build-Script-Spec_21af46f2-dd20-45e5-86da-c0815542f01e_e1OL2d6mN.webp
---
# Objective

Implement our work that fetches OpenGraph.io into a dedicated [[Tooling/Productivity/Obsidian|Obsidian]] plugin. 

The plugin has the working name "Open Graph Fetcher" or `open-graph-fetcher` and can be found on GitHub at [open-graph-fetcher-obsidian-plugin](https://github.com/lossless-group/open-graph-fetcher-obsidian-plugin/) with the development branch being most active. From the [lossless-monorepo](https://github.com/lossless-group/lossless-monorepo) it can be found as a submodule. 

### Working Directory
- The relative path from the lossless-monorepo is `open-graph-fetcher`
- The absolute path is on mps' mac is `/Users/mpstaton/code/lossless-monorepo/open-graph-fetcher`

***

# Background

We have implemented this as a script several times, then ported it to a filesystem observer system and we have it working.  It runs on a full directory and iterates recursively through that directory. It can be found at:

`tidyverse/observers/scripts/test-opengraph.ts`
`tidyverse/observers/services/openGraphService.ts`
`tidyverse/observers/templates/tooling.ts`
`tidyverse/observers/watchers/toolkitWatcher.ts`


# Task at Hand

### 1st Prompt 

Review the files above, and then write your analysis of the key functionality and crucial functions into this file under the below header entitled "Analysis of OpenGraph fetching in the Observer System"
## Analysis of OpenGraph fetching in the Observer System

### Architecture Overview
The OpenGraph fetching functionality is integrated into the observer system through a modular architecture:

1. **Core Services**
   - `openGraphService.ts`: Manages OpenGraph metadata fetching
   - `reportingService.ts`: Handles statistics and error reporting
   - `templateRegistry.ts`: Manages frontmatter templates

2. **Key Components**
   - **OpenGraph Service**:
     - Implements single source of truth for OpenGraph fields (OG_FIELDS)
     - Handles API integration with OpenGraph.io
     - Manages retry logic and error handling
     - Normalizes OpenGraph data before storage

   - **File Watcher**:
     - Uses chokidar for file system monitoring
     - Watches for add/change events
     - Processes files only if they contain frontmatter
     - Maintains file state tracking

### Implementation Details

1. **Smart Processing Decisions**
   - Uses `needsOpenGraph()` to determine if processing is needed
   - Checks for existing og_last_fetch timestamp
   - Verifies presence and correctness of all required fields
   - Prevents unnecessary API calls

2. **Data Normalization**
   - Standardizes OpenGraph field handling
   - Converts nested objects to primitives
   - Handles arrays of objects with 'url' properties
   - Strips quotes and trims strings

3. **Error Handling**
   - Implements retry logic with exponential backoff
   - Records errors in frontmatter
   - Maintains processing statistics
   - Graceful degradation for missing fields

4. **Performance Optimizations**
   - Only processes Markdown files (.md)
   - Uses awaitWriteFinish to prevent race conditions
   - Implements file state tracking
   - Skips processing for files with valid metadata

### Integration Points

1. **Frontmatter Processing**
   - Uses custom YAML parser (not gray-matter)
   - Maintains exact line positioning
   - Preserves original formatting
   - Handles both YAML and non-YAML frontmatter

2. **File System Integration**
   - Uses fs-extra for file operations
   - Implements atomic write operations
   - Maintains file permissions
   - Handles recursive directory scanning

### Key Features

1. **Smart Skipping Logic**
   - Skips files with valid OpenGraph data
   - Skips files with recent fetch timestamps
   - Prevents infinite processing loops

2. **Data Integrity**
   - Validates all OpenGraph fields
   - Ensures proper field normalization
   - Maintains consistent data structure
   - Preserves original file content

3. **Reporting**
   - Tracks processing statistics
   - Records errors and failures
   - Maintains processing history
   - Provides detailed reporting

This implementation follows the project's established patterns for observer-based processing while adding specific functionality for OpenGraph metadata fetching and normalization. The system is designed to be robust, efficient, and maintainable while providing comprehensive error handling and reporting capabilities.

## 2nd Prompt: Plan the Obsidian Plugin

### Desired Functionality

1. **Settings Management**
   - [ ] Settings Section similar to `content-farm/main.ts` where the user can configure:
     - [ ] OpenGraph API Key (stored securely in Obsidian's vault)
     - [ ] Base URL for OpenGraph.io API (configurable for different environments)
     - [ ] Retry settings (number of attempts, backoff delay)
     - [ ] Rate limiting configuration
     - [ ] Cache duration settings

2. **Modal Interface**
   - [ ] OpenGraph Fetch Modal with:
     - [ ] Checkbox: "Overwrite Existing Open Graph YAML properties?"
     - [ ] Checkbox: "Create new YAML properties if none exists?"
     - [ ] Checkbox: "Write any returned Errors into YAML?"
     - [ ] Checkbox: "Write or Overwrite date for This Fetch?"
     - [ ] Button: "Fetch Open Graph Data"
     - [ ] Button: "Fetch Screenshot"
     - [ ] Progress indicator for fetch operations
     - [ ] Status message area for feedback

3. **Command Implementation**
   - [ ] Register a Command called "Fetch Open Graph Data" that:
     - [ ] Opens the OpenGraph Fetch Modal
     - [ ] Button: "Fetch Open Graph Data"
       - [ ] Fetches Open Graph Data from OpenGraph.io using URL from YAML frontmatter
       - [ ] Reviews modal settings and performs accordingly
       - [ ] Handles errors gracefully and displays feedback
     - [ ] Button: "Fetch Open Graph Screenshot"
       - [ ] Uses OpenGraph.io screenshot API
       - [ ] Handles screenshot errors separately from metadata errors

### Implementation Details

1. **File Structure**
   ```typescript
   src/
     main.ts            // Plugin entry point
     settings.ts        // Settings management
     modal.ts          // OpenGraph Fetch Modal
     services/
       openGraph.ts    // OpenGraph API integration
       screenshot.ts   // Screenshot fetching
     types.ts          // TypeScript interfaces
     utils.ts          // Helper functions
   ```

2. **Key Components**

   a. **Settings Management**
   ```typescript
   class OpenGraphPluginSettings {
     apiKey: string;
     baseUrl: string;
     retries: number;
     backoffDelay: number;
     rateLimit: number;
     cacheDuration: number;
   }
   ```

   b. **OpenGraph Service**
   ```typescript
   class OpenGraphService {
     private readonly apiKey: string;
     private readonly baseUrl: string;
     
     async fetchMetadata(url: string): Promise<OpenGraphData>;
     async fetchScreenshot(url: string): Promise<string | null>;
   }
   ```

   c. **Modal Implementation**
   ```typescript
   class OpenGraphFetchModal extends Modal {
     private settings: OpenGraphPluginSettings;
     private options: {
       overwriteExisting: boolean;
       createNew: boolean;
       writeErrors: boolean;
       updateFetchDate: boolean;
     };
     
     async fetchOpenGraph(): Promise<void>;
     async fetchScreenshot(): Promise<void>;
   }
   ```

3. **Error Handling**
   - Implement proper error boundaries
   - Handle API rate limits
   - Provide user-friendly error messages
   - Log errors without exposing sensitive information

4. **Performance Optimizations**
   - Implement caching for API responses
   - Use debouncing for rapid fetch attempts
   - Handle large files efficiently
   - Implement progress indicators

# Previous Script Implementation

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