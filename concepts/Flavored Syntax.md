---
date_created: 2025-03-20
date_modified: 2025-08-23
site_uuid: 641fe031-3da5-4187-bcc5-00d0c379512e
---
[[concepts/Abstract Syntax Trees|Abstract Syntax Trees]]
## Embed Syntax
Found from [[Tooling/Software Development/DevOps/Documentation Engines/Readme|Readme]]

Simple embedded content is written as a Markdown link, with a title of "@embed", like so:

```
[Embed Title](https://youtu.be/8bh238ekw3 "@embed")
```

More robust embedded content is written as a JSX component:

```
<Embed
  html={false}
  url="https://github.com/readmeio/api-explorer/pull/671"
  title="RDMD CSS theming and style adjustments. by rafegoldberg · Pull Request #671 · readmeio/api-explorer"
  favicon="https://github.com/favicon.ico"
  image="https://avatars2.githubusercontent.com/u/6878153?s=400&v=4"
/>
```

Flavored syntax in the Markdown ecosystem refers to variations or extensions of the standard Markdown syntax. Markdown was initially created as a lightweight markup language for formatting text, but over time, different platforms and communities have adopted it with their own unique rules or "flavors". 

These flavored versions might include additional features, such as tables, footnotes, definition lists, or syntax highlighting for code blocks, which aren't part of the original Markdown specification. Examples of these flavors include GitHub Flavored Markdown (GFM), MultiMarkdown, and Pandoc Markdown.

This diversity arises because each platform has specific needs for text formatting that aren't covered by the base Markdown spec. For instance, GitHub's flavor includes specific syntax for task lists and code fences, while Medium uses its own proprietary syntax for certain features like highlighting direct quotes or emphasizing parts of a post.

While this flexibility is beneficial as it allows Markdown to be adapted to various contexts, it can also lead to incompatibilities between different systems if they use incompatible flavors. Tools and converters have been developed to help mitigate these issues, allowing documents written in one flavor to be rendered correctly on another.