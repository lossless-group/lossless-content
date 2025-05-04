---
title: Suggest a Non-Destructive Refactor
lede: Provide recommendations for improving code organization and structure while preserving functionality and maintaining existing patterns
date_authored_initial_draft: 2025-04-15
date_authored_current_draft: 2025-04-15
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: Prompted
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-23
image_prompt: "A thoughtful developer reviewing code and suggesting improvements, surrounded by branching diagrams and preserved legacy code, symbolizing careful, non-destructive refactoring."
site_uuid: a41c3eaa-5ce4-4773-a8b8-4666990571f4
tags: Code-Style,Code-Quality,Maintainability,Refactoring
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/code-style/2025-05-04_portraitimage_Merge-Functionality-into-One-File_cdbced4d-bf87-41c0-9cc5-2ece0cece933_xjUjjSV84.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/code-style/2025-05-04_bannerimage_Merge-Functionality-into-One-File_ef291f50-f06a-410d-b6aa-5101e5ef08a2_lWOs2a_V2.webp
---
# Objective:

Preserve and integrate key functionality while streamlining code organization and structure. 

Enable the developers to remove redundant code and redundant files, while assuring changes will be non-breaking by changing references from old files and functions to new files and functions.

Improve coherence and fidelity of the codebase by applying known or observed patterns of naming conventions and code organization to functional code that lacks that consistency and fidelity.  

# Functionality to Preserve
> _While the developers may isolate and point to functionality they know they want to preserver, the AI Assistant is expected to surface any functionality they can observe and surface it through chat dialog._

# Input Files

`site_archive/src/utils/markdown-debugger.ts`
`site_archive/src/utils/debug/markdown-debugger.ts`

# Output Files
`site/src/utils/markdown/markdownDebugger.ts`
