const fs = require('fs').promises;
const path = require('path');

/**
 * Add single quotes around backlinks ([[text]]) in frontmatter
 * Only modifies lines that have backlinks and are inside frontmatter
 */
async function addBacklinkQuotes(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        let modified = false;
        let inFrontmatter = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Track if we're in frontmatter
            if (line === '---') {
                inFrontmatter = !inFrontmatter;
                continue;
            }

            // Only process lines in frontmatter that have backlinks
            if (inFrontmatter && line.includes('[[') && line.includes(']]')) {
                const [key, value] = line.split(':').map(part => part.trim());
                
                // Only process if we have both key and value
                if (key && value) {
                    // If value is already quoted, skip it
                    if (value.startsWith("'") && value.endsWith("'")) {
                        continue;
                    }
                    
                    // Add quotes around the value
                    lines[i] = `${key}: '${value}'`;
                    modified = true;
                }
            }
        }

        if (modified) {
            await fs.writeFile(filePath, lines.join('\n'));
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
            const result = await addBacklinkQuotes(filePath);
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
    const reportPath = path.join(__dirname, 'reports', `${date}_backlink-quotes-report.md`);

    let report = '# Backlink Quotes Report\n\n';
    report += '## Summary\n';
    report += `- Total files processed: ${results.length}\n`;
    report += `- Files modified: ${results.filter(r => r.modified).length}\n`;
    report += `- Files with errors: ${results.filter(r => !r.success).length}\n\n`;

    const modifiedFiles = results.filter(r => r.modified);
    if (modifiedFiles.length > 0) {
        report += '## Files Modified\n';
        for (const result of modifiedFiles) {
            const relativePath = result.file.split('tooling/')[1];
            report += `- [[${relativePath}]] (Added quotes around backlinks)\n`;
        }
        report += '\n';
    }

    const errorFiles = results.filter(r => !r.success);
    if (errorFiles.length > 0) {
        report += '## Files with Errors\n';
        for (const result of errorFiles) {
            const relativePath = result.file.split('tooling/')[1];
            report += `- [[${relativePath}]] (${result.error})\n`;
        }
        report += '\n';
    }

    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, report);
    console.log(`Report written to: ${reportPath}`);
}

async function main() {
    try {
        const toolingDir = path.join(__dirname, 'tooling');
        console.log('Adding quotes around backlinks...');
        
        const results = await processDirectory(toolingDir);
        await generateReport(results);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();