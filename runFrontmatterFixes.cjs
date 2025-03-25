const fs = require('fs').promises;
const path = require('path');

/**
 * Fix frontmatter closing delimiter issues by:
 * 1. Finding the opening delimiter
 * 2. Finding where key-value pairs end
 * 3. Adding closing delimiter on the next line
 */
async function fixFrontmatterIssues(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        let modifications = [];

        // Split into lines for analysis
        const lines = content.split('\n');
        
        // Find opening delimiter
        const openingIndex = lines.findIndex(line => line.trim() === '---');
        if (openingIndex === -1) {
            return {
                success: true,
                modified: false,
                content,
                file: filePath
            };
        }

        // Pattern for frontmatter lines: key: value or key:\n  - list item
        const frontmatterLinePattern = /^[^:\s]+:\s*.*$|^[\s-]+.*$/;
        
        let lastFrontmatterLine = -1;
        
        // Start looking from the line after the opening delimiter
        for (let i = openingIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines within frontmatter
            if (line === '') continue;
            
            // If we find another delimiter, stop looking
            if (line === '---') break;
            
            // If line matches frontmatter pattern, update last frontmatter line
            if (frontmatterLinePattern.test(line)) {
                lastFrontmatterLine = i;
            } else {
                // If we find a non-frontmatter line, stop looking
                break;
            }
        }

        // If we found frontmatter content
        if (lastFrontmatterLine !== -1) {
            // Remove any existing closing delimiter that might be stuck to content
            const lastLine = lines[lastFrontmatterLine];
            if (lastLine.endsWith('---')) {
                lines[lastFrontmatterLine] = lastLine.replace(/---$/, '');
            }
            
            // Insert closing delimiter on the next line
            lines.splice(lastFrontmatterLine + 1, 0, '---');
            modified = true;
            modifications.push('Fixed closing delimiter placement');
        }

        if (modified) {
            const newContent = lines.join('\n');
            await fs.writeFile(filePath, newContent);
            return {
                success: true,
                modified: true,
                content: newContent,
                modifications,
                file: filePath
            };
        }

        return {
            success: true,
            modified: false,
            content,
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
            console.log(`Processing ${filePath}...`);
            const result = await fixFrontmatterIssues(filePath);
            results.push(result);
        }
    }

    async function walk(dir) {
        console.log(`Searching in directory: ${dir}`);
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

function formatReport(results) {
    let report = '# Frontmatter Fix Report\n\n';
    
    // Summary section
    const totalFiles = results.length;
    const modifiedFiles = results.filter(r => r.modified).length;
    const errorFiles = results.filter(r => !r.success).length;
    
    // Count specific fixes
    const delimiterFixes = results.filter(r => r.modified && r.modifications.includes('Fixed closing delimiter placement')).length;
    
    report += '## Summary\n';
    report += `- Total files processed: ${totalFiles}\n`;
    report += `- Files modified: ${modifiedFiles}\n`;
    report += `- Delimiter placement fixes: ${delimiterFixes}\n`;
    report += `- Files with errors: ${errorFiles}\n\n`;

    // Details section
    if (modifiedFiles > 0) {
        report += '## Files Fixed\n';
        results
            .filter(r => r.modified)
            .forEach(result => {
                const parts = result.file.split('/tooling/');
                if (parts.length === 2) {
                    const formattedPath = `[[Tooling/${parts[1].replace('.md', '')}]]`;
                    report += `- ${formattedPath} (${result.modifications.join(', ')})\n`;
                }
            });
        report += '\n';
    }

    // Error section
    if (errorFiles > 0) {
        report += '## Errors\n';
        results
            .filter(r => !r.success)
            .forEach(result => {
                report += `- ${result.file}: ${result.error}\n`;
            });
    }

    return report;
}

async function getNextReportIndex() {
    const reportsDir = path.join(__dirname, 'reports');
    const today = '2025-03-25';
    const pattern = new RegExp(`${today}_frontmatter-fix-report_(\\d{2})\\.md`);
    
    try {
        const files = await fs.readdir(reportsDir);
        let maxIndex = 0;
        
        files.forEach(file => {
            const match = file.match(pattern);
            if (match) {
                const index = parseInt(match[1]);
                maxIndex = Math.max(maxIndex, index);
            }
        });
        
        return String(maxIndex + 1).padStart(2, '0');
    } catch (error) {
        // If directory doesn't exist or other error, start with index 01
        return '01';
    }
}

async function main() {
    try {
        const toolingDir = path.join(__dirname, 'tooling');
        console.log('Starting frontmatter fixes...');
        console.log(`Looking for files in ${toolingDir}`);

        const results = await processDirectory(toolingDir);
        const report = formatReport(results);

        // Create reports directory if it doesn't exist
        const reportsDir = path.join(__dirname, 'reports');
        await fs.mkdir(reportsDir, { recursive: true });

        // Get next report index
        const reportIndex = await getNextReportIndex();
        const reportPath = path.join(reportsDir, `2025-03-25_frontmatter-fix-report_${reportIndex}.md`);
        
        await fs.writeFile(reportPath, report);
        console.log(`Report saved to ${reportPath}`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
