---
title: Pull YAML properties from a diverged content collection, and merge them.
lede: When content libraries diverge, and both libraries have important data and content, write a script that merges the matching files based on most recent or robust frontmatter and content.
date_authored_initial_draft: 2025-04-15
date_authored_current_draft: 2025-04-15
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.1.0
status: Implemented
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-19
image_prompt: A developer meticulously correcting YAML errors one at a time in a code editor, with a progress tracker, error highlights, and a sense of careful, incremental improvement. The scene is orderly, with a focus on accuracy and systematic problem-solving.
site_uuid: 0f2c53a6-db2c-43a3-8fcc-0b1e3b434abf
tags: [YAML-Validation, Build-Scripts, Data-Integrity]
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/5qwis9PMnCmTggZ3K2bmK5DieqBiUoMxEtlMHiH6vts/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/7a45875a-e23c-4259-a67a-d76da5423ad3
banner_image: https://img.recraft.ai/5rSCL5b4D1TBGy67iRJRVT23tJTQmgOg-FurvqGEmpo/rs:fit:2048:1024:0/raw:1/plain/abs://external/images/4c77b868-546f-45a8-9f8c-06692b193632
---
**Objective:** Create a script that reads a list of files (missing URLs), finds corresponding files by filename in a source directory (`temp_old_repo/content/tooling`), extracts the `url:` property from the source file's frontmatter (if present, **without using a YAML library**), and inserts this `url:` line into the frontmatter of the target file (`content/tooling`).

**New Script:** `tidyverse/tidy-up/tidy-one-property/import-url-from-old-repo.mjs`

**Detailed Steps:**

1.  **Setup & Paths:**
    *   Use Node.js `fs/promises` and `path`.
    *   Import necessary constants (`MONOREPO_ROOT`, `CONTENT_ROOT`, `REPORTS_DIR`) from `utils/constants.cjs`.
    *   Import reporting utilities (`formatRelativePath`, `writeReport`) from `utils/reportUtils.cjs`.
    *   Define key paths:
        *   `INPUT_REPORT_PATH`: `path.join(REPORTS_DIR, '2025-04-15_missing-url-report.md')`
        *   `TARGET_BASE_DIR`: `CONTENT_ROOT` (Base directory for files listed in the report, paths are relative to this)
        *   `SOURCE_DIR`: `path.resolve(MONOREPO_ROOT, '../temp_old_repo/content/tooling')` (**Assumption**: `temp_old_repo` is one level *above* `lossless-monorepo`. Needs confirmation.)
2.  **Read Input Report:**
    *   Read the `INPUT_REPORT_PATH` file content.
    *   Parse the content to extract a list of file paths relative to `TARGET_BASE_DIR` (e.g., `tooling/AI-Toolkit/Models/Dolphin.md`). Handle potential formats (e.g., `#### [[path|name]]` or plain paths).
3.  **Build Source File Index:**
    *   Recursively scan the `SOURCE_DIR` for all `.md` files.
    *   Create a JavaScript `Map` where the key is the filename (e.g., `Dolphin.md`) and the value is the absolute path to that file within `SOURCE_DIR`. This allows fast lookups by filename only.
4.  **Define Helper Functions (Manual Frontmatter Handling):**
    *   `async function extractUrlLine(filePath)`:
        *   Reads the file content at `filePath`.
        *   Manually scans lines between the first and second `---` delimiters.
        *   If a line starting with `url:` (case-sensitive, ignoring leading whitespace) is found, returns that full line (e.g., `url: https://example.com`).
        *   Returns `null` if no `url:` line is found within valid frontmatter delimiters or if read error occurs.
    *   `function insertUrlIntoFrontmatter(targetContent, urlLine)`:
        *   Finds the indices of the first and second `---` delimiters in `targetContent`.
        *   Extracts the frontmatter section. Checks if `url:` already exists (using regex `^\s*url:`).
        *   If `url:` exists -> Log skip, return `null` (indicating no change needed/skip).
        *   If delimiters invalid -> Log error, return `null`.
        *   Constructs the new content string by inserting `urlLine` immediately *before* the second `---` delimiter.
        *   Returns the modified `targetContent`.
