---
title: Rendering Extended Markdown through AST
lede: An alternative approach to rendering callouts and citations by working directly with the AST nodes
date_authored_initial_draft: 2025-04-01
date_authored_current_draft: 2025-04-05
date_authored_final_draft: null
date_first_published: null
date_last_updated: 2025-04-05
at_semantic_version: 0.0.0.2
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A developer visualizing markdown rendering through an abstract syntax tree (AST), with code diagrams, node connections, and rendered content previews. The mood is technical, insightful, and focused on the transformation of structured data."
portrait_image: "https://img.recraft.ai/oTyKwUaHhmy-ZSCVSEtD4u1PJbc5P25SakH8Vr-x4x0/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/0c137222-315f-499b-a9d3-7cda2848db0f"
site_uuid: 6a2855a4-ce1e-45c3-8734-7826c30b6fb1
tags:
  - Render-Logic
  - Remark
  - Astro
  - Build-Scripts
  - Extended-Markdown
  - AST
  - Citations
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/q0HQF-uzFeb0PQ0xmdJ6Cm82Hv3GzWFEEXWQb4rtj_A/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/5915cca2-bb4a-4c7a-b0a6-f0b94066d2d3
---

# Unfinished Work
- [ ] handle citations sections INSIDE callouts, but include callout content that comes AFTER the citations section.  

# Context

## Comparing Approaches to Extended Markdown Rendering

### Previous Approach (Component-Level Transformation)
Initially, we tried handling markdown extensions (callouts, citations) at the component level:

1. Let markdown pass through remark untouched
2. Process nodes in Astro components
3. Transform content during rendering

This approach faced challenges:
- Duplicate processing logic in components
- Inconsistent node structure preservation
- Difficulty maintaining AST hierarchy
- Potential conflicts between transformations

### Current Approach (Unified Remark Pipeline)
We now use a unified remark plugin pipeline:

1. Process markdown extensions during the MDAST phase
2. Use proper node structure with `hName` and `hProperties`
3. Render transformed nodes in components

Benefits:
- Single source of truth for transformations
- Better preservation of AST structure
- Cleaner component logic
- More maintainable codebase

## Constraints
Maintain separation of concerns:
1. Remark plugins handle AST transformations
2. Components handle rendering
3. No duplicate processing logic

## Implementation Examples

### 1. Citation Processing

#### Citation Syntax
Citations are marked in markdown using:
1. A "Citations:" header line
2. Numbered citation entries starting with [n]
3. Citations block continues until a blank line

Example:
```markdown
Citations:
[1] First citation entry
[2] Second citation entry
```

#### Citation Plugin Structure
```typescript
// remarkCitations.ts
type CitationNode = {
  type: 'citation';
  value: string;
  data: {
    hName: string;
    hProperties: {
      className: string;
    };
  };
};

type CitationsContainerNode = {
  type: 'citations';
  children: CitationNode[];
  data: {
    hName: string;
    hProperties: {
      className: string;
    };
  };
};

export default function remarkCitations() {
  return (tree: Root) => {
    let citationsFound: CitationNode[] = [];

    // First pass: find and extract citations
    visit(tree, 'paragraph', (node: Paragraph, index: number, parent: Parent) => {
      const firstChild = node.children[0];
      if (firstChild?.type === 'text' && 
          (firstChild.value.startsWith('Citations:') || firstChild.value.includes('\n[1]'))) {
        
        // Extract and transform citations
        const citations = firstChild.value
          .split('\n')
          .filter(line => line.trim() && !line.startsWith('Citations:'))
          .map(citation => ({
            type: 'citation',
            value: citation.trim(),
            data: {
              hName: 'div',
              hProperties: {
                className: 'citation'
              }
            }
          } as CitationNode));

        citationsFound = citationsFound.concat(citations);

        // Remove original paragraph
        if (typeof index === 'number' && Array.isArray(parent?.children)) {
          parent.children.splice(index, 1);
        }
      }
    });

    // Second pass: add citations container
    if (citationsFound.length > 0) {
      const citationsNode = {
        type: 'citations',
        children: citationsFound,
        data: {
          hName: 'div',
          hProperties: {
            className: 'citations-container'
          }
        }
      } as CitationsContainerNode;

      tree.children.push(citationsNode as unknown as Paragraph);
    }
  };
}
```

