---
title: Ways We Avoid Hard Validation
lede: Prevent build failures and gracefully handle frontmatter inconsistencies.
date_authored_initial_draft: 2025-05-10
date_authored_current_draft: 2025-05-10
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: Draft
augmented_with: Windsurf Cascade on GPT 4.1
category: Prompts
image_prompt: "A limousine convertable with a group of young office workers is driving along a road. The road is layed out traveling from the bottom to the top of the image. The road is several lanes.  The limousine is actively moving to the left to avoid an 'Errors' sign in the right lane. The sign is very prominant and colored red and yellow."
date_created: 2025-05-10
date_modified: 2025-05-10
tags: [Data-Integrity, Content-Rendering, Content-Collections]
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-14_banner_image_Ways-We-Avoid-Hard-Validation_41144485-5d75-4d1d-8ed7-2744c12c4118_Nyo-YvNoM.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-14_portrait_image_Ways-We-Avoid-Hard-Validation_94a115d4-e86c-483d-a096-55ba0a292e06_z13j0PbQP.webp
---

# Slugs

Our content team does not reliably have slug properties in frontmatter. Unitl they solve for that, we must generate a slug from the filename. 

Slugs are generated from the filename. This is most reliably performed from using the filesystem to get the actual path, then removing the part of the string that comes before the last "/", then popping the extension off the end of the string. Then we need to assure there are no " " space characters, by replacing them with "-" if they are present.  Then we need to lowercase the string.

# Strings to Arrays

Our content team sometimes uses strings as values where they should be arrays. We must normalize these to arrays. "tags" is the most common example. However, "authors" and "categories" are also examples. 

With authors and categories, sometimes *the key value is singular rather than plural*. For example, "author" or "category". We must see "categories" and "category" as the same key, and normalize the value to an array.  We must see "author" and "authors" as the same key, and normalize the value to an array. 

