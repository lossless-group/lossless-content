---
date_created: 2025-08-10
date_modified: 2025-08-12
---
A Partial makes everything optional.

```typescript
type FullContent = Partial<{
  fullMarkdownTxt: string;
  fullHtmlTxt: string;
  fullPlainText: string;
  fullRichText: string;
  pathToFullContent: string;
  urlToRemoteFullContent: string;
}> | string | null | undefined;
```


```typescript
type SocialLink = import('../ui/SocialIcons.astro').SocialLink;
```

This is called a **Type-Only Import** in TypeScript. Here's what it does:

1. **Imports a Type**: It imports just the `SocialLink` type from the `SocialIcons.astro` file, not the actual component or its runtime code.
    
2. **No Runtime Impact**: This import is removed during compilation and doesn't affect the final JavaScript bundle.
    
3. **Type Safety**: It allows TypeScript to understand the shape of the `SocialLink` type for type checking.
    
4. **Alternative Syntax**: It's similar to `import type { SocialLink } from '../ui/SocialIcons.astro'`  but is more concise for single-type imports.
    
In this case, we're using it to ensure the `socialLinks` prop in the `Footer.astro` component matches the expected type from the SocialIcons component, maintaining type safety between components.