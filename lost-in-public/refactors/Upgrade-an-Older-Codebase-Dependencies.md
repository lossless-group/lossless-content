---
title: 'Update an Older Codebase one Dependency at a time.'
date_created: '2025-06-07'
date_modified: '2025-06-07'
type: refactor-plan
status: Refactored
---

# Incremental Refactor Plan: 
We are working with a starter codebase for an Obsidian plugin.  It is on older version of everything. 
```bash
devDependencies:
+ @types/node 16.18.126 (22.15.30 is available)
+ @typescript-eslint/eslint-plugin 5.29.0 (8.33.1 is available)
+ @typescript-eslint/parser 5.29.0 (8.33.1 is available)
+ builtin-modules 3.3.0 (5.0.0 is available)
+ esbuild 0.17.3 (0.25.5 is available)
+ obsidian 1.8.7
+ tslib 2.4.0 (2.8.1 is available)
+ typescript 4.7.4 (5.8.3 is available)
```

## Goal
Update dependencies one at a time in a way where nothing breaks, or if we do we catch it immediately. 

## Current State
We have a submodule called "content-farm" that is an Obsidian plugin.  
The functional code is in `content-farm/main.ts`.

There is a more up to date plugin that has a lot of the functionality I want, for reference: 
`/Users/mpstaton/code/obsidian-plugin-study/obsidian-textgenerator-plugin`  
It is in a different directory because I wanted us to build our own plugin instead of steal too much from it and not know how it works.

## Refactor Steps

### 1. Pick which sequence we should upgrade dependencies in.  

2. Update Order
We'll update dependencies in this order to minimize breaking changes:

### 2. Update Order
We'll update dependencies in this order to minimize breaking changes:

1. **tslib** (2.4.0 → 2.8.1)  
   - Low risk, backward compatible  
   - Run: `pnpm add -D tslib@latest`

2. **builtin-modules** (3.3.0 → 5.0.0)  
   - Simple dependency, mostly type definitions  
   - Run: `pnpm add -D builtin-modules@latest`

3. **@types/node** (16.18.126 → 22.15.30)  
   - Update Node.js type definitions  
   - Run: `pnpm add -D @types/node@latest`

4. **TypeScript** (4.7.4 → 5.8.3)  
   - Major version update, potential breaking changes  
   - Update config: `tsconfig.json`  
   - Run: `pnpm add -D typescript@latest`

5. **ESLint Dependencies**  
   - Update both packages together:  
   ```bash
   pnpm add -D @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
   ```

6. **esbuild** (0.17.3 → 0.25.5)  
   - Check for breaking changes in config  
   - Run: `pnpm add -D esbuild@latest`

7. **obsidian** (1.8.7 → latest)  
   - Check for breaking changes in Obsidian API  
   - Run: `pnpm add -D obsidian@latest`

### 2. Update dependencies one at a time.  

#### TSLib


### 2.1 Create a plan here for each dependency update below.  

### 3. User check each dependency update.  

# Implementation Plans

## Updating to latest TypeScript
```typescript
import { 
    App, 
    Editor, 
    MarkdownView, 
    Modal, 
    Notice, 
    Plugin, 
    PluginSettingTab, 
    Setting,
    TFile,
    WorkspaceLeaf
} from 'obsidian';

interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default'
};

export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;
    private statusBarItemEl: HTMLElement;

    async onload(): Promise<void> {
        await this.loadSettings();

        // Ribbon icon with proper type
        const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
            new Notice('This is a notice!');
        });
        ribbonIconEl.addClass('my-plugin-ribbon-class');

        // Status bar with proper type
        this.statusBarItemEl = this.addStatusBarItem();
        this.statusBarItemEl.setText('Status Bar Text');

        // Commands with proper types
        this.addCommand({
            id: 'open-sample-modal-simple',
            name: 'Open sample modal (simple)',
            callback: (): void => {
                new SampleModal(this.app).open();
            }
        });

        this.addCommand({
            id: 'sample-editor-command',
            name: 'Sample editor command',
            editorCallback: (editor: Editor, view: MarkdownView): void => {
                console.log(editor.getSelection());
                editor.replaceSelection('Sample Editor Command');
            }
        });

        this.addCommand({
            id: 'open-sample-modal-complex',
            name: 'Open sample modal (complex)',
            checkCallback: (checking: boolean): boolean => {
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
                    if (!checking) {
                        new SampleModal(this.app).open();
                    }
                    return true;
                }
                return false;
            }
        });

        this.addSettingTab(new SampleSettingTab(this.app, this));

        // DOM event with proper type
        this.registerDomEvent(document, 'click', (evt: MouseEvent): void => {
            console.log('click', evt);
        });

        // Interval with proper type
        this.registerInterval(
            window.setInterval((): void => {
                console.log('setInterval');
            }, 5 * 60 * 1000)
        );
    }

    onunload(): void {
        // Clean up resources here
        this.statusBarItemEl?.remove();
    }

    private async loadSettings(): Promise<void> {
        this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
    }

    private async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}

class SampleModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    onOpen(): void {
        const { contentEl } = this;
        contentEl.setText('Woah!');
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

class SampleSettingTab extends PluginSettingTab {
    private plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    public display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName('Setting #1')
            .setDesc('It\'s a secret')
            .addText(text => text
                .setPlaceholder('Enter your secret')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value: string): Promise<void> => {
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                })
            );
    }
}
```

Update the tsconfig:
```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "es2022",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```