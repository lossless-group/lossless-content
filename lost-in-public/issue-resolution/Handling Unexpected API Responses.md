---
title: Handling Unexpected API Responses
lede: Robust strategies for normalizing and integrating unpredictable API data into observer pipelines and frontmatter logic.
date_authored_initial_draft: 2025-04-18
date_authored_current_draft: 2025-04-23
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: Draft
augmented_with: Cascade AI
category: Api-Response-Normalization
site_uuid: 89270980-521b-4598-93c7-37e3b67b01d2
date_created: 2025-04-18
date_modified: 2025-04-23
tags:
  - Api-Integration
  - Observer-Pipeline
  - Data-Normalization
  - Error-Handling
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/pm8_ivAUkMGNApVQAhb1UKWpza_dJF4nDDGl_h5OYCU/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/31a3518d-7159-4ce1-9873-fa3ea7860db8
image_prompt: An API response with unpredictable shapes (strings, arrays, objects) being normalized into a clean, structured frontmatter block.
banner_image: https://img.recraft.ai/bXzXzWUIFjCz7t50bmEvrMyFC9dQGaO9SRBm2mEV_N4/rs:fit:2048:1024:0/raw:1/plain/abs://external/images/b6550e88-5541-42bd-a842-d3ff4d693b78
---

# Handling Unexpected API Responses

## Output Directory
`/content/lost-in-public/issue-resolution`

## Disambiguation
This Issue Resolution is for developers and future AI coding assistants who encounter unpredictable or inconsistent API responses when integrating third-party or internal APIs into observer logic, frontmatter enrichment, or similar pipelines. 

## Context
We needed to robustly handle API responses in our observer pipeline, especially when enriching Markdown frontmatter with OpenGraph and Screenshot data. APIs may return fields as strings, objects, arrays, or even unexpected types. Rigid expectations led to silent errors, infinite loops, or skipped updates.

## Pattern
1. **What were we trying to do and why?**
   - Integrate OpenGraph/Screenshot APIs to enrich Markdown frontmatter, expecting fields like `og_image` to always be a string URL.
2. **Incorrect Attempts**
   - Wrote code that assumed `og_image` would always be a string. When the API returned `{ url: "..." }`, the observer failed to recognize the field as present, causing repeated unnecessary updates.
   - Example of problematic response:
     ```json
     "og_image": { "url": "https://example.com/image.png" }
     ```
   - Another problematic case: field is an array, or missing entirely.
   - This led to logic like:
     ```typescript
     if (typeof frontmatter.og_image === 'string' && frontmatter.og_image.length > 0) { /* present */ }
     ```
     which failed for objects/arrays.
3. **The "Aha!" Moment**
   - Realized that API responses are inherently unpredictable. We must always normalize fields before using them in logic or writing to frontmatter.
   - Decided to centralize normalization and presence checks, never assuming a field type.
4. **Final Solution**
   - Created a utility function to normalize any field value to a string, handling strings, objects with `.url`, arrays, and logging unknown types.
   - Used this utility for all frontmatter merging and presence checks.
   - Example utility:
     ```typescript
     /**
      * Normalize a value received from an API for use in frontmatter.
      * Handles strings, objects with `.url`, arrays, and logs unknown types.
      */
     export function extractStringValueForFrontmatter(fieldValue: unknown): string | undefined {
       if (typeof fieldValue === 'string') return fieldValue;
       if (Array.isArray(fieldValue) && fieldValue.length > 0) {
         return extractStringValueForFrontmatter(fieldValue[0]);
       }
       if (typeof fieldValue === 'object' && fieldValue !== null) {
         if ('url' in fieldValue && typeof fieldValue.url === 'string') {
           return fieldValue.url;
         }
       }
       // Optionally log unexpected types for future debugging
       console.warn('[Frontmatter] Unexpected API field type:', fieldValue);
       return undefined;
     }
     ```
   - Updated all observer and service logic to use this utility for merging/checking fields.
   - Now, regardless of API quirks, the observer never errors or loops on unexpected data shapes.

## Key Learnings
- **Never trust API response types.** Always normalize before using in logic.
- **Centralize normalization logic.** Use a single utility everywhere.
- **Log and handle unknown types gracefully.** Never throw; always continue.
- **Document the pattern.** Leave breadcrumbs for future developers and AI assistants.

## Best Practices for Next Time
- Always write defensive, resilient code for API integrations.
- Add tests for all expected and unexpected field types.
- Keep issue resolutions like this up to date as new edge cases emerge.