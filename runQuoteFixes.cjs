const fs = require('fs').promises;
const path = require('path');
const { processQuoteFixes, formatReport } = require('./detectAndFixQuotes.cjs');

/**
 * Get the next report number by checking existing reports
 */
async function getNextReportNumber() {
    const today = new Date().toISOString().split('T')[0];
    const reportDir = path.join(process.cwd(), 'reports');
    
    try {
        await fs.mkdir(reportDir, { recursive: true });
        const files = await fs.readdir(reportDir);
        const todayReports = files.filter(f => f.startsWith(`quote-fixes-report_${today}`));
        return todayReports.length + 1;
    } catch (error) {
        console.error('Error getting next report number:', error);
        return 1;
    }
}

async function processDirectory(dir) {
    const results = [];
    
    async function walk(currentPath) {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            
            if (entry.isDirectory()) {
                // Skip node_modules and .git
                if (entry.name !== 'node_modules' && entry.name !== '.git') {
                    console.log(`Searching in directory: ${fullPath}`); // Debug log
                    await walk(fullPath);
                }
            } else if (entry.name.endsWith('.md')) {
                console.log(`Processing ${fullPath}...`); // Debug log
                try {
                    const content = await fs.readFile(fullPath, 'utf8');
                    const result = await processQuoteFixes(content, fullPath);
                    
                    if (result.modified) {
                        await fs.writeFile(fullPath, result.content, 'utf8');
                    }
                    results.push({
                        file: fullPath,
                        modified: result.modified,
                        modifications: result.modifications || []
                    });
                } catch (error) {
                    console.error(`Error processing ${fullPath}:`, error);
                }
            }
        }
    }
    
    await walk(dir);
    return results;
}

async function main() {
    console.log('Starting quote fixes...');
    const startTime = Date.now();

    // Process files in the tooling directory
    const toolingDir = path.join(process.cwd(), 'tooling');
    console.log(`Looking for files in ${toolingDir}`); // Debug log
    const results = await processDirectory(toolingDir);

    // Generate and save report
    const reportContent = formatReport(results);
    const reportNumber = await getNextReportNumber();
    const today = new Date().toISOString().split('T')[0];
    const reportPath = path.join(process.cwd(), 'reports', `quote-fixes-report_${today}_${String(reportNumber).padStart(2, '0')}.md`);
    
    await fs.writeFile(reportPath, reportContent);
    
    const endTime = Date.now();
    console.log(`\nProcessing complete in ${((endTime - startTime) / 1000).toFixed(3)} seconds`);
    console.log(`Report written to: ${reportPath}`);
}

main().catch(console.error);
