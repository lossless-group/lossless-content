---
title: Comprehensive AST Transformation Pipeline
lede: A robust approach to AST transformations inspired by astro-big-doc and content-structure patterns
date_authored_initial_draft: 2025-04-02
date_authored_current_draft: 2025-04-02
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
status: Implementation
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-25
image_prompt: "A creative workspace where markdown is rendered with intention, featuring a code editor, inspirational notes, and a preview pane showing beautifully formatted content. The mood is thoughtful, artistic, and focused on purposeful design."
site_uuid: bc63aecf-84da-4183-81cc-f69176cf0602
tags: Render-Logic,Remark,Astro,Build-Scripts,Extended-Markdown,AST
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/render-logic/2025-05-04_portrait_image_Render-Markdown-Deliberately-from-Inspiration_271dd1a4-e994-4937-9ccb-bdbe74bd2788_8ladWix57.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/render-logic/2025-05-04_banner_image_Render-Markdown-Deliberately-from-Inspiration_e5ac5c4c-3a90-4b16-bc09-1649e3f817cc_DtPo2dVQ3.webp
---
# Comprehensive AST Transformation Pipeline

## Core Principles

1. **Four-Phase Pipeline**
   ```
   Detect → Isolate → Transform → Embed
   ```
   - **Detect**: Look for patterns without modifying
   - **Isolate**: Extract content while preserving context
   - **Transform**: Apply changes with clear record-keeping
   - **Embed**: Apply back to AST safely

2. **Error Handling First**
   ```typescript
   async function transformCallout(node: Node) {
     try {
       // 1. Validate prerequisites
       if (!node?.children?.length) {
         throw new Error('Invalid node structure');
       }
       
       // 2. Ensure atomic operations
       if (!node.data) node.data = {};
       if (!node.data.hProperties) node.data.hProperties = {};
       
       // 3. Transform with tracking
       trackTransformation(node, 'begin_transform');
       // ... transformation logic
       trackTransformation(node, 'end_transform');
       
     } catch (error) {
       console.error('Transformation failed:', error);
       // Always preserve original content on error
       return node;
     }
   }
   ```

3. **Debug-Driven Development**
   ```typescript
   interface CalloutDebug {
     id: string;
     type: string;
     sourceLocation: {
       file: string;
       line: number;
     };
     transformations: string[];
   }
   
   const debugLog: CalloutDebug[] = [];
   ```

## Implementation Requirements

1. **Configuration Management**
   ```typescript
   // config/callouts.ts
   export const calloutConfig = {
     rootdir: process.cwd(),
     debugOutput: process.env.NODE_ENV === 'development',
     patterns: {
       note: /^\[!NOTE\]/i,
       warning: /^\[!WARNING\]/i
     }
   }
   ```

2. **Atomic Operations**
   - Never modify a node without first validating its structure
   - Always create new properties before modifying them
   - Keep transformations self-contained and reversible

3. **Clear Record-Keeping**
   ```typescript
   type TransformationRecord = {
     wasTransformed: boolean;
     modifications?: {
       type: string;
       from: string;
       to: string;
     }[];
     alreadyCorrect?: string[];
   }
   ```

## Directory Structure

```
site/src/utils/markdown/
├── callouts/                # Callout-specific implementation
│   ├── detect.ts           # Detect [!NOTE] syntax
│   ├── isolate.ts          # Extract callout content
│   ├── transform.ts        # Convert to component
│   └── embed.ts            # Embed back in AST
├── wiki-links/             # Wiki-style links implementation
│   ├── detect.ts           # Detect [[Page]] syntax
│   ├── isolate.ts          # Extract link parts
│   ├── transform.ts        # Convert to component
│   └── embed.ts            # Embed back in AST
├── tables/                 # Table-specific implementation
│   ├── detect.ts           # Detect table syntax
│   ├── isolate.ts          # Extract table structure
│   ├── transform.ts        # Convert to component
│   └── embed.ts           # Embed back in AST
├── config/                # Shared configuration
│   └── debug.ts          # Debug settings
├── types/                # Shared type definitions
│   └── ast.d.ts         # AST type interfaces
└── utils/               # Shared utilities
    └── debug.ts        # Debug helpers
```

This structure:
1. Organizes by markdown feature type
2. Each type has its own pipeline implementation
3. Shared code (config, types, utils) stays at root
4. Makes it easy to add new markdown features
5. Keeps related code together
6. Can be merged into single files later if needed

## Phase Implementation Guidelines

### 1. Detection Phase
```typescript
// callouts/detect.ts
export async function detectCallouts(tree: Node) {
  const callouts: CalloutNode[] = [];
  
  try {
    visit(tree, 'blockquote', (node: BlockquoteNode) => {
      const info = extractCalloutInfo(node);
      if (info) callouts.push({ node, info });
    });
    
    return callouts;
  } catch (error) {
    console.error('Error in detection phase:', error);
    return [];
  }
}
```

### 2. Isolation Phase
```typescript
// callouts/isolate.ts
export async function isolateCallouts(callouts: CalloutNode[]) {
  return callouts.map(({ node, info }) => {
    try {
      return {
        node,
        info,
        content: extractContent(node),
        metadata: extractMetadata(info)
      };
    } catch (error) {
      console.error('Error isolating callout:', error);
      return null;
    }
  }).filter(Boolean);
}
```

### 3. Transform Phase
```typescript
// callouts/transform.ts
export async function transformCallouts(isolated: IsolatedCallout[]) {
  return isolated.map(item => {
    try {
      return {
        ...item,
        node: transformToComponent(item)
      };
    } catch (error) {
      console.error('Error transforming callout:', error);
      return item; // Preserve original on error
    }
  });
}
```

