---
site_uuid: 56fa92d5-dda0-462f-80b1-ec0465720fbe
url: https://rubyonrails.org/
image: https://rubyonrails.org/assets/images/opengraph.png
site_name: Ruby on Rails
title: Compress the complexity of modern web apps
og_screenshot_url: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/screenshots/20250529_Ruby_on_Rails_og_screenshot.jpeg
jina_last_request: 2025-03-09T06:45:03.168Z
jina_error: Error occurred
og_last_fetch: 2025-05-29T15:35:50.847Z
date_modified: 2026-11-14
date_created: 2025-03-30
og_image: https://rubyonrails.org/assets/images/opengraph.png
og_url: https://rubyonrails.org/
description: A full-stack web application framework written in Ruby, following the Model View Controller pattern, that includes everything you need to build modern database-backed web apps.
tags:
  - Software-Development
  - Web-Frameworks
aliases:
  - Rails
cf_last_run: 2026-11-14T19:24:43.011Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 1
cf_last_run_retrieval: 2026-11-14T19:24:43.011Z
---


A [[concepts/Explainers for Tooling/Web Frameworks|Web Framework]] written in the [[Tooling/Software Development/Programming Languages/Ruby|Ruby]] programming language.

## Value Proposition & Features

Ruby on Rails is an [[Vocabulary/Open Source Collaborations|open-source]], [[Vocabulary/Full-Stack Development|full-stack]] web framework for [[Tooling/Software Development/Programming Languages/Ruby|Ruby]], designed to reduce web-application complexity through convention, integrated components, and productive defaults. The [[The Rails Foundation]] is a nonprofit organization supporting the framework’s documentation, education, marketing, and events. [^E1]

- **Integrated full-stack toolkit:** Provides the application structure and conventions needed to build database-backed web applications.
- **Active Record:** Supplies an object-relational mapping layer for working with application data and database schemas.
- **Action View and templates:** Supports server-rendered views, including ERB-based templates; Rails 8.2 development is also incorporating tooling for parsing HTML and ERB together. [8]
- **Security and maintenance:** Official releases address vulnerabilities across areas such as Active Storage, Strong Parameters, Action View, and Active Support. [1]
- **Multi-database support:** Rails documentation work includes refreshed guidance for applications using multiple databases. [3]
- **Hotwire integration:** The project is adding a dedicated Hotwire guide to its official edge guides. [7]
- **Testing ecosystem:** Community projects such as FixtureKit target faster fixture-based testing for Rails 8 applications. [9]

## Product Roadmap / Announcements

As of November 13, 2026,

- **November 13, 2026:** Rails published a Hotwire guide for its edge documentation and reported 41 contributors to the codebase during the week. [7]
- **November 13, 2026:** The Rails team highlighted Herb and ReActionView as tooling intended to improve template validation and reactivity, with Herb planned for Rails 8.2. [8]
- **November 4, 2026:** Rails 8.0.5.2 and 8.1.4.1 were released as security updates addressing 21 issues. [1]

## Recent Developments

- Rails 8.0.5.2 and 8.1.4.1 addressed vulnerabilities involving Active Storage processing, Strong Parameters, XSS, denial-of-service vectors, and other components. [1]
- Recent development work includes safer secret handling, JSON message serialization defaults, ZJIT configuration, Ractor-related hooks, and a higher minimum MySQL version. [4]
- Performance work has targeted string blank checks, Active Record attribute handling, collection rendering, database connection tracking, and SQLite rollback behavior. [5]

# History and Origin Story

Ruby on Rails is the framework associated with [[Sources/People/David Heinemeier Hansson|David Heinemeier Hansson]], who created it while developing Basecamp at [[organizations/37 Signals|37signals]]. The project evolved from an internal application framework into a widely used open-source web framework, while current stewardship includes the [[The Rails Foundation]], identified in the supplied material as founded in 2022. [^E1]

## Notable Team Members

David Heinemeier Hansson is the creator associated with Ruby on Rails and is also identified in the supplied vault context as a co-author of *[[Sources/Books/Rework|Rework]]* and *[[Sources/Books/Getting Real|Getting Real]]*.

The current public material identifies contributors and maintainers rather than presenting a conventional corporate executive roster; one recent Rails update reported 41 code contributors during a single week. [7]

# Competitive Landscape

## Who it's for, who it's not for

Rails is suited to teams building database-backed web applications that value integrated conventions, productive defaults, and a full-stack framework. Its active development covers application structure, persistence, views, security, testing, deployment concerns, and increasingly integrated frontend workflows. [1][3][7]

It is less suitable for teams seeking a frontend-only framework, a minimal unopinionated backend toolkit, or a platform whose primary language is not Ruby.

## Viable Alternatives

