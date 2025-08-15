# Data Layer & Modeling
---

## 1. Start with the real need

Before reaching for a cloud database, clarify:

* **Is persistence needed beyond this process run?** If not, in‑memory is enough for a demo.
* **Is a single device/user sufficient?** If yes, local storage can be fine.
* **Is multi‑user or sharing required?** If yes, a managed backend is appropriate.
* **Does the toolchain already include a database integration?** Use it. *Example: Lovable includes **Supabase** integration out of the box.*
* **Will this be deployed soon?** Heavy self‑managed databases slow down first shipping.

**Rule of thumb:** begin with the **lightest** option that meets the need; move up the ladder only when a real constraint appears.

---

## 2. The storage ladder (from lightest to heaviest)

### 2.1 In‑memory (ephemeral)

**What it is:** Store data in RAM inside the running process (maps, lists, simple caches).

**Use when:** throwaway demos, quick experiments, one‑off scripts that export results and exit.

**Caveats:** lost on restart; not shared across devices/processes; unsuitable for long sessions.

---

### 2.2 Local on‑device storage

**Web:** `localStorage`, `sessionStorage`, **IndexedDB** for larger structured data.
**Desktop/CLI:** **SQLite** (or libSQL) file next to the app; **DuckDB** for local analytics.
**Mobile:** platform stores (e.g., SQLite/Room/Realm, Keychain/Secure Storage for small secrets).

**Use when:** single‑user tools, offline‑first utilities, fast iteration without network dependencies.

**Caveats:** device‑bound; syncing is extra work; avoid placing secrets in browser storage; plan backups explicitly.

---

### 2.3 Files on disk (JSON/CSV/Parquet + a folder)

**What it is:** Write structured outputs to files; organize with a simple folder convention.

**Use when:** data collection runs, quick import/export between tools, early prototypes of content pipelines.

**Caveats:** no safe concurrent writes without care; manual indexing/search; can become messy without naming rules.

---

### 2.4 Managed backend database (recommended default for shared apps)

**Examples:** **Supabase (Postgres + Auth + Storage)**, Firebase/Firestore, Neon/RDS/Cloud SQL (Postgres), Planetscale (MySQL).

**Why start here once multiple users or devices are involved:**

* **Auth** and basic **access control** available immediately.
* **Object storage** for files (PDFs, images, audio) with signed URLs.
* Mature SQL/NoSQL choices with SDKs, migrations, and backups.

**Note:** With **Lovable**, **Supabase** works **out of the box**, so team prototypes can ship quickly.

**Caveats:** some setup and schema design still required; far lighter than self‑hosting a database.

---

### 2.5 Specialized services (add only when necessary)

**Search engines:** OpenSearch/Elasticsearch for text search and aggregations.
**Caches/queues:** Redis for fast lookups, job queues, rate‑limits.
**Data warehouses:** BigQuery/Snowflake for heavy analytics (not primary app storage).
**File/object storage at scale:** S3/GCS/Supabase Storage for large media libraries.

**Caveats:** extra moving parts, credentials, and deployment overhead; adopt when simpler options no longer suffice.

---

## 3. Common app scenarios and suitable options

### 3.1 Idea demo / hypothesis check (single device)

* **Goal:** validate behavior quickly on one machine.
* **Store:** in‑memory or local files; optional SQLite.
* **Notes:** short sessions; export results at the end; no auth.

### 3.2 Solo tool (automation, CLI, desktop)

* **Goal:** repeatable local workflow (rename files, summarize PDFs, transform data).
* **Store:** SQLite/DuckDB + a files folder for artifacts.
* **Notes:** keep schemas small; avoid over‑indexing.

### 3.3 Team prototype (shared access)

* **Goal:** several people use the feature and share results.
* **Store:** Supabase (auth + Postgres + storage) or similar managed backend.
* **Notes:** basic tables for users/projects/items; per‑user/tenant access rules.

### 3.4 Production web/mobile app (multi‑tenant)

* **Goal:** stable app with roles, auditability, predictable access.
* **Store:** managed Postgres/MySQL with auth and storage; consider read replicas and backups.
* **Notes:** explicit schemas, migrations, retention/deletion policies.

### 3.5 Content/file‑heavy app

* **Goal:** images, PDFs, audio with previews and sharing.
* **Store:** object storage (S3/GCS/Supabase Storage) + database for metadata/permissions.
* **Notes:** generate signed URLs; store hashes for deduplication.

### 3.6 Event logging & analytics

* **Goal:** understand behavior and health.
* **Store:** append‑only logs (files or a lightweight table) → batch to a warehouse later.
* **Notes:** start with minimal fields; add dashboards when signal proves useful.

---

## 4. Migration path (move up only when constraints appear)

1. **In‑memory → Local** when persistence beyond a single run is required.
2. **Local → Managed DB** when sharing, auth, or multi‑device access is needed.
3. **Managed DB → Specialized service** when scale or query patterns exceed what a single database comfortably provides.

Carry data in **portable formats** (CSV/JSON/Parquet) to ease moves. Keep entity names stable even when storage changes.

---

## 5. Practical guardrails

* **Keep it small first.** One table per entity that matters; avoid generic blobs.
* **Avoid secrets in client storage.** Prefer platform secret stores or server‑side env vars.
* **Model unknowns explicitly.** Use `NULL`/controlled enums rather than invented values.
* **Name files and folders predictably.** Dates, IDs, and clear prefixes prevent chaos.
* **Plan retention and deletion.** Even prototypes benefit from a simple cleanup rule.
* **Prepare basic backups.** A periodic dump or snapshot reduces recovery pain.

---

## 6. Summary

 Data must live somewhere, yet a heavy database is rarely the right first step. Begin with the **lightest** workable option (in‑memory or local), then adopt a **managed backend** once multiple users, auth, or sharing enter the picture — especially convenient when the chosen tool already integrates a provider like **Supabase** (as with Lovable). Add specialized services only when clear constraints demand them. This ladder keeps demos smooth and deployments straightforward while leaving room to grow.
