const fs = require('fs').promises;
const path = require('path');

/**
 * Fix common frontmatter issues:
 * 1. Closing delimiter stuck to property lines
 * 2. Malformed tags format (converting to proper YAML list format)
 * Only fixes if there's a problem, won't modify correct files
 */
async function fixFrontmatterIssues(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        let modifications = [];
        let newContent = content;

        // Fix 1: Closing delimiter stuck to property line
        const delimiterPattern = /^([^:\n]+:[^\n]+)---\n/m;
        if (delimiterPattern.test(newContent)) {
            newContent = newContent.replace(delimiterPattern, '$1\n---\n');
            modified = true;
            modifications.push('Fixed closing delimiter placement');
        }

        // Fix 2: Malformed tags format
        // Look for tags: [- tag1 - tag2] pattern
        const tagsPattern = /^tags:\s*\[(.*?)\]/m;
        const tagsMatch = newContent.match(tagsPattern);
        if (tagsMatch) {
            // Extract tags and convert to proper format
            const tags = tagsMatch[1]
                .split('-')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            if (tags.length > 0) {
                // Replace the old tags format with the proper YAML list format
                const newTags = `tags:\n${tags.map(tag => `  - ${tag}`).join('\n')}`;
                newContent = newContent.replace(tagsPattern, newTags);
                modified = true;
                modifications.push('Fixed tags format');
            }
        }

        if (modified) {
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
            content: newContent,
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
    const tagsFixes = results.filter(r => r.modified && r.modifications.includes('Fixed tags format')).length;
    
    report += '## Summary\n';
    report += `- Total files processed: ${totalFiles}\n`;
    report += `- Files modified: ${modifiedFiles}\n`;
    report += `- Delimiter placement fixes: ${delimiterFixes}\n`;
    report += `- Tags format fixes: ${tagsFixes}\n`;
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
    const pattern = new RegExp(`${today}_frontmatter-fix-report_(\\d+)\\.md`);
    
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
        
        return maxIndex + 1;
    } catch (error) {
        // If directory doesn't exist or other error, start with index 1
        return 1;
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
