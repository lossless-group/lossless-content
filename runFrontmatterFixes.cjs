const fs = require('fs').promises;
const path = require('path');
const { processDirectory, formatReport } = require('./addSiteUuidIfNoneAddFrontmatterIfNone.cjs');

async function main() {
    try {
        console.log('Starting frontmatter fixes...');
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
        const reportPath = path.join(reportsDir, `${timestamp}_frontmatter-fix-report.md`);
        await fs.writeFile(reportPath, report);
        
        console.log(`Report saved to ${reportPath}`);
    } catch (error) {
        console.error('Error processing files:', error);
        process.exit(1);
    }
}

main();
