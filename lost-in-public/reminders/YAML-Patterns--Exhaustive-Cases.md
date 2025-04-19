---
date_created: 2025-03-24
date_modified: 2025-03-26
---
# YAML Patterns for Data Integrity

This document provides guidelines for maintaining data integrity in YAML frontmatter within markdown files. Following these patterns helps ensure consistent parsing, prevents errors, and enables automation tools to process your content correctly.

## UUID Properties

UUID properties should be formatted without quotes to ensure consistent handling across systems.

| CORRECT | INCORRECT | RULE |
| ------- | --------- | ---- |
| `uuid: ************************************` | `uuid: "************************************"` | UUID properties should not have any quotes surrounding the value |
| `site_uuid: ************************************` | `site_uuid: '************************************'` | Site UUID properties should also not have any quotes |
| `uuid: ************************************` | `uuid:` (empty) | UUID properties should always have a value |

### Detection Function

```javascript
    detectErrorInSiteUUID: {
        exampleErrors: [
            "",
            ```---
            url: https://www.archonlabs.com/
            site_name: Archon Labs'
            ---```,
            ```---
            url: https://www.archonlabs.com/
            site_name: Archon Labs'
            site_uuid:
            ---```,
        ],
        properSyntax: `---
            url: https://www.archonlabs.com/
            site_name: Archon Labs
            site_uuid: 2547def5-fc19-49e2-9c17-e1651c8b6fb5
            ---`,
        detectError: new RegExp(/^(?![\s\S]*?---[\s\S]*?site_uuid:\s*[^\s\n][\s\S]*?---)[\s\S]*$/),
        messageToLog: 'Missing UUID in frontmatter',
        preventsOperations: ['assureYAMLPropertiesCorrect.cjs', 'trackVideosInRegistry.cjs'],
        correctionFunction: 'createUUIDinFrontmatterIfNone',
        isCritical: false
    },
```

### Correction Function


```javascript
   
    async createUUIDinFrontmatterIfNone(markdownContent, markdownFilePath) {
        const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
        if (!frontmatterData.success) {
            return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
        }

        // If no frontmatter exists, create it
        if (frontmatterData.noFrontmatter) {
            const { v4: uuidv4 } = require('uuid');
            const newUUID = uuidv4();
            const newContent = `---\nsite_uuid: ${newUUID}\n---\n${markdownContent}`;
            return {
                ...helperFunctions.createSuccessMessage(markdownFilePath, true, ['Created frontmatter with site_uuid']),
                content: newContent
            };
        }

        const lines = frontmatterData.frontmatterString.split('\n');
        let modified = false;
        let hasUUID = false;

        // Check if site_uuid already exists
        for (const line of lines) {
            if (line.trim().startsWith('site_uuid:')) {
                const value = line.split(':')[1]?.trim();
                if (value && value.length > 0) {
                    hasUUID = true;
                    break;
                }
            }
        }

        // Only add UUID if it doesn't exist or is empty
        if (!hasUUID) {
            const { v4: uuidv4 } = require('uuid');
            const newUUID = uuidv4();
            lines.push(`site_uuid: ${newUUID}`);
            modified = true;
        }

        if (!modified) {
            return helperFunctions.createSuccessMessage(markdownFilePath, false);
        }

        const newFrontmatter = lines.join('\n');
        const correctedContent = markdownContent.slice(0, frontmatterData.startIndex) +
            '---\n' + newFrontmatter + '\n---' +
            markdownContent.slice(frontmatterData.endIndex);

        return {
            ...helperFunctions.createSuccessMessage(markdownFilePath, true, ['Added site_uuid']),
            content: correctedContent
        };
    },

```

```javascript
  
   // Once detected from the detectError regular expression, 
   // the correction function will attempt to fix the error
   // by removing quotes from the UUID property
   async removeDelimitersFromUUIDProperty(markdownFileContent, markdownFilePath) {
      const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
      if (!frontmatterData.success) {
         return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
      }

      let isolatedFrontmatterString = frontmatterData.frontmatterString;
      let wasModified = false;
      const modifications = [];

      const propertyRegex = /^((?:site_)?uuid):[ \t]*["'\`]+([\w-]+)["'\`]+$/m;
      const propertyMatch = isolatedFrontmatterString.match(propertyRegex);
      
      if (propertyMatch) {
         const [fullMatch, propertyName, uuid] = propertyMatch;
         // Remove quotes from UUID property
         const correctedValue = `${propertyName}: ${uuid}`;

         modifications.push({
            property: propertyName,
            from: fullMatch,
            to: correctedValue
         });

         isolatedFrontmatterString = isolatedFrontmatterString.replace(
            fullMatch,
            correctedValue
         );
         wasModified = true;
      }

      if (wasModified) {
         const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
            '---\n' + isolatedFrontmatterString + '\n---' +
            markdownFileContent.slice(frontmatterData.endIndex);

         return {
            ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
            content: correctedContent
         };
      }

      return helperFunctions.createSuccessMessage(markdownFilePath, false);
   },

 
```



## Timestamp Properties

Timestamp properties should use ISO 8601 format with single quotes for consistent processing.

| CORRECT                                         | INCORRECT                                                                                    | RULE                                                      |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `og_last_fetch: 2025-03-09T06:45:20.458Z`       | `og_last_fetch: "2025-03-09T06:45:20.458Z"`<br>`og_last_fetch: "'2025-03-09T06:45:20.458Z'"` | Timestamp properties should be bare                       |
| `og_last_error: '2025-03-09T06:45:20.458Z'`     | `og_last_error: \"2025-03-09T06:45:20.458Z\"`                                                | Use single quotes, not double quotes for timestamp values |
| `last_jina_request: '2025-03-09T06:45:20.458Z'` | `last_jina_request: \"'\\\"2025-03-09T06:45:20.458Z\\\"\"`                                   | Don't nest quotes around timestamp values                 |
| `last_jina_request: '2025-03-09T06:45:20.458Z'` | `last_jina_request: \"'\\\"2025-03-09T06:45:20.458Z\\\"\"`                                   | Don't use escape characters around any value.             |
|                                                 |                                                                                              |                                                           |


| CORRECT                                                                                   | INCORRECT                                                                                        | RULE                                                                                                      |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `og_last_fetch: '2025-03-09T06:45:20.458Z'`<br> `og_last_fetch: 2025-03-09T06:45:20.458Z` | <br>`og_last_fetch: "2025-03-09T06:45:20.458Z"`<br>`og_last_fetch: "'2025-03-09T06:45:20.458Z'"` | Timestamps may be surrounded by exactly one set of single mark delimiters.<br><br>Timestamps may be bare. |
|                                                                                           |                                                                                                  |                                                                                                           |


### Detection Function

