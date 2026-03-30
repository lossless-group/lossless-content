---
date_created: 2026-03-30
date_modified: 2026-03-30
title: Astro 6 is Released
slug: astro-6-is-released
tags: [Astro-Ecosystem, Web-Frameworks, Breaking-Changes]
---

https://astro.build/blog/astro-6/

## Why This Matters

Astro 6.0 shipped on March 10, 2026. It is architecturally significant -- the dev server was fundamentally redesigned, legacy content collection support was fully removed, and three major dependency upgrades landed at once (Vite 7, Zod 4, Shiki 4). The Astro Technology Company also joined Cloudflare in January 2026, which shows in the deep platform integration work.

The central thesis: **"Run your exact production runtime during development."** The persistent "works in dev, breaks in prod" problem is addressed at the architecture level.

## The Big New Capabilities

### Redesigned Dev Server (Vite Environment API)
Astro 6 uses Vite 7's new Environment API to run custom runtime environments during development. The dev server and build pipeline now share code paths. For Cloudflare users, this means `workerd` runs at every stage -- dev, prerender, production -- with direct access to KV, D1, R2, and Durable Objects locally. No simulation layers.

This is the marquee architectural change and it applies beyond Cloudflare -- any adapter can now provide its own runtime environment during development.

### Built-in Fonts API
Automatically downloads, caches, and self-hosts fonts. Generates optimized fallback fonts and adds preload links. Supports Google Fonts and Fontsource out of the box.

```js
// astro.config.mjs
export default defineConfig({
  fonts: {
    families: [
      { name: "Inter", provider: "google" }
    ]
  }
});
```

No more manual `@font-face` declarations, FOUT management, or third-party font loading libraries.

### Live Content Collections
Uses `defineLiveCollection()` in `src/live.config.ts`. Content updates at request time without rebuild cycles -- useful for CMS content, API data, or editorial updates. Uses the same query APIs as build-time collections (`getCollection()`, `getEntry()`).

This is a meaningful step toward Astro being viable for content that changes more frequently than your deploy cycle.

### Content Security Policy (CSP)
Built-in configuration with automatic script and style hashing. Works on static and dynamic pages. Single-flag activation:

```js
security: { csp: true }
```

Full configuration API for custom directives. Previously required third-party middleware or manual header management.

### Route Caching (Experimental)
Platform-agnostic cache API using web standard semantics. Built-in `memoryCache` provider with `Astro.cache.set()` / `context.cache` for per-request caching. Supports max age, stale-while-revalidate, and tagged invalidation.

## Breaking Changes That Matter

### Node.js 22 Required
Node 18 and 20 support dropped entirely. Minimum: **Node 22.12.0**.

### Legacy Content Collections Fully Removed
- `type: 'content'` and `type: 'data'` without loaders no longer work
- All collections must use the Content Layer API with a `loader` (e.g., `glob()`)
- `entry.slug` replaced by `entry.id`
- `entry.render()` removed -- use `import { render } from 'astro:content'`
- Config file must be at `src/content.config.ts` (not `src/content/config.ts`)

### Zod 4
- `z` is deprecated as an export from `astro:content` -- import from `astro/zod` instead
- `.default()` with transforms: defaults must now match the output type
- `z.string().email()` deprecated -- use `z.email()`
- Error customization: `{ message: "..." }` becomes `{ error: "..." }`

### Shiki 4
Updated syntax highlighting engine. Mostly a cleanup release removing deprecated APIs. If you use `createHighlighter` (the modern API), no code changes needed.

### Removed APIs
- `<ViewTransitions />` -- use `<ClientRouter />`
- `Astro.glob()` -- use `import.meta.glob()` or `getCollection()`
- `getStaticPaths()` params must be strings, not numbers
- `getStaticPaths()` can no longer access `Astro` object
- CommonJS config files no longer supported
- Markdown heading ID generation algorithm changed (may break anchor links)

### Behavioral Changes
- `<script>` and `<style>` tags now render in source order (previously reversed)
- Images are now cropped by default and never upscaled
- `getImage()` throws when called client-side
- `import.meta.env` values are always inlined

## What's Coming Next

### Rust Compiler (Experimental)
A successor to the Go-based `.astro` compiler. Faster compilation, stronger diagnostics, improved reliability. Enable with `experimental: { rustCompiler: true }`. Intended to become the default in a future major release.

### Queued Rendering (Experimental)
Two-pass rendering strategy claiming up to **2x faster rendering** with improved memory efficiency. Planned as the default for Astro 7.

```js
experimental: { queuedRendering: { enabled: true } }
```

### The Trajectory
Astro is moving fast -- 6.1 shipped just 16 days after 6.0. The Cloudflare acquisition, Rust compiler, and queued rendering all point toward Astro positioning itself as a full-stack platform, not just a static site generator.

## How Significant Is This Compared to Prior Releases?

| Version | Year | Significance |
|---------|------|-------------|
| Astro 2 | 2023 | Content collections introduced |
| Astro 3 | 2023 | View Transitions, faster builds |
| Astro 4 | 2024 | Dev toolbar, i18n routing, incremental content caching |
| Astro 5 | 2025 | Content Layer API, Server Islands, astro:env |
| **Astro 6** | **2026** | **Dev server redesign, live collections, CSP, Vite 7, legacy removed** |

Astro 6 is comparable in scope to Astro 5. The architectural changes (Vite Environment API, live collections) are foundational, and the aggressive removal of legacy APIs signals the framework is prioritizing forward momentum over backwards compatibility.

## Our Experience

We upgraded from Astro 5.16.11 to 6.1.2 on 2026-03-30. Required changes:
1. Migrated `z` import from `astro:content` to `astro/zod` in `content.config.ts`
2. Converted two legacy collections (`type: 'content'` and `type: 'data'`) to use glob loaders
3. Updated all @astrojs/* integrations in lockstep

Production build succeeded on first attempt with no errors. The upgrade was smoother than expected -- our content collections were already mostly on the Content Layer API from Astro 5.
