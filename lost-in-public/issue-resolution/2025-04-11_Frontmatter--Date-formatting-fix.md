---
title: 'Frontmatter Date Formatting Fix'
lede: 'Resolving timestamp and quoted date issues in frontmatter'
date_created: 2025-04-11
date_modified: 2025-04-11
authors:
  - Michael Staton
category: Issue Resolution
tags:
  - Frontmatter
  - YAML
  - Date-Formatting
  - Content-Management
---

# Frontmatter Date Formatting Fix

## Issue Description

Content files across the repository had inconsistent date formatting in frontmatter:
1. Some date fields contained timestamps (e.g., `2025-04-07T22:42:08.649Z`)
2. Some date fields were quoted (e.g., `'2025-04-07'`)
3. Some date fields had both issues

This inconsistency caused problems with the filesystem observer and content rendering.

## Solution Implemented

Created a one-off script in `tidyverse/observers/scripts/fix-date-timestamps.ts` that:

1. Uses the Single Source of Truth `formatDate` utility from `tidyverse/observers/utils/commonUtils.ts`
2. Scans markdown files in specified directories
3. Detects date fields with timestamps or quotes
4. Converts all dates to the standard YYYY-MM-DD format without quotes
5. Preserves all other frontmatter and content

### Key Technical Components

1. **Date Detection**: 
   - Regex patterns to identify timestamps and quoted values:
   ```typescript
   // Check if the date has a timestamp
   if (value.includes('T') || /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)) {
     needsFixing = true;
     reason = 'timestamp';
   }
   
   // Direct check for the raw YAML content to find quoted dates
   const datePattern = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`);
   const match = frontmatterContent.match(datePattern);
   if (match) {
     needsFixing = true;
     reason = 'quotes (found in raw YAML)';
   }
   ```
   - Direct examination of raw YAML to catch quoted dates that js-yaml automatically unquotes

2. **Formatting Logic**:
   ```typescript
   // Format the date properly and remove quotes
   let formattedDate = formatDate(value);
   
   // Remove quotes if they exist
   if (typeof formattedDate === 'string') {
     formattedDate = formattedDate.replace(/^['"]|['"]$/g, '');
   }
   ```

3. **Single Source of Truth Date Formatting**:
   ```typescript
   // From commonUtils.ts
   function formatDate(dateValue: any): string | null {
     // If it's already in YYYY-MM-DD format, return it
     if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
       return dateValue;
     }

     // Handle ISO string format with time component
     if (typeof dateValue === 'string' && dateValue.includes('T')) {
       // Just extract the date part
       return dateValue.split('T')[0];
     }
     
     // Format as YYYY-MM-DD
     const date = new Date(dateValue);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}-${month}-${day}`;
   }
   ```

4. **YAML Generation**:
   - Manual YAML construction to avoid js-yaml's automatic formatting
   - Special handling for date fields to prevent quotes and timestamps:
   ```typescript
   // Handle date fields specially to avoid quotes and timestamps
   if (key.startsWith('date_') && value) {
     // Format the date properly - ensure no quotes
     const formattedDate = formatDate(value);
     yamlContent += `${key}: ${formattedDate}\n`;
   }
   ```

## Execution Results

The script successfully processed:
- 330 files in the vocabulary directory
- Fixed 54 files with quoted dates
- Fixed 275 files with timestamps

## Lessons Learned

1. **YAML Parsing Challenges**: The js-yaml library automatically unquotes values when parsing, making it difficult to detect quoted values programmatically.

2. **Single Source of Truth**: Using the existing `formatDate` utility ensured consistent date formatting across the codebase.

3. **Raw Content Examination**: Sometimes examining the raw file content is necessary to detect formatting issues that get normalized during parsing.

## Future Considerations

1. The filesystem observer should be updated to prevent these issues from occurring in new files.

2. Consider adding a validation step in the CI pipeline to catch inconsistent date formatting.

3. The script can be extended to process other content directories as needed.

## Script Location

The fix script is located at:
```
tidyverse/observers/scripts/fix-date-timestamps.ts
```

Run with:
```bash
cd tidyverse/observers/scripts && npx ts-node fix-date-timestamps.ts <directory-path>
```
