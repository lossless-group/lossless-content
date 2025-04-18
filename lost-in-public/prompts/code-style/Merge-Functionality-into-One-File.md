---
title: Suggest a Non-Destructive Refactor
lede: Provide recommendations for improving code organization and structure while preserving functionality and maintaining existing patterns
date_authored_initial_draft: 2025-04-15
date_authored_current_draft: 2025-04-15
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: Prompted
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-19
image_prompt: "A thoughtful developer reviewing code and suggesting improvements, surrounded by branching diagrams and preserved legacy code, symbolizing careful, non-destructive refactoring."
site_uuid: a41c3eaa-5ce4-4773-a8b8-4666990571f4
tags: [Code-Style, Refactor, Code-Quality, Maintainability]
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/tAHiPbpq3D5VqxnwgeSoUee2V44GsyHBdguUjushaUU/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/ed1a0f67-8433-412d-9195-81a65ca654d4
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





