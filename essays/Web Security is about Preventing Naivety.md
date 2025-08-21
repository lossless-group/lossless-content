---
date_created: 2024-12-18
date_modified: 2025-08-20
site_uuid: 651c6e9b-c169-46d0-ac7a-65af928da319
title: Web Security is about Preventing Naivety
lede: Web security isn’t just about code—it’s about anticipating naivety at every layer.
date_authored_initial_draft: 2024-12-18
date_authored_current_draft: 2025-04-24
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Perplexica AI
category: 'Counterintuitive Approaches'
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_portraitimage_Web-Security-is-about-Preventing-Naivety_e0deec41-f157-4ff3-8f3a-01d8cd6119bc_0DzSYGdQm.jpg
image_prompt: A digital fortress with a moat, inside are everyday users, while outside shadowy figures try to cross. The mood is vigilant, modern, and slightly tense.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_bannerimage_Web-Security-is-about-Preventing-Naivety_b59c34e3-ddcf-4b36-b2e1-33361e161945_f3ABHaI7G.jpg
tags: [Explainers, Explorations, Web-Security, Privacy-Cloud]
authors:
  - Michael Staton
---

Worrying about web security in 2025 is vastly different than the doom-cycle of nail-biting anxiety and public outrage that has been going on for decades. It's almost like worrying about Cholera in the 1860s, the decade after John Snow demonstrated that Cholera is spread through unclean water sources, .[^1] We know what to do, it's just a matter of getting everyone to do it.  

>The best antivirus software out there is common sense. 

