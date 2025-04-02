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