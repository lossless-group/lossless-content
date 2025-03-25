const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Process a markdown file to:
 * 1. Add frontmatter delimiters if none exist
 * 2. Add site_uuid if none exists
 * 3. Update date_modified to current date
 */
async function processMarkdownFile(content, filePath) {
    try {
        let modified = false;
        let modifications = [];
        
        // First fix any missing closing delimiter
        const delimiterResult = await fixMissingFrontmatterDelimiter(content, filePath);
        if (!delimiterResult.success) {
            return delimiterResult;
        }
        if (delimiterResult.modified) {
            content = delimiterResult.content;
            modified = true;
            modifications.push(...delimiterResult.modifications);
        }

        // Check if content has frontmatter delimiters
        const hasFrontmatter = content.startsWith('---\n');
        let newContent = content;

        if (!hasFrontmatter) {
            // Add frontmatter delimiters
            newContent = `---\n\n---\n\n${content}`;
            modified = true;
            modifications.push('Added frontmatter delimiters');
        }

        // Extract frontmatter
        const frontmatterMatch = newContent.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) {
            return {
                success: false,
                error: 'Could not extract frontmatter',
                file: filePath
            };
        }

        let frontmatter = frontmatterMatch[1];
        const frontmatterStart = 4; // Length of "---\n"
        const frontmatterEnd = frontmatterStart + frontmatter.length;

        // Check for site_uuid
        if (!frontmatter.includes('site_uuid:')) {
            // Generate new UUID
            const uuid = uuidv4();
            frontmatter = `site_uuid: ${uuid}\n${frontmatter}`;
            modified = true;
            modifications.push(`Added site_uuid: ${uuid}`);
        }

        // Update date_modified
        const currentDate = '2025-03-24';
        const dateModifiedRegex = /^date_modified:.*$/m;
        if (frontmatter.match(dateModifiedRegex)) {
            // Update existing date_modified
            frontmatter = frontmatter.replace(dateModifiedRegex, `date_modified: ${currentDate}`);
            modified = true;
            modifications.push(`Updated date_modified to ${currentDate}`);
        } else {
            // Add date_modified if it doesn't exist
            frontmatter = `${frontmatter.trim()}\ndate_modified: ${currentDate}\n`;
            modified = true;
            modifications.push(`Added date_modified: ${currentDate}`);
        }

        if (modified) {
            // Reconstruct the file content
            newContent = `---\n${frontmatter}---\n${newContent.slice(frontmatterEnd + 4)}`;
            
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

/**
 * Fixes missing closing frontmatter delimiters by analyzing the content structure
 * 
 * Logic:
 * 1. First checks if we have an opening '---' but no closing one
 * 2. Then looks for the "grouping" of frontmatter key-value pairs
 * 3. Uses a pattern to identify frontmatter lines (key: value format)
 * 4. When it finds two consecutive empty lines or non-frontmatter lines,
 *    that's where the frontmatter section ends
 * 5. Inserts the closing delimiter at that position
 * 
 * @param {string} content - The markdown file content
 * @param {string} filePath - Path to the file (for logging)
 * @returns {Object} Result object with modified content and status
 */
async function fixMissingFrontmatterDelimiter(content, filePath) {
    try {
        // Check if we already have balanced delimiters
        const delimiterMatches = content.match(/---/g);
        if (!delimiterMatches || delimiterMatches.length === 0) {
            return {
                success: true,
                modified: false,
                content,
                file: filePath
            };
        }

        // If we have balanced delimiters, no fix needed
        if (delimiterMatches.length >= 2) {
            return {
                success: true,
                modified: false,
                content,
                file: filePath
            };
        }

        // We have an opening delimiter but no closing one
        // Split content into lines for analysis
        const lines = content.split('\n');
        let inFrontmatter = false;
        let lastFrontmatterLine = -1;
        let emptyLineCount = 0;

        // Pattern for frontmatter lines: key: value
        // This matches lines that:
        // 1. Start with any characters except whitespace
        // 2. Have a colon
        // 3. Optionally have any characters after the colon
        const frontmatterLinePattern = /^[^:\s]+:\s*.*$/;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Start of frontmatter
            if (line.trim() === '---' && !inFrontmatter) {
                inFrontmatter = true;
                continue;
            }

            if (inFrontmatter) {
                if (line.trim() === '') {
                    emptyLineCount++;
                    // Two empty lines likely indicates end of frontmatter
                    if (emptyLineCount >= 2 && lastFrontmatterLine !== -1) {
                        break;
                    }
                } else {
                    emptyLineCount = 0;
                    if (frontmatterLinePattern.test(line)) {
                        lastFrontmatterLine = i;
                    } else if (lastFrontmatterLine !== -1) {
                        // If we've seen frontmatter lines before and this isn't one,
                        // we're probably at the end of the frontmatter
                        break;
                    }
                }
            }
        }

        // If we found the end of frontmatter section
        if (lastFrontmatterLine !== -1) {
            // Insert closing delimiter after the last frontmatter line
            lines.splice(lastFrontmatterLine + 1, 0, '---');
            return {
                success: true,
                modified: true,
                content: lines.join('\n'),
                modifications: ['Added missing frontmatter closing delimiter'],
                file: filePath
            };
        }

        return {
            success: false,
            error: 'Could not determine frontmatter boundaries',
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
            const result = await processMarkdownFile(content, fullPath);
            
            if (result.modified) {
                await fs.writeFile(fullPath, result.content, 'utf8');
            }
            
            results.push(result);
        }
    }

    return results;
}

/**
 * Format the results into a markdown report
 */
function formatReport(results) {
    let report = '# Frontmatter Fix Report\n\n';
    
    // Summary section
    report += '## Summary\n';
    const totalFiles = results.length;
    const modifiedFiles = results.filter(r => r.modified).length;
    const errorFiles = results.filter(r => !r.success).length;
    report += `- Total files processed: ${totalFiles}\n`;
    report += `- Files modified: ${modifiedFiles}\n`;
    report += `- Files with errors: ${errorFiles}\n\n`;

    // Details section
    report += '## Details\n\n';
    
    // Group modifications by type
    const modTypes = {
        added_frontmatter: [],
        added_uuid: [],
        updated_date: [],
        fixed_delimiters: [],
        errors: []
    };

    results.forEach(result => {
        if (!result.success) {
            modTypes.errors.push(`${result.file}: ${result.error}`);
        } else if (result.modified) {
            const parts = result.file.split('/tooling/');
            if (parts.length === 2) {
                const formattedPath = `[[Tooling/${parts[1].replace('.md', '')}]]`;
                
                result.modifications.forEach(mod => {
                    if (mod.includes('frontmatter delimiters')) {
                        modTypes.added_frontmatter.push(formattedPath);
                    }
                    if (mod.includes('site_uuid')) {
                        modTypes.added_uuid.push(formattedPath);
                    }
                    if (mod.includes('date_modified')) {
                        modTypes.updated_date.push(formattedPath);
                    }
                    if (mod.includes('closing delimiter')) {
                        modTypes.fixed_delimiters.push(formattedPath);
                    }
                });
            }
        }
    });

    // Add each modification type to report
    report += '### Added Frontmatter\n';
    report += modTypes.added_frontmatter.length > 0 ? 
        [...new Set(modTypes.added_frontmatter)].join(', ') + '\n\n' :
        'No files needed frontmatter added\n\n';

    report += '### Added site_uuid\n';
    report += modTypes.added_uuid.length > 0 ? 
        [...new Set(modTypes.added_uuid)].join(', ') + '\n\n' :
        'No files needed UUIDs added\n\n';

    report += '### Updated date_modified\n';
    report += modTypes.updated_date.length > 0 ? 
        [...new Set(modTypes.updated_date)].join(', ') + '\n\n' :
        'No files needed date updates\n\n';

    report += '### Fixed Missing Frontmatter Delimiters\n';
    report += modTypes.fixed_delimiters.length > 0 ? 
        [...new Set(modTypes.fixed_delimiters)].join(', ') + '\n\n' :
        'No files needed delimiter fixes\n\n';

    if (modTypes.errors.length > 0) {
        report += '### Errors\n';
        report += modTypes.errors.join('\n') + '\n\n';
    }

    return report;
}

// Export the main functions
module.exports = {
    processMarkdownFile,
    processDirectory,
    formatReport,
    fixMissingFrontmatterDelimiter
};