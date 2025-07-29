---
date_created: 2025-07-29
date_modified: 2025-07-29
site_uuid: 27417cb8-645d-4686-bb30-808d79ec6f8a
publish: true
title: Maintain Figma Object Embeds Using Embed Kit
slug: maintain-figma-object-embeds-using-embed-kit
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
augmented_with: Warp on Claude Sonnet 4.0
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
  src={`https://www.figma.com/embed?embed_host=${embedHost}&url=${figmaUrl}$
    {initialView ? `&initial_view=${initialView}` : ''}$
  {pageId ? `&pageId=${pageId}` : ''}$
    {nodeId ? `&nodeId=${nodeId}` : ''}$
  {hideUi !== undefined ? `&hide_ui=${hideUi}` : ''}`}
  allowfullscreen
  style="border:none;width:100%;height:500px;">
</iframe>
```

2. **Primary Usage: Remark Directive in Markdown**

   Our primary intention is to use this component through remark-directives in Markdown files. This allows for seamless embedding without importing components:

   ```markdown
   ::figma-embed{
     src="https://www.figma.com/file/abc123/Your-Figma-File"
     initial-view="design"
     hide-ui="true"
     width="800"
     height="600"
   }
   ```

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

## Future Work

Consider extending the component to handle additional parameters or support themes and other customization.

