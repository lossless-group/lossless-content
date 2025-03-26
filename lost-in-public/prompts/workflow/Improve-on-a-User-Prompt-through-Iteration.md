---
title: Ask the AI Code Assistant to Improve your Prompts
lede: Takes one to know one. Ask the AI Code Assistant to improve your prompt before you ask it to execute it.  
date_authored_initial_draft: 2025-03-25
date_authored_current_draft: null
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.1'
authors: Michael Staton
status: To-Prompt
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
tags:
- Prompt-Engineering
- Code-Generators
- AI-Human-Workflow
---






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
``