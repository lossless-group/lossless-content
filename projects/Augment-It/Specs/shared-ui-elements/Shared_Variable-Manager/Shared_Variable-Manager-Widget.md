---
site_uuid: f43eb570-8f45-4ffe-bd91-2e8f4f0a664d
publish: true
title: Shared Variable Manager
slug: sharedvariable-manager
at_semantic_version: 0.0.0.1
authors:
  - Tanuj Siripurapu
  - Michael Staton
date_created: 2025-08-09
date_modified: 2025-08-09
aliases: [Shared Variable Manager]
---
The [[projects/Augment-It/Specs/shared-ui-elements/Shared_Variable-Manager/Shared_Variable-Manager-Widget|Shared Variable Manager]] is a Widget giving the user an interface to create variables as key value pairs, they may be created from selected text as either the value or the key. They will be able to map keys to values in instances where they are selecting from structured data, such as from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]]

that will might be used in:



|     |                                                                                                                                                                                                                                                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | create a variable that can be used in prompt templates and map fields from the [[projects/Augment-It/Specs/apps-microfrontends/RecordCollector\|RecordCollector]]                                                                                                                                                                                               |
|     | select text from the PromptTemplate and convert it into a variable template with `{{key_name}}`, replacing selection with the variable in the Template, and applying the template variable to the [[projects/Augment-It/Specs/apps-microfrontends/RequestReviewer\|RequestReviewer]]                                                                            |
|     | select text from the [[projects/Augment-It/Specs/apps-microfrontends/ResponseReviewer\|ResponseReviewer]] and creating a variable by naming the key. The selection then gets converted into the value, and the variable is then both stand alone and may appear in a Highlight in the [[projects/Augment-It/Specs/apps-microfrontends/HighlightCollector\|HighlightCollector]] |
|     | select text from a Highlight in the [[projects/Augment-It/Specs/apps-microfrontends/HighlightCollector\|HighlightCollector]], and convert it into a variable value by naming a new key or assigning it to an existing key.                                                                                                                                      |
|     | select text from the aggregate insight in the [[projects/Augment-It/Specs/apps-microfrontends/InsightAssembler\|InsightAssembler]] and convert it into a variable value by naming a new key or assigning it to an existing key.                                                                                                                                 |
|     | view all key value pairs as part of the insight object that can be pushed into a Target Data Store.                                                                                                                                                                                                                                              |
|     |                                                                                                                                                                                                                                                                                                                                                  |

[[projects/Augment-It/Specs/apps-microfrontends/RecordCollector|RecordCollector]]
[[projects/Augment-It/Specs/apps-microfrontends/PromptTemplateManager|PromptTemplateManager]]
[[projects/Augment-It/Specs/apps-microfrontends/RequestReviewer|RequestReviewer]]
[[projects/Augment-It/Specs/apps-microfrontends/ResponseReviewer|ResponseReviewer]]
[[projects/Augment-It/Specs/apps-microfrontends/HighlightCollector|HighlightCollector]]
and [[projects/Augment-It/Specs/apps-microfrontends/InsightAssembler|InsightAssembler]]

