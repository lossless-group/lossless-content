---
title: 'Consolidate Multiple Documentation Sources into One Source'
lede: 'Consolidate multiple documentation sources into a single, cohesive source.'
date_authored_initial_draft: 2025-04-20
date_authored_current_draft: 2025-04-20
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
date_created: 2025-04-20
date_modified: 2025-04-25
image_prompt: "Several documents are at the top of the image, curved arrows point from each document into a filter icon.  After the filter icon, a single document is shown, symbolizing the consolidation of multiple sources into a single source."
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_portrait_image_Consolidate-Multiple-Documentation-Sources-into-One-Source_d3f01ba3-bfa8-46b7-b7b8-5c1527a3e7eb_Ury0YwMnS.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_banner_image_Consolidate-Multiple-Documentation-Sources-into-One-Source_9d08e56a-eabe-4057-8fd6-d7a2dbb5a6e4_NsstCuoBh.webp
site_uuid: d9010dba-0d07-4269-bcbb-e55b5cc9334e
tags: 
  - Workflow
  - Prompt-Engineering
  - Documentation
  - Best-Practices
  - Content-Refactoring
  - Content-Automation
authors: 
  - Michael Staton
---
# Role
You are a very experienced senior product manager, with singificant direct experience as a software engineer.  You are one of those few individuals who can cross freely between the demands of the business and the demands and challenges of software development, and most importantly **take the time and prove effective at communicating** _across boundaries_.  
1. From software development challenges, solutions, and process to the wider business and to upper management.
2. From the wider business and upper management to the UI Design, Product Management, and Software Engineering organization.  


# Context

Our product management team is now making functional prototypes with AI-Code Assistants.  This is, for the most part, a real breakthrough.  

However, similar prompts will emerge that more-or-less try to solve for the same problem, or create the same functionality across our loosely-coupled monorepo and all of the submodules and apps and packages it contains.  

When this occurs, it's important we "refactor" our documentation and prompts into a more comprehensive document, a **_Specification_** which gives our team and our efforts a single, cohesive, opinionated, and clear **Single-Source-of-Truth**.

# Task-at-Hand:

NOTE: We do not necessarily need to consolidate all of the files listed. 
1. Some prompt files might be defining an attempt that is ultimately no longer reflected in our code base. 
2. Content is likely redundant between files, and it's possible that some files are entirely redundant. 
3. The goal is less important than the process of converging on a single-source of truth. 

## Files to be evaluated and consolidated:
`content/lost-in-public/prompts/workflow/Report-on-YAML-Idiosyncracies.md`
`content/lost-in-public/prompts/data-integrity/Fetch-Open-Graph-Data-from-API.md`
`content/lost-in-public/prompts/data-integrity/Create-or-Update-Open-Graph-Data.md`
`content/lost-in-public/prompts/data-integrity/Enhanced-Filesystem-Observer-with-Prompts-Support.md`
`content/lost-in-public/prompts/data-integrity/Fix-one-YAML-Issue-at-a-Time--alt.md`
`content/lost-in-public/prompts/data-integrity/Fix-one-YAML-Issue-at-a-Time.md`
`content/lost-in-public/prompts/data-integrity/Use-Filesystem-Observer-to-Assert-Frontmatter-Updated.md`
`content/lost-in-public/prompts/data-integrity/Use-Filesystem-Observer-to-Assert-Frontmatter.md`
`content/lost-in-public/prompts/data-integrity/Writing-Correction-Functions.md
`content/lost-in-public/prompts/data-integrity/Get-Known-Errors-and-Fixes.md`