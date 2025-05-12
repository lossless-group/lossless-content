---
title: Maintain Robust Commenting in our Flavor
lede: "Unlock the power of readable, maintainable code with our signature commenting style—section openers, function docs, and clarity-first annotation for every project."
date_authored_initial_draft: 2025-03-25
date_authored_current_draft: 2025-03-30
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-22
image_prompt: "A code editor glowing with vibrant, multi-colored comment blocks, section banners, and function documentation, radiating clarity and best practices."
publish: true
site_uuid: 0ab1abf6-701e-41e6-bf14-957e016a5448
tags: [Code-Style, Documentation, Code-Comments, Readability]
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_portrait_image_Maintain-Robust-Commenting-in-our-Flavor_ea5a9fde-4b59-4a71-8695-8b7840695f38_1LrygDn75.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_banner_image_Maintain-Robust-Commenting-in-our-Flavor_77fc4c67-722e-4e50-aac5-9ac897029f61_GUxLMTmjG.webp
---
### Coding Guidelines

- Declare types inline. Aggregate a list of the types information in the comment sections

## Comment Syntax and style. 

1. This is a **section opener**. 
```javascript
/* section open ==============================================================
|
| ??-- About: Section Name
| ??-- Type: User Options
|
| ??-- Includes: 
| //---- List  
| //---- of   
| //--

====================================== */
```
2. This is a **section closer**. 

```javascript
/* ========================================
??-- Affects: 
//----   list of 
//----   code blocks 
//----   that this section affects
// 
// Close: Section Name
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
```

3. This is **function opener** template.
```javascript
/* function: -------------------------------------------------->

??-- Purpose
   //-- Lines describing desired functionality
   --- continued from previous line.
-->

??-- Logic
   //-- Explain how this function would be called
   ---- with arguments and arguments
   ---- 1. with steps and steps
-->
----------------------------------------*/
```

An example:
```javascript
/* export function: -------------------------------------------------->

??-- Purpose:
   //-- Turn all backlink syntax into relative path hrefs 
   ---- in the Markdown file or Markdown files passed through parameters.
-->

??-- Logic:
   //-- Called form page rendering from rendered Astro components. 
   ---- 1. Receives an array of paths to Markdown files or one Markdown file. 
   ---- 2. Creates an empty array `backlinksFoundInMarkdownContent`.
   ---- 3. Adds to array when regex matches backlink syntax '[[${Page Name]]' 
   ---- 4. Scans an index of pageName keys to match the string inside the square brackets. 
   ---- 5. Replaces the backlink syntax with the relative path href. 
-->
----------------------------------------*/
```

4. This is **function closer**.
/* returns: ----------------------------->
      - object or value explanation
      - object or value explanation
   to:
      list of places where this function is called. 
      - functionName, fileName.ts
end function --------------------------------------------------*/