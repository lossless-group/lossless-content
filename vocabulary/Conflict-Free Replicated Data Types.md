---
aliases:
  - CRDT
  - CRDTs
  - Conflict-free Replicated Data Type
  - CvRDT
  - CmRDT
date_created: 2026-07-24
date_modified: 2026-08-23
slug: conflict-free-replicated-data-types
title: Conflict-Free Replicated Data Types
site_uuid: 9de13039-d968-4d46-b8d2-eed554eb68b3
at_semantic_version: 0.0.1.1
publish: true
tags:
  - Version-Control
  - Distributed-Systems
  - Local-First
  - Collaboration
wikipedia_url: https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type
---

CRDT — **Conflict-free Replicated Data Type**

Read it backwards:

- **Data Type** — a list, a map, a counter, a piece of text.
- **Replicated** — the same one exists as several copies, on different machines, each editable while offline.
- **Conflict-free** — built so that when those copies diverge and come back together, merging them can never fail and never needs a human to pick a winner.

The trick is to **record the operation, not the result**.

Take a counter at 5. Alice adds 1, Bob adds 1, neither has seen the other. Each writes 6 to their copy. When they sync, an ordinary system sees two writes of 6, keeps the later one, and you get **6** — one of the increments silently vanished.

A CRDT counter doesn't store 6. It stores "Alice: +1" and "Bob: +1", and computes **7**. And because addition doesn't care about order, it gets 7 whichever increment arrives first — which is exactly the property that makes merging automatic.

CRDTs generalize that trick to maps, lists, and text.

## Why the trick works

The counter example is not a clever hack; it is the whole theory in miniature. Addition has three properties that ordinary assignment lacks:

- **Commutative** — order doesn't matter. `+1` then `+1` is the same as `+1` then `+1`, whoever went first.
- **Associative** — grouping doesn't matter. It doesn't matter which two replicas sync before the third joins.
- **Idempotent** — applying the same thing twice is the same as once, so a message delivered twice does no harm.

Any operation with those properties can be merged without coordination. **A CRDT is a data type whose every operation has been designed to have them.** That is the definition, and everything else — the maps, the lists, the text editors — is engineering to preserve those properties for structures more complicated than a number.

The formal version comes from Marc Shapiro, Nuno Preguiça, Carlos Baquero, and Marek Zawirski in 2011.[^3zof3r] They define **Strong Eventual Consistency (SEC)**: any two replicas that have received the same set of updates are in the same state — not "will eventually agree if things settle down," but *are already identical*, with no consensus round, no leader, and no rollback. A data type that provably satisfies that condition is a CRDT.

The practical payoff is the thing that makes it interesting: **replicas converge despite any number of failures**, because there is nothing to fail. There is no coordination step to be interrupted.

## The two families

The literature splits CRDTs in two, and the acronyms are unfortunate but common enough to be worth knowing.[^0tjacq]

| | **State-based (CvRDT)** | **Operation-based (CmRDT)** |
|---|---|---|
| What travels | The whole state | Individual operations |
| Merge is | A function combining two states | Applying each operation once |
| Network needs | Only *eventual* delivery — resend freely | *Exactly-once* delivery, often causally ordered |
| Cost | Bandwidth | Delivery machinery |

**Convergent** (CvRDT) and **Commutative** (CmRDT) are what the `v` and `m` stand for. In practice most modern systems are operation-based with a sync protocol that reconstructs what the other side is missing, which gets the bandwidth profile of op-based without demanding a perfect network.

## The hard case: text

Counters and maps are the easy part. Sequences — lists, and above all *text* — are where CRDTs earn their reputation for difficulty.

The problem is that **a position is not a stable name for anything.** "Insert at position 3" means something different the moment somebody else has inserted ahead of you. Two people typing in different paragraphs, each using indices, will scramble each other's work.

So a sequence CRDT gives **every element its own permanent identity**, and expresses an edit as *"insert after this specific element."* Identity is assigned at creation and never changes, so it survives everything that happens around it. That is why two people typing in different paragraphs of the same document merge with nobody adjudicating.

