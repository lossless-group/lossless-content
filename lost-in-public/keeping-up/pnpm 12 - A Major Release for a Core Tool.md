---
date_created: 2026-08-26
date_modified: 2026-08-26
title: pnpm 12 — A Major Release for a Core Tool
slug: pnpm-12-a-major-release-for-a-core-tool
tags: [Package-Managers, Build-Tooling, Rust, Breaking-Changes, Homebrew]
homepage: https://pnpm.io
github_repo_url: https://github.com/pnpm/pnpm
brew_page: https://formulae.brew.sh/formula/pnpm
install: brew install pnpm
---

https://pnpm.io/blog/releases/12.0

## Why This Matters

[[Tooling/Software Development/Developer Experience/pnpm|pnpm]] 12.0.0 shipped on August 26, 2026, and it is a rewrite in Rust. The maintainers say "upgrading should not feel like a migration," and the list of differences is short. It's now a native executable that doesn't need Node.js to run.

We didn't choose this upgrade. At launch, pnpm said Homebrew didn't offer 12 yet and that `latest` on npm still pointed at 11. Homebrew's `pnpm` formula then moved to 12.3.4 in a commit landed September 6, and a separate `pnpm@11` formula arrived on September 7. The operator's machine went from 11.25.0 to 12.3.4 through `brew upgrade`, and it was on 12.16.1 when checked November 3, 2026. By then npm's `latest` tag had moved to 12 as well.

Everything below comes from pnpm's documentation and a search of our tree. We haven't deliberately migrated a repo to 12.

## What Breaks

From the [12.0 notes](https://pnpm.io/blog/releases/12.0), [What's different in pnpm 12](https://pnpm.io/blog/whats-different-in-pnpm-12) and the [migration guide](https://pnpm.io/migration-v11):

- **`--frozen-lockfile false` is rejected.** A boolean flag can't take its value as a separate argument. `--frozen-lockfile=false` and `--no-frozen-lockfile` still work.
- **`pnpm install --resolution-only` is gone.** Use `pnpm peers check`.
- **Unrecognized `pnpm-workspace.yaml` settings can fail.** If the project pins a pnpm version the running pnpm satisfies, the command stops with `ERR_PNPM_UNRECOGNIZED_WORKSPACE_SETTINGS`. Otherwise it's a warning.
- **Git dependencies resolve through HTTPS** on GitHub, GitLab and Bitbucket. SSH access is now machine configuration, through git's `insteadOf`.
- **Cyclic dependency graphs get a one-time lockfile diff** on the first install that re-resolves.
- **Naming a package manager means the tool.** `pnpm add yarn` records the project's package manager instead of installing the npm package.

## What the Homebrew Jump Means for Pinned Repos

For a repo with a pin, very little changes. The [docs](https://pnpm.io/package_json#packagemanager) say that when a command runs with a different version, "pnpm switches to the pinned one, as set by `pmOnFail`." [`pmOnFail`](https://pnpm.io/settings/cli#pmonfail) defaults to `download`, which downloads and runs the declared version. The migration guide states the consequence directly: if you don't update the pin, "pnpm 12 runs the pinned pnpm 11."

So Homebrew's binary acts as a launcher, and a repo pinned to 10.15.0 keeps pnpm 10's behavior, including its lockfile handling. The first run on a version needs network access for the download, and `pmOnFail: ignore` would turn the switch off.

For a repo with no pin, there's nothing to switch to, so the question becomes which version actually runs. That is where our exposure is.

## Checking Our Tree

A `grep` of `packageManager` across the monorepo (excluding `node_modules` and `dist`), rerun November 3, confirms the rough count we started from. It also changes what the count means:

| Pin | Count | Where |
|---|---|:---|
| pnpm 10 | 54 | 39 in vendored `ai-labs/studies`; 10 in `dididecks-ai`; `augment-it`; the monorepo root; `cogs-site`; `grab-reference`; `postiz-app` |
| pnpm 11 | 6 | 4 in `studies`; `karakeep` and `plane` in `self-host-stack` |
| pnpm 12 | 1 | `material-ui` in `studies` |
| pnpm 9 | 4 | All in `studies` |

Another nine pin Yarn, Bun or npm. Every 9, 11 and 12 pin belongs to an upstream project we vendor or self-host. **All 14 pins on our own projects are pnpm 10**, and none uses `devEngines.packageManager`.

The larger group doesn't appear in that table. Of the 66 directories outside `studies` and `self-host-stack` that have a `pnpm-lock.yaml`, 56 have no `packageManager` field of their own. That includes 19 under `astro-knots`, 13 under `content-farm`, 13 under `ai-labs`, and this content repo. We didn't test how each one resolves its version, but none of them can rely on its own pin.

For those repos, pnpm 11's config changes matter more than pnpm 12's. pnpm's [v10 guide](https://pnpm.io/migration) applies when moving to either major, and our tree has several things it covers:

- **`.npmrc` is auth and registry only since v11.** 22 of the 56 have other settings there, such as `shamefully-hoist`, `auto-install-peers` and `ignore-workspace`. Examples include `mpstaton-site` and `content-farm`. In the five we spot-checked, none had moved its hoisting setting into `pnpm-workspace.yaml`.
- **`package.json#pnpm` is no longer read.** `fullstack-vc` keeps `onlyBuiltDependencies` there, and `site` keeps `overrides`.
- **Unapproved build scripts now fail the install.** We've already met this one. `mpstaton-site` has a September 9 commit fixing an `allowBuilds` block that pnpm wrote with the literal placeholder "set this to true or false." `augment-it`'s `pnpm-workspace.yaml` still holds three of those placeholders, under a 10.15.0 pin.

We found no `--frozen-lockfile false` or `--resolution-only` in our workflows or scripts. `lfm`'s workflows use `--frozen-lockfile=false`, which stays valid, and the same form appears in our CI blueprint.

CI is mixed. `pnpm/action-setup` versions range from 8 to 12, and some workflows use `latest`. Four already ask for 12: `content-farm`, `context-v-corpus`, `context-vigilance-kit` and `hope-ai`. A `latest` workflow can cross a major like this one without anyone deciding it should.

## What We'd Do

1. **Don't bulk-bump.** The pinned repos are safe for now, and the urgent work is elsewhere.
2. **Audit the unpinned repos first.** Start with the 22 that have non-auth `.npmrc` settings, then the two with `package.json#pnpm`. A dropped hoisting setting could change what a build can resolve.
3. **Add pins.** Each repo should say which version it expects, whichever version that is. Otherwise a `brew upgrade` chooses for it.
4. **Migrate one repo at a time.** pnpm's order is the `pnpm-v10-to-v11` codemod, then `pnpm self-update 12`. The `dependency-upgrade-loop` skill already has the build-and-verify shape.
5. **Resolve `augment-it`'s placeholders** before touching its pin.

## Trajectory Note

This rhymes with [[Rsbuild 2.0 - ESM-Only Core, Rspack 2, and a Leaner Install|Rsbuild 2.0]] in one way: much of a scary major is gentle if you've kept up. Our version is less tidy: 14 repos are pinned a major behind by choice, and 56 have no pin saying what they expect. A pin is what separates a release you schedule from one that arrives with `brew upgrade`.

Sources: <https://pnpm.io/blog/releases/12.0> · <https://pnpm.io/migration-v11> · <https://pnpm.io/migration> · <https://github.com/pnpm/pnpm/releases/tag/v12.0.0>
