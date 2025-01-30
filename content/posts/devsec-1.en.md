---
title: "Devsec Links #01"
description: "Interesting links on the topic of secure development."
date: 2023-03-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "chatgpt", "api", "cors", "tls", "git", "secrets"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 1
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month 
  
> In March 1988, the "Morris Worm", the first large-scale computer worm, was discovered. Spreading through Unix networks, it caused global disruptions. This highlighted the importance of information security and the need to protect systems from vulnerabilities. Since then, security techniques have evolved to protect networks against sophisticated cyber threats.

## [Security Code Review with ChatGPT](https://research.nccgroup.com/2023/02/09/security-code-review-with-chatgpt/)

The article presents a critical analysis of the application of ChatGPT in security code review, demonstrating that although the machine-trained natural language model can be useful for identifying some vulnerabilities, it is not reliable enough to completely replace traditional code review techniques. The authors discuss the limitations of ChatGPT and the failures that can occur when relying exclusively on the model to identify security issues in source code.

## [Detecting malicious packages and how they obfuscate code to avoid detection](https://jfrog.com/blog/detecting-known-and-unknown-malicious-packages-and-how-they-obfuscate-their-malicious-code/)

In this post, JFrog presents techniques for detecting known and unknown malicious packages in repositories, explaining how these malicious packages hide malicious code through obfuscation. The author discusses strategies to detect and prevent these packages from being deployed in your code, highlighting the importance of collaboration between security tool vendors and open-source communities to protect developers and end-users from malicious attacks.

## [c{api}tal](https://github.com/Checkmarx/capital)

The c{api}tal application contains 10 API challenges that correspond to the OWASP Top 10 API risks. The goal is to help developers understand and deal with common API vulnerabilities in practice. The application is built in Python (FastAPI) and JS (React), uses OpenAPI3 and JWT for authentication. The link includes instructions for running the application locally and an overview of the challenges and security risks addressed.

## [Fearless CORS](https://jub0bs.com/posts/2023-02-08-fearless-cors/): a design philosophy for CORS middleware libraries (and a Go implementation)

Introducing the Web's Same-Origin policy and how it can be circumvented through Cross-Origin Resource Sharing (CORS), the author presents an approach called "Fearless CORS," which allows the safe use of cross-origin resources without exposing the application to security vulnerabilities. Following principles such as optimizing readability, simple and concise API, and performance, he discusses how this approach can be implemented and provides code examples to help developers implement it in their Web applications.

## [Employee-facing mutual TLS](https://medium.com/pinterest-engineering/employee-facing-mutual-tls-8643fe0cc0f9)

Pinterest implemented a strong authentication solution using Mutual TLS (mTLS) to authenticate employees to their internal services. The author discusses how the mTLS approach provides a higher level of security compared to other authentication solutions, including password-based authentication, and describes how Pinterest implemented the solution in their infrastructure with minimal impact on the user side. The article also highlights the challenges encountered during implementation and how they were overcome.

## [Going Phishless](https://panther.com/blog/going-phishless-how-panther-deployed-webauthn/): How Panther Deployed WebAuthN with Okta and YubiKeys

Phishing is a type of attack that leads users to click on malicious emails and links, either to steal system credentials, banking information, or install malware. In this article, Panther Security implemented passwordless authentication using WebAuthn to protect their internal services from phishing and other security threats. The author discusses how the passwordless approach provides a higher level of security compared to traditional passwords and how Panther implemented the solution in their infrastructure. The article also highlights the challenges encountered during implementation and how they were overcome.

## [GitGuardian 2023 Report: Secrets Sprawl](https://www.gitguardian.com/state-of-secrets-sprawl-report-2023)
Did you know that in 2022, 10 million secrets were detected in public commits on GitHub? A 67% increase compared to 2021. It's an alarming number! The GitGuardian State of Secrets Sprawl report reveals the most compromised sensitive data, the most common security flaws, and the emerging threats you need to know when using Git.

