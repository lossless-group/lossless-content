---
date_created: 2026-05-25
date_modified: 2026-05-25
title: tldraw Desktop — Native Editor for .tldr Files
slug: tldraw-desktop-tldr-editor
tags: [macOS, Diagrams, Whiteboard, Drawing, Open-Source, Design]
github_repo_url: https://github.com/tldraw/tldraw-desktop
brew_page: https://formulae.brew.sh/cask/tldraw
install: brew install --cask tldraw
---

https://github.com/tldraw/tldraw-desktop

## Why This Matters

`tldraw` is one of those tools that punches enormously above its weight on the web — an open-source infinite-canvas whiteboard / diagramming editor that has quietly become the default "low-fi diagram" tool for a lot of engineering teams. It's also the underlying SDK that powers an increasing share of "draw me a flowchart" AI features. The web app at [tldraw.com](https://tldraw.com) is what most people know.

The Homebrew cask is the *desktop* wrapper — version 1.2.3, macOS 12+ — that gives you a native app, local-file persistence (`.tldr` files on disk), and offline use without paying with browser tabs. Same editor, but it now lives in your filesystem like a real document.

## What It Actually Does

- **Local `.tldr` files.** Documents live on disk, in a version-controllable JSON-ish format, openable by `tldraw` on any machine.
- **The full tldraw editing surface.** Arrows, shapes, sticky notes, freehand, embedded images, frames — all the primitives the web app has, in a native window.
- **Infinite canvas.** Pan, zoom, group, frame regions.
- **Offline-first.** No account, no sync, no cloud — just files.
- **Open source.** MIT-licensed engine. The desktop wrapper is a thin Electron/native shell around the same React-based editor that powers the web product.

## Where It Fits in Our Workflow

`tldraw` slots into the "low-fi diagram you actually iterate on" niche where Excalidraw and (paid) Whimsical also live. For the Lossless tree specifically:

1. **`context-v/specs/` diagrams.** Many of our specs need a diagram component (architecture, data flow, sequence of agent operations). Today these are usually Mermaid blocks — great for version control, terrible for spatial reasoning. A `.tldr` file checked in alongside the `.md` covers the "draw it out" case Mermaid can't.

2. **Deck iteration whiteboard.** Under [[deck-iteration-workflow]] the early-stage version of a fundraise narrative is almost always a spatial sketch before it's slides. `.tldr` files give you a versioned diff-able artifact that survives across deck rebuilds.

3. **Versus Excalidraw.** Excalidraw has a similar pitch (open-source, sketchy aesthetic, file-on-disk). tldraw is more polished, more shape-flexible, slightly less "intentionally rough." Both are reasonable; tldraw's strength is that it's also an SDK, so anything you learn about the file format and primitives transfers if you later embed the editor into a Lossless site.

Note that this cask is distinct from the web product. If you collaborate primarily through tldraw.com's shared boards, the desktop app is a complement, not a replacement.

## Install

```bash
brew install --cask tldraw
```

Source: <https://github.com/tldraw/tldraw-desktop>
