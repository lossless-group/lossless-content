---
date_created: 2025-08-10
date_modified: 2025-08-11
title: Text Components
lede: The text components that are used to display different styles of text in paired fashion.
date_authored_initial_draft: 2025-08-10
date_authored_current_draft: 2025-08-10
date_authored_final_draft: "[]"
date_first_published: "[]"
date_last_updated: "[]"
at_semantic_version: 0.0.0.6
publish: true
status: Draft
augmented_with: Windsurf Cascade on SWE-1
category: Atomic-Design
tags: [Text-Components, Atomic-Design]
authors:
  - Michael Staton
site_uuid: 3e3f85a1-8fb7-4a7f-a9c0-7b2d7b3e7dbc
slug: text-component-factory
---
Text Components would be best if the text itself used clamp values and calc values proportional to the styles for the headerTxt.

```json
contextSetterTxt: "String value"
headerTxt: "String value"
subHeaderTxt: "String value"
copyTxt: "String value"
excerptTxt: "String value"
fullContent: {
   fullMarkdownTxt: "String value",
   fullHtmlTxt: "String value",
   fullPlainText: "String value",
   fullRichText: "String value",
   pathToFullContent: "String value",
   urlToRemoteFullContent: "String value"
} || "String value" || null || undefined || 
```

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

subHeaderTxt: "String value" || null || undefined || 

copyTxt: "String value" || null || undefined || 

excerptTxt: "String value" || null || undefined || 

fullContent: {
   fullMarkdownTxt: "String value",
   fullHtmlTxt: "String value",
   fullPlainText: "String value",
   fullRichText: "String value",
   pathToFullContent: "String value",
   urlToRemoteFullContent: "String value"
} || "String value" || null || undefined || 

pairedImageUrl: "String value" || null || undefined || 

captionTxt: "String value" || null || undefined || 

imgAltTxt: "String value" || null || undefined || 

imgAltTxt

style properties:
align
imageOn (left, center, right, top, middle, bottom. )

```typescript
interface TextComponentProps {
  // Content
  content?: string | ReactNode;
  
  // Text role (determines size/weight relative to header)
  role?: 'context' | 'header' | 'subheader' | 'body' | 'caption' | 'prose' | 'zinger';
  
  // Size scale (maps to your 7-size system)
  size?: 'xxs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  
  // Color role (maps to your theme)
  color?: keyof ThemeColors;
  
  // Layout
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  lineHeight?: 'none' | 'snuggiest' | 'snuggier' | 'snug' | 'normal' | 'relaxed' | 'loose' | 'looser' | 'loosest';
  kerning?: 'none' | 'tightest' | 'tighter' | 'tight' | 'normal' | 'loose' | 'wider' | 'widest';
  
  // Spacing
  margin?: string;
  padding?: string;
  
  // Other
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
```

```css
:root {
  /* Base size that everything scales from */
  --text-base-size: 1rem; /* 16px */
  
  /* Type scale ratios */
  --type-scale-ratio: 1.2;
  --golden-ratio: 1.618;
  
  /* Size calculations */
  --text-xxs: calc(var(--text-base-size) / (var(--type-scale-ratio) * 1.5));
  --text-xs:  calc(var(--text-base-size) / var(--type-scale-ratio));
  --text-sm:  calc(var(--text-base-size));
  --text-base: calc(var(--text-base-size) * var(--type-scale-ratio));
  --text-lg:  calc(var(--text-base-size) * var(--type-scale-ratio) * 1.5);
  --text-xl:  calc(var(--text-base-size) * var(--type-scale-ratio) * 2);
  --text-2xl: calc(var(--text-base-size) * var(--type-scale-ratio) * 2.5);
  
  /* Role-based sizes (relative to header) */
  --text-header: var(--text-xl);
  --text-context: calc(var(--text-header) * 0.4);    /* 40% of header */
  --text-subheader: calc(var(--text-header) * 0.6);  /* 60% of header */
  --text-body: calc(var(--text-header) * 0.16);      /* 16% of header */
  --text-caption: calc(var(--text-header) * 0.12);   /* 12% of header */
}

/* Alignment classes */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

/* Font weights */
.text-light { font-weight: 300; }
.text-normal { font-weight: 400; }
.text-medium { font-weight: 500; }
.text-semibold { font-weight: 600; }
.text-bold { font-weight: 700; }

/* Line heights */
.leading-none { line-height: 1; }
.leading-tight { line-height: 1.25; }
.leading-snug { line-height: 1.375; }
.leading-normal { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose { line-height: 2; }
```

```typescript
const Text: React.FC<TextComponentProps> = ({
  role = 'body',
  size,
  color = 'text.primary',
  align = 'left',
  weight = 'normal',
  lineHeight = 'normal',
  className = '',
  style = {},
  children,
  ...props
}) => {
  // Determine size class based on role if size not explicitly set
  const sizeClass = size || {
    context: 'text-context',
    header: 'text-header',
    subheader: 'text-subheader',
    body: 'text-body',
    caption: 'text-caption',
  }[role];

  const classes = `
    ${sizeClass}
    text-${align}
    font-${weight}
    leading-${lineHeight}
    text-${color}
    ${className}
  `;

  return (
    <span className={classes} style={style} {...props}>
      {children}
    </span>
  );
};
```

# Example Usage

---
import Text from '../components/Text.astro';
---

<!-- Basic usage -->
<CompositeText>
   <DisplayText role="header">Page Title</DisplayText>
   <DisplayText role="subheader">Section Title</DisplayText>
   <DisplayText>Default body text</DisplayText>
</CompositeText>

<!-- With content prop -->
<DisplayText content="This is some text" role="body" />

<!-- With default slot -->
<DisplayText role="body">
  This is some text with <strong>HTML</strong> inside
</DisplayText>

<!-- With custom size and color -->
<DisplayText role="header" size="2xl" color="text-primary">Large Header</DisplayText>

<!-- With custom alignment and weight -->
<DisplayText align="center" weight="bold">Centered bold text</DisplayText>
```