---
title: 'Reintroduce something that worked.'
lede: 'Speed up time to solution by asking an AI Code Assistant to draw from old code.'
date_authored_initial_draft: 2025-04-21
date_authored_current_draft: 2025-04-21
date_authored_final_draft: null
date_first_published: null
date_last_updated: 2025-04-21
date_first_run: 2025-04-21
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
date_modified: 2025-07-20
date_created: 2025-04-21
image_prompt: "An AI assistant and user collaboratively editing a prompt, surrounded by evolving prompt bubbles, code suggestions, and feedback loops. Visuals include arrows showing iteration and a sense of creative, continuous improvement."
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_portrait_image_Reintroduce-something-that-Worked_9b6e5c06-4079-4459-bd20-a994afc3c0fc_BCHJiKG-P.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_banner_image_Reintroduce-something-that-Worked_34504b8a-22d0-4c58-beac-8f6f9d46f35a_bYGzgrAME.webp
site_uuid: cfac0a85-2718-45cb-9e8b-99b7e6327e11
tags: [Prompt-Engineering, Code-Generators, AI-Human-Workflow, Model-Context-Protocols, Refactoring]
authors:
  - Michael Staton
---
# Constraints
Do not blindly copy old code.  Instead, review the parts of the code that worked and are specific to this ask.  

Do not bring in functionality with dependencies, references to imports that do not exist, or other parts of the code that will cause problems.  Instead, analyze both 1) the old code that was required to make it work, and 2) the new code AS A WHOLE (including related and connected files) to identify how similar functionality in the old code could be implemented in the new code. 

Share your analysis first, we need to agree on an implementation plan. 

WE HAVE REPORTING STANDARDS:
`content/lost-in-public/reminders/Maintain-Consistent-Reporting.md`
`content/lost-in-public/reminders/Maintain-Consistent-Reporting-Templates.md`

# Inputs: Old Code
`site_archive/observers/v3_fileSystemObserver.ts`
`site_archive/observers/v2_fileSystemObserver.ts`
`site_archive/observers/v1_fileSystemObserver.ts`

## Desired Functionality:
Some of the previous implementations of the `fileSystemObserver.ts` were successfully able to aggregate changes and generate reporting: 1) an "initial run" report, 2) a periodic report, and 3) a final report generated on shut down.  

FOR THIS MOMENT, I **_only want the final report_** on shut down. 

What should be happening is that any subsystems, whether they are watchers, services, or utilities, should be sending the required information to generate a report.  This information should cue up in memory, and then when I shut down the observer it should WRITE THE REPORT TO FILE. 

# Outputs: New Code
`tidyverse/observers/fileSystemObserver.ts`
`tidyverse/observers/watchers/remindersWatcher.ts`
`tidyverse/observers/services/openGraphService.ts`
`tidyverse/observers/services/reportingService.ts`

## Known related code. 