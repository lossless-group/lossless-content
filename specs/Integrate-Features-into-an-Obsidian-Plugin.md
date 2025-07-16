---
title: Integrate Features into an Obsidian Plugin
lede: Give content teams a custom Obsidian plugin to rapidly develop content with AI and API Services
date_authored_initial_draft: 2025-06-07
date_authored_current_draft: 2025-06-07
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
generated_with: Windsurf Cascade on SWE-1
category: Technical-Specification
date_created: 2025-06-07
date_modified: 2025-07-16
status: In-Progress
tags: [Frontmatter-Consistency, Data-Integrity, Metadata-Consistency, Content-Integrity, Content-Automation, Filesystem-Observers]
authors:
  - Michael Staton
image_prompt: "Lots of websites and mobile apps are falling from the sky into a funnel. The funnel is leading down to a single laptop, which has Obsidian open (which is a Markdown notebook editor in dark theme). The laptop is in a room with a desk and a chair."
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-06-08_banner_image_Integrate-Features-into-an-Obsidian-Plugin_5854a42f-5d3e-4bf0-a187-7335cc35cb17_K5Mg9eNha.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-06-08_portrait_image_Integrate-Features-into-an-Obsidian-Plugin_29e2f5da-f875-4f4b-8052-86d24d463b22_EL69qO1G5.webp
---
![Cite Wide Obsidian Plugin Banner](https://i.imgur.com/CJ18gyp.png)

# Context

## Objective:

The primary objective is to integrate important functionality for automating content management currently kept in scripts. 


# Citation Conversion System

## Overview

The citation conversion system standardizes citation formats across documents by converting numeric citations to a consistent hexadecimal format and ensuring proper footnote definitions. This system is integrated into the Obsidian plugin to provide real-time citation management.

## Goal:

The goal is to have a command that will convert all citations on a particular page (Markdown file) to our desired format.

### Considerations:
We will reuse code and patterns that work from the "tidyverse" submodule, and the "observer" system. However, we do not need to use the observer and watcher functionality as this is a simple command that will run on a single file.

We will also not implement the "citations registry" functionality as it is not necessary for this simple command at this time.  Step by step. 

## Implementation Details

## Important Considerations

### "Pairing" the citation inline and in the footnote
Because the citation hexcode needs to "pair" with the footnote definition, the code needs to alter the same "numeric" or undesired citation inline and in the footnote at the same time. It should not iterate to the next citation without altering the footnote definition.  Otherwise, the program will lose track and not know which footnote definition goes with which citation inline. 

### Citation Formats

#### **Our Desired, Standard Format**:
 - When cited inline: ` [^hexcode]` where hexcode is a 6-character hexadecimal (e.g., ` [^1a2b3c]`). Notice the space before the bracket. 
 - When added to Footnotes: `[^hexcode]: ${Citation details}` where hexcode is a 6-character hexadecimal (e.g., `[^1a2b3c]: Citation details`). Notice the colon and then a space after the bracket.

#### **Undesired Formats**:
1. **Numeric Format**: `[^123]` (automatically convert to hex with assuring a space beforehand.)
2. **LLM Generated Format**: `[1]` (automatically converted to hex with caret)
3. **Footnote Definitions**: `[^hexcode]: Citation details` (automatically converted to its "hex pair" with caret and colon and space)

### Core Components

1. **Processing Pipeline**
   - Extracts and preserves code blocks
   - Converts numeric citations to hex format
   - Ensures proper spacing around citations
   - Validates and creates missing footnote definitions
   - Updates the citation registry

2. **Citation Registry** -- IMPORTANT: DO NOT IMPLEMENT NOW.
- Manages all citations across files
- Tracks citation usage and metadata
- Persists to `citation-registry.json`

### Command Implementation

```typescript
// In main.ts
this.addCommand({
    id: 'convert-all-citations',
    name: 'Convert All Citations to Hex Format',
    editorCallback: async (editor: Editor) => {
        try {
            const content = editor.getValue();
            const result = await processCitations(content, this.app.workspace.getActiveFile()?.path || '');
            
            if (result.changed) {
                editor.setValue(result.updatedContent);
                new Notice(`Updated ${result.stats.citationsConverted} citations`);
            } else {
                new Notice('No citations needed conversion');
            }
        } catch (error) {
            new Notice('Error processing citations: ' + (error instanceof Error ? error.message : String(error)));
            console.error('Error in convert-all-citations:', error);
        }
    }
});
```

### Error Handling

- Preserves original content on error
- Does not "stop" on a single error, instead continues to the next citation.
- Provides user feedback via Obsidian notices
- Logs detailed errors to console

## Usage

1. Place cursor in the target document
2. Open command palette (Ctrl/Cmd + P)
3. Search for "Convert All Citations to Hex Format"
4. Command will process the document and show a summary of changes

## Future Enhancements

1. **Batch Processing**: Process multiple files at once
2. **Reformat Footnotes**: Parses the LLM generated footnote and rewrites it in our desired format.
3. **Citation Manager UI**: Visual interface for managing citations
4. **Citation Registry**: The Plugin is aware, in realtime, of all citations and can reuse the same unique hex code for the same citation across files and content collections. 
5. **Citation Registry Audience Value**: A "site" UI in the site submodule that is our content site can display "articles that use this citation" and have a "citations" page that lists all the articles that use a citation.

## Source of Inspiration:
Because we have a loosely coupled monorepo, we should not use modules from one submodule in another.  Therefore, we just need to recreate the functionality of the citation alterations in this plugin.

For reference: 
- `citationService.ts`: Core citation processing logic
- `citation-registry.json`: Central citation database
- Obsidian API: For editor integration


# Image Uploads to and Image Service

## Implementation Details

**Not Working Yet** so I'm removing the  code to get back to work.

### File Drop and Paste Handlers

The plugin implements both drag-and-drop and paste functionality for handling image files. When a file is detected, it inserts a temporary placeholder and processes the file asynchronously.

#### Paste Handler

```typescript
private handlePaste(evt: ClipboardEvent, view: EditorView): boolean {
    const items = Array.from(evt.clipboardData?.items || []);
    const files = items
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile())
        .filter((file): file is File => file !== null);
    
    if (files.length > 0) {
        evt.preventDefault();
        const cursorPos = view.state.selection.main.head;
        const transaction = view.state.update({
            changes: { from: cursorPos, insert: '![Uploading...]()' },
            selection: { anchor: cursorPos + 16 }
        });
        view.dispatch(transaction);
        
        this.processFiles(files, view);
        return true;
    }
    return false;
}
```

#### Drop Handler

```typescript
private handleDrop(evt: DragEvent, view: EditorView): boolean {
    if (evt.dataTransfer?.files.length) {
        evt.preventDefault();
        const files = Array.from(evt.dataTransfer.files);
        
        const pos = view.posAtCoords({ x: evt.clientX, y: evt.clientY });
        if (pos !== null) {
            const transaction = view.state.update({
                changes: { from: pos, insert: '![Uploading...]()' },
                selection: { anchor: pos + 16 }
            });
            view.dispatch(transaction);
            
            this.processFiles(files, view);
            return true;
        }
    }
    return false;
}
```

### File Processing

The `processFiles` method handles the actual file processing and link insertion:

```typescript
private async processFiles(files: File[], view: EditorView): Promise<void> {
    const imageFiles = files.filter(file => file.name.endsWith('.png'));
    
    if (imageFiles.length === 0) return;
    
    for (const file of imageFiles) {
        try {
            const markdownLink = `![[Visuals/${file.name}]]`;
            
            const doc = view.state.doc.toString();
            const placeholderIndex = doc.lastIndexOf('![Uploading...]()');
            
            if (placeholderIndex !== -1) {
                view.dispatch({
                    changes: { 
                        from: placeholderIndex, 
                        to: placeholderIndex + '![Uploading...]()'.length,
                        insert: markdownLink 
                    },
                    selection: { anchor: placeholderIndex + markdownLink.length }
                });
            }
            
            new Notice(`Added image link: ${markdownLink}`);
        } catch (error) {
            console.error('Error processing file:', error);
            new Notice(`Error processing ${file.name}: ${error.message}`);
        }
    }
}
```

### CodeMirror Integration

The plugin uses CodeMirror's `EditorView` for precise text manipulation. The editor extensions are registered in the plugin's `onload` method:

```typescript
this.registerEditorExtension([
    EditorView.domEventHandlers({
        paste: (event, view) => this.handlePaste(event, view),
        drop: (event, view) => this.handleDrop(event, view)
    })
]);
```

This implementation provides a seamless experience for users to add images to their notes by either pasting from clipboard or dragging and dropping files into the editor. The plugin currently supports PNG files and creates Obsidian-style wiki links in the format `![[Visuals/Filename.png]]`.

