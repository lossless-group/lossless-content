---
date_created: 2025-03-21
date_modified: 2025-07-22
site_uuid: 93b4264e-115d-4e22-996c-848e87ec70cf
publish: true
title: "Creating A Flavored Syntax Parsed To UI"
slug: creating-a-flavored-syntax-parsed-to-ui
at_semantic_version: 0.0.0.1
---
###### Map of Related Content
- **Concepts: [[concepts/Flavored Syntax|Flavored Syntax]],  [[projects/Emergent-Innovation/Standards/Markdown|Markdown]], [[Vocabulary/Markup]], [[Vocabulary/Text Parsing]]
- **Inspiration**: [[Tooling/Software Development/DevOps/Documentation Engines/Readme]], [[Tooling/Productivity/Obsidian|Obsidian]],

[content-structure](https://github.com/MicroWebStacks/content-structure)
[Astro-Big-Doc](https://github.com/MicroWebStacks/astro-big-doc/tree/main)

---
# Creating a Site Flavoured Syntax 

## Sections

I will probably need the following dedicated sections:
1. Figures
2. Images
	1. Wikilink Images
3. Asides
4. Slides
5. Media
6. Cites and Citations
7. Footnotes
8. Collapsed Sections
---
### Inventing custom Dynamic Variables

I've always wanted to keep an "evolving" textbook of everything I'm learning. I build it as I go. But, other than co-opting [[Tooling/Products/Git|Git]], I never imagined being able to do it. So:

#### An update timestamp Markdown
`|>>update_start::2025-03-19T19:25:22.108Z`
`|>>update_end::2025-03-19T19:25:22.108Z` 

---
#### Standardizing strings inside Callouts

TIPS, 
```
[!@Q&A] [--Q|'Michael', --A|'George']--[--Source|'[[Stack Overflow]]]
[!--Q%01] How would you refactor this?
[!--A%01] I recommend setting user options up top
```

@SPEAKS::

---
# Examples

[Github Advanced Formatting](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/)

- [Collapsed Sections](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections): 
```html
<details>

<summary>Tips for collapsed sections</summary>

### You can add a header

You can add text within a collapsed section.

You can add an image or a code block, too.

</details>
```


