---
date_created: 2025-07-01
date_modified: 2026-07-01
title: "Zod 4 - A Faster Rewrite and a Long List of Breaking Changes"
slug: zod-4-a-faster-rewrite-and-a-long-list-of-breaking-changes
tags: [TypeScript-Ecosystem, Schema-Validation, Breaking-Changes]
site_uuid: eb088b5f-2f91-4974-9049-71fc205ab285
publish: true
at_semantic_version: 0.0.0.1
---

https://zod.dev/v4

## Why This Matters

[[Tooling/Software Development/Programming Languages/Libraries/Zod|Zod]] 4 reached stable in **May 2025** after a full rewrite of the core. It is the schema-validation library our TypeScript services lean on, and the gap between what we run and what shipped is embarrassing: the tree resolves to **`zod@3.25.76`**, and the only place that declares zod at all is `services/decile-mcp` (`^3.23.0`).

Two things make this worth writing down. First, the rewrite is not a cosmetic point release — it's **14x faster string parsing, ~6.5x faster object parsing, a 100x reduction in TypeScript type instantiations, and a 2x smaller core bundle**, alongside a genuinely long list of breaking changes. Second, our reason for being "stuck" is more nuanced than neglect, and the escape hatch is closer than it looks (see the last section).

## Why We're On An "Antiquated" Zod (we're closer than it looks)

Three facts, in order:

1. **Only one package declares zod.** `services/decile-mcp/package.json` pins `zod@^3.23.0`. Nothing else in the tree asks for it directly.
2. **The MCP SDK and Composio anchor the whole tree to 3.x.** `@modelcontextprotocol/sdk@1.29.0` and `@composio/core` both peer-depend on `zod@3.x`, so pnpm dedupes everyone to `3.25.76`. The lone dep pulling the *other* way is `@anthropic-ai/claude-agent-sdk`, whose unmet `zod@^4.0.0` peer warning is exactly this tension surfacing.
3. **`3.25.76` already contains Zod 4.** The `zod@3.25.x` line is the transition release: `import { z } from "zod"` gives you v3, but **`import { z } from "zod/v4"` gives you Zod 4 — on the version we already have installed.** No bump required to start using the new API in a new module.

So the honest framing isn't "we're a year behind." It's "our MCP/Composio deps keep the *default* import on v3, but Zod 4 is one import path away, and a clean cutover is a lockfile bump plus the migration below."

## The Headline: It's a Rewrite, Not a Patch

| Dimension | Zod 3 | Zod 4 |
|---|---|---|
| String parsing | baseline | **14.71x faster** |
| Object parsing | baseline | **~6.5x faster** |
| `tsc` type instantiations | baseline | **~100x fewer** (complex schema chains: 4000ms → 400ms) |
| Core bundle (gzipped) | 12.47 kb | **5.36 kb** (2x smaller) |
| `zod/v4-mini` bundle | — | **1.88 kb** (85% smaller than v3) |

New capabilities worth knowing: **metadata registries** (`z.registry()` + `.meta()`), **first-class JSON Schema conversion** (`z.toJSONSchema()`), **template-literal types** (`z.templateLiteral()`), **file validation** (`z.file()`), i18n/localized errors, and `zod/v4-mini` — a tree-shakable functional API (`z.optional(schema)` instead of `schema.optional()`) for bundle-sensitive surfaces.

## The Breaking Changes That Will Bite Us

### String formats moved to top-level functions

The single most common diff. Format validators are no longer instance methods on `z.string()`:

```ts
// Zod 3
z.string().email()
z.string().uuid()
z.string().url()
z.string().ip()      // combined v4/v6
z.string().cidr()

// Zod 4
z.email()
z.uuid()             // now stricter — RFC 9562/4122
z.url()
z.ipv4() / z.ipv6()  // split
z.cidrv4() / z.cidrv6()
```

Also new: `z.emoji()`, `z.base64()` (and `z.base64url()`, which no longer accepts padding), `z.iso.date()`, `z.iso.datetime()`, `z.iso.duration()`.

### Unified error customization

Every per-schema error knob collapses into one `error` param:

```ts
// Zod 3
z.string({ required_error: "Required", invalid_type_error: "Must be a string" })
z.string().min(5, { message: "Too short" })

// Zod 4
z.string({ error: (issue) => issue.input === undefined ? "Required" : "Must be a string" })
z.string().min(5, { error: "Too short" })
```

`errorMap` is renamed to `error`. `message`, `invalid_type_error`, and `required_error` are gone.

