---
title: "Devsec Links #07"
description: "Interesting links on the topic of secure development."
date: 2023-09-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "gcp", "defcon", "ci/cd", "secrets"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 7
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month   
    
> In September 2017, Equifax, one of the main credit agencies in the USA, suffered a serious security incident. About 143 million Americans had their data compromised due to a vulnerability in the Apache Struts software used by the company. This highlighted the importance of application security and the need to keep software updated to protect sensitive information. The incident also influenced data protection regulations in the USA. 
 
## [How secrets leak in CI/CD pipelines](https://trufflesecurity.com/blog/secrets-leak-in-ci-cd/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-196-how-secrets-leak-in-ci-cd-ai-threat-modeling-supply-chain)  

The text explores secret leaks in CI/CD pipelines, highlighting the importance of protecting sensitive information during software development and delivery to prevent security breaches and protect code integrity. Practices and tools are offered to mitigate this risk. 

## [Preventing secrets in code](https://semgrep.dev/blog/2023/preventing-secrets-in-code/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-199-supply-chain-security-overview-container-escapes-ai-cybersecurity) 
The article addresses the prevention of secret leaks in code, emphasizing the importance of identifying and protecting sensitive information in software development. It also mentions a talk that took place at BSidesSF 2023 on this subject. 

## [4,500 of the top 1 million websites leaked source code and secrets](https://trufflesecurity.com/blog/4500-of-the-top-1-million-websites-leaked-source-code-secrets/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-199-supply-chain-security-overview-container-escapes-ai-cybersecurity) 
The research identified thousands of exposed .git directories on Alexa Top 1 Million websites. This exposes codes and secrets, including hundreds of valid API keys. AWS and GitHub keys were the most frequently leaked credentials. Additionally, a large proportion of GitHub credentials with administrator privileges were identified. One site even exposed the private key of the SSL certificate. The research also highlighted practices to avoid data exposure in Git directories. 

## [DEF CON 31 - The GitHub Actions Worm - Asi Greenholts](https://www.youtube.com/watch?v=j8ZiIOd53JU) 
In the talk given at DEF CON, the speaker explains how an attacker can exploit the GitHub custom Actions ecosystem, infecting an Action to spread malicious code to other Actions and projects. The presentation ends with a demonstration of a proof-of-concept malware, highlighting the importance of defenses against this type of attack. 

## [URL signing in GCP: convenience vs. security](https://lsgeurope.com/post/signing-urls-in-gcp-convenience-vs-security?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-194-cnappgoat-kubefuzz-tl-dr-sec-swag) 
It discusses the creation of signed URLs in Google Cloud Platform (GCP) using service account keys, explaining two methods: signing with the service account key and the signBlob IAM method. It highlights the importance of considering security risks, especially in using the signBlob method, which can lead to privilege escalation if the service account is compromised.  

## [Cherrybomb](https://github.com/blst-security/cherrybomb?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-198-building-a-detection-as-code-pipeline-nist-on-ci-cd-supply-chain-security-finding-malware-with-llms) 
Cherrybomb is a CLI tool that prevents incorrect code implementation early in development. It validates and tests APIs using OpenAPI files to ensure proper functioning and compliance with OEA rules. Additionally, it identifies common issues and vulnerabilities, providing detailed reports to facilitate correction. The goal is to reduce security errors and ensure the correct functioning of the API. 

