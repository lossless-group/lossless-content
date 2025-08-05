---
title: "Creating an Astro Collection from Multiple Directory Paths"
lede: "Solving the challenge of combining multiple portfolio directories into a single unified collection"
date: "Sat Aug 02 2025 12:00:00 GMT-0500 (Central Daylight Time)"
date_authored_initial_draft: 2025-08-02
date_authored_current_draft: 2025-08-02
date_authored_final_draft: null
date_first_published: 2025-08-04
date_last_updated: null
at_semantic_version: 0.0.0.1
status: In-Progress
augmented_with: "Claude Code with Claude Opus 4"
working_with: "Claude Code"
category: Issue-Resolution
date_created: 2025-08-02
date_modified: 2025-08-04
image_prompt: "A digital flowchart showing multiple portfolio folders merging into a single collection stream, with Astro logo and file paths"
site_uuid: 828827c3-4a13-4f05-967f-d5eb837f5f05
tags: [Astro, Content-Collections, Portfolio, Multi-Path-Collections, Static-Site-Generation]
authors:
  - Michael Staton
portrait_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Multi-Path-Portfolio-Collection-Setup_portrait_image_1754305063964_yEWI-SXRt.webp"
banner_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Multi-Path-Portfolio-Collection-Setup_banner_image_1754305061462_DheeGyouA.webp"
square_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Multi-Path-Portfolio-Collection-Setup_square_image_1754305065863_MY1GlwjfT.webp"
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

### Initial Discovery
After researching the Astro documentation and community solutions, we discovered three viable approaches:

1. **Pattern Arrays with Common Parent** - Use glob patterns to match multiple subdirectories
2. **Multiple Collections Approach** - Create separate collections and combine them programmatically
3. **Custom Loader** - Build a custom loader to handle multiple directories

### The Real Eureka: Layout Pipeline Issue

After implementing the portfolio collection and fixing the case sensitivity issue, we discovered that portfolio routes were returning 200 OK but displaying the wrong content. The routes were returning HTML but it was showing the Client Portal page instead of the actual portfolio markdown content.

**The Root Cause**: The portfolio route was using `ClientPortalLayout` instead of the proper markdown rendering pipeline. This meant:

1. **What we expected**: Portfolio markdown content rendered through OneArticle.astro → OneArticleOnPage.astro → AstroMarkdown.astro
2. **What we got**: Client Portal page template instead of the markdown content

**The Critical Realization**: Portfolio files are markdown documents that need to go through the standard content rendering pipeline, just like essays, recommendations, and projects. They should NOT use the ClientPortalLayout - that's only for portal landing pages.

**The Solution**: Change the portfolio route from:
```astro
<ClientPortalLayout client={client} slug={slug} />
```

To the proper markdown rendering pipeline:
```astro
<Layout title={entry.data.title || 'Portfolio Item'} frontmatter={entry.data}>
  <OneArticle
    Component={OneArticleOnPage}
    content={entry.body}
    markdownFile={entry.id}
    data={contentData}
    title={entry.data.title}
  />
</Layout>
```

This ensures that markdown directives like `:::slideshow` render correctly and the portfolio content displays as intended.

## Proposed Solutions

### Solution 1: Pattern Arrays with resolveContentPath (Recommended)
Since both portfolio directories share a common parent in the content structure, we can use pattern arrays with the `resolveContentPath` function:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { join } from 'node:path';
import { pathToFileURL } from 'url';
import { contentBasePath } from './utils/envUtils.js';

// Note: The resolveContentPath function already exists in src/content.config.ts
// You don't need to create it, just use the existing one
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

### Prerequisites

Before starting, verify that you have:
- Access to `src/content.config.ts` (the main content configuration file)
- The `resolveContentPath` function already exists in `src/content.config.ts` (around line 10-21)
- The necessary imports at the top of `src/content.config.ts`:
  ```typescript
  import { defineCollection, z } from 'astro:content';
  import { glob } from 'astro/loaders';
  import { join } from 'node:path';
  import { pathToFileURL } from 'url';
  import { contentBasePath } from './utils/envUtils.js';
  ```

### 1. Update Content Configuration

**File:** `src/content.config.ts`

**Note:** The `resolveContentPath` function should already exist in this file. If not, here's the complete function:

