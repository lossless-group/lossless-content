# Essential Documentation References

## Core Framework
- Astro Documentation: https://docs.astro.build/
  - Content Collections: https://docs.astro.build/en/guides/content-collections/
  - TypeScript Integration: https://docs.astro.build/en/guides/typescript/
  - Routing: https://docs.astro.build/en/guides/routing/
  - Prefetch: https://docs.astro.build/en/guides/prefetch/
  - Layouts: https://docs.astro.build/en/basics/layouts/
  - Client-Side Scripts: https://docs.astro.build/en/guides/client-side-scripts/
  - MDX Integration: https://docs.astro.build/en/guides/integrations-guide/mdx/
  - Node Adapter: https://docs.astro.build/en/guides/integrations-guide/node/

## Markdown Processing
### Unified Ecosystem
- unified (core): https://github.com/unifiedjs/unified
  - Getting Started: https://unifiedjs.com/learn/guide/introduction/
  - Creating Plugins: https://unifiedjs.com/learn/guide/create-a-plugin/
  - **Processing Pipeline**: https://unifiedjs.com/learn/guide/create-a-plugin/#processing
  - **Compiler Requirements**: https://unifiedjs.com/learn/guide/create-a-plugin/#compilers
- remark (markdown): https://github.com/remarkjs/remark
  - Plugin List: https://github.com/remarkjs/remark/blob/main/doc/plugins.md
  - remark-parse: https://github.com/remarkjs/remark/tree/main/packages/remark-parse
  - remark-rehype: https://github.com/remarkjs/remark-rehype
  - remark-stringify: https://github.com/remarkjs/remark/tree/main/packages/remark-stringify
  - remark-definition-list: https://github.com/remarkjs/remark-definition-list
- rehype (HTML): https://github.com/rehypejs/rehype
  - rehype-stringify: https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify
  - rehype-parse: https://github.com/rehypejs/rehype/tree/main/packages/rehype-parse
  - @nasa-gcn/remark-rehype-astro: https://github.com/nasa-gcn/remark-rehype-astro

### Important Pipeline Notes
1. A complete unified pipeline needs three components:
   - Parser (e.g., remark-parse for markdown)
   - Transformers (your plugins)
   - Compiler (e.g., remark-stringify for markdown, rehype-stringify for HTML)

2. Common Pipeline Patterns:
   ```js
   // Markdown to Markdown
   unified()
     .use(remarkParse)        // Parser
     .use(yourPlugin)         // Transform
     .use(remarkStringify)    // Compiler

   // Markdown to HTML
   unified()
     .use(remarkParse)        // Parse Markdown
     .use(remarkRehype)       // Transform to hAST
     .use(rehypeStringify)    // Compile to HTML
   ```

### AST Utilities
- unist: https://github.com/syntax-tree/unist
  - unist-builder: https://github.com/syntax-tree/unist-builder
  - unist-util-visit: https://github.com/syntax-tree/unist-util-visit
- mdast: https://github.com/syntax-tree/mdast
  - mdast-util-from-markdown: https://github.com/syntax-tree/mdast-util-from-markdown
  - mdast-util-to-markdown: https://github.com/syntax-tree/mdast-util-to-markdown

## UI and Styling
- Tailwind CSS: https://tailwindcss.com/
  - Forms Plugin: https://github.com/tailwindlabs/tailwindcss-forms
  - Animation Plugin: https://github.com/jamiebuilds/tailwindcss-animate
  - Variants: https://www.tailwind-variants.org/
- Tabler Icons: https://tabler.io/icons
- Astro Icon: https://github.com/natemoo-re/astro-icon

## Development Tools
- TypeScript: https://www.typescriptlang.org/
- Shiki (Syntax Highlighting): https://shiki.matsu.io/
- gray-matter (Frontmatter): https://github.com/jonschlinkert/gray-matter
- glob: https://github.com/isaacs/node-glob
- dotenv: https://github.com/motdotla/dotenv
- husky (Git Hooks): https://typicode.github.io/husky/
- tsx (TypeScript Execution): https://github.com/esbuild-kit/tsx
- uuid: https://github.com/uuidjs/uuid

## Package Management
- pnpm Documentation: https://pnpm.io/
  - Workspace: https://pnpm.io/workspaces
  - Package JSON: https://pnpm.io/package_json
  - Dependencies: https://pnpm.io/dependencies

## Version Control
- Git Submodules: https://git-scm.com/book/en/v2/Git-Tools-Submodules