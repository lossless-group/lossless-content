---
url: https://www.manning.com/books/data-oriented-programming?a_aid=viebel&a_bid=d5b546b7
date_created: 2025-08-16
date_modified: 2026-05-27
site_uuid: 31b8004d-1d33-41cd-8bea-c257c218256f
publish: true
title: Data Oriented Programming
slug: data-oriented-programming
at_semantic_version: 0.0.0.1
cf_last_run: 2026-05-27T21:36:00.481Z
cf_last_run_model: Perplexity sonar-pro
google_books_url: https://www.google.com/books/edition/Data_Oriented_Programming/HbFjEAAAQBAJ
---

[[organizations/Manning Press|Manning Press]]

# Data-Oriented Programming
![Book cover of “Data-Oriented Programming” published by Manning](https://miro.medium.com/v2/resize:fit:1400/1*AS7dRrqkM7TRxWIuqDN8_Q.jpeg)

_*Data-Oriented Programming* is a practical software-engineering book that teaches developers how to radically simplify applications by treating data as immutable, schema-first structures rather than behavior-centric objects.[4]_  

This source is a **book** by software developer and architect **Yehonathan Sharvit**, first published by **Manning Publications** in 2022 as a hands-on guide to applying data-oriented ideas across languages like JavaScript, Clojure, and Java.[4][3] It introduces a small set of clear principles—immutability, modeling “the whole data, and nothing but the data,” and separating data from behavior—to help teams reduce accidental complexity in real-world systems.[3][1] Innovation consultants return to it because it gives an actionable, language-agnostic framework for designing data-centric systems that scale in complexity without collapsing under their own abstractions.[4][3]  

---

## Type and Format

- **Type:** This source is a **book**.[4]  

- **Format details**
  - **Publisher:** Manning Publications.[4]  
  - **Year of first publication:** 2022 (Manning lists the print publication year as 2022).[4]  
  - **Length:** The Manning catalog describes it as a complete book; external listings indicate approximately 300+ pages (exact page count varies by edition).[4]  
  - **Notable editions:** Available in print (paperback) and eBook formats via Manning, with a liveBook online reading experience.[4]  

- **Where it lives:**
  - [Homepage](https://www.manning.com/books/data-oriented-programming) — Manning’s official page for *Data-Oriented Programming* (description, TOC, purchase, and online reading).[4]  
  - [Google Books](https://www.google.com/books/edition/Data_Oriented_Programming/HbFjEAAAQBAJ) — canonical Google Books entry for *Data-Oriented Programming*.[4]  

---

## The People Behind It

- **Author: Yehonathan Sharvit**
  - Sharvit is a software developer and consultant with over 20 years of experience, working on web applications in domains such as education, finance, and mass media.[3][4]  
  - He is known in the Clojure community for his focus on declarative and data-centric approaches and for writing and speaking about Clojure, functional programming, and data orientation.[3]  
  - In addition to *Data-Oriented Programming*, he has authored posts and talks on “what is Data Oriented Programming” and how it relates to functional programming, framing DOP as “a rebellion against OOP’s sacred paradigms.”[3]  

No other co-authors or editors are prominently credited as primary creators of the book on the publisher’s page.[4]  

---

## Catalog of Notable Works

For a **book**, this section highlights key chapters / arguments. Chapter names and themes are taken from the publisher’s description and table of contents where available.[4]  

- **“What is data-oriented programming?”** — Introduces DOP as a way to “model data as data,” contrasting it with object-oriented programming and explaining why data immutability and schema-centric design reduce accidental complexity.[3][4]  
- **Principles of data-oriented programming** — Lays out core principles such as: keep data immutable, represent “the data, the whole data, and nothing but the data,” and separate operations from data, aligning with formulations later echoed in Java DOP discussions.[3][1][8]  
- **Modeling application state as immutable data** — Shows how to represent application state using simple, immutable data structures and how this makes reasoning, testing, and evolution of systems easier.[3][4]  
- **Validation at the boundaries** — Argues that systems should validate data at the boundaries (APIs, IO) rather than scattering validation logic through business code, which closely aligns with Brian Goetz’s “validate at the boundary” DOP principle.[1][8]  
- **Decoupling behavior from data** — Demonstrates how to keep business logic and operations separate from data structures, using patterns and tools from functional programming to operate on plain data.[3][4]  
- **Migrating from OOP to DOP** — Provides practical refactoring strategies to move from class-heavy, object-oriented designs to data-centric designs without rewriting entire systems, making the book actionable for existing codebases.[4]  
- **DOP across languages (JavaScript, Clojure, Java)** — Shows how DOP ideas are “universally applicable” by implementing the same concepts in different languages, helping readers see DOP as a paradigm rather than a language feature.[4][3]  

(Exact chapter titles may differ slightly between the publisher’s marketing copy and the internal table of contents, but these bullets reflect the major arguments as described by Manning and the author.[4][3])  

---

## Why It Matters to Innovators

- **Clarifies “data as the product” thinking.** The book reframes software design around modeling “facts” about the domain in high-fidelity, language-agnostic data structures, which matches how innovative organizations increasingly treat data as a core product asset.[3][4] This directly supports vault ideas like [[concepts/Data as a Product]] and [[concepts/Domain Modeling]].  
- **Installs a simple mental model for taming complexity.** DOP’s principles—immutable data, modeling the whole data, making illegal states unrepresentable, and validating at the boundary—offer a compact checklist for reducing accidental complexity in evolving systems, complementing [[concepts/Functional Programming]] and [[concepts/Clean Architecture]].[3][1][8]  
- **Provides a migration path from legacy OOP systems.** By framing DOP as a “rebellion against OOP’s sacred paradigms” rather than a new language, the book gives concrete patterns for incrementally refactoring object-heavy systems toward data-centric designs without big-bang rewrites.[3][4] This is highly relevant for innovators modernizing [[concepts/Legacy Systems Modernization]].  
- **Supports cross-language, polyglot teams.** Because Sharvit illustrates DOP in JavaScript, Clojure, and Java, the patterns travel well across stacks, making it a shared reference for teams working in mixed ecosystems (front-end, back-end, data pipelines).[4][3]  
- **Aligns with emerging platform features (e.g., Java’s records and pattern matching).** The broader DOP movement in Java leverages records, sealed classes, and pattern matching to “model data as data,” so the conceptual foundation in this book helps leaders anticipate and exploit these language trends for cleaner platform design.[8][1]  

---

## Best Starting Points

- [Manning book description & “About this Book”](https://www.manning.com/books/data-oriented-programming) — The publisher’s overview and sample pages concisely explain the premise, audience, and benefits, making this the best high-level orientation.[4]  
- **Chapter / section: “What is Data-Oriented Programming?”** — Sharvit’s own explanation of DOP and its relationship to functional programming, which crystallizes the mindset shift required; a similar framing appears in his “What is Data Oriented Programming?” article.[3][4]  
- [InfoQ article “Data Oriented Programming in Java”](https://www.infoq.com/articles/data-oriented-programming-java/) — Not part of the book but tightly aligned; it shows how DOP ideas manifest in Java with records, sealed classes, and pattern matching, making the paradigm concrete for Java-heavy teams.[8]  
- [“Data-Oriented Programming in Java 21” talk](https://www.youtube.com/watch?v=8FRU_aGY4mY) — A conference talk by Nicolai Parlog that translates DOP principles into modern Java code, useful as a quick, visual complement to the book for technical stakeholders.[7][1]  

---

## Adjacent Sources

- [[Vocabulary/Domain-Driven Design|Domain-Driven Design]] — DDD also centers domain models; contrasting DOP’s “data, the whole data, and nothing but the data” with DDD’s rich domain objects is a productive design conversation.[3]  
- [[sources/Clojure_for_the_Brave_and_True]] — Another [[Tooling/Software Development/Programming Languages/Clojure]]-centered resource that emphasizes treating data structures as primary and functions as operations over data.  
- [[Sources/Books/Clean Architecture|Clean Architecture]] — A broader architectural framing that pairs well with DOP’s emphasis on keeping core business data structures independent of technical infrastructure.  
- [[concepts/Immutable_Data_Structures]] — Core technical concept underlying DOP’s insistence on immutable data.[3][1]  
- [[Vocabulary/Functional Programming|Functional Programming]] — The conceptual backdrop for many of DOP’s practices, especially separation of data and behavior and pure operations over data.[3]  

![Diagram contrasting an object-oriented model (objects with methods) versus a data-oriented model (plain immutable data plus separate operations)](https://i.ytimg.com/vi/yy8jQgmhbAU/maxresdefault.jpg)


***

# Sources

[1]: [Data-Oriented Programming in Java - Version 1.1](https://inside.java/2024/05/23/dop-v1-1-introduction/)
[2]: [Data-oriented design - Wikipedia](https://en.wikipedia.org/wiki/Data-oriented_design)
[3]: [Review: What is Data Oriented Programming? - ClojureVerse](https://clojureverse.org/t/review-what-is-data-oriented-programming/6065)
[4]: [Data-Oriented Programming - Manning Publications](https://www.manning.com/books/data-oriented-programming)
[5]: [A curated list of data oriented design resources. - GitHub](https://github.com/dbartolini/data-oriented-design)
[6]: [Data-Oriented Design (Or Why You Might Be Shooting Yourself in ...](https://gamesfromwithin.com/data-oriented-design)
[7]: [Data Oriented Programming in Java 21 by Nicolai Parlog - YouTube](https://www.youtube.com/watch?v=8FRU_aGY4mY)
[8]: [Data Oriented Programming in Java - InfoQ](https://www.infoq.com/articles/data-oriented-programming-java/)