Nearly all recent security blunders are due to human ignorance, carelessness, or malfeasance. While data security threats are numerous, with [[#Real and Active Threats]] abound, they largely affect organizations that do not properly stay on the stable-edge of mainstream technology infrastructure, or keep data in unprotected storage on unprotected networks.  Or, even more likely, vulnerable organizations employ or serve individuals who do not follow common security practices and guidelines, and do not update their software regularly. More likely than is acknowledged, vulnerable organizations contract external services that are in someway provided by people engaging in purposeful espionage.[^3]

The institutions, systems, governance, and frameworks were immature for quite a while (actually, until just the past few years.)  Going into 2025,  while there is still every need to be cautious,  like --  wash your hands, try not to kiss anyone with large red sores on their lips, don't drop a glass vial marked "biohazard" on the kitchen floor -- kind of cautious. Those who run around with sirens and megaphones fear-mongering people in 2025 might feel behind the times.  

Everyday citizens can now be rest assured that the wild-west of the Internet has been slowly tamed by boring committees and organizations with enchanting names like [[organizations/The Internet Society]], [[organizations/OASIS Open]],  [The Global Cyber Alliance](https://globalcyberalliance.org/) , .  The [Public Technical Identifiers](https://pti.icann.org/) as part of the [Internet Assigned Numbers Authority](https://www.iana.org/).



The Online Certificate Status Protocol (OCSP) [[projects/Emergent-Innovation/Standards/OCSP]] standard was published February 2013. This protocol is managed by a non-profit Trust called "[The Internet Society](https://www.internetsociety.org/)", and among the several umbrella efforts of theirs includes [Extending Encryption](https://www.internetsociety.org/action-plan/encryption/) and [Securing Global Routing](https://www.internetsociety.org/action-plan/securing-global-routing/)
The protocols that govern routing are managed by [The Global Cyber Alliance](https://globalcyberalliance.org/).  The [Internet Engineering Task Force](https://www.ietf.org/).

As of August 2018, all browsers were "notified" that any cipher without perfect forward secrecy would no longer need to be supported, nor would they be supported.  The TLS Specification for 1.3 was released on August 2018


Security breaches come in many forms, but often get the analogy of "species" because they take shape and behave in patterns. 

Distributed Denial of Service (DDoS)
Man-in-the-Middle
Eavesdropping
Cross-Site Scripting (XSS)
SQL Injection

[[projects/Emergent-Innovation/Standards/HTTPS]] 
Secure Socket Layer (SSL)/Transport Layer Security (TLS), including getting a SSL/TLS certificate
Two-Factor Authentication (2FA)
SSH
[[projects/Emergent-Innovation/Standards/XACML]]
[[projects/Emergent-Innovation/Standards/One-Time Password]]



HTTPS uses public-key cryptography to generate temporary private "session" keys.  These session keys secure the "transport" of data from "server" to "client." Even "cookies" must have a "secure attribute."

[[projects/Emergent-Innovation/Standards/XACML]] (eXtensible Access Control Markup Language) is a protocol 

The migration to HTTPS has been exponential.   HTTPS Everywhere, originally a browser extension, is now embedded into all updated browsers.  Users must specifically bypass a browser warning to travel to destinations that are "uncertified" with TLS.  

 Generally speaking, any recent releases of any web application framework has a "batteries included" approach to web security.  This includes validating input data and sanitizing user input to prevent SQL injection and XSS attacks, and protecting the database by channelling queries through safe functions. In addition, any reputable cloud hosting provider also comes with a "batteries included" approach. Nearly all major databases come with role-based access control (RBAC) models.  

Web Security technologies, like most technologies of the Internet, are generally created by insightful individuals or small teams, proposed through a White Paper, and eventually managed by a transparent and meritocratic, yet open membership organization. As an example, Alex Pentland, a Professor at MIT, published early work that became the [Kerberos](https://www.kerberos.org/) user identity management protocols. Kerberos as an organization has evolved into the [MIT Trust Data Consortium](https://trust.mit.edu/)  The white papers were sythesized and published as Trust::Data: A New Framework for Identity and Data sharing by MIT Press in 2016.  

Similarly, the [[organizations/Internet Engineering Task Force]] published [[projects/Emergent-Innovation/Standards/OAuth]] as a specification in 2007. 

Industries that capture user data are generally both self-governed through industry membership organizations, and regulated by policies and agencies across many jurisdictions.  For instance, credit card information is taken through the Payment Card Industry Data Security Standard (PCI DSS). The cloud hosting providers have cloud security posture management (CSPM) tooling. 

address verification systems (AVS) and card verification values (CVV) to reduce fraud.


As of 2015, the [[organizations/Society for Human Resource Management]] found that most security breaches came from "Human Error." [^2] 

Many threats to data-security come from "accidental insiders".  Phishing is the art of tricking users, usually over email but increasingly over text or messaging, into revealing sensitive information or downloading malware through fraudulent emails or websites. Unsecured devices are laptops and phones that have not been properly secured and/or cannot be properly wiped after being lost. 

Apple has been the most vigilant of the big tech companies on Security and Privacy.  They finally published a full framework called App Tracking Transparency (ATT), which includes everything in their [StoreKit](https://developer.apple.com/documentation/storekit) their IDFA attribution (the Device ID) and [SKAdNetwork](https://developer.apple.com/documentation/storekit/skadnetwork/) attribution technology. The MacOS comes with a custom designed System Integrity Protection (SIP).

## A Safari of Security Threats

### Real and Active Threats
[[Zero Day Markets]] 
[[Reverse Shells]]

The true threat is almost always in [[Operational Security]]
[How hackers remain anonymous](https://youtu.be/BWVyp0wYpgA?si=gTtiRorghVowj3x3)  [[Proxy Chains]]

[[Ephemeral Environments]]



## A Safari of Security Solutions

[[organizations/Transcend]] 


https://youtu.be/91VaTyTGYfw?si=QsPrfs8PjEil9wze

[^1] ) 2017, Mar 30. [John Snow, Cholera, the Broad Street Pump; Waterborne Diseases Then and Now](https://pmc.ncbi.nlm.nih.gov/articles/PMC7150208/). 

[^2]. 2015, Apr 13. [Roy Maurer](https://www.shrm.org/mena/about/bio/roy-maurer), [Human error accounts for 52 percent of the root causes of security breaches](https://www.shrm.org/mena/topics-tools/news/risk-management/human-error-cited-top-cause-data-breaches) Published on [[organizations/Society for Human Resource Management]].

[^3] a demonstration of hardware that can give those in data espionage access to local networks includes https://youtu.be/1lZ3FQSv-wI?si=ZNclvB6DDyNsoTTX

https://youtu.be/XSJLyK9LlnY?si=C41swBMsg2GJLPmS