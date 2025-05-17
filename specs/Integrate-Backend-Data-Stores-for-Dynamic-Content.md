---
title: Integrate Backend Data Stores for Dynamic Content
lede: Enhance Markdown content by integrating backend data stores for more dynamic content management
date_authored_initial_draft: 2025-05-14
date_authored_current_draft: 2025-05-14
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
publish: false
status: To-Implement
augmented_with: Windsurf Cascade on Claude 3.7 Sonnet
category: Content-Management
date_created: 2025-05-14
date_modified: 2025-05-14
tags: 
  - Backend
  - Content-Management
  - Databases
  - Extended-Markdown
  - Data-Persistence
authors:
  - Michael Staton
image_prompt: "A sprawling diagram, with the top half showing piles of notebooks and notebook paper, some pages have been torn out to show handwritten notes and are floating in the wind and stacked on top of each other. As the image transitions to the bottom half, diagram arrows start at clusters of these notebooks and paper and flow towards a central server icon and a database icon, with popular database logos such as Postgres, MongoDB, and SurrealDB. The design is sleek and modern, with the top half feeling chaotic and the bottom half feeling ordered and structured"
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-14_banner_image_Integrate-Backend-Data-Stores-for-Dynamic-Content_5a4c2a74-cddc-4ccd-80ef-e82dd2e77426_4NmVZf4GZ.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-14_portrait_image_Integrate-Backend-Data-Stores-for-Dynamic-Content_2c241d2f-b9f5-4fc8-a5d6-5ad66e656c6c_VG_t27Dk-.webp
---

# Executive Summary

We will move iteratively towards the integration of backend data stores that will support dynamic, feature-rich content rendering as well as agile, productive content management workflows. 

Leveraging persistent data-stores will provide ironclad content progress, and complement our increasingly featured Extended Markdown "Flavor" and the content rendering pipelines that make them valuable for our audience.

This specification is more about creating a repeatable process for identifying, planning, and implementing any data store integration that will support our ideas, goals, and practices for dynamic content rendering.

By iterating on this specification, we aim to codify and document our decisioning, architecture, stack choices, workflows, and conventions so that as our team grows and evolves, we are able to cope with increasing complexity and scale.

# Ideal Data Stores and Desired Functionality:

## Example User Stories:

## Priority: 
Content-Manager empowerment: Our manager and marketing team are now experiencing Generative AI powered content generation, and it is causing anxiety and stress organization wide. And we are only getting started. 

Using Generative AI is a departure from our highly-educated, research driven team that used to spend tons of time to generate one blog entry or one report.  Everyone is excited, but also very worried about the quality of our content. Of course, that actually means they are more broadly worried about our "reputation" as experts in the market. 

There is just no way to evaluate the credibility of Generative AI's claims without a view of the sources. And there is no way to "identify and build on" more credible content without navigating the most valuable of the cited sources. And there is no way to "identify and either send for revision or remove" less credible content without navigating the quality of the sources.

"Research" Generative AI is more credible, sometimes, when it cites quality sources. Think Perplexity. Yet, in any one piece of content Perplexity might cite 30+ sources, not all of which meets our standards. 

Moreover, Perplexity does not use the citation formatting we expect.  Paying an educated, white collar worker to fix 30+ citations and futz with footnote formatting is not a good use of their time. 

As of now, we have no way to use the sources to evaluate the quality of the content without clicking through every link. With a global source or citation registry, a little internal tooling, managers and marketing teams can now make more informed decisions about all the content being generated. We can have more "visibility" and be able to "steer" the content in a more informed way. 

End-user experience: A user is reading an article, a dynamically generated rendering of a Markdown file. The article has footnotes and citations. If one catches their interest, they can click on the footnote content which will open a list of other content that references the same source. 

Content creator workflow: A content creator in our content team is working on a new article. They are using Obsidian, our Markdown editor, to write the article. They are using footnotes and citations to reference sources. They insert just a link to the source, and either with running a script, waiting for a chron job, or using an admin panel, the source information is entered correctly into a database, further information is fetched through API calls, and the footnote is rendered in the desired format. 

Content creator workflow: A content creator can notice the "sources" that are being used more often and are more valuable. The content creator creates an astro Content Collection of this type of source: (example: "Books") and works with an engineer (or just figures it out themselves) in our "ai-labs" reponsitory to use a series of LLM API calls to autogenerate content for each "Book", which now has an accompanying markdown file and saves the content.

## Global Source and Citations Registry:

