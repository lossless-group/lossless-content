---
aliases:
  - licensing strategy
date_created: 2024-08-24
date_modified: 2026-05-14
title: Open Source Licenses
tags:
  - Open-Source
  - Emergent-Innovation-Examples
authors:
  - Michael Staton
---

# Open Source Licenses

A working reference for the licenses that show up most often when surveying open source, source-available, and "open-ish" projects. Roughly grouped: permissive → weak copyleft → strong copyleft → network copyleft → public-domain dedications → source-available (not OSI-approved). For the philosophical frame, see [[Copyleft]].

## Permissive

### MIT License
The MIT License is the shortest and most-adopted permissive license in open source — a few sentences granting unlimited rights to use, copy, modify, merge, publish, distribute, sublicense, and sell, conditioned only on preserving the copyright notice and the license text in copies of the software. It imposes no patent grant and no obligation to share modifications, which is exactly why it dominates the JavaScript ecosystem and most modern startups' OSS releases — companies can fork, embed in proprietary products, and relicense downstream without contagion risk. Its weakness is the silent patent question: contributors who hold patents on their contributions have not explicitly granted patent rights, leaving a theoretical (and occasionally litigated) gap that the Apache 2.0 license closes.

### BSD Licenses (2-Clause and 3-Clause)
The BSD family descends from the original Berkeley Software Distribution license and comes in two modern OSI-approved forms: 2-Clause ("Simplified BSD" / "FreeBSD License") and 3-Clause ("New BSD" / "Modified BSD"). Both are functionally similar to MIT — permissive, allow proprietary derivatives, require attribution — but the 3-Clause adds a "no-endorsement" clause forbidding the use of the project's name or its contributors' names to promote derivative products without permission. The 2-Clause drops that endorsement restriction. BSD-style licensing underpins large swaths of systems software (FreeBSD, OpenBSD, much of macOS's userland inheritance, Go, NGINX) and remains the preferred license when authors want MIT-style freedom but with a slightly stronger trademark/identity boundary.

### Apache License 2.0
The Apache 2.0 license is the permissive license of choice when patents matter. Like MIT and BSD, it allows proprietary use and modification, but it adds an explicit patent grant from every contributor to every user — and an automatic termination clause: if you sue anyone alleging the licensed work infringes your patents, your license terminates. It also requires that modifications be marked as such and that the NOTICE file (if present) be preserved. This combination — permissive use with patent peace — has made it the default for large foundation-stewarded projects ([[Apache Software Foundation]], [[Kubernetes]], Android's userspace, most CNCF projects, most major ML frameworks including TensorFlow and PyTorch's licensing posture). Its formality makes it slightly heavier than MIT, but for any project with non-trivial corporate adoption it is the safer permissive default.

### ISC License
The ISC License is a permissive license functionally equivalent to the 2-Clause BSD and to MIT, originally written for the Internet Systems Consortium (the maintainers of BIND and OpenBSD). It is essentially MIT with slightly tighter wording — the same minimal "preserve the copyright notice, no warranty" deal — and is the default license for npm's own packages and much of the OpenBSD userland. There is no practical difference for users between MIT and ISC; the choice is stylistic or historical.

## Weak Copyleft

### Mozilla Public License 2.0 (MPL 2.0)
The MPL 2.0 is the canonical "file-level" weak copyleft license: any source file that originates from or is modified from MPL-covered code must remain under MPL 2.0 and have its source made available, but new files added to the same project — and code that merely *uses* MPL-licensed code via a standard interface — can be licensed however the developer wants, including proprietary. This makes it a practical middle ground for projects (notably Firefox, Thunderbird, Rust's standard library historically, and many [[organizations/Mozilla|Mozilla]] codebases) that want their core code to stay open while permitting commercial extensions and integration into closed products. It also includes an Apache-style explicit patent grant and termination, which the LGPL conspicuously lacks.

### GNU Lesser General Public License (LGPL v2.1, v3)
The LGPL was designed by the [[Free Software Foundation]] for shared libraries that the FSF wanted to make available to proprietary applications without forcing the entire application open — the canonical example is glibc, the GNU C library underneath Linux. LGPL-licensed code itself must remain LGPL, and modifications to LGPL code must be released as LGPL source, but applications that merely *link against* the library (whether dynamically or, with extra requirements, statically) are not infected. The "extra requirements" for static linking — providing object files so users can relink against modified library versions — are why most modern projects prefer dynamic linking under LGPL or simply choose MPL/Apache instead. LGPL v3 inherits GPL v3's anti-tivoization and patent termination clauses.

### Eclipse Public License 2.0 (EPL 2.0)
The EPL 2.0, stewarded by the [[Eclipse Foundation]], is a weak-copyleft license analogous in spirit to MPL — modifications to EPL-covered files must be released under EPL, but EPL code can be combined with proprietary code via "modules" that interact through defined interfaces without infecting the proprietary side. EPL is the dominant license across the Eclipse ecosystem and many enterprise Java projects (Jetty, EclipseLink, large portions of the Java tooling world). EPL 2.0 added an optional "Secondary License" clause allowing redistribution under the GPL when both parties agree — a pragmatic concession to GPL-only ecosystems that EPL 1.0 had been awkwardly incompatible with.

## Strong Copyleft

### GNU General Public License v2 (GPLv2)
The GPLv2, published in 1991 by the [[Free Software Foundation]], is the historical flagship of strong copyleft and remains in widespread use largely because the [[organizations/The Linux Foundation|Linux]] kernel is licensed under "GPLv2 only" and is the most-deployed piece of GPLv2 code on Earth. Its core bargain: any work that "contains or is derived from" GPL code, when distributed, must be distributed under GPLv2 with complete corresponding source code. This is the "viral" clause that makes corporate counsel nervous and that ensures, for example, that consumer routers shipping Linux must publish kernel source. GPLv2 predates the modern internet's patent-troll landscape and lacks an explicit patent grant, which is the principal gap GPLv3 was written to close.

### GNU General Public License v3 (GPLv3)
The GPLv3 (2007) is GPLv2's modernization: it adds an explicit patent grant with retaliation termination (suing over patents in the covered work terminates your license), an anti-tivoization clause (devices that use GPLv3 code must allow users to install modified versions — a direct response to TiVo shipping GPL'd Linux on locked-down hardware), and compatibility with the Apache 2.0 license. The kernel community famously declined to upgrade Linux from v2 to v3, citing the anti-tivoization clause's impact on embedded vendors, which is why "GPLv2 only" persists as a distinct ecosystem from "GPLv3 or later." GPLv3 underpins the GNU userland, GCC, Bash, Emacs, and most FSF-stewarded software.

### GNU Affero General Public License (AGPL v3)
The AGPL closes what the FSF calls the "SaaS loophole" in GPL: under GPL, copyleft obligations are triggered only by *distribution*, so a company can modify GPL code, run it on a server, and serve users over the network without ever releasing source. AGPL extends the trigger to network use — if you let users interact with AGPL-licensed software over a network, you must make your modifications' source available to those users. This makes AGPL the license of choice for projects that want to prevent hyperscaler embrace-and-extend (MongoDB before its SSPL pivot, Grafana's earlier history, [[NextCloud]], Mastodon, and many "we want to be open but not Amazon-bait" projects). Most corporate legal departments forbid AGPL code in internal stacks because of the network-trigger uncertainty; that aversion is precisely the moat the license is designed to create.

