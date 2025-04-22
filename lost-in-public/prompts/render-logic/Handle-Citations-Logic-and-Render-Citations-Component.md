---
title: Handle Citations in Markdown Content
lede: Handle citations in markdown content by extracting them and rendering them in a structured format
date_authored_initial_draft: 2025-04-05
date_authored_current_draft: 2025-04-05
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A developer designing a citations component, with code panels, citation icons, and rendered citation blocks in a web interface. The scene emphasizes clarity, academic rigor, and seamless integration of source references into digital content."
portrait_image: "https://img.recraft.ai/O8q0gogt-TfUdjc34sA3vLlQUAaQ-XTKkzLlX7BMtZc/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/34cb7015-98c1-46c4-9c19-5b165deae461"
site_uuid: d3884182-69d1-40c7-8400-658e354fb85e
tags:
  - Render-Logic
  - Astro
  - Component-Architecture
  - Markdown-Enhancement
  - Custom-Rendering
  - Content-Display
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/pqtDq1REmUWtnTczrA7SxW9ivaB1DOfoO-x_7UsCvtI/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/5dcc5360-940e-454e-bffc-c3469cbbeabb
---

# Handle Citations in Markdown Content

## Executive Summary

This prompt describes how to implement a citation handling system for markdown content in an Astro-based website. The system extracts citation references from anywhere in the document, processes them into a structured format, and renders them in a dedicated section at the end of the content. This approach maintains clean content while providing proper attribution for sources.

## Implementation Flow

The citation handling system follows a specific flow through several components:

1. **Entry Point**: `site/src/pages/more-about/[vocabulary].astro`
   - Dynamic route for vocabulary pages
   - Loads content from the vocabulary collection
   - Passes content to OneArticle layout

2. **Content Processing**: `site/src/layouts/OneArticle.astro`
   - Processes markdown with a pipeline of remark plugins
   - Uses `remarkCitations` plugin to extract and transform citations
   - Passes transformed MDAST to the component for rendering

3. **Rendering**: `site/src/components/articles/OneArticleOnPage.astro`
   - Wraps content in a styled article container
   - Passes MDAST to AstroMarkdown component

4. **Component Rendering**: `site/src/components/markdown/AstroMarkdown.astro`
   - Handles different node types in the MDAST
   - Routes citation nodes to ArticleCitations component
   - Routes blockquote nodes to ArticleCallout component

5. **Citation Rendering**: `site/src/components/markdown/citations/ArticleCitations.astro`
   - Renders the citations container with proper styling
   - Processes each citation with appropriate formatting

6. **Callout Handling**: `site/src/components/markdown/callouts/ArticleCallout.astro`
   - Filters out citation nodes from callout content
   - Prevents duplicate rendering of citations in callouts

## Key Components

### 1. remarkCitations Plugin (`site/src/utils/markdown/remarkCitations.ts`)

This remark plugin is the core of the citation handling system:

```typescript
// Main plugin function
export default function remarkCitations() {
  return (tree: Root) => {
    let allCitations: CitationNode[] = [];
    let nodesToRemove: number[] = [];

    // First pass: find all citations in text content
    visit(tree, 'text', (node, index, parent) => {
      // Extract citations using regex pattern
      // Add to allCitations array
      // Mark nodes for removal
    });

    // Remove nodes marked for deletion
    nodesToRemove.sort((a, b) => b - a).forEach(index => {
      tree.children.splice(index, 1);
    });

    // Create citations section if citations were found
    if (allCitations.length > 0) {
      const citationsNode = createCitationsSectionNode(allCitations);
      tree.children.push(citationsNode as unknown as Paragraph);
    }

    return tree;
  };
}
```

The plugin:
- Searches for citation patterns in text nodes
- Extracts them into a structured format
- Removes them from their original location
- Creates a dedicated citations section at the end of the document

### 2. ArticleCitations Component (`site/src/components/markdown/citations/ArticleCitations.astro`)

Renders the citations in a structured format:

```astro
<div class="citations">
    {citations.map((citation) => (
        <div class={citation.type === 'citation-attribution' ? 'citation-attribution' : 'citation'}>
            {citation.children?.map((child) => {
                if (child.type === 'link') {
                    return (
                        <a href={child.url} target="_blank" rel="noopener noreferrer">
                            {child.children?.[0].value}
                        </a>
                    );
                }
                return child.value;
            })}
        </div>
    ))}
</div>
```

### 3. ArticleCallout Component (`site/src/components/markdown/callouts/ArticleCallout.astro`)

Handles citations within callouts by:
- Processing callout content with remarkCitations
- Filtering out citation nodes and headers from the callout content
- Preventing duplicate rendering of citations

```typescript
// Remove citations nodes from content before converting to HTML
const contentWithoutCitations: Root = {
  type: 'root',
  children: citationsRoot.children.filter((node) => {
    // Filter out citations and citation nodes
    if (node.type === 'citations' || node.type === 'citation') {
      return false;
    }
    
    // Filter out the "Citations:" header node (could be heading or paragraph)
    if (node.type === 'heading' || node.type === 'paragraph') {
      // Check if this node contains "Citations:" text
      const hasOnlyChildWithCitationsText = node.children?.length === 1 && 
        node.children[0].type === 'text' && 
        node.children[0].value === 'Citations:';
      
      if (hasOnlyChildWithCitationsText) {
        return false;
      }
    }
    
    // Keep all other nodes
    return true;
  })
};
```

## Citation Format

Citations should be formatted as follows in markdown content:

```markdown
[1] https://example.com/article1
[2] https://example.com/article2
```

Each citation consists of:
- A number in square brackets: `[1]`
- A space
- A URL starting with http:// or https://

The system will automatically:
1. Extract these citations from anywhere in the document
2. Create a "Citations:" section at the end of the content
3. Render each citation with proper formatting and clickable links

## Example Usage

In a markdown file (e.g., `content/vocabulary/Agile.md`):

```markdown
---
date_created: 2025-03-29
date_modified: 2025-04-07
---

# Agile Methodology

Agile is an iterative approach to software development[1].

It emphasizes flexibility and customer collaboration[2].

[1] https://agilemanifesto.org/
[2] https://www.atlassian.com/agile
```

This will be rendered with the citations extracted and placed at the end of the document in a properly formatted citations section.

## Troubleshooting

If citations are not rendering correctly:

1. **Check Citation Format**: Ensure citations follow the exact pattern `[number] URL`
2. **Inspect AST**: Look at the debug output in the console to see how citations are being processed
3. **Check Filtering Logic**: If citations appear in callouts, ensure the filtering logic is correctly identifying citation nodes

## Conclusion

This citation handling system provides a clean way to include references in markdown content. By automatically extracting and formatting citations, it maintains readability while ensuring proper attribution.