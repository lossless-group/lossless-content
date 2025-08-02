---
title: Creating an Astro Collection from Multiple Directory Paths
lede: Solving the challenge of combining multiple portfolio directories into a single unified collection
date: Sat Aug 02 2025 12:00:00 GMT-0500 (Central Daylight Time)
date_authored_initial_draft: 2025-08-02
date_authored_current_draft: 2025-08-02
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: In-Progress
augmented_with: Claude Code with Claude Opus 4
working_with: Claude Code
category: Issue-Resolution
date_created: 2025-08-02
date_modified: 2025-08-02
image_prompt: "A digital flowchart showing multiple portfolio folders merging into a single collection stream, with Astro logo and file paths"
site_uuid: 828827c3-4a13-4f05-967f-d5eb837f5f05
tags: 
  - Astro
  - Content-Collections
  - Portfolio
  - Multi-Path-Collections
  - Static-Site-Generation
authors:
  - Michael Staton
portrait_image: null
banner_image: null
---

# Creating an Astro Collection from Multiple Directory Paths

## What We're Trying to Do and Why

We need to create a single `portfolioCollection` in our Astro site that pulls content from multiple portfolio directories. The goal is to:

1. Combine content from several portfolio folders into one unified collection
2. Render these portfolio items in the `@src/pages/client/` pages
3. Maintain the flexibility of having portfolio content organized in different directories

This would allow us to have a cleaner content structure while presenting a unified portfolio view to users.

## Current State

We have portfolio content in multiple directories:
- `tooling/Portfolio/` - Contains general portfolio items
- `client-content/Hypernova/Portfolio/` - Contains client-specific portfolio items

The site uses an environment variable (`DEPLOY_ENV`) to determine the content base path:
- `LocalSiteOnly`: Uses `src/generated-content`
- `LocalMonorepo`: Uses `../content` (monorepo content directory)
- `Vercel`: Uses `src/generated-content`
- `Railway`: Uses `/lossless-monorepo/content`

The `resolveContentPath()` function handles this path resolution automatically.

## Initial Attempts

### Attempt 1: Standard Collection Definition
Based on Astro documentation, content collections traditionally require content to be in the `src/content/` directory:

```typescript
// This approach doesn't work for content outside src/content/
const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // ... schema
  })
});
```

### Attempt 2: Using glob() Loader with Single Base
The glob() loader allows content from outside `src/content/`, but only accepts a single base directory:

```typescript
import { glob } from 'astro/loaders';

const portfolioCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.md', 
    base: 'src/generated-content' // Can't specify multiple bases
  }),
  schema: z.object({
    title: z.string(),
    // ... schema
  })
});
```

## The "Aha!" Moment
After researching the Astro documentation and community solutions, we discovered three viable approaches:

1. **Pattern Arrays with Common Parent** - Use glob patterns to match multiple subdirectories
2. **Multiple Collections Approach** - Create separate collections and combine them programmatically
3. **Custom Loader** - Build a custom loader to handle multiple directories

## Proposed Solutions

### Solution 1: Pattern Arrays with resolveContentPath (Recommended)
Since both portfolio directories share a common parent in the content structure, we can use pattern arrays with the `resolveContentPath` function:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { contentBasePath } from './utils/envUtils.js';

// Function to resolve content paths based on environment
function resolveContentPath(relativePath: string): string {
  // If already within generated-content, return as-is
  if (relativePath.startsWith('./src/generated-content')) {
    return relativePath;
  }

  const absolutePath = join(contentBasePath, relativePath);

  // Convert to file:// URL
  return pathToFileURL(absolutePath).href;
}

const portfolioCollection = defineCollection({
  loader: glob({ 
    pattern: [
      'tooling/Portfolio/*.md',
      'client-content/*/Portfolio/*.md'
    ], 
    base: resolveContentPath('') // Base is the content root
  }),
  schema: z.object({
    title: z.string(),
    lede: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    // Add other schema fields as needed
  }).passthrough()
});

export const collections = {
  'portfolio': portfolioCollection,
};
```

### Solution 2: Multiple Collections with Aggregation
Create separate collections for each portfolio directory and combine them:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { contentBasePath } from './utils/envUtils.js';

// Function to resolve content paths based on environment
function resolveContentPath(relativePath: string): string {
  // If already within generated-content, return as-is
  if (relativePath.startsWith('./src/generated-content')) {
    return relativePath;
  }

  const absolutePath = join(contentBasePath, relativePath);

  // Convert to file:// URL
  return pathToFileURL(absolutePath).href;
}

const portfolioSchema = z.object({
  title: z.string(),
  lede: z.string().optional(),
  date: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
}).passthrough();

const toolingPortfolio = defineCollection({
  loader: glob({ 
    pattern: '*.md', 
    base: resolveContentPath('tooling/Portfolio') 
  }),
  schema: portfolioSchema
});

const hypernovaPortfolio = defineCollection({
  loader: glob({ 
    pattern: '*.md', 
    base: resolveContentPath('client-content/Hypernova/Portfolio') 
  }),
  schema: portfolioSchema
});

export const collections = {
  'toolingPortfolio': toolingPortfolio,
  'hypernovaPortfolio': hypernovaPortfolio,
};

// In your pages, combine collections:
// const tooling = await getCollection('toolingPortfolio');
// const hypernova = await getCollection('hypernovaPortfolio');
// const allPortfolio = [...tooling, ...hypernova];
```

