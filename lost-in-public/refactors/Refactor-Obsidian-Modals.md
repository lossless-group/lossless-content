---
title: "Refactor a really long Obsidian Modal file."
tags: [Obsidian-Plugin]
slug: refactor-obsidian-modals
site_uuid: 4a35545d-f528-4e86-8f00-dd94d0c18a58
publish: true
lede: "Creating modular maintainable code for Obsidian Plugin Modals"
at_semantic_version: 0.0.0.1
date_created: 2025-07-22
date_modified: 2025-07-23
---

Because the [[Tooling/Productivity/Obsidian|Obsidian]] API and developer docs have their own peculiarity, I thought I would document how to refactor a really long modal into importable sections:


```zsh
src/modals/
├── CurrentFileModal.ts          # Main modal orchestrator
├── sections/                    # Individual section components
│   ├── UuidSection.ts          # UUID operations
│   ├── PublishStateSection.ts  # Publish state toggle
│   ├── HeaderInfoSection.ts    # Header info table
│   ├── FileOperationsSection.ts # File operations
│   ├── TextProcessingSection.ts # Text processing
│   └── SelectionSection.ts     # Selection operations
└── components/                  # Reusable UI components
    ├── ButtonGroup.ts          # Reusable button groups
    └── PropertyTable.ts        # Reusable table components
```


In `CurrentFileModal.ts`
```typescript
    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.createEl('h2', { text: 'Current File Operations' });

        // UUID Operations (at the top)
        await this.createUuidSection(contentEl);

        // Publish State Operations
        this.createPublishStateSection(contentEl);

        // Header Info Operations
        const headerInfoSection = new HeaderInfoSection(this.app, this.editor);
        await headerInfoSection.render(contentEl);

        // Current File Service Operations
        this.createFileOperationsSection(contentEl);
        
        // Text Processing Operations
        this.createTextProcessingSection(contentEl);
        
        // Selection Operations
        this.createSelectionOperationsSection(contentEl);
    }
```