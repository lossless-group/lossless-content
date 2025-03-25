const fs = require('fs').promises;
const path = require('path');

/**
 * Add frontmatter to a report file if it doesn't already have it
 */
async function addFrontmatterToReport(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        
        // Skip if file already has frontmatter
        if (content.startsWith('---\n')) {
            return {
                success: true,
                modified: false,
                file: filePath,
                reason: 'Already has frontmatter'
            };
        }

        // Extract info from filename and content
        const filename = path.basename(filePath);
        const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
        const date = dateMatch ? dateMatch[1] : '2025-03-24';
        
        // Extract report type from filename
        let reportType = '';
        if (filename.includes('frontmatter-fix')) {
            reportType = 'Frontmatter Fix Report';
        } else if (filename.includes('quote-fixes')) {
            reportType = 'Quote Fixes Report';
        } else if (filename.includes('property-fix')) {
            reportType = 'Property Fix Report';
        } else if (filename.includes('backlink-quotes')) {
            reportType = 'Backlink Quotes Report';
        }

        // Create frontmatter
        const frontmatter = `---
title: '${reportType}'
datetime: ${date}T00:00:00.000Z
authors:
  - AI Code Assistant
on_behalf_of: Michael Staton
augmented_with: 'Claude 3.5 Sonnet on Windsurf IDE'
category: Content-Processing
tags:
  - Content-Processing
  - YAML
  - Frontmatter
  - Automation
  - Reports
---

`;

        // Add frontmatter to content
        const newContent = frontmatter + content;
        await fs.writeFile(filePath, newContent);

        return {
            success: true,
            modified: true,
            file: filePath
        };

    } catch (error) {
        return {
            success: false,
            error: error.message,
            file: filePath
        };
    }
}

async function processReports(reportsDir) {
    const results = [];
    
    try {
        const files = await fs.readdir(reportsDir);
        
        for (const file of files) {
            if (path.extname(file) === '.md') {
                const filePath = path.join(reportsDir, file);
                console.log(`Processing ${file}...`);
                const result = await addFrontmatterToReport(filePath);
                results.push(result);
            }
        }

        // Print summary
        console.log('\nSummary:');
        console.log(`Total files processed: ${results.length}`);
        console.log(`Files modified: ${results.filter(r => r.modified).length}`);
        console.log(`Files skipped: ${results.filter(r => !r.modified && r.success).length}`);
        console.log(`Files with errors: ${results.filter(r => !r.success).length}`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Run the script
const reportsDir = path.join(__dirname, 'reports');
processReports(reportsDir);
