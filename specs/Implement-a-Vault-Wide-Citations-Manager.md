---
title: Implement a Vault-Wide Citations Manager as an Obsidian Plugin
lede: AI Generated content can come with citations in whatever form the LLM choses. Transform them and then manage them in a way that enables better content.
date_authored_initial_draft: 2025-03-12
date_authored_current_draft: 2025-07-07
date_authored_final_draft: 
date_first_published: 
date_last_updated: 2025-07-07
at_semantic_version: 0.0.0.3
status: Iterating
augmented_with: Windsurf Cascade on SWE-1
category: Content-Management
publish: true
date_created: 2025-03-12
date_modified: 2025-07-09
site_uuid: y8f59v34-aa5b-4f79-b8a7-93c3fc99a89f
tags: [Build-Scripts, YAML, Frontmatter, Architecture, Documentation, OpenGraph, YouTube]
authors:
  - Michael Staton
image_prompt: A complex flowchart with interconnected gears and code snippets, representing an automated build process. The background features digital blueprints and progress bars, evoking efficiency and precision in software development.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_banner_image_Build-Script-Spec_39259b0d-6bed-4157-baf7-53c35deebb35_rr5hYOulP.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_portrait_image_Build-Script-Spec_21af46f2-dd20-45e5-86da-c0815542f01e_e1OL2d6mN.webp
---
# Objective

Implement our work that transforms citations and footnotes in Markdown files in a dedicated [[Tooling/Productivity/Obsidian|Obsidian]] plugin. 

