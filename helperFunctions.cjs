const fs = require('fs').promises;
const path = require('path');

/**
 * Extract frontmatter from markdown content
 * @param {string} content - The markdown file content
 * @returns {Object} Frontmatter extraction result
 */
function extractFrontmatter(content) {
    try {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);

        if (!match) {
            return {
                success: true,
                noFrontmatter: true,
                frontmatterString: '',
                startIndex: 0,
                endIndex: 0
            };
        }

        return {
            success: true,
            noFrontmatter: false,
            frontmatterString: match[1],
            startIndex: 0,
            endIndex: match[0].length
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Create a success message object
 * @param {string} filePath - Path to the file
 * @param {boolean} modified - Whether the file was modified
 * @param {Array} modifications - List of modifications made
 */
function createSuccessMessage(filePath, modified = false, modifications = []) {
    return {
        success: true,
        modified,
        modifications,
        filePath
    };
}

/**
 * Create an error message object
 * @param {string} filePath - Path to the file
 * @param {string} error - Error message
 */
function createErrorMessage(filePath, error) {
    return {
        success: false,
        error,
        filePath
    };
}

module.exports = {
    extractFrontmatter,
    createSuccessMessage,
    createErrorMessage
};
