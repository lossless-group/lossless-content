---
date_created: 2025-05-14
date_modified: 2025-05-14
title: Maintain Consistent Debugging Conventions
lede: Debugging is a critical part of our development process. We should maintain consistent debugging conventions across all our code.
date_authored_initial_draft: 2025-05-14
date_authored_current_draft: 2025-05-14
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: Draft
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Reminders
date_created: 2025-05-14
date_modified: 2025-05-14
tags: [Workflow]
authors:
  - Michael Staton
image_prompt: "A human and a robot representing the concept of AI are on a factory floor. They are standing behind a conveyor belt. The conveyor belt is moving and is moving large ladybugs down the line. The human and the robot are in the exact same posture, holding a large hammer and swinging it down to squash the bugs. On the side of the conveyor belt down the line, the bugs are squashed or flattened. On the end of the conveyor belt, the flattened bugs are being collected in a nice box, but you can see the flattened bugs popping out of the top of the box. The mood is industrial and the conveyor belt is moving at a fast pace. The human and the robot are sweating but confident."
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-14_banner_image_Maintain-Consistent-Debugging-Conventions_1d7dfe25-4e01-4326-9375-07f18c5ac872_I_ScwOf-M.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-14_portrait_image_Maintain-Consistent-Debugging-Conventions_1df44251-e46f-46f4-88c2-ad4e2f357f61_nq-qGWnFZ.webp
---

# Markdown and AST Debugging System

## Core Components

1. **MarkdownDebugger** (`site/src/utils/markdown/markdownDebugger.ts`)
   - Central debugging utility for markdown processing
   - Controls debug output based on environment variables and URL parameters
   - Provides methods for logging, transformation tracking, and file output
   - Implemented as a singleton for consistent access across the codebase

2. **AstDebugger** (`site/src/utils/debug/ast-debugger.ts`)
   - Handles file-based debugging output
   - Creates date-based debug directories
   - Writes AST snapshots as JSON files
   - Supports both environment variables and URL parameters for activation

3. **DebugMarkdown Component** (`site/src/components/markdown/DebugMarkdown.astro`)
   - Visual debugging component that shows AST at different pipeline stages
   - Processes content through each remark/rehype plugin separately
   - Writes debug files at each transformation stage
   - Renders visual output when enabled

## Activation Methods

The system can be activated through:

1. **Environment Variables** (in `.env` file):
   ```typescript
   DEBUG_MARKDOWN=true       // Enables basic markdown debugging
   DEBUG_MARKDOWN_VERBOSE=true  // Enables verbose output with full AST dumps
   DEBUG_AST=true           // Enables file-based AST output
   PUBLIC_DEBUG_AST=true    // Client-side debugging flag
   ```

2. **URL Parameters**:
   - `?debug-markdown` - Enables basic markdown debugging
   - `?debug-markdown-verbose` - Enables verbose markdown debugging
   - `?debug-ast` - Enables AST file output

## Key Features

1. **Progressive Debugging Levels**:
   - Basic logging (function entry/exit)
   - Transformation tracking
   - Full AST dumps
   - File-based output

2. **Plugin-Specific Instrumentation**:
   - `startPlugin`/`endPlugin` methods for plugin boundary tracking
   - Transformation logging within plugins

3. **File Output Organization**:
   - Date-based directories (`YYYY-MM-DD_##`)
   - Numbered files showing pipeline progression
   - JSON format for easy inspection

4. **Browser vs. SSG Awareness**:
   - Safely handles both client-side and server-side contexts
   - Prevents errors during static generation

## Integration Pattern

The debuggers are integrated into the markdown processing pipeline through:

1. Direct imports in remark/rehype plugins
2. Method calls at key transformation points
3. Component wrappers for visual debugging

## Code Snippets

### MarkdownDebugger Implementation

