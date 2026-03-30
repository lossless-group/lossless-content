---
date_created: 2026-03-30
date_modified: 2026-03-30
title: TypeScript 6 is Released
slug: typescript-6-is-released
tags: [TypeScript-Ecosystem, Breaking-Changes]
---

https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/

## Why This Matters

TypeScript 6.0, released March 23, 2026, is **the final release built on the JavaScript codebase**. After this, the compiler moves to Go with TypeScript 7.0 (codenamed "Corsa"). This is a deliberate bridge release -- it introduces aggressive breaking changes and deprecations now so the ecosystem can prepare before 7.0 removes them entirely.

## The Big Picture

TypeScript 6.0 is a cleanup release. The native Go-based TypeScript 7.0 is "extremely close to completion" and expected within months. The 7.0 benchmarks are dramatic:

| Project | TS 5.x/6.x | Native 7.0 | Speedup |
|---------|-------------|------------|---------|
| VS Code (1.5M lines) | 77.8s | 7.5s | 10.4x |
| Playwright (356K lines) | 11.1s | 1.1s | 10.1x |
| TypeORM (270K lines) | 17.5s | 1.3s | 13.5x |

Editor loading for VS Code drops from 9.6 seconds to ~1.2 seconds. Memory usage roughly halves.

## Key Breaking Changes

**New defaults that will surprise you:**
- `strict: true` (was `false`)
- `module: esnext` (was `commonjs`)
- `target: es2025` (floating to current-year ES version)
- `types: []` (was auto-enumerated from `node_modules/@types` -- this alone can improve build times 20-50%)

**Removed or deprecated:**
- `target: es5` -- deprecated; ES2015 is now the minimum
- `--moduleResolution node` -- must migrate to `nodenext` or `bundler`
- `--moduleResolution classic` -- removed entirely
- `--module amd/umd/systemjs/none` -- removed
- `--outFile` -- removed; use external bundlers
- `esModuleInterop: false` -- can no longer be disabled
- `--baseUrl` as module resolution root -- deprecated

**Escape hatch:** `"ignoreDeprecations": "6.0"` in tsconfig suppresses deprecation errors, but provides no path forward for 7.0.

## New Features

- **Temporal API types** now included in built-in type libraries
- `es2025` target with `RegExp.escape` support
- Subpath imports with `#/` prefix (Node.js `#/*` patterns)
- `--stableTypeOrdering` flag for validating code against 7.0's parallel type-checker behavior
- DOM iteration types consolidated into base `lib.dom`

## Our Experience

We attempted upgrading to TypeScript 6 as part of our Astro 6 site dependency upgrade on 2026-03-30. **We had to revert** -- the Astro toolchain (`tsconfck`, `@astrojs/check`, `svelte2tsx`) all still require TypeScript 5.x via peer dependencies. This is typical for early weeks after a major TS release. We'll revisit once the ecosystem catches up.

## What To Watch

- TypeScript 7.0 (native Go port) release timeline
- Astro and Svelte tooling support for TS 6
- Whether the `types: []` default causes widespread CI breakage across the ecosystem
- Preview builds of 7.0 available via `@typescript/native-preview` npm package
