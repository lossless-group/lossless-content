---
date_created: 2026-06-21
date_modified: 2026-06-21
title: Astro 6.4 - Pluggable Markdown and a Rust Processor
slug: astro-6-4-pluggable-markdown-and-a-rust-processor
tags: [Astro-Ecosystem, Web-Frameworks, Markdown, Build-Performance]
---

https://astro.build/blog/astro-640/

## Why This Matters

Astro 6.4 shipped on May 28, 2026. Unlike 6.0 (architectural) or 6.3 (safer-by-default), this release is squarely about **Markdown** -- and that makes it directly relevant to us, because Markdown *is* our content layer. The headline change opens up Astro's previously-fixed unified pipeline so you can swap the entire Markdown processor, and ships a Rust-based alternative that claims to shave **over a minute** off large-doc-site builds.

For a content repo this size, "the Markdown pipeline is now pluggable and there's a faster one" is the most consequential point release of the 6.x line so far -- but it comes with a real tension against Lossless Flavored Markdown, which leans heavily on the remark/rehype ecosystem. Read the trade-off section before reaching for the fast option.

## The Big New Capabilities

### Pluggable Markdown Processor API

A new `markdown.processor` config option lets you replace the default unified-based pipeline wholesale. The default is unchanged (`unified()`), so existing sites keep working:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [remarkToc],
    }),
  },
});
```

This is the architectural shift: Markdown processing is no longer hard-wired. Plugin configuration now lives *inside* the processor rather than as top-level `markdown.*` keys.

### Sätteri -- a Rust Markdown Processor

A new `@astrojs/markdown-satteri` package ships a Rust-based processor. The headline claim: switching the Astro and Cloudflare docs sites to Sätteri "shaved over a minute off their respective build time."

```bash
npm install @astrojs/markdown-satteri
```

```js
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  markdown: {
    processor: satteri({
      features: { directive: true },
    }),
  },
});
```

**The catch that matters for us:** Sätteri does **not** run remark or rehype plugins. To use it you either drop the unified ecosystem entirely or port plugins to Sätteri's MDAST/HAST. That is a hard wall for any site rendering Lossless Flavored Markdown through remark-directive, callout transforms, wikilinks, or citation plugins -- those would have to be reimplemented against Sätteri's AST. The speed is real; the migration cost for an LFM site is non-trivial.

### Cloudflare Advanced Routing Helpers

`@astrojs/cloudflare` adds a `cf()` helper that wires the experimental fetch-handler routing (introduced in 6.3) into Cloudflare's runtime -- handling SESSION KV binding injection, static asset serving, `locals.cfContext`, client addresses, `waitUntil`, and prerendered error pages.

```ts
import { astro, FetchState } from 'astro/fetch';
import { cf } from '@astrojs/cloudflare/fetch';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const state = new FetchState(request);
    const asset = await cf(state, env, ctx);
    if (asset) return asset;
    return astro(state);
  },
};
```

There's also a Hono variant (`import { cf } from '@astrojs/cloudflare/hono'; app.use(cf())`). Still experimental and not relevant to our current stack -- but the Cloudflare integration keeps deepening, consistent with the post-acquisition trajectory.

## Deprecations That Matter

These top-level `markdown.*` options are now **deprecated** in favor of passing them to the processor, and are scheduled for **removal in Astro 8.0**:

- `markdown.remarkPlugins`
- `markdown.rehypePlugins`
- `markdown.remarkRehype`
- `markdown.gfm`
- `markdown.smartypants`

**This is the action item for our sites.** Anywhere our `astro.config.*` sets `markdown.remarkPlugins` / `markdown.rehypePlugins` (which is most LFM-rendering sites), the forward-compatible move is to migrate those into an explicit `processor: unified({ remarkPlugins, rehypePlugins })` block. Nothing breaks in 6.4 -- the old keys still work -- but the clock is now running toward Astro 8.

## Migration Recommendation

For Astro Knots sites currently on 6.0–6.3:

1. **Bump and rebuild.** No required code changes; the default processor is still `unified()`.
2. **Migrate `markdown.*` plugin config into a `processor: unified({...})` block.** Pre-empts the Astro 8 removal. A grep for `remarkPlugins`/`rehypePlugins` across our `astro.config.*` files surfaces every site that needs it.
3. **Do NOT adopt Sätteri on LFM sites without a port plan.** Sätteri can't run our remark/rehype directive + callout + wikilink + citation chain. It's tempting for build speed, but it would silently drop the LFM transforms. Consider it only for plain-Markdown or docs-style sites where we don't lean on the unified ecosystem.
4. **Skip the Cloudflare `cf()` / fetch-handler routing.** Still experimental; wait for it to graduate.

Upgrade via `npx @astrojs/upgrade` (or `npm install astro@latest`).

## Trajectory Note

Astro 6.4 lands ~2.5 months after 6.0 -- the aggressive cadence holds. The arc of 6.x is now legible: 6.0 redesigned the runtime, 6.3 made image/cookie handling safer-by-default, and 6.4 opens the Markdown pipeline and starts the migration toward processor-scoped config. The Rust processor (Sätteri) echoes the experimental Rust `.astro` compiler from 6.0 -- the team is steadily moving hot paths to Rust. For a Markdown-first shop, the takeaway is twofold: **migrate plugin config now**, and **watch Sätteri** -- if a Rust processor ever gains remark/rehype compatibility (or someone ports the LFM transforms), the build-time win becomes ours to take.