### Solution 3: Dynamic Client Portfolio Collections
For a more scalable approach that automatically includes all client portfolios:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { contentBasePath } from './utils/envUtils.js';

// Function to resolve content paths based on environment
function resolveContentPath(relativePath: string): string {
  // If already within generated-content, return as-is
  if (relativePath.startsWith('./src/generated-content')) {
    return relativePath;
  }

  const absolutePath = join(contentBasePath, relativePath);

  // Convert to file:// URL
  return pathToFileURL(absolutePath).href;
}

// General portfolio collection
const generalPortfolio = defineCollection({
  loader: glob({ 
    pattern: '*.md', 
    base: resolveContentPath('tooling/Portfolio') 
  }),
  schema: portfolioSchema
});

// Client portfolio collection that captures all client portfolios
const clientPortfolio = defineCollection({
  loader: glob({ 
    pattern: '*/Portfolio/*.md', // Matches any client folder with Portfolio subdirectory
    base: resolveContentPath('client-content') 
  }),
  schema: portfolioSchema.extend({
    client: z.string().optional() // Could extract from path
  }).passthrough()
});

export const collections = {
  'generalPortfolio': generalPortfolio,
  'clientPortfolio': clientPortfolio,
};
```

## Integration with Client Pages

Based on the existing patterns in the codebase, here's how to integrate portfolio collections into the client pages structure:

### 1. Update Content Configuration

First, add the portfolio collection to `src/content.config.ts`:

```typescript
// Add to src/content.config.ts

const portfolioCollection = defineCollection({
  loader: glob({ 
    pattern: [
      'tooling/Portfolio/*.md',
      'client-content/*/Portfolio/*.md'
    ], 
    base: resolveContentPath('') 
  }),
  schema: z.object({
    title: z.string(),
    lede: z.string().optional(),
    date: z.coerce.date().optional(),
    client: z.string().optional(),
    tags: z.array(z.string()).optional(),
    banner_image: z.string().optional(),
    portrait_image: z.string().optional(),
    status: z.string().optional(),
    authors: z.union([z.string(), z.array(z.string())]).optional(),
  }).passthrough().transform((data, context) => {
    // Extract client name from path if in client-content
    const pathParts = context.path.split('/');
    const isClientContent = pathParts.includes('client-content');
    const client = isClientContent ? pathParts[pathParts.indexOf('client-content') + 1] : null;
    
    // Get filename for slug generation
    const filename = String(context.path).split('/').pop()?.replace(/\.md$/, '') || '';
    
    return {
      ...data,
      client: data.client || client,
      slug: filename.toLowerCase().replace(/\s+/g, '-'),
    };
  })
});

// Add to collections export
export const collections = {
  // ... existing collections
  'portfolio': portfolioCollection,
};
```

### 2. Update Route Manager

Add portfolio route mapping to `src/utils/routing/routeManager.ts`:

```typescript
// Add to defaultRouteMappings array
{
  contentPath: 'tooling/Portfolio',
  routePath: 'portfolio'
},
{
  contentPath: 'client-content',
  routePath: 'client',
  // Portfolio will be a sub-route under client
}
```

### 3. Create Portfolio List Page

Create `src/pages/client/[client]/portfolio/index.astro`:

```astro
---
import ClientPortalLayout from '@layouts/ClientPortalLayout.astro';
import { getCollection } from 'astro:content';
import { getReferenceSlug, toProperCase } from '@utils/slugify';
import ReferenceGrid from '@components/reference/ReferenceGrid.astro';

export async function getStaticPaths() {
  const portfolio = await getCollection('portfolio');
  
  // Get unique client names from portfolio items
  const clients = [...new Set(
    portfolio
      .filter(item => item.data.client)
      .map(item => item.data.client)
  )];
  
  return clients.map(client => ({
    params: { client: getReferenceSlug(client) },
    props: { 
      client,
      portfolioItems: portfolio.filter(item => 
        item.data.client?.toLowerCase() === client.toLowerCase()
      )
    }
  }));
}

const { client, portfolioItems } = Astro.props;

// Transform portfolio items to match ReferenceItem interface
const portfolioReferences = portfolioItems.map(item => ({
  id: item.id,
  slug: item.slug || getReferenceSlug(item.id),
  collection: 'portfolio',
  data: {
    title: item.data.title,
    description: item.data.lede || '',
    tags: item.data.tags || [],
    aliases: [],
    banner_image: item.data.banner_image,
    portrait_image: item.data.portrait_image,
  },
  originalFilename: item.id
}));
---