### 4. Embed Phase
```typescript
// callouts/embed.ts
export async function embedCallouts(transformed: TransformedCallout[]) {
  return transformed.map(item => {
    try {
      return embedInAST(item);
    } catch (error) {
      console.error('Error embedding callout:', error);
      return item.originalNode; // Revert to original on error
    }
  });
}
```

## Common Pitfalls and Debugging

### AST Transformation Pitfalls

1. **Node Placement Issues**
   ```typescript
   // ❌ WRONG: Only transforming string value
   function transformCallout(node) {
     const newValue = node.value.replace(/^\[!NOTE\]/, '');
     return { ...node, value: newValue };
   }
   
   // ✅ CORRECT: Properly updating AST structure
   function transformCallout(node) {
     if (!node.data) node.data = {};
     node.data.hName = 'article';
     node.data.hProperties = { className: ['callout'] };
     // Original content becomes children
     node.children = [
       {
         type: 'element',
         tagName: 'div',
         properties: { className: ['callout-content'] },
         children: node.children
       }
     ];
     return node;
   }
   ```

2. **Sequencing Problems**
   ```typescript
   // ❌ WRONG: Getting overridden by later process
   unified()
     .use(remarkParse)
     .use(ourCalloutPlugin)    // Our changes
     .use(remarkRehype)        // Converts to HTML, losing our changes
     .use(rehypeStringify);
   
   // ✅ CORRECT: Proper sequencing
   unified()
     .use(remarkParse)
     .use(remarkRehype)        // First convert to HTML
     .use(ourCalloutPlugin)    // Then make our changes
     .use(rehypeStringify);
   ```

3. **Early Cleanup**
   ```typescript
   // ❌ WRONG: Generic cleanup removing our syntax
   unified()
     .use(remarkClean)         // Removes "non-standard" syntax
     .use(remarkParse)
     .use(ourCalloutPlugin);   // Our syntax is already gone
   
   // ✅ CORRECT: Preserve special syntax
   unified()
     .use(remarkParse)
     .use(ourCalloutPlugin)    // Process our syntax first
     .use(remarkClean);        // Then clean up remaining
   ```

### Debug-Driven Development

1. **AST Debug Output**
   ```typescript
   // debug/ast-debugger.ts
   class AstDebugger {
     writeDebugFile(name: string, content: any) {
       if (!this.isEnabled) return;
       const filePath = path.join(
         this.debugDir,
         `${name}.json`
       );
       fs.writeFileSync(filePath, 
         JSON.stringify(content, null, 2)
       );
     }
   }
   ```

2. **Debug Directory Structure**
   ```
   site/debug/
   ├── 2025-04-03_01/           # Debug session
   │   ├── 1-parsed-ast.json    # After remarkParse
   │   ├── 2-detect.json        # After detection
   │   ├── 3-isolate.json       # After isolation
   │   ├── 4-transform.json     # After transform
   │   └── 5-embed.json         # After embedding
   └── 2025-04-03_02/          # Next debug session
       └── ...
   ```

3. **Enabling Debug Output**
   ```typescript
   // Enable via URL parameter
   const debugEnabled = new URLSearchParams(window.location.search)
     .has('debug-ast');
   
   // In your plugin
   export function calloutPlugin(options = {}) {
     return (tree) => {
       if (options.debug) {
         astDebugger.writeDebugFile('pre-callout', tree);
       }
       // ... transformation logic
       if (options.debug) {
         astDebugger.writeDebugFile('post-callout', tree);
       }
     };
   }
   ```

4. **Debug Points to Check**
   - After initial parsing (is our syntax preserved?)
   - After each transformation phase
   - Before and after rehype conversion
   - Final HTML output

### Prevention Checklist

1. **Before Implementation**
   - [ ] Map out the complete plugin sequence
   - [ ] Identify potential syntax conflicts
   - [ ] Plan debug output points

2. **During Development**
   - [ ] Check AST structure after each phase
   - [ ] Verify node properties are preserved
   - [ ] Test with nested content
   - [ ] Validate HTML output

3. **After Changes**
   - [ ] Compare debug outputs before/after
   - [ ] Verify no regressions in other features
   - [ ] Check performance impact
   - [ ] Document any sequencing requirements

## Testing Strategy

1. **Phase-Level Tests**
   ```typescript
   describe('Detection Phase', () => {
     test('should detect valid callout syntax', () => {
       const ast = parseMarkdown('>[!NOTE] Title\n> Content');
       const detected = detectCallouts(ast);
       expect(detected).toHaveLength(1);
     });
   });
   ```

2. **Integration Tests**
   ```typescript
   describe('Full Pipeline', () => {
     test('should preserve content on error', async () => {
       const original = parseMarkdown('>[!NOTE] Title\n> Content');
       const result = await processPipeline(original);
       expect(result).toBeDefined();
     });
   });
   ```

3. **Debug Output**
   ```typescript
   test('should log transformations', () => {
     const debugLog = processWithDebug(ast);
     expect(debugLog).toContainTransformation({
       type: 'callout',
       action: 'transform'
     });
   });
   ```

## Usage Example

```typescript
import { unified } from 'unified';
import { remarkParse } from 'remark-parse';
import { calloutPipeline } from './utils/markdown/pipeline';

const processor = unified()
  .use(remarkParse)
  .use(calloutPipeline, {
    debug: process.env.NODE_ENV === 'development',
    configPath: './config/callouts.ts'
  });

const result = await processor.process(markdown);
```

## Next Steps

1. Implement each phase in isolation
2. Add comprehensive debug output
3. Create test cases for each phase
4. Document error patterns and recovery strategies
5. Add performance monitoring