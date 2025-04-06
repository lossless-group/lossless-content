---
title: 'Suggest a Non-Destructive Refactor'
lede: 'Suggest a non-destructive refactor of the code'
date_authored_initial_draft: 2025-04-03
date_authored_current_draft: 2025-04-03
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.1'
authors: Michael Staton
status: To-Do
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
tags:
- Code-Style
- Refactor
---

## Prompt

### Goal

Suggest a non-destructive refactor of the code.

### Context

1. **Current Code**: The code to be refactored is provided in the input.
2. **Refactor Type**: The refactor should be non-destructive, meaning it should not modify the original code.
3. **Refactor Scope**: The refactor should be focused on improving the code's structure, readability, and maintainability.
4. **Refactor Output**: The output should be a list of suggested refactors, each with a description and a code snippet.

### Output

1. **Refactor List**: A list of suggested refactors, each with a description and a code snippet.
2. **Refactor Output**: The output should be a list of suggested refactors, each with a description and a code snippet.

### Example

```javascript
// Input
const foo = 1;

// Output
const foo = 1;
```