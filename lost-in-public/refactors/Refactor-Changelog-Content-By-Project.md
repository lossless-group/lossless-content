---
title: 'Refactor Changelog Content By Project'
date_created: 2025-09-20
date_modified: 2025-12-15
type: refactor-plan
status: proposed
affects:
  - site/src/pages/workflow/log
---

## Summary

Refactor the agency changelog at `/workflow/changelog` so it can aggregate changelog entries **by project**, where each project’s changelog is sourced from that project’s **own GitHub repository**.

Instead of copying changelog markdown into the monorepo (or using git submodules), we will:

- Treat each project repo as the “source of truth” for its own changelog entries.
- Fetch (read-only) markdown from GitHub using a **per-project fine-grained PAT**.
- Normalize those entries into a unified internal model so the site can:
  - Display “All activity” across projects.
  - Filter by project.
  - Preserve existing “content/code/categories” affordances where useful.

## Context / Problem

The current changelog UI is organized into broad tabs:

- Content changes (`changelog--content` collection)
- Code changes (`changelog--code` collection)
- Filter by category (derived from frontmatter)

This is increasingly misaligned with how the agency operates:

- Multiple clients, multiple projects, and overlapping efforts.
- Clients want anonymization; projects are the stable organizing unit.
- The agency wants accountability and a way to demonstrate throughput.

## Goals

- Make **project** the primary organizing dimension for changelog viewing.
- Source changelog markdown from **multiple GitHub repositories** (one per project), without submodules.
- Support a scalable model for 6–8 clients and “several+” projects.
- Keep client anonymity:
  - Public UI should not require client names.
  - Projects can map to “client logos” internally/visually without naming.
- Preserve or improve:
  - Deterministic ordering by date + same-day index (`YYYY-MM-DD_XX.md`).
  - Current entry UI and `/log/[slug]` deep-linking.
- Keep secrets safe:
  - Tokens must never be exposed client-side.
  - Tokens must be managed per project.
- Optional: Connect changelog entries to specific git commits/PRs:
  - Display diff stats (additions/deletions/total) when available.

## Non-goals

- Building a full authentication/authorization layer for private changelog viewing.
- Replacing the entire changelog UI with a radically new design.
- Introducing new third-party dependencies just to parse frontmatter.

## Proposed Data Contract (Project Repo)

Each project repository will have a changelog directory at repo root:

- `Changelog/`

Each changelog entry file:

- Filename: `YYYY-MM-DD_XX.md`
  - `YYYY-MM-DD` is the effective changelog date.
  - `XX` is a two-digit index for multiple entries in one day (`01`, `02`, ...).

Each markdown file should include frontmatter compatible with the existing site expectations (loose/passthrough is fine):

- `title`
- `date` or `date_created` (date string)
- `categories` (string or list)
- `authors` or `author` (string or list)
- `context_setter` (optional)

Optional frontmatter for source linking:

- `git_commit_sha` (full SHA preferred)
- `github_pr` (number)
- `github_compare` (string in the form `base...head`, e.g. `v1.2.0...v1.2.1`)

At least one of these can be used to compute “lines changed” metrics.

Additional fields are allowed; the site should be tolerant.

## Proposed System Design

### High-level approach

Create a **project-aware changelog aggregation layer** in the site that:

1. Knows which projects exist and how to fetch their changelogs.
2. Lists `Changelog/*.md` per project.
3. Fetches each markdown file.
4. Normalizes frontmatter + body into a unified entry model.
5. Produces:
   - an aggregated “All projects” view
   - per-project filtered views

### Source-of-truth boundary

- **Project repos are authoritative** for changelog markdown.
- The agency site is a **read-only aggregator**.

### Compatibility with current site implementation

Current implementation references:

- `/workflow/changelog` routes to `site/src/pages/workflow/changelog.astro` and `site/src/layouts/ChangelogLayout.astro`
- Entry pages are built at `/log/[slug]` in `site/src/pages/log/[slug].astro`
- Ordering already supports `YYYY-MM-DD_XX` by extracting `_XX` from filename

The refactor should preserve these behaviors, while changing the **data source** from local content collections to GitHub-sourced project changelogs.

### GitHub content sourcing pattern

We already have a proven pattern in the monorepo under `astro-knots`:

