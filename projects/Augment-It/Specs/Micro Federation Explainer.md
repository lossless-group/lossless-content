---
date_created: 2025-07-20
date_modified: 2025-08-09
tags: [Microfrontends, Module-Federation]
site_uuid: fb08f7d0-fe0f-416e-8841-bbafc0acfd68
publish: true
title: Micro Federation Explainer
slug: micro-federation-explainer
at_semantic_version: 0.0.0.1
---

# 📘 Micro-Federation Technical Supplement

This document expands on the **Micro-Federation Architecture Blueprint**, providing deeper explanations of the concepts, tools, and decisions behind the chosen stack.

---

## 🔎 Micro-Frontends and Micro-Federation

### What are Micro-Frontends?
Micro-frontends are an architectural pattern where a web application is split into smaller, independently developed and deployed frontend apps. Each piece (called a **micro-frontend**) is responsible for a specific feature or domain.

- ✅ **Independent development:** Different teams can work on different micro-frontends.
- ✅ **Independent deployment:** Deploy updates without redeploying the whole app.
- ✅ **Seamless integration:** Users see one cohesive application.

**Example:**  
- `/dashboard` could be built by Team A.  
- `/analytics` could be built by Team B.  
- The host app stitches them together.

### What is Micro-Federation?
Micro-federation is a runtime technique that allows one frontend app (the host) to load components or modules from other apps (remotes) **on demand** without rebuilding.

- Built on **Webpack Module Federation** or compatible solutions.
- Allows **dynamic imports** like `import('remoteApp/Component')` at runtime.

---

## 🏗️ Why Next.js Does Not Work Well for Module Federation

[[Tooling/Software Development/Frameworks/Web Frameworks/NEXT.js|NEXT.js]] is a **full-stack React framework** with server-side rendering ([[Vocabulary/Server Side Rendering|SSR]]), routing, and build-time optimizations. It was not designed with runtime federation in mind.

- ❌ Next.js bundles pages at build time. Remote modules loaded at runtime can break SSR.
- ❌ Requires special handling of both server and client bundles.
- ❌ Community-maintained solutions existed (like `@module-federation/nextjs-mf`), but they required complex patches.

### What `nextjs-mf` Did
`@module-federation/nextjs-mf` was a plugin to integrate [[Tooling/Software Development/Programming Languages/Libraries/Webpack|Webpack]] Module Federation into Next.js apps:
- ✅ Expose Next.js pages/components as remotes.
- ✅ Import from other Next.js apps at runtime.

**Why it stopped working well:**
- The plugin became hard to maintain as Next.js evolved.
- Next.js updated its internal Webpack configuration, breaking compatibility.
- Official support waned, and the package is now effectively deprecated.

```emphasis
The module federation community revolted against Next.js, as Vercel (Father of Next.js) turned their backs on module federation as they focus on SPA. 

Vercel seems to be trying to repair their reputation with the community through a beta feature called Vercel Microfrontends, though this would not work for our desired product
```

---

## 🌐 What Vercel Microfrontends Does

[[Tooling/Software Development/Cloud Infrastructure/Vercel|Vercel]] introduced **Vercel Microfrontends**, but it’s **route-based**, not runtime federation:
- ✅ Splits an app into multiple Next.js projects, each serving specific routes (e.g., `/docs` or `/dashboard`).
- ✅ Seamless routing via Vercel’s edge network.
- ❌ Does not support loading components dynamically at runtime; instead, each route belongs to a specific project.

**When to use:** when each microfrontend controls whole routes and you deploy on Vercel.

**Why not for us:** we needed **runtime-level** federation of small UI cards, not route segmentation.

---

## ⚡ Why We Chose Vite + vite-plugin-federation

### [[Tooling/Software Development/Developer Experience/DevTools/Vite|Vite]] Overview
[Vite](https://vitejs.dev/) is a **frontend build tool and dev server** that sits on top of Rollup and uses ES Modules natively:
- 🚀 **Instant server start** thanks to on-demand module loading.
- 🔥 **Fast HMR (Hot Module Replacement)** for a great dev experience.
- 🛠️ **Supports [[Tooling/Software Development/Frameworks/Web Frameworks/React|React]], [[Tooling/Software Development/Frameworks/Web Frameworks/Vue.js|Vue.js]], [[Tooling/Software Development/Frameworks/Web Frameworks/Svelte|Svelte]], and more.**

**Vite is not a backend**—it’s a bundler/dev server, unlike Next.js which is a full-stack framework.

### vite-plugin-federation
[`vite-plugin-federation`](https://github.com/originjs/vite-plugin-federation) brings **Webpack-style Module Federation** to Vite:
- ✅ Expose components as remote modules.
- ✅ Dynamically load them in a host at runtime.
- ✅ Share dependencies like React to avoid duplication.

### Why this combo?
- ✔️ Purely frontend, no SSR complexity.
- ✔️ Works well with React and [[ES Modules]].
- ✔️ Faster dev cycle than Next.js federation hacks.
- ✔️ Active development and simpler config.

**Result:** We get the power of Module Federation with the simplicity and speed of Vite.

---

## 🔧 How Vite Builds on Top of React

- React is just a UI library. On its own, you’d need to configure bundling, HMR, and code splitting manually.
- Vite provides those capabilities out-of-the-box:  
  ✅ **JSX/TSX compilation** (via esbuild).  
  ✅ **Hot Module Replacement** for instant feedback.  
  ✅ **Code splitting** and optimized builds via Rollup.

Adding `@vitejs/plugin-react` enables fast-refresh and React-specific optimizations.

Together with vite-plugin-federation, you can:
```tsx
// Host dynamically imports a federated React component
const CardA = React.lazy(() => import('cardA/Card'));
```
…and Vite handles serving, bundling, and updating the module graph.

---

## ✅ Final Decision

| Tool                                                                                    | Purpose               | Why                                          |
| --------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------- |
| **React**                                                                               | UI framework          | Declarative components, huge ecosystem       |
| **Vite**                                                                                | Build tool/dev server | Fast, simple, modern                         |
| **vite-plugin-federation**                                                              | Module Federation     | Runtime federation support                   |
| **[[Tooling/Software Development/Developer Experience/DevTools/Turborepo\|Turborepo]]** | Monorepo manager      | Orchestrates builds/dev across multiple apps |

---

## ✨ Key Takeaways

- **Micro-frontends** split your UI into independent pieces.
- **Module Federation** enables loading those pieces at runtime.
- **Next.js federation solutions** are deprecated or route-based, not ideal for runtime cards.
- **Vite + vite-plugin-federation** is a modern, lightweight solution.
- **Turborepo** ties it all together in one workflow.

> 💡 **With this setup:**  
You can build scalable, maintainable micro-frontend architectures that feel like a single app to users, while enabling teams to work independently and deploy quickly.

Happy building! 🚀
