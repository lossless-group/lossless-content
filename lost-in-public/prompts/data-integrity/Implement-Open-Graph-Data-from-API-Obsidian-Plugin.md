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
date_modified: 2025-07-15
image_prompt: A developer interacting with an API dashboard to fetch Open Graph data, with code snippets, network request icons, and browser previews of enriched link cards. The scene emphasizes data flow, connectivity, and real-time web enhancement.
site_uuid: 6b35140e-f255-a4e8-a112-6a84a1854f0b
tags: [Open-Graph, API-Integration, Data-Fetching, Data-Integrity]
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/data-integrity/2025-05-04_portrait_image_Fetch-Open-Graph-Data-from-API_1ab9e2fe-bba5-4fd9-82a6-10cd1ca7f476_t1wAc0GSL.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/data-integrity/2025-05-04_banner_image_Fetch-Open-Graph-Data-from-API_fa90bf77-d22e-4442-83db-b335df58b5c0_nnI62qd-t.webp
---

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

### Next Steps

1. Start with OpenGraph Service implementation
2. Add caching layer
3. Implement error handling
4. Create modal interface
5. Add user feedback mechanisms

Would you like to:
1. Start implementing Phase 2 components?
2. Create detailed implementation plan for Phase 2?
3. Review and refine existing Phase 1 implementation?

Please let me know which direction you'd like to proceed with.

## Phase 4: Command Registration

(To be implemented after Phase 3 is complete)

## Phase 5: Error Handling and Logging

(To be implemented after Phase 4 is complete)

## Phase 6: Testing and Validation

(To be implemented after Phase 5 is complete)
