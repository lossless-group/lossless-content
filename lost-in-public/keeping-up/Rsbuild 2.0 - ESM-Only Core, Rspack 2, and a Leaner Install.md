---
date_created: 2026-07-01
date_modified: 2026-07-01
title: Rsbuild 2.0 - ESM-Only Core, Rspack 2, and a Leaner Install
slug: rsbuild-2-0-esm-only-core-rspack-2-and-a-leaner-install
tags: [Build-Tooling, Rstack-Ecosystem, Rsbuild, Module-Federation, Breaking-Changes]
---

https://rsbuild.rs/blog/v2-0

## Why This Matters

Rsbuild 2.0 shipped on **April 22, 2026** — recent, but directly load-bearing for us. Rsbuild is the build tool for **augment-it's entire front end**: a Module-Federation shell mounting 13 micro-frontends, every one built by Rsbuild with `@rsbuild/plugin-svelte`. Our trunk branch is literally named `rebuild/turbo-rsbuild`. When the build system releases a major, it's not optional reading.

The 2.0 story is "leaner and more modern, at the cost of an ESM-only cut and a Rspack 2 bump." Most of the breaking changes are gentle for a project already on modern Node and ESM configs — which we are. The one that genuinely matters for our stack is the **Module Federation runtime unbundling**, which is why the Rsbuild and `@module-federation/*` upgrades have to move as a unit.

## What Rsbuild Is (for the passer-by)

Rsbuild is the application build tool of the **Rstack** ecosystem — the Rspack-based successor to the webpack world, sibling to Rspress (docs), Rslib (libraries), and Rstest (testing). Since 1.0 its weekly npm downloads grew **more than 15x**; it's now the default choice for new Rspack projects and the common landing spot for teams fleeing webpack / Create React App for build speed.

## The Headline Changes

- **Rspack 2.0 under the hood** — faster builds, better output optimization.
- **`@rsbuild/core` is now pure ESM.** CommonJS output is removed, shrinking the package ~500 KB. Node 20+ loads ESM natively, so most projects need no code change.
- **Default dependencies dropped from 13 to 4**, cutting install size ~2 MB. `core-js`, `@module-federation/runtime-tools`, and `webpack-bundle-analyzer` are no longer bundled — they install only when actually needed.
- **Node.js floor raised to `20.19+` or `22.12+`.** Node 18 support is gone (it hit EOL April 2025).

## Breaking Changes

### `@rsbuild/core` is ESM-only

CJS output removed. If a config or plugin did `require('@rsbuild/core')`, it must move to `import`. Our `rsbuild.config.ts` files are already ESM (`export default defineConfig(...)`), so this is a no-op for us — but any downstream tooling that `require`d Rsbuild would break.

### `server.host` defaults to `localhost` (was `0.0.0.0`)

The dev server now binds to `localhost` only, for security. To expose it on the network (other devices, containers, LAN testing), pass `--host` or set `server.host: '0.0.0.0'` explicitly.

```ts
// Restore old network-accessible behavior
server: { host: '0.0.0.0' }
```

### Module Federation runtime tools no longer bundled

`@module-federation/runtime-tools` is dropped from the default dependency set. Federated apps now supply the runtime through their **Module Federation plugin** rather than getting it transitively from Rsbuild. This is the change that couples the upgrades — see the migration section.

### `performance.chunkSplit` → `splitChunks`

The old chunk-splitting config is deprecated in favor of a new top-level `splitChunks` option whose behavior aligns fully with Rspack's native implementation (including presets like `per-package`).

```ts
// Rsbuild 1
performance: { chunkSplit: { strategy: 'split-by-experience' } }
// Rsbuild 2
splitChunks: { preset: 'per-package' }   // aligned to Rspack native
```

### `http-proxy-middleware` v2 → v4

`server.proxy` now runs on `http-proxy-middleware` v4 (which swapped the unmaintained `http-proxy` for the maintained `httpxy`). Proxy config fields need review against the v4 shape if you use them.

### Default output/target shifts

- **Browser targets jumped to Baseline 2025-05-01**: Chrome 107 (was 87), Edge 107 (was 88), Firefox 104 (was 78), Safari 16 (was 14). Less legacy transpilation, smaller output — but drops old browsers.
- **Node.js output is now unminified ESM** (was minified CJS). For CJS output set `module: false` and `minify: true` explicitly.
- **`decorators.version` default moved `2022-03` → `2023-11`** (latest TC39). Legacy decorator behavior must be set explicitly.

## New Features Worth Knowing

- **React Server Components** via `rsbuild-plugin-rsc`, built on Rspack's native RSC support and Rsbuild's Environments API.
- **`hot.send` API** for server→client messaging over the existing HMR channel (client listens via `import.meta.webpackHot.on`).
- **`server.setup`** — run initialization logic at dev/preview server startup (supersedes `setupMiddlewares` for setup work).
- **`customLogger`** — per-instance logger with custom levels/prefixes.
- **`splitChunks` presets** — notably `per-package`, matching Rspack native.
- **`create-rsbuild` template upgrades** — now generates an `AGENTS.md` by default, offers React Compiler selection, and adds experimental Rslint integration.

## Migration Recommendation (for augment-it specifically)

Where our tree actually stands against the breaking list:

1. **Node: already clear.** We run Node 22.18, comfortably above the `22.12+` floor. No runtime bump needed.
2. **ESM config: already clear.** Every `rsbuild.config.ts` uses `export default defineConfig`. The ESM-only core is a non-event for us.
3. **`server.host`: aligned, with one caveat.** Our configs only set `server: { port }`, and every federation remote is referenced as `http://localhost:PORT/remoteEntry.js`. The new `localhost` default *matches* that topology, so local dev keeps working. The caveat: the moment someone needs to hit the shell from another device (phone testing, a container), they'll need `--host 0.0.0.0` — it won't "just work" on the LAN like it did under the old `0.0.0.0` default.
4. **`chunkSplit` / `proxy`: not used.** Neither key appears in our configs, so those two migrations don't touch us.
5. **The real work — upgrade Rsbuild and Module Federation as ONE unit.** Because 2.0 stops bundling `@module-federation/runtime-tools`, bumping `@rsbuild/core` 1→2 and `@rsbuild/plugin-svelte` 1→2 *without* also moving `@module-federation/enhanced` and `@module-federation/rsbuild-plugin` (0.18 → 2.6) risks a shell that builds but can't wire up its remotes. Bump all four together, then `rsbuild build` the shell plus one host app and confirm the remotes still mount before trusting it.

The Rstack team also ships an automated upgrade skill:

```bash
npx skills add rstackjs/agent-skills --skill rsbuild-v2-upgrade
```

## Trajectory Note

Rsbuild 2's throughline is subtraction: ESM-only, 13→4 default deps, runtime tools unbundled, modern browser floor. The Rstack ecosystem is betting that "modern Node, modern browsers, install only what you use" is now a safe default — and for a greenfield-ish micro-frontend project on current Node, they're mostly right. For us the lesson rhymes with the [[zod-4-a-faster-rewrite-and-a-long-list-of-breaking-changes|Zod 4]] one: the scary-looking major is mostly gentle *because* we already keep the fundamentals current (ESM configs, Node 22). The single non-trivial bit — Module Federation runtime unbundling — is a coupling to respect, not a wall to fear. Move the four packages together, verify the remotes mount, and the `rebuild/turbo-rsbuild` trunk earns its name.
