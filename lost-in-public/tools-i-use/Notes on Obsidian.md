---
date_created: 2025-02-21
date_modified: 2025-09-23
---
https://publish-01.obsidian.md/access/b7cd1a6b2888949f91e39ffa6ef09088/
https://github.com/sailKiteV/Obsidian-Snippets-and-Demos/blob/main/ChassisCallouts/chassis_callouts.css
[[Tooling/Productivity/Advanced Documents/Obsidian]]


``` HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Grid Example</title>
    <link rel="stylesheet" href="./obsidian/snippets/image-grids.css">
</head>
<body>
    <div class="img-grid">
        <div class="image-embed is-loaded">
            <img src="path/to/image1.jpg" alt="Image 1">
        </div>
        <div class="image-embed is-loaded">
            <img src="path/to/image2.jpg" alt="Image 2">
        </div>
        <div class="image-embed is-loaded">
            <img src="path/to/image3.jpg" alt="Image 3">
        </div>
    </div>

    <div class="markdown-preview-section">
        <div>
            <p class="img-grid">
                <img src="path/to/image4.jpg" alt="Image 4">
                <img src="path/to/image5.jpg" alt="Image 5">
            </p>
        </div>
    </div>

    <div class="img-grid-ratio">
        <div class="image-embed is-loaded">
            <img src="path/to/image6.jpg" alt="Image 6">
        </div>
        <div class="image-embed is-loaded">
            <img src="path/to/image7.jpg" alt="Image 7">
        </div>
    </div>
</body>
</html>
```

``` html
<iframe style="aspect-ratio:16/9;width:100%;height:auto" src="https://www.youtube.com/embed/0LZpt0pKWsQ?si=EAnc9fega4Lf4mEo&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

2023, November 8. [Obsidian Link Preview (Obsidian Run + CustomJS + Nifty Link)](https://www.youtube.com/watch?v=IkjZyZ-Q7sM). Yomaru Hananoshika.

https://youtu.be/diZ4AFh-ZNI?si=9EswqdGtPPDWB9J7

<iframe style="aspect-ratio:16/9;width:100%;height:auto" src="https://www.youtube.com/embed/zAOcN0ZENLU?si=vg17HAApz5fC&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

> [!column]
>> [!info] Column 1
>> - Use another callout for columns
>
>> [!note] Column 2
>> Need that singular blockquote `>` as separation between columns


> [!column|flex 3]
>> [!info|no] 
>> Column 1
>
>> [!important]+ Current Topics
>> Column 2
>
>> [!important]+ Current Topics
>>Column 2


> [!timeline|t-l] **Title** _Subtitle_
> Left aligned timeline piece

> [!timeline|t-r t-4] **Title** *Subtitle*
> Right aligned timeline piece

> [!timeline|t-r t-10] **Title** *Subtitle*
> Spaced timeline piece

### Notes from being frustrated with Obsidian
None of these render. 
``` markdown

