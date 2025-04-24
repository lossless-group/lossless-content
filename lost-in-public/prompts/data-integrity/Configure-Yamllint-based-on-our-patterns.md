---
title: Configure Yamllint based on our patterns
lede: Configure Yamllint based on our patterns
date_authored_initial_draft: 2025-03-23
date_authored_current_draft: 2025-03-23
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A configuration file open in a code editor, with YAML syntax highlighted and validation checks visible. Visual cues of correct and incorrect patterns, a settings panel, and a focus on structured, well-organized data. The scene conveys clarity, precision, and adherence to coding standards."
site_uuid: ce3bcb76-a49d-4ec9-961e-f96fd9203fbe
tags:
  - Data-Integrity
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/YQmLdu_P3HWV0ob11jg827S4UZsYFzFzOoCTUv_TQaU/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/055026cc-d643-4f8a-90c9-78e8a73aebee
---
I have installed through homebrew an open source library called Yamllint. 

# Goal

### End Goal
I want us to audit and possibly fix all YAML irregularities in one of our content files, right now in the directory at project root called 'tooling-clone' 

For this, I want us to use Yammlint on the markdown file contents of the 'tooling-clone' dir. About 1K files.  

This requires staying familiar with our own pattern documentation of irregularities we have found in our YAML, and also the peculiar flavor of syntax that is unacceptable or undesired given we use Obsidian to manage our Markdown content. 

This will require knowing enough about Yamllint to configure it. 
https://github.com/adrienverge/yamllint?tab=readme-ov-file

### Immediate Goal
I want you to help me write a very effective, STEP-BY-STEP Prompt, IN THIS FILE, as this task may be complex and multi-step. 

## Necessary documentation
The documentation is https://yamllint.readthedocs.io/en/stable/quickstart.html#running-yamllint . 
  
If you read the documentation, you will find that you can configure Yamllint, https://yamllint.readthedocs.io/en/stable/configuration.html#  
  
In order to do that, we need to go through the rules.   
https://yamllint.readthedocs.io/en/stable/rules.html

# Step by Step

## 1. Read Documentation and share understanding
Go through the documentation and detail in Cadence how we should solve this problem and how I should set up this prompt so we can take it step by step.  

We need to account for two things:
1) Your memory and context window is probably not big or long enough to get through this task without you losing track of things. 
2) I need to be able to adapt to how we are working through things, so I will be adjusting this file and re-running it. 

## 2. Iterate on Prompt

## 3. Configure Yamllint

### 4. Do limited test runs to get reporting.

### 5. Run on entire directory 'tooling-clone'