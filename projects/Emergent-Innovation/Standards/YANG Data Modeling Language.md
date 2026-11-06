---
date_created: 2026-08-08
date_modified: 2026-11-06
wikipedia_url: https://en.wikipedia.org/wiki/YANG
tags:
  - Data-Modeling
  - Open-Specifications
  - Lossless-Toolkit
  - Everything-as-Code
  - Diagrams-as-Code
site_uuid: 6efa20ee-ab26-46da-87dd-95317cfd5efe
publish: true
title: YANG Data Modeling Language
slug: yang-data-modeling-language
at_semantic_version: 0.0.0.1
---


[[Vocabulary/Data Models|Data Modeling]]
[[concepts/Visual Software Development|Visual Engineering]]
[[projects/Emergent-Innovation/Examples/Unified Modeling Language|Unified Modeling Language]]

YANG (Yet Another Next Generation) is a hierarchical data modeling language used to model configuration data, operational state data, Remote Procedure Calls (RPCs), and notifications for network devices. Maintained by the IETF and defined primarily in RFC 7950 (YANG 1.1), it acts as a structured blueprint or schema that dictates how data must be formatted without containing the data values themselves. [^5ybd01] [^3mjvld] [^pw29bx] [^67rbdv]  
Key Characteristics 

• Protocol Independent: YANG defines the structure, but the data can be serialized into multiple formats like [[projects/Emergent-Innovation/Standards/Extensible Markup Language|XML]], [[projects/Emergent-Innovation/Standards/JSON|JSON]], or [[CBOR]]. 
• Separation of Data: It explicitly distinguishes between configuration data (read-write settings) and state data (read-only system metrics like packet counters). 
• Network Automation Core: It serves as the data schema layer for network management protocols like NETCONF, RESTCONF, and gNMI. [^5ybd01] [^3mjvld] [^1lv6wq] [^1wfzha] [^1pho9m]  

## Main Data Node Types 
YANG modules assemble data in a tree-like hierarchy using four core node types: 

• Leaf: Contains a single, simple value (e.g., an integer host ID or a string interface description) with an explicitly declared data type. 
• Leaf-list: A sequence of leaf nodes containing unique values of a specific data type (e.g., a list of DNS server IP addresses). 
• Container: Used to logically group related nodes together in a subtree (e.g., grouping all "system-settings" elements). 
• List: Defines a sequence of identical structural entries that can be uniquely identified by a "key" (e.g., a list of multiple physical interfaces, each with its own name and status). [^3mjvld] [^pw29bx]  

### Structure Example 
Below is a simplified conceptual example of a YANG module structure defining a network interface configuration: 
Advanced Features 

• Constraints and Validation: Allows strict data validation using built-in types, range limits, regular expressions (), and conditional constraints () before configuration is pushed to a device. 
• Reusability: Authors can create reusable blocks of code using  statements, which can be instantiated anywhere via . 
• Extensibility: Third-party vendors or developers can extend existing base models without changing the original code by using  statements. [^pw29bx] [^1pho9m]  



***
# Citations

[^5ybd01]: [https://en.wikipedia.org/wiki/YANG](https://en.wikipedia.org/wiki/YANG)
[^3mjvld]: [https://www.youtube.com/watch?v=zy9QA-uU0u4](https://www.youtube.com/watch?v=zy9QA-uU0u4)
[^pw29bx]: [https://developer.cisco.com/docs/nso/guides/the-yang-data-modeling-language/](https://developer.cisco.com/docs/nso/guides/the-yang-data-modeling-language/)
[^67rbdv]: [https://nleiva.medium.com/yang-data-modeling-b54783fcc94a](https://nleiva.medium.com/yang-data-modeling-b54783fcc94a)
[^1lv6wq]: [https://www.youtube.com/watch?v=wucptJpWc5Q](https://www.youtube.com/watch?v=wucptJpWc5Q)
[^1wfzha]: [https://www.youtube.com/watch?v=Qyn-BrQTXpc](https://www.youtube.com/watch?v=Qyn-BrQTXpc)
[^1pho9m]: [https://www.youtube.com/watch?v=b7IumSFInTs](https://www.youtube.com/watch?v=b7IumSFInTs)
[^hphy5l]: [https://www.juniper.net/documentation/us/en/software/junos/netconf/topics/concept/netconf-yang-modules-overview.html](https://www.juniper.net/documentation/us/en/software/junos/netconf/topics/concept/netconf-yang-modules-overview.html)
[^c73k7s]: [https://documentation.extremenetworks.com/FABRICENGINE/SW/89/RESTCONFDevGuideVOSSFE/GUID-A56520F1-54A0-4E64-AD58-2C11CA4FEF51.shtml](https://documentation.extremenetworks.com/FABRICENGINE/SW/89/RESTCONFDevGuideVOSSFE/GUID-A56520F1-54A0-4E64-AD58-2C11CA4FEF51.shtml)
[^4fds0j]: [https://info.support.huawei.com/info-finder/encyclopedia/en/YANG.html](https://info.support.huawei.com/info-finder/encyclopedia/en/YANG.html)
[^e3yhj5]: [https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-741518.html](https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-741518.html)
[^u75mv2]: [https://www.sciencedirect.com/science/article/pii/S1389128622005722](https://www.sciencedirect.com/science/article/pii/S1389128622005722)
[^w5ubin]: [https://en.wikipedia.org/wiki/YANG](https://en.wikipedia.org/wiki/YANG)
[^9wojgn]: [https://www.examtopics.com/discussions/cisco/view/61677-exam-350-401-topic-1-question-353-discussion/](https://www.examtopics.com/discussions/cisco/view/61677-exam-350-401-topic-1-question-353-discussion/)