![Dropbox](https://www.dropbox.com/scl/fi/h50ku2dkjyje2q0qd5905/2025-02-21-01.17.07_Data-Augmenter_MainContainerUI.gif?rlkey=fogfxpdr9m1clomt6hn22d5gn&st=2x3xxpbm&dl=0)

![250](https://www.penguinrandomhouse.com/books/711959/number-go-up-by-zeke-faux/)

<img src="https://www.penguinrandomhouse.com/books/711959/number-go-up-by-zeke-faux/" alt="Here is my alt">

![image|583x500](https://replay.dropbox.com/share/RnZXBHsWwP2DzB0f)


```


![](https://i.imgur.com/7GIgusf.gif)

![](https://jumpshare.com/embed/qRMorFGD8jjHlWs4n9GG)


https://publish-01.obsidian.md/access/b7cd1a6b2888949f91e39ffa6ef09088/
<img src="https://www.dropbox.com/scl/fi/6p7j5tkd1pa1pajk4qlvs/Screenshot-2025-02-24-at-10.37.22-PM_Discord.png?rlkey=i8rh67n08fmrgit31vj19ngn1&st=3ki6gmyy&dl=0" alt="Here is my alt" loading="eager">

https://www.dropbox.com/scl/fi/6p7j5tkd1pa1pajk4qlvs/Screenshot-2025-02-24-at-10.37.22-PM_Discord.png?rlkey=i8rh67n08fmrgit31vj19ngn1&st=3ki6gmyy&dl=0

https://publish-01.obsidian.md/access/b7cd1a6b2888949f91e39ffa6ef09088/Visuals/20250211_alphabet_google_what_companies_it_owns_chart.png

![](https://publish-01.obsidian.md/access/b7cd1a6b2888949f91e39ffa6ef09088/Visuals/20250211_alphabet_google_what_companies_it_owns_chart.png)

/Users/mpstaton/content-md/lossless/Visuals/20250211_alphabet_google_what_companies_it_owns_chart

Visuals/20250211_alphabet_google_what_companies_it_owns_chart


obsidian://open?vault=lossless&file=Visuals%2F20250220_Affinity--Release-Notes%201.jpeg

<img class="dwg-media-image dwg-media-image--object-fit-contain dwg-box dwg-position--absolute dwg-width--full dwg-height--full" alt="A user entering a password that will be used to access a file" loading="eager" fetchpriority="high" src="https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/features/share/file-permissions/file-permissions_Hero_00@2x.png?id=c3e3dbfd-d7d2-4de2-85f9-6ea9ce7bf87d&amp;output_type=png" srcset="https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/features/share/file-permissions/file-permissions_Hero_00@2x.png?id=c3e3dbfd-d7d2-4de2-85f9-6ea9ce7bf87d&amp;width=414&amp;output_type=png 414w, https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/features/share/file-permissions/file-permissions_Hero_00@2x.png?id=c3e3dbfd-d7d2-4de2-85f9-6ea9ce7bf87d&amp;width=828&amp;output_type=png 828w, https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/features/share/file-permissions/file-permissions_Hero_00@2x.png?id=c3e3dbfd-d7d2-4de2-85f9-6ea9ce7bf87d&amp;width=1024&amp;output_type=png 1024w, https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/features/share/file-permissions/file-permissions_Hero_00@2x.png?id=c3e3dbfd-d7d2-4de2-85f9-6ea9ce7bf87d&amp;width=1280&amp;output_type=png 1280w, https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/features/share/file-permissions/file-permissions_Hero_00@2x.png?id">

```mermaid 
sequenceDiagram 
Alice->>+John: Hello John, how are you? 
Alice->>+John: John, can you hear me? 
John-->>-Alice: Hi Alice, I can hear you! 
John-->>-Alice: I feel great! 
```

``` mermaid
%%{init: { "securityLevel": "loose", "flowchart": { "htmlLabels": true } } }%%
flowchart LR;
    A( <img src='https://publish-01.obsidian.md/access/b7cd1a6b2888949f91e39ffa6ef09088/Visuals/trademark__Boomi.svg' height='200px' width='200px'/> )--> B & C & D;
    B--> A & E;
    C--> A & E;
    D--> A & E;
    E--> B & C & D;
    F[" "]--> A

	F@{ img: "https://publish-01.obsidian.md/access/b7cd1a6b2888949f91e39ffa6ef09088/Visuals/jon-laerdal-just-headshot.png", h: 44, w: 60, pos: "t"}
```

```mermaid
graph LR;

%% Class Definitions
%% =================

classDef FixFont font-size:11px;

%% Nodes
%% =====

QuickStart(Quick Start):::FixFont -->
    CmdPalette(Command<BR>Palette):::FixFont;
QuickStart --> 
    CreateNotes("Create notes"):::FixFont;
QuickStart --> 
    InternalLinks("Internal Links"):::FixFont;

click CreateNotes "/Create notes";
click CmdPalette "/Command palette";
click InternalLinks "/Internal link";

%% Internal links
%% ==============

class CmdPalette internal-link;
class CreateNotes internal-link;
class InternalLinks internal-link;

%% Node styles
%% ===========

style CmdPalette fill:#383;  
style QuickStart fill:#A00;
style CreateNotes fill:#03C;
style InternalLinks fill:#C097;!
```

```mermaid
graph LR
class A internal-link;

A[[AppMap]] --> B 


```

```mermaid
graph LR

class Main internal-link;
class RecordCollector internal-link;
class PromptManager internal-link;
class PromptReviewer internal-link;
class ResponseCollector internal-link;
class HighlightCollector internal-link;
class InsightManager internal-link;

click Main "obsidian://vault/00%20-%20Lossless-at-Laerdal%20Gameplan%2F04.1%20-%20AI%20to%20Insight%20Specifications%2FMainContainerUI";

Main[[MainContainerUI]] --> RecordCollector[[RecordCollector]]
Main[[MainContainerUI]] --> PromptManager[[PromptManager]]
Main[[MainContainerUI]] --> PromptReviewer[[PromptReviewer]]
Main[[MainContainerUI]] --> ResponseCollector[[RecordCollector]]
Main[[MainContainerUI]] --> HighlightCollector[[HighlightCollector]]
Main[[MainContainerUI]] --> InsightManager[[InsightManager]]


```

```mermaid
graph LR

class Main internal-link;
class RecordCollector internal-link;
class PromptManager internal-link;
class PromptReviewer internal-link;
class ResponseCollector internal-link;
class HighlightCollector internal-link;
class InsightManager internal-link;

click Main "obsidian://vault/00%20-%20Lossless-at-Laerdal%20Gameplan%2F04.1%20-%20AI%20to%20Insight%20Specifications%2FMainContainerUI";

Main[[MainContainerUI]] --> RecordCollector[[RecordCollector]]
Main[[MainContainerUI]] --> PromptManager[[PromptManager]]
Main[[MainContainerUI]] --> PromptReviewer[[PromptReviewer]]
Main[[MainContainerUI]] --> ResponseCollector[[RecordCollector]]
Main[[MainContainerUI]] --> HighlightCollector[[HighlightCollector]]
Main[[MainContainerUI]] --> InsightManager[[InsightManager]]


```



```mermaid
sequenceDiagram 

participant RecordCollector
participant PromptManager
participant PromptReviewer
participant ResponseCollector
participant HighlightCollector
participant InsightManager 


RecordCollector-->>PromptManager: selectedRecords
PromptManager-->> PromptReviewer: selectedPrompts
PromptReviewer-->> ResponseCollector: apiCallResponseObjects
Note right of PromptReviewer: AI Model LLM APIs<br/>AI Web Scraper APIs
ResponseCollector-->> HighlightCollector: responseObjectContents 
HighlightCollector-->>InsightManager: highlightsList
```