```typescript
// This function should already exist around line 10-21 in src/content.config.ts
function resolveContentPath(relativePath: string): string {
  // If already within generated-content, return as-is
  if (relativePath.startsWith('./src/generated-content')) {
    return relativePath;
  }

  const absolutePath = join(contentBasePath, relativePath);

  // Convert to file:// URL
  return pathToFileURL(absolutePath).href;
}
```

**Add this portfolio collection definition** after the other collection definitions (around line 400+):

```typescript
// Add this new collection definition BEFORE the export statement
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
```

**Update the collections export** (around line 500+) by adding the portfolio collection:

```typescript
// Find the existing export and add 'portfolio' to it
export const collections = {
  'cards': cardCollection,
  'concepts': conceptsCollection,
  // ... other existing collections ...
  'client-projects': clientProjectsCollection,
  'portfolio': portfolioCollection, // ADD THIS LINE
};
```

### 2. Update Route Manager

**File:** `src/utils/routing/routeManager.ts`

**Location:** Inside the `defaultRouteMappings` array (around line 33-85)

**Note:** The `client-content` mapping already exists (around line 69-71), so you only need to add the tooling portfolio mapping.

**Add this entry** to the `defaultRouteMappings` array (suggest adding after line 59, after the 'tooling' entry):

```typescript
// Around line 60, after the 'tooling' mapping
{
  contentPath: 'tooling/Portfolio',
  routePath: 'portfolio'
},
// The client-content mapping already exists and will handle client portfolios
```

### 3. Create Portfolio List Page

**First, create the directory structure:**
```bash
mkdir -p src/pages/client/[client]/portfolio
```

**Then create the file:** `src/pages/client/[client]/portfolio/index.astro`

