---
title: Fetch Open Graph Data from API
lede: Create a Node.js script to process Markdown files and fetch OpenGraph metadata and screenshots from external APIs
date_authored_initial_draft: 2025-02-03
date_authored_current_draft: 2025-03-23
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-07-16
image_prompt: A developer interacting with an API dashboard to fetch Open Graph data, with code snippets, network request icons, and browser previews of enriched link cards. The scene emphasizes data flow, connectivity, and real-time web enhancement.
site_uuid: 6b35140e-f255-a4e8-a112-6a84a1854f0b
tags: [Open-Graph, API-Integration, Data-Fetching, Data-Integrity]
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/data-integrity/2025-05-04_portrait_image_Fetch-Open-Graph-Data-from-API_1ab9e2fe-bba5-4fd9-82a6-10cd1ca7f476_t1wAc0GSL.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/data-integrity/2025-05-04_banner_image_Fetch-Open-Graph-Data-from-API_fa90bf77-d22e-4442-83db-b335df58b5c0_nnI62qd-t.webp
---

![Cite Wide Obsidian Plugin Banner](https://i.imgur.com/CJ18gyp.png)



### Desired Functionality

1. **Settings Management**
   - [ ] Settings Section similar to `content-farm/main.ts` where the user can configure:
     - [ ] OpenGraph API Key (stored securely in Obsidian's vault)
     - [ ] Base URL for OpenGraph.io API (configurable for different environments)
     - [ ] Retry settings (number of attempts, backoff delay)
     - [ ] Rate limiting configuration
     - [ ] Cache duration settings

2. **Modal Interface**
   - [ ] OpenGraph Fetch Modal with:
     - [ ] Checkbox: "Overwrite Existing Open Graph YAML properties?"
     - [ ] Checkbox: "Create new YAML properties if none exists?"
     - [ ] Checkbox: "Write any returned Errors into YAML?"
     - [ ] Checkbox: "Write or Overwrite date for This Fetch?"
     - [ ] Button: "Fetch Open Graph Data"
     - [ ] Button: "Fetch Screenshot"
     - [ ] Progress indicator for fetch operations
     - [ ] Status message area for feedback

3. **Command Implementation**
   - [ ] Register a Command called "Fetch Open Graph Data" that:
     - [ ] Opens the OpenGraph Fetch Modal
     - [ ] Button: "Fetch Open Graph Data"
       - [ ] Fetches Open Graph Data from OpenGraph.io using URL from YAML frontmatter
       - [ ] Reviews modal settings and performs accordingly
       - [ ] Handles errors gracefully and displays feedback
     - [ ] Button: "Fetch Open Graph Screenshot"
       - [ ] Uses OpenGraph.io screenshot API
       - [ ] Handles screenshot errors separately from metadata errors

### Implementation Details

1. **File Structure**
   ```typescript
   src/
     main.ts            // Plugin entry point
     settings.ts        // Settings management
     modal.ts          // OpenGraph Fetch Modal
     services/
       openGraph.ts    // OpenGraph API integration
       screenshot.ts   // Screenshot fetching
     types.ts          // TypeScript interfaces
     utils.ts          // Helper functions
   ```

2. **Key Components**

   a. **Settings Management**
   ```typescript
   class OpenGraphPluginSettings {
     apiKey: string;
     baseUrl: string;
     retries: number;
     backoffDelay: number;
     rateLimit: number;
     cacheDuration: number;
   }
   ```

   b. **OpenGraph Service**
   ```typescript
   class OpenGraphService {
     private readonly apiKey: string;
     private readonly baseUrl: string;
     
     async fetchMetadata(url: string): Promise<OpenGraphData>;
     async fetchScreenshot(url: string): Promise<string | null>;
   }
   ```

   c. **Modal Implementation**
   ```typescript
   class OpenGraphFetchModal extends Modal {
     private settings: OpenGraphPluginSettings;
     private options: {
       overwriteExisting: boolean;
       createNew: boolean;
       writeErrors: boolean;
       updateFetchDate: boolean;
     };
     
     async fetchOpenGraph(): Promise<void>;
     async fetchScreenshot(): Promise<void>;
   }
   ```

3. **Error Handling**
   - Implement proper error boundaries
   - Handle API rate limits
   - Provide user-friendly error messages
   - Log errors without exposing sensitive information

4. **Performance Optimizations**
   - Implement caching for API responses
   - Use debouncing for rapid fetch attempts
   - Handle large files efficiently
   - Implement progress indicators

## The CSS Build Process

1. **Separate CSS Build Step**:
    
    javascript
    
    // First, build the CSS file  
    await esbuild.build({  
      entryPoints: ['src/styles/open-graph-fetcher.css'],  
      bundle: true,  
      minify: isProduction,  
      outfile: 'styles.css',  
      loader: { '.css': 'css' },  
    });
    
    - Takes 
        
        src/styles/open-graph-fetcher.css (your nicely formatted source)
    - Bundles and minifies it into 
        
        styles.css (the minified single line you saw)
    - This happens **before** the main JavaScript bundle
2. **Main Bundle Configuration**:
    
    javascript
    
    external: [...external, './styles.css'],
    
    - Marks 
        
        ./styles.css as external, so it won't be included in 
        
        ```
        main.js
        ```
        
    - Any CSS imports in TypeScript are ignored because of this

## How Obsidian Applies the Styles

Obsidian has a **plugin loading convention**:

1. **Automatic CSS Loading**: When Obsidian loads a plugin, it automatically looks for a 
    
    styles.css file in the plugin's root directory
2. **Style Injection**: If found, Obsidian injects this CSS into the document 
    
    ```
    <head>
    ```
    
3. **Scoping**: The styles become globally available within Obsidian's interface
4. **Cleanup**: When the plugin is disabled/unloaded, Obsidian removes the injected styles

## How CSS Works with Obsidian

- **Performance**: CSS is loaded once when plugin starts, not bundled with every modal instance
- **Obsidian Convention**: Follows the standard plugin structure Obsidian expects
- **Separation of Concerns**: Keeps styling separate from logic
- **Hot Reloading**: In development, CSS changes can be rebuilt independently

So your modal classes like 

```
.opengraph-fetcher-modal
```

 work because:

1. esbuild builds your source CSS → 
    
    styles.css
2. Obsidian loads 
    
    styles.css when plugin starts
3. Your modal adds the CSS classes to DOM elements
4. The pre-loaded styles are applied automatically

This is why removing the CSS import fixed the warning - the styles are handled through Obsidian's plugin system, not through JavaScript imports.
# Step by Step

## Phase 1: Settings Management System

1. **Settings Interface Definition**
   - Create `settings.ts` with the following interface:
     ```typescript
     interface OpenGraphPluginSettings {
       apiKey: string;
       baseUrl: string;
       retries: number;
       backoffDelay: number;
       rateLimit: number;
       cacheDuration: number;
     }
     ```

2. **Settings Management Implementation**
   - Update `main.ts` with the following implementation:
     ```typescript
     export default class OpenGraphPlugin extends Plugin {
       settings: OpenGraphPluginSettings;

       constructor() {
         super();
         this.settings = {
           apiKey: '',
           baseUrl: 'https://api.opengraph.io',
           retries: 3,
           backoffDelay: 1000,
           rateLimit: 60,
           cacheDuration: 86400 // 24 hours
         };
       }

       async loadSettings(): Promise<void> {
         const data = await this.loadData();
         if (data) {
           this.settings = Object.assign({}, this.settings, data);
         }
       }

       async saveSettings(): Promise<void> {
         try {
           await this.saveData(this.settings);
         } catch (error) {
           console.error('Failed to save settings:', error);
           new Notice('Failed to save settings');
         }
       }

       onload() {
         await this.loadSettings();
         
         // This adds a settings tab so the user can configure various aspects of the plugin
         this.addSettingTab(new OpenGraphPluginSettingsTab(this.app, this));

         // Initialize ribbon icon
         const ribbonIconEl = this.addRibbonIcon('link', 'OpenGraph Fetcher', () => {
           new Notice('OpenGraph Fetcher plugin is active');
         });
         ribbonIconEl.addClass('open-graph-fetcher-ribbon-icon');

         // Register commands
         this.registerCommands();
       }
     }
     ```

3. **Settings UI Implementation**
   - Create settings tab in Obsidian's settings interface:
```typescript
     import { PluginSettingTab, Setting, App } from 'obsidian';
     import OpenGraphPlugin from '../../main';

     export class OpenGraphPluginSettingsTab extends PluginSettingTab {
       plugin: OpenGraphPlugin;

       constructor(app: App, plugin: OpenGraphPlugin) {
         super(app, plugin);
         this.plugin = plugin;
       }

       display(): void {
         const { containerEl } = this;
         containerEl.empty();
         containerEl.createEl('h2', { text: 'OpenGraph Fetcher Settings' });

         new Setting(containerEl)
           .setName('OpenGraph API Key')
           .setDesc('Your OpenGraph.io API key')
           .addText((text) => {
             text
               .setPlaceholder('Enter your API key')
               .setValue(this.plugin.settings.apiKey)
               .onChange((value: string) => {
                 this.plugin.settings.apiKey = value;
                 this.plugin.saveSettings();
               });
           });

         new Setting(containerEl)
           .setName('Base URL')
           .setDesc('OpenGraph API base URL')
           .addText((text) => {
             text
               .setPlaceholder('https://api.opengraph.io')
               .setValue(this.plugin.settings.baseUrl)
               .onChange((value: string) => {
                 this.plugin.settings.baseUrl = value;
                 this.plugin.saveSettings();
               });
           });

         new Setting(containerEl)
           .setName('Retries')
           .setDesc('Number of retries for failed requests')
           .addSlider((slider) => {
             slider
               .setLimits(0, 10, 1)
               .setValue(this.plugin.settings.retries)
               .onChange((value: number) => {
                 this.plugin.settings.retries = value;
                 this.plugin.saveSettings();
               });
           });

         new Setting(containerEl)
           .setName('Backoff Delay (ms)')
           .setDesc('Delay between retries in milliseconds')
           .addSlider((slider) => {
             slider
               .setLimits(0, 5000, 100)
               .setValue(this.plugin.settings.backoffDelay)
               .onChange((value: number) => {
                 this.plugin.settings.backoffDelay = value;
                 this.plugin.saveSettings();
               });
           });

         new Setting(containerEl)
           .setName('Rate Limit')
           .setDesc('Maximum requests per minute')
           .addSlider((slider) => {
             slider
               .setLimits(0, 100, 1)
               .setValue(this.plugin.settings.rateLimit)
               .onChange((value: number) => {
                 this.plugin.settings.rateLimit = value;
                 this.plugin.saveSettings();
               });
           });

         new Setting(containerEl)
           .setName('Cache Duration (hours)')
           .setDesc('How long to cache responses')
           .addSlider((slider) => {
             slider
               .setLimits(0, 24 * 7, 1)
               .setValue(this.plugin.settings.cacheDuration / 3600)
               .onChange((value: number) => {
                 this.plugin.settings.cacheDuration = value * 3600;
                 this.plugin.saveSettings();
               });
           });
       }
     }
     ```

## Current Implementation Status Analysis

### Phase 1: Settings Management System
- ✅ Settings Interface Definition
- ✅ Settings Management Implementation
- ✅ Settings UI Implementation
- All core settings functionality is implemented with proper TypeScript types and error handling
- Settings are properly persisted and loaded from Obsidian's vault
- UI follows Obsidian's native patterns with proper slider controls for numeric settings



### Next Phase Planning

#### Phase 2: OpenGraph Service Implementation

1. **Service Layer Implementation**

Create `services/openGraph.ts` 

```typescript
     interface OpenGraphData {
       title: string;
       description: string;
       image: string | null;
       url: string;
       type: string;
       site_name: string;
       error?: string;
     }

     class OpenGraphService {
       private readonly apiKey: string;
       private readonly baseUrl: string;
       private readonly cache: Map<string, OpenGraphData>;

       constructor(apiKey: string, baseUrl: string) {
         this.apiKey = apiKey;
         this.baseUrl = baseUrl;
         this.cache = new Map();
       }

       async fetchMetadata(url: string): Promise<OpenGraphData> {
         // Check cache first
         const cached = this.cache.get(url);
         if (cached) return cached;

         try {
           // Implement API call with retries and backoff
           const response = await fetch(`${this.baseUrl}/v1/parse`, {
             method: 'POST',
             headers: {
               'Authorization': `Bearer ${this.apiKey}`,
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ url }),
           });

           if (!response.ok) {
             throw new Error(`OpenGraph API error: ${response.status}`);
           }

           const data = await response.json();
           this.cache.set(url, data);
           return data;
         } catch (error) {
           console.error('OpenGraph fetch error:', error);
           throw error;
         }
       }

       async fetchScreenshot(url: string): Promise<string> {
         // Similar implementation for screenshot API
       }
     }
```

2. **Caching Strategy**
   - Implement LRU cache with configurable duration
   - Handle cache invalidation based on user settings
   - Add cache size limits to prevent memory issues

3. **Error Handling**
   - Create custom error types for different failure scenarios
   - Implement retry logic with exponential backoff
   - Add proper error logging without exposing sensitive information

4. **Rate Limiting**
   - Implement token bucket algorithm for rate limiting
   - Handle API-specific rate limits
   - Add user feedback for rate limit status

#### Phase 3: Modal Interface Implementation
Looking at the esbuild configuration, here's exactly what happens with the CSS:

1. **Modal Structure**
```typescript
   class OpenGraphFetcherModal extends Modal {
     private settings: PluginSettings;
     private service: OpenGraphService;
     private options: {
       overwriteExisting: boolean;
       createNew: boolean;
       writeErrors: boolean;
       updateFetchDate: boolean;
     };
     private progress: number = 0;
     private totalUrls: number = 0;

     constructor(app: App, plugin: OpenGraphPlugin) {
       super(app);
       this.settings = plugin.settings;
       this.service = new OpenGraphService(this.settings);
       this.options = {
         overwriteExisting: false,
         createNew: false,
         writeErrors: false,
         updateFetchDate: false,
       };
     }

     onOpen(): void {
       const { contentEl } = this;
       contentEl.empty();
       
       // Set modal width
       const modalContainer = contentEl.closest('.modal-container') as HTMLElement;
       const modalContent = contentEl.closest('.modal-content') as HTMLElement;
       
       if (modalContainer && modalContent) {
           modalContainer.style.width = '80vw';
           modalContent.style.maxWidth = 'none';
       }
       
       contentEl.addClass('open-graph-fetcher-modal');

       // Create UI elements
       this.createHeader(contentEl);
       this.createOptions(contentEl);
       this.createProgress(contentEl);
       this.createStatus(contentEl);
       this.createButtons(contentEl);
     }

     onClose(): void {
       this.clearEventListeners();
     }
   }
```

2. **UI Components**
   - Create collapsible sections for URL groups
   - Implement checkbox controls for options
   - Add progress bar with percentage
   - Create status message area with error display
   - Add "Fetch All" and "Cancel" buttons
   - Implement proper event handling

3. **Fetch Operations**
   - Implement batch processing with rate limiting
   - Add proper error boundaries
   - Handle concurrent fetch operations
   - Add progress tracking with UI updates
   - Implement cache validation
   - Add retry logic integration

4. **Implementation Details**
   - Follow Obsidian's UI patterns for modals
   - Use proper TypeScript interfaces
   - Implement proper error handling
   - Add comprehensive logging
   - Handle large file processing
   - Add user feedback mechanisms

5. **Integration Points**
   - Connect with OpenGraphService
   - Handle settings integration
   - Implement proper cleanup
   - Add proper event handling
   - Handle modal state management

### Implementation Considerations

1. **Type Safety**
   - Maintain strict TypeScript types throughout
   - Use proper interfaces for all data structures
   - Implement proper type guards

2. **Error Handling**
   - Follow established project patterns
   - Implement proper error boundaries
   - Add comprehensive logging
   - Handle all edge cases

3. **Performance**
   - Implement proper caching
   - Add rate limiting
   - Handle large files efficiently
   - Add progress indicators

4. **User Experience**
   - Follow Obsidian's UI patterns
   - Add proper feedback mechanisms
   - Handle errors gracefully
   - Provide clear status messages

### Troubleshooting:
1. **Missing 
    
    ```
    DEFAULT_SETTINGS
    ```
    
     export** - The main.ts file references 
    
    ```
    DEFAULT_SETTINGS
    ```
    
     but it's not exported from the settings file
2. **Wrong constructor signature** - The Plugin constructor requires 
    
    ```
    app
    ```
    
     and 
    
    ```
    manifest
    ```
    
     parameters
3. **Wrong settings structure** - The settings are wrapped in a class instead of being a simple interface/object like in cite-wide
4. **Missing proper imports** - The import path 
    
    ```
    './src/settings'
    ```
    
     should point to a file that exports 
    
    ```
    DEFAULT_SETTINGS
    ```


## Phase 4: Command Registration

(To be implemented after Phase 3 is complete)

## Phase 5: Error Handling and Logging

(To be implemented after Phase 4 is complete)

## Phase 6: Testing and Validation

(To be implemented after Phase 5 is complete)

## 3rd Prompt: Batch Fetch for Target Directory

### Overview
Implement a separate command and modal for batch processing OpenGraph data across multiple files in a target directory. This separates the batch functionality from the single-file modal, creating a more focused user experience.

### Command: "Target Folder for Open Graph Fetch"

#### Modal Functionality
1. **Directory Analysis**
   - Display current working directory path
   - Scan directory for markdown files with URLs but missing OpenGraph data
   - Count and list eligible files by filename
   - Show preview of files that will be processed

2. **File Detection Logic**
   - Search for files containing `url:` in frontmatter
   - Check for missing or incomplete OpenGraph fields (based on user's configured field names)
   - Filter files that need processing vs. already processed
   - Handle nested directory structures (optional setting)

3. **Batch Processing Interface**
   - **File List Display**: Show eligible files with checkboxes for selective processing
   - **Batch Options**:
     - Overwrite existing OpenGraph data (checkbox)
     - Create new YAML properties if none exist (checkbox)
     - Write errors to YAML (checkbox)
     - Update fetch date (checkbox)
   - **Rate Limiting**: Batch delay slider (100ms - 5000ms)
   - **Progress Tracking**: Progress bar with current file indicator
   - **Status Display**: Real-time status messages and error reporting

4. **Execution Controls**
   - "Process All Files" button
   - "Process Selected Files" button  
   - "Cancel" button with ability to stop mid-process
   - Pause/Resume functionality for long operations

### Implementation Plan

#### 1. Create New Modal Class
```typescript
// src/modals/BatchOpenGraphFetcherModal.ts
class BatchOpenGraphFetcherModal extends Modal {
  private settings: PluginSettings;
  private service: OpenGraphService;
  private targetDirectory: string;
  private eligibleFiles: FileInfo[];
  private selectedFiles: Set<string>;
  private processing: boolean;
  private currentFileIndex: number;
  
  interface FileInfo {
    path: string;
    name: string;
    url: string;
    hasOpenGraphData: boolean;
    missingFields: string[];
  }
}
```

#### 2. Directory Scanning Service
```typescript
// src/services/directoryScanner.ts
class DirectoryScanner {
  async scanForEligibleFiles(directory: string, settings: PluginSettings): Promise<FileInfo[]>;
  private async analyzeFile(file: TFile): Promise<FileInfo | null>;
  private checkMissingOpenGraphFields(frontmatter: any, settings: PluginSettings): string[];
}
```

#### 3. Batch Processing Logic
- **Queue Management**: Process files sequentially with configurable delays
- **Error Handling**: Continue processing on individual file failures
- **Progress Tracking**: Update UI with current file and overall progress
- **Cancellation**: Allow users to stop processing gracefully
- **Resume Capability**: Option to resume interrupted batch operations

#### 4. UI Components

**File List Section**:
- Scrollable list of eligible files
- Checkbox for each file (select/deselect)
- "Select All" / "Deselect All" buttons
- File status indicators (✓ processed, ⚠ error, ⏳ pending)

**Options Section**:
- Same options as single-file modal but applied to batch
- Additional option: "Skip files with existing data"
- Directory depth setting (current only vs. recursive)

**Progress Section**:
- Overall progress bar (files processed / total files)
- Current file indicator with filename
- Processing statistics (success/error counts)
- Estimated time remaining

#### 5. Command Registration
```typescript
// In main.ts
this.addCommand({
  id: 'batch-fetch-opengraph',
  name: 'Target Folder for Open Graph Fetch',
  callback: () => {
    new BatchOpenGraphFetcherModal(this.app, this).open();
  }
});
```

#### 6. Integration with Existing Code
- **Reuse OpenGraphService**: Same API service for individual fetches
- **Share Settings**: Use same configurable field names and API settings
- **Consistent Error Handling**: Apply same error patterns across both modals
- **Unified Styling**: Extend existing CSS for batch modal components

### Refactoring Current Modal

#### Remove Batch Elements from Single-File Modal
1. **Remove batch delay slider** from `OpenGraphFetcherModal`
2. **Simplify progress tracking** to single-file operations only
3. **Update button text** from "Fetch for this File" to "Fetch OpenGraph Data"
4. **Remove batch-related properties** and methods
5. **Streamline UI** for single-file focus

#### Updated Single-File Modal Structure
```typescript
class OpenGraphFetcherModal extends Modal {
  // Remove: batchDelay, batch processing logic
  // Keep: single file processing, options, progress for single operation
  // Simplify: UI elements, remove batch-specific controls
}
```

### File Structure Updates
```
src/
  modals/
    OpenGraphFetcherModal.ts          // Single-file processing
    BatchOpenGraphFetcherModal.ts     // Batch processing (NEW)
  services/
    openGraphService.ts               // Shared API service
    directoryScanner.ts               // Directory analysis (NEW)
  types/
    open-graph-service.d.ts          // Shared interfaces
    batch-processing.d.ts            // Batch-specific types (NEW)
```

### User Experience Flow

1. **Single File**: User runs "Fetch Open Graph Data" command on current file
   - Opens simplified modal focused on current file only
   - Quick options and immediate processing
   - Streamlined for single-file workflows

2. **Batch Processing**: User runs "Target Folder for Open Graph Fetch" command
   - Opens comprehensive modal for directory analysis
   - Shows file discovery and selection interface
   - Provides batch processing controls and monitoring
   - Handles bulk operations with proper progress tracking

### Implementation Priority

1. **Phase 1**: Refactor existing modal to remove batch elements
2. **Phase 2**: Create directory scanner service
3. **Phase 3**: Implement batch modal UI and file selection
4. **Phase 4**: Add batch processing logic with progress tracking
5. **Phase 5**: Integrate command registration and testing
6. **Phase 6**: Polish UI/UX and error handling

This separation creates two focused tools: a quick single-file fetcher and a comprehensive batch processor, each optimized for their specific use cases.
