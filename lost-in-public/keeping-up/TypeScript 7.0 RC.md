---
date_created: 2026-06-21
date_modified: 2026-06-22
title: TypeScript 7.0 RC - The Go Rewrite Reaches Release Candidate
slug: typescript-7-0-rc-the-go-rewrite-reaches-release-candidate
tags:
  - TypeScript-Ecosystem
  - JavaScript-Ecosystem
  - Programming-Languages
maintained_by: "[[organizations/Microsoft|Microsoft]]"
---

https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/

## Why This Matters

TypeScript 7.0 hit Release Candidate on June 18, 2026, with stable expected within a month. This is the payoff for the bridge release we [tried and reverted on 2026-03-30](TypeScript 6 is Released) -- the compiler is no longer TypeScript-compiling-itself; it's a methodical port to **Go**. The headline holds: 7.0 is "often about 10 times faster" than 6.0, from native code plus shared-memory parallelism. The type-checking logic is the same as 6.0 -- they ported structure, not semantics -- so a clean 6.0 codebase should type-check identically, just far faster.

Install side-by-side without committing: `npm install -D typescript@rc` (the binary reports `7.0.1-rc`), and a `@typescript/typescript6` shim gives you a `tsc6` for A/B comparison.

But "reword all the pain points" is the right framing for this post, because the RC is mostly a list of things that used to be tolerated and are now **hard errors**. Here's every friction point, in plain terms.

## The Pain Points, Reworded

### Config defaults you relied on are now errors, not warnings

6.0 deprecated these; 7.0 deletes them. Each of the following stops your build cold:

- **`target: es5` is gone.** ES5 output is no longer a thing. So is `downlevelIteration` -- the flag only existed to make ES5 iteration work, and there's no ES5 to down-level to.
- **`moduleResolution: node` / `node10` / `classic` are gone.** You must be on `nodenext` or `bundler`. Classic resolution -- the pre-Node algorithm some ancient configs still carried -- is fully removed.
- **`module: amd | umd | systemjs | none` are unsupported.** Use `esnext` or `preserve`. The pre-ESM module formats are simply not emitted anymore.
- **`baseUrl` is eliminated.** Path mapping now resolves via `paths` relative to the project root. Any `baseUrl`-based import root has to be rewritten.
- **You can no longer turn safety *off*.** `esModuleInterop: false`, `allowSyntheticDefaultImports: false`, and `alwaysStrict: false` are all disallowed -- the permissive side of these switches no longer exists.
- **`module` as a namespace keyword is forbidden** (use `namespace`), and **`assert` on imports must become `with`** to match the ECMAScript import-attributes standard.

### New defaults will surprise an unprepared project

Even if you remove nothing, the *defaults* changed underneath you:

- **`strict: true`** is now the baseline (was conditional/off).
- **`module: esnext`** is the default (was `commonjs`) -- the single most likely source of "suddenly everything is an ESM error."
- **`types: []`** instead of the old implicit `["*"]`. TypeScript no longer auto-discovers every `@types/*` in `node_modules`; you must list what you actually use: `"types": ["node", "jest"]`. This is the one most likely to break CI across the ecosystem (and, conversely, the one that speeds builds the most).
- **`rootDir` is no longer inferred.** If your `tsconfig.json` sits outside your source, you now need an explicit `"rootDir": "./src"` and matching `"include": ["./src"]`.
- **`noUncheckedSideEffectImports: true`**, **`libReplacement: false`**, and **`stableTypeOrdering: true`** (which can't be disabled) are all on by default.

### Unicode now behaves correctly -- which breaks code that depended on it being broken

Template-literal type inference now splits on **Unicode code points**, not UTF-16 surrogate halves:

```ts
type HeadTail<S> = S extends `${infer Head}${infer Tail}` ? [Head, Tail] : never;
type Result = HeadTail<"😀abc">;
// 7.0:        ["😀", "abc"]
// Previously: ["\ud83d", "\ude00abc"]
```

This is strictly more correct, but any type-level string utility that was written around the old surrogate-pair behavior will now produce different types.

### JavaScript (`.js`) analysis was realigned with `.ts` -- old JSDoc tricks stop working

If you lean on checked JavaScript, a pile of loose patterns are gone: values can no longer stand in for types (use `typeof value`), `@enum` JSDoc is removed (use `@typedef`), bare `?` is no longer a type (use `any`), `@class` no longer turns a function into a constructor (write a real `class`), postfix `!` is unsupported, and Closure-style `function(string): void` signatures are dropped. Special handling for `this`-aliasing and `prototype` reassignment is also gone. Net: JS-with-JSDoc shops have real migration work.

### The parallelism is fast but has sharp edges

The speed comes from **4 parallel type-checking workers** by default (`--checkers`), plus a separate `--builders` flag for parallel project-reference builds -- and these multiply (`--checkers 4 --builders 4` = up to 16 concurrent checkers, which is usually too many). More cores means more speed *and* more memory. The subtle trap: with varying `--checkers` counts you can, in rare cases, surface order-dependent type-checking results -- so if cross-environment consistency matters, **pin a fixed checker count** everywhere (or use `--singleThreaded` for debugging and apples-to-apples comparison). The `--watch` mode was also rebuilt on Parcel's file-watcher (ported C++→Go), fixing the old `node_modules` polling tax.

### It's an RC, so the ground is still moving

- **The programmatic compiler API is unstable until 7.1** (several months out). Anything that imports `typescript` as a library rather than shelling out to `tsc` should wait.
- The team tracks remaining 6.0→7.0 differences in a `CHANGES.md`; some JavaScript patterns are still in flux.
- Command-line builds now require `--ignoreConfig` to bypass a present `tsconfig.json`.
- Bugs go to the `microsoft/typescript-go` repo; Microsoft is explicitly asking for pre-stable feedback.

## What To Watch

- **Whether our Astro toolchain peer-deps have caught up.** We reverted TS 6 on 2026-03-30 because `tsconfck`, `@astrojs/check`, and `svelte2tsx` still pinned TS 5.x. 7.0 RC raises the same question -- the editor story now runs through the **TypeScript Native Preview** VS Code extension and a new multi-threaded LSP, so our [[astro-knots]] sites can't adopt it until that chain moves.
- **The `types: []` default** breaking CI across our repos -- the most likely silent failure.
- **The one-month window to stable**, and 7.1 for a stable programmatic API.
- Real-world validation is already broad (Bloomberg, Canva, Figma, Google, Linear, Notion, Slack, Vercel, VoidZero all report ~10x), and the LSP reportedly fails 20x fewer commands than 6.0 against GitHub's top codebases -- so the question for us is ecosystem peer-deps, not compiler readiness.
