---
title: 'Fixing 404 Errors in Dynamic Routes with Proper Slug Generation'
lede: 'Resolving path mismatches between URL construction and getStaticPaths in Astro dynamic routes'
date_authored_initial_draft: 2025-04-22
date_authored_current_draft: 2025-04-22
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
status: Implemented
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Issue-Resolution
date_created: 2025-04-22
date_modified: 2025-04-22
image_prompt: "A person driving a car towards a large Browser window, the Browser window is in the way of the car, and it has a big error sign on it."
site_uuid: 364d223c-d05d-48cf-9162-bbcb469e00cf
tags:
  - Astro
  - Dynamic-Routing
authors:
  - Michael Staton
---

# Fixing 404 Errors in Dynamic Routes with Proper Slug Generation

## The Challenge: 404 Errors on Valid Dynamic Routes

When implementing a dynamic route for multiple content collections in Astro (`/vibe-with/[collection]/[...slug].astro`), we encountered 404 errors when trying to access valid content. The server logs showed:

```
[WARN] [router] A `getStaticPaths()` route pattern was matched, but no matching static path was found for requested path `/vibe-with/prompts/write-a-comprehensive-squash-merge`.
```

This was happening despite:
1. The route pattern being correctly defined
2. The content existing in the collection
3. The URL being correctly constructed in the PostCard component

## Incorrect Attempts

### Attempt 1: Using the full path for slug generation

In our first implementation, we were generating slugs using the full file path:

```typescript
// Map each prompts entry to a static path object
const promptsPaths = promptsEntries.map(entry => {
  const filename = entry.id.replace(/\.md$/, '');
  // INCORRECT: Using the full path to generate slugs
  const generatedSlug = filename.toLowerCase().replace(/\s+/g, '-');
  
  if (!entry.data.slug) entry.data.slug = generatedSlug;
  if (!entry.data.title) entry.data.title = toProperCase(baseFilename);
  
  const slug = entry.data.slug;
  return {
    params: { collection: 'prompts', slug },
    props: {
      entry,
      collection: 'prompts',
    },
  };
});
```

This caused issues because in Astro content collections, `entry.id` often contains the full path (e.g., `workflow/write-a-comprehensive-squash-merge.md`). When we used this to generate slugs, we were creating slugs like `workflow-write-a-comprehensive-squash-merge` instead of just `write-a-comprehensive-squash-merge`.

### Attempt 2: Fixing TypeScript errors but not the slug generation

We tried to fix TypeScript errors by creating safe data objects:

```typescript
const safeData: EntryData = {
  ...data,
  tags: Array.isArray(data.tags) ? data.tags : [],
  slug: data.slug || generatedSlug,
  title: data.title || toProperCase(baseFilename)
};
```

But we were still using the incorrect slug generation method.

## The "Aha!" Moment

The issue was a mismatch between how we were generating slugs in `getStaticPaths()` and how the URLs were being constructed in the `PostCard` components. 

Looking at the `[magazine].astro` file, we found that URLs were being generated using just the basename:

```typescript
// In [magazine].astro
return {
  ...entry.data,
  id: entry.id,
  url: `${urlPrefix}${slug}` // Unified route: /vibe-with/[collection]/[slug]
};
```

Where `slug` was derived from just the filename, not the full path:

```typescript
const pathParts = entry.id.split('/');
const filename = pathParts[pathParts.length - 1].replace(/\.md$/, '');
const slug = filename.toLowerCase().replace(/\s+/g, '-');
```

## The Solution

We needed to modify our slug generation in `getStaticPaths()` to use only the basename (not the full path):

```typescript
// Extract just the filename without path and extension
const filename = entry.id.replace(/\.md$/, '');
const filenameParts = filename.split('/');
const baseFilename = filenameParts[filenameParts.length - 1];

// Generate slug from the basename only (not the full path)
// This matches how URLs are constructed in PostCard components
const generatedSlug = baseFilename.toLowerCase().replace(/\s+/g, '-');
```

This ensures that the slugs generated in `getStaticPaths()` match the slugs used in the URL construction in the `PostCard` components.

## Additional Improvements

1. We added debug logging to see the generated slugs during build:

```typescript
console.log(`DEBUG SLUG for ${entry.id}: Generated=${generatedSlug}, Existing=${data.slug || 'none'}`);
```

2. We ensured all Astro object usage was inside the render context by using an async IIFE:

```typescript
{(async () => {
  const { entry, collection } = Astro.props;
  
  // Now we can use await here
  if (!entry || !entry.data || !entry.data.title) {
    const entry = await getEntry(collection, slug);
    // ...
  }
})()}
```

## Key Learnings

1. In Astro dynamic routes, ensure that slug generation in `getStaticPaths()` matches the URL construction in your components.

2. When working with file paths in content collections, be careful about using the full path vs. just the basename.

3. Use debug logging during build to verify that slugs are being generated correctly.

4. Remember that all Astro object usage (`Astro.params`, `Astro.url`, `Astro.props`) must be inside the render context, and any async operations need to be in an async function.

5. The TypeScript type system can help catch these issues if you use proper type guards and assertions.

## Best Practices for Next Time

1. Always check how URLs are being constructed in your components before implementing `getStaticPaths()`.

2. Add debug logging for critical path generation during development.

3. Use a consistent approach to slug generation across your codebase.

4. Consider adding a utility function for slug generation to ensure consistency.

5. Test dynamic routes with various content structures to ensure robustness.
