#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

/**
 * Remove specific problematic lines from frontmatter:
 * 1. Lines with key 'og_screenshot:' (but NOT 'og_screenshot_url')
 * 2. Lines where the key is exactly 'http:' or 'https:'
 */
async function cleanFrontmatter(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        let modified = false;
        let inFrontmatter = false;
        let frontmatterCount = 0;
        const cleanedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();

            // Track frontmatter boundaries
            if (trimmedLine === '---') {
                frontmatterCount++;
                inFrontmatter = frontmatterCount === 1;
                cleanedLines.push(line);
                continue;
            }

            // Only process lines inside frontmatter
            if (inFrontmatter && frontmatterCount === 1) {
                // Split on first colon to get the key
                const colonIndex = line.indexOf(':');
                if (colonIndex !== -1) {
                    const key = line.substring(0, colonIndex).trim();
                    
                    // Skip lines we want to remove
                    if (key === 'og_screenshot' || // Exact match for og_screenshot
                        key === 'http' || // Exact match for http
                        key === 'https') { // Exact match for https
                        modified = true;
                        continue;
                    }
                }
            }

            cleanedLines.push(line);
        }

        if (modified) {
            await fs.writeFile(filePath, cleanedLines.join('\n'));
            return {
                success: true,
                modified: true,
                file: filePath
            };
        }

        return {
            success: true,
            modified: false,
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

async function processDirectory(directory) {
    const results = [];
    
    async function processFile(filePath) {
        if (path.extname(filePath) === '.md') {
            const result = await cleanFrontmatter(filePath);
            results.push(result);
        }
    }

    async function walk(dir) {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);
            
            if (stat.isDirectory()) {
                await walk(filePath);
            } else {
                await processFile(filePath);
            }
        }
    }

    await walk(directory);
    return results;
}

async function generateReport(results) {
    const date = new Date().toISOString().split('T')[0];
    const reportsDir = path.join(__dirname, 'reports');
    
    // Find existing reports to determine next number
    const files = await fs.readdir(reportsDir);
    const existingReports = files.filter(f => f.startsWith(`${date}_frontmatter-cleanup-report`));
    const nextNumber = existingReports.length + 1;
    
    const reportPath = path.join(reportsDir, `${date}_frontmatter-cleanup-report_${String(nextNumber).padStart(2, '0')}.md`);

    let report = '# Frontmatter Cleanup Report\n\n';
    report += '## Summary\n';
    report += `- Total files processed: ${results.length}\n`;
    report += `- Files modified: ${results.filter(r => r.modified).length}\n`;
    report += `- Files with errors: ${results.filter(r => !r.success).length}\n\n`;

    report += '## Files Modified\n';
    results
        .filter(r => r.modified)
        .forEach(r => {
            const relativePath = path.relative(__dirname, r.file);
            report += `- [[${relativePath}]] (Removed problematic frontmatter lines)\n`;
        });

    await fs.writeFile(reportPath, report);
    console.log(`Report written to: ${reportPath}`);
}

async function main() {
    console.log('Cleaning frontmatter...');
    const results = await processDirectory(path.join(__dirname, 'tooling'));
    await generateReport(results);
}

main().catch(console.error);