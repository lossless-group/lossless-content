---
title: "Frontmatter Standard for Books"
lede: "One shape for every file in sources/Books, rich enough to generate an annotated bibliography in any citation style."
publish: false
date_created: 2026-10-29
date_modified: 2026-10-29
authors:
  - Michael Staton
augmented_with:
  - Claude Code on Claude Opus 5.5 (1M context)
at_semantic_version: 0.0.0.1
status: Draft
tags:
  - Frontmatter
  - Content-Standards
  - Citations
---

# Frontmatter Standard for Books

Every file in `sources/Books/` should converge on this shape. It documents the target; it doesn't gatekeep. A file missing fields still renders, and the generator skips what isn't there.

## Why these fields

Chicago, APA and MLA all build from the same parts: who wrote it, what it's called, who published it, when, and which edition. Store those parts separately and any style can be assembled from them. Annotations are kept apart from bibliographic facts so a list can show just the citation, the summary, our take, or all three.

## The shape

```yaml
---
# Identity (existing keys, unchanged)
title: "7 Powers"
slug: 7-powers
site_uuid: ...
publish: true
date_created: 2025-01-08
date_modified: 2026-10-29
at_semantic_version: 0.0.0.1

# What it is
format: book            # book | article | paper | report | manifesto | essay
subtitle: "The Foundations of Business Strategy"

# Who wrote the book, in natural order. Wikilinks are fine; the generator strips them.
# (`authors` stays reserved for who wrote this note, as everywhere else in content.)
book_authors:
  - "[[Sources/People/Hamilton Helmer|Hamilton Helmer]]"
contributors:           # optional: anyone credited who isn't a full author
  - name: "Blake Masters"
    role: with          # with | editor | translator | foreword | illustrator

# Publication facts
publisher: "Deep Strategy"
publisher_city: ""      # Chicago uses it; APA and MLA don't
year_first_published: 2016
edition: ""             # only when citing a later edition: "2nd", "Updated"
edition_year:           # year of that edition
isbn_13: ""
page_count:
language: en

# Articles and papers only
container_title: "California Management Review"
volume: 38
issue: 4
pages: "8-30"
doi: ""

# Links
google_books_id: heEuvgAACAAJ
google_books_url: https://books.google.com/books?id=heEuvgAACAAJ
amazon_url: ...
goodreads_url: ...
publisher_book_url: ...
url: ...                # the book's own site
wikipedia_url: ...

# Annotation
annotation: >-          # one neutral sentence: what the book argues
  Identifies seven sources of durable competitive advantage, each pairing a
  benefit with a barrier.
our_take: ""            # in our words: why it shaped how we think or invest
tags:
  - Influential-Business-Books
---
```

## Field notes

- **`book_authors`** replaces the mix of `author` (string) and `authors` (list) used for book authors today. `authors` keeps its site-wide meaning: who wrote the note. Always a list, even for one author. Names in natural order ("Hamilton Helmer"); the generator inverts the first author for Chicago and APA. For a name that doesn't split cleanly ("Nassim Nicholas Taleb", "A. G. Lafley", "Frederick P. Brooks, Jr."), add `sort_as: "Taleb, Nassim Nicholas"` beside it by writing the author as `{name: ..., sort_as: ...}`.
- **Edited volumes** have no `book_authors`; list the editors in `contributors` with `role: editor`.
- **Organizations as authors** (e.g. Play Bigger, 37signals): write `{name: "Play Bigger", sort_as: "Play Bigger"}` so the generator doesn't invert it.
- **`year_first_published`** is the year that goes in the citation unless `edition` is set, in which case the citation uses `edition_year` and names the edition.
- **`google_books_id`** is the stable key; `google_books_url` is derived from it. Store both so Obsidian links work without a build step.
- **`annotation` vs `our_take`**: `annotation` is the neutral summary a librarian would write. `our_take` is ours, in our voice, and is what makes a "Books that influenced us" list ours. Leave `our_take` empty rather than filling it with a guess.
- **`full_title`** (in use in 7 files) is retired in favor of `title` + `subtitle`.

## Generated outputs this supports

| Output | Fields used |
|---|---|
| Chicago bibliography | book_authors, contributors, title, subtitle, edition, publisher_city, publisher, year |
| APA reference list | book_authors, year, title, subtitle, edition, publisher, doi |
| MLA works cited | book_authors, title, subtitle, edition, publisher, year |
| Annotated bibliography | any of the above + `annotation` and/or `our_take` |
| Reading list by theme | tags + title + book_authors |
| Linked list | title + `google_books_url` or `amazon_url` |
