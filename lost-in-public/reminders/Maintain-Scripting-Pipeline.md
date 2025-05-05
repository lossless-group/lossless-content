---


title: 'Maintain a Scripting Pipeline'
lede: 'Design modular pipelines to detect, clean, and report on markdown files—ensuring every content workflow is robust, maintainable, and auditable.'
date_authored_initial_draft: 2025-03-26
date_authored_current_draft: 2025-03-26
date_authored_final_draft: null
date_first_published: null
at_semantic_version: 0.0.0.1
status: In-Progress
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: RAG-Input
image_prompt: 'A digital assembly line of scripts, each module passing markdown files through cleaning, detection, and reporting stations—glowing with automation and order.'
date_created: 2025-03-26
date_modified: 2025-04-22
site_uuid: 33265b85-8890-4f38-b0cc-671cbf40fc80
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_portrait_image_Maintain-Scripting-Pipeline_4b24bfc6-5950-4a2e-a34e-637d072df077_MQf15Ciy5.webp
tags: [Script-Pipeline, Data-Cleaning, Tidy-Data, Markdown-Processing, Node-Scripts]
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_banner_image_Maintain-Scripting-Pipeline_5a991106-1491-4555-9e46-5f1548a54c84_SRLVoZukD.webp


---
# Creating a Modular Script Pipeline

## Pipeline Structure
Every script pipeline should follow this three-stage pattern:
```
detect -> clean -> report
```

## Stage 1: Detection (`detect<Issue>.cjs`)
Purpose: Find files with issues that need fixing.

### Template:
```javascript
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    targetDir: process.argv[2] || path.join(__dirname, '../../../../content/<target-dir>'),
    includePatterns: ['**/*.md'],
    excludeDirs: ['node_modules', '.git', 'dist']
};

/**
 * Process a single markdown file
 * @param {string} filePath - Path to the markdown file
 * @returns {Promise<Object>} Result of processing
 */
async function processMarkdownFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    // Add detection logic here
    // Return null if no issues, or object with issue details
}

/**
 * Find all markdown files in a directory
 * @param {string} dir - Directory to search
 * @returns {Promise<string[]>} List of markdown file paths
 */
async function findMarkdownFiles(dir) {
    const markdownFiles = [];
    const files = await fs.readdir(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory() && !CONFIG.excludeDirs.includes(file)) {
            const nestedFiles = await findMarkdownFiles(fullPath);
            markdownFiles.push(...nestedFiles);
        } else if (file.endsWith('.md')) {
            markdownFiles.push(fullPath);
        }
    }
    return markdownFiles;
}

/**
 * Main detection function
 * @param {string} targetDir - Directory to process
 * @returns {Promise<Object>} Detection results
 */
async function detect(targetDir) {
    const files = await findMarkdownFiles(targetDir);
    const results = [];
    
    for (const file of files) {
        const result = await processMarkdownFile(file);
        if (result) results.push(result);
    }

    return {
        totalFiles: files.length,
        irregularFiles: results
    };
}

module.exports = { detect };
```

## Stage 2: Cleaning (`clean<Issue>.cjs`)
Purpose: Fix the issues found in detection stage.

### Template:
```javascript
const fs = require('fs').promises;
const path = require('path');

/**
 * Clean a single file
 * @param {string} filePath - Path to the file to clean
 * @param {Object} config - Configuration options
 * @returns {Promise<Object>} Result of cleaning
 */
async function cleanFile(filePath, config) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        // Add cleaning logic here
        
        if (modified) {
            // Create backup if configured
            if (config.createBackups) {
                const backupPath = filePath + '.bak';
                await fs.writeFile(backupPath, content);
            }
            
            // Write cleaned content
            await fs.writeFile(filePath, newContent);
        }
        
        return {
            file: filePath,
            modified,
            backupCreated: modified && config.createBackups
        };
    } catch (error) {
        console.error('Error cleaning file:', filePath, error);
        return {
            file: filePath,
            modified: false,
            error: error.message
        };
    }
}

/**
 * Clean multiple files
 * @param {string[]} filePaths - Paths to files to clean
 * @param {Object} config - Configuration options
 * @returns {Promise<Object[]>} Results of cleaning
 */
async function cleanAll(filePaths, config) {
    const results = [];
    
    for (const filePath of filePaths) {
        try {
            const result = await cleanFile(filePath, config);
            results.push(result);
        } catch (error) {
            console.error('Error cleaning file:', filePath, error);
            results.push({
                file: filePath,
                modified: false,
                error: error.message
            });
        }
    }
    
    return results;
}

module.exports = { cleanAll };
```