Across over 1000 markdown files as of May 2025, we have citations and footnotes that only exist in the context of a single markdown file. 

We want to enhance the functionality by:
1. rendering citations in a desired, standardized format that does not have to be written by-hand by our content team. (It's tedious, and even with attention to detail, it's easy to make mistakes.) (Also, we may want to change the citation format in the future, probably multiple times. So, we want to be able to change the citation format in one place, and have it apply to all markdown files upon rendering.)
2. showing "other content" that references the same source.  
3. use API calls to
   a. complete the citation information with accurate information from the source. (Dates, authors, titles and subtitles, publishers, etc.)
   b. dynamically generate informative and beautiful components that display books, media, and websites.
4. dynamically generate features, such as "most cited Creators, Authors, Books, Media, and Websites".
5. use LLM API calls to updated, augment, format, clean, edit, and revise our content as needed, using the sources as a "RAG" (Retrieval-Augmented Generation) inputs.

**Global Citations Registry** to be used in Markdown footnotes. 

**Global Book Registry** to be used in Markdown footnotes and in a BookDisplay component, using Google Books API.

**Global Media Registry** to be used to display media in the Markdown file, create and populate a MediaDisplayColumn component for each Markdown file rendering, and in footnotes. This is particularly important for YouTube videos, though we also reference Vimeo, Spotify, and other media providers.

# A Phased Approach
Keep documentation of this iterative build out here.  Do not delete or remove the general meaning of the content for the phases even as we are done with one phase and move onto the next.  

## Phase 1: 
1. Implement initial data store on local development environment.
2. Write a script to scan a single file or recurse through a directory of files and extract citations and footnotes, properly augmenting the record with API Call responses, then writing or updating the records in the data store, and finally reformat the footnote according to our conventions and standards using the data store. 

Further documentation on this phase is in a Prompt.  The prompt can be found here: [[lost-in-public/prompts/workflow/Implement-a-Specific-Task-as-Part-of-Larger-Specification.md|Implement a Specific Task as Part of Larger Specification]].

## Phase 2: 
1. Implement the script into our Observer and Watcher system. 
2. Assure global citation registry is, in fact, global.
3. Assure global book registry is working properly, data is in proper formats, and footnotes are rendered correctly.
4. Implement a production environment data store on a remote, stable service.
5. Develop a test environment and graceful validation and fallbacks to prevent data loss or corruption.

## Phase 3: 
1. Implement an internal tool builder that gives content managers and marketing executives the ability to audit content quality by scanning citations and footnotes in new and updated content for source quality, by proxy assessing the credibility and authority of content through the sources.

## Phase 4:
1. Implement an admin tool that gives site admins, content managers, and conten creators the ability to generate content through Peplexity or other research-driven LLM API calls. 
2. Implement this Citation Registry code into this tool, so that the response object from the LLM is immediately transformed by connecting to our citation registry, including reformatting footnotes and citations.

## Phase 5:
1. Implement various features for end-users, such as "most cited Creators, Authors, Books, Media, and Websites".

## Phase 6:
1. Assure this specification is revised with architecture, code style and conventions, workflows, and any other information that will be useful for the NEXT priority for which the team needs data persistence.


# Technical Requirements (Discussion)

Business Needs:

**Unimportant:** We do not need to worry about scalability, performance, or security at this point in time. We have a limited number of potential viewers of our site.  Reliability is important, though, as the limited number of viewers are very very valuable clients. 

**Important:** 
- Flexibility. We are rapidly iterating on content and features, and have rapidly evolving data needs. We expect to have multi-modal content and data.  
- Ease-of-use. Our content team and our front-end development team are all getting more sophisticated, rapidly. We expect them to want to go in and make changes to the site, in code, and they need to do so with ease and not have to spend days reading documentation or watching tutorials.
- API-first remote deployment: We are expirementing with using AI and third-party APIS to rapidly generate, transform, edit, format content and data.  
- Backups or version control. Because we are generating lots of content and data quickly (for a small content team) AND iterating on the content and data model, we should not depend on individuals and their dedication to always keep the content and data model in clean, working order. They will likely corrupt content and data. Having a "Time Machine" like backup system will prove invaluable, and will also give our team the ability to focus on what they are good at and not constantly worrying they will mess something up.
- Anticipating Retrieval Augmented Generation (RAG), fine tuning, and other techniques or operations that improve AI-driven content generation. This may require us to plan ahead for "vector databases" and "semantic search".

