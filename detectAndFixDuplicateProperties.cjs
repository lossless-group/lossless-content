const fs = require('fs').promises;
const path = require('path');
const helperFunctions = require('./helperFunctions.cjs');

/**
 * Fix duplicate site_uuid properties by:
 * 1. Moving all site_uuid properties to the top (after the first one if it exists)
 * 2. Removing all but the first site_uuid
 */
async function fixDuplicateUuids(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    // Find all site_uuid lines and their values
    const uuidLines = [];
    const nonUuidLines = [];
    let firstUuidIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) {
            nonUuidLines.push(line);
            continue;
        }

        if (line.startsWith('site_uuid:')) {
            if (firstUuidIndex === -1) {
                firstUuidIndex = i;
            }
            uuidLines.push(line);
            modified = true;
        } else {
            nonUuidLines.push(line);
        }
    }

    // If we found multiple UUIDs, reorganize the file
    if (uuidLines.length > 1) {
        const newLines = [];
        let uuidInserted = false;

        // Rebuild the frontmatter with UUIDs at the top
        for (let i = 0; i < nonUuidLines.length; i++) {
            const line = nonUuidLines[i];
            
            // After we see the first UUID or at the start of properties,
            // insert the first UUID and mark it as done
            if (!uuidInserted && (i >= firstUuidIndex || line.includes(':'))) {
                newLines.push(uuidLines[0]); // Only keep the first UUID
                uuidInserted = true;
                modifications.push(`Removed ${uuidLines.length - 1} duplicate site_uuid properties`);
            }
            
            newLines.push(line);
        }

        // If we haven't inserted the UUID yet (empty file or no properties),
        // add it at the end
        if (!uuidInserted) {
            newLines.push(uuidLines[0]);
        }

        const newFrontmatter = newLines.join('\n');
        const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
            '---\n' + newFrontmatter + '\n---' +
            markdownContent.slice(frontmatterData.endIndex);

        return {
            modified,
            content: newContent,
            modifications
        };
    }

    return helperFunctions.createSuccessMessage(markdownFilePath, false);
}

/**
 * Process a markdown file to fix duplicate properties
 */
async function processPropertyFixes(content, filePath) {
    try {
        // Fix duplicate UUIDs
        const uuidResult = await fixDuplicateUuids(content, filePath);
        if (!uuidResult.success) {
            return uuidResult;
        }

        return {
            success: true,
            modified: uuidResult.modified,
            content: uuidResult.modified ? uuidResult.content : content,
            modifications: uuidResult.modifications || [],
            file: filePath
        };
    } catch (error) {
        return helperFunctions.createErrorMessage(filePath, error.message);
    }
}

/**
 * Format the results into a markdown report
 */
function formatReport(results) {
    let report = '# Property Fix Report\n\n';
    
    // Summary section
    report += '## Summary\n';
    const totalFiles = results.length;
    const modifiedFiles = results.filter(r => r.modified).length;
    report += `- Total files processed: ${totalFiles}\n`;
    report += `- Files modified: ${modifiedFiles}\n\n`;

    // Details section
    report += '## Details\n\n';
    
    // Group modifications by type
    const modTypes = {
        duplicate_uuids: []
    };

    results.forEach(result => {
        if (result.modified && result.file) {
            const parts = result.file.split('/tooling/');
            if (parts.length === 2) {
                const formattedPath = `[[Tooling/${parts[1].replace('.md', '')}]]`;
                
                if (result.modifications) {
                    result.modifications.forEach(mod => {
                        if (mod.includes('duplicate site_uuid')) {
                            modTypes.duplicate_uuids.push(formattedPath);
                        }
                    });
                }
            }
        }
    });

    // Add each modification type to report
    report += '### Files with Duplicate UUIDs Fixed\n';
    report += modTypes.duplicate_uuids.length > 0 ? 
        [...new Set(modTypes.duplicate_uuids)].join(', ') : 
        'No files needed fixing\n';
    report += '\n';

    return report;
}

// Export the main function
module.exports = {
    processPropertyFixes,
    formatReport
};