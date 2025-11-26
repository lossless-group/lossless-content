---
title: Integrate a Sources content collection.
lede: Enhance our content through a new collection of sources, including books, people, events, lectures, media, meetings, reports, source extracts, ugc communities, and more.
date_authored_initial_draft: 2025-11-26
date_authored_current_draft: 2025-11-26
date_authored_final_draft: null
date_first_published: null
date_last_updated: 2025-11-26
at_semantic_version: 0.0.0.2
status: Draft
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Prompts
date_created: 2025-11-26
date_modified: 2025-11-26
tags: 
  - Dynamic-Routing
  - Content-Collections
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-10_portrait_image_Integrate-Collection-into-Site_4d25ec70-8a94-4878-8868-0275c7a73c61_yyjYFHCXL.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-10_banner_image_Integrate-Collection-into-Site_102b84c3-af7f-43b1-af3f-52b35454cd3f_rGb-0jwv7.webp
image_prompt: "A funnel leading to a computer monitor with a website interface that displays a list of news articles. Above the funnel is a lot of floating papers, newspapers, and notebooks. The mood is modern, but with a touch of nostalgia."
---

# Plan: Introduce Sources as Accessible Content

## Objective
Render the `content/sources` markdown files through a dynamic render pipeline with radically flexible frontmatter handling, graceful error handling, and a tabbed index page for browsing by folder.

---

## Current State Analysis

### Sources Directory Structure
The `sources/` content directory contains **247 markdown files** organized in:
- **11 top-level folders**: Books, Brand Content, Events, Lectures, Media, Meetings, People, Reports, Source Extracts, UGC Communities
- **13 root-level files** (e.g., OpenAlternative.md, CB Insights.md, Cursor Directory.md)
- **Nested subdirectories** (e.g., People/Influencers, Source Extracts/GitHub Repos)

