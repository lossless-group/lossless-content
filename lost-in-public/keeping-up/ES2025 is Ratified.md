---
date_created: 2026-03-30
date_modified: 2026-03-30
title: ES2025 is Ratified
slug: es2025-is-ratified
tags: [JavaScript-Ecosystem, EcmaScript, Breaking-Changes]
---

https://2ality.com/2025/02/ecmascript-2025.html

## Why This Matters

ECMAScript 2025 (the 16th edition) was published in June 2025. It is notably larger and more impactful than ES2023 or ES2024, containing 11 features -- several of which are substantial language-level improvements developers have wanted for years. By March 2026, all features have broad browser support and are safe to use in evergreen browsers and Node.js 22+.

TypeScript 6.0 now targets `es2025` by default, so this is no longer aspirational -- it's your compilation target.

## The Headline Features

### Iterator Helpers
Arguably the single biggest ergonomic improvement to JavaScript in years. Adds `map()`, `filter()`, `take()`, `drop()`, `flatMap()`, `reduce()`, `toArray()`, `forEach()`, `some()`, `every()`, `find()`, plus `Iterator.from()` to the Iterator prototype.

```js
function* naturals() {
  let i = 0;
  while (true) yield i++;
}

// Lazy -- no intermediate arrays, works on infinite sequences
const result = naturals()
  .filter(n => n % 2 === 0)
  .map(n => n ** 2)
  .take(5)
  .toArray();
// [0, 4, 16, 36, 64]
```

This brings JavaScript closer to Rust iterators or Python generators with built-in combinators. Works on any iterable -- generators, Maps, Sets, custom iterables -- without converting to an array first.

### New Set Methods
Seven methods on `Set.prototype`: `intersection()`, `union()`, `difference()`, `symmetricDifference()`, `isSubsetOf()`, `isSupersetOf()`, `isDisjointFrom()`.

```js
const frontend = new Set(["react", "svelte", "vue"]);
const weUse = new Set(["astro", "svelte", "tailwind"]);

frontend.intersection(weUse);       // Set {"svelte"}
frontend.union(weUse);              // Set {"react", "svelte", "vue", "astro", "tailwind"}
frontend.difference(weUse);         // Set {"react", "vue"}
weUse.isSubsetOf(frontend);         // false
```

Sets have been impoverished since ES2015. These operations eliminate hand-rolled loops and library dependencies for basic set algebra.

### Import Attributes + JSON Modules
Standardizes importing non-JavaScript modules with type validation:

```js
import data from "./config.json" with { type: "json" };
import styles from "./theme.css" with { type: "css" };
```

Replaces the earlier non-standard `assert` keyword. Ensures security by validating MIME types of imported resources. This is the formal mechanism that makes JSON imports work consistently across Node.js, Deno, and browsers.

### Promise.try()
Wraps sync or async function invocation in a Promise, catching synchronous throws as rejections:

```js
// Before: sync throw escapes the promise chain
Promise.resolve().then(() => mightThrowSync());

// After: clean and correct
Promise.try(() => mightThrowSync());
```

Small but eliminates a common class of bugs when mixing sync and async code.

### Float16Array + Math.f16round()
Half-precision (16-bit) floating-point support. Critical for WebGPU, WebGL, and ML model inference in the browser where memory bandwidth matters more than precision.

### RegExp.escape()
```js
const userInput = "hello.world (test)";
new RegExp(RegExp.escape(userInput)); // /hello\.world\ \(test\)/
```

Solves a perennial problem where developers had to write (and frequently got wrong) their own regex escaping. Removes a class of regex injection vulnerabilities.

### Regex Improvements
- **Pattern modifiers**: `(?i:text)` applies flags to only part of a pattern, not the whole expression
- **Duplicate named capture groups**: Same name can appear in different alternatives -- `/(?<year>\d{4})-\d{2}|(?<year>\d{2})-\d{4}/`

## How ES2025 Compares to Recent Editions

| Edition | Year | Notable Features | Significance |
|---------|------|-----------------|-------------|
| ES2023 | 2023 | `toSorted()`, `findLast()`, Symbols as WeakMap keys | Small |
| ES2024 | 2024 | `Promise.withResolvers()`, `Object.groupBy()`, Resizable ArrayBuffers | Moderate |
| **ES2025** | **2025** | **Iterator Helpers, Set methods, Import Attributes, Float16, Promise.try()** | **Large** |

ES2025 is the most impactful edition since ES2020 (optional chaining, nullish coalescing, BigInt). The combination of Iterator Helpers and Set methods meaningfully changes everyday coding patterns.

## Browser & Runtime Support

All ES2025 features have been shipping in modern browsers since mid-2024 to mid-2025:
- **Set methods**: Baseline since June 2024
- **Promise.try()**: Baseline since January 2025
- **Import Attributes**: Baseline since April 2025
- **Float16Array**: Baseline since April 2025
- **RegExp.escape()**: Baseline since May 2025
- **Iterator Helpers**: Chrome 122+, Firefox 131+, Safari 18.2+

Node.js 22+ supports all features. Safe to use today without polyfills.

## What To Watch

- Import Attributes will eventually enable CSS modules, HTML modules, and other resource types beyond JSON
- ES2026 is already in draft at `tc39.es/ecma262/` -- the spec development cycle never stops
- TypeScript 7.0 (native Go port) will target es2025 by default, making this the new floor for most TypeScript projects