### AstroDB
AstroDB is primarily used for local development, non-production environments.  It is a libSQL-compatible database, and has strong built-in functionality, including Prisma like data modeling and validation.  

libSQL itself is a fork of SQLite, and is maintained by a serverless-database company called [Turso](https://turso.tech/).

# Current Implementation Analysis

## As of May 2025

The current implementation in Astro uses vanilla JavaScript and Astro components, complemented with Astro's built-in Remark.js markdown processing pipeline. Markdown files are used for content management. Astro, like many other content tools, uses frontmatter in YAML syntax to draw from metadata for each markdown file. 

We have been building a feature-rich, dynamic website in Astro. Our content team is introducing more and more content collections, and we should assume that there will continue to be more content collections in the future. Each content collection is a directory of markdown files, with each collection having its own defined frontmatter standards. Some collections have identical frontmatter standards, while others have unique frontmatter standards. Our conten team reserves the right to change frontmatter standards at any time, and we should assume that they will do so. 

The content team currently uses Obsidian, a Markdown editor but also a "Networked Notebook" for "Networked Notes", to develop and manage their content. Obsidian has its own "Extended Markdown" flavor, which is a superset of CommonMark, the standard Markdown specification. Obsidian's "flavor" extends CommonMark with additional syntax and features, such as callouts, backlinks, footnotes, internal embeds, internal image references that display, html iFrame embeds, codeblocks, and more. 

Obsidian also has a "Plugin" ecosystem where third party developers can enhance Obsidian's functionality. Almost always, plugins leverage the "codeblock" syntax to add new features to Obsidian. So, while the Plugin uses the "codeblock" syntax, it is not a codeblock in the sense of CommonMark. Instead, the "language" identifier is used to identify the plugin, which then often renders a specific UI element and component pipeline. Ones we currently use in content development are: Mermaid, Dataview, and Litegal.

### Extended Markdown to Feature-Rich Content Display as of May 2025

We have worked through only some of the Extended Markdown features of Obsidian as of May 2025. And we have many ideas that are not even included in Obsidian. 

#### Extended Markdown Features we have worked through as of May 2025:

- Callouts (Basic, no Classes)
- Backlinks (Basic, not dynamic)
- Footnotes (Basic, not global)
- HTML iFrame Embeds
- Codeblocks (Basic, not feature complete. Only Mermaid is supported as a special codeblock syntax.)

#### Obsidian Flavored Extended Markdown Features we have not worked through as of May 2025:

- Internal Content Embeds through Internal References
- Internal Image References
- Special Codeblocks:
   - Litegal
   - Dataview

#### Additional Known Wants for Extended Markdown as of May 2025:

- Footnotes with Global Footnote Support
- Special handling of video links, particularly YouTube links. 
- Special handling of Book references, especially Google Books and Amazon. 
- Special handling of citations.
- Callouts with Classes (that call and render a specific UI component.)
   - Tooltips
   - Admonitions
   - Dialogs
   - Questions and Answers
   - LLM Responses
   - Image References with Classes, Captions, dimensions and optional text wraps. 
- Smart Backlinks that "index" cross-references, and can be used to find the referenced content and dynamically generate a valid route to that content. (Some backlinks have valid relative paths, acting as the route. Most do not.)
- Backlinks that show a preview of the referenced content.
- Updates with Timestamps


### State of Content Collections as of May 2025:
We are roughly speaking halfway through rendering our known and established content collections.  We have a number of collections that we have not yet rendered, and we expect to continue to add more collections in the future. 

#### Current Collections that Render as of May 2025:

- Vibe Coding libraries:
   - Reminders
   - Prompts
   - Specificataions
- Tools or Tooling
- Essays
- Learn with Us libraries:  
   - Issue Resolution
- Changelogs
   - Content Changelog
   - Code Changelog
- Reference libraries:
   - Concepts
   - Vocabulary

#### Current Collections that are not yet integrated into the Astro site as of May 2025:

- Learn with Us libraries:
   - Keeping Up
   - Up and Running
   - To Hero
- Lost in Public libraries:
   - Explorations
   - Notes from the Near Future
   - Notes from the Rabbit Hole
- Lossless Thinking libraries:
   - Emergent Innovation
- Reference Libraries:
   - Sources
   - Organizations


# Complexity and Future Proofing requires Data Persistence and Dynamic Content Management

As we continue to develop our content, we will need to consider the complexity of our content management practices and the value of our content. We will need to consider the future proofing aspects of our content. 







