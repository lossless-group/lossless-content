---
title: Use an LLM Gateway to Augment Content
lede: Create the content of a thousand content marketers with an LLM Gateway -- LiteLLM, Fabric, Ollama, MSTY
date_authored_initial_draft: 2025-03-06
date_authored_current_draft: 2025-03-15
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_modified: 2025-04-16
date_created: 2025-04-16
image_prompt: "A content creation gateway powered by multiple LLMs, with data flowing through interconnected nodes, creative content cards, and a dashboard of AI models. Visuals include glowing pathways, document icons, and a sense of high-volume, automated content generation."
site_uuid: 7e866c2b-a4e9-4480-9780-af3a5a9e0b5a
tags: 
  - Content-Generators
  - Retrieval-Augmented-Generation
  - State-Of-The-Art-Practices
  - Content-Marketing
  - Content-Automation
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_portrait_image_Use-LLM-Gateway-to-Augment-Content_02a62f4b-2d21-4dae-ba94-654fdc49c775_a_jvAMjda.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/workflow/2025-05-05_banner_image_Use-LLM-Gateway-to-Augment-Content_8d863a16-bfd4-4bbd-a895-12a80e1a5649_g_2OHHNBA.webp
---
###### Covered
[[Tooling/AI-Toolkit/AI Interfaces/OLlama]], [[Fabric]], [[LiteLLM]], [[LM Studio]], [[MSTY]]

### [[Tooling/AI-Toolkit/AI Interfaces/OLlama]]

### [[MSTY]]

### [[Fabric]]

Here's the Common [[JavaScript]] script I use for [[Fabric]]:
```javascript
const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = util.promisify(exec);
const outputDirectory = 'src/data/01_lossless-run';

function extractVideoId(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
}

function getYoutubeUrls() {
  try {
    console.log('Attempting to read youtube-urls.json...');
    
    // Log current working directory
    console.log('Current working directory:', process.cwd());
    
    const filePath = 'src/content/data/youtube-urls.json';
    console.log('Looking for file at:', path.resolve(filePath));
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('Error: youtube-urls.json file not found');
      return [];
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('File read successfully, parsing JSON...');
    
    const jsonData = JSON.parse(fileContent);
    console.log(`Found ${jsonData.length} entries in JSON file`);
    
    const allUrls = jsonData
      .reduce((urls, item) => [...urls, ...(item.youtube_urls || [])], [])
      .filter((url, index, self) => self.indexOf(url) === index);
    
    console.log(`Extracted ${allUrls.length} unique YouTube URLs`);
    
    return allUrls;
  } catch (error) {
    console.error('Error in getYoutubeUrls:', error);
    return [];
  }
}

async function processYoutubeUrl(url) {
  console.log(`Processing URL: ${url}`);
  const thisYoutubeUrl = url;
  const frontMatterMark = `---`
  const TIMEOUT_MS = 180000; // 3 minutes in milliseconds

  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error(`Could not extract video ID from URL: ${url}`);
    }
    
    const frontMatterOutput = 
      `${frontMatterMark}\nthis_video_url: ${thisYoutubeUrl}\nthis_video_id: ${videoId}\n${frontMatterMark}`;

    const outputFile = path.join(outputDirectory, `juice_from_${videoId}.md`);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFile = path.join(outputDirectory, `${videoId}_log_${timestamp}.md`);

    const command = `fabric -y ${url} --stream --pattern extract_lossless_essentials`;
    
    console.log(`Executing: ${command}`);
    console.log(`Saving output to: ${outputFile}`);
    
    // Create a promise that rejects after timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${TIMEOUT_MS/1000} seconds`));
      }, TIMEOUT_MS);
    });

    // Race between the actual operation and the timeout
    const { stdout, stderr } = await Promise.race([
      execPromise(command),
      timeoutPromise
    ]);
    
    fullFileOutput = `${frontMatterOutput}\n${stdout}`;
    fs.writeFileSync(outputFile, fullFileOutput);
    
    if (stderr) {
      fs.writeFileSync(logFile, stderr);
      console.log(`Saved error logs to: ${logFile}`);
    }
    
    console.log(`Finished processing: ${url}`);
    return outputFile;
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    const errorLogFile = path.join(
      outputDirectory, 
      `error_${new Date().toISOString().replace(/[:.]/g, '-')}.log`
    );
    fs.writeFileSync(errorLogFile, `URL: ${url}\nError: ${error.message}\n${error.stack}`);
    console.error(`Error details written to: ${errorLogFile}`);
    
    // If it's a timeout, we should kill the fabric process
    if (error.message.includes('timed out')) {
      try {
        // Kill any running fabric process
        exec('pkill -f fabric');
        console.log('Killed hanging fabric process');
      } catch (killError) {
        console.error('Error killing fabric process:', killError);
      }
    }
    
    return null;
  }
}

async function main() {
  const urls = getYoutubeUrls();
  console.log(`Starting to process ${urls.length} URLs...`);
  
  for (const url of urls) {
    await processYoutubeUrl(url);
  }
  
  console.log('Finished processing all URLs');
}

// Execute the main function
main().catch(error => {
  console.error('Error in main execution:', error);
  process.exit(1);
});