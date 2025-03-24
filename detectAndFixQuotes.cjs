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
        const { frontmatterString, noFrontmatter, startIndex, endIndex } = helperFunctions.extractFrontmatter(content);
        
        if (noFrontmatter) {
            return helperFunctions.createSuccessMessage(filePath, false);
        }

        let newFrontmatter = frontmatterString;
        let modifications = [];

        // First: Fix unbalanced quotes
        const unbalancedResult = fixUnbalancedQuotes(newFrontmatter);
        if (unbalancedResult.modified) {
            newFrontmatter = unbalancedResult.content;
            modifications.push(...unbalancedResult.modifications);
        }

        // Second: Remove quotes from URLs and UUIDs
        const urlResult = removeQuotesFromUrls(newFrontmatter);
        if (urlResult.modified) {
            newFrontmatter = urlResult.content;
            modifications.push(...urlResult.modifications);
        }

        const uuidResult = removeQuotesFromUuids(newFrontmatter);
        if (uuidResult.modified) {
            newFrontmatter = uuidResult.content;
            modifications.push(...uuidResult.modifications);
        }

        // Third: Remove redundant quotes from simple strings
        const redundantResult = removeRedundantQuotes(newFrontmatter);
        if (redundantResult.modified) {
            newFrontmatter = redundantResult.content;
            modifications.push(...redundantResult.modifications);
        }

        // Fourth: Add double quotes to error messages
        const errorResult = fixErrorMessages(newFrontmatter);
        if (errorResult.modified) {
            newFrontmatter = errorResult.content;
            modifications.push(...errorResult.modifications);
        }

        // If any modifications were made, update the content
        if (modifications.length > 0) {
            const newContent = content.slice(0, startIndex + 4) + // Include the opening '---\n'
                             newFrontmatter + '\n' +
                             content.slice(endIndex - 4); // Include the closing '\n---'
            
            return {
                success: true,
                modified: true,
                content: newContent,
                modifications,
                file: filePath
            };
        }

        return helperFunctions.createSuccessMessage(filePath, false);
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
 * Wrap strings containing special characters with single quotes
 * Special characters include: :, &, |, >, <, *, %, @, #, !, ?, ~
 */
async function wrapStringsWithSpecialChars(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    const lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    const modifications = [];

    const specialCharsRegex = /[:&|><*%@#!?~]/;
    const quotedStringRegex = /^([^:]+):\s*['"](.+)['"]$/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        const [key, ...valueParts] = line.split(':');
        if (!key || !valueParts.length) continue;

        const value = valueParts.join(':').trim();
        
        // Skip certain keys that shouldn't be quoted
        if (key.includes('uuid') || key.includes('url')) continue;

        // If value contains special chars and isn't already properly quoted
        if (specialCharsRegex.test(value) && !quotedStringRegex.test(line)) {
            lines[i] = `${key}: '${value}'`;
            modified = true;
            modifications.push(`Wrapped value containing special characters with single quotes: ${key}`);
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

// Known URL properties
const URL_PROPERTIES = [
    'url',
    'image',
    'favicon',
    'banner',
    'avatar',
    'logo',
    'thumbnail',
    'icon'
];

/**
 * Check if a string is a URL
 * @param {string} str - String to check
 * @returns {boolean} - True if string is a URL
 */
function isUrl(str) {
    try {
        // Basic URL validation - must start with http:// or https://
        return /^https?:\/\/.+/i.test(str);
    } catch (e) {
        return false;
    }
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

    // Match:
    // 1. Known URL properties (url, image, etc.)
    // 2. Any property ending in _url
    const urlRegex = new RegExp(`^((?:.*_url|.*(?:${URL_PROPERTIES.join('|')})).*?):\\s*['"]+(.+?)['"]$`, 'i');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        const urlMatch = line.match(urlRegex);
        if (urlMatch && isUrl(urlMatch[2])) {
            lines[i] = `${urlMatch[1]}: ${urlMatch[2]}`;
            modified = true;
            modifications.push(`Removed quotes from URL: ${urlMatch[1]}`);
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

// Export the main function
module.exports = {
    processQuoteFixes,
    formatReport
};