```typescript
/**
 * Centralized debugging utility for markdown processing
 * Controls all debug output for the markdown processing pipeline
 */
import { astDebugger } from '../debug/ast-debugger';

/**
 * MarkdownDebugger class
 * 
 * Provides centralized debugging functionality for markdown processing.
 * Supports different levels of verbosity and conditional output based on
 * environment variables and URL parameters.
 */
class MarkdownDebugger {
  private isEnabled: boolean = false;
  private isVerbose: boolean = false;

  constructor() {
    // Check for environment variables
    this.isEnabled = process.env.DEBUG_MARKDOWN === 'true';
    this.isVerbose = process.env.DEBUG_MARKDOWN_VERBOSE === 'true';
    
    // For client-side, also enable if URL has debug-markdown parameter
    // This check only runs in the browser, not during SSG build
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('debug-markdown')) {
          this.isEnabled = true;
        }
        if (url.searchParams.has('debug-markdown-verbose')) {
          this.isEnabled = true;
          this.isVerbose = true;
        }
      } catch (e) {
        // Silently fail if window is not available (SSG build process)
      }
    }
  }

  /**
   * Log a message if debugging is enabled
   */
  log(message: string, ...args: any[]): void {
    if (!this.isEnabled) return;
    console.log(`[Markdown Debug] ${message}`, ...args);
  }

  /**
   * Log the start of a plugin's processing
   */
  startPlugin(pluginName: string): void {
    if (!this.isEnabled) return;
    console.log(`\n=== ${pluginName} Plugin: Starting transformation ===`);
  }

  /**
   * Log the end of a plugin's processing
   */
  endPlugin(pluginName: string): void {
    if (!this.isEnabled) return;
    console.log(`=== ${pluginName} Plugin: Finished transformation ===\n`);
  }

  /**
   * Write a debug file using the AST debugger
   */
  writeDebugFile(name: string, content: any): void {
    if (!this.isEnabled || process.env.DEBUG_AST !== 'true') return;
    astDebugger.writeDebugFile(name, content);
  }
}

// Create a singleton instance
const markdownDebugger = new MarkdownDebugger();

// Export as default (consistent with remark plugins)
export default markdownDebugger;

// Also provide named export for flexibility
export { markdownDebugger };
```

### AstDebugger Implementation

```typescript
import fs from 'fs';
import path from 'path';

class AstDebugger {
  private debugDir: string | undefined;
  private isEnabled: boolean = false; // Default to disabled

  constructor() {
    // Only enable in development environment
    if (process.env.NODE_ENV !== 'development') return;
  
    // Enable if env var or URL param is present
    this.isEnabled =
      process.env.DEBUG_AST === 'true' ||
      (typeof window !== 'undefined' && new URL(window.location.href).searchParams.has('debug-ast'));
  
    // If enabled, initialize (on load if client-side)
    if (this.isEnabled) {
      if (typeof window !== 'undefined') {
        if (document.readyState === 'complete') {
          this.init();
        } else {
          window.addEventListener('load', () => this.init());
        }
      } else {
        this.init();
      }
    }
  }

  private init() {
    if (!this.isEnabled) return;
    this.createDebugDir();
  }

  private createDebugDir() {
    const baseDebugDir = path.join(process.cwd(), 'debug');
    if (!fs.existsSync(baseDebugDir)) {
      fs.mkdirSync(baseDebugDir);
    }
    // Get current date in YYYY-MM-DD format
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    // Find existing directories for today
    const todayDirs = fs.readdirSync(baseDebugDir)
      .filter(name => name.startsWith(dateStr))
      .map(name => {
        const num = parseInt(name.split('_')[1], 10);
        return isNaN(num) ? 0 : num;
      })
      .sort((a, b) => b - a);
    // Get next number (start with 1 if no directories exist)
    const nextNum = todayDirs.length > 0 ? todayDirs[0] + 1 : 1;
    this.debugDir = path.join(baseDebugDir, `${dateStr}_${nextNum.toString().padStart(2, '0')}`);
    fs.mkdirSync(this.debugDir);
    console.log('Debug output directory:', this.debugDir);
  }

  public writeDebugFile(name: string, content: any) {
    if (!this.isEnabled || !this.debugDir) return;
    const filePath = path.join(this.debugDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  }
}

export const astDebugger = new AstDebugger();
```

## Usage Examples

### In a Remark Plugin

```typescript
import { markdownDebugger } from '@utils/markdown/markdownDebugger';

function remarkMyPlugin() {
  return (tree) => {
    markdownDebugger.startPlugin('MyPlugin');
    
    // Process nodes
    visit(tree, 'someNodeType', (node) => {
      markdownDebugger.logTransformation('Transforming node', { before: node });
      // Transform node
      markdownDebugger.logTransformation('Node transformed', { after: node });
    });
    
    markdownDebugger.writeDebugFile('my-plugin-ast', tree);
    markdownDebugger.endPlugin('MyPlugin');
    return tree;
  };
}
```

## Reuse Recommendations

For new features requiring debugging:

1. **Import the existing debuggers directly**:
   ```typescript
   import { markdownDebugger } from '@utils/markdown/markdownDebugger';
   import { astDebugger } from '@utils/debug/ast-debugger';
   ```

2. **Follow the established pattern for new features**:
   ```typescript
   // At the start of processing
   markdownDebugger.startPlugin('CitationProcessor');
   
   // During transformations
   markdownDebugger.logTransformation('Converting citation', { before, after });
   
   // For file output
   markdownDebugger.writeDebugFile('citation-registry', citationData);
   
   // At the end of processing
   markdownDebugger.endPlugin('CitationProcessor');
   ```

3. **Add new environment variables following the pattern**:
   ```typescript
   DEBUG_CITATIONS=false
   DEBUG_CITATIONS_VERBOSE=false
   ```

This approach maintains the DRY principle while extending the existing system to support new functionality.
