---
date_created: 2026-03-09
date_modified: 2026-03-09
---

- Making up reference URLs -- URL Checker
- Duplicates headers.  
- Hallucinating Use of Proceeds.  Confusing competitor information for company information. 
-  Custom thesis
	- Digest previous chats for unique insights yaml
	- Competitive analysis shaping
- Include Sources in settings. 
	- Move unsubstantiated claims to an investigate.yaml or .md file. 
- Sunny (Sikh from Alpha School)
- build off previous or ignore previous
- 
- 


Versioning Manually

⏺ The simplest correct approach: set latest_version in versions.json to the value we want the
   run to produce, but tweak the get_next_version logic so that if the latest version was a
  promotion (no associated output directory), it re-uses that version instead of
  incrementing. That's too complex for a one-off.

  Most pragmatic: just write versions.json so latest = v0.0.1, and after the run starts and
  creates v0.0.2, rename the output directory. But that breaks state.

  OK — truly simplest: set latest_version to something that, when patch-incremented, wraps.
  Since it won't wrap, let me just modify get_next_version to check if the latest version has
   no output directory (meaning it was promoted but never used), and return it as-is.