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

## Introduction

Threat Modeling is a powerful technique for identifying potential threats and vulnerabilities in systems. In an ever-evolving security landscape, agile approaches like **Threat Modeling Express** emerge as an efficient and collaborative way to address these threats continuously throughout the software development lifecycle. This methodology allows teams to visualize risks practically, facilitating decision-making and the implementation of appropriate countermeasures.

## What is Threat Modeling?

**Threat Modeling** is the process of identifying threats, vulnerabilities, and controls within systems to minimize risks and strengthen security. It involves thinking like an attacker to anticipate potential risks and security flaws at every stage of system development. Unlike other practices, the focus is on business impact, directly linking threats to organizational risks.

## Origin and Evolution of Threat Modeling

Threat Modeling has evolved over the decades since the 1960s, with significant milestones shaping its current practice:

- **1960s**: The first attacks against shared systems emerged with multi-user access environments.
- **1988**: Robert Barnard developed the first attacker profile for IT systems.
- **1994**: Edward Amoroso introduced the concept of "threat trees," structuring graphically how threats could be exploited.
- **1998**: Bruce Schneier popularized "attack trees," enabling a more systematic analysis of cyber risks.
- **1999**: Microsoft created **STRIDE**, a widely used methodology to identify specific threats in systems.
- **2020**: The **Threat Modeling Manifesto** was launched, emphasizing core principles for Threat Modeling practice.
- **2024**: The publication of the **Threat Modeling Capabilities** document offered guidelines for maximizing the effectiveness of Threat Modeling.

These milestones show how the practice has developed to become an essential component in modern security, increasingly integrating into software development processes.

## Why is Threat Modeling Important?

Unlike other security practices that focus solely on listing technical vulnerabilities, Threat Modeling provides a clearer and more direct view of business risks. It connects specific threats to potential impacts on the organization, making communication between technical teams and managers easier.

For example, it is simpler for an executive to understand that there is a risk of financial loss due to data tampering (threat) than to explain that a technical vulnerability like **Insecure Deserialization** could lead to **RCE** (Remote Code Execution). With Threat Modeling, communication about risks becomes clearer, and mitigation decisions are more justified.

## Growth of Threat Modeling in the Market

The use of Threat Modeling has grown exponentially as companies seek proactive ways to protect against cyber threats. Events like the **International Threat Modeling Conference** (ThreatModCon) bring together industry leaders to share their experiences and innovative approaches, showcasing how the practice is evolving to meet the needs of a constantly changing market.

## Traditional Approaches and Threat Modeling Tools

There are several well-established methodologies for Threat Modeling, each with its own specificities:

- **STRIDE**: Focuses on specific threats like spoofing and privilege escalation.
- **PASTA**: A seven-step model that aligns business objectives with technical requirements.
- **Trike**: Emphasizes auditing and risk management.
- **VAST**: Integrated into DevOps, using flow diagrams for agile threat modeling.
- **Hybrid**: Combines elements from different methodologies for complex scenarios.

### Data Flow Modeling Tools

Before starting the modeling process, it is essential to choose a tool for drawing the **data flow**. Some popular options include:

- **draw.io**
- **Excalidraw**
- **MermaidJS**

What matters is that the team is comfortable with the chosen tool, as the goal is to use time to model threats, not to learn a new tool. If the team is already familiar with one of these options, it is more efficient to proceed with it to ensure everyone remains focused on the main objective.

## Threat Modeling Express

The agile approach called **Threat Modeling Express** simplifies the traditional process, focusing on collaboration and quick iterations. The methodology is designed to integrate into DevSecOps, allowing teams to develop threat models in short cycles and continuously refine them as development progresses.

## Threat Modeling Express Process

### 1. Team Preparation and Engagement

The first step is to ensure that the development and security teams are aligned and engaged. This begins with creating a shared security culture. Participate in the team's existing rituals, such as daily stand-ups and planning meetings, to understand what the team does and how each part connects to the product. This initial engagement helps build trust and interest in security.

The phrase “Security should be defended like programming languages or IDEs” is fundamental here. The goal is to make the team "fight" for security just as they advocate for their favorite technologies. When the team feels part of the process and sees value in what they are doing, collaboration flows better, and threat modeling becomes more effective.

### 2. Data Flow Creation

Creating the **data flow** is essential to map where data flows through the system and where it might be compromised. The process involves the development team, as they are the ones who know the system best. Encourage the team to lead the creation of the data flow, identifying users, processes, and databases.

During this stage, it is important to focus only on the main flows and simplify. We can detail each endpoint, but for an agile approach, the goal is to capture the most critical flows. Remember that the scope should focus on what the team can act on, avoiding mapping processes outside the team's direct control.

### 3. Asset Identification

Asset identification is the next step. Here, we list the critical components of the system that need to be protected, such as databases, APIs, and sensitive services. Explain to the team what assets are and why it is important to focus on what could truly impact the business. Highlighting the assets helps the team see clearly where risks are concentrated.

### 4. Threat Enumeration

In threat enumeration, the goal is to put yourself in the attacker’s position and think about how they might compromise the system. The team should use the created **data flow** to identify the points where assets can be attacked. Encourage the team to "wear the hat" of different threat actors, opening their minds to new possibilities.

#### Threat Actors

Threat modeling should consider a variety of actors, including:

- **Cybercriminals**: Motivated by financial gain, they often use ransomware and phishing.
- **State-sponsored actors**: Focused on espionage and sabotage, targeting critical infrastructure.
- **Hacktivists**: Aim to promote social or political causes.
- **Thrill-seekers**: Attack for fun or learning but may cause damage.
- **Insiders**: Internal actors, intentional or accidental, with privileged system access.
- **Cyberterrorists**: Driven by political or religious ideologies, seeking to cause chaos.

Additionally, at our company, we discussed new possibilities, such as **reality show fans(Big Brother Brazil)** who organize mass voting campaigns or online defamation efforts. Today we have more than [3M votes per minute](https://www.hcaptcha.com/post/globo-counts-nearly-3-million-votes-per-minute-with-hcaptcha-enterprise), this is the biggest voting in the world. To understand these emerging actors better and how to think in new possibilties, check out the [OWASP Global AppSec 2023](https://owasp2023globalappsecwashin.sched.com/event/1M6Qh/the-threat-actors-we-forgot-to-model-profiling-socially-motivated-cyber-criminals) talk.

### 5. Control Definition

With threats identified, the next step is to define technical and procedural controls to mitigate them. Here, the team should note all controls, even those already implemented, to ensure they are continuously applied correctly and remain effective.

The team should create clear tasks for implementing and monitoring these controls throughout the product lifecycle. This includes, for example, validating if controls like multi-factor authentication or encryption remain active and effective after system updates.

## Conclusion

**Threat Modeling Express** offers an agile and efficient way to integrate threat modeling into the development cycle, helping mitigate risks before they become problems. With the increasing complexity of threats, it is essential for security and development teams to work together to protect their systems proactively.

If you haven’t implemented Threat Modeling yet, now is the time to start. Integrate it into your development pipeline and keep your organization safe from today’s and tomorrow’s threats.

Remember, security is a continuous and collaborative process, and the earlier it is integrated into development, the more effective the protection of your systems will be.

