---
title: "Computing Entry Object Values in Astro"
lede: "A practical guide to ensuring content collections in Astro have complete and valid entry objects for reliable builds."
date_authored_initial_draft: "2025-04-12"
date_authored_current_draft: "2025-04-23"
at_semantic_version: "v0.9.3"
status: "Complete"
augmented_with: "Windsurf Cascade on GPT 4.1"
category: "Content Collections and Build Validation"
tags:
  - Astro
  - Content-Collections
  - Data-Validation
  - Build-Pipelines
site_uuid: 51aa9c01-1f74-4894-8f6f-74ea83492323
date_created: 2025-04-12
date_modified: 2025-04-23
authors:
  - "Michael Staton"
portrait_image: ""
image_prompt: "Astro logo assembling puzzle pieces labeled 'title', 'slug', and 'aliases' into a complete data object, with a background of code and a successful build checkmark."
banner_image: ""
---

# Computing Entry Object Values in Astro

## Issue
When building the vocabulary collection in Astro, entries were missing required properties (title, slug, aliases) in their data objects, causing build failures.

## Resolution Path
1. First attempted to fix in `content.config.ts` transform function
2. Discovered the transform wasn't being called correctly
3. Restored working commit `2aff6b338cac` to get back to stable state
4. Identified that `getStaticPaths` in `[vocabulary].astro` needed to handle data properties
5. Modified `getStaticPaths` to properly compute and assign:
   - title (in title case from filename)
   - slug (in kebab-case from filename)
   - aliases (defaulting to empty array)

## Key Changes
```typescript
// Create a new entry with updated data
const updatedEntry = {
  ...entry,
  data: {
    ...entry.data,
    title,
    slug,
    aliases: entry.data.aliases || []
  }
};
```

## Verification
- Build succeeded with `pnpm build`
- Logs showed entries had proper properties:
```
Entry: {
  id: 'workflow-automations',
  title: 'Workflow Automations',
  slug: 'workflow-automations'
}
```

## Related Files
- `src/pages/more-about/[vocabulary].astro`
- `src/content.config.ts`

## Git Commit
```
works(entry): entry object now getting the right properties assigned to data object
```