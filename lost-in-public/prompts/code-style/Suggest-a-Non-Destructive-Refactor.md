---
title: Suggest a Non-Destructive Refactor
lede: Provide recommendations for improving code organization and structure while preserving functionality and maintaining existing patterns
date_authored_initial_draft: 2025-04-02
date_authored_current_draft: 2025-04-02
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: Prompted
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-23
image_prompt: A thoughtful developer reviewing code and suggesting improvements, surrounded by branching diagrams and preserved legacy code, symbolizing careful, non-destructive refactoring.
publish: true
site_uuid: ec9c0247-4458-41e0-b703-316b5b44a376
tags: 
  - Code-Style
  - Code-Quality
  - Maintainability
  - Refactoring
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/code-style/2025-05-04_portraitimage_Suggest-a-Non-Destructive-Refactor_a151d877-5d81-4524-8d89-9afc6b690b61_mhl3pPDNR.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/code-style/2025-05-04_bannerimage_Suggest-a-Non-Destructive-Refactor_52bfcf62-3f96-4274-84c4-ca23fa62770f_py6FrIk-_.webp
---
## Prompt

### Goal

Suggest a non-destructive refactor of the code.

Specifics to this version of this prompt: 
Streamline consistent use of animations and transitions for hover states.

### Context

1. **Current Code**: The code I am seeking ideas for a refactor is provided in the input below. 
2. **Refactor Type**: The refactor should be non-destructive, meaning we must be deliberate to save any styles or patterns that could be valuable in the future.  We can move them to the site_archive submodule, for instance.  
3. **Refactor Scope**: The refactor should be focused on creating consistency of styles and patterns in our code, and of interactions in the User Experience.
4. **Refactor Output**: The output should be a list of suggested refactors in the chat.  If I agree, you may add it to the refactor plan listed in the input below.
5. **Refactor Plan**: The refactor plan is provided in the input below.

### Input

1. **Refactor Plan**: 
`content/lost-in-public/prompts/code-style/Streamline-Interaction-Design-in-CSS-states.md`


2. **Current Code**: The code to be refactored --

The following files either contain or are adjacent to subtle interactions and animations using CSS states. We should study them and come up with a plan to "converge" around one set of patterns.  These patterns should be defined and located in a way that allows any developer to identify, modify, or extend them. 

`site/src/components/articles/ArticleListColumn.astro`
`site/src/components/articles/tool-components/ToolCard.astro`
`site/src/layouts/ToolkitLayout.astro`
`site/src/components/basics/CardGrid.astro`


### Output

The Assistant shall study the code that may be refactored, and make suggestions over the chat interface of Cadence.  If the user agrees, then the Assistant shall add the refactors to the refactor plan.  If the user disagrees, then the Assistant shall continue to make suggestions until the user agrees.  The output should be a list of suggested refactors, each with a description and a code snippet.

1. **Refactor List**: A list of suggested refactors, each with a description and a code snippet.

2. **Refactor Plan**: 
`content/lost-in-public/prompts/code-style/Streamline-Interaction-Design-in-CSS-states.md`

3. **Refactor Output**: The User and the Assistant have agreed upon a plan.  
