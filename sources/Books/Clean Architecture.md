---
amazon_url: https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164
date_created: 2025-03-30
date_modified: 2026-05-12
cf_last_run: 2026-05-10T03:39:28.279Z
cf_last_run_model: Perplexity sonar-pro
google_books_url: https://books.google.com/books?id=9Xl-DwAAQBAJ
---

# Clean Architecture
_Published on September 10, 2017._

![Book cover of "Clean Architecture: A Craftsman's Guide to Software Structure and Design" by Robert C. Martin, showing concentric circles diagram](https://rizwancode.com/images/Blogs/clean-architecture-dotnet.svg)

*_Clean Architecture is Robert C. Martin's seminal 2017 book outlining a layered software design philosophy that prioritizes business rules at the core, insulating them from frameworks and externalities.*_

Robert C. Martin, known as Uncle Bob, first published it in 2017 through Prentice Hall; consultants return to it for its timeless dependency rule that ensures adaptable, testable codebases amid shifting tech stacks. [^jww0jj]

# Type and Format

**Type:** This source is a book. [^jww0jj]

**Format details:** Published by Prentice Hall (Pearson), first edition 2017, approximately 432 pages, with no major revised editions noted in discussions of its core principles. [^jww0jj]

**Where it lives:** [Google Books](https://books.google.com/books?id=9Xl-DwAAQBAJ) — canonical preview and purchase link for "Clean Architecture: A Craftsman's Guide to Software Structure and Design" by Robert C. Martin. [^jww0jj]

# The People Behind It

- Robert C. Martin (Uncle Bob) is a software craftsman, author, and influencer in clean code practices, founder of Object Mentor Inc., and president of the board of the Agile Alliance. [^yp7efi] [^jww0jj]
- He authored prior foundational books like "[[Vocabulary/Clean Code|Clean Code]]" (2008) and "The Clean Coder" (2011), establishing his authority on principled software engineering. [^yp7efi]
- Martin developed Clean Architecture as an evolution of his earlier paradigms, drawing from [[Vocabulary/Domain-Driven Design|DDD]] influences to emphasize entities with reusable business logic. [^yp7efi]

# Catalog of Notable Works

This section lists key chapters or major arguments from the book, as direct chapter titles are referenced indirectly through principles in implementations:

- **Entities** — Core business objects encapsulating data and fundamental business rules, independent of frameworks, UI, or databases. [^4qjrkf] [^yp7efi]
- **Use Cases** — Application-specific orchestrators that flow data to/from entities, implementing complex business logic without polluting the domain core. [^55bnvt] [^y5k72s]
- **The Dependency Rule** — All dependencies point inwards toward higher-level modules, with business rules at the center, decoupling from externalities like databases. [^55bnvt] [^y5k72s] [^jww0jj]
- **Domain Layer** — Houses enterprise-wide business rules in entities, forming the innermost testable core. [^55bnvt]
- **Application Layer** — Encapsulates use cases that depend on the domain, enabling adaptability without core changes. [^55bnvt] [^y5k72s]
- **Rich vs. Anemic Domain Models** — Entities capture high-level business rules flexibly, supporting both styles without architectural flaws. [^y5k72s]
- **Layers and Boundaries** — Use-case layer depends on entities; infrastructure depends outward, inverting traditional database-centric designs. [^y5k72s]

# Why It Matters to Innovators

- Establishes credibility through Uncle Bob's decades of practice, proven in .NET, Java, and beyond, making it a battle-tested antidote to brittle, framework-locked codebases. [^6ixreq] [^jww0jj]
- Teaches the [[concepts/Dependency Inversion]] mental model via concentric layers, diagnosing overspecialization to vendor tech and illuminating resilient software innovation. [^55bnvt] [^y5k72s] [^jww0jj]
- Frames business rules as the true center (`"The business rules are [at the core]"`[^y5k72s]), helping innovators build adaptable systems that evolve with market shifts rather than tech hype.
- Enables rapid prototyping of scalable apps by prioritizing testable entities and use cases, countering "anaemic models" with reusable domain logic. [^4qjrkf] [^yp7efi]
- Installs single-responsibility encapsulation in entities (`"Each entity should have one reason to change"[^4qjrkf]`), fostering modular innovation akin to [[concepts/Domain-Driven Design]].

# Best Starting Points

- [The Clean Architecture (Uncle Bob's original blog post)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) — 2012 essay that seeds the book's Dependency Rule, ideal accessible intro before the full read. [^jww0jj]
- **Chapter on Entities** — Defines core objects with business logic, the simplest entry to grasp independence from externalities. [^4qjrkf] [^yp7efi]
- [Building Your First Use Case With Clean Architecture](https://www.milanjovanovic.tech/blog/building-your-first-use-case-with-clean-architecture) — Practical tutorial applying the book's layers to user registration, bridging theory to code. [^55bnvt]
- **The Dependency Rule** — Canonical principle ensuring inward dependencies, the substantive heart for architects. [^y5k72s] [^jww0jj]
- [Clean Architecture- Implementing Entity Framework Core (YouTube)](https://www.youtube.com/watch?v=HCuoBwXS95o) — Video demo of book principles in a real template, for visual learners. [^6ixreq]

# Adjacent Sources

- [[Clean Code]] — Prior Uncle Bob book on code craftsmanship, foundational to Clean Architecture's entity principles. [^yp7efi]
- [[Domain-Driven Design]] — Eric Evans' work mapping to Clean Architecture's entities+value objects+services. [^yp7efi]
- [[The Pragmatic Programmer]] — Complementary software best practices often paired in clean code discussions.
- [[Vocabulary/Continuous Refactoring|Refactoring]] — Martin Fowler's guide to evolving codebases, cited alongside for dependency management.
- [[Vocabulary/Domain-Driven Design|Domain-Driven Design]] — Core concept directly influencing the book's domain layer.


***

# Sources

[^4qjrkf]: [2 - Clean Architecture: Entities and Business Logic - DEV Community](https://dev.to/dazevedo/2-clean-architecture-entities-and-business-logic-2lb6)
[^55bnvt]: [Building Your First Use Case With Clean Architecture](https://www.milanjovanovic.tech/blog/building-your-first-use-case-with-clean-architecture)
[^y5k72s]: [Implementing Clean Architecture, DDD-style, with .NET Core](https://werkenbij.vxcompany.com/blogs/implementing-clean-architecture)
[^6ixreq]: [Clean Architecture- Implementing Entity Framework Core - YouTube](https://www.youtube.com/watch?v=HCuoBwXS95o)
[^yp7efi]: [Clean Architecture - Entities - People are Confused? - Google Groups](https://groups.google.com/g/clean-code-discussion/c/mvP_NR2MUPc/m/wrkHHxzkDQAJ)
[^jww0jj]: [This is not exactly The Clean Architecture style #482 - GitHub](https://github.com/jasontaylordev/CleanArchitecture/discussions/482)