<ClientPortalLayout client={client}>
  <div class="portfolio-section">
    <h1>Portfolio for {toProperCase(client)}</h1>
    <p class="portfolio-description">
      Explore our portfolio of work and case studies for {toProperCase(client)}.
    </p>
    
    {portfolioReferences.length > 0 ? (
      <ReferenceGrid items={portfolioReferences} />
    ) : (
      <p class="no-portfolio">No portfolio items available yet.</p>
    )}
  </div>
</ClientPortalLayout>

<style>
  .portfolio-section {
    padding: 2rem 0;
    max-width: var(--content-width, 1200px);
    margin: 0 auto;
  }
  
  .portfolio-section h1 {
    font-size: var(--fs-900);
    margin-bottom: 1rem;
    color: var(--clr-heading--primary);
  }
  
  .portfolio-description {
    font-size: var(--fs-500);
    line-height: 1.6;
    margin-bottom: 3rem;
    opacity: 0.9;
  }
  
  .no-portfolio {
    text-align: center;
    padding: 4rem 0;
    opacity: 0.7;
  }
</style>
```

### 4. Create Individual Portfolio Page

Create `src/pages/client/[client]/portfolio/[...slug].astro`:

```astro
---
import OneArticle from '@layouts/OneArticle.astro';
import Layout from '@layouts/Layout.astro';
import AstroMarkdown from '@components/markdown/AstroMarkdown.astro';
import { getCollection, getEntry } from 'astro:content';
import { getReferenceSlug, toProperCase } from '@utils/slugify';
import path from 'node:path';

export async function getStaticPaths() {
  const portfolio = await getCollection('portfolio');
  
  return portfolio
    .filter(entry => entry.data.client) // Only client-specific portfolio items
    .map(entry => {
      const client = entry.data.client;
      const filename = path.basename(entry.id).replace(/\.md$/, '');
      const slug = getReferenceSlug(filename);
      
      return {
        params: {
          client: getReferenceSlug(client),
          slug: slug,
        },
        props: {
          entry,
          client,
          slug,
        },
      };
    });
}

const { entry, client, slug } = Astro.props;
const { Content } = await entry.render();
---

<Layout frontmatter={entry.data}>
  <OneArticle 
    Component={AstroMarkdown}
    title={entry.data.title}
    data={entry.data}
    content={entry.body}
    markdownFile={entry.id}
  >
    <Content />
  </OneArticle>
</Layout>
```

### 5. Add Portfolio Link to Client Portal Cards

Update the `messages/clientPortalCards.json` to include a portfolio card:

```json
{
  "cards": [
    // ... existing cards
    {
      "title": "Portfolio",
      "content": "View our portfolio of completed projects and case studies",
      "link": "/client/[client]/portfolio",
      "icon": "briefcase",
      "order": 4
    }
  ]
}
```

### 6. Create General Portfolio Page

For non-client-specific portfolio items, create `src/pages/portfolio/[...slug].astro`:

```astro
---
import OneArticle from '@layouts/OneArticle.astro';
import Layout from '@layouts/Layout.astro';
import AstroMarkdown from '@components/markdown/AstroMarkdown.astro';
import { getCollection } from 'astro:content';
import { getReferenceSlug } from '@utils/slugify';
import path from 'node:path';

export async function getStaticPaths() {
  const portfolio = await getCollection('portfolio');
  
  return portfolio
    .filter(entry => !entry.data.client) // Only general portfolio items
    .map(entry => {
      const filename = path.basename(entry.id).replace(/\.md$/, '');
      const slug = getReferenceSlug(filename);
      
      return {
        params: { slug },
        props: { entry },
      };
    });
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<Layout frontmatter={entry.data}>
  <OneArticle 
    Component={AstroMarkdown}
    title={entry.data.title}
    data={entry.data}
    content={entry.body}
    markdownFile={entry.id}
  >
    <Content />
  </OneArticle>
</Layout>
```

## Key Implementation Details

1. **Path Resolution**: The `resolveContentPath()` function automatically handles different deployment environments
2. **Client Detection**: Portfolio items are automatically associated with clients based on their file path
3. **Routing**: Portfolio items follow the pattern `/client/[client]/portfolio/[slug]` for client-specific items
4. **Markdown Rendering**: Uses the existing `OneArticle` layout and `AstroMarkdown` component for consistent rendering
5. **Collection Filtering**: Client-specific portfolio items are filtered based on the client parameter

## Testing the Implementation

1. Add test portfolio files:
   - `tooling/Portfolio/general-portfolio-item.md`
   - `client-content/Hypernova/Portfolio/hypernova-case-study.md`

2. Verify routes are generated:
   - `/portfolio/general-portfolio-item`
   - `/client/hypernova/portfolio`
   - `/client/hypernova/portfolio/hypernova-case-study`

3. Check that portfolio items appear in the appropriate client portal

## Final Notes

This solution integrates seamlessly with the existing codebase patterns:
- Uses the same layout components (`ClientPortalLayout`, `OneArticle`)
- Follows the established routing patterns
- Leverages existing utility functions for slug generation and text transformation
- Maintains consistency with other content collections

The portfolio collection can be extended with additional fields as needed, and the schema ensures type safety throughout the application.