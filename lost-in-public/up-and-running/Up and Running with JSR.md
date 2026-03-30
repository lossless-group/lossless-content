---
date_created: 2026-03-30
date_modified: 2026-03-30
title: "Up and Running with JSR"
lede: "From zero to published TypeScript package on JSR — the modern, TypeScript-first package registry built by the Deno team. A journal of publishing @lossless-group/lfm, our first shared package."
tags: [JSR, Package-Management, Deno, TypeScript, Publishing, Up-And-Running]
category: "Up and Running"
authors:
  - Michael Staton
  - AI Labs Team
og_favicon: "https://i.imgur.com/CcUCnqp.png"
augmented_with: "Claude Code on Opus 4.5"
publish: true
version: 0.0.1.0
site_uuid: f0d2876f-6382-4b5e-a510-10108d1663b2
---

# Up and Running with JSR


![](https://i.imgur.com/CcUCnqp.png)


So, March 2026 I "published my first package" using the [[concepts/Explainers for Tooling/Package Management|Package Manager]] and associated package marketplace from [[Tooling/Software Development/Developer Experience/DevTools/JSR.io|JSR.io]].

[[Tooling/Software Development/Developer Experience/DevTools/JSR.io|jsr]] is part of the [[Tooling/Software Development/Developer Experience/Deno|Deno]] universe, which is founder [[Sources/People/Ryan Dahl|Ryan Dahl]]'s retrospective fix for a lot of the legacy technical debt and developer frustration caused by early decisions for [[Tooling/Software Development/Developer Experience/DevTools/Node.js|Node.js]] and [[Tooling/Software Development/Developer Experience/DevTools/Node Package Manager|npm]]. 

![Look Mom, I published my first JSR Package, JSR.io screenshot of initial success page.](https://i.imgur.com/zHoS6wR.png)

## Why JSR and Not Just npm?

We had just created `@lossless-group/lfm` (Lossless Flavored Markdown) — a shared remark/rehype pipeline that multiple sites need. ([[Tooling/Software Development/Programming Languages/Libraries/Remark.js|Remark.js]]) The question was where to publish it.

[[Tooling/Software Development/Developer Experience/DevTools/Node Package Manager|npm]] is the 800-pound gorilla — 15 years old, 3 million packages, everyone uses it. But it feels like publishing to a legacy system. You have to compile your TypeScript to JavaScript before publishing. There's no type checking on upload. No auto-generated docs. The CLI is `npm publish` and it just... pushes a tarball. That's it.

JSR (jsr.io) is the Deno team's modern alternative:
- **TypeScript-first** — you publish `.ts` source directly, no build step
- **Auto-generates API documentation** from your JSDoc comments
- **Type-checks your package** on publish (catches bugs before your users do)
- **Works with pnpm, Deno, and Bun** — not Deno-only
- **Free, no auth token needed** to install public packages

We ended up publishing to both [[Tooling/Software Development/Developer Experience/GitHub|GitHub]] Packages (for our existing pnpm workflow) and JSR (for the modern experience). This doc covers the JSR side.

## The Package We Published

`@lossless-group/lfm` — a markdown processing pipeline that bundles unified, remark-parse, remark-gfm, remark-directive, and our custom remark-callouts plugin. One import, one function call:

```typescript
import { parseMarkdown } from '@lossless-group/lfm';
const tree = await parseMarkdown(markdownContent);
```

The source lives in our astro-knots monorepo at `packages/lfm/`.

## Step 1: Create Your Scope on jsr.io

Go to [jsr.io](https://jsr.io) and sign in with GitHub. Then go to [jsr.io/new](https://jsr.io/new) to create a scope and package.

**Scope** = your namespace. Ours is `lossless-group` (matches our GitHub org). You type it into the scope field, give it a description, and hit Create.

**Package name** = the package within that scope. Ours is `lfm`. So the full name is `@lossless-group/lfm`.

This is a one-time setup. After this, publishing is all CLI.

## Step 2: Add a deno.json to Your Package

JSR uses `deno.json` (or `jsr.json`) as its config file. This is what ours looks like:

```json
{
  "name": "@lossless-group/lfm",
  "version": "0.1.3",
  "description": "Lossless Flavored Markdown — a polyglot extended markdown pipeline for remark/rehype",
  "license": "MIT",
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/types/index.ts"
  },
  "publish": {
    "include": ["src/**/*.ts", "deno.json", "LICENSE", "README.md"]
  },
  "imports": {
    "unified": "npm:unified@^11.0.0",
    "remark-parse": "npm:remark-parse@^11.0.0",
    "remark-gfm": "npm:remark-gfm@^4.0.0",
    "remark-directive": "npm:remark-directive@^3.0.0",
    "mdast": "npm:@types/mdast@^4.0.0"
  },
  "nodeModulesDir": "auto"
}
```

Key things to note:

### `exports` points to TypeScript source

Unlike npm where you publish compiled JS (`./dist/index.js`), JSR publishes your `.ts` files directly. The `exports` field points to your TypeScript entry points. JSR handles compilation for consumers.

### `publish.include` controls what ships

Only the files matching these patterns are uploaded. **Make sure `README.md` is included** — this is what shows up on the JSR Overview page. We forgot this initially and got an empty Overview.

### `imports` declares npm dependencies

If your package depends on npm packages (most do), declare them with the `npm:` prefix in the `imports` field. This tells JSR's doc generator how to resolve them. Without this, you'll get `Failed resolving` errors on publish.

### `nodeModulesDir: "auto"` for npm compat

This tells Deno to use `node_modules/` when it finds a `package.json` — needed when your package uses npm dependencies and you're developing in a Node/pnpm workspace.

## Step 3: Write JSDoc Comments (This Is Your Documentation)

JSR auto-generates API documentation from JSDoc comments in your TypeScript source. The quality of your docs page is directly proportional to the quality of your JSDoc.

### Module-level doc (the `@module` tag)

The first JSDoc block in your entry point file, tagged with `@module`, becomes the module description on the Docs page:

```typescript
/**
 * @module
 *
 * **Lossless Flavored Markdown** — a polyglot extended markdown pipeline.
 *
 * One package, one import. Bundles unified, remark-parse, remark-gfm,
 * remark-directive, and custom plugins.
 *
 * @example Basic usage
 * ```ts
 * import { parseMarkdown } from '@lossless-group/lfm';
 * const tree = await parseMarkdown('# Hello');
 * ```
 */
```

### Export-level docs

Every exported function, type, and interface should have a `/** */` comment:

```typescript
/** Parse a markdown string into an MDAST tree with all LFM extensions applied. */
export { parseMarkdown, createLfmProcessor } from './parse.js';

/** Obsidian callout normalizer — transforms `> [!type]` into directive nodes. */
export { remarkCallouts } from './plugins/remark-callouts.js';
```

### What JSR generates from this

- **Overview page** — your `README.md`
- **Docs tab** — auto-generated from `@module`, exported symbols, JSDoc comments, and `@example` blocks
- **Type signatures** — extracted from your TypeScript types automatically

Regular `//` comments are ignored. Only `/** */` JSDoc comments are picked up.

## Step 4: Publish

### Dry run first

```bash
pnpx jsr publish --dry-run --allow-dirty
```

This checks for:
- **Slow types** — JSR requires explicit return types on all public API functions. If you have `export function foo() { return something; }` without a return type annotation, it'll flag it. This is intentional — it makes the auto-docs better and your consumers' type checking faster.
- **Missing license** — needs a `license` field in `deno.json` or a `LICENSE` file
- **Uncommitted changes** — `--allow-dirty` bypasses this (useful when publishing from a monorepo where other stuff is in flight)

### Actual publish

```bash
pnpx jsr publish --allow-dirty
```

This opens a browser tab asking you to authorize the publish. You approve it, and the package is live within seconds.

The `--allow-dirty` flag is practically required if you're publishing from a monorepo — there will always be uncommitted changes in other packages or sites.

## Gotchas We Hit

### 1. "Failed resolving './mdast' from 'file:///src/types/index.ts'"

Our types file imported from `mdast`:

```typescript
import type { Parent, Literal } from 'mdast';

export interface LfmCalloutNode extends Parent {
  // ...
}
```

JSR's doc generator couldn't resolve `mdast` even with the import map. The fix: make the types standalone instead of extending mdast types:

```typescript
export interface LfmCalloutNode {
  type: 'containerDirective';
  name: 'callout';
  attributes: { type: string; title?: string; };
  children?: unknown[];
}
```

Less elegant, but JSR-compatible. The type still describes the same shape — it just doesn't formally extend the mdast `Parent` interface.

### 2. "missing explicit return type in the public API"

JSR enforces explicit return types on exported functions. This failed:

```typescript
export function createProcessor(options?) {
  return unified().use(remarkParse);
}
```

Fixed by adding the return type:

```typescript
export function createProcessor(options?): Processor {
  return unified().use(remarkParse) as unknown as Processor;
}
```

The `as unknown as Processor` cast is ugly but necessary because unified's generic types are complex and the `.use()` chain changes the type at each step. JSR just needs the declared return type for docs generation.

### 3. Empty Overview page

JSR shows `README.md` as the Overview page, but only if it's included in your `publish.include` array. We initially had:

```json
"include": ["src/**/*.ts", "deno.json", "LICENSE"]
```

Missing `README.md`. Fixed by adding it:

```json
"include": ["src/**/*.ts", "deno.json", "LICENSE", "README.md"]
```

### 4. Version already exists

If a publish fails partway through (ours failed on the mdast resolution error), the version number may be "consumed" on JSR. You can't republish the same version. Bump the patch version and try again.

### 5. Authentication from non-interactive terminals

`pnpx jsr publish` needs to open a browser for auth. This doesn't work from non-interactive contexts (like Claude Code's Bash tool). You have to run it from your actual terminal session using the `!` prefix in Claude Code:

```bash
cd packages/lfm && pnpx jsr publish --allow-dirty
```

## The Result

Our package at [jsr.io/@lossless-group/lfm](https://jsr.io/@lossless-group/lfm):

- **Overview** — README with install instructions, usage examples, roadmap
- **Docs** — auto-generated API documentation from JSDoc comments, with type signatures and examples
- **Versions** — each publish is immutable and browsable
- **Score** — JSR gives packages a quality score based on docs coverage, types, etc.

## File Structure That Makes JSR Happy

Here's the minimal file structure for a JSR-publishable package:

```
packages/your-package/
├── deno.json              # JSR config (name, version, exports, publish rules)
├── package.json           # npm/pnpm config (for GitHub Packages + local dev)
├── tsconfig.json          # TypeScript config
├── tsup.config.ts         # Build config (for GitHub Packages — JSR doesn't need this)
├── LICENSE                # Required by JSR

![](https://i.imgur.com/HQPOIsp.png)
├── README.md              # Shows on JSR Overview page
└── src/
    ├── index.ts           # Entry point with @module JSDoc
    ├── types/
    │   └── index.ts       # Standalone types (don't extend npm types for JSR compat)
    └── plugins/
        └── your-plugin.ts # Individual plugins
```

The key insight: you maintain **two configs** side by side. `deno.json` for JSR (publishes TypeScript source), `package.json` + `tsup.config.ts` for GitHub Packages/npm (publishes compiled JavaScript). Same source code, two distribution channels.

## Publishing Checklist

When releasing a new version:

1. Bump version in **both** `package.json` and `deno.json`
2. `pnpm build` (for GitHub Packages)
3. Publish to GitHub Packages: create a temp `.npmrc` with auth token, `pnpm publish --no-git-checks`
4. Publish to JSR: `pnpx jsr publish --allow-dirty` (opens browser for auth)
5. Commit the version bump
6. Verify both registries show the new version

## Comparison: GitHub Packages vs JSR

| | GitHub Packages | JSR |
|---|---|---|
| **What you publish** | Compiled JS (`dist/`) | TypeScript source |
| **Build step required** | Yes (tsup) | No |
| **Auto-docs** | No | Yes (from JSDoc) |
| **Auth to install** | Yes (GITHUB_TOKEN) | No |
| **Auth to publish** | Token in .npmrc | Browser approval |
| **Type checking on publish** | No | Yes |
| **Works with pnpm** | Yes | Yes |
| **Maturity** | 5 years | 2 years |

For our workflow, GitHub Packages is the primary install source (our sites already have GitHub tokens configured for other purposes), and JSR is the modern docs/discovery surface.
