---
title: Maintain Client Pages using Map of Content Directives
lede: Enable `Map of Content` syntax to manage custom content per client
date_authored_initial_draft: 2025-08-07
date_authored_current_draft: 2025-08-08
date_authored_final_draft: 
date_first_published: 2025-08-08
date_last_updated: 2025-08-08
at_semantic_version: 0.0.0.1
status: In-Progress
augmented_with: Windsurf Cascade on Claude 4 Sonnet
category: UI-Component
date_created: 2025-08-08
date_modified: 2025-08-09
tags: [Client-Portal, Markdown-Directives, Reference-Architecture, Portfolio-Display, Astro-Components, Content-Collections]
authors:
  - Michael Staton
image_prompt: An Astronaut representing the Astro Framework is navigating a ship and is looking down at maps to see where to go.
---

# Overview

This specification documents the implementation of Map of Content (MOC) directives for client portal customization. The system enables per-client configuration of features, portfolio items, and reference terms through markdown-based directives, eliminating the need for separate JSON configuration files.

## Implementation Summary

Re-architected the Client Portal to be fully markdown-driven via MOC (Map of Contents) directives. The portal now reads per-client feature toggles, featured portfolio items, and reference terms (vocabulary and concepts) directly from `content/moc/<Client>.md`. This approach removes legacy JSON fallback for reference terms and preserves original capitalization throughout the reference pipeline.

## Key Benefits

- **Single source of truth in markdown**: Editors can author all client-facing selections in one place
- **Eliminates brittle JSON duplication**: Reduces drift between data sources
- **Preserves capitalization**: Maintains high fidelity presentation (e.g., "AI Models", "AI Avatars")
- **Enables fast per-client customization**: Cards, portfolios, terms without code changes

## MOC Directive Syntax

Each client MOC file (`content/moc/<Client>.md`) can include the following directive blocks:

```markdown
:::features
- Reader
- Projects
- Portfolio
- Recommendations
:::

:::portfolio
- [[Aalo Atomics]]
- [[Pencil Spaces]]
:::

:::vocabulary
- [[Agile]]
- [[AI Models]]
:::

:::concepts
- [[Coherence]]
- [[AI Avatars]]
:::
```

## Routing Analysis

### Projects Feature Navigation

The Projects feature navigates to: `https://www.lossless.group/client/laerdal/thread/projects`

This follows the pattern: `/client/[client]/thread/[magazine]` where:
- `[client]` = "laerdal" (dynamic client parameter)
- `[magazine]` = "projects" (dynamic magazine/content type parameter)

### Route Implementation

**Dynamic Route Handler**: `/site/src/pages/client/[client]/thread/[magazine].astro`
- Uses static generation (`prerender = true`)
- Handles multiple content types: `recommendations`, `projects`, `portfolio`
- Maps to collections: `client-recommendations`, `client-projects`, `client-portfolios`

**Collection Mapping**:
```javascript
const collectionMap = {
  'recommendations': { collection: 'client-recommendations', urlPrefix: '/client/' },
  'projects': { collection: 'client-projects', urlPrefix: '/client/' },
  'portfolio': { collection: 'client-portfolios', urlPrefix: '/client/' },
};
```

## Technical Implementation

### Changes Made

**Client Landing Layout**
- Edited: `site/src/layouts/ClientPortalLayout.astro`
  - Parse `:::features` to filter `clientPortalCards.json` per client
  - Parse `:::portfolio` and render `PortfolioCard` items directly on the landing page
  - Parse `:::vocabulary` and `:::concepts` and pass them as props to the reference section
  - Added responsive grid styling for the featured portfolio section

**Reference Section**
- Edited: `site/src/components/client-portals/ClientReferenceSection.astro`
  - Switched to markdown-driven props (`selectedVocabulary`, `selectedConcepts`) only
  - Removed JSON filesystem fallback and all fs/path imports
  - Preserved original casing; removed `toProperCase` in fallback title logic
  - Refactored to use `processEntries` from `site/src/utils/slugify.ts`
  - Converted processed entries into `ReferenceItem` shape expected by `ReferenceGrid`

### Technical Details

**Features Filtering**
- The layout loads `src/content/messages/clientPortalCards.json` (unchanged structure) and filters by normalized names from `:::features`
- Includes alias handling (e.g., common misspelling "Reccomendations" → "Recommendations")

**Featured Portfolio**
- `:::portfolio` list parsed from `content/moc/<Client>.md`
- Resolution uses existing `resolvePortfolioId` in `site/src/utils/toolUtils.ts` and the `client-portfolios` collection
- Each resolved entry is rendered with `PortfolioCard` in a responsive grid at the top of the landing page

**Reference Terms (vocabulary, concepts)**
- The layout parses `:::vocabulary` and `:::concepts` and passes arrays to `ClientReferenceSection`
- The section uses `processEntries` to normalize collection entries and then maps the passed titles to `ReferenceItem`s for `ReferenceGrid`
- Casing is preserved by avoiding automatic title-casing transforms

**Environment-aware Content Path**
- All filesystem reads for client content and MOC use `contentBasePath`/`resolvedContentPath` from `envUtils`, preserving deploy-specific roots

## Integration Points

- `PortfolioCard` remains the canonical UI for portfolio entries; now also used on the client landing page
- `ReferenceGrid` continues to render list items, now driven by processed entries to unify behavior with the reference index page
- No changes required to `content.config.ts`; existing collections are reused

## Migration Steps

1. For each client, ensure a `content/moc/<Client>.md` exists (Proper Case, spaces allowed)
2. Move any reference terms from deleted `reference-terms.json` into the appropriate MOC blocks:
   - `:::vocabulary` for vocabulary entries
   - `:::concepts` for concept entries
3. If using featured portfolio, add a `:::portfolio` block with a bullet list of references (backlink syntax preferred: `[[Name]]`)
4. Optionally add a `:::features` block to control which portal cards display

## Breaking Changes

- JSON fallback for reference terms has been removed
- If `:::vocabulary`/`:::concepts` are not defined for a client, their reference section will be empty

## Follow-ups

- Add validation or build-time warnings when MOC references cannot be resolved (e.g., portfolio names that don't match entries)
- Consider surfacing counts/logs on the client page to aid troubleshooting (hidden dev mode)
