---
title: "Updates to Site Dependencies"
date_created: 2026-03-30
date_modified: 2026-03-30
authors:
  - Michael Staton
tags: [dependencies, astro, upgrades]
---

# Updates to Site Dependencies - 2026-03-30

## Starting Point

Current Astro version: **5.16.11**
Target Astro version: **6.1.2**

## Packages with Major Version Bumps (Breaking Changes Likely)

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| astro | 5.16.11 | 6.1.2 | Major framework upgrade |
| @astrojs/mdx | 4.3.13 | 5.0.3 | Tied to Astro 6 |
| @astrojs/node | 9.5.2 | 10.0.4 | Tied to Astro 6 |
| @astrojs/prism | 3.3.0 | 4.0.1 | Tied to Astro 6 |
| @astrojs/svelte | 7.2.5 | 8.0.4 | Tied to Astro 6 |
| @astrojs/vercel | 9.0.4 | 10.0.3 | Tied to Astro 6 |
| shiki | 3.15.0 | 4.0.2 | Syntax highlighting |
| glob | 11.0.3 | 13.0.6 | File globbing |
| tailwind-variants | 2.1.0 | 3.2.2 | Styling utility |
| typescript | 5.9.3 | 6.0.2 | Language |
| uuid | 11.1.0 | 13.0.0 | ID generation |
| @vercel/routing-utils | 5.3.0 | 6.1.1 | Vercel routing |

## Packages with Minor/Patch Bumps (Should Be Safe)

| Package | Current | Latest |
|---------|---------|--------|
| svelte | 5.43.14 | 5.55.1 |
| tailwindcss | 4.1.17 | 4.2.2 |
| @tailwindcss/vite | 4.1.17 | 4.2.2 |
| undici | 7.16.0 | 7.24.6 |
| playwright | 1.56.1 | 1.58.2 |
| dotenv | 17.2.3 | 17.3.1 |
| @iconify-json/tabler | 1.2.23 | 1.2.33 |
| @tabler/icons | 3.35.0 | 3.41.1 |
| choices.js | 11.1.0 | 11.2.1 |
| mdast-util-from-markdown | 2.0.2 | 2.0.3 |
| mdast-util-to-hast | 13.2.0 | 13.2.1 |
| smol-toml | 1.6.0 | 1.6.1 |
| serve | 14.2.5 | 14.2.6 |
| tsx | 4.20.6 | 4.21.0 |
| unist-util-visit | 5.0.0 | 5.1.0 |
| @astrojs/check | 0.9.6 | 0.9.8 |
| @astrojs/sitemap | 3.7.0 | 3.7.2 |
| @tailwindcss/forms | 0.5.10 | 0.5.11 |
| @vercel/og | 0.8.5 | 0.11.1 |

## Deprecated Packages

| Package | Current | Status | Replacement |
|---------|---------|--------|-------------|
| imagekit | 6.0.0 | Deprecated | TBD - need to research |

---

## Migration Plan

### Phase 1: Research Breaking Changes
- [ ] Astro 5 -> 6 migration guide
- [ ] Shiki 3 -> 4 changes
- [ ] TypeScript 5 -> 6 changes
- [ ] glob 11 -> 13 changes
- [ ] imagekit deprecation replacement

### Phase 2: Minor/Patch Updates (Low Risk)
- [ ] Update all minor/patch versions first
- [ ] Test build after minor updates

