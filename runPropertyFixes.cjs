const fs = require('fs').promises;
const path = require('path');
const { processPropertyFixes, formatReport } = require('./detectAndFixDuplicateProperties.cjs');

/**
 * Process all markdown files in a directory
 */
async function processDirectory(directory) {
    console.log(`Searching in directory: ${directory}`);
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const results = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        
        if (entry.isDirectory()) {
            // Recursively process subdirectories
            const subResults = await processDirectory(fullPath);
            results.push(...subResults);
        } else if (entry.name.endsWith('.md')) {
            // Process markdown files
            console.log(`Processing ${fullPath}...`);
            const content = await fs.readFile(fullPath, 'utf8');
            const result = await processPropertyFixes(content, fullPath);
            
            if (result.modified) {
                await fs.writeFile(fullPath, result.content, 'utf8');
            }
            
            results.push(result);
        }
    }

    return results;
}

async function main() {
    try {
        console.log('Starting property fixes...');
        const toolingDir = path.join(__dirname, 'tooling');
        console.log(`Looking for files in ${toolingDir}`);

        const results = await processDirectory(toolingDir);
        
        // Generate report
        const report = formatReport(results);
        
        // Create reports directory if it doesn't exist
        const reportsDir = path.join(__dirname, 'reports');
        await fs.mkdir(reportsDir, { recursive: true });
        
        // Save report with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        const reportPath = path.join(reportsDir, `${timestamp}_property-fix-report.md`);
        await fs.writeFile(reportPath, report);
        
        console.log(`Report saved to ${reportPath}`);
    } catch (error) {
        console.error('Error processing files:', error);
        process.exit(1);
    }
}

main();