- `fetchGitHubContent` to fetch raw markdown (with in-memory cache)
- `listGitHubDirectory` to enumerate a directory via GitHub Contents API
- lightweight frontmatter parsing using string operations (no YAML libs)

The changelog refactor should reuse the same approach conceptually.

## UI/UX Specification

### Primary navigation

The changelog page should shift from “Content vs Code” as primary tabs to “All vs By Project” (or similar), while still supporting the existing classifications as filters.

Recommended structure:

- **Tab: All Activity**
  - Aggregated entries across all projects.
  - Default view.
- **Tab: By Project**
  - Project selector (chips or list).
  - Shows the same entry list but scoped.
- **Tab: Filters** (optional)
  - Category filter (existing feature)
  - Type filter: `code` vs `content` if we keep that semantic

### Entry metadata

Each entry should display:

- Project label (human-readable project name, or anonymized display name)
- Date (from frontmatter or filename)
- Categories
- Authors (if present)
- Existing `contextSetter` behavior stays

### Deep linking

Entry pages must remain stable and shareable.

Proposed slug structure:

- `/log/{projectKey}-{YYYY-MM-DD}_{XX}`

This avoids collisions across projects when multiple projects have an entry on the same date with same index.

## Normalized Entry Model

Define a normalized in-memory model for rendering and routing:

- `projectKey` (stable ID used in slugs)
- `projectDisplayName` (may be anonymized)
- `sourceRepo` (owner/repo)
- `sourcePath` (e.g., `Changelog/2025-12-15_01.md`)
- `id` (unique, derived, stable)
- `slug` (used for `/log/[slug]`)
- `date` (resolved)
- `index` (parsed from filename)
- `title`
- `categories` (normalized array)
- `authors` (normalized array)
- `body` (markdown)

Optional source-linking fields:

- `gitCommitSha`
- `githubPrNumber`
- `githubCompare`
- `diffStat`
  - `additions`
  - `deletions`
  - `changedFiles`
  - `total`

### Date resolution rules

Ordering and display should use this precedence:

1. `frontmatter.date`
2. `frontmatter.date_created`
3. Filename `YYYY-MM-DD` portion

If frontmatter contradicts filename, we should surface a warning in build logs (but still render).

## Configuration & Secrets

### Project registry

We need a single place to define the set of projects and how to access them.

Each project definition must include:

- `projectKey` (URL-safe)
- `displayName`
- `githubOwner`
- `githubRepo`
- `githubBranch` (default `main`)
- `changelogDir` (default `Changelog`)
- `tokenEnvVarName` (points to a per-project PAT)

### Token management

Each project repo should use a dedicated fine-grained PAT:

- Read-only `Contents` permission
- Scoped to exactly that repo

Tokens must be read server-side only.

## Commit/PR Linking & Line-Change Metrics (Optional)

### What we can show

If a changelog entry links to a commit or PR, the UI can display:

- `+{additions} / -{deletions}`
- Optional: `{changedFiles} files`

This gives a simple “throughput” indicator without revealing private details.

### How to compute diff stats

Server-side only, using GitHub APIs:

- Commit stats:
  - `GET /repos/{owner}/{repo}/commits/{sha}`
  - Response includes `stats.additions`, `stats.deletions`, `stats.total`

- PR stats (more stable if the entry maps to a PR):
  - `GET /repos/{owner}/{repo}/pulls/{pull_number}`
  - Response includes `additions`, `deletions`, `changed_files`

- Compare stats (useful for releases or branch-to-branch):
  - `GET /repos/{owner}/{repo}/compare/{base}...{head}`
  - Response includes `total_commits` and `files[]` (can be summed to additions/deletions)

### Caching and rate limits

Fetching diff stats adds GitHub API calls. To control cost:

- Prefer PR stats when available (one call per entry).
- Cache diff stats keyed by `{owner}/{repo}@{sha|pr|compare}`.
- Allow “no stats” gracefully if:
  - the token doesn’t have permission
  - the commit/PR doesn’t exist
  - rate limiting occurs

### Display policy

- Only render diff stats when we have a trusted link field.
- Do not attempt to guess commit SHAs from dates.
- If both `git_commit_sha` and `github_pr` exist, PR takes precedence (more consistent totals).

## Phased Implementation Outline

### Phase 1: Discovery & Alignment