### Content Characteristics
Based on file inspection:
- **Varied frontmatter**: Some files have rich frontmatter (url, og_title, tags, etc.), others have minimal frontmatter (just date_created), some may have none
- **Filenames as fallback titles**: Many files use the filename as the primary title (e.g., "OpenAlternative.md" → "OpenAlternative"). 
    - We should use the `title` falling back to `og_title` falling back to `filename` (there is an Astro specific word for this, which I can't remember)

### Sensitivity of file system paths to urls in Astro SSG
- We've had trouble making sure the various backlinks work across different content that shows up with different site urls. 
  - `content/specs/Project-Routing-Fix-Complete-Implementation.md` is a good example of this.
- **Backlinks present**: Content may contain Obsidian-style `[[backlinks]]`
- **Backlinks point to this file** from other rendered content, so we need to review and set the path to this directory or page through:
    - the `utils/routePaths.ts` util.
    - the `pages/api` code, which you might need to inspect.

### Existing Patterns to Follow
- **content.config.ts**: Uses glob loaders with `resolveContentPath()` and permissive schemas with `.passthrough()`
- **more-about/[...slug].astro**: Uses `processEntries()` from `@utils/slugify` for consistent slug generation
- **ReferenceLayout.astro**: Tab-based navigation with counts and word counts
- **VocabularyPreviewCard.astro**: Simple card component for listing items

---

## Implementation Plan

### Phase 1: Content Collection Configuration

**File: `src/content.config.ts`**

Add a new `sourcesCollection`:

```typescript
const sourcesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: resolveContentPath("sources"),
    generateId: ({ entry }) => {
      // Preserve directory structure in ID for nested folder routing
      return entry.replace(/\.md$/, '').toLowerCase();
    }
  }),
  schema: z.object({
    // Ultra-permissive schema - everything optional
    title: z.string().optional(),
    url: z.string().optional(),
    date_created: z.union([z.string(), z.date()]).optional(),
    date_modified: z.union([z.string(), z.date()]).optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    publish: z.boolean().optional(),
  }).passthrough() // Allow any additional frontmatter
});
```

Add to exports:
```typescript
// In paths export
'sources': resolveContentPath('sources'),

// In collections export
'sources': sourcesCollection,
```

---

### Phase 2: Dynamic Route Handler

**File: `src/pages/sources/[...slug].astro`** (new file)

Key features:
1. **Graceful error handling** in `getStaticPaths()` - wrap entry processing in try/catch
2. **Fallback titles** from filename when frontmatter title is missing
3. **Consistent slug generation** using existing `getReferenceSlug()` utility
4. **Error boundaries** for individual page rendering

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import OneArticle from '@layouts/OneArticle.astro';
import OneArticleOnPage from '@components/articles/OneArticleOnPage.astro';
import { getReferenceSlug, toProperCase } from '@utils/slugify';

export const prerender = true;

export async function getStaticPaths() {
  const sourcesEntries = await getCollection('sources');
  const paths = [];
  const errors = [];

  for (const entry of sourcesEntries) {
    try {
      // Generate slug from entry ID (preserves folder structure)
      const slug = getReferenceSlug(entry.id);

      // Derive title from filename if not in frontmatter
      const filename = entry.id.split('/').pop()?.replace(/\.md$/, '') || entry.id;
      const title = entry.data.title || toProperCase(filename);

      paths.push({
        params: { slug },
        props: {
          entry: {
            ...entry,
            data: {
              ...entry.data,
              title, // Ensure title is always present
            }
          },
          folder: entry.id.includes('/') ? entry.id.split('/')[0] : 'root'
        }
      });
    } catch (error) {
      // Log error but don't fail the build
      console.warn(`[SOURCES] Skipping ${entry.id}: ${error.message}`);
      errors.push({ id: entry.id, error: error.message });
    }
  }

  if (errors.length > 0) {
    console.warn(`[SOURCES] ${errors.length} entries skipped due to errors`);
  }

  return paths;
}

interface Props {
  entry: any;
  folder: string;
}

const { entry, folder } = Astro.props;

// Build content data for components
const contentData = {
  path: Astro.url.pathname,
  id: entry.id,
  title: entry.data.title,
  contentType: 'sources',
  folder
};
---

<Layout
  title={entry.data.title}
  frontmatter={entry.data}
>
  <OneArticle
    Component={OneArticleOnPage}
    title={entry.data.title}
    content={entry.body || ''}
    markdownFile={entry.id}
    data={contentData}
  />
</Layout>
```

---

### Phase 3: Index Page with Tabbed Navigation

**File: `src/pages/sources/index.astro`** (new file)

Design approach:
- Tab for each top-level folder + "All" tab
- Simple card list showing filename-derived titles
- Counts per folder displayed in tab badges
- Client-side filtering (similar to toolkit TagColumn pattern) OR static pages per folder

```astro
---
import Layout from '@layouts/Layout.astro';
import { getCollection } from 'astro:content';
import { toProperCase, getReferenceSlug } from '@utils/slugify';

const sourcesEntries = await getCollection('sources');

// Group entries by top-level folder
const entriesByFolder = new Map<string, typeof sourcesEntries>();
entriesByFolder.set('root', []); // Files not in a subfolder

for (const entry of sourcesEntries) {
  const parts = entry.id.split('/');
  const folder = parts.length > 1 ? parts[0] : 'root';

  if (!entriesByFolder.has(folder)) {
    entriesByFolder.set(folder, []);
  }
  entriesByFolder.get(folder)!.push(entry);
}

// Sort folders alphabetically, but keep 'root' first or last as preferred
const folders = Array.from(entriesByFolder.keys()).sort((a, b) => {
  if (a === 'root') return 1; // Put root at end
  if (b === 'root') return -1;
  return a.localeCompare(b);
});

// Process entries to ensure they have titles
const processedEntries = sourcesEntries.map(entry => {
  const filename = entry.id.split('/').pop()?.replace(/\.md$/, '') || entry.id;
  return {
    ...entry,
    slug: getReferenceSlug(entry.id),
    displayTitle: entry.data.title || toProperCase(filename),
    folder: entry.id.includes('/') ? entry.id.split('/')[0] : 'root'
  };
}).sort((a, b) => a.displayTitle.localeCompare(b.displayTitle));
---

<Layout title="Sources" description="Browse our collection of sources and references">
  <div class="sources-container">
    <h1>Sources</h1>
    <p class="description">A collection of references, people, books, and other sources we've gathered.</p>

    <!-- Tab Navigation -->
    <div class="tab-nav">
      <button class="tab-btn active" data-folder="all">
        All <span class="count">{sourcesEntries.length}</span>
      </button>
      {folders.map(folder => (
        <button class="tab-btn" data-folder={folder}>
          {folder === 'root' ? 'Uncategorized' : toProperCase(folder)}
          <span class="count">{entriesByFolder.get(folder)?.length || 0}</span>
        </button>
      ))}
    </div>

    <!-- Content Grid -->
    <div class="sources-grid">
      {processedEntries.map(entry => (
        <div class="source-card" data-folder={entry.folder}>
          <a href={`/sources/${entry.slug}`} class="source-link">
            <span class="source-title">{entry.displayTitle}</span>
            {entry.folder !== 'root' && (
              <span class="source-folder">{toProperCase(entry.folder)}</span>
            )}
          </a>
        </div>
      ))}
    </div>
  </div>
</Layout>

<script>
  // Client-side tab filtering
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.source-card');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const folder = tab.getAttribute('data-folder');

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards
        cards.forEach(card => {
          const cardFolder = card.getAttribute('data-folder');
          if (folder === 'all' || cardFolder === folder) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
</script>

<style>
  /* Styles following existing patterns from ReferenceLayout */
</style>
```

---

### Phase 4: Reusable Components (Optional Enhancement)

If the index page becomes complex, extract these components:

**File: `src/components/sources/SourcesNavRow.astro`**
- Tab buttons with folder names and counts
- Mirrors `ReferenceNavRow.astro` pattern
- Uses an easy to understand json config to define what tabs to show and how to group the sources. 

**File: `src/components/sources/SourcePreviewCard.astro`**
- Simple card showing title and optional folder badge
- Mirrors `VocabularyPreviewCard.astro` pattern

---

### Phase 5: Route Configuration for Backlinks

**Critical:** The site uses a centralized route management system. For backlinks like `[[sources/OpenAlternative]]` to resolve correctly, we must register the `sources` content path.

**File: `src/utils/routing/routeManager.ts`**

Add to `defaultRouteMappings` array:

```typescript
const defaultRouteMappings: RouteMapping[] = [
  // ... existing mappings ...
  {
    contentPath: 'sources',
    routePath: 'sources'
  },
  // ... other mappings ...
];
```

**File: `src/utils/routePaths.ts`**

Add to `ROUTE_PATHS` constant:

```typescript
export const ROUTE_PATHS = {
  // ... existing paths ...

  SOURCES: {
    BASE: '/sources',
  },

  // ... other paths ...
} as const;
```

**File: `src/utils/routing/routeManager.ts`** (optional enhancement)

Add `sources` to `PRIORITY_CONTENT_PATHS` if you want bare `[[SomeSource]]` backlinks to resolve:

```typescript
const PRIORITY_CONTENT_PATHS = [
  'tooling/Portfolio',
  'tooling',
  'vocabulary',
  'concepts',
  'sources',  // Add this for bare source name resolution
];
```

**Why this matters:**
- The `transformContentPathToRoute()` function uses these mappings to convert `[[sources/OpenAlternative]]` to `/sources/openalternative`
- Without this mapping, backlinks pointing to sources will resolve to `/404`
- The route manager caches resolutions for performance

**URL Normalization (already handled globally):**

The backlink system already normalizes casing and spaces through this chain:

1. `remark-backlinks.ts` receives `[[sources/Open Alternative]]` or `[[Sources/OpenAlternative]]`
2. Calls `transformContentPathToRoute(path)` in `routeManager.ts`
3. `routeManager.ts` line 251 normalizes via `getReferenceSlug(input)`:
   - Splits path by `/`
   - Calls `slugify()` on each segment (lowercases, converts spaces to hyphens)
   - Rejoins with `/`
4. `remark-backlinks.ts` lines 54-58 additionally slugifies each URL segment

Result: `[[sources/Open Alternative]]` → `sources/open-alternative` → `/sources/open-alternative`

**Files involved in normalization:**
- `src/utils/slugify.ts` - `slugify()` and `getReferenceSlug()` functions
- `src/utils/routing/routeManager.ts` - `transformContentPathToRoute()` at line 251
- `src/utils/markdown/remark-backlinks.ts` - additional slugification at lines 54-58
- `src/utils/backlink-parser.ts` - delegates to `transformContentPathToRoute()`

**Verification needed:** Test that backlinks like `[[sources/Brand Content/Some File]]` correctly resolve to `/sources/brand-content/some-file` (handling both the space in "Brand Content" and any casing variations).

---

### Phase 6: Title Fallback Chain

Per your feedback, implement a title fallback chain:

```typescript
// In getStaticPaths() and index page
const getDisplayTitle = (entry: any): string => {
  // Priority: title → og_title → filename
  if (entry.data.title && entry.data.title.trim()) {
    return entry.data.title;
  }
  if (entry.data.og_title && entry.data.og_title.trim()) {
    return entry.data.og_title;
  }
  // Fallback to filename with proper casing
  const filename = entry.id.split('/').pop()?.replace(/\.md$/, '') || entry.id;
  return toProperCase(filename);
};
```

This follows Astro's "data cascade" pattern where frontmatter properties cascade with fallbacks.

---

### Phase 7: Error Handling Strategy

#### Build-time Error Handling
In `getStaticPaths()`:
```typescript
// Wrap each entry in try/catch
try {
  // Process entry
} catch (error) {
  console.warn(`[SOURCES] Skipping ${entry.id}: ${error.message}`);
  // Continue with other entries
}
```

#### Render-time Error Handling
In the layout/component:
```typescript
// Defensive content handling
const body = entry.body || '';
const title = entry.data?.title || toProperCase(filename);
```

#### Collection Schema
Use `.passthrough()` to accept any frontmatter structure without validation errors.

---

## File Checklist

| File | Action | Priority |
|------|--------|----------|
| `src/content.config.ts` | Add sourcesCollection | P0 |
| `src/pages/sources/[...slug].astro` | Create dynamic route | P0 |
| `src/pages/sources/index.astro` | Create index with tabs | P0 |
| `src/utils/routing/routeManager.ts` | Add sources route mapping | P0 |
| `src/utils/routePaths.ts` | Add SOURCES route constant | P0 |
| `src/components/sources/SourcePreviewCard.astro` | Create (optional) | P1 |
| `src/components/sources/SourcesNavRow.astro` | Create (optional) | P1 |

---

## Testing Strategy

1. **Build test**: Run `pnpm build` and verify no critical errors
2. **Dev server test**: Navigate to `/sources` and verify index loads
3. **Route test**: Click through several source entries from different folders
4. **Edge case test**:
   - File with no frontmatter
   - File with minimal frontmatter
   - Deeply nested file (e.g., `People/Influencers/SomeInfluencer.md`)
5. **Tab filtering test**: Verify each folder tab filters correctly
6. **Backlink test**:
   - Create a test backlink `[[sources/OpenAlternative]]` in another file
   - Verify it resolves to `/sources/openalternative` (not `/404`)
   - Enable `DEBUG_BACKLINKS=true` in `.env` to see resolution logs
7. **Title fallback test**: Verify files display correctly:
   - File with `title` frontmatter → shows title
   - File with only `og_title` → shows og_title
   - File with no title fields → shows filename in proper case

---

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Large number of files (247) causing slow builds | Use static generation, consider pagination if needed |
| Inconsistent frontmatter causing render errors | Ultra-permissive schema + defensive coding |
| Spaces in folder names (e.g., "Brand Content") | Use `getReferenceSlug()` for URL-safe slugs |
| Missing content body | Default to empty string in render |
| Backlinks to sources not resolving | Add route mapping to `routeManager.ts` (Phase 5) |
| Existing backlinks from other content pointing to wrong URL | Verify route mapping matches content path exactly |

---

## Future Enhancements

1. **Search functionality**: Add search input like `SearchInput.astro`
2. **Word count display**: Show content length like `more-about` pages
3. **Sort options**: Allow sorting by date, title, folder
4. **Folder-specific pages**: Static `/sources/books`, `/sources/people` etc.
5. **Related sources**: Show backlinks between sources
6. **Google Books API** : Use the Google Books API to get book information from the `url` field in the frontmatter, especially the cover. 

---

## Estimated Scope

- **Minimal implementation** (P0 only): 5 files, ~250 lines of code
  - `content.config.ts` (additions)
  - `pages/sources/[...slug].astro` (new)
  - `pages/sources/index.astro` (new)
  - `utils/routing/routeManager.ts` (additions)
  - `utils/routePaths.ts` (additions)
- **Full implementation** (P0 + P1): 7 files, ~450 lines of code
  - All P0 files plus:
  - `components/sources/SourcePreviewCard.astro` (new)
  - `components/sources/SourcesNavRow.astro` (new)
