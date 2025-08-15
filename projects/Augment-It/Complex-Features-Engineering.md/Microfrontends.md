# Microfrontends: Isolation & Parallel Feature Development


## 1. Why microfrontends

**In traditional orgs:**

* Many teams, different cadences → each owns a slice (dashboard, billing, analytics) and deploys independently.
* Fewer cross‑team bottlenecks; smaller blast radius when something breaks.

**In LLM‑assisted development:**

* Usually not many human teams, but there is a need to **freeze working areas** while agents generate or refactor others.
* Parallel feature work by **separate agents/models** is safer when each works in a **bounded remote** with a public API and stable contracts.
* Finished pieces can be versioned and reused; unfinished ones do not block the rest of the app.

**The goal:** decouple ownership and deployment so that parts can evolve independently while the user sees one cohesive product.

---

## 2. Composition models (pick by granularity)

### A. Route‑based composition

* Each microfrontend owns **entire routes** (e.g., `/billing`, `/analytics`).
* Works well with platform support (e.g., provider routing or edge rewrites).
* **Pros:** simple mental model; clean ownership boundaries; good for SEO pages.
* **Cons:** hard to share small widgets across routes; slower to compose fine‑grained UIs.

### B. Runtime federation (module federation)

* A **host shell** can load **components or modules** from remote builds at runtime: `import('remoteApp/Widget')`.
* Typical tooling: **Webpack Module Federation** or **Vite + vite‑plugin‑federation**.
* **Pros:** fine‑grained reuse (cards, dialogs, flows); true independent deploys; great for parallel agent work.
* **Cons:** more moving parts; careful versioning for shared deps; SSR can be tricky—prefer client‑side mounting for federated parts.

**Rule of thumb:**

* Whole sections/pages owned separately → **route‑based**.
* Shared components/flows across pages or agent‑parallelism per feature → **runtime federation**.

---

## 3. Minimal architecture

* **Host shell**: global router, auth/session, navigation, error boundaries, design tokens/themes.
* **Remotes (features)**: self‑contained apps for domains (e.g., `profile`, `billing`, `analytics`). Each exposes a mountable entry (page or widget) and a small public API.
* **Shared libraries**: design system (e.g., **shared‑ui‑elements**), types, and small utilities. Treat as versioned packages; avoid ad‑hoc cross‑imports.
* **Contracts at the seams**: define what a remote exports (components, types, events). Changes are additive; breaking changes require a major bump.
* **Observability**: log `remoteName@version` in errors and analytics; add health pings per remote.

---

## 4. Workflow with agents/models

* **One remote = one work unit.** Assign an agent to a remote with a clear brief and public API; disallow edits outside its boundary.
* **Freeze finished remotes.** Mark read‑only; agents can depend on them but not modify internals.
* **Contract tests first.** For each remote export, keep tiny tests the host runs to verify props/events. Agents target these tests.
* **Integration gates.** Host runs smoke tests that mount each remote. Only green remotes are linked in the manifest.
* **Prompts that enforce boundaries.**

  * *“Use only documented exports from `profile/remote`. Do not import internal paths. If an export is missing, propose an additive change instead of editing internals.”*

---

## 5. Setup (runtime federation with Vite)

**Assumptions:** React, TypeScript, Vite, `vite‑plugin‑federation`.

### 5.1 Host

* Owns router, auth, layout, error boundaries.
* Loads remotes via a **remote manifest** (URLs per environment).
* Shares core deps (react, react‑dom) to avoid duplication.

**vite.config.ts (host)**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        profile: 'http://localhost:5001/assets/remoteEntry.js',
        billing: 'http://localhost:5002/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
});
```

### 5.2 Remote (e.g., `profile`)

* Exposes mountable components and a small API.
* Declares the same shared deps.

**vite.config.ts (remote)**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'profile',
      filename: 'remoteEntry.js',
      exposes: {
        './Page': './src/ProfilePage.tsx',
        './Widget': './src/ProfileCard.tsx'
      },
      shared: ['react', 'react-dom']
    })
  ]
});
```

**Host usage**

```tsx
const ProfileCard = React.lazy(() => import('profile/Widget'));
```

### 5.3 Dev & prod

* **Dev:** run each remote on its own port; the host pulls from local URLs.
* **Prod:** publish each remote to its own origin (immutable build); host reads a **manifest** with versioned URLs; roll back by swapping the manifest.

---

## 6. Data, auth, and safety

* **Auth/session**: keep in the host; pass a short‑lived token/context down to remotes. Avoid direct storage access from remotes.
* **API access**: call through a small adapter package so remotes share the same client behavior and error shapes.
* **Permissions**: hide routes and widgets the user is not allowed to see at the host level.
* **Error boundaries** around each remote; a failing remote should degrade gracefully without breaking the shell.
* **Security**: load remotes over HTTPS; restrict allowed origins; consider Subresource Integrity (SRI) for remote entries.

---

## 7. Performance & DX

* **Bundle sharing**: pin versions of shared deps; avoid multiple React copies.
* **Prefetch & lazy**: prefetch likely remotes; lazy‑load the rest; show skeletons.
* **Caching**: long cache for immutable remote builds; short cache for the manifest.
* **Testing**: keep per‑remote unit tests and host‑level smoke tests that mount each remote.

---

## 8. When not to use microfrontends

* Very small apps or single‑page widgets where a single bundle is simpler.
* Heavy server‑side rendering/SEO on every component; consider **route‑based** segmentation instead of runtime federation.
* Teams uncomfortable with versioning at the edges; start with a monolith and split later.

---

## 9. Takeaways

* Microfrontends decouple ownership and deployment.
* For LLM/agent workflows, they provide **safe isolation** so parallel work does not collide.
* Choose **route‑based** for whole sections, **runtime federation** for shared widgets and parallel development.
* Keep host simple (auth, layout, routing); keep remotes bounded with clear contracts; version and observe everything.
