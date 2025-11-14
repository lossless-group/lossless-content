---
title: Broken YAML Key Replacement Workflow
lede: Documenting a critical workflow bug and its resolution for YAML key replacement in Markdown frontmatter.
date_reported: 2025-04-21
date_resolved: 2025-04-21
date_last_updated: null
at_semantic_version: 0.0.0.1
status: Implemented
augmented_with: Windsurf Cascade on GPT 4.1
category: Frontmatter-Automation
affected_systems: Content-Collections
tags: [Content-Automation, Frontmatter-Automation, Data-Integrity]
site_uuid: 39b576cc-43ef-4542-8a11-c4cdeea23870
date_created: 2025-04-21
date_modified: 2025-11-11
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_portrait_image_Broken-YAML-Key-Replacement-Workflow_d6e750af-63bc-447f-86b6-17a9c6ff5846_jx3E7-t3V.webp
image_prompt: "Automated script replacing YAML keys in a batch of Markdown files, with before/after code blocks and a green checkmark for success."
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_banner_image_Broken-YAML-Key-Replacement-Workflow_1de5dbca-4493-4955-a601-a3cb57ba5758_jVW3IbXCy.webp
---
# What were we trying to do and why

We needed to batch-replace the `banner_image` key with `portrait_image` in the YAML frontmatter of all Markdown files in `content/lost-in-public/prompts/`. This was required to align with updated content conventions and to prevent breakages in downstream processing and rendering.

# Incorrect Attempts and the Problem

- The script (`convertKeyNamesInYAML.cjs`) was run repeatedly and reported that files were corrected, but **no actual replacements were made in the Markdown files**.
- The script logic only matched `banner_image:` if it appeared at the very start of the line (after `.trim()`), so it missed indented, quoted, or otherwise valid YAML forms of the key.
- Critically, even when a match was found and a replacement was made in memory, the script **did not write the modified content back to disk**. The result: the frontmatter in all files remained unchanged, despite the script's output claiming otherwise.

# "Aha!" Moment

- Realized that the script's `convertKeyNames` function returned the corrected content, but the main workflow never wrote it back to the file system.
- Also realized the matching logic needed to be robust to all YAML-valid key forms (quotes, spaces, indentation).

# Final Solution

1. **Patched the matching logic** to use a regex that matches any YAML-valid `banner_image` key (handles quotes, indentation, and spacing).
2. **Patched the main workflow** to write the corrected content back to the file if a change was made.
3. **Re-ran the script** and verified that all Markdown files were actually updated on disk, and the report accurately reflected the changes.

## Key Code Snippet (Write-Back Logic)
```js
const results = await Promise.all(markdownFiles.map(async (markdownFilePath) => {
    const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
    const result = await convertKeyNames(markdownContent, markdownFilePath);
    if (result.modified && result.content) {
        fs.writeFileSync(markdownFilePath, result.content, 'utf8');
    }
    return result;
}));
```

# Lessons for Future Issue Resolution

- Always verify that a script making content changes actually writes those changes to disk.
- Always test regexes for YAML key matching against real-world, messy data.
- Never trust a script's output until you confirm the actual files are changed.
- Add logging for every file actually modified.

# Output Directory
`/content/lost-in-public/issue-resolution/`

# Related Prompt
- [Write-an-Issue-Resolution-Breadcrumb](../prompts/workflow/Write-an-Issue-Resolution-Breadcrumb.md)

---
