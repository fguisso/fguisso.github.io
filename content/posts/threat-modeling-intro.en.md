---
title: "Threat Modeling Intro"
description: "Threat Modeling Intro"
date: 2024-09-28T07:29:47-03:00
showTableOfContents: false
showDate: true
tags: ["Threat Modeling", "Security", "DevSecOps"]

---

{{< alert >}}
**Attention!** This article is still under construction...
{{< /alert >}}

# Threat Modeling Express: An Agile Approach to Security

{{< button href="https://guisso.dev/talks/threat-modeling" target="_self" >}}
Slides
{{< /button >}}

## Introduction

Threat Modeling is a powerful technique to identify potential threats and vulnerabilities in systems. In an ever-evolving security landscape, agile approaches such as **Threat Modeling Express** emerge as an efficient and collaborative way to continuously address these threats throughout the software development lifecycle.

In this article, we will explore the concept of Threat Modeling, its evolution, traditional approaches, and a new agile and practical method to integrate Threat Modeling into the workflows of development and security teams.

## What is Threat Modeling?

**Threat Modeling** is the process of identifying threats, vulnerabilities, and countermeasures in systems, aiming to minimize risks and strengthen security. It involves thinking like an attacker to anticipate potential risks and security flaws at every stage of a system's development.

## The Origins of Threat Modeling

Threat Modeling has a long history, starting in the 1960s when the first shared systems were exploited for vulnerabilities. Here are some important milestones:

- **1960s**: Initial attacks on shared systems.
- **1988**: Robert Barnard develops the first attacker profile for IT systems.
- **1994**: Edward Amoroso introduces the concept of "threat trees".
- **1998**: Bruce Schneier presents "attack trees" to systematize cyber risk analysis.
- **1999**: Microsoft develops **STRIDE**, one of the most popular Threat Modeling models.
- **2020**: Publication of the **Threat Modeling Manifesto**, highlighting the essential values and principles for Threat Modeling.
- **2024**: Launch of the **Threat Modeling Capabilities** document, which helps maximize the value of Threat Modeling practice.

## Growth of Threat Modeling in the Market

As cybersecurity gains relevance, more companies are adopting **Threat Modeling** as part of their secure development strategies. It provides a clearer view of risks and vulnerabilities during the design phases, reducing correction costs by anticipating problems.

At events such as the **International Threat Modeling Conference** (ThreatModCon), industry leaders discuss new trends and best practices in the application of Threat Modeling. The event gathers more than 100 companies, 20 international speakers, and an audience largely composed of security professionals.

## Traditional Approaches

Several well-established methodologies for **Threat Modeling** exist, each with its own characteristics. Here are some of the most well-known:

- **STRIDE**: Created by Microsoft, it helps identify threats in complex systems.
- **PASTA**: Focuses on attack simulations and compliance analysis.
- **Trike**: Uses threat models for auditing and risk management.
- **VAST**: Integrated with DevOps and based on process flows and diagrams.
- **Hybrid**: Combines different methodologies for a customized approach.

## Threat Modeling Express

The new agile approach called **Threat Modeling Express** simplifies the traditional process, focusing on collaboration, quick iterations, and continuous integration with DevSecOps. Its principles are based on agility and flexibility, making it ideal for teams that need to integrate security into the fast-paced development cycle.

## The Threat Modeling Express Process

### 1. Team Preparation and Engagement

The first step is to ensure that the development and security teams are aligned. Creating a shared security culture is key so that everyone understands the importance of Threat Modeling.

### 2. Data Flow Creation

Mapping the main data flows in the system is essential to identify critical vulnerability points. Visualize where data flows and how it might be intercepted or compromised.

### 3. Asset Identification

It is important to identify the most critical assets for system security, those that require the most protection. Each part of the system that stores or processes sensitive data must be assessed for vulnerability.

### 4. Threat Enumeration

At this stage, you must put yourself in the attackers' shoes and think about how they might compromise the system. Consider different types of threats, such as cybercriminals, state actors, hacktivists, and even internal threats, such as disgruntled employees.

### 5. Control Definition

With the threats identified, the next step is to define the technical and procedural controls to mitigate those threats. These controls are implemented as clear tasks for the development and security teams.

## Tools and Techniques

To facilitate the Threat Modeling process, some tools can be used:

- **Excalidraw**: A tool for visualizing data flows and modeling threats.
- **Jira/Trello**: Task management and integration with the Threat Modeling process.
  
Other important tools include:

- **Microsoft Threat Modeling Tool**: Uses the STRIDE model to identify threats.
- **IriusRisk**: A tool that integrates Threat Modeling throughout the development lifecycle.
- **OWASP Threat Dragon**: An open-source tool that helps create threat diagrams as part of the secure development lifecycle.

## Types of Threats

Enumerating threats is one of the main steps of modeling. To do this, you need to put yourself in the place of each **threat actor** and think about the ways they could cause problems to the system or access assets. Some examples of threat actors include:

- **Cybercriminals**: Motivated by financial gain.
- **State-sponsored actors**: Engaged in espionage and sabotage.
- **Hacktivists**: Use attacks to promote political or social causes.
- **Thrill-seekers**: Attack for fun or learning but may cause harm.
- **Insiders**: Internal threats, either intentional or accidental, from employees.
- **Cyberterrorists**: Act with political or ideological motivations.

Beyond these traditional actors, in our company, we discussed other possibilities, such as **reality show fans**, who can organize massive voting campaigns, disrupt voting systems, or even promote online defamation campaigns. For more information on emerging threat actors, check out the [OWASP Global AppSec 2023](https://owasp2023globalappsecwashin.sched.com/event/1M6Qh/the-threat-actors-we-forgot-to-model-profiling-socially-motivated-cyber-criminals) presentation.

## Conclusion

**Threat Modeling Express** offers an agile and efficient way to integrate Threat Modeling into the development cycle, helping mitigate risks before they become problems. With the increasing complexity of threats, it is essential that security and development teams work together to protect their systems proactively.

If you haven't implemented Threat Modeling yet, now is the time to start. Integrate it into your development pipeline and keep your organization safe from the threats of today and tomorrow.
