---
date_created: 2025-03-26
date_modified: 2025-03-26
---
We're using `.passthrough()` which means we're not enforcing any schema validation on the incoming data. This is in line with your memory about avoiding hard validation for frontmatter, but we can still be more explicit about the type we expect after the transformation.

```typescript
// site/src/content.config.ts
// ... code above ...
// The .passthrough seems to do the magic. 
const changelogContentCollection = defineCollection({
  loader: glob({pattern: "**/*.md", base: "../content/changelog--content"}),
  schema: z.object({}).passthrough().transform((data) => ({
    ...data,
    // Ensure tags is always an array, even if null/undefined in frontmatter
    tags: Array.isArray(data.tags) ? data.tags : [] as string[],
    authors: Array.isArray(data.authors) ? data.authors : [] as string[],
    // Map snake_case context_setter to camelCase contextSetter, ensuring string type
    contextSetter: (data.context_setter ?? "") as string
  }))
});

const changelogCodeCollection = defineCollection({
  loader: glob({pattern: "**/*.md", base: "../content/changelog--code"}),
  schema: z.object({}).passthrough().transform((data) => ({
    ...data,
    // Ensure tags is always an array, even if null/undefined in frontmatter
    tags: Array.isArray(data.tags) ? data.tags : [] as string[],
    authors: Array.isArray(data.authors) ? data.authors : [] as string[]
  }))
});
//... code below ...
```