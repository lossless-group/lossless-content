---
title: 'Write a Code Changelog Entry'
lede: 'Create structured and informative changelog entries for code changes'
date_authored_initial_draft: 2025-03-18
date_authored_current_draft: 2025-03-20
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.2'
authors: 
- Michael Staton # use array list syntax even when there is only one author.
status: To-Do
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet' # Note the model you are using. 
category: Prompts
tags:
- Changelog
- Documentation
- Version-Control # tags must be bare, always be in Train-Case, and be in an array list syntax
- Code-Changes
date_created: 2025-03-23
date_modified: 2025-03-24
---

> Option Set for 'Changelog Type':
> 1. Code Changes (site/src/content/changelog--code)
>    - Build scripts
>    - Components
>    - Functions
>    - Configuration
>    - Dependencies
>    - Testing
>
> 2. Content Changes (site/src/content/changelog--content)
>    - Markdown files
>    - Documentation
>    - Prompts
>    - Specifications
>    - Markdown Templates
>    - Frontmatter YAML

# Goals
Create an informative changelog entry that documents changes to code or content in a structured, searchable format.

### Working Directory for the Changelog:
`site/src/content/changelog--code`

### Filename Requirements:
`YYYY-MM-DD_${indexCount}.md` where `YYYY-MM-DD` is the date of the change, and `indexCount` is the number of the changes documented for that day.  If you don't remember, just look at the last file in the directory.  

## Implementation Requirements

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