```javascript
// Detection Function
detectError: new RegExp(`^(${TIMESTAMP_PROPERTIES.join('|')}):[ \\t]*(?![ \\t]*'[^']*'[ \\t]*$)(.+)$`, 'm')
```

### Correction Function

```javascript
// Ensures timestamp properties have exactly one set of single quotes
async function assureProperQuotesAroundTimestampProperties(markdownFileContent, markdownFilePath) {
   const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
   if (!frontmatterData.success) {
      return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
   }

   let isolatedFrontmatterString = frontmatterData.frontmatterString;
   let wasModified = false;
   const modifications = [];
   const alreadyCorrect = [];

   const errorDetectionRegex = knownErrorCases.assureOnlyOneSetOfSingleMarkQuotesAroundTimestampProperties.detectError;
   const matches = [...isolatedFrontmatterString.matchAll(new RegExp(errorDetectionRegex.source, 'gm'))];
   
   for (const match of matches) {
      const [fullMatch, propertyName] = match;
      const valueWithQuotes = fullMatch.slice(propertyName.length + 1).trim();
      const cleanValue = valueWithQuotes
         .replace(/^[`'"]+/g, '')
         .replace(/[`'"]+$/g, '')
         .replace(/[`'"]/g, '')
         .trim();

      if (valueWithQuotes === `'${cleanValue}'`) {
         alreadyCorrect.push(propertyName);
         continue;
      }

      const correctedValue = `${propertyName}: '${cleanValue}'`;
      modifications.push({
         property: propertyName,
         from: fullMatch,
         to: correctedValue
      });

      isolatedFrontmatterString = isolatedFrontmatterString.replace(
         fullMatch,
         correctedValue
      );
      wasModified = true;
   }

   if (wasModified) {
      const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
         '---\n' + isolatedFrontmatterString + '\n---' +
         markdownFileContent.slice(frontmatterData.endIndex);

      return {
         ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
         content: correctedContent,
         alreadyCorrect
      };
   }

   return helperFunctions.createSuccessMessage(markdownFilePath, false);
}
```

## URL Properties

URL properties should never have quotes and should always be a single, continuous string.

| CORRECT                                            | INCORRECT                                                | RULE                                                                   |
| -------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| `url: https://www.archonlabs.com/`                 | `url: \"https://www.archonlabs.com/\"`                   | URLs should be bare, single line strings with no delimiters            |
| `og_screenshot_url: https://example.com/image.jpg` | `og_screenshot_url: \"'https://example.com/image.jpg'\"` | Multiple or nested quotes around URLs are not allowed                  |
| `favicon: https://example.com/favicon.png`         | `favicon: https://example.com/\\nfavicon.png`            | URLs must not be broken across multiple lines                          |
| `url: https://example.com`                         | `url: ""'https://example.com'""`                         | Multiple or nested quotes around URLs are not allowed                  |
| `og_screenshot_url: https://example.com/image.jpg` | `og_screenshot_url: \|https://example.com/image.jpg`     | URLs must not be broken across multiple lines                          |
| `og_screenshot_url: https://example.com/image.jpg` | `og_screenshot_url: >-https://example.com/image.jpg`     | No block scalar indicators (>-, >, \|) allowed for URLs . Or anywhere. |



### Detection Function

```javascript
// Detection Function for quotes in URL properties
// Quotes present in the URL property
// Quotes surrounding a URL throw errors in the fetchOpenGraphData.cjs script
// Remove any quotes found on on either side of a URL
undesiredQuotesPresentInURLProperty: {
   exampleErrors: [
      `""'https://www.archonlabs.com/'""`, 
      "\"https://cdn.prod.website-files.com/66c5c2bab55d37d8e443322b/66cc6d2f0f6b41b86ea33f83_archon-og.jpg\"",
      `""https://example.com""`,
      `"'https://example.com'"`,
      `image: ""'https://arangodb.com/wp-content/uploads/2024/02/Image-5-2.gif'""`,
      `favicon: ""'https://arangodb.com/wp-content/uploads/2023/08/cropped-favicon-192x192.png'""`,
      `" 'https://example.com' "`,
      `url: ""'https://www.numbersstation.ai'""`,
      `favicon: ""https://www.numbersstation.ai/wp-content/uploads/2024/08/cropped-logo-3-192x192.png""`
   ],
   detectError: new RegExp(`^(${URL_PROPERTIES.join('|')}):[ \t]*["'\`]`, 'gm'),
   properSyntax: "url: https://www.archonlabs.com/", //only the URL, NO QUOTES
   messageToLog: 'Removed quotes from URL property',
   preventsOperations: ['assureYAMLPropertiesCorrect.cjs', 'fetchOpenGraphData.cjs', 'trackVideosInRegistry.cjs'],
   correctionFunction: 'removeAnyQuoteCharactersfromEitherOrBothSidesOfURL',
   isCritical: true
}
```

```javascript
   // URLs broken across multiple lines
   // Replace the broken url with the intended url as one continguous sting with no surrounding quotes
   brokenUrlAcrossMultipleLines: { 
      exampleErrors: [
         `https://og-screenshots-prod.s3.amazonaws.com/1366x768/80\n
         /false/e2b5f9e76d2b3da32ce84112d40beb0858f9089bebe6bc88ce9b7bbe1911f582.jpeg`
      ],
      properSyntax: "https://og-screenshots-prod.s3.amazonaws.com/1366x768/80/false/e2b5f9e76d2b3da32ce84112d40beb0858f9089bebe6bc88ce9b7bbe1911f582.jpeg",
      // Any time a URL is not in contiguous form. This would only happen as a leftover from a previous scripting oversight. 
      // For instance, a script was run to remove block scalar syntax and instead of assuring a continguous url, the script left a space between the colon and the url. 
      detectError: /^([\w-]+):[ \t]*https?:[ \t]*$/m, 
      messageToLog: 'URL split across multiple lines',
      preventsOperations: ['fetchOpenGraphData.cjs'],
      correctionFunction: 'attemptToFixBrokenUrl',
      isCritical: true
   },
```

```javascript
  
   // Missing URL property not found within a directory not found in the excludeUrlCheck array
   // No corection, just a message to log.
   missingUrlPropertyNeededForOperation: {
      exampleErrors: [
         `tags:
         - AI-Toolkit
         - creative-tools`,
         `tags:
         - AI-Toolkit
         - creative-tools
         url:`,
         `tags:
         - AI-Toolkit
         url: ` // empty url property
      ],
      // Simple check - if we can't find "url:" followed by non-whitespace
      detectError: /^(?![\s\S]*?\burl:[ \t]*\S)/,
      messageToLog: 'Missing URL property needed for OpenGraph',
      preventsOperations: ['fetchOpenGraphData.cjs'],
      correctionFunction: 'addFileNameToMissingUrlList',
      isCritical: false
   },

```
### Correction Function

```javascript
// Removes any quotes from either side of a URL
async function removeAnyQuoteCharactersfromEitherOrBothSidesOfURL(markdownFileContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    let isolatedFrontmatterString = frontmatterData.frontmatterString;
    let wasModified = false;
    const modifications = [];

    // Function to process a single line
    function processLine(line) {
        // Check if this is a URL property line
        const urlPropMatch = line.match(new RegExp(`^(${URL_PROPERTIES.join('|')}):[ \\t]*(.+)$`));
        if (!urlPropMatch) return line;

        const [fullMatch, propName, value] = urlPropMatch;
        
        // Extract URL by removing all quotes and spaces around it
        let cleanValue = value;
        let hadQuotes = false;

        // Keep removing quotes until no more quotes exist
        let previousValue;
        do {
            previousValue = cleanValue;
            cleanValue = cleanValue
                .replace(/^[\s"'`]+/, '') // Remove leading quotes and spaces
                .replace(/[\s"'`]+$/, '') // Remove trailing quotes and spaces
                .replace(/["'`]/g, '');   // Remove any remaining quotes
            
            if (cleanValue !== previousValue) {
                hadQuotes = true;
            }
        } while (cleanValue !== previousValue);

        if (hadQuotes) {
            return `${propName}: ${cleanValue}`;
        }
        return line;
    }

    // Process each line
    const lines = isolatedFrontmatterString.split('\n');
    const processedLines = lines.map(line => {
        const processed = processLine(line.trim());
        if (processed !== line.trim()) {
            wasModified = true;
            modifications.push({
                property: line.split(':')[0],
                from: line,
                to: processed
            });
        }
        return processed;
    });

    if (wasModified) {
        const newFrontmatter = processedLines.join('\n');
        const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
            '---\n' + newFrontmatter + '\n---' +
            markdownFileContent.slice(frontmatterData.endIndex);

        return {
            ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
            content: correctedContent
        };
    }

    return helperFunctions.createSuccessMessage(markdownFilePath, false);
}
```

```javascript
// Once detected from the detectError regular expression, 
// the correction function will attempt to fix the error
// by attempting to fix a broken url
// Fixes URLs broken across multiple lines
async function attemptToFixBrokenUrl(markdownFileContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    let isolatedFrontmatterString = frontmatterData.frontmatterString;
    let wasModified = false;
    const modifications = [];

    const errorDetectionRegex = /^([\w-]+):[ \t]*https?:[ \t]*$/m;

    const propertyMatch = isolatedFrontmatterString.match(errorDetectionRegex);
    if (propertyMatch) {
        const [fullMatch, propertyName] = propertyMatch;
        // Extract the broken URL parts and join them
        const lines = isolatedFrontmatterString.split('\n');
        let lineIndex = -1;
        
        // Find the line with the broken URL
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(new RegExp(`^${propertyName}:[ \\t]*https?:[ \\t]*$`))) {
                lineIndex = i;
                break;
            }
        }
        
        if (lineIndex >= 0 && lineIndex < lines.length - 1) {
            // Get the next line which should contain the rest of the URL
            const urlStart = lines[lineIndex].trim();
            const urlContinuation = lines[lineIndex + 1].trim();
            
            // Join the URL parts
            const fixedUrl = `${propertyName}: ${urlStart.split(':')[1].trim()}${urlContinuation}`;
            
            // Replace the broken URL with the fixed one
            modifications.push({
                property: propertyName,
                from: `${urlStart}\n${urlContinuation}`,
                to: fixedUrl
            });
            
            // Remove the two broken lines and add the fixed one
            lines.splice(lineIndex, 2, fixedUrl);
            isolatedFrontmatterString = lines.join('\n');
            wasModified = true;
        }
    }

    if (wasModified) {
        const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
            '---\n' + isolatedFrontmatterString + '\n---' +
            markdownFileContent.slice(frontmatterData.endIndex);

        return {
            ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
            content: correctedContent
        };
    }

    return helperFunctions.createSuccessMessage(markdownFilePath, false);
}
```


```javascript
// Correction Function
// Once detected from the detectError regular expression, 
// the correction function will attempt to fix the error
// by removing any quotes found on on either side of a URL
async removeAnyQuoteCharactersfromEitherOrBothSidesOfURL(markdownFileContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    let isolatedFrontmatterString = frontmatterData.frontmatterString;
    let modified = false;
    const modifications = [];

    // Process each URL property
    for (const urlProperty of URL_PROPERTIES) {
        const propertyRegex = new RegExp(`^(${urlProperty}):[ \t]*["'\`](.+?)["'\`][ \t]*$`, 'gm');
        
        // Replace any quoted URL with an unquoted version
        const newFrontmatter = isolatedFrontmatterString.replace(propertyRegex, (match, property, url) => {
            modified = true;
            const cleanUrl = url.replace(/["'`]/g, '').trim();
            const correctedValue = `${property}: ${cleanUrl}`;
            
            modifications.push({
                property,
                from: match,
                to: correctedValue
            });
            
            return correctedValue;
        });
        
        if (newFrontmatter !== isolatedFrontmatterString) {
            isolatedFrontmatterString = newFrontmatter;
        }
    }
}
```

## Error Message Properties

Error messages should always be enclosed in single quotes to handle special characters properly.

| CORRECT                              | INCORRECT                                | RULE                                                      |
| ------------------------------------ | ---------------------------------------- | --------------------------------------------------------- |
| `jina_error: 'Error occurred 404'`   | `jina_error: Error occurred 404`         | Error messages must be enclosed in single quotes          |
| `og_error_message: 'HTTP error!'`    | `og_error_message: "HTTP error!"`        | Use single quotes, not double quotes for error messages   |
| `jina_error: 'Error occurred 404'`   | `jina_error: '"Error occurred 404"'`     | Don't nest quotes around error messages                   |
| `og_error_message: 'HTTP error 401'` | `og_error_message: """HTTP error 401"""` | Do not repeat any kind of quote delimiter on either side. |
| `og_error_message: 'HTTP error 401'` | `og_error_message: "'HTTP error 401'"`   | Do not repeat any kind of quote delimiter on either side. |


### Detection Functions

```javascript
// Improper character set surrounding timestamp properties
// This is a critical error that prevents any script from running
// Remove the improper character set and add single mark quotes
improperCharacterSetSurroundingTimestamp: {
   exampleErrors: [
      "og_last_error: `'\"2025-03-09T06:45:20.458Z\"",
      "last_jina_request: \"2025-03-09T06:45:20.458Z\"",
      "og_last_fetch: 2025-03-09T06:45:20.458Z",
   ],
   properSyntax: "og_last_fetch: '2025-03-09T06:45:20.458Z'", // only one set of single mark quotes
   detectError: new RegExp(`^(${TIMESTAMP_PROPERTIES.join('|')}):[ \t]*(?:["'].*["']|["'].*|.*["'])[ \t]*$`, 'm'),
   messageToLog: 'Timestamp with improperly formatted character set',
   preventsOperations: ['assureYAMLPropertiesCorrect.cjs'],
   correctionFunction: 'assureProperQuotesAroundTimestampProperties',
   isCritical: true
}
```

### Correction Functions 
```javascript
// Correction Function
// Once detected from the detectError regular expression,
// the correction function will attempt to fix the error
// by ensuring timestamp properties have exactly one set of single quotes
async assureProperQuotesAroundTimestampProperties(markdownFileContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    let isolatedFrontmatterString = frontmatterData.frontmatterString;
    let modified = false;
    const modifications = [];

    // Process each timestamp property
    for (const timestampProperty of TIMESTAMP_PROPERTIES) {
        const propertyRegex = new RegExp(`^(${timestampProperty}):[ \t]*(.+?)[ \t]*$`, 'gm');
        
        // Replace any improperly quoted timestamp with a properly quoted version
        const newFrontmatter = isolatedFrontmatterString.replace(propertyRegex, (match, property, timestamp) => {
            const cleanTimestamp = timestamp.replace(/["'`]/g, '').trim();
            if (!cleanTimestamp.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                return match; // Not a valid timestamp format, leave unchanged
            }
            
            modified = true;
            const correctedValue = `${property}: '${cleanTimestamp}'`;
            
            modifications.push({
                property,
                from: match,
                to: correctedValue
            });
            
            return correctedValue;
        });
        
        if (newFrontmatter !== isolatedFrontmatterString) {
            isolatedFrontmatterString = newFrontmatter;
        }
    }
}
```javascript
// Unquoted error message properties (critical)
// Surround the error message property with single mark quotes
unquotedErrorMessageProperty: {
   exampleErrors: [
      "HTTP error!",
      "Error occurred 404"
   ],
   properSyntax: "'Error occurred 404'", // only one set of single mark quotes. 
   detectError: new RegExp(`^(${ERROR_MESSAGE_PROPERTIES.join('|')}):[ \t]*(?![ \t]*'[^']*'[ \t]*$)(.+)$`, 'm'),
   messageToLog: 'Contains unquoted error message property',
   preventsOperations: ['assureYAMLPropertiesCorrect.cjs'],
   correctionFunction: 'surroundErrorMessagePropertiesWithSingleMarkQuotes',
   isCritical: true
}

// Correction Function
// Once detected from the detectError regular expression, 
// the correction function will attempt to fix the error
// by surrounding error messages with a ' single mark quote on both sides 
async surroundErrorMessagePropertiesWithSingleMarkQuotes(markdownContent, markdownFilePath) {
    let wasModified = false;
    const modifications = [];
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    let isolatedFrontmatterString = frontmatterData.frontmatterString;
    
    // Process each error message property
    for (const errorProperty of ERROR_MESSAGE_PROPERTIES) {
        const propertyRegex = new RegExp(`^(${errorProperty}):[ \t]*(?![ \t]*'[^']*'[ \t]*$)(.+)$`, 'm');
        const propertyMatch = isolatedFrontmatterString.match(propertyRegex);
        
        if (propertyMatch) {
            const [fullMatch, propertyName, valueWithError] = propertyMatch;
            // Clean the value by removing any existing quotes and trimming
            const cleanValue = valueWithError.replace(/['"]/g, '').trim();
            const correctedValue = `${propertyName}: '${cleanValue}'`;
            
            modifications.push({
                property: propertyName,
                from: fullMatch,
                to: correctedValue
            });
        }
    }
}
```

## Block Scalar Patterns

Block scalar syntax should not be used in YAML frontmatter properties.

| CORRECT                                               | INCORRECT                                                       | RULE                                                             |
| ----------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| `description: This is a description on a single line` | `description: >-\n  This is a description\n  on multiple lines` | Don't use block scalar indicators (>-, >, \|) in property values |
| `image: https://example.com/image.jpg`                | `image: >-https://example.com/\nimage.jpg`                      | URLs and other values should not use block scalar syntax         |

### Detection Functions
```javascript
   // Block scalar syntax found in property
   // Remove block scalar syntax, and assure one single string
      blockScalarSyntaxFoundInProperty: { 
         exampleErrors: [
            `>-https://cdn.prod.website-files.com/
            669970bc2507a55cf11c7d5e/66cf98288874e4463ad16e65_spotter-studio-img.png`
         ],
         propertSyntax: 'https://cdn.prod.website-files.com/669970bc2507a55cf11c7d5e/66cf98288874e4463ad16e65_spotter-studio-img.png',
         detectError: /^([^:\n]+):[ \t]*(>-|>|[|][-]?)[ \t]*(\S.*)$/gm, 
         messageToLog: 'Block scalar syntax found in property',
         preventsOperations: ['assureYAMLPropertiesCorrect.cjs'],
         correctionFunction: 'attemptToFixBlockScalar',
         isCritical: true
   },
```
### Correction Functions
```javascript
  
    // Once detected from the detectError regular expression, 
    // the correction function will attempt to fix the error
    // by removing any block scalar syntax found in the property
    async attemptToFixBlockScalar(markdownFileContent, markdownFilePath) {
        const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
        if (!frontmatterData.success) {
            return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
        }

        let isolatedFrontmatterString = frontmatterData.frontmatterString;
        let wasModified = false;
        const modifications = [];

        // Process each line
        const lines = isolatedFrontmatterString.split('\n');
        const processedLines = [];
        let inBlockScalar = false;
        let currentProperty = null;
        let blockLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const blockScalarMatch = line.match(knownErrorCases.blockScalarSyntaxFoundInProperty.detectError);

            if (blockScalarMatch) {
                // Start of a block scalar
                inBlockScalar = true;
                currentProperty = blockScalarMatch[1];
                if (blockScalarMatch[3]) {
                    blockLines.push(blockScalarMatch[3]);
                }
            } else if (inBlockScalar && line.match(/^\s+\S/)) {
                // Continuation of block scalar
                blockLines.push(line.trim());
            } else if (inBlockScalar) {
                // End of block scalar
                const value = blockLines.join(' ').trim();
                processedLines.push(`${currentProperty}: ${value}`);
                wasModified = true;
                modifications.push({
                    property: currentProperty,
                    from: `${currentProperty}: >-\n${blockLines.join('\n')}`,
                    to: `${currentProperty}: ${value}`
                });
                inBlockScalar = false;
                currentProperty = null;
                blockLines = [];
                if (line) processedLines.push(line);
            } else {
                processedLines.push(line);
            }
        }

        // Handle any remaining block scalar
        if (inBlockScalar) {
            const value = blockLines.join(' ').trim();
            processedLines.push(`${currentProperty}: ${value}`);
            wasModified = true;
            modifications.push({
                property: currentProperty,
                from: `${currentProperty}: >-\n${blockLines.join('\n')}`,
                to: `${currentProperty}: ${value}`
            });
        }

        if (wasModified) {
            // Create new content without the duplicate lines
            const newLines = processedLines.join('\n');
            const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
                '---\n' + newLines + '\n---' +
                markdownFileContent.slice(frontmatterData.endIndex);

            return {
                ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
                content: correctedContent
            };
        }

        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    },

```
## Tag Patterns

Tags should follow a consistent bullet list format without quotes or spaces in the tag values.

| CORRECT                                             | INCORRECT                                           | RULE                                                         |
| --------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| `tags:\n- Technology-Consultants\n- Organizations`  | `tags: ["Technology-Consultants", "Organizations"]` | Don't use array syntax with quotes                           |
| `tags:\n- Technology-Consultants\n- Organizations`  | `tags: Technology-Consultants, Organizations`       | Don't use comma-separated format                             |
| `tags:\n- Technology-Consultants\n- Organizations`  | `tags: \n- Technology Consultants\n- Organizations` | Don't use spaces in tag values                               |
| `tags:<br>- AI-Toolit<br>- Generative-AI`           | `tags:<br>- AI Toolkit<br>- Generative AI`          | Use '-' dashes to denote the space between words.            |
| tags:<br>- Technology-Consultants<br>- Organization | tags: 'Technology-Consultants', 'Organizations'     | Do not add quote delimiters even in the proper array syntax. |
|                                                     |                                                     |                                                              |
|                                                     |                                                     |                                                              |

### Detection Functions
```javascript
// Tags may have inconsistent syntax which may affect or cause errors in content collections
// Reformat tags to have one consistent syntax, which is compliant with Obsidian. 

// Proper syntax must be in a yaml array format using syntax as in a markdown bullet list
//---- Tags CANNOT be surrounded by any type of quote. 
//---- Tags CANNOT be comma separated.
//---- Tags CANNOT have a " " space character separating two words. 

tagsMayHaveInconsistentSyntax: {
    exampleErrors: [
        "",
        ```---
        url: https://www.archonlabs.com/
        site_name: Archon Labs'
        tags: ["Technology-Consultants", "Organizations"]
        ---```,
        ```---
        url: https://www.archonlabs.com/
        site_name: Archon Labs'
        tags: Technology-Consultants, Organizations
        ---```,
        ```---
        url: https://www.archonlabs.com/
        site_name: Archon Labs'
        tags: 
        - Technology Consultants
        - Organizations
        ---```,
        ```---
        url: https://www.archonlabs.com/
        site_name: Archon Labs'
        tags: 'Technology-Consultants', 'Organizations'
        ---```,
    ],
    properSyntax: `---
        url: https://www.archonlabs.com/
        site_name: Archon Labs
        tags:
        - Technology Consultants
        - Organizations
        ---`,
    detectError: new RegExp(/(?:tags:\s*(?:\[.*?\]|.*?,.*?|['"].*?['"])|(?:^|\n)\s*-\s*\w+[^\S\n]+\w+)/),
    messageToLog: 'Tags may have inconsistent syntax',
    preventsOperations: ['assureYAMLPropertiesCorrect.cjs', "function getCollection('tooling')"],
    correctionFunction: 'assureOrFixTagSyntaxInFrontmatter',
    isCritical: true
}
```

### Correction Functions

The goal is:

- tags: Technology Consultants        -> tags:\n  - Technology-Consultants
- tags: AI Content Generation        -> tags:\n  - AI-Content-Generation
- tags: tag1, Machine Learning       -> tags:\n  - tag1\n  - Machine-Learning


```javascript
// Correction Function
async assureOrFixTagSyntaxInFrontmatter(markdownContent, markdownFilePath) {
    const frontmatterData = helperFunctions.extractFrontmatter(markdownContent);
    if (!frontmatterData.success) {
        return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
    }

    let lines = frontmatterData.frontmatterString.split('\n');
    let modified = false;
    let inTagsBlock = false;
    let tagsArray = [];
    let tagsStartIndex = -1;

    // Process frontmatter lines
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Detect start of tags property
        if (line.startsWith('tags:')) {
            inTagsBlock = true;
            tagsStartIndex = i;
            
            // Handle inline tags (array, comma-separated, or quoted)
            const tagsContent = line.substring(5).trim();
            if (tagsContent) {
                // Remove array brackets and quotes, split by commas
                const rawTags = tagsContent
                    .replace(/^\[|\]$/g, '') // Remove array brackets
                    .replace(/["']/g, '')    // Remove quotes
                    .split(',')              // Split by commas
                    .map(tag => tag.trim())  // Clean up whitespace
                    .filter(tag => tag);     // Remove empty tags
                
                tagsArray = rawTags.map(tag => 
                    tag.replace(/\s+/g, '-') // Replace spaces with hyphens
                );
                modified = true;
            }
            continue;
        }
    }
}
```

## Duplicate Key Patterns

Each property key should appear only once in YAML frontmatter.

| CORRECT | INCORRECT | RULE |
| ------- | --------- | ---- |
| `title: My Title` | `title: First Title\ndescription: Some description\ntitle: Second Title` | Each property key should appear only once |
| `og_last_fetch: '2025-03-09T06:45:20.458Z'` | `og_last_fetch: 2025-03-07T05:19:02.891Z\nog_last_fetch: '2025-03-09T06:45:20.458Z'` | Duplicate keys cause unpredictable behavior |


### Correction Functions
```javascript

    // Once detected from the detectError regular expression, 
    // the correction function will attempt to fix the error
    // by deleting all instances of the key
    async deleteAllInstancesOfDuplicateKeys(markdownFileContent, markdownFilePath) {
        const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
        if (!frontmatterData.success) {
            return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
        }

        let wasModified = false;
        const modifications = [];

        // Split into lines and process
        const lines = frontmatterData.frontmatterString.split('\n');
        const seenKeys = new Map(); // key -> {lineNum, value}

        // First pass: find all keys and their last occurrence
        lines.forEach((line, index) => {
            const match = line.trim().match(/^([^:\s]+):(.*)$/);
            if (match) {
                const [, key, value] = match;
                // Only consider it a match if it's an exact key match
                if (!key.includes('_')) {  // Skip properties that are part of other properties
                    seenKeys.set(key, { lineNum: index, value: value.trim() });
                }
            }
        });

        // Second pass: remove duplicate keys (keeping only the last instance)
        const linesToRemove = new Set();
        lines.forEach((line, index) => {
            const match = line.trim().match(/^([^:\s]+):/);
            if (match) {
                const [, key] = match;
                // Only consider it a match if it's an exact key match
                if (!key.includes('_')) {  // Skip properties that are part of other properties
                    const lastInstance = seenKeys.get(key);
                    if (lastInstance && lastInstance.lineNum !== index) {
                        linesToRemove.add(index);
                        wasModified = true;
                        modifications.push({
                            property: key,
                            from: line.trim(),
                            to: `${key}: ${lastInstance.value}`
                        });
                    }
                }
            }
        });

        if (wasModified) {
            // Create new content without the duplicate lines
            const newLines = lines.filter((_, index) => !linesToRemove.has(index));
            const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
                '---\n' + newLines.join('\n') + '\n---' +
                markdownFileContent.slice(frontmatterData.endIndex);

            return {
                ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
                content: correctedContent
            };
        }

        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    },
   
```
## Spacing and Formatting

Property spacing should be consistent with a single space after the colon.

| CORRECT                                          | INCORRECT                                                       | RULE                                                                                                                                                                                        |
| ------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description: Supercharge your LLM`              | `description:   Supercharge your LLM`                           | Use exactly one space after the colon                                                                                                                                                       |
| `description: This is a single line description` | `description: This is a\ndescription on multiple lines`         | Plain text properties should be on a single line                                                                                                                                            |
| `property: value`                                | `property:value`<br>`property:  value`<br>`property:   valueml` | The property must start in the first position in the line.  <br>The property key is delimited by a single colon.<br>There must be exactly one space between the property key and the value. |
| `property: value`                                | `property:value`<br>`property:  value`<br>`property:   valueml` | The property must start in the first position in the line.  <br>The property key is delimited by a single colon.<br>There must be exactly one space between the property key and the value. |

### Detection Function
```javascript
   unnecessarySpacingFoundInProperty: {
      //YAML syntax is only one space between the colon and the value. 
      //This is a common error that can cause issues in rendering.
      //Also removes newlines and escape characters from plain text properties
      exampleErrors: [
         "description:   Supercharge your LLM's understanding of JavaScript/TypeScript codebases.",
         "description:   Experience the power of advanced text-to-speech synthesis with F5-TTS.\nTransform your text into natural, expressive speech with precision and ease\nusing our cutting-edge AI technology.",
         "description_site_cp:   The platform where the machine learning community collaborates on models,\ndatasets, and applications."
      ],
      properSyntax: "description: Experience the power of advanced text-to-speech synthesis with F5-TTS. Transform your text into natural, expressive speech with precision and ease using our cutting-edge AI technology.",
      detectError: new RegExp(`^(${PLAIN_TEXT_PROPERTIES.join('|')}):[ \\t]{2,}|^(${PLAIN_TEXT_PROPERTIES.join('|')}):[ \\t]*[^\\n]*(\\n|\\r\\n|\\r)[^\\n]*`, 'gm'),
      messageToLog: 'Fixed spacing and merged multiline text in property',
      preventsOperations: ['assureYAMLPropertiesCorrect.cjs'],
      correctionFunction: 'removeUnnecessarySpacing',
      isCritical: false
   },
```

### Correction Functions
```javascript

   // Once detected from the detectError regular expression, 
   // the correction function will attempt to fix the error
   // by removing unnecessary spacing
   async removeUnnecessarySpacing(markdownFileContent, markdownFilePath) {
      const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
      if (!frontmatterData.success) {
         return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
      }

      let isolatedFrontmatterString = frontmatterData.frontmatterString;
      let wasModified = false;
      const modifications = [];

      // Function to process a property value
      function cleanPropertyValue(value) {
         return value
            .split(/\r?\n/)         // Split on any type of newline
            .map(line => line.trim()) // Trim each line
            .join(' ')              // Join with spaces
            .replace(/\s+/g, ' ')   // Replace multiple spaces with one
            .trim();                // Final trim
      }

      // Process each line
      const lines = isolatedFrontmatterString.split('\n');
      let currentProperty = null;
      let currentValue = [];
      let processedLines = [];

      for (let i = 0; i < lines.length; i++) {
         const line = lines[i];
         const propMatch = line.match(new RegExp(`^(${PLAIN_TEXT_PROPERTIES.join('|')}):[ \\t]*(.*)$`));

         if (propMatch) {
            // If we were processing a previous property, clean and add it
            if (currentProperty) {
               const cleanValue = cleanPropertyValue(currentValue.join('\n'));
               processedLines.push(`${currentProperty}: ${cleanValue}`);
               wasModified = true;
            }

            // Start new property
            currentProperty = propMatch[1];
            currentValue = [propMatch[2]];
         } else if (currentProperty && line.match(/^\s+\S/)) {
            // This line is a continuation of the current property
            currentValue.push(line);
         } else {
            // If we were processing a property, finish it
            if (currentProperty) {
               const cleanValue = cleanPropertyValue(currentValue.join('\n'));
               processedLines.push(`${currentProperty}: ${cleanValue}`);
               wasModified = true;
               currentProperty = null;
               currentValue = [];
            }
            // Add non-matching line as is
            processedLines.push(line);
         }
      }

      // Handle the last property if any
      if (currentProperty) {
         const cleanValue = cleanPropertyValue(currentValue.join('\n'));
         processedLines.push(`${currentProperty}: ${cleanValue}`);
         wasModified = true;
      }

      if (wasModified) {
         const newFrontmatter = processedLines.join('\n');
         const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
            '---\n' + newFrontmatter + '\n---' +
            markdownFileContent.slice(frontmatterData.endIndex);

         return {
            ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
            content: correctedContent
         };
      }

      return helperFunctions.createSuccessMessage(markdownFilePath, false);
   },
```
## Multi-line String Patterns

Multi-line strings should be converted to single-line strings with proper spacing.

| CORRECT | INCORRECT | RULE |
| ------- | --------- | ---- |
| `description: Experience the power of advanced text-to-speech synthesis with F5-TTS. Transform your text into natural speech.` | `description: Experience the power of advanced text-to-speech synthesis with F5-TTS.\nTransform your text into natural speech.` | Escape characters and newlines should be replaced with spaces |
| `summary: This is a complete summary.` | `summary: This is a summary\nwith line breaks.` | Convert all multi-line strings to single-line format |

### Detection Functions
```javascript
   // Multi-line strings present in properties
   // Convert multi-line strings to single-line strings
   // Under NO CIRCUMSTANCES use Block Scalar syntax. 
   stringPropertyWithMultiLineString: {
      exampleErrors: [
         "description: Supercharge your LLM's understanding of JavaScript/TypeScript codebases.\nTransform your text into natural, expressive speech with precision and ease\nusing our cutting-edge AI technology."
      ],
      properSyntax: "description: Supercharge your LLM's understanding of JavaScript/TypeScript codebases. Transform your text into natural, expressive speech with precision and ease using our cutting-edge AI technology.",
      detectError: new RegExp(`^(${PLAIN_TEXT_PROPERTIES.join('|')}):[ \t]*[^\n]*(\\n|\\r\n|\\r)[^\n]*`, 'gm'),
      messageToLog: 'Fixed spacing and merged multiline text in property',
      preventsOperations: ['assureYAMLPropertiesCorrect.cjs'],
      correctionFunction: 'convertMultiLineStringsToSingleLineStrings',
      reportName: 'Multi-line-strings-to-single-line-strings',
      isCritical: false
   },
   
```

### Correction Functions
```javascript

   // Convert multi-line strings to single-line strings
   // Multi-line strings are not allowed in frontmatter
   // Block scalar syntax is not allowed in frontmatter
   async convertMultiLineStringsToSingleLineStrings(markdownFileContent, markdownFilePath) {
      const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
      if (!frontmatterData.success) {
         return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
      }

      let isolatedFrontmatterString = frontmatterData.frontmatterString;
      let wasModified = false;
      const modifications = [];

      const errorDetectionRegex = knownErrorCases.stringPropertyWithMultiLineString.detectError;

      const propertyMatch = isolatedFrontmatterString.match(errorDetectionRegex);
      if (propertyMatch) {
         const [fullMatch, propertyName, valueWithError] = propertyMatch;
         const correctedValue = `${propertyName}: '${valueWithError.trim()}'`;

         modifications.push({
            property: propertyName,
            from: fullMatch,
            to: correctedValue
         });

         isolatedFrontmatterString = isolatedFrontmatterString.replace(
            fullMatch,
            correctedValue
         );
         wasModified = true;
      }

      if (wasModified) {
         const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
            '---\n' + isolatedFrontmatterString + '\n---' +
            markdownFileContent.slice(frontmatterData.endIndex);

         return {
            ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
            content: correctedContent
         };
      }

      return helperFunctions.createSuccessMessage(markdownFilePath, false);
   },
   
```
## Unbalanced Quotes

Quotes in property values should always be properly balanced.

| CORRECT                                             | INCORRECT                                          | RULE                                            |
| --------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `description: 'Supercharge your LLM understanding'` | `description: 'Supercharge your LLM understanding` | Always close quotes that are opened             |
| `title: 'My awesome title'`                         | `title: "My awesome title`                         | Missing closing quotes cause parsing errors     |
| `summary: This is a summary`                        | `summary: This is a summary'`                      | Don't add closing quotes without opening quotes |
### Detection Function
```javascript
assureOnlyOneSetOfSingleMarkQuotesAroundTimestampProperties: {
    exampleErrors: [
      "og_last_error: `'\"2025-03-09T06:45:20.458Z\"",
      "last_jina_request: \"2025-03-09T06:45:20.458Z\"",
      "og_last_fetch: 2025-03-09T06:45:20.458Z",
      "og_last_fetch: 2025-03-09T06:45:20.458Z'",
      "og_last_fetch: '2025-03-09T06:45:20.458Z\"",
      "og_last_fetch: \"2025-03-09T06:45:20.458Z\""
    ],
    properSyntax: "og_last_error: '2025-03-09T06:45:20.458Z'",
    detectError: new RegExp(`^(${TIMESTAMP_PROPERTIES.join('|')}):[ \t]*(?![ \t]*'[^']*'[ \t]*$)(.+)$`, 'm'),
    messageToLog: 'Assured only one set of single mark quotes around timestamp properties',
    preventsOperations: ['assureYAMLPropertiesCorrect.cjs'],
    correctionFunction: 'assureProperQuotesAroundTimestampProperties',
    isCritical: false
   },
```

### Correction Function
```javascript
  // Once detected from the detectError regular expression, 
    // the correction function will attempt to fix the error
    // by attempting to fix unbalanced quotes
    async attemptToFixUnbalancedQuotes(markdownFileContent, markdownFilePath) {
        const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
        if (!frontmatterData.success) {
            return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
        }

        let isolatedFrontmatterString = frontmatterData.frontmatterString;
        let wasModified = false;
        const modifications = [];

        // Get regex patterns from knownErrorCases
        const { propertyAndValue, embeddedColon, undefined: undefinedPattern } = knownErrorCases.unbalancedQuotesFoundInProperty.patterns;

        // Process each line
        const lines = isolatedFrontmatterString.split('\n');
        const processedLines = lines.map(line => {
            const propertyMatch = line.match(propertyAndValue);
            if (!propertyMatch) return line;

            const [fullMatch, propertyName, value] = propertyMatch;
            const trimmedValue = value.trim();

            // For URL properties, remove all quotes
            if (URL_PROPERTIES.includes(propertyName)) {
                if (trimmedValue.includes("'") || trimmedValue.includes('"')) {
                    const cleanUrl = trimmedValue.replace(/['"]/g, '').trim();
                    const correctedValue = `${propertyName}: ${cleanUrl}`;
                    
                    if (correctedValue !== line) {
                        wasModified = true;
                        modifications.push({
                            property: propertyName,
                            from: line,
                            to: correctedValue
                        });
                        return correctedValue;
                    }
                }
                return line;
            }

            // Handle malformed properties with embedded colons
            if (trimmedValue.includes(": '") || trimmedValue.includes(': "')) {
                const cleanValue = trimmedValue
                    .replace(embeddedColon, '')
                    .replace(/['"]$/, '')
                    .replace(undefinedPattern, '')
                    .trim();

                const correctedValue = `${propertyName}: ${cleanValue}`;
                wasModified = true;
                modifications.push({
                    property: propertyName,
                    from: line,
                    to: correctedValue
                });
                return correctedValue;
            }

            // Check for unbalanced quotes
            const openingSingle = trimmedValue.startsWith("'");
            const closingSingle = trimmedValue.endsWith("'");
            const openingDouble = trimmedValue.startsWith('"');
            const closingDouble = trimmedValue.endsWith('"');

            // If quotes are balanced (both present or both absent), leave it alone
            if ((openingSingle === closingSingle) && (openingDouble === closingDouble)) {
                return line;
            }

            // Determine which quote type to use based on what's present
            let quoteType = "'"; // default to single quotes
            if (openingDouble || closingDouble) {
                quoteType = '"';
            }

            // Clean the value and reapply the correct quotes
            const cleanValue = trimmedValue
                .replace(/^['"]/, '')
                .replace(/['"]$/, '')
                .replace(undefinedPattern, '')
                .trim();

            const correctedValue = `${propertyName}: ${quoteType}${cleanValue}${quoteType}`;

            if (correctedValue !== line) {
                wasModified = true;
                modifications.push({
                    property: propertyName,
                    from: line,
                    to: correctedValue
                });
                return correctedValue;
            }
            return line;
        });

        if (wasModified) {
            const newFrontmatter = processedLines.join('\n');
            const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
                '---\n' + newFrontmatter + '\n---' +
                markdownFileContent.slice(frontmatterData.endIndex);

            return {
                ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
                content: correctedContent
            };
        }

        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    },
```
## General String Properties

String properties must follow consistent formatting.

| CORRECT                                           | INCORRECT                                                                                                              | RULE                                                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `description: 'My description with special chars' | `description: My description with special chars: & \| >`<br>`description: "My description with special chars: & \| >"` | Use single quotes for strings containing special characters                                              |
| `title: 'Simple title'`<br>`title: Simple title`  | `title: Simple title!` `'title: Simple: title`                                                                         | Don't quote simple strings without special characters \|                                                 |
| `summary: Single line text`                       | summary: ><br>  Text spread<br>  across multiple<br>  lines                                                            | All string fields must be in a "single line" with no block scalar syntax. No multi-line strings allowed. |

### Correction Functions
```javascript

    // Once detected from the detectError regular expression, 
    // the correction function will attempt to fix the error
    // by removing any quotes found on on either side of a URL
    async removeAnyQuoteCharactersfromEitherOrBothSidesOfURL(markdownFileContent, markdownFilePath) {
        const frontmatterData = helperFunctions.extractFrontmatter(markdownFileContent);
        if (!frontmatterData.success) {
            return helperFunctions.createErrorMessage(markdownFilePath, frontmatterData.error);
        }

        let isolatedFrontmatterString = frontmatterData.frontmatterString;
        let wasModified = false;
        const modifications = [];

        // Function to process a single line
        function processLine(line) {
            // Check if this is a URL property line
            const urlPropMatch = line.match(new RegExp(`^(${URL_PROPERTIES.join('|')}):[ \t]*(.+)$`));
            if (!urlPropMatch) return line;

            const [fullMatch, propName, value] = urlPropMatch;
            
            // Extract URL by removing all quotes and spaces around it
            let cleanValue = value;
            let hadQuotes = false;

            // Keep removing quotes until no more quotes exist
            let previousValue;
            do {
                previousValue = cleanValue;
                cleanValue = cleanValue
                    .replace(/^[\s"'`]+/, '') // Remove leading quotes and spaces
                    .replace(/[\s"'`]+$/, '') // Remove trailing quotes and spaces
                    .replace(/["'`]/g, '');   // Remove any remaining quotes
                
                if (cleanValue !== previousValue) {
                    hadQuotes = true;
                }
            } while (cleanValue !== previousValue);

            if (hadQuotes) {
                return `${propName}: ${cleanValue}`;
            }
            return line;
        }

        // Process each line
        const lines = isolatedFrontmatterString.split('\n');
        const processedLines = lines.map(line => {
            const processed = processLine(line.trim());
            if (processed !== line.trim()) {
                wasModified = true;
                modifications.push({
                    property: line.split(':')[0],
                    from: line,
                    to: processed
                });
            }
            return processed;
        });

        if (wasModified) {
            const newFrontmatter = processedLines.join('\n');
            const correctedContent = markdownFileContent.slice(0, frontmatterData.startIndex) +
                '---\n' + newFrontmatter + '\n---' +
                markdownFileContent.slice(frontmatterData.endIndex);

            return {
                ...helperFunctions.createSuccessMessage(markdownFilePath, true, modifications),
                content: correctedContent
            };
        }

        return helperFunctions.createSuccessMessage(markdownFilePath, false);
    },
```



---
date_created: 2025-03-24
date_modified: 2025-03-24
---


Basic Structural Rules
- Must start with '---' on its own line
- No tabs, only spaces for indentation
- Consistent indentation (2 or 4 spaces)
- Must end with a newline
- No trailing whitespace

Content Pattern Rules
- Files with no frontmatter shall be considered valid, they simply won't show up in various queries we use frontmatter for. 
- No duplicate keys at the same level
- Key names must be lowercase with underscores
- No unquoted strings containing special characters
- Arrays must be consistent in format (either all single-line or all multi-line)

Value Format Rules
- Dates must be ISO 8601 format
- URLs must be properly escaped
- Multi-line strings must use consistent style (>- or |)
- Boolean values must be true/false (not yes/no)
- Numbers should be unquoted unless specifically needed as strings

Corruption Detection Patterns
- Mixed indentation styles
- Unmatched quotes
- Invalid UTF-8 characters
- Inconsistent line endings
- Misaligned blocks
- Missing or extra colons
- Improper list indicators

Skip Conditions:
- If indentation is completely irregular
- If there are unmatched block indicators
- If document separator (---) appears mid-document without proper structure
- If there are binary characters in the content
- If there are more closing indicators than opening ones

Safe Addition Rules:
- Always add new keys at the end of their respective level
- Preserve existing indentation style
- Use block scalars (|) for multi-line strings
- Quote any string containing special characters
- Maintain empty lines between major sections

Implementation Guidelines:
- Use regex patterns for basic validation
- Implement line-by-line scanning for structural issues
- Track indentation levels with a stack
- Maintain a map of key paths to detect duplicates
- Use character counting for alignment checks

Recovery Strategies:
- Log exact location of corruption
- Attempt to salvage valid sections
- Provide detailed error messages
- Support partial updates of valid sections
- Maintain backup of original content

AI-Specific Instructions
- Always output complete YAML blocks
- Add yaml property: value lines within the YAML blocks
- Never mix different indentation styles
- Use explicit type indicators where ambiguous
- Include comments for complex structures
- Validate output against these rules before returning

# Reporting

## Single Error Reporting

Error reporting format:
```yaml
error:
  line: <line_number>
  type: <error_type>
  context: <surrounding_content>
  suggestion: <possible_fix>
  severity: <critical|warning>
```

### Multiple Errors Reporting

#### Reporting for Detect and Fix
```javascript
return `---
title: ${report.metadata.title}
date: ${report.metadata.created_at}
version: ${report.metadata.version}
status: ${report.metadata.status}
---
## Summary
Total filePaths loaded for script request: ${report.content.summary.total_files}
Number of files observed with no frontmatter: ${report.content.summary.files_with_no_frontmatter}
Number of files observed with no UUID: ${report.content.summary.files_with_no_uuid}
Number of files fixed with frontmatter and UUID: ${report.content.summary.files_fixed_with_frontmatter_and_uuid}
Number of files fixed with UUID only: ${report.content.summary.files_fixed_with_uuid_only}
Number of files that have no url or site_url property: ${report.content.summary.files_with_no_url_or_site_url}
Number of files that could not be loaded: ${report.content.summary.files_that_could_not_load}
Number of files finally sent to process: ${report.content.summary.files_sent_to_process}

## Details
### Files with No Frontmatter
${report.content.details.no_frontmatter.map(file => `[[${path.basename(file, '.md')}]]`).join('\n')}

### Files with No UUID
${report.content.details.no_uuid.map(file => `[[${path.basename(file, '.md')}]]`).join('\n')}

### Files with No URL or Site URL
${report.content.details.no_url_or_site_url.map(file => `[[${path.basename(file, '.md')}]]`).join('\n')}

### Files That Could Not Load
${report.content.details.could_not_load.map(file => `[[${path.basename(file, '.md')}]]`).join('\n')}

### Files Fixed with Frontmatter and UUID
${report.content.details.fixed_with_frontmatter_and_uuid.map(file => `[[${path.basename(file, '.md')}]]`).join('\n')}

### Files Fixed with UUID Only
${report.content.details.fixed_with_uuid_only.map(file => `[[${path.basename(file, '.md')}]]`).join('\n')}`;
}
```

#### Detect and Fix Alternative
```javascript

/**
 * Format YAML details for a file
 * @param {Object} result - Evaluation result for the file
 * @returns {string} Formatted YAML details markdown
 */
function formatYAMLDetails(result) {
  let markdown = '';
  
  if (result.modifications.modified) {
    markdown += `#### YAML Modifications Made\n`;
    markdown += `- Total replacements: ${result.modifications.replacements}\n`;
    
    const changes = result.modifications.changes;
    if (changes.uuid) {
      markdown += `- Generated UUID: ${changes.uuid}\n`;
    }
    if (changes.hyphenConversions) {
      markdown += `- Variable name conversions:\n`;
      changes.hyphenConversions.forEach(conv => {
        markdown += `  - "${conv.from}" → "${conv.to}"\n`;
      });
    }
    if (changes.tagFormatting) {
      markdown += `- Tag formatting:\n`;
      markdown += `  - Before: [${changes.tagFormatting.from.join(', ')}]\n`;
      markdown += `  - After: [${changes.tagFormatting.to.join(', ')}]\n`;
    }
    if (changes.addedTags) {
      markdown += `- Added path tags: ${changes.addedTags.join(', ')}\n`;
    }
    markdown += '\n';
  }

  markdown += `#### YAML/Frontmatter Status\n`;
  const yaml = result.evaluation.yaml;
  markdown += `- Needs UUID: ${yaml.needsUUID}\n`;
  markdown += `- Needs Hyphen Conversion: ${yaml.needsHyphenConversion}\n`;
  markdown += `- Needs Tag Formatting: ${yaml.needsTagFormatting}\n`;
  markdown += `- Has Lowercase Tags: ${yaml.hasLowercaseTags}\n`;
  markdown += `- Needs URL Check: ${yaml.needsURLCheck}\n`;
  markdown += `- Needs Path Tags: ${yaml.needsPathTags}\n`;
  if (yaml.needsPathTags) {
    markdown += `  - Missing Tags: ${yaml.missingPathTags.join(', ')}\n`;
  }
  markdown += `- Processing Required: ${yaml.needsProcessing}\n\n`;

  return markdown;
}
```
# General Rules and Preferences

GENERALIZED RULES

| CORRECT                                                              | INCORRECT                                                          | RULE                                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| title: 'Banani \| Generate UI from Text \| AI Copilot for UI Design' | title: Banani \| Generate UI from Text \| AI Copilot for UI Design | String values with any kind of potentially problematic characters should be surrounding by one set of single mark quotes |
|                                                                      |                                                                    |                                                                                                                          |

PROPERTY SPECIFIC RULES

| CORRECT                                                              | INCORRECT                                                          | RULE                                                                                               |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| product_of: '[[organizations/Tencent\|Tencent]]'                     | product_of: [[organizations/Tencent\|Tencent]]                     | Backlinks must have one set of single mark quote delimiters surrounding the backlink in YAML       |
| og_last_fetch: 2025-03-24T06:28:27.097Z                              | og_last_fetch: '2025-03-24T06:28:27.097Z'                          | Timestamps must be bare with no quote marks on either side. Timestamps must be in ISO 8601 format. |
| title: 'Banani \| Generate UI from Text \| AI Copilot for UI Design' | title: Banani \| Generate UI from Text \| AI Copilot for UI Design | Title value should have one set of single mark quotes surrounding the string.                      |
| og_error_message: 'Screenshot fetch error: HTTP error! status: 500'  | og_error_message: Screenshot fetch error: HTTP error! status: 500  | Error messages should be surrounded with single mark quote delimiters                              |

PROPERTY SPECIFIC PREFERENCES

| CORRECT                                                    | INCORRECT                                                          | RULE                                                                                                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title: 'Generate UI from Text \| AI Copilot for UI Design' | title: Banani \| Generate UI from Text \| AI Copilot for UI Design | The 'site_name:' value should not be present in the title property value. This typically involves removing the characters proceeding or following such as `[-\|*@]~` |

## Backlink Patterns

| CORRECT                                      | INCORRECT                                       | RULE                                                                                                                                         |
| -------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| parent_org: '[[organizations/Adobe]]'                      | `parent_org: [[Adobe]]`                         | Backlinks must have a single mark quote delimiter surrounding the double brackets.                                                           |
| parent_org: '[[organizations/Adobe\|Adobe]]' | `parent_org: [[Adobe]]`                         | Backlinks should have their relative path back to the root content directory, then a '\|' pipe character, then the fileName without the .md. |
| parent_org: '[[organizations/Adobe\|Adobe]]' | `parent_org: [[Organizations/Adobe\|Adobe.md]]` | Backlinks should have their relative path back to the root content directory, then a '\|' pipe character, then the fileName without the .md. |

