---
title: Write a Code Changelog Entry
lede: Create structured and informative changelog entries for code changes
date_authored_initial_draft: 2025-03-17
date_authored_current_draft: 2025-04-06
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A code changelog entry UI with structured sections for features, fixes, and improvements. Visuals include version tags, code snippets, and a collaborative editing space, symbolizing organized code history tracking."
portrait_image: "https://img.recraft.ai/tA0aCSdbZt-iuxg-j0atj7Q9Hwi7lQH9OQtT-ywGy_I/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/22a14c22-ecbd-43f7-8436-04e7b4a3c16e"
site_uuid: fe4fbbd8-79d7-49ce-90a0-4d027424ec28
tags:
  - Changelog
  - Documentation
  - Version-Control
  - Code-Changes
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/dNjC71HZTzhuGsVvZr7XPTmU5hs1U913AIyJ2qzKBBU/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/cce8391e-96bf-4f25-aee5-1cf825546b78
---

> Option Set for 'Changelog Type':
> 1. Code Changes (content/changelog--code)
>    - Build scripts
>    - Components
>    - Functions
>    - Configuration
>    - Dependencies
>    - Testing
>
> 2. Content Changes (content/changelog--content)
>    - Markdown files
>    - Documentation
>    - Prompts
>    - Specifications
>    - Markdown Templates
>    - Frontmatter YAML

# Goals
Create an informative changelog entry that documents changes to code or content in a structured, searchable format.

### IMPORTANT: File Location and Naming
1. **Absolute Directory Path:**
   ```
   /Users/mpstaton/code/lossless-monorepo/content/changelog--code/
   ```

2. **Relative Directory Path:**
   ```
   content/changelog--code/
   ```

3. **Filename Format:**
   ```
   YYYY-MM-DD_XX.md
   ```
   Where:
   - `YYYY-MM-DD` is today's date (e.g., 2025-04-07)
   - `XX` is a sequential number (01, 02, 03...) for multiple entries on the same day
   - Example: `2025-04-07_02.md`

4. **How to determine the next number:**
   - List the directory contents to find the highest number for today's date
   - If no entries exist for today, start with `01`
   - If entries exist (e.g., `2025-04-07_01.md`), use the next number (e.g., `2025-04-07_02.md`)

### Implementation Requirements

### 1. Frontmatter Structure

**NOTE**: All category or tag values must be in Train-Case, this is important becasue of how various content processors, publishers, creation and management tools can handle using classifier strings.  

```yaml
---
title: "Brief, descriptive title of changes"
date: YYYY-MM-DD
authors: 
- Author Name # authors must be in an array list syntax
augmented_with: "Windsurf on Claude 3.5 Sonnet"
category: "Technical-Changes | Documentation | Content-Updates" # this is the CATEGORY of the change.
date_created: YYYY-MM-DD # this is the FILESYSTEM record of the date created
date_modified: YYYY-MM-DD # this is the FILESYSTEM record of the date modified
tags: 
- Tag-One
- Tag-Two
- Tag-Three
---
```

### 2. Content Structure

All section delimiters must be in "***" syntax, as "---" is reserved for frontmatter. Including "---" in section delimiters will cause system wide errors that will be difficult to detect and revert.

```markdown
# Summary
Brief overview of changes in 1-2 sentences.

## Why Care
Brief explanation of why the changes are important, how they can be impactful, and why any reader should care.  

# Implementation

## Changes Made
- Detailed list of specific changes
- Include file paths ALWAYS
- Include tree structure output when many files are impacted. 
- Document dependencies added/removed
- Configuration changes

## Technical Details
- Implementation specifics
- Code samples WITH PATHS TO FILES
- Code syntax or style choices that impact readability for others. 
- Performance impacts

## Integration Points
- How changes connect to other components
- Required updates in other areas
- Migration steps if needed

## Documentation
- Links to related documentation
- Examples of usage
- API changes if applicable
```

### 3. Changelog Rules

1. **Specificity**:
   - Use precise, technical language
   - Include version numbers
   - Reference specific files and functions

2. **Completeness**:
   - Document ALL files that received changes
   - Use 'git status' and 'git diff' to "remember" our changes in context window. 
   - Include both additions and removals
   - Note any deprecations

3. **Context**:
   - Explain WHY changes were made
   - Document impact on existing code
   - Note any alternatives considered

4. **Organization**:
   - Group related changes
   - Use consistent formatting
   - Follow section structure

5. **Integration**:
   - Link to related issues/PRs
   - Reference related changelogs
   - Document dependencies

## Example Entries

Example entries can be found in the 
`content/changelog--code` directory.  

Assume that the most recent entries are the best examples.
