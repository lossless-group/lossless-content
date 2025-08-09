---
date_created: 2025-07-28
date_modified: 2025-08-09
site_uuid: 39273105-c5e3-4c4a-8bb9-6272d88764e0
publish: true
title: Maintain Embeddable Slides
slug: maintain-embeddable-slides
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
augmented_with: Claude Code on Claude Sonnet 4
---
# Maintain-Embeddable-Slides.md

## Specification for Embedding Reveal.js Presentations in Markdown

### Overview
This specification defines how to embed Reveal.js presentations within rendered markdown files using a consistent syntax that aligns with the existing backlink convention.

### Syntax

#### Basic Usage
```markdown
:::slides
- [[essays/my-presentation.md|Introduction to AI]]
- [[essays/deep-learning.md|Deep Learning Fundamentals]]
- [[essays/neural-networks.md|Neural Network Architecture]]
:::
```

#### With Configuration Options
```markdown
:::slides
theme: dark
transition: slide
controls: true
progress: true
autoSlide: 0
loop: false

- [[essays/intro.md|Introduction]]
- [[essays/chapter1.md|Chapter 1: Getting Started]]
- [[essays/chapter2.md|Chapter 2: Advanced Topics]]
:::
```

#### Compact Configuration
```markdown
:::slides theme=dark transition=slide
- [[essays/intro.md|Introduction]]
- [[essays/chapter1.md|Chapter 2]]
:::
```

### Implementation Details

#### 1. Parser Location
Add parsing logic in `/src/components/markdown/AstroMarkdown.astro` around line 982 in the code block switch statement.

#### 2. Parsing Logic
- Extract backlink references using regex pattern: `\[\[(.*?)\|(.*?)\]\]`
- Parse YAML-style configuration options at the beginning
- Support both `key: value` and `key=value` syntax for configuration
- Maintain slide order as specified in the markdown

#### 3. Component Structure
Create a new component `SlidesEmbed.astro` that:
- Accepts parsed slides array with paths and titles
- Accepts configuration object
- Renders an iframe pointing to the reveal.js presentation route
- Handles responsive sizing and aspect ratio

#### 4. URL Construction
The embed component should construct URLs like:
```
/slides/embed?slides=essays/intro.md,essays/chapter1.md&theme=dark&transition=slide
```

Or use a POST request / session storage for complex configurations.

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| theme | string | 'black' | Reveal.js theme name |
| transition | string | 'slide' | Transition style (none/fade/slide/convex/concave/zoom) |
| controls | boolean | true | Show control arrows |
| progress | boolean | true | Show progress bar |
| autoSlide | number | 0 | Auto-advance slides (milliseconds, 0 = disabled) |
| loop | boolean | false | Loop presentation |
| width | string | '100%' | Embed width |
| height | string | '600px' | Embed height |

### Example Rendered Output
The parsed content should render as:
```html
<div class="presentation-embed">
  <iframe 
    src="/slides/embed?slides=..." 
    width="100%" 
    height="600px"
    frameborder="0"
    allowfullscreen
  />
</div>
```

### Error Handling
- If a linked markdown file doesn't exist, show a warning in development
- Gracefully skip missing files in production
- Validate configuration options and use defaults for invalid values

### Security Considerations
- Sanitize all paths to prevent directory traversal
- Validate that linked files are within allowed content directories
- Escape all user-provided configuration values

### Future Enhancements
- Support for speaker notes syntax
- Ability to specify individual slide transitions
- Support for slide-specific themes
- Export to PDF functionality from embedded view