- **[[Tooling/Software Development/Frameworks/Web Frameworks/Django|Django]]:** A Python full-stack web framework for teams preferring Python.
- **[[Tooling/Software Development/Frameworks/Web Frameworks/Laravel|Laravel]]:** A PHP web framework with an integrated application stack.
- **[[Spring Boot]]:** A Java ecosystem option for enterprise-oriented services.
- **[[Tooling/Software Development/Frameworks/Web Frameworks/DotNET|ASP.NET]] Core:** A .NET framework for teams centered on C# and Microsoft infrastructure.
- **[[Tooling/Software Development/Frameworks/Web Frameworks/Express.js|Express.js]]:** A JavaScript/Node.js backend framework offering a smaller core and more composable architecture.

## Competitor Table

| Competitor                                                     | Description                                                                                                                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Django](https://www.djangoproject.com/)                       | [[Tooling/Software Development/Programming Languages/Python\|Python]]-based full-stack web framework and a direct alternative for convention-driven application development. |
| [Laravel](https://laravel.com/)                                | [[Tooling/Software Development/Programming Languages/PHP\|PHP]] web framework with integrated tooling for common application tasks.                                          |
| [Spring Boot](https://spring.io/projects/spring-boot)          | [[Tooling/Software Development/Programming Languages/Java\|Java]] framework commonly used for production services and enterprise applications.                               |
| [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet) | [[organizations/Microsoft\|Microsoft]]’s cross-platform web framework for .NET and C# applications.                                                                          |
| [Express](https://expressjs.com/)                              | Minimal [[Tooling/Software Development/Developer Experience/DevTools/Node.js\|Node.js]] web framework emphasizing composability over an integrated full-stack opinion.       |


***

# Sources

[1]: 2026, Nov 04. [rubyonrails.org](https://rubyonrails.org/). [Rails Versions 8.0.5.2 and 8.1.4.1 have been released!](https://rubyonrails.org/2026/11/4/Rails-8.0.5.2-and-8.1.4.1-have-been-released). Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[2]: 2026, Nov 06. [rubyonrails.org](https://rubyonrails.org/). [This Week in Rails: November 6, 2026](https://rubyonrails.org/2026/11/6/this-week-in-rails). Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[3]: 2026, Oct 30. [rubyonrails.org](https://rubyonrails.org/). [No tricks, just treats](https://rubyonrails.org/2026/10/30/this-week-in-rails). Updated: 2026, Nov 01. Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[4]: 2026, Oct 23. [rubyonrails.org](https://rubyonrails.org/). [Safer secrets, ZJIT, and more!](https://rubyonrails.org/2026/10/23/this-week-in-rails). Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[5]: 2026, Oct 16. [rubyonrails.org](https://rubyonrails.org/). [Faster blank? checks, safer SQLite rollbacks, and more!](https://rubyonrails.org/2026/10/16/this-week-in-rails). Updated: 2026, Oct 17. Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[6]: 2026, Oct 26. [discuss.rubyonrails.org](https://discuss.rubyonrails.org/). [Community support: SF Ruby Conf scholarship program (free access to students and newcomers)](https://discuss.rubyonrails.org/t/community-support-sf-ruby-conf-scholarship-program-free-access-to-students-and-newcomers/91766). Updated: 2026, Nov 12. Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[7]: 2026, Nov 13. [rubyonrails.org](https://rubyonrails.org/). [Hotwire guide and more](https://rubyonrails.org/2026/11/13/this-week-in-rails). Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[8]: 2026, Nov 13. [rubyonrails.org](https://rubyonrails.org/). [On Rails — Marco Roth: Teaching Rails to Read Its Own Template](https://rubyonrails.org/2026/11/13/on-rails-marco-roth-herb-reaction-view). Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[9]: 2026, Oct 28. [discuss.rubyonrails.org](https://discuss.rubyonrails.org/). [Introducing FixtureKit: fixture-speed tests without giving up FactoryBot](https://discuss.rubyonrails.org/t/introducing-fixturekit-fixture-speed-tests-without-giving-up-factorybot/91795). Updated: 2026, Nov 12. Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.
[10]: 2026, Oct 29. [discuss.rubyonrails.org](https://discuss.rubyonrails.org/). [\[GHSA-744p-w4gc-m3gh\] SQL injection through `Trilogy ...](https://discuss.rubyonrails.org/t/ghsa-744p-w4gc-m3gh-sql-injection-through-trilogy-escape-with-multibyte-encodings/91797). Updated: 2026, Nov 13. Generated: 2026, Nov 14. [Perplexity](https://www.perplexity.ai/) API response.

## Sources (retrieved)

[^E1]: [rubyonrails.org](https://rubyonrails.org/). [Ruby on Rails - The Rails Foundation](https://rubyonrails.org/). Generated: 2026, Nov 14. [Exa.ai](https://exa.ai) API response.