5.  **Process Files:**
    *   Initialize tracking variables (files processed, matches found, URLs found, URLs inserted, errors, lists for reporting, etc.).
    *   Iterate through the list of relative target paths from the input report.
    *   For each `relativeTargetPath`:
        *   Get the `targetFilename = path.basename(relativeTargetPath)`.
        *   Construct `absoluteTargetPath = path.join(TARGET_BASE_DIR, relativeTargetPath)`.
        *   Look up `targetFilename` in the source file index map.
        *   If no match found in source -> Log skip, increment counter, add to skip list, continue.
        *   If match found (`absoluteSourcePath`):
            *   Call `urlLine = await extractUrlLine(absoluteSourcePath)`.
            *   If `urlLine` is `null` -> Log URL not found/read error, increment counter, add to skip list, continue.
            *   If `urlLine` is found:
                *   Try reading the target file: `targetContent = await fs.readFile(absoluteTargetPath, 'utf8')`. Handle read errors (log, increment error count, add to error list, continue).
                *   Try inserting the URL: `newContent = insertUrlIntoFrontmatter(targetContent, urlLine)`.
                *   If `newContent` is `null` (URL existed or malformed frontmatter) -> Increment skip counter, add to skip list, continue.
                *   If `newContent` is different:
                    *   Try writing the `newContent` back to `absoluteTargetPath`: `await fs.writeFile(absoluteTargetPath, newContent, 'utf8')`. Handle write errors (log, increment error count, add to error list, continue).
                    *   If write successful -> Log success, increment success counter, add to updated list.
6.  **Generate Final Report:**
    *   Create a detailed Markdown report string summarizing the entire operation:
        *   Input report path used.
        *   Source directory scanned.
        *   Target base directory.
        *   Total files listed in the input report.
        *   Number of target files processed.
        *   Number of files where a matching source filename was found.
        *   Number of source files where a `url:` property was found.
        *   Number of target files successfully updated with a `url:`.
        *   List of files updated (using `formatRelativePath`).
        *   List of files skipped because `url:` already existed/malformed frontmatter.
        *   List of files skipped because no matching source filename was found.
        *   List of files skipped because URL was not found in the source file.
        *   List of files that caused read/write errors.
    *   Use `await writeReport(reportString, 'import-url-from-old-repo')` to save the report.