### `ZodError` shape changed

This is the one most likely to break error-handling code silently:

```ts
// Zod 3
err.errors          // → renamed
err.format()        // → deprecated
err.flatten()       // → deprecated
err.formErrors      // → removed

// Zod 4
err.issues          // the array is now `.issues`, always
z.treeifyError(err) // replaces both .format() and .flatten()
```

`.addIssue()`/`.addIssues()` are deprecated (push to `.issues` directly), and several issue types merged (invalid enum/literal → a single `invalid_value` issue).

### `.default()` semantics flipped

Defaults now must match the schema's **output** type, not its input type. If you relied on a default being applied *before* parse/transform, use the new `.prefault()`:

```ts
// Zod 3: default fed into the input, then transformed
// Zod 4: default IS the output; use .prefault() for the old pre-parse behavior
z.string().transform(v => v.length).default(0)   // 0 is a valid number output — OK in v4
```

### Object modifiers became standalone factories

```ts
// Zod 3
z.object({ ... }).strict()
z.object({ ... }).passthrough()
schemaA.merge(schemaB)

// Zod 4
z.strictObject({ ... })
z.looseObject({ ... })
schemaA.extend(schemaB.shape)   // .merge() deprecated in favor of .extend()
```

`.strip()`, `.nonstrict()`, and `.deepPartial()` are removed.

### `z.record()` requires two arguments

```ts
// Zod 3
z.record(z.string())              // value schema only

// Zod 4
z.record(z.string(), z.string())  // key AND value schemas required
```

Enum keys now enforce exhaustiveness; use `z.partialRecord()` for optional keys.

### `z.function()` is no longer a schema

It became a factory that builds a validated function wrapper:

```ts
// Zod 3
const fn = z.function().args(z.string()).returns(z.number())

// Zod 4
const fn = z.function({ input: [z.string()], output: z.number() })
             .implement((s) => s.length)   // .implementAsync() for async
```

`z.promise()` is deprecated.

### Coercion input types widened

Every `z.coerce.*` schema now accepts `unknown` as input rather than a specific type — tighten downstream typing where you assumed otherwise.

### Deprecated/removed grab-bag

- `z.nativeEnum()` deprecated → `z.enum()` handles native enums now
- `.Enum` / `.Values` accessors removed
- `z.literal()` drops symbol support
- Static `.create()` factories removed; `z.ostring()` / `z.onumber()` removed
- Type-predicate narrowing in `.refine()` no longer narrows; `ctx.path` removed from refinement context
- Internals moved: `schema._def` → `schema._zod.def`; `ZodEffects`, `ZodBranded`, `ZodPreprocess` removed (transforms/preprocess now return `ZodPipe`); `z.core` namespace added

## Migration Recommendation

For the Lossless TypeScript services:

1. **Start greenfield on `zod/v4` today.** Any *new* module can `import { z } from "zod/v4"` on the `3.25.76` we already have — zero lockfile changes, and it silences the agent-SDK peer complaint at the usage site. Prove the ergonomics there before touching shared code.
2. **Don't bump the tree to standalone `zod@4.x` until MCP + Composio allow it.** `@modelcontextprotocol/sdk@1.29.0` peer-pins `zod@3.x`; forcing `zod@4` risks a resolution conflict. Check whether a newer MCP SDK has moved its peer to `zod@^4` first — that's the gating dep.
3. **When we do cut `services/decile-mcp` over,** the mechanical hits are: string-format calls (`z.string().email()` → `z.email()`), any `err.format()`/`err.flatten()`/`err.errors` in error handling → `.issues` + `z.treeifyError()`, and every `z.record(v)` → `z.record(k, v)`. A grep for those four patterns surfaces the whole surface.
4. **Consider `zod/v4-mini` for the MCP tool-schema layer** if bundle size ever matters there — the functional API is a bigger diff but the 85% size cut is real.

## Trajectory Note

Zod 4's real story is the `zod/core` substrate: a shared foundation that `zod`, `zod-mini`, and third-party schema libraries all build on. The rewrite that made parsing 14x faster and `tsc` 100x cheaper is the same one that let them ship a 1.88 kb variant — the performance and the modularity came from the same architectural move. For us the near-term lesson is narrower and slightly humbling: **we were never actually blocked from Zod 4** — it's been sitting under `zod/v4` in a version we already installed. The block is a story we told ourselves because the *default* import still pointed at v3. Fix the story, adopt it in new code, and let the MCP SDK's peer range decide when the full cutover lands.
