---
title: 'Create a permanent memory for project YAML conventions'
lede: 'Eliminate frustration by observing guidelines, working within hard rules and constraints, and learning to detect YAML irregularties that could cause bugs and failures'
date_authored_initial_draft: 2025-04-19
date_authored_current_draft: 2025-04-19
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
status: Implemented
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
date_created: 2025-04-19
date_modified: 2025-04-20
image_prompt: "A robot is writing at an antique desk with a quill and ink by candle light."
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_portrait_image_Help-Write-a-YAML-property-for-a-Directory-of-Files_194d6779-c61d-4752-9e41-9f62e2d65472_EfY0L5Jz_.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_banner_image_Help-Write-a-YAML-property-for-a-Directory-of-Files_d49e031c-30d0-442c-8124-a6a57ebd2f9b_ILIUBDPO8.webp
site_uuid: a8c08e45-4629-491f-b1b8-2d85b7fa98d1
tags: 
  - Workflow
  - YAML
  - Generative-AI
  - Agentic-AI
  - Data-Integrity
  - Content-Automation
authors: 
  - Michael Staton
---
# Context

This prompt extends the permanent conventions and workflow for writing or editing YAML frontmatter in Markdown content files throughout the content library.

### Why this matters:
Missing various properties in YAML frontmatter causes improper or undesired rendering, if not flat out errors, in rendering content in our content-driven application. Errors are a frequent cause of build failures and rendering bugs in content-driven projects. By working within these conventions, we ensure content is easy to maintain, automate, and scale—whether you’re a human contributor or an AI assistant.

### Audience
- Content creators, editors, and developers working with Markdown files in this project.
- AI assistants or automation tools tasked with generating or updating YAML frontmatter.

### Why this prompt:
We have created a successful process to generate images to go with our content.  

#### Workflow
For Large Batches of Files:
Use an LLM API or automation script to add or update YAML properties across many files at once. Always validate changes with a YAML linter before committing.

**For Small Batches or Individual Files:**
Use the chat window in your tool (e.g., Cascade, VS Code, or GitHub Copilot Chat) to generate or edit YAML frontmatter. 

While the AI Assistant is at it as a copywriter, always double-check for:
- Proper opening and closing delimiters (---)
- Correct indentation and syntax
- Compare against a template if one exists, potentially noting required or suggested properties are present and valid.

#### Example:

`content/lost-in-public/prompts`

In the Prompt files, we asked an LLM Chat Client to review the files and to use creativity to write a short, vivid, descriptive "image_prompt" value as a string.  

> `image_prompt: "A bold hero section UI with a striking headline, vibrant call-to-action button, and an engaging background image. The design is modern, clean, and visually impactful, drawing attention to the main message in a web interface."`

We then ran a script to ping the [[Tooling/AI-Toolkit/Generative AI/Recraft|Recraft]] API with that image prompt, and the script returns a "banner_image" value as a url.  

We then use that `banner_image` url to render images in cards and other components that add life to content through images.  

# Task-at-Hand

Write an "image_prompt" for the files in the working directory.  Make it one to four sentences, and try to use visual imagery that will help the Recraft API generate a meaningful, clear corresponding image to the specification.  

## Do not overwrite existing image_prompt values, do not remove any banner_image values.  

Most files will not have an image_prompt value, but for those that do not, write one.   

### Working Directory:
`content/prompts`