You can see the shape directly in [Automerge](https://github.com/automerge/automerge), where an object's identity is `Root` or `Id(counter, ActorId, index)` — *who created it and when*, never *where it sits*.[^1lbkh5]

That identity scheme is also why the resulting history is a [[Directed Acyclic Graphs|DAG]]: each change records the hashes of the changes it depends on, so history branches and merges rather than running in a line.

## What it costs

CRDTs are frequently described as if merging were free. It isn't; the bill just arrives somewhere other than where you were looking.

### Tombstones, and why deletion is the hard part

Deleting an element cannot simply remove it. If a replica that never saw the deletion syncs later, it will helpfully *re-add* the element — it has no way to distinguish "deleted" from "not yet created." So deletion leaves a **tombstone**: a permanent marker saying *this existed and is gone*.

Tombstones accumulate. Over a long-lived document they can come to dominate its size.[^5uj4s7]

### And you cannot garbage-collect them without coordination

This is the sharp edge. Safely dropping a tombstone requires knowing that **every** replica has seen the deletion — and establishing that requires exactly the coordination step CRDTs exist to avoid. Production systems that do collect tombstones do it with a distributed commitment protocol, effectively voting on whether each one is still needed.[^5uj4s7]

The consequence is concrete. In Automerge — verified against the pinned source, across the whole Rust crate and the JavaScript bindings — there is **no `gc`, `compact`, `truncate`, `prune`, or `forget` operation anywhere in the public API**. `save()` exists and is genuinely efficient, but its own doc comment says it saves *"the entirety of this document in a compact form."* Smaller bytes, same history, forever.

That is not an oversight. **The history *is* the data.** A document's value is computed from the set of operations, so discarding old operations isn't pruning a log — it's deleting the content.

### The document stops being files

The second cost is easy to miss until you hit it. A CRDT document is an object tree with its own identity scheme, and on disk it is one encoded operation set. It is not a folder of files, and there are no paths.

Anything that expects files — `grep`, an editor, a sync tool, a search indexer, an AI agent that reads a directory — needs an export step first. For a system whose value proposition is *"the working format is just a directory you can open"*, that is a direct trade, not a detail.

## Where you actually meet one

- **[Automerge](https://github.com/automerge/automerge)** — [[Automerge]] — Rust core with WebAssembly, JavaScript, and C bindings, from Ink & Switch. Aims, in its own words, to be *"PostgreSQL for your local-first app."*[^98jq9l]
- **[Yjs](https://github.com/yjs/yjs)** — the other major implementation; same bet, different encoding, and the one most often found inside collaborative editors.
- **Distributed databases** — Riak popularised CRDT-backed counters, sets, and maps; Redis and others have followed.

Worth knowing that CRDTs are *not* how most collaborative editors were originally built. **Operational Transformation (OT)** is the older lineage — the approach behind Google Docs — which achieves the same goal by transforming incoming operations against concurrent ones, but requires a central server to order them. CRDTs trade that server away for a larger data structure. That trade is the entire reason they are associated with the **local-first** movement,[^c9j3ga] which asks what software looks like when the network is an optimisation rather than a requirement.

## When not to reach for one

The practical judgment, learned from comparing CRDTs against file-sync and version-control systems doing adjacent jobs:

**A CRDT is the only real answer to two people editing the same paragraph at the same time.** Nothing else solves it — every file-sync tool "resolves" a conflict by keeping both files under different names and leaving a human to work out which is which.

**But most systems don't actually need that.** If you can make one side structurally read-only — a permission, a folder type, a read-scoped credential — the conflict cannot occur, and you keep your files as files, your history prunable, and your tooling working. That is dramatically cheaper.

So the honest test: **do two people genuinely need to edit the same thing simultaneously, or does it just feel untidy to say no?** Reach for a CRDT when the answer is the former. Reach for structural asymmetry when it is the latter.

## Related

- [[Directed Acyclic Graphs]] — the shape a CRDT's change history takes, and where the acronym cluster around this one is unpacked
- `ai-labs/studies/sync-and-content-version-control` — the pinned reading collection these notes came out of; the Automerge profile there cites line numbers

### Citations

[^3zof3r]: Shapiro, M., Preguiça, N., Baquero, C., & Zawirski, M. (2011). [Conflict-free Replicated Data Types](https://inria.hal.science/inria-00609399). INRIA Research Report RR-7687. Also published in the 13th International Symposium on Stabilization, Safety, and Security of Distributed Systems (SSS 2011). [PDF](https://www.cs.tufts.edu/~nr/cs257/archive/marc-shapiro/CRDTs_SSS-2011.pdf)

[^0tjacq]: [CRDT Glossary](https://crdt.tech/glossary) — crdt.tech, the community reference site maintained around the original research.

[^1lbkh5]: Read directly from pinned source: `automerge/rust/automerge/src/exid.rs`, `types.rs`, `value.rs`, `automerge.rs`, at commit `47908d6c` (2026-08-17). Pinned in `ai-labs/studies/sync-and-content-version-control`.

[^5uj4s7]: [Implementing a Garbage-Collected Graph CRDT](https://decomposition.al/CMPS290S-2018-09/2018/11/12/implementing-a-garbage-collected-graph-crdt-part-1-of-2.html) — CMPS290S, UC Santa Cruz. On tombstone accumulation and why collecting them reintroduces a coordination step.

[^98jq9l]: [automerge/automerge](https://github.com/automerge/automerge) — README, project description and status.

[^c9j3ga]: Kleppmann, M., Wiggins, A., van Hardenberg, P., & McGranaghan, M. [Local-first software: you own your data, in spite of the cloud](https://www.inkandswitch.com/local-first/). Ink & Switch. The essay Automerge's README names as the project's objective.
