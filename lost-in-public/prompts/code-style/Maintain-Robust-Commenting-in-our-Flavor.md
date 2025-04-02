---
date_created: 2025-03-26
date_modified: 2025-03-31
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
