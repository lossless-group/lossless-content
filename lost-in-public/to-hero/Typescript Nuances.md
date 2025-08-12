---
date_created: 2025-08-10
date_modified: 2025-08-10
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

