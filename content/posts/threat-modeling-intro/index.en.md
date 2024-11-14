---
title: "<span>Threat Modeling</span> Intro"
description: "Threat Modeling Intro"
date: 2024-09-28T07:29:47-03:00
showTableOfContents: false
showDate: true
hideFeatureImage: true
tags: ["Threat Modeling", "Security", "DevSecOps"]

---

## Introduction

Threat Modeling is an essential practice for teams looking to identify and mitigate threats and vulnerabilities in their systems. In a constantly evolving security landscape, **Threat Modeling Express** is an approach that enables the integration of security into the agile development cycle in a continuous and collaborative way. This practice provides an overview that not only aids in detecting issues but also engages the team in security practices.

In this article, we’ll go through the practical application of Threat Modeling Express, from conception to implemented controls, along with daily insights to make the process thorough and realistic.

### Presentation and Video

If you’d like to follow this article as a presentation, check out my interactive slides [here](https://guisso.dev/talks/threat-modeling) and the video of this talk at the OWASP Brasília Chapter [here](https://www.youtube.com/watch?v=3TVmFqaAA1o).

## What is Threat Modeling?

**Threat Modeling** is the process of identifying threats, vulnerabilities, and countermeasures in systems with the aim of minimizing risks and strengthening security. It involves thinking like attackers to anticipate potential security failures. Unlike security tools that typically detect only technical vulnerabilities, Threat Modeling allows for a clearer understanding of the direct impact of threats on the business.

## The Origin and Evolution of Threat Modeling

Threat Modeling has evolved over the decades since the 1960s, with key milestones shaping its current form:

- **1960s**: Beginnings of the first attacks on shared systems with multi-user access.
- **1988**: Robert Barnard develops the first attacker profile for IT systems.
- **1994**: Edward Amoroso introduces the concept of "threat trees," graphically structuring how threats can be exploited.
- **1998**: Bruce Schneier popularizes "attack trees," enabling a more systematic analysis of cyber risks.
- **1999**: Microsoft develops **STRIDE**, a widely used methodology for identifying specific system threats.
- **2020**: Launch of the **Threat Modeling Manifesto**, emphasizing core principles for Threat Modeling practice.
- **2024**: Publication of the **Threat Modeling Capabilities** document, providing guidelines to maximize the effectiveness of threat modeling.

These advances show how the practice has evolved to become an essential component in modern security, increasingly integrated into software development processes.

## Why is Threat Modeling Important?

Unlike other security practices that focus on vulnerabilities, Threat Modeling enables an understanding of the direct impact of threats on the business. Instead of presenting a technical list of flaws, Threat Modeling provides a clear and understandable view for managers, explaining the impact of each threat and justifying the importance of mitigation. This facilitates communication between technical and business teams, bringing alignment and avoiding rework in production.

For example, it’s easier for an executive to understand that there is a risk of financial loss due to data manipulation (threat) than to explain that a technical vulnerability, such as **Insecure Deserialization**, can lead to **RCE** (Remote Code Execution).

## Threat Modeling Growth in the Market

The use of Threat Modeling has grown exponentially as companies seek ways to proactively protect themselves from cyber threats. At events like [ThreatModCon](https://www.threatmodcon.com/), industry leaders share their experiences and innovative approaches, showing how the practice is evolving to meet the needs of an ever-changing market.

## Traditional Approaches and Threat Modeling Tools

Several traditional methodologies for Threat Modeling exist, each with its own characteristics:

- **[STRIDE](https://learn.microsoft.com/en-us/previous-versions/commerce-server/ee823878(v=cs.20))**: Focused on specific threats like spoofing and privilege escalation.
- **[PASTA](https://www.wiley.com/en-us/Risk+Centric+Threat+Modeling%3A+Process+for+Attack+Simulation+and+Threat+Analysis-p-9780470500965)**: A seven-step model aligning business objectives with technical requirements.
- **[Trike](https://www.iriusrisk.com/resources-blog/trike-threat-modeling-methodologies)**: Emphasizes risk auditing and management.
- **[VAST](https://www.threatmodeler.com/threat-modeling-methodologies-vast/)**: Integrated with DevOps, using flow diagrams to model threats in an agile way.
- **Hybrid**: Combines elements of different methodologies for complex scenarios.

# Threat Modeling Express

The agile approach known as **Threat Modeling Express** simplifies the traditional process, focusing on collaboration and quick iterations. The methodology is designed to integrate with DevSecOps, allowing teams to develop threat models in short cycles and continue refining them as development progresses.

## Threat Modeling Express Process

### 1. Team Preparation and Engagement

Team engagement is the starting point and should begin before the threat modeling itself. Ensuring developers are comfortable with security practices and integrated with the team is essential. DevSecOps values the involvement of all team members, including engineers, designers, and PMs. It’s important for everyone to understand the importance of each step, which facilitates the implementation of controls later on.

> *My role as appsec is to make devs "fight" for security, just as they "argue" that VSCode is better than Vim or Emacs.*  
> — Fernando Guisso

### 2. Creating the Data Flow

Creating the **data flow** is fundamental to mapping where data moves within the system and where it could be compromised. This process involves the development team, as they know the system best. Encourage the team to lead the creation of the data flow by identifying users, processes, and databases.

Familiar tools, such as Excalidraw, draw.io, or even MermaidJS diagrams, can be used to ensure that everyone is comfortable with the process. The important thing is for the team to be comfortable with the chosen tool so that the focus remains on threat analysis rather than adapting to the technology used for the data flow.

During this stage, it is important to focus on the main flows and simplify them. We could detail each endpoint, but for a more agile approach, the goal is to capture the most critical flows. Remember, the scope should focus on what the team can act upon, avoiding mapping processes beyond the team’s direct control.

![threat-modeling-sample](/img/threat-modeling-sample.svg)

### 3. Asset Identification

After mapping the data flow, it’s essential to identify which assets are critical and need extra protection. The team should list all essential components or data that could have significant impacts if compromised. However, it’s necessary to limit the list to only the most critical elements, those that truly require specific security controls.

![threat-modeling-assets](/img/threat-modeling-assets.svg)

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">A1</span> **User Session Token**:
- While analyzing the application, we saw that the session token is the main mechanism for user authentication and authorization. If an attacker obtains this token, they could perform actions on behalf of the user without restriction. This is critical as it directly involves the user's identity and could lead to unauthorized access to sensitive information.
- Note that the A1 is present in multiple locations. If time permits, it’s beneficial to mark all points where an asset is either at rest or in transit.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">A2</span> **Personal Data**:
- We identified that the application stores personal data, such as names, social security numbers, and possibly other sensitive information. These data not only need to be protected to comply with privacy laws but are also a common target for attacks. Ensuring the protection of this data is fundamental to preventing leaks that could compromise user privacy and trust.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">A3</span> **Database Credentials**:
- Database credentials are essential for the application to connect to the database and perform operations. If an attacker gains access to these credentials, they could directly access the database, with the potential to read, alter, or even delete data. This is a high-priority asset, as exposure of these credentials would fully compromise the integrity and confidentiality of the stored data.

### 4. Threat Listing

The goal in threat listing is to put yourself in the position of attackers and think about how they would compromise the system. The team should use the **data flow** created to identify points where assets may be attacked. Encourage the team to “wear the hat” of different threat actors, opening their minds to new possibilities.

#### Threat Actors

Threat modeling should consider a variety of actors, including:

- **Cybercriminals**: Motivated by financial gain, frequently use ransomware and phishing.
- **State-Sponsored Actors**: Focused on espionage and sabotage, targeting critical infrastructure.
- **Hacktivists**: Seek to promote social or political causes.
- **Curious Attackers**: Attack for fun or learning, though they can cause damage.
- **Insiders**: Internal actors, intentional or accidental, who have privileged access to the system.
- **Cyber Terrorists**: Driven by political or religious ideologies, aiming to cause chaos.

In addition, we have discussed new possibilities within our company, such as **reality show fans (Big Brother Brazil)** who organize mass voting or online defamation campaigns, which can bring significant impact to our product. We handle over [3M votes per minute](https://www.hcaptcha.com/post/globo-counts-nearly-3-million-votes-per-minute-with-hcaptcha-enterprise), which need to be well-managed as this show is a key product. For more insights on considering new threat actors, check out this talk at [OWASP Global AppSec 2023](https://owasp2023globalappsecwashin.sched.com/event/1M6Qh/the-threat-actors-we-forgot-to-model-profiling-socially-motivated-cyber-criminals).


![threat-modeling-threats](/img/threat-modeling-threats.svg)

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T1</span> **Sensitive Data Interception**:

- This threat was identified when analyzing the data flow between the client and the server. When credentials and personal data are transmitted, there is a risk of interception, particularly if the communication is unencrypted. Interception could allow an attacker to obtain sensitive information in transit, compromising user privacy and data integrity.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T2</span> **Session Token Exposure**:

- The session token is essential for authentication, so any vulnerability allowing unauthorized access to it could result in session hijacking. If the token is exposed, an attacker could perform actions on the system in the user’s name. This was identified by considering the possibilities of insecure storage or improper transmission of the token through vulnerable channels.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T3</span> **Service Unavailability**:

- Availability is a crucial pillar of security. This threat was considered when thinking about denial of service (DoS) attacks or resource overloads that could render the system inaccessible to users. Unavailability, whether due to an intentional attack or a technical failure, directly impacts user experience and system reliability.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T4</span> **Credentials Exposure**:

- Access credentials for databases and other critical services are highly sensitive. During analysis, we noted that poor configuration or insufficient protection of these credentials could expose them, allowing an attacker to access data directly. This threat aims to compromise system security directly by enabling further attacks.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T5</span> **Unauthorized Access to Personal Information**:

- This threat arose from analyzing who could access personal information without permission. Unauthorized access or exposure to personal data could occur due to access control failures or vulnerabilities that allow direct system exploitation. This represents a privacy breach and could lead to legal consequences and loss of user trust.

### 5. Defining Controls

With threats listed, the next step is defining specific controls to mitigate the risks. These controls can be technical or procedural and should be documented even if already implemented. This ensures a broad view of defense mechanisms and allows for tracking the effectiveness of controls over time.

The team should create clear tasks for implementing and monitoring these controls throughout the product lifecycle, validating controls like multifactor authentication or encryption to ensure they remain active and effective after system updates.

![threat-modeling-controls](/img/threat-modeling-controls.svg)

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C1</span> **TLS Pinning**:
- To prevent man-in-the-middle (MitM) attacks, where an attacker can intercept or alter data in transit, TLS Pinning is implemented. This control ensures that the application only accepts specific and valid certificates, safeguarding the authenticity of the connection to the server.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C2</span> **Encryption of Sensitive Data in Transit**:
- Sensitive data, such as personal information or session tokens, is at risk of interception. Encrypting data in transit ensures that any data captured through interception remains unreadable and, therefore, useless to the attacker.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C3</span> **Secure Token Storage**:
- To protect session tokens, it is essential to avoid storing them in vulnerable areas. For mobile devices, we use Keychain (iOS) and Keystore (Android), which provide secure, encrypted storage areas, making unauthorized access to tokens more difficult.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C4</span> **Rate Limiting and Request Control**:
- Denial of service (DoS) attacks and resource overloads are mitigated by limiting the number of requests allowed per IP or source. This control helps maintain system availability and detect anomalous access patterns.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C5</span> **Encrypted Credential Storage in Secret Management Systems**:
- Database credentials are high-priority targets for attackers. Using a secret management system, like AWS Secrets Manager or HashiCorp Vault, allows for encrypted and secure storage, protecting the credentials while facilitating rotation and access monitoring.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C6</span> **Granular Access Controls**:
- To reduce the risk of unauthorized access, we implement access controls based on the principle of least privilege, ensuring that each user or process has access only to the data and operations strictly necessary. This limits the impact in case of account or function compromise.

## Final Outcome

In conclusion, this example illustrates how Threat Modeling goes beyond simply mapping the data flow. While the data flow is essential for understanding system interactions and entry points, the true value for product security maturity lies in the detailed annotations of identified threats and controls.

Documented threats provide a foundation for anticipating risks that may arise during development, while controls offer the necessary defense line to mitigate these risks. Keeping these notes updated and reviewing them periodically ensures that as the system evolves, security continues to be enhanced, helping to protect the product against attacks and strengthen user trust.

## Supporting Tools and Techniques

To facilitate the Threat Modeling Express process, tools like Excalidraw for quick data flow visualization, Jira and Trello for task management, and Microsoft Threat Modeling Tool and OWASP Threat Dragon for threat modeling can be used. Choosing a tool should prioritize team familiarity, ensuring time is spent on the security process itself.

Before beginning the modeling process, it is essential to choose a tool for drawing the **data flow**. Some popular options include:

- Dataflow: Visualize data flows and identify threats.
  - **[Excalidraw](https://excalidraw.com/)**
  - **[Draw.io](htpps://draw.io)**
  - **[Miro](https://miro.com/)**
  - **[MermaidJS](http://mermaid.js.org/)**
- Threat Management
  - **Jira and Trello Integration**: Manage Threat Modeling-related tasks.
  - <span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">Internal</span> **Threat Modeling API**: AppSec team internal system at Globo.
  - <span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">In Progress</span> **[ThreatMax](https://github.com/fguisso/threatmax)**

The important thing is for the team to be comfortable with the chosen tool, as the goal is to spend time on threat modeling and not on learning new software. If the team is already familiar with one of these options, it’s more efficient to continue with it to ensure everyone is focused on the main objective.

## Challenges and Best Practices

Implementing Threat Modeling Express may face resistance due to the need for cultural change. Engaging the team and promoting a security culture is essential to overcoming this challenge. For some companies, Security Champions programs, participation rewards, and regular security events, such as dojo and hands-on sessions, help cultivate a security culture.

## Measuring Success

To monitor the success of Threat Modeling, it is important to track metrics, such as the number of threats identified and mitigated. Some companies develop custom systems to log threats and controls, enabling continuous analysis and process adjustment as needed.

## Use Cases: Continuous Iterations and Constant Alignment

In agile teams where features change with each sprint, it is recommended to conduct a Threat Modeling analysis in small increments, accompanying each new feature. However, the team’s maturity level can influence the frequency of modeling.

## Conclusion

**Threat Modeling Express** offers an agile and efficient way to integrate threat modeling into the development cycle, helping to mitigate risks before they become problems. With the growing complexity of threats, it is essential that security and development teams work together to protect their systems proactively.

If you haven’t yet implemented Threat Modeling, now is the time to start. Integrate it into your development pipeline and keep your organization secure against today’s and tomorrow’s threats.

Remember, security is a continuous and collaborative process, and the sooner it is integrated into development, the more effective system protection will be.

<script>
    window.onload = function() {
        var zenButton = document.getElementById('zen-mode-button');
        zenButton.click();
    };
</script>