Step 1: Inventory current changelog behavior

- Confirm the active data sources (`changelog--content`, `changelog--code`, optional client-specific collections like `changelog--laerdal`).
- Confirm slug semantics in `site/src/pages/log/[slug].astro`.
- Confirm category extraction and search behavior.

Step 2: Define the project registry contract

- Decide where “project metadata” lives (likely alongside existing project content definitions).
- Decide what constitutes `projectKey`.
- Decide how to represent anonymity (e.g., displayName without client identity; optional logo mapping).

### Phase 2: GitHub Aggregation Layer (Server-only)

Step 1: Implement GitHub directory listing per project

- For each project definition, list `Changelog/*.md`.

Step 2: Implement per-project token lookup

- Use `tokenEnvVarName` to find the correct token at runtime.
- Ensure no token is ever sent to the client.

Step 3: Implement entry fetching + parsing

- Fetch each markdown file.
- Parse frontmatter using string operations.
- Produce normalized entries with stable `id` + `slug`.

Step 5 (optional): Enrich entries with diff stats

- If `git_commit_sha` or `github_pr` or `github_compare` is present:
  - Fetch stats server-side.
  - Attach `diffStat` to the normalized entry.

Step 4: Implement aggregation + sorting

- Combine entries from all projects.
- Sort by resolved `date` desc, then by parsed `index` desc.

### Phase 3: UI Refactor

Step 1: Update `/workflow/changelog` data plumbing

- Replace `getCollection('changelog--content')` / `getCollection('changelog--code')` with the aggregated project entries source.
- Preserve existing UI components where possible (`ChangelogEntry.astro`, tabs, search).

Step 2: Add project filtering

- Add project selector UI.
- Update stats (counts and words) to be per-filter.

Step 3: Reconcile “content vs code” semantics

Choose one:

- Option A: Keep “content vs code” as a derived filter from `categories` or a new frontmatter field like `change_type`.
- Option B: Deprecate those tabs and treat them purely as categories.

### Phase 4: Entry Pages & Routing

Step 1: Extend `/log/[slug]` to support project-based slugs

- Generate static paths from aggregated entries (instead of collections).
- Resolve slug to project + filename.
- Fetch markdown on-demand at build/SSR time (depending on deployment constraints).

Step 2: Backward compatibility

- Maintain old slugs if required (redirects), or keep old entries as legacy local collections.

### Phase 5: Migration & Operations

Step 1: Seed initial project changelog directories

- Ensure each project repo has `Changelog/` and at least one entry.
- Ensure filename convention is consistent.

Step 2: Deprecate local changelog collections

- Keep them during transition.
- Then remove or freeze.

Step 3: Observability

- Add build-time logging for:
  - missing tokens
  - missing directories
  - malformed filenames
  - duplicate slugs

## Risks & Mitigations

- **Risk: GitHub API rate limits**
  - Mitigation: caching, only fetching directory lists once per build/render, avoid redundant fetches.

- **Risk: Diff stat API calls amplify rate limits**
  - Mitigation: make diff stats optional, cache aggressively, and only fetch stats for entries that explicitly link to a commit/PR.

- **Risk: Token leakage**
  - Mitigation: server-only fetch; never expose tokens to client; avoid embedding tokens in generated HTML.

- **Risk: Inconsistent frontmatter**
  - Mitigation: tolerant parsing; warnings; enforce minimal contract via documentation.

- **Risk: Build vs runtime behavior differs across deploy environments**
  - Mitigation: define which environments run SSR vs prerender for changelog.

## Acceptance Criteria

- `/workflow/changelog` loads entries aggregated from at least 2 GitHub repos.
- Entries are correctly ordered by date and `_XX` index.
- Users can filter by project.
- Entry pages render at `/log/{projectKey}-{YYYY-MM-DD}_{XX}`.
- No secrets are exposed in browser devtools/network.

Optional (if enabled):

- Entries that include `git_commit_sha` or `github_pr` render `additions/deletions` counts.

## Open Questions

- Do we want the changelog page to be fully `prerender = true`, or SSR?
- Should we keep “content vs code” as top-level tabs, or convert them to filters?
- Where should the project registry live (content collection vs TypeScript config)?
- Should some projects’ changelogs be private/unlisted while still being aggregated for internal views?