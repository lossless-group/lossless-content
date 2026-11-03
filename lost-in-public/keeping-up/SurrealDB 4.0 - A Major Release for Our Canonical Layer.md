---
date_created: 2026-11-03
date_modified: 2026-11-03
title: SurrealDB 4.0 — A Major Release for Our Canonical Layer
slug: surrealdb-4-0-a-major-release-for-our-canonical-layer
tags: [Databases, Breaking-Changes, Security, AI-Agents, Agent-Memory, Model-Context-Protocol]
homepage: https://surrealdb.com/4
github_repo_url: https://github.com/surrealdb/surrealdb
---

https://surrealdb.com/releases/4.0

## Why This Matters

[[Tooling/Software Development/Databases/SurrealDB|SurrealDB]] 4.0.0 shipped today, November 3, 2026. It holds `augment-it`'s canonical layer: persons, organizations, affiliations and the observations log, shared across clients on one SurrealDB Cloud instance. A bad upgrade would reach client data.

The GitHub release body says only "Release v4.0.0," but the details are published. Full [release notes](https://surrealdb.com/releases/4.0) and a [3.x to 4.0 guide](https://surrealdb.com/docs/build/migrating/from-old-surrealdb-versions/3x-to-4x) went up the same day. We've read them, but we haven't run 4.0 or connected to our instance for this post.

**Short version: don't upgrade yet.** Our JavaScript SDK would refuse a 4.0 server, the in-place upgrade can't be undone, and we need to check which version production runs.

## What's in 4.0

All of this is as SurrealDB describes it:

- **One executor.** The several query planners are replaced by a single executor that compiles statements to bytecode. Large work can run across threads and spill to disk.
- **PostgreSQL and MySQL dialects** over their own wire protocols, running against the same tables as SurrealQL.
- **`ALTER FIELD … MIGRATE EXISTING ROWS`**, which converts stored records on a type change.
- **SurrealKV as the single storage engine.**
- **SurrealDS 1.0** for distributed storage in Enterprise and Cloud clusters, and **SurrealDB Earth**, a serverless offering on Cloudflare.

The [4.0 page](https://surrealdb.com/4) now pitches "the database and memory for every agent." It claims more than 240 fixes that no 3.x release contains, vector indexes built 7.4x faster, and filtered vector search down from 27 ms to 1.1 ms. We haven't verified these. The vendor's pages also disagree: the release notes say window functions work over the SQL dialects, while the 4.0 FAQ says they're refused.

## The Upgrade Is the Story

The guide is plainer than the marketing. The 4.0 page says every 3.x record stays readable, while the guide says the in-place upgrade is experimental and one-way:

- **Opt-in only.** A 4.0 node refuses a 3.x datastore unless `SURREAL_EXPERIMENTAL_UPGRADE_FROM_3X=true` is set. Tooling for upgrading is "planned for SurrealDB 4.1."
- **No way back.** Once 4.0 opens a datastore, no 3.x release starts on it. The route back is restoring an export, which loses anything written on 4.0.
- **Upgrade SDKs first.** JavaScript SDK releases before 2.1 refuse a 4.0 server. 
- **Row order changes.** Without `ORDER BY`, rows arrive in any order, and `LIMIT` returns "some of the matching records, not the first ones by record id."
- **A checker exists.** On the latest 3.3, `surreal +3 db upgrade-check` reports what 4.0 will refuse. The guide says it only reads.

## Checking Our Tree

| Layer | Version | Where |
|---|---|:---|
| JS SDK | `surrealdb@^2.0.4`, locked at 2.0.4 | `augment-it` root, `apps/person-enrichment`, `services/record-surrealdb-resolver` |
| Test server | v3.2.0, deliberately pinned | `.github/workflows/ci.yml` |
| Production | SurrealDB Cloud, **version not recorded in the docs we searched** | `Connecting-To-And-Using-SurrealDB` blueprint |
| MCP | `surrealdb/surrealmcp:latest`, `--pull always` | `scripts/mcp-surrealdb.sh` |

We found no other project in the tree using SurrealDB yet.

The "2.x" numbers are easy to misread. SDK 2.0.4 is the client, not the server, and the skill's note about `ORDER BY` calls it a "SurrealDB 2.x requirement" while CI tests against 3.2.0. That label may be a mix-up, or it may be accurate for production. Either way, it's the first thing to settle.

Against the guide:

- **The SDK blocks us.** `^2.0.4` permits 2.1 or later, and 2.2.1 is current, but the lockfile holds 2.0.4.
- **Unordered `LIMIT` needs a look.** `findPairEdge` in `org-relations.ts`, the `has_tag` check, and the LinkedIn lookup in `person-resolver.ts` all use `LIMIT 1` without `ORDER BY`. That's harmless when one row can match, but the skill warns that duplicate persons can slip through.
- **A read-only role has a new edge.** A `VIEWER` user whose write would create a table now gets an IAM error. That matters if we build the scoped MCP role the skill suggests.
- **Much of the list looks irrelevant.** A search of `augment-it`'s TypeScript found no buckets, SurrealML, vector or full-text indexes, live queries, `SPLIT` or `type::record`. Scripts weren't searched.

## The Security Argument Cuts the Other Way

Waiting has a cost. The notes list security fixes that "affected `v3.3.5` and earlier" and ship in 4.0, many rated High. Two we sampled in GitHub's advisories list 4.0.0 as the patched version: `REFERENCE ON DELETE` bypassing table permissions, and statement injection through the MCP integration built into SurrealDB. That advisory names code in the main repo, and we didn't determine whether it touches the separate `surrealmcp` image we run.

Older advisories matter too. A critical cross-tenant issue for system users, [GHSA-w5v9-jc5f-5rmc](https://github.com/surrealdb/surrealdb/security/advisories/GHSA-w5v9-jc5f-5rmc), is fixed in 3.3.0. If production is below that, the patch is needed regardless of 4.0.

## What We Don't Know

- Which server version our Cloud instance runs.
- Whether Studio's one-click Cloud upgrade carries the same risks as self-hosting, beyond the notes saying the instance "updates and restarts automatically."
- Whether `surrealmcp` works against 4.0. Its last tagged release we could find is v0.4.0 from September 2025, and SurrealDB now also advertises a hosted MCP server and one inside the database.
- Whether the skill's `ORDER BY` projection rule still applies.

## What We'd Do

1. Read the instance's version in Studio. If it's below 3.3, plan that move first.
2. Bump the SDK to 2.1 or later and run the resolver tests against the current server. The guide says 4.0-era SDKs connect to 3.x servers too, so this step should stand alone once we know production's version.
3. Run `upgrade-check` from the latest 3.3.
4. Add `ORDER BY` to the `LIMIT 1` queries where duplicates are possible.
5. On a branch, point the CI pin at 4.0. The resolver tests spawn a throwaway in-memory server, which makes them a cheap first signal.
6. Export, verify the export, test on a copy, and only then upgrade.

The stakes justify waiting for early reports and possibly the 4.1 tooling, but the security list means not waiting indefinitely.

Sources: <https://surrealdb.com/releases/4.0> · <https://surrealdb.com/docs/build/migrating/from-old-surrealdb-versions/3x-to-4x> · <https://surrealdb.com/4>