### Phase 3: Major Updates (One at a Time)
- [ ] Astro 6 + all @astrojs/* integrations together
- [ ] Shiki 4
- [ ] TypeScript 6
- [ ] Other major bumps

### Phase 4: Verification
- [ ] Full production build
- [ ] Dev server test
- [ ] Spot-check key pages

---

## Running Log

### 2026-03-30 - Session Start

Starting dependency audit. 31+ packages need updates, 12 with major version bumps.

Key concern areas:
1. **Astro 6** is the biggest change - all @astrojs/* integrations must update together
2. **Content collections** - our site heavily uses glob loaders and custom schemas, need to verify Astro 6 compatibility
3. **Shiki 4** - we use a custom singleton utility for syntax highlighting, may need API changes
4. **imagekit** is deprecated - need to find replacement or assess impact
5. **`type: 'content'` and `type: 'data'`** used in reportCollection and cardCollection - check if these APIs changed in Astro 6

Researching breaking changes now...

### 2026-03-30 - Research Complete

**Node.js**: Running v22.18.0 - meets Astro 6's Node 22.12.0+ requirement.

#### Astro 6 Key Breaking Changes
1. **Node 22 required** - we have it
2. **Vite 7** - internal upgrade, may affect custom Vite plugins
3. **Zod 4** - `z` must now be imported from `astro/zod` instead of `astro:content`. Also `.default()` with transforms changed behavior
4. **Legacy content collections removed** - `type: 'content'` and `type: 'data'` without loaders are gone. We have two collections using these: `reportCollection` and `cardCollection`
5. **Shiki v4** bundled - our custom singleton already uses v4-compatible APIs (`createHighlighter`)
6. **Markdown heading ID generation changed** - may affect anchor links
7. **`Astro.glob()` removed** - must use `import.meta.glob()` or `getCollection()`
8. **All @astrojs/* integrations** must upgrade together
9. **`output: "static"` with `adapter: vercel()`** - verify still valid

#### Shiki 4 (from 3): LOW RISK
- Removed typo-named exports (`createdBundledHighlighter` → `createBundledHighlighter`)
- We already use the correct `createHighlighter` API
- No code changes expected

#### TypeScript 6 Key Breaking Changes
- `strict` now defaults to `true` (we extend `astro/tsconfigs/base` so this depends on what Astro sets)
- `types` defaults to `[]` instead of all `@types` - we already explicitly set `types: ["astro/client"]`
- `moduleResolution: "bundler"` - we already use this
- `target: es5` deprecated - we don't use it
- Can use `ignoreDeprecations: "6.0"` as escape hatch

#### Glob 11→13: LOW RISK
- CLI moved to separate `glob-bin` package (we don't use CLI)
- `--shell` option removed (we don't use it)
- Our usage is just `glob(pattern)` calls - should be fine

#### ImageKit Package: SAFE TO REMOVE
- Package is deprecated but we don't import it in code
- Only using ImageKit CDN URLs (ik.imagekit.io) which are independent of the npm package
- Safe to remove from package.json

### 2026-03-30 - Starting Upgrade

**Code changes needed before upgrade:**
1. `content.config.ts`: Change `import { defineCollection, z } from 'astro:content'` → separate imports
2. `content.config.ts`: Migrate `reportCollection` (type: 'content') and `cardCollection` (type: 'data') to use loaders
3. Remove `imagekit` from package.json

**Upgrade order:**
1. Run `pnpm dlx @astrojs/upgrade` for Astro + integrations
2. Update remaining packages
3. Fix any build errors
4. Test

### 2026-03-30 - Upgrade Complete

#### Code Changes Made
1. `src/content.config.ts`: Changed `import { defineCollection, z } from 'astro:content'` to separate imports (`z` from `astro/zod`)
2. `src/content.config.ts`: Migrated `cardCollection` from `type: 'data'` to glob loader
3. `src/content.config.ts`: Migrated `reportCollection` from `type: 'content'` to glob loader
4. `src/content/cards/config.ts`: Updated `z` import (legacy file)
5. Removed `imagekit` package (deprecated, not imported in code)

#### Packages Upgraded

**Major version bumps (via `pnpm dlx @astrojs/upgrade`):**
- astro: 5.16.11 → 6.1.2
- @astrojs/mdx: 4.3.13 → 5.0.3
- @astrojs/node: 9.5.2 → 10.0.4
- @astrojs/prism: 3.3.0 → 4.0.1
- @astrojs/svelte: 7.2.5 → 8.0.4
- @astrojs/vercel: 9.0.4 → 10.0.3
- @astrojs/check: 0.9.6 → 0.9.8
- @astrojs/sitemap: 3.7.0 → 3.7.2

**Other major bumps:**
- shiki: 3.15.0 → 4.0.2
- glob: 11.0.3 → 13.0.6
- tailwind-variants: 2.1.0 → 3.2.2
- uuid: 11.1.0 → 13.0.0
- @vercel/routing-utils: 5.3.0 → 6.1.1

**Minor/patch bumps:**
- svelte: 5.43.14 → 5.55.1
- tailwindcss: 4.1.17 → 4.2.2
- @tailwindcss/vite: 4.1.17 → 4.2.2
- @tailwindcss/forms: 0.5.10 → 0.5.11
- @iconify-json/tabler: 1.2.23 → 1.2.33
- @tabler/icons: 3.35.0 → 3.41.1
- choices.js: 11.1.0 → 11.2.1
- undici: 7.16.0 → 7.24.6
- smol-toml: 1.6.0 → 1.6.1
- mdast-util-from-markdown: 2.0.2 → 2.0.3
- mdast-util-to-hast: 13.2.0 → 13.2.1
- unist-util-visit: 5.0.0 → 5.1.0
- dotenv: 17.2.3 → 17.3.1
- playwright: 1.56.1 → 1.58.2
- serve: 14.2.5 → 14.2.6
- tsx: 4.20.6 → 4.21.0

**NOT upgraded (peer dependency conflicts):**
- typescript: stayed at 5.9.3 (Astro toolchain doesn't support TS 6 yet - `tsconfck`, `@astrojs/check`, `svelte2tsx` all require TS 5.x)

**Removed:**
- imagekit: 6.0.0 (deprecated, not used in code)

#### Build Result
**Production build succeeded** in ~103 seconds with no errors. No breaking changes manifested at build time.

#### Known Remaining Items
- TypeScript 6 upgrade blocked by Astro ecosystem peer dependencies - revisit when Astro updates
- `@vercel/og` only updated to 0.8.6 (0.11.1 available) - may have additional peer dep constraints
- Markdown heading ID generation may have changed - spot-check anchor links on live site
- Monitor for any runtime issues on deployed site

### 2026-03-30 - Removed rehype-mermaid + Playwright (Dead Code Cleanup)

**Discovery:** `rehype-mermaid` (configured in `astro.config.mjs` with `strategy: 'img-svg'`) was never actually processing Mermaid code blocks. The custom rendering pipeline intercepts them earlier:

1. `AstroMarkdown.astro` detects `lang="mermaid"` code blocks via `getLanguageRoutingStrategy()`
2. Routes them to `MermaidChart.astro` component
3. `MermaidChart.astro` loads Mermaid **client-side from CDN** (`https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs`)
4. Browser renders SVGs at runtime -- no server-side Playwright needed

**Removed packages:**
- `rehype-mermaid` (required Playwright for server-side SVG rendering)
- `playwright` (was only needed by rehype-mermaid)
- `decktape` (slide-to-PDF export tool, also depended on Playwright/Puppeteer)

**Result:** -181 packages from node_modules. Build still passes clean. Deprecated `puppeteer` subdependency warning is gone.

**Removed from config:**
- `rehype-mermaid` import and plugin entry in `astro.config.mjs`
- `postinstall` script that installed Playwright Chromium browsers

#### TODO: Reintroduce Slide-to-PDF Export
The `pnpm export-pdf` command (`scripts/export-slides-to-pdf.js`) used `decktape` which was removed along with Playwright. Need to find an alternative approach for exporting RevealJS slides to PDF that doesn't require a full browser install. Options to explore:
- **Puppeteer standalone** (lighter than Playwright, but still a browser)
- **pdf-lib** or similar headless PDF generation
- **RevealJS's built-in print stylesheet** (`?print-pdf` query param + browser print)
- **A CI-only approach** where PDF export runs in a container with browsers pre-installed
