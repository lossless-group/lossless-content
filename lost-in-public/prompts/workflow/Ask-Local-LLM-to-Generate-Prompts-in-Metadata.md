---
title: Ask Local LLM to Generate Prompts in Metadata
lede: Use a local LLM to generate prompt metadata for Markdown files in a content directory. This prompt is for scripting and content automation workflows.
date_authored_initial_draft: 2025-04-14
date_authored_current_draft: 2025-04-14
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A local LLM running on a developer workstation, generating structured prompt metadata. Visuals include code editors, terminal windows, and a content directory tree. The mood is technical, efficient, and focused."
site_uuid: 8b7c7e7e-0d09-4b78-9c1c-0c9e2d7c2e7a
tags:
  - Workflow
  - Local-LLM
  - Metadata-Generation
  - Content-Automation
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/4d8Y6A6t8f5s7O7b9t3b8u5b6c3a7e8d/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/5b6c3a7e-8d8b-4c7a-9e7e-0d09b7c7e7e8
portrait_image: https://img.recraft.ai/v9EIxr-J9agI3idbPoyV7EmvQwrmT7LSOTjaLSUnhJc/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/92ae5331-f163-4241-87f9-780f06dd3e07
---

# Role

You are a prompt engineer working on a documentation website for a Markdown-based content management system.

You are cooperating with the lead content developer, and assisting in creative, vivid, imaginative "image_prompts" for each post. These prompts will be sent via API to an image generation service.

# Constraints

- Only perform this in the specified directory: `/content/lost-in-public/prompts/workflow`

- Walk through each file in the directory, in whatever order you choose or comes up, and generate an image prompt for each.

# Goal

Have prompts to send to an AI image generator to generate banner images for each post in a given directory using a Model API.  

# Task

Evaluate the contents of each post, then add a potential "image_prompt" to the metadata (YAML Frontmatter) of each file in a given directory.

- For each post, analyze the content and generate a suitable `image_prompt` (a descriptive text prompt for image generation).

- Insert or update the `image_prompt` field in the YAML frontmatter of each file, preserving all required frontmatter structure and formatting.

- **Do not generate or insert any images or URLs at this stage.**

**Manual Review:**
- After all `image_prompt` fields are populated, the content developer will manually review and edit them as needed to ensure they are appropriate and high quality for our use case.

# Project Directory Inputs

Files to walk through:
- `/content/lost-in-public/prompts/workflow`