## Stage 3: Reporting (`report<Issue>.cjs`)
Purpose: Generate detailed reports of what was found and fixed.

### Template:
```javascript
const fs = require('fs').promises;
const path = require('path');

/**
 * Generate report from results
 * @param {Object} data - Data to include in the report
 * @returns {Promise<string>} Report file path
 */
async function generateReport(data) {
    const date = new Date().toISOString().split('T')[0];
    const reportsDir = path.join(__dirname, '../../../../content/reports');
    const reportPath = path.join(reportsDir, `${date}_report_${data.reportIndex || '01'}.md`);
    
    let report = `---
title: Issue Cleaning Report
date_created: ${new Date().toISOString()}
category: Reports
tags:
  - Data-Cleaning
  - Scripts
  - Automation
---

# Issue Cleaning Report

## Summary
- Total files processed: ${data.totalFiles}
- Files with irregularities: ${data.irregularFiles.length}
- Files cleaned: ${data.cleanedFiles || 0}

## Detection Results\n`;

    data.irregularFiles.forEach((file) => {
        report += `### [[${file.file}]]\n`;
        report += `* Line ${file.lineNumber}: \`${file.line}\`\n`;
        report += `* Issues: ${file.issues.join(', ')}\n\n`;
    });

    // Create reports directory if it doesn't exist
    await fs.mkdir(reportsDir, { recursive: true });
    await fs.writeFile(reportPath, report);
    
    return reportPath;
}

module.exports = { generateReport };
```

## Main Runner (`run<Pipeline>.cjs`)
Purpose: Orchestrate the pipeline stages.

### Template:
```javascript
const path = require('path');
const { detect } = require('./detect<Issue>.cjs');
const { cleanAll } = require('./clean<Issue>.cjs');
const { generateReport } = require('./report<Issue>.cjs');

// Configuration
const CONFIG = {
    targetDir: process.argv[2] || path.join(__dirname, '../../../../content/<target-dir>'),
    createBackups: true
};

async function main() {
    console.log('Starting pipeline...');
    console.log('Target directory:', CONFIG.targetDir);
    
    console.log('\n1. Detecting issues...');
    const detectionResults = await detect(CONFIG.targetDir);
    console.log(`Found ${detectionResults.irregularFiles.length} files with issues.`);
    
    console.log('\n2. Cleaning files...');
    const cleaningResults = await cleanAll(
        detectionResults.irregularFiles.map(r => r.file),
        CONFIG
    );
    
    console.log('\n3. Generating reports...');
    const reportPath = await generateReport({
        ...detectionResults,
        cleanedFiles: cleaningResults.filter(r => r.modified).length
    });
    console.log('Report generated:', reportPath);
    
    console.log('\nPipeline complete!');
    console.log(`Total files processed: ${detectionResults.totalFiles}`);
    console.log(`Files cleaned: ${cleaningResults.filter(r => r.modified).length}`);
}

main().catch(console.error);
```

## Example Use Cases
1. **Tag Cleaning**: Standardize YAML frontmatter tags
2. **Link Validation**: Check and fix internal markdown links
3. **Frontmatter Validation**: Ensure required fields exist
4. **Image Reference Cleanup**: Fix broken image paths
5. **Code Block Formatting**: Standardize code block syntax

## Best Practices
1. **Modularity**: Keep each stage separate and focused
2. **Error Handling**: Gracefully handle file system errors
3. **Backups**: Always create backups before modifying files
4. **Reporting**: Generate detailed, well-formatted reports
5. **Configuration**: Make paths and options configurable