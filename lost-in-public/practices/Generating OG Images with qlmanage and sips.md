---
tags: [qlmanage, sips, OG-Images, macOS-CLI, Astro]
date_created: 2026-07-07
date_modified: 2026-07-07
title: "Generating OG Images with qlmanage and sips"
---

## What qlmanage is

`qlmanage` ships with every Mac — it's the CLI interface to QuickLook, the same
system that renders a file preview when you hit spacebar in Finder. It's been
part of macOS since 10.5 (2007). Nothing to install.

Normal use case: debugging a custom QuickLook preview plugin, or force-clearing
the thumbnail cache when a Finder preview looks stale (`qlmanage -r cache`).

The use case here: it's also a **zero-dependency way to rasterize a file to a
PNG from the terminal** — including SVG and, more usefully, raw HTML/CSS —
because macOS ships QuickLook generators for both, and `qlmanage` will drive
whichever generator matches the file's type.

```
qlmanage [OPTIONS] path...
  -t              compute thumbnails of the documents
  -p              compute previews of the documents
  -s size         size for the thumbnail
  -o dir          output result in dir (don't display thumbnails/previews)
  -r cache        reset the thumbnail disk cache
```

- **`-t` (thumbnail mode)** is what you want for scripted rasterization — it
  writes a `.png` straight to disk via `-o`.
- **`-p` (preview mode)** is for the interactive QuickLook preview panel. It
  writes a `.qlpreview` *bundle directory*, not a flat image — not useful for
  a scripted pipeline.
- `-s <size>` sets the **max pixel dimension of a square canvas**. This is
  the load-bearing gotcha below.

## How it can be used, generally

Anything macOS already knows how to QuickLook, `qlmanage -t` can rasterize
headlessly: PDFs, images, `.svg`, `.html`, `.webarchive`, Keynote/Pages docs,
code files (syntax-highlighted), folders (folder-icon composite). Useful any
time you want a flat image of something without opening an app —
`qlmanage -t -s 800 -o /tmp/out slide.key` gets you a PNG of the first slide,
`qlmanage -t -s 400 -o /tmp/out README.md` gets you a rendered-markdown
thumbnail, etc.

## The gotcha: qlmanage always produces a square canvas

Tested directly: an HTML file with `body { width: 1200px; height: 630px }` —

```bash
qlmanage -t -s 1200 -o /tmp/out hero.html
sips -g pixelWidth -g pixelHeight /tmp/out/hero.html.png
# → 1200 x 1200
```

`-s 1200` means "max 1200px on the long edge, square canvas" — it does **not**
respect the page's own declared width/height. The WebKit HTML generator
renders the page, then pads/positions it into that square. Don't fight this;
plan for it in the crop step.

## The other gotcha: `sips -z` squashes, it does not crop

The first instinct is `sips -z <height> <width>` to force the exact target
dimensions. **Don't** — `-z` is a resize, and resizing a 1200×1200 source into
1200×630 non-uniformly squashes the image (verified: text visibly flattened
vertically, ~50% vertical compression).

Use `-c` / `--cropToHeightWidth` instead — a true **center-crop**, no
distortion:

```bash
sips -c 630 1200 /tmp/out/hero.html.png --out public/og-banner.png
```

Because the crop is centered on the *square* canvas, not on your content,
**design the HTML hero with generous vertical padding** so the important
content survives an approximate center-crop. In testing, content that was
CSS-centered within its own 630px-tall `<body>` ended up positioned toward
the *top* of the padded 1200×1200 square — the crop still caught it, but
off-center. Always open the cropped output and check before shipping;
don't assume the crop landed where you expect.

## Full recipe

```bash
# 1. Author the hero as a standalone HTML file — real content, real DESIGN.md
#    tokens (colors/fonts inline or via <style>), not a photo/illustration.
#    Give it generous vertical padding around the focal content.

# 2. Rasterize via QuickLook's WebKit HTML generator (no browser install):
qlmanage -t -s 1200 -o /tmp/og-render path/to/hero.html

# 3. True center-crop to the target aspect ratio (NOT -z, which squashes):
sips -c 630 1200 /tmp/og-render/hero.html.png --out /tmp/og-render/cropped.png

# 4. Convert to JPEG for OG delivery (JPEG-over-WebP for unfurler compat):
sips -s format jpeg /tmp/og-render/cropped.png --out public/og-banner.jpg

# 5. Look at the actual output file before shipping it. Every time.
```

All verified end-to-end on this machine, 2026-07-07 — a dark-background,
green-heading test hero survived the full pipeline at 1200×630 with no
distortion, positioned correctly after the crop.

## Fidelity limits

QuickLook's HTML generator is WebKit-based but is **not** a full browser
engine tab — it's the same renderer Finder uses for a file preview. Simple
CSS (flexbox, grid, custom fonts loaded via local `@font-face`, gradients,
background images) rendered faithfully in testing. Untested / likely riskier:
JS-driven layout, web-font `@font-face` loaded from a remote URL (no network
guarantee inside the QuickLook sandbox), CSS filters/masks, `@media` queries
tied to a viewport QuickLook doesn't expose.

If a hero relies on any of that, don't fight QuickLook — screenshot the *live*
component in a headless browser instead (Playwright's `page.screenshot()` at
a fixed viewport). Slower, needs a dependency, but pixel-parity with the real
rendered site is guaranteed.

## Where this fits

This is the concrete "how" behind **Technique B** in the
`generate-consistent-og-images` agent skill (rasterize the site's own hero
instead of generating an Ideogram illustration) — see that skill's "Strategy
choice" section for *when* to reach for this over an AI-illustrated OG image.
Live example: `ai-labs/id-didi-sh/splash/public/og-banner.png` — the
"SPECIMEN" credential-card hero, originally produced this exact way on
2026-07-06.
