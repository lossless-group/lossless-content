---
date_created: 2025-07-29
date_modified: 2025-10-07
site_uuid: 27417cb8-645d-4686-bb30-808d79ec6f8a
publish: true
date_authored_initial_draft: 2025-07-29
date_authored_current_draft: 2025-08-02
date_authored_final_draft:
date_first_published: 2025-03-18
title: Maintain Figma Object Embeds Using Embed Kit
slug: maintain-figma-object-embeds-using-embed-kit
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
augmented_with: Warp on Claude Sonnet 4.0
image_prompt: A team of tiny robots is on a desk, taking a set of web UI components, and carrying them to the back of a computer monitor.  On the computer monitor, you can see beautiful UI mockups.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Maintain-Figma-Object-Embeds-using-Embed-Kit_banner_image_1755815941823_YvitG--88.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Maintain-Figma-Object-Embeds-using-Embed-Kit_portrait_image_1755815950469_UsSm3cibW.webp
square_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Maintain-Figma-Object-Embeds-using-Embed-Kit_square_image_1755815958668_1lRXdMK02.webp
---

# Maintain Components that Embed Figma Objects using Embed Kit

## Overview

This guide explains how to embed Figma objects in custom components using the Figma Embed Kit. The Figma Embed Kit allows you to display Figma files, frames, and prototypes directly in your application, offering an interactive experience.

# Example
```markdown
::figma-embed{
   src="https://www.figma.com/design/splN6L6DgSf61khdyfpybl/Go-Lossless?node-id=2459-9610&t=u6HwEgch9WcmWQbF-4"
   auth-user="mpstaton"
   width="800"
   height="600"
}
```

::figma-embed{
   src="https://www.figma.com/design/splN6L6DgSf61khdyfpybl/Go-Lossless?node-id=2459-9610&t=u6HwEgch9WcmWQbF-4"
   auth-user="mpstaton"
   width="800"
   height="600"
}
:::
# Figma API

**Base URL:**: https://api.figma.com
## Getting a Figma API Key

To embed Figma content, construct your URL with the following base format:


```zsh
$ curl -sH 'X-Figma-Token: 29-206...'
    'https://api.figma.com/v1/files/...'
    | python -m json.tool
{
  "components": {},
  "document": {
    "children": [
      {
        "backgroundColor": {
          "a": 1,
          "b": 0.8980392156862745,
          "g": 0.8980392156862745,
          "r": 0.8980392156862745
        },
        "children": [],
        "exportSettings": [],
        "id": "0:1",
        "name": "Page 1",
        "type": "CANVAS",
      }
    ],
    "id": "0:0",
    "name": "Document",
    "type": "DOCUMENT",
  },
  "schemaVersion": 0
}
```


## Embed URL Format

```
https://www.figma.com/embed?embed_host={host}&url={figma-url}
```

### Required Parameters

- **`embed_host`**: Specifies the host application. Use your domain or app name to identify the host.
- **`url`**: The URL of the Figma file, frame, or node you want to embed.

### Optional Query Parameters

- **`initial_view`**: Determines the initial view ('design' or 'prototype')
- **`pageId`**: ID of the page to display
- **`nodeId`**: ID of the specific node to display
- **`hide_ui`**: Hides Figma UI elements (true/false)
- **`hotspot-hints`**: Shows prototype hotspot hints (0 or 1)
- **`scaling`**: Controls how content is scaled ('min-zoom', 'contain', or 'fill')
- **`allow-fullscreen`**: Allows fullscreen mode (true/false)
- **`chrome`**: Controls UI chrome visibility ('DOCUMENTATION' hides most UI)

## Implementing in Custom Components

1. **Create a Figma Embed Component**

   Develop a component in Astro that receives the Figma URL and optional parameters:
   
   ```astro
   ---
// Component script
export let figmaUrl: string;
export let embedHost: string = 'your-domain.com';
export let initialView?: string;
export let pageId?: string;
export let nodeId?: string;
export let hideUi?: boolean;
  ---

<!-- Component template -->
<iframe
  src={
    'https://www.figma.com/embed?embed_host=' + embedHost +
    '&url=' + encodeURIComponent(figmaUrl) +
    (initialView ? '&initial_view=' + initialView : '') +
    (pageId ? '&pageId=' + pageId : '') +
    (nodeId ? '&nodeId=' + nodeId : '') +
    (hideUi !== undefined ? '&hide_ui=' + String(hideUi) : '')
  }
  allowfullscreen
  style="border:none;width:100%;height:500px;">
</iframe>
```