#### Component Rendering
```astro
// ArticleCitations.astro
---
interface Props {
  node: {
    type: string;
    children: {
      type: string;
      value: string;
    }[];
  };
}

const { node } = Astro.props;
---

<div class="citations-container">
  {node.children.map((citation) => (
    <div class="citation">{citation.value}</div>
  ))}
</div>
```

### 2. Remark Plugin Pipeline

```typescript
// OneArticle.astro
const processor = unified()
  .use(remarkParse)           // 1. Parse markdown to MDAST
  .use(remarkCitations)       // 2. Process citations
  .use(remarkBacklinks)       // 3. Process inline wiki-style links
  .use(remarkImages)          // 4. Process inline images
  .use(remarkCallouts);       // 5. Process container elements

// First parse to MDAST
const mdast = await processor.parse(content || '');

// Then run transformations
const transformedMdast = await processor.run(mdast);
```

## Key Principles

1. **Single Responsibility**
   - Each plugin handles one type of transformation
   - Clean separation between MDAST and HAST phases
   - Components only handle rendering

2. **Node Structure**
   - Use proper MDAST/HAST node types
   - Set `hName` and `hProperties` for HTML generation
   - Maintain AST hierarchy

3. **Error Handling**
   - Validate input at each phase
   - Preserve original content on error
   - Clear error reporting

4. **Debugging**
   - Output AST state at each phase
   - Track transformations
   - Maintain type safety

5. **Component Integration**
   - Clean component interfaces
   - Type-safe props
   - Minimal processing logic

## Callout Processing Structure (2025-04-03)

### Directory Structure
```
site/src/utils/markdown/callouts/
├── calloutCases.ts     # Known patterns and types
├── calloutTypes.ts     # TypeScript definitions
├── detectMarkdownCallouts.ts    # Phase 1: Pattern detection
├── isolateCalloutContent.ts     # Phase 2: Content isolation
├── transformCalloutStructure.ts  # Phase 3: AST transformation
├── embedCalloutNodes.ts         # Phase 4: Node embedding
└── processCalloutPipeline.ts    # Pipeline orchestration
```

### Pipeline Flow
1. **Detection** (`detectMarkdownCallouts.ts`):
   - Finds blockquotes that match callout patterns
   - Returns array of detected callout nodes
   - No modifications to original nodes

2. **Isolation** (`isolateCalloutContent.ts`):
   - Extracts complete content from detected nodes
   - Preserves context and relationships
   - Returns array of isolated callout content

3. **Transformation** (`transformCalloutStructure.ts`):
   - Creates component structure from isolated content
   - Sets HAST properties for HTML generation
   - Returns array of transformed nodes

4. **Embedding** (`embedCalloutNodes.ts`):
   - Replaces original nodes with transformed versions
   - Preserves tree structure and relationships
   - Returns modified AST

### Pipeline Orchestration
```typescript
// processCalloutPipeline.ts
export async function processCallouts(tree: Node): Promise<Node> {
  try {
    // Phase 1: Detection
    const detected = await detectMarkdownCallouts(tree);
    if (!detected.length) return tree;
    
    // Phase 2: Isolation
    const isolated = await isolateCalloutContent(detected);
    if (!isolated.length) return tree;
    
    // Phase 3: Transformation
    const transformed = await transformCalloutStructure(isolated);
    if (!transformed.length) return tree;
    
    // Phase 4: Embedding
    return await embedCalloutNodes(tree, transformed);
  } catch (error) {
    console.error('Error in callout pipeline:', error);
    return tree;
  }
}
```

### Remark Plugin Integration
```typescript
// remark-callout-handler.ts
const remarkCalloutHandler: Plugin<[], Root> = () => {
  return async (tree: Root) => {
    try {
      astDebugger.writeDebugFile('0-initial-tree', tree);
      const processedTree = await processCallouts(tree);
      astDebugger.writeDebugFile('5-final-tree', processedTree);
      return processedTree;
    } catch (error) {
      console.error('Error in remark-callout:', error);
      return tree;
    }
  };
};
```

### Debug Points
1. `0-initial-tree.json` - Initial MDAST
2. `1-detected-callouts.json` - After detection phase
3. `2-isolated-callouts.json` - After isolation phase
4. `3-transformed-callouts.json` - After transformation phase
5. `4-final-tree.json` - After embedding phase

### Key Principles
1. Each phase is independent and has a single responsibility
2. Clear error handling at each phase
3. Comprehensive debug output
4. Original content preserved on error
5. No assumptions about node structure
6. Explicit type definitions
7. Clear transformation tracking