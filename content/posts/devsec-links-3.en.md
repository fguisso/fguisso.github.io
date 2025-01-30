---
title: "Devsec Links #02"
description: "Interesting links on the topic of secure development."
date: 2023-04-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "oauth", "oidc", "passwordless", "iam", "terraform"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 2
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month  
   
> In April 2017, the Shadow Brokers hacker group leaked NSA hacking tools, including the notorious EternalBlue exploit. These leaks led to the massive WannaCry and NotPetya ransomware attacks in 2017, causing global disruptions and financial losses. The incident highlighted the risks of cyber espionage, government vulnerability hoarding, and the need for better cooperation between cybersecurity researchers and government agencies.

## [An illustrated guide to OAuth and OpenID Connect](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc) 

Nothing better than an illustrative guide to explain how OAuth and OpenID Connect (OIDC) protocols work in an application authentication and authorization context. In this article, the authors use illustrations and examples to make understanding these concepts more accessible, explaining everything from the difference between authentication and authorization to how access and refresh tokens are used to allow users to access protected resources on behalf of applications. This guide provides useful information to teach us how to design systems that require secure authentication!
 
## [SCARLETEEL: Operation leveraging Terraform, Kubernetes and AWS for data theft](https://sysdig.com/blog/cloud-breach-terraform-data-theft/) 

Article about a real case of data breach in the cloud through a misconfigured Terraform infrastructure. An intruder managed to access S3 bucket credentials and copy sensitive data. The authors highlight the importance of security in Terraform configuration and recommend preventive measures, such as data encryption and the use of access controls.

## [Five things you need to know about malware in Storage Buckets](https://orca.security/resources/blog/the-risks-of-malware-in-storage-buckets/) 

Article that highlights the security risks associated with the presence of malware in cloud storage buckets. The authors explain how cybercriminals exploit vulnerabilities in inadequate storage configurations to infect files with malware. They recommend preventive measures, such as implementing robust security practices and using real-time threat detection and response solutions.

## [New hires, lost keys, and lessons learned (passwordless authentication series, #3)](https://blog.palantir.com/new-hires-lost-keys-lessons-learned-passwordless-authentication-series-3-dfdd79e89fb6) 

In this article, you'll see an approach to adopting passwordless authentication at Palantir and the advantages of this approach compared to traditional password-based methods. The text highlights the lessons learned from implementing the new system and how passwordless authentication can be a secure and effective solution for companies concerned with data security.

## [Mobile Security](https://github.com/wh0isdxk/MobileSecurity) 

MobileSecurity is a Github repository that contains various contents such as summaries and suggestions for tools and lectures aimed at helping to ensure user security and privacy on mobile devices, such as smartphones and tablets. The repository is open source and can be used and modified by anyone interested in mobile security.

## [CoPilot Review: my thoughts after 6 months](https://www.youtube.com/watch?v=RDd71IUIgpg) 

The video is a programmer's commentary on "GitHub CoPilot", a code assistance tool that uses artificial intelligence to generate code suggestions as the programmer writes. The video offers a critical perspective on the technology and ends with the programmer's opinion on using CoPilot. It's worth checking out!

## [kbd-audio: Be careful with your mechanical keyboard](https://github.com/ggerganov/kbd-audio) 

kbd-audio is a collection of tools that allow capturing keyboard audio and using it for analysis purposes. It uses machine learning algorithms to identify which keys are being pressed based on the sounds they produce. The program can be used to monitor keyboard activity in real-time or to record and analyze audio files. kbd-audio is compatible with Windows, Linux, and macOS operating systems.

## [Ory Summit - Building a Google-like IAM system from scratch through Ory products](https://www.youtube.com/watch?v=lsH2dYh-_3g) 

The video shows the construction of a Google-like identity and access management (IAM) system from scratch, using Ory products. It discusses the process of building the system using Ory tools and offers insights into best practices for IAM.

