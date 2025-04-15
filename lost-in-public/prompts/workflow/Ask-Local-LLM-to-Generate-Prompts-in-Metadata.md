---
title: Ask a Model API to Perform a Task via API
lede: "Guidelines for making API calls to LLM services like Claude, GPT-4, and Groq"
date_authored_initial_draft: 2025-04-14
date_authored_current_draft: 2025-04-14
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-14
date_modified: 2025-04-14
tags:
  - Workflow
  - Model-APIs
  - API-Integration
  - LLM-Services
authors:
  - Michael Staton
image_prompt: "A creative digital workspace with an AI assistant analyzing markdown files, generating imaginative image prompts, and updating YAML frontmatter. Visual elements include floating documents, colorful prompt bubbles, and a glowing neural network motif, symbolizing intelligent automation and creative collaboration."
banner_image: https://img.recraft.ai/ZyYTkKS0v3qHi7kbaF_EU5xec6So8YnFdOYXzzSReAY/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/2709fe48-2379-4bf3-b51b-66c6f36b1353
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
