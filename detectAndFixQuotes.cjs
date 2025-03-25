const fs = require('fs');
const path = require('path');
const helperFunctions = require('./helperFunctions.cjs');

/**
 * Clean up tags by removing quotes and brackets
 * @param {string} tag - The tag to clean
 * @returns {string} - The cleaned tag
 */
function cleanTag(tag) {
    return tag
        .replace(/['"]/g, '') // Remove quotes
        .replace(/[\[\]]/g, '') // Remove brackets
        .trim();
}

/**
 * Fix tags in frontmatter
 * @param {string} content - The frontmatter content
 * @returns {string} - The fixed content
 */
function fixTags(content) {
    const tagLineRegex = /^(\s*)(tags\s*:)(.*)$/gm;
    return content.replace(tagLineRegex, (match, space, key, value) => {
        if (!value.trim()) return match;
        
        // Split tags, clean each one, and reconstruct
        const tags = value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag) // Remove empty tags
            .map(cleanTag);
        
        return `${space}${key} [${tags.join(', ')}]`;
    });
}

/**
 * Fix error message properties to use double quotes
 * @param {string} content - The frontmatter content
 * @returns {Object} - Result with modified content and modifications list
 */
function fixErrorMessages(content) {
    const errorProps = ['og_error_message', 'jina_error'];
    let modified = false;
    let modifications = [];

    // For each error property
    errorProps.forEach(prop => {
        const propRegex = new RegExp(`^(\\s*)(${prop}\\s*:)\\s*(.*)$`, 'gm');
        
        content = content.replace(propRegex, (match, space, key, value) => {
            if (!value.trim()) return match;
            
            // Remove any existing quotes
            const cleanValue = value.trim().replace(/^["']|["']$/g, '');
            
            // Only modify if it's not already properly double-quoted
            if (value.trim() !== `"${cleanValue}"`) {
                modified = true;
                modifications.push(`Fixed ${prop} quotes`);
                return `${space}${key} "${cleanValue}"`;
            }
            
            return match;
        });
    });

    return {
        content,
        modified,
        modifications
    };
}

/**
 * Process all quote fixes for a file
 * Executes fixes in specific order to handle dependencies between different types of fixes
 */
async function processQuoteFixes(content, filePath) {
    try {
        const frontmatterData = helperFunctions.extractFrontmatter(content);
        
        if (!frontmatterData.success) {
            return helperFunctions.createErrorMessage(filePath, frontmatterData.error);
        }

        let modified = false;
        let modifications = [];

        // First: Fix quote spacing
        const spacingResult = await fixQuoteSpacing(content, filePath);
        if (spacingResult.modified) {
            content = spacingResult.content;
            modifications.push(...spacingResult.modifications);
            modified = true;
        }

        // Second: Fix unbalanced quotes
        const unbalancedResult = await fixUnbalancedQuotes(content, filePath);
        if (unbalancedResult.modified) {
            content = unbalancedResult.content;
            modifications.push(...unbalancedResult.modifications);
            modified = true;
        }

        // Third: Remove quotes from URLs and UUIDs
        const urlResult = await removeQuotesFromUrls(content, filePath);
        if (urlResult.modified) {
            content = urlResult.content;
            modifications.push(...urlResult.modifications);
            modified = true;
        }

        const uuidResult = await removeQuotesFromUuids(content, filePath);
        if (uuidResult.modified) {
            content = uuidResult.content;
            modifications.push(...uuidResult.modifications);
            modified = true;
        }

        // Fourth: Remove redundant quotes from simple strings
        const redundantResult = await removeRedundantQuotes(content, filePath);
        if (redundantResult.modified) {
            content = redundantResult.content;
            modifications.push(...redundantResult.modifications);
            modified = true;
        }

        // Fifth: Add double quotes to error messages
        const errorResult = await fixErrorMessages(content, filePath);
        if (errorResult.modified) {
            content = errorResult.content;
            modifications.push(...errorResult.modifications);
            modified = true;
        }

        return {
            success: true,
            modified,
            content,
            modifications,
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
    let report = '# Quote Fix Report\n\n';
    
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
        special_chars: [],
        unbalanced: [],
        urls: [],
        uuids: [],
        redundant: [],
        error_messages: []
    };

    results.forEach(result => {
        if (result.modified) {
            const parts = result.file.split('/tooling/');
            if (parts.length === 2) {
                const formattedPath = `[[Tooling/${parts[1].replace('.md', '')}]]`;
                
                result.modifications.forEach(mod => {
                    if (mod.includes('special characters')) modTypes.special_chars.push(formattedPath);
                    if (mod.includes('unbalanced quotes')) modTypes.unbalanced.push(formattedPath);
                    if (mod.includes('URL')) modTypes.urls.push(formattedPath);
                    if (mod.includes('UUID')) modTypes.uuids.push(formattedPath);
                    if (mod.includes('redundant')) modTypes.redundant.push(formattedPath);
                    if (mod.includes('Fixed og_error_message') || mod.includes('Fixed jina_error')) {
                        modTypes.error_messages.push(formattedPath);
                    }
                });
            }
        }
    });

    // Add each modification type to report
    report += '### Files with Special Characters Fixed\n';
    report += [...new Set(modTypes.special_chars)].join(', ') + '\n\n';

    report += '### Files with Unbalanced Quotes Fixed\n';
    report += [...new Set(modTypes.unbalanced)].join(', ') + '\n\n';

    report += '### Files with URL Quotes Fixed\n';
    report += [...new Set(modTypes.urls)].join(', ') + '\n\n';

    report += '### Files with UUID Quotes Fixed\n';
    report += [...new Set(modTypes.uuids)].join(', ') + '\n\n';

    report += '### Files with Redundant Quotes Fixed\n';
    report += [...new Set(modTypes.redundant)].join(', ') + '\n\n';

    report += '### Files with Error Message Quotes Fixed\n';
    report += [...new Set(modTypes.error_messages)].join(', ') + '\n\n';

    return report;
}

/**
 * Check if a string contains special characters that need quotes
 * @param {string} str - String to check
 * @returns {boolean} - True if string contains special characters
 */
function hasSpecialChars(str) {
    // Special characters include:
    // - Basic special chars: :, &, |, >, <, *, %, @, #, !, ?, ~
    // - Common separators: —, –, -, |, /, \, →, ←, ⇒, ⇐
    // - Common list markers: •, ·, ○, ●, ◦
    return /[:&|><*%@#!?~—–\-|/\\→←⇒⇐•·○●◦]/.test(str);
}

/**
 * Wrap strings containing special characters with single quotes
 */
async function wrapStringsWithSpecialChars(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    // Match any value that isn't already quoted and contains special characters
    const valueRegex = /^([^:]+?):\s*([^'"][^'\n]+)$/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        console.log(`Checking line: "${line}"`);
        const match = line.match(valueRegex);
        if (match && hasSpecialChars(match[2])) {
            console.log(`Found special chars in: ${match[1]}, value="${match[2]}"`);
            lines[i] = `${match[1]}: '${match[2]}'`;
            modified = true;
            modifications.push(`Added quotes to value with special characters: ${match[1]}`);
        }
    }

    if (!modified) {
        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    }

    const newFrontmatter = lines.join('\n');
    const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
        '---\n' + newFrontmatter + '\n---' +
        markdownContent.slice(frontmatterData.endIndex);

    return {
        modified,
        content: newContent,
        modifications
    };
}

/**
 * Fix unbalanced quotes in frontmatter
 * Handles cases where quotes are not properly closed or nested
 */
async function fixUnbalancedQuotes(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        const [key, ...valueParts] = line.split(':');
        if (!key || !valueParts.length) continue;

        let value = valueParts.join(':').trim();
        
        // Count quotes
        const singleQuotes = (value.match(/'/g) || []).length;
        const doubleQuotes = (value.match(/"/g) || []).length;

        // Fix unbalanced quotes
        if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
            // Remove all quotes first
            value = value.replace(/['"]/g, '');
            
            // Add single quotes if needed
            if (value.match(/[:&|><*%@#!?~]/)) {
                value = `'${value}'`;
            }
            
            lines[i] = `${key}: ${value}`;
            modified = true;
            modifications.push(`Fixed unbalanced quotes: ${key}`);
        }
    }

    if (!modified) {
        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    }

    const newFrontmatter = lines.join('\n');
    const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
        '---\n' + newFrontmatter + '\n---' +
        markdownContent.slice(frontmatterData.endIndex);

    return {
        modified,
        content: newContent,
        modifications
    };
}

/**
 * Remove quotes from URLs in frontmatter
 */
async function removeQuotesFromUrls(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    // Match any quoted value that starts with http(s)://
    // Handle multiple quotes: ""'value'"" or 'value' or "value"
    const urlRegex = /^([^:]+?):\s*(?:"{2})?['"]+?(https?:\/\/.+?)['"]+?(?:"{2})?$/i;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        console.log(`Checking line: "${line}"`);
        const urlMatch = line.match(urlRegex);
        if (urlMatch) {
            console.log(`Match found: property="${urlMatch[1]}", value="${urlMatch[2]}"`);
            if (urlMatch[1].includes('url') || urlMatch[1].includes('image') || urlMatch[1].includes('favicon')) {
                console.log(`Property matched URL criteria, removing quotes`);
                lines[i] = `${urlMatch[1]}: ${urlMatch[2]}`;
                modified = true;
                modifications.push(`Removed quotes from URL: ${urlMatch[1]}`);
            }
        }
    }

    if (!modified) {
        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    }

    const newFrontmatter = lines.join('\n');
    const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
        '---\n' + newFrontmatter + '\n---' +
        markdownContent.slice(frontmatterData.endIndex);

    return {
        modified,
        content: newContent,
        modifications
    };
}

/**
 * Remove quotes from UUID properties in frontmatter
 */
async function removeQuotesFromUuids(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    const uuidRegex = /^(.*uuid.*?):\s*['"]+(.*?)['"]$/i;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        const uuidMatch = line.match(uuidRegex);
        if (uuidMatch) {
            lines[i] = `${uuidMatch[1]}: ${uuidMatch[2]}`;
            modified = true;
            modifications.push(`Removed quotes from UUID: ${uuidMatch[1]}`);
        }
    }

    if (!modified) {
        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    }

    const newFrontmatter = lines.join('\n');
    const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
        '---\n' + newFrontmatter + '\n---' +
        markdownContent.slice(frontmatterData.endIndex);

    return {
        modified,
        content: newContent,
        modifications
    };
}

/**
 * Remove redundant quotes from simple strings in frontmatter
 * Simple strings are those without special characters
 */
async function removeRedundantQuotes(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    const specialCharsRegex = /[:&|><*%@#!?~]/;
    const quotedStringRegex = /^([^:]+):\s*['"]+(.+?)['"]$/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        const match = line.match(quotedStringRegex);
        if (match) {
            const [, key, value] = match;
            
            // Skip certain keys that have their own handling
            if (key.includes('uuid') || key.includes('url')) continue;
            
            // If value doesn't contain special chars, remove quotes
            if (!specialCharsRegex.test(value)) {
                lines[i] = `${key}: ${value}`;
                modified = true;
                modifications.push(`Removed redundant quotes: ${key}`);
            }
        }
    }

    if (!modified) {
        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    }

    const newFrontmatter = lines.join('\n');
    const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
        '---\n' + newFrontmatter + '\n---' +
        markdownContent.slice(frontmatterData.endIndex);

    return {
        modified,
        content: newContent,
        modifications
    };
}

/**
 * Fix quote spacing to ensure quotes hug the content
 * @param {string} markdownContent - The markdown content
 * @param {string} markdownFilePath - Path to the markdown file
 * @returns {Object} - Result with modified content and modifications list
 */
async function fixQuoteSpacing(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    // Match any value with quotes that have spaces between the quotes and content
    // Also handle multiple quotes: ""'value'"" or 'value' or "value"
    const spacedQuotesRegex = /^([^:]+?):\s*(?:"{2})?['"]\s+(.+?)\s+['"](?:"{2})?$/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        console.log(`Checking line: "${line}"`);
        const match = line.match(spacedQuotesRegex);
        if (match) {
            console.log(`Found spaced quotes in: ${match[1]}, value="${match[2]}"`);
            // Keep the original quote type (single or double)
            const quoteType = line.includes('"') ? '"' : "'";
            lines[i] = `${match[1]}: ${quoteType}${match[2]}${quoteType}`;
            modified = true;
            modifications.push(`Fixed quote spacing in: ${match[1]}`);
        }
    }

    if (!modified) {
        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    }

    const newFrontmatter = lines.join('\n');
    const newContent = markdownContent.slice(0, frontmatterData.startIndex) +
        '---\n' + newFrontmatter + '\n---' +
        markdownContent.slice(frontmatterData.endIndex);

    return {
        modified,
        content: newContent,
        modifications
    };
}

// Export the main function
module.exports = {
    processQuoteFixes,
    formatReport
};