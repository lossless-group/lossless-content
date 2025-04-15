---
title: Ask the AI Code Assistant to Improve your Prompts
lede: Takes one to know one. Ask the AI Code Assistant to improve your prompt before you ask it to execute it.
date_authored_initial_draft: 2025-03-22
date_authored_current_draft: 2025-03-03
date_authored_final_draft: null
date_first_published: null
date_last_updated: 2025-03-23
date_first_run: 2025-03-23
at_semantic_version: 0.0.0.2
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_modified: 2025-04-12
date_created: 2025-04-09
tags:
  - Prompt-Engineering
  - Code-Generators
  - AI-Human-Workflow
authors:
  - Michael Staton
image_prompt: "An AI assistant and user collaboratively editing a prompt, surrounded by evolving prompt bubbles, code suggestions, and feedback loops. Visuals include arrows showing iteration and a sense of creative, continuous improvement."
banner_image: https://img.recraft.ai/5wPrIwgT9NCfPYHc0XmgfKK6jQil0-0Xo6LW_m3uuPY/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/4bea8756-318a-4074-baf4-2ad3dcf2b2a4
---

# Constraints
Do not be destructive, if there is content already there the user will decide on edits. 
Summaries and bullets are good, but meaningless fluff is not good. Don't be vague.  

# Flow and Props, Flow and Props
The most important aspect of iterating on a prompt is to explain the sequence of components, and how data is passed through the system. 

Even though we don't want to use detailed validation through TypeScript, so we don't want the full data model in the `content.config.ts`, it's helpful to detail what an IDEAL example of the data that is being passed around is.  

How does the data get loaded? From what file?  What is the user entry point? 
How is data transformed? Where is the output and what is the purpose?  

# Audience
The audience is your future self!  Imagine you are being asked to recreate the solution to the prompt all over again, and you don't want to tax the Anthropic API, cause Windsurf to crash, or become anxious with reckless attempts that don't work.  

You want to calmly work through the prompt and end up at more or less the same result.  

# Examples

## Example of helpful bullets:
```text
about.astro (entry)
  → Information.astro (content fetcher)
    → pages collection (content source)
      → Layout.astro (base layout)
        → Final HTML
```

## Example of helpful Mermaid diagrams:

#### Architecture Overview

```mermaid
graph TD
    A[Markdown File] --> B[Extract Frontmatter]
    B --> C{Error Detection}
    C --> |Error Found| D[Apply Correction]
    C --> |No Error| E[Success Report]
    D --> F[Validate Fix]
    F --> |Success| G[Write Changes]
    F --> |Failure| H[Error Report]
    G --> I[Generate Report]
```

## Example of code snippets with contextual comments:
## Configuration
```javascript
/**
 * User-configurable options for commit generation
 * @type {DirectoryConfig}
 */
const USER_OPTIONS = {
    // Target directory name within content
    TARGET_DIR: 'tooling',
    
    // Full path constructed from TARGET_DIR
    // DO NOT MODIFY - this is automatically generated
    TARGET_PATH: `site/src/content/${TARGET_DIR}`,
    
    // Date format for changelog entries
    DATE_FORMAT: 'YYYY-MM-DD',
    
    // Process subdirectories recursively
    ALL_FILES_RECURSIVELY: true
};

/**
 * Template for generating commit messages
 * @type {CommitMessage}
 */
const COMMIT_TEMPLATE = {
    type: 'content-updates, mundane:',
    title: '',
    body: {
        summary: [
         
        ],
        files: []
    }
};
```