The plugin has the working name "Cite Wide" or `cite-wide` and can be found on GitHub at [cite-wide](https://github.com/lossless-group/cite-wide.git) with the development branch being most active. From the [lossless-monorepo](https://github.com/lossless-group/lossless-monorepo) it can be found as a submodule. 

### Working Directory
- The relative path from the lossless-monorepo is `cite-wide`
- The absolute path is on mps' mac is `/Users/mpstaton/code/lossless-monorepo/cite-wide`

***

# Background

We have developed at various times scripts and observers that transform numeric citations in Markdown files to unique hexadecimal identifiers. We were attempting to ensure consistent citation formatting, and we were working towards creating a robust citation, footnote, and reference management system.

Our team uses [[Tooling/Productivity/Obsidian|Obsidian]] to manage content, which uses relatively common [Extended Markdown syntax for footnotes](https://help.obsidian.md/syntax#Footnotes) found on the [Obsidian Docs here](https://help.obsidian.md/syntax#Footnotes)

Our previous work can be found in the prompt entitled [[lost-in-public/prompts/data-integrity/Integrate-Citations-Format-Hex-into-Observer|Integrate-Citations-Format-Hex-into-Observer]].  
### AI Generated Content & Unmanageable References
[[Tooling/AI-Toolkit/Models/Perplexica|Perplexica]] and [[organizations/Perplexity AI|Perplexity AI]] are examples of [[Vocabulary/Large Language Models|LLMs]] that perform live web searches and include citations and references.

They often use basic numeric citations, in the form `[1]` where the value 1 could be any integer, so `[int]`. 

They often reference the same citation multiple times in the markdown content, so the `[int]` may occur between 1 and many instances with the same  `[int]` syntax. 

**Very Important**: the Perplexity style citations are often crammed directly onto the content with no space, however the Extended Markdown and Obsidian syntax requires EXACTLY ONE SPACE between the content and the citation, and EXACTLY ONE SPACE between the first citation and any subsequent citations that are present in the same line. 

They usually create a footnotes section that may have different syntactic structures, with the current one as of July 2025 from [[organizations/Perplexity AI|Perplexity AI]] being:
```markdown
1. [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains).
```

>[!Example]
>
**Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain[1](https://www.mailersend.com/features/multiple-domains)[2](https://www.mailgun.com/products/send/)[3](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api).
>
>
>1. [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
>2. [https://www.mailgun.com/products/send/](https://www.mailgun.com/products/send/)
>3. [https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api)

***

# Desired Behavior
- [x] Match and Transform One Value at a Time (completed 2025-07-08)
- [x] Format Footnotes and Reference Section with Basic Layout
- [ ] Match and Transform All Values in One Command
- [ ] Maintain a content wide citations registry for each unique reference source.
- [ ] Format Footnotes and References with preferred user syntax.

## 1. Match and Transform One Value at a Time 
1. Match and transform a single citation and footnote based on exact matches of the value 
	1. Match numeric citations either in the form `[1]` or `[^1]` where the value 1 could be any integer, so `[int]` or `[^int]`.  
	2. Within the same operation, match the corresponding "footnote" reference, which may read as 
		1. "`1. [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains).`", or  
		2. "`[1]. [MailerSend](https://www.mailersend.com/features/multiple-domains).`"
	3. Transform the target value (e.g., `[1]` or `[^1]`) to unique hexadecimal identifiers with the proper [[emergent-innovation/Standards/Markdown|Extended Markdown]] syntax 
		1. Citation instances transform to (e.g., ` [^a1b2c3]`). **Note:** there must be a  space before the citation opening bracket. **Note:** if there are contiguous or sequential citations they must have spaces between them.  (e.g., ` [^a1b2c3] [^b2c3d4]`)
		2. and in the SAME OPERATION transform the **final instance** in the footnotes or reference section to `[^a1b2c3]: ` **Note:** there must be a colon immediately following the closing bracket, followed by a space. 

2. Ensure all citations have corresponding footnote definitions
	1. Create or update a Footnotes section when necessary
3. Maintain a registry of citations across files for cross-referencing

# Example Transformations
## Perplexity AI Citation Style

***

> [!EXAMPLE]
> ### Before Transformation
> 
> **Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain[1](https://www.mailersend.com/features/multiple-domains)[2](https://www.mailgun.com/products/send/)[3](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api).
> 
> 1. [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
> 2. [https://www.mailgun.com/products/send/](https://www.mailgun.com/products/send/)
> 3. [https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api)


> [!EXAMPLE]
> ### After Transformation
> 
> **Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain [^abc123] [^bcd234] [^cde345]
> 
> `#### Footnotes:`
> [^abc123]: [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
> [^bcd234]: [https://www.mailgun.com/products/send/](https://www.mailgun.com/products/send/)
> [^cde345]: [https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api)
> 

---

# Task at Hand

A new Perplexity AI "reference" format from the deep research AI option is the following:
```markdown
[^8e965e]: [PDF] Disciplined Entrepreneurship - Summaries.Com https://public.summaries.com/files/1-page-summary/disciplined-entrepreneurship.pdf
```

Our current transformation is expecting only:
```markdown
[^8e965e]: [PDF] Disciplined Entrepreneurship - Summaries.Com https://public.summaries.com/files/1-page-summary/disciplined-entrepreneurship.pdf
```

The desired transformation in this instances is:
```markdown
[^8e965e]: [Disciplined Entrepreneurship - Summaries.Com, PDF](https://public.summaries.com/files/1-page-summary/disciplined-entrepreneurship.pdf)
```

# Implementation Plan

## Project Architecture

1. **Citation Modal** (`cite-wide/src/modals/CitationModal.ts`)
2. **Citation Service** (`cite-wide/src/services/citationService.ts`)
3. **Styles** (`cite-wide/src/styles/citations.css`)
4. **Types** (`cite-wide/src/types/obsidian.d.ts`)

## Step 1: process "Perplexity Style" citations, footnotes.

The CitationsModal needs to group by the value that is found within brackets: `[int]`.  It should start with 1 and iterate through numeric integer values. Starting with `[1]`, it should group all instances of `[1]` and display them in the modal as a list, with the line in which it is found. 

It should also identify and display the likely "footnote" reference. So, `1. [http://www.example.com](http://www.example.com)` as well as the line it is found. 

### Step 1. A: A Citation Modal

The CitationModal needs to group by value, so the user can see how many "matches" there are to a specific value.  
### Modal Layout:
Header: "Citation `[int]`: `X` instances" where X is the number of instances found. 
```html
<div>
	<span>
		<h2> Citations for ${int}: ${X} instances</h2>
	</span>
	<span>
		<button="convertAllInstancesToHex">To Hex</button>
</div>
```
Instance List: 
```html
<div>
	<span><a href="${line-x}">Line X:<a/></span>
	<span>${content}</span>
</div>
```

### **Examples**:  
> [!ALERT]
> ONLY TRANSFORM ONE INTEGER AT A TIME

#### Abstracted

##### To Transform:
In content:

```markdown
Content copy, content copy, content copy.[1](http://www.example1.com)[2](http://www.example2.com)
```

Footnote reference:
```markdown
1. [http://www.example1.com](http://www.example1.com)
2. [http://www.example2.com](http://www.example2.com)
```

##### Transformed content:
In content:

```markdown
Content copy, content copy, content copy. [^abc123] [2]
```
 **Note:** the "Perplexity Style" does not leave a space character between the content and the citation. The correcting function must create a space between the content and the new citation. If there are multiple citations in sequence, they must have ONLY ONE space between them. The final citation must either be a new line or have at least one space after it before content resumes in the same line.

Footnote reference:
```markdown
[^abc123]: [http://www.example1.com](http://www.example1.com)
2. [http://www.example2.com](http://www.example2.com)
```

#### Actual Examples: 

##### To Transform:

Before the transformation:
```markdown 
- **Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain[1](https://www.mailersend.com/features/multiple-domains)[2](https://www.mailgun.com/products/send/)[3](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api). 

1. [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
2. [https://www.mailgun.com/products/send/](https://www.mailgun.com/products/send/)
3. [https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api)
``` 


 Desired Transformation: 
```markdown
**Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain [^abc123] [2](https://www.mailgun.com/products/send/)[3](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api).

[^abc123]: [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
1. [https://www.mailgun.com/products/send/](https://www.mailgun.com/products/send/)
2. [https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api)
```
****

##### To Transform:
In content:
```markdown 
**Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain [^abc123] [2](https://www.mailgun.com/products/send/)[3](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api). 

Footnote reference:
[^abc123]: [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
``` 


##### Transformed content:

In content:
```markdown 
- **Multiple Domain Management:** Ensure the provider allows you to add and manage several sending domains under a single account. This is crucial for keeping your brands or projects separate and maintaining deliverability for each domain [^abc123] [^bcd234][3](https://postmarkapp.com/support/article/1113-how-do-i-manage-domains-using-the-api). 
``` 

Footnote reference:
```markdown
[^abc123]: [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains)
[^bcd234]: [https://www.mailgun.com/products/send/](https://www.mailgun.com/products/send/)
```



# Future Plans

Our content team has developed content, and will continue to develop content, with Obsidian style citations and footnotes `[^1]` or `[^int]`. 
1. Within the same operation, match the corresponding "footnote" reference, which may read as "`1. [https://www.mailersend.com/features/multiple-domains](https://www.mailersend.com/features/multiple-domains).`" or  "`[1]. [MailerSend](https://www.mailersend.com/features/multiple-domains).`"
2. (e.g., `[^e923c9]`) to unique hexadecimal identifiers (e.g., `[^a1b2c3]`)


    , etc.)
4. **Desired Output**: Show exactly how you want the converted citations to appear
5. **Edge Cases**: Any special cases we need to handle (like multiple citations in one line, citations next to punctuation, etc.)
6. **Behavior**:
    - Should all instances of the same number be converted when one is clicked?
    - Should the URL be preserved in the footnotes?
    - Any specific formatting requirements for the footnotes section?


# Technical Implementation Docs




Project History

#### First Attempt
![](https://i.imgur.com/9oBvILi.png)

#### Second Attempt


![](https://i.imgur.com/0HrSClz.png)

#### Third Attempt


![](https://i.imgur.com/4EKoO6u.png)


# Troubleshooting

### Tables render funkily 
<<20250708:18:55

![](https://i.imgur.com/DHT4lqq.png)
Perhaps move them down to a bottom row with merged cells?

### Spacing between characters 

`The future of creative work will likely depend on how professionals, organizations, and policymakers navigate these opportunities and risks[^f37b62][^4cdfe9][^4668d2].`

Instead of 
`The future of creative work will likely depend on how professionals, organizations, and policymakers navigate these opportunities and risks [^f37b62] [^4cdfe9] [^4668d2].`

### Preference for outside or after punctuation marks. 

``The future of creative work will likely depend on how professionals, organizations, and policymakers navigate these opportunities and risks [^f37b62] [^4cdfe9] [^4668d2].`

Preference for:
`The future of creative work will likely depend on how professionals, organizations, and policymakers navigate these opportunities and risks. [^f37b62] [^4cdfe9] [^4668d2]`

### Format of Sources
`[^c9e413] Generative AI - Transforming Art, Design, and Media https://tcognition.com/blogs/generative-ai-in-art-design-and-media/`

Preference for:
`[^c9e413]: [Generative AI - Transforming Art, Design, and Media]( https://tcognition.com/blogs/generative-ai-in-art-design-and-media/)`

### Clean the Sources, Footnotes, References

```markdown
[^fcb9b5] Revolutionizing Ad Creatives: Generative AI in Action https://www.clickguard.com/blog/chatgpt-supercharges-image-video-production-with-generative-ai/
[^4668d2] New Report Reveals Alarming Impact of Generative AI on ... https://www.rareformaudio.com/blog/generative-ai-impact-on-creative-jobs
[^48cad1] Creative Industries and GenAI: Executive Summary - IFOW https://www.ifow.org/publications/executive-summary-creative-industries
```


```markdown
[^fcb9b5]: Revolutionizing Ad Creatives: Generative AI in Action https://www.clickguard.com/blog/chatgpt-supercharges-image-video-production-with-generative-ai/
[^4668d2]: New Report Reveals Alarming Impact of Generative AI on ... https://www.rareformaudio.com/blog/generative-ai-impact-on-creative-jobs
[^48cad1]: Creative Industries and GenAI: Executive Summary - IFOW https://www.ifow.org/publications/executive-summary-creative-industries
```