```astro
---
import ClientPortalLayout from '@layouts/ClientPortalLayout.astro';
import { getCollection } from 'astro:content';
import { getReferenceSlug, toProperCase } from '@utils/slugify';
import ReferenceGrid from '@components/reference/ReferenceGrid.astro';

export async function getStaticPaths() {
  const portfolio = await getCollection('portfolio');
  
  // Get list of client directories from filesystem to preserve case
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const { contentBasePath } = await import('@utils/envUtils');
  
  const clientContentDir = path.resolve(`${contentBasePath}/client-content`);
  const clientDirs = await fs.readdir(clientContentDir, { withFileTypes: true });
  const clientNames = clientDirs
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  // Create a case-insensitive map to preserve original case
  const clientCaseMap = new Map(
    clientNames.map(name => [name.toLowerCase(), name])
  );
  
  // Extract client from the id path for items in client-content
  const portfolioWithClients = portfolio.map(item => {
    const idParts = item.id.split('/');
    const isClientContent = idParts.includes('client-content');
    const clientIndex = idParts.indexOf('client-content');
    const extractedClientLower = isClientContent && clientIndex !== -1 ? idParts[clientIndex + 1] : null;
    // Restore original case from filesystem
    const extractedClient = extractedClientLower ? clientCaseMap.get(extractedClientLower) || extractedClientLower : null;
    
    return {
      ...item,
      extractedClient
    };
  });
  
  // Get unique client names with proper case
  const clients = [...new Set(
    portfolioWithClients
      .filter(item => item.extractedClient)
      .map(item => item.extractedClient)
  )];
  
  return clients.map(client => ({
    params: { client },
    props: { 
      client,
      portfolioItems: portfolioWithClients.filter(item => 
        item.extractedClient?.toLowerCase() === client.toLowerCase()
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

**Create the file:** `src/pages/client/[client]/portfolio/[...slug].astro`

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

**File:** `src/content/messages/clientPortalCards.json`

**Important:** The `[client]` placeholder in the link is handled automatically by the IconHeaderMessageCardGrid component. You use it literally as shown.

**Add this card to the existing cards array:**

```json
{
  "cards": [
    {
      "title": "Recommendations",
      "content": "Strategic insights and recommendations tailored for your business",
      "link": "/client/[client]/recommendations",
      "icon": "lightbulb",
      "order": 1
    },
    {
      "title": "Projects",
      "content": "Active projects and ongoing initiatives",
      "link": "/client/[client]/projects",
      "icon": "folder",
      "order": 2
    },
    {
      "title": "Essays",
      "content": "In-depth articles and thought leadership pieces",
      "link": "/client/[client]/essays",
      "icon": "document",
      "order": 3
    },
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

**First, create the directory:**
```bash
mkdir -p src/pages/portfolio
```

**Then create the file:** `src/pages/portfolio/[...slug].astro`

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

### 1. Create Test Portfolio Files

**Create test file:** `tooling/Portfolio/general-portfolio-item.md`
```markdown
---
title: General Portfolio Item
lede: This is a test portfolio item in the general tooling section
date: 2025-08-02
tags: 
  - test
  - portfolio
status: published
banner_image: /images/test-banner.jpg
---

# General Portfolio Item

This is test content for a general portfolio item.
```

**Create test file:** `client-content/Hypernova/Portfolio/hypernova-case-study.md`
```markdown
---
title: Hypernova Case Study
lede: A successful project implementation for Hypernova
date: 2025-08-02
tags: 
  - case-study
  - hypernova
status: published
authors: Michael Staton
---

# Hypernova Case Study

This is test content for a client-specific portfolio item.
```

### 2. Start Development Server

```bash
pnpm dev
```

### 3. Verify Routes

Visit these URLs in your browser:
- `http://localhost:4321/portfolio/general-portfolio-item` - General portfolio item
- `http://localhost:4321/client/hypernova/portfolio` - Client portfolio list
- `http://localhost:4321/client/hypernova/portfolio/hypernova-case-study` - Client portfolio item

### 4. Common Issues and Solutions

**Issue:** Collection not found error
- **Solution:** Ensure you've added the portfolio collection to the exports in `src/content.config.ts`
- **Check:** Run `pnpm build` to see detailed error messages

**Issue:** Routes return 404
- **Solution:** This is likely a case sensitivity issue. Astro's glob loader normalizes paths to lowercase
- **Fix:** The portfolio pages must preserve the original case from the filesystem
- **Check:** Ensure the getStaticPaths function reads actual directory names from the filesystem

**Issue:** Portfolio items not showing in client portal
- **Solution:** Ensure the client name in the path matches exactly (case-sensitive)
- **Check:** Console logs will show the detected client name

**Issue:** Markdown not rendering correctly
- **Solution:** Verify that `entry.render()` is being called in the portfolio page
- **Check:** The `Content` component should be rendered inside `OneArticle`

## Implementation Checklist

Follow these steps in order:

- [ ] **Step 1:** Open `src/content.config.ts`
  - [ ] Verify imports are present (join, pathToFileURL, etc.)
  - [ ] Confirm `resolveContentPath` function exists
  - [ ] Add portfolio collection definition (around line 400+)
  - [ ] Add 'portfolio' to the collections export

- [ ] **Step 2:** Update `src/utils/routing/routeManager.ts`
  - [ ] Add tooling/Portfolio route mapping after line 59

- [ ] **Step 3:** Create portfolio page directories
  - [ ] Run: `mkdir -p src/pages/client/[client]/portfolio`
  - [ ] Run: `mkdir -p src/pages/portfolio`

- [ ] **Step 4:** Create portfolio pages
  - [ ] Create `src/pages/client/[client]/portfolio/index.astro`
  - [ ] Create `src/pages/client/[client]/portfolio/[...slug].astro`
  - [ ] Create `src/pages/portfolio/[...slug].astro`

- [ ] **Step 5:** Update client portal cards
  - [ ] Edit `src/content/messages/clientPortalCards.json`
  - [ ] Add portfolio card to the cards array

- [ ] **Step 6:** Test the implementation
  - [ ] Create test portfolio markdown files
  - [ ] Run `pnpm dev`
  - [ ] Visit the test URLs
  - [ ] Verify portfolio items render correctly

## Final Notes

This solution integrates seamlessly with the existing codebase patterns:
- Uses the same layout components (`ClientPortalLayout`, `OneArticle`)
- Follows the established routing patterns
- Leverages existing utility functions for slug generation and text transformation
- Maintains consistency with other content collections

The portfolio collection can be extended with additional fields as needed, and the schema ensures type safety throughout the application.

## Still Having Issues?

If you encounter problems:
1. Check the console output when running `pnpm dev` for specific error messages
2. Verify file paths match exactly (case-sensitive)
3. Ensure all imports are correct at the top of each file
4. Run `pnpm build` for more detailed error messages
5. Check that the `DEPLOY_ENV` variable is set correctly in your `.env` file
