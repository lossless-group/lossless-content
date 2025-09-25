---
title: Fixing MOC Content Filtering Across Multiple Collections
lede: Resolving client reader sidebar issues when Map of Content files reference articles from different content collections with mismatched paths and titles
date_reported: 2025-09-20
date_resolved: 2025-09-25
date_last_updated: 2025-09-25
at_semantic_version: 0.0.1.0
affected_systems: Client-Reader-Sidebar
status: Implemented
augmented_with: Claude 4 Sonnet via Trae AI
category: Content-Filtering
date_created: 2025-01-27
date_modified: 2025-09-25
image_prompt: A digital map with multiple pathways converging into a single organized sidebar, showing content from different collections being filtered and matched correctly
site_uuid: 828827c3-4a13-4f05-967f-d5eb837f5f05
tags: [MOC, Content-Collections, Astro, Fuzzy-Matching, Client-Reader]
authors:
  - Michael Staton
---
# Fixing MOC Content Filtering Across Multiple Collections

## The Challenge: MOC Files Referencing Multiple Collections

When implementing a client reader that uses Map of Content (MOC) markdown files to define related articles, we encountered a critical issue where the sidebar would only show content from one collection, even when the MOC file referenced articles from multiple collections (`essays` and `market-maps`).

The MOC file `content/moc/Hypernova.md` contained paths like:
```markdown
- essays/Partnering with Startups when they Scale Up
- lost-in-public/market-maps/The Future of CPG
```

But the client reader sidebar was only displaying one article instead of both, causing a poor user experience where related content wasn't being surfaced properly.

## Incorrect Attempts

### Attempt 1: Simple ID Matching
Our initial approach tried to match MOC paths directly against entry IDs:

```typescript
// In filterContentByMOC function
const matchingEntries = allEntries.filter(entry => {
  return mocPaths.some(mocPath => {
    const pathWithoutExtension = mocPath.replace(/\.md$/, '');
    return entry.id === pathWithoutExtension;
  });
});
```

**Failed because:** Entry IDs in Astro content collections use the `slug` field from frontmatter, not transformed filenames. For example, "Partnering with Startups when they Scale Up.md" had a slug of `partnering-with-startups-at-scale-up`, creating a complete mismatch.

### Attempt 2: Title-Based Matching
We tried matching against entry titles:

```typescript
const isMatch = entry.data.title?.toLowerCase() === mocTitle?.toLowerCase();
```

**Failed because:** This encountered `Cannot read properties of undefined (reading 'toLowerCase')` errors when titles were undefined, and exact title matching was too strict for variations in punctuation and formatting.

### Attempt 3: Collection Filtering Issues
We attempted to filter by collection but had problems with subdirectory paths:

```typescript
const collection = mocPath.split('/')[0]; // This failed for "lost-in-public/market-maps/..."
const filteredEntries = allEntries.filter(entry => entry.collection === collection);
```

**Failed because:** MOC paths like `lost-in-public/market-maps/The Future of CPG` were being parsed incorrectly, with `lost-in-public` being treated as the collection instead of `market-maps`.

## The "Aha!" Moment

The breakthrough came when we realized that:

1. **Path structures vary significantly**: MOC paths, entry IDs, and titles all follow different naming conventions
2. **Exact matching is too brittle**: Small differences in punctuation, spacing, or formatting cause failures
3. **We need fuzzy matching**: A keyword-based approach that can handle variations in naming
4. **Collection parsing needs to handle subdirectories**: MOC paths can include subdirectories that need to be parsed correctly

The solution was to implement a robust fuzzy matching system that extracts keywords from both the MOC path and entry data, then checks for significant overlap.

## Final Solution

### 1. Robust Collection Parsing
```typescript
// Handle subdirectory paths correctly
let collection = mocPath.split('/')[0];
if (collection === 'lost-in-public' && mocPath.includes('/market-maps/')) {
  collection = 'market-maps';
}
```

### 2. Fuzzy Keyword Matching
```typescript
function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

function fuzzyMatch(mocPath, entryId, entryTitle) {
  const mocKeywords = extractKeywords(mocPath);
  const entryKeywords = [
    ...extractKeywords(entryId || ''),
    ...extractKeywords(entryTitle || '')
  ];
  
  const matchCount = mocKeywords.filter(keyword => 
    entryKeywords.some(entryKeyword => entryKeyword.includes(keyword))
  ).length;
  
  const matchPercentage = matchCount / mocKeywords.length;
  return matchPercentage >= 0.6; // Require 60% keyword match
}
```

### 3. Safe Null Checking
```typescript
// Add null checks to prevent undefined errors
const entryTitle = entry.data?.title;
const mocTitle = mocPath.split('/').pop()?.replace(/\.md$/, '');

if (entryTitle && mocTitle) {
  const titleMatch = entryTitle.toLowerCase() === mocTitle.toLowerCase();
  if (titleMatch) return true;
}
```

### 4. Complete filterContentByMOC Function
```typescript
function filterContentByMOC(allEntries, mocPaths) {
  return allEntries.filter(entry => {
    return mocPaths.some(mocPath => {
      // Parse collection correctly, handling subdirectories
      let collection = mocPath.split('/')[0];
      if (collection === 'lost-in-public' && mocPath.includes('/market-maps/')) {
        collection = 'market-maps';
      }
      
      // Filter by collection first
      if (entry.collection !== collection) {
        return false;
      }
      
      // Try exact ID match
      const pathWithoutExtension = mocPath.replace(/\.md$/, '');
      if (entry.id === pathWithoutExtension) {
        return true;
      }
      
      // Try title matching with null checks
      const entryTitle = entry.data?.title;
      const mocTitle = mocPath.split('/').pop()?.replace(/\.md$/, '');
      
      if (entryTitle && mocTitle) {
        const titleMatch = entryTitle.toLowerCase() === mocTitle.toLowerCase();
        if (titleMatch) return true;
      }
      
      // Fuzzy matching as fallback
      return fuzzyMatch(mocPath, entry.id, entryTitle);
    });
  });
}
```

## Key Learnings

1. **Astro content collections use frontmatter slugs as IDs**, not transformed filenames
2. **MOC paths can include subdirectories** that need special parsing logic
3. **Fuzzy matching is essential** for handling naming variations across different systems
4. **Always add null checks** when working with potentially undefined frontmatter data
5. **Keyword-based matching with percentage thresholds** provides robust fallback matching

## Best Practices for Next Time

1. **Start with fuzzy matching** rather than trying exact matches first
2. **Handle subdirectory paths** in MOC parsing from the beginning
3. **Add comprehensive null checks** for all frontmatter fields
4. **Use keyword extraction and percentage matching** for robust content correlation
5. **Test with actual content** that has mismatched naming conventions
6. **Log debug information** during development to understand matching failures

## Result

The client reader sidebar now correctly displays both "The Future of CPG" (market-map) and "When to Partner with a Startup? When it's time for them to Scale Up" (essay) when viewing either article, maintaining all MOC-defined content regardless of the currently viewed article. The fuzzy matching system handles the various naming conventions and path structures gracefully.