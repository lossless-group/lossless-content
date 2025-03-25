const fs = require('fs').promises;
const path = require('path');

/**
 * Remove back-to-back frontmatter delimiters (---)
 * Only removes when there are two consecutive lines with just ---
 */
async function fixDoubleDelimiters(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        let modified = false;

        // Look for back-to-back delimiters
        for (let i = 0; i < lines.length - 1; i++) {
            if (lines[i].trim() === '---' && lines[i + 1].trim() === '---') {
                // Remove one of the delimiters
                lines.splice(i + 1, 1);
                modified = true;
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
            console.log(`Processing ${filePath}...`);
            const result = await fixDoubleDelimiters(filePath);
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

async function main() {
    try {
        const toolingDir = path.join(__dirname, 'tooling');
        console.log('Starting double delimiter fixes...');
        
        const results = await processDirectory(toolingDir);
        
        // Print summary
        const totalFiles = results.length;
        const modifiedFiles = results.filter(r => r.modified).length;
        const errorFiles = results.filter(r => !r.success).length;
        
        console.log('\nSummary:');
        console.log(`Total files processed: ${totalFiles}`);
        console.log(`Files modified: ${modifiedFiles}`);
        console.log(`Files with errors: ${errorFiles}`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();