```javascript
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const MONOREPO_ROOT = path.resolve(__dirname, '../../'); // Adjust based on script location
const CURRENT_TOOLING_DIR = path.join(MONOREPO_ROOT, 'content', 'tooling');
const OLD_TOOLING_DIR = path.join(MONOREPO_ROOT, 'temp_old_repo', 'tooling'); // Path to the cloned old repo's tooling dir

// List of relative file paths missing 'url:' (from previous `find` command output)
// NOTE: Manually copy the list from the previous step's output here.
// Ensure paths are relative to CURRENT_TOOLING_DIR (e.g., './Hardware/CM5.md')


// --- Helper Functions ---

/**
 * Extracts the URL from the frontmatter of a given file content string.
 * Manually searches for 'url:' line without parsing YAML.
 * @param {string} fileContent - The full content of the file.
 * @returns {string|null} - The extracted URL or null if not found.
 */
function extractUrlManually(fileContent) {
    const lines = fileContent.split('\n');
    let inFrontmatter = false;
    for (const line of lines) {
        if (line.trim() === '---') {
            // Toggle frontmatter flag, but stop if we hit the second '---'
            if (inFrontmatter) {
                return null; // Reached end of frontmatter without finding url
            }
            inFrontmatter = true;
            continue;
        }
        if (inFrontmatter) {
            const trimmedLine = line.trim();
            // Look for 'url:' specifically (case-sensitive, at start of line in frontmatter)
            if (trimmedLine.startsWith('url:')) {
                // Extract value after 'url:'
                return trimmedLine.substring(4).trim();
            }
        }
    }
    return null; // No url found or no frontmatter
}

/**
 * Inserts the urlLine into the frontmatter of the target file content.
 * Inserts just before the closing '---'.
 * @param {string} targetContent - The content of the file to modify.
 * @param {string} urlLine - The full 'url: <value>' line to insert.
 * @returns {string|null} - The modified content or null if frontmatter markers aren't found.
 */
function insertUrlManually(targetContent, urlLine) {
    const lines = targetContent.split('\n');
    let firstMarkerIndex = -1;
    let secondMarkerIndex = -1;

    // Find frontmatter delimiters
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            if (firstMarkerIndex === -1) {
                firstMarkerIndex = i;
            } else {
                secondMarkerIndex = i;
                break;
            }
        }
    }

    // Ensure frontmatter block exists
    if (firstMarkerIndex === -1 || secondMarkerIndex === -1) {
        console.warn("Could not find frontmatter delimiters (---).");
        return null;
    }

    // Insert the urlLine just before the closing delimiter
    lines.splice(secondMarkerIndex, 0, urlLine);

    return lines.join('\n');
}

// --- Main Processing Logic ---

async function processFiles() {
    console.log(`Starting URL restoration process...`);
    let processedCount = 0;
    let addedCount = 0;
    let notFoundInOldRepoCount = 0;
    let urlMissingInOldFileCount = 0;
    let writeErrorCount = 0;
    let frontmatterErrorCount = 0;

    for (const relativePath of filesMissingUrl) {
        processedCount++;
        const currentFilePath = path.join(CURRENT_TOOLING_DIR, relativePath);
        const oldFilePath = path.join(OLD_TOOLING_DIR, relativePath);

        try {
            // 1. Check if old file exists
            await fs.access(oldFilePath); // Throws error if doesn't exist

            // 2. Read old file and extract URL
            const oldContent = await fs.readFile(oldFilePath, 'utf-8');
            const extractedUrlValue = extractUrlManually(oldContent);

            if (!extractedUrlValue) {
                console.warn(`[WARN] No 'url:' found in old file: ${relativePath}`);
                urlMissingInOldFileCount++;
                continue; // Skip to next file
            }

            // Construct the full url line
            const urlLineToInsert = `url: ${extractedUrlValue}`;

            // 3. Read current file
            const currentContent = await fs.readFile(currentFilePath, 'utf-8');

            // Check if URL already exists somehow (safety check)
            if (currentContent.includes('\nurl:')) {
                 console.log(`[SKIP] 'url:' already exists in current file: ${relativePath}`);
                 continue;
            }

            // 4. Insert URL into current file content
            const updatedContent = insertUrlManually(currentContent, urlLineToInsert);

            if (!updatedContent) {
                 console.error(`[ERROR] Failed to insert URL due to missing frontmatter markers in: ${relativePath}`);
                 frontmatterErrorCount++;
                 continue; // Skip to next file
            }

            // 5. Write updated content back to current file
            await fs.writeFile(currentFilePath, updatedContent, 'utf-8');
            console.log(`[SUCCESS] Added URL to: ${relativePath}`);
            addedCount++;

        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`[WARN] Old file not found: ${relativePath}`);
                notFoundInOldRepoCount++;
            } else {
                console.error(`[ERROR] Processing ${relativePath}: ${error.message}`);
                writeErrorCount++; // Assume other errors are write related for now
            }
        }
    }

    console.log(`\n--- Processing Summary ---`);
    console.log(`Total files checked: ${processedCount}`);
    console.log(`URLs successfully added: ${addedCount}`);
    console.log(`Files not found in old repo: ${notFoundInOldRepoCount}`);
    console.log(`'url:' missing in old file: ${urlMissingInOldFileCount}`);
    console.log(`Errors finding frontmatter: ${frontmatterErrorCount}`);
    console.log(`Other errors (read/write): ${writeErrorCount}`);
    console.log(`--------------------------`);
}

processFiles();
```