## Public-Domain Dedications

### The Unlicense
The Unlicense is a public-domain *dedication* — a statement by the author that they relinquish all copyright in the work and place it in the public domain, with a fallback permissive license for jurisdictions (notably most of continental Europe) where authors cannot legally abandon copyright. It is the maximally permissive option: no attribution requirement, no warranty, no patent grant. Critics (including the FSF and OSI's general guidance) prefer CC0 or a standard permissive license like MIT because the Unlicense's legal craftsmanship is thinner and its enforceability in non-US jurisdictions is questioned, but it remains in use across many small utility projects and is OSI-approved as of 2020.

### Creative Commons Zero (CC0 1.0)
CC0 is [[Creative Commons]]'s public-domain dedication, intended primarily for creative works (documentation, datasets, fonts, art assets) but increasingly used for code. Like the Unlicense, it waives copyright to the maximum extent possible and includes a fallback license for jurisdictions where waiver is impossible. CC0 explicitly does *not* grant patent or trademark rights, which is why OSI declined to certify CC0 for software in 2012 — making it the standard choice for data and content but a contested choice for code. For data releases (OpenStreetMap-adjacent corpora, public-sector data dumps, ML training corpora) CC0 is effectively the canonical "use this however you want" mark.

## Source-Available (Not OSI-Approved)

### Business Source License (BSL / BUSL 1.1)
The BSL, originated by [[MariaDB]] and popularized by HashiCorp's 2023 relicensing of Terraform, is a "delayed open source" license: the source is published and modifiable for non-production use immediately, restricted from competing commercial use, and then automatically converts to a true open-source license (commonly Apache 2.0) after a defined change date — typically four years. It is explicitly *not* OSI-approved because the time-limited production-use restriction violates the Open Source Definition's "no discrimination" clauses, but it has become the dominant template for venture-backed infrastructure companies (HashiCorp, CockroachDB, Sentry, MariaDB MaxScale) trying to preserve commercial moats while preserving most developer-facing freedoms. The OpenTofu fork of Terraform exists precisely because the BSL transition broke the OSS social contract for a meaningful subset of users.

### Server Side Public License (SSPL)
The SSPL, introduced by [[MongoDB]] in 2018 and later adopted by Elastic for Elasticsearch and Kibana, is AGPL pushed further: not only must you release modifications to network-served code, you must also release the *entire surrounding service stack* — orchestration, monitoring, management software — under SSPL. The OSI rejected SSPL as non-conformant with the Open Source Definition because the surrounding-stack requirement effectively makes the license unusable for any commercial cloud provider, which was its explicit goal (preventing AWS from selling managed MongoDB without contributing back). SSPL is therefore correctly described as "source-available" rather than "open source," and its adoption marked the beginning of the broader 2018–2024 wave of post-open-source licensing experiments — BSL, the Elastic License v2, the Confluent Community License, and others in the same defensive lineage.

## See Also

- [[Copyleft]]
- [[Free Software Foundation]]
- [[Apache Software Foundation]]
