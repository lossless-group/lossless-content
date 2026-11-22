---
date_created: 2026-10-01
date_modified: 2026-11-21
title: SvelteKit 3 — Less Junk, Config in Vite, Remote Functions Still Coming
lede: "SvelteKit 3 is a cleanup major: config moves into Vite, $lib becomes #lib, and remote functions still aren't stable."
slug: sveltekit-3-less-junk-config-in-vite-remote-functions-still-coming
tags:
  - Svelte
  - JavaScript-Ecosystem
  - Web-Frameworks
  - Vite
homepage: https://svelte.dev/docs/kit
announcement_url: https://svelte.dev/blog/sveltekit-3-is-here
migration_guide: https://svelte.dev/docs/kit/migrating-to-sveltekit-3
install: npx sv create my-new-app
og_favicon: https://svelte.dev/favicon.png
og_last_fetch: 2026-11-22T04:45:34.000Z
---

https://svelte.dev/blog/sveltekit-3-is-here

## Why This Matters

SvelteKit 3.0.0 shipped to npm on October 1, 2026, alongside `sv` 1.0, the Svelte CLI. The team calls it "the same framework with a little more polish, a little more type safety, and a little less junk." That's accurate. This isn't a rewrite like Svelte 5 was. It's a cleanup major: legacy features removed, configuration consolidated, and minimum dependency versions raised (Vite 8, Svelte 5).

The path ran through `@next` builds in August, a Release Candidate on September 8 ("We've cleaned out the junk drawer"), and then the stable release. As of November 18 the current version is 3.4.0.

The feature everyone wanted, **remote functions**, is still *not* stable. The release post answers its own question: "Are remote functions ready yet? Not quite. But it's our top priority!"

## What Changed

- **`svelte.config.js` is gone.** Configuration lives in `vite.config.ts`, passed to the `sveltekit()` plugin. Options SvelteKit doesn't own are forwarded to `vite-plugin-svelte`. (Configuring through Vite has worked since 2.62, so you can move early.)
- **`$lib` becomes `#lib`.** It now uses standard Node [subpath imports](https://nodejs.org/api/packages.html#subpath-imports) instead of a framework-specific alias.
- **TypeScript config is simpler.** You extend `$app/tsconfig` instead of the generated `.svelte-kit/tsconfig.json`.
- **Explicit environment variables are out of the `experimental` flag.** They're now the documented way to declare env vars.
- **Service workers need less boilerplate.** A new `$app/service-worker` module replaces `$service-worker`, and `$app/paths` works inside service workers.
- **Error handling is improved across the board.**
- **Adapters moved too.** `@sveltejs/adapter-cloudflare` 9.0 (November 18) drops Cloudflare Pages support entirely in favor of Workers. A new `@sveltejs/adapter-server` holds the shared pieces for adapters that generate a standalone server, and `adapter-node` now builds on it.

## Remote Functions: The Real Story

[Remote functions](https://svelte.dev/docs/kit/remote-functions) are typed client-server calls: you write a function in a `.remote.ts` file and call it from a component as if it were local. The team's RC post says they "make everything else look a bit clunky, including SvelteKit's load functions and actions." [The Register](https://www.theregister.com/devops/2026/08/19/sveltekit-3-puts-heat-on-nextjs-with-radical-approach-to-rpcs/5289925) framed it as SvelteKit 3 putting heat on Next.js's server actions.

The catch: remote functions require **Async Svelte** (`await` in components and deriveds), which is still behind `compilerOptions.experimental.async`. So in 3.x you opt in to two experimental flags to use the headline feature. 3.4.0 already adds tracing spans for remote calls, which suggests stabilization is close.

## Where It Fits in Our Workflow

We don't run SvelteKit as an app framework. Astro is the framework across [Astro Knots](https://lossless-group.github.io/astro-knots/), and Svelte is our approved choice for components that genuinely need reactivity. So the parts of this release that matter to us are the indirect ones:

- **The ecosystem's baseline is now Vite 8 + Svelte 5.** Any Svelte islands in Astro sites should be on Svelte 5 already. Libraries that target SvelteKit 3 will assume it.
- **Configuration in `vite.config.ts` is the right instinct.** It matches where Astro integrations already sit, with one less config file per project.
- **Remote functions are worth watching against Astro Actions.** If they stabilize well, they're the strongest argument yet for SvelteKit when a project is more app than content site.
- **`sv migrate` is agent-friendly.** It migrates what it can and writes a TODO list for the rest. The post notes that "your robot friends will make short work of it." That's a good model for how framework upgrades should hand off to coding agents.

## Install / Migrate

```bash
# New project
npx sv create my-new-app

# Upgrade an existing 2.x app
npx sv migrate sveltekit-3 --tasks all --confirm
```

Sources: [Release post](https://svelte.dev/blog/sveltekit-3-is-here) · [RC post](https://svelte.dev/blog/sveltekit-3-release-candidate) · [Migration guide](https://svelte.dev/docs/kit/migrating-to-sveltekit-3) · [Releases](https://github.com/sveltejs/kit/releases)
