#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

/**
 * Check frontmatter for formatting issues:
 * 1. Tags ending with '---'
 * 2. Multiple blank lines before closing delimiter
 */
async function checkFrontmatterFormatting(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        let inFrontmatter = false;
        let frontmatterCount = 0;
        let lastContentLineIndex = -1;
        let issues = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Track frontmatter boundaries
            if (line === '---') {
                frontmatterCount++;
                if (frontmatterCount === 1) {
                    inFrontmatter = true;
                } else if (frontmatterCount === 2) {
                    // Check for multiple blank lines before closing delimiter
                    const blankLineCount = i - lastContentLineIndex - 1;
                    if (blankLineCount > 1) {
                        issues.push({
                            type: 'extra_blank_lines',
                            details: `${blankLineCount} blank lines before closing delimiter`,
                            lineNumber: i
                        });
                    }
                    break;
                }
                continue;
            }

            if (inFrontmatter && line) {
                lastContentLineIndex = i;
                
                // Check for tags ending with ---
                if (line.startsWith('  -') && line.endsWith('---')) {
                    issues.push({
                        type: 'invalid_tag_ending',
                        details: `Tag ends with '---': ${line}`,
                        lineNumber: i + 1
                    });
                }
            }
        }

        return {
            file: filePath,
            hasIssues: issues.length > 0,
            issues
        };

    } catch (error) {
        return {
            file: filePath,
            hasIssues: true,
            issues: [{
                type: 'error',
                details: error.message
            }]
        };
    }
}

async function processDirectory(directory) {
    const results = [];
    
    async function processFile(filePath) {
        if (path.extname(filePath) === '.md') {
            const result = await checkFrontmatterFormatting(filePath);
            if (result.hasIssues) {
                results.push(result);
            }
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
    const existingReports = files.filter(f => f.startsWith(`${date}_frontmatter-format-report`));
    const nextNumber = existingReports.length + 1;
    
    const reportPath = path.join(reportsDir, `${date}_frontmatter-format-report_${String(nextNumber).padStart(2, '0')}.md`);

    let report = '# Frontmatter Format Issues Report\n\n';
    report += '## Summary\n';
    report += `- Files with issues: ${results.length}\n\n`;

    report += '## Files with Issues\n';
    results.forEach(result => {
        const relativePath = path.relative(__dirname, result.file);
        report += `\n### [[${relativePath}]]\n`;
        result.issues.forEach(issue => {
            if (issue.lineNumber) {
                report += `- Line ${issue.lineNumber}: ${issue.type} - ${issue.details}\n`;
            } else {
                report += `- ${issue.type} - ${issue.details}\n`;
            }
        });
    });

    await fs.writeFile(reportPath, report);
    console.log(`Report written to: ${reportPath}`);
}

async function main() {
    console.log('Checking frontmatter formatting...');
    const results = await processDirectory(path.join(__dirname, 'tooling'));
    await generateReport(results);
}

main().catch(console.error);
