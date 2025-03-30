---
title: 'Render Site Flavored Markdown'  # Core purpose
lede: 'Render site flavored Markdown in layers with Marked Extensions'  # Brief description
date_authored_initial_draft: 2025-03-28
date_authored_current_draft: 2025-03-28
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: "0.0.0.1"
authors: Michael Staton
status: To-Do
augmented_with: "Windsurf Cascade on Claude 3.5 Sonnet"
category: "Technical"
tags:  # Key areas covered
- Component-Architecture
- Content-Collections
- UI-Design
- Astro
- Rendering-Pipeline
---

# Goals

Let's just start with one: 
Render backlinks with marked-base-url

Example of a backlink:
```markdown   
[[lost-in-public/prompts/user-interface/Create-a-Changelog-UI.md]]
```

`log/2025-03-26_01`

We need to use the "hooks", and probably do it "post-process" because we have had trouble with HTML rendering when we tried to transform the backlinks before sending it to Astro's built-in `<Content />` component.

`postprocess(html: string): string`

## Implementation Steps
1. Configure marked with baseUrl
2. Create backlink regex pattern
3. Implement postprocess hook
4. Handle edge cases

## Configuration
Location: site/src/utils/markdown/marked-config.ts
Usage: Import in ChangelogEntryPage.astro

Content is in the `content` directory at root. It is a git submodule.

Each collection will end up having its own custom route that will be set in the `marked-config.ts` file that you will make.

Because we use Obsidian to manage the Markdown, and our content team likes to capitalize directory titles and use the space character, we need to transform the backlink with the following:
- ONLY THE DIRECTORY part of the path from any case it is in to using `kebab-case` -- the content folders in the `content` directory are all in `kebab-case`, yet the backlinks are not. 
- The file name case should be the same as the file name in the backlink, however we should replace spaces with dashes given url slug conventions. 

## Backlink Examples
Input:

`[[content/Lost-in-Public/prompts/render-logic/Support-Dynamic-Information-Pages.md]]`
`[[Lost in Public/prompts/user-interface/Create-a-Changelog-UI.md]]`

Expected Output:
If the `content` dir is present in the backlink, remove it from the link as all collections are pointing within the content directory.
`<a href="/lost-in-public/prompts/render-logic/Support-Dynamic-Information-Pages" class="backlink">Support Dynamic Information Pages</a>`

`<a href="/lost-in-public/prompts/user-interface/Create-a-Changelog-UI" class="backlink">Create a Changelog UI</a>`
...

## Error Handling
- Missing files
- Invalid paths
- Malformed syntax

## Test Cases
1. Basic backlink
2. Nested path
3. Invalid path
4. Special characters

## Read the Documentation:
- [Marked Renderer](https://marked.js.org/using_pro#renderer)
- [Tokenizer](https://marked.js.org/using_pro#tokenizer)
- [Walk Tokens](https://marked.js.org/using_pro#walk-tokens)
- [Hooks](https://marked.js.org/using_pro#hooks)
- [Extensions](https://marked.js.org/using_pro#extensions)

### Example from the Marked documentation for convenience:

```javascript
const descriptionList = {
  name: 'descriptionList',
  level: 'block',                                     // Is this a block-level or inline-level tokenizer?
  start(src) { return src.match(/:[^:\n]/)?.index; }, // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/;    // Regex for the complete token, anchor to string start
    const match = rule.exec(src);
    if (match) {
      const token = {                                 // Token to generate
        type: 'descriptionList',                      // Should match "name" above
        raw: match[0],                                // Text to consume from the source
        text: match[0].trim(),                        // Additional custom properties
        tokens: []                                    // Array where child inline tokens will be generated
      };
      this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
      return token;
    }
  },
  renderer(token) {
    return `<dl>${this.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
  }
};

const description = {
  name: 'description',
  level: 'inline',                                 // Is this a block-level or inline-level tokenizer?
  start(src) { return src.match(/:/)?.index; },    // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^:([^:\n]+):([^:\n]*)(?:\n|$)/;  // Regex for the complete token, anchor to string start
    const match = rule.exec(src);
    if (match) {
      return {                                         // Token to generate
        type: 'description',                           // Should match "name" above
        raw: match[0],                                 // Text to consume from the source
        dt: this.lexer.inlineTokens(match[1].trim()),  // Additional custom properties, including
        dd: this.lexer.inlineTokens(match[2].trim())   //   any further-nested inline tokens
      };
    }
  },
  renderer(token) {
    return `\n<dt>${this.parser.parseInline(token.dt)}</dt><dd>${this.parser.parseInline(token.dd)}</dd>`;
  },
  childTokens: ['dt', 'dd'],                 // Any child tokens to be visited by walkTokens
};

function walkTokens(token) {                        // Post-processing on the completed token tree
  if (token.type === 'strong') {
    token.text += ' walked';
    token.tokens = this.Lexer.lexInline(token.text)
  }
}
marked.use({ extensions: [descriptionList, description], walkTokens });

// EQUIVALENT TO:

marked.use({ extensions: [descriptionList] });
marked.use({ extensions: [description]     });
marked.use({ walkTokens })

console.log(marked.parse('A Description List:\n'
                 + ':   Topic 1   :  Description 1\n'
                 + ': **Topic 2** : *Description 2*'));
```


An example of using `marked-base-url`:
```javascript
// ESM
import {marked} from "marked";
import {baseUrl} from "marked-base-url";

marked.use(baseUrl("https://example.com/folder/"));
const html = marked.parse("[my url](./relative/path)");
// <p><a href="https://example.com/folder/relative/path">my url</a></p>

// BROWSER
<script src="https://cdn.jsdelivr.net/npm/marked"></script>
<script src="https://cdn.jsdelivr.net/npm/marked-base-url"></script>
<script>
    marked.use(markedBaseUrl.baseUrl("https://example.com/folder/"));
    const html = marked.parse("[my url](./relative/path)");
    // <p><a href="https://example.com/folder/relative/path">my url</a></p>
</script>
```

# Further Investigation

[zero-md](https://zerodevx.github.io/zero-md/) allow the rendering of remote markdown files. 