2. **Primary Usage: Remark Directive in Markdown**

   Our primary intention is to use this component through remark-directives in Markdown files. This allows for seamless embedding without importing components:

   ```markdown
   ::figma-embed{
     src="https://www.figma.com/file/bm4kr9lQAVhvllVk7hsDuD/Parslee?node-id=3212-21097"
     initial-view="design"
     hide-ui="true"
     width="800"
     height="600"
   }
   ```

3. **Direct Raw HTML Iframe (for testing only)**

   Avoid using backticks or extra quotes around the `src` URL. Use the official Figma embed endpoint (`https://www.figma.com/embed`) and pass your file/design URL via the `url` parameter.

   ```html
   <iframe
     style="border: 1px solid rgba(0, 0, 0, 0.1);"
     width="800"
     height="450"
     src="https://www.figma.com/embed?embed_host=lossless.group&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fbm4kr9lQAVhvllVk7hsDuD%2FParslee%3Fnode-id%3D3212-21097"
     allowfullscreen>
   </iframe>
   ```

   Notes:
   - Do not use `` `...` `` around URLs; those backticks break embeds and routing.
   - Prefer `https://www.figma.com/embed?url=...` over `https://embed.figma.com/design/...` to match our pipeline and avoid CORS or parsing issues.

   **Simple usage with minimal parameters:**
   ```markdown
   ::figma-embed{src="https://www.figma.com/file/abc123/Your-Figma-File"}
   ```

3. **Alternative Usage: Direct Component Import**

   You can also use the component directly in Astro files:

   ```astro
   ---
   import FigmaEmbed from '../components/FigmaEmbed.astro';
   ---

   <FigmaEmbed
     figmaUrl="https://www.figma.com/file/abc123/Your-Figma-File"
     initialView="design"
     hideUi={true}
   />
   ```

4. **Usage in MDX Files**

   For MDX files, you can either use the remark directive (preferred) or import the component:

   **Preferred: Using remark directive**
   ```mdx
   # My Document
   
   Here's an embedded Figma file:
   
   ::figma-embed{
     src="https://www.figma.com/file/abc123/Your-Figma-File"
     initial-view="prototype"
   }
   ```

   **Alternative: Direct import**
   ```mdx
   ---
   import FigmaEmbed from '../components/FigmaEmbed.astro';
   ---
   
   # My Document
   
   <FigmaEmbed figmaUrl="https://www.figma.com/file/abc123/Your-Figma-File" />
   ```

## Security Considerations

- Ensure the Figma URL is sanitized to prevent injection attacks.
- Restrict embedding to trusted domains if applicable.

## Testing and Validation

- Verify embed functionality in various browsers and devices.
- Test optional parameters to ensure proper handling and fallback.

## Live Example

Here's a live example using the Go-Lossless Figma design:

::figma-embed{
  src="https://www.figma.com/design/splN6L6DgSf61khdyfpybl/Go-Lossless?node-id=2459-9610&t=u6HwEgch9WcmWQbF-4"
  width="800"
  height="600"
  initial-view="design"
}

This example demonstrates:
- **Specific node targeting** using `node-id=2459-9610`
- **Custom dimensions** with width and height parameters
- **Initial view** set to design mode
- **Clean embed URL** that will render the Go-Lossless design

## Implementation Findings

### Directive Syntax Resolution

During implementation, we discovered that `remark-directive` supports two distinct syntax formats:

1. **Leaf Directives (Single-line):**
   ```markdown
   ::figma-embed{ src="..." width="800" height="600" }
   ```

2. **Container Directives (Multi-line):**
   ```markdown
   :::figma-embed
   src="..."
   width="800"
   height="600"
   :::
   ```

### AstroMarkdown Integration

The implementation required updating `AstroMarkdown.astro` to handle both `leafDirective` and `containerDirective` node types:

- **Leaf directives** have attributes directly available in `node.attributes`
- **Container directives** require parsing child nodes to extract key-value pairs from text content
- Both formats are now fully supported with proper attribute extraction

### Enhanced Features Implemented

1. **Breakout Layout:** Full-width container that breaks out of normal content padding, similar to Mermaid charts
2. **Modal Expansion:** Click-to-expand functionality for fullscreen viewing with proper focus management
3. **Node-Specific Embedding:** Proper URL construction to focus on specific Figma nodes using `node-id` parameters
4. **Accessibility:** ARIA labels, keyboard navigation, and focus trapping in modal view

### URL Construction

The final embed URL format includes:
```
https://www.figma.com/embed?embed_host=lossless.group&url=ENCODED_URL&node-id=NODE_ID&viewer=1&scaling=min-zoom
```

This ensures proper node focusing and optimal viewing experience.

## Future Work

Consider extending the component to handle additional parameters or support themes and other customization.

