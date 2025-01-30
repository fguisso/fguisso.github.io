---
title: "Devsec Links #06"
description: "Interesting links on the topic of secure development."
date: 2023-08-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "slsa", "csrf", "cors", "api", "csp"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 6
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month 
  
> In August 2005, the "Zotob" worm emerged, exploiting a vulnerability in Windows 2000. The worm spread rapidly, affecting large organizations and causing system disruptions worldwide. Well-known companies such as CNN, The New York Times, and Caterpillar Inc. were affected, with some systems shutting down and restarting repeatedly. The impact of Zotob drew attention to the need for effective patch management and rapid response to known vulnerabilities.

## ["A modern history of CORS" by Devdatta Akhawe](https://www.youtube.com/watch?v=0YJ-yhoJh2I)
If CORS has always caused confusion, this talk can help you. It covers the history of the web and CORS, as well as exploring modern cross-origin standards (corp, corb, coop, coep, oh my) and how they can contribute to the secure design of web applications.

## [Github research reveals millions of repositories vulnerable to RepoJacking](https://blog.aquasec.com/github-dataset-research-reveals-millions-potentially-vulnerable-to-repojacking?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-189-cisa-on-defending-ci-cd-backdooring-npm-via-s3-ai-reverse-engineering)
GitHub research points to millions of repositories potentially vulnerable to RepoJacking, also called dependency hijacking. Organizations like Google and Lyft are among the vulnerable. The blog details analysis of the GHTorrent Project, exposing risks and providing exploitation scenarios and examples.

## [Using Sec-Fetch-metadata headers to prevent CSRF attacks](https://www.youtube.com/watch?v=EBTHtsS7rYM)
This video addresses the topic of Cross-Site Request Forgery (CSRF). Through a demonstration, it explains how SameSite cookies can contribute to protection against this type of attack. Additionally, its limitations are analyzed and it explores how Fetch Metadata headers can offer an alternative solution.

## [HTTP/3 connection contamination: a future threat?](https://portswigger.net/research/http-3-connection-contamination)
The author addresses the danger of "first-request routing" in reverse proxies, allowing header attacks on back-end systems. This, combined with browsers' "HTTP connection coalescing," contaminates HTTP/2 and potentially HTTP/3 connections, exposing security. The removal of the IP address requirement in HTTP/3 expands the threat. The research explores attack examples and offers insights on how to prevent such exploits through security measures.

## [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)
The GitHub repository, "API Security Checklist," created by Shieldfy, offers a comprehensive checklist and guidelines to assist developers in ensuring the security of their APIs. The list covers items such as authentication, authorization, access control, CI/CD integration, and monitoring, among others. It's a great tool to check when designing, testing, and releasing your API.

## [Bringing transparency to confidential computing with SLSA](https://security.googleblog.com/2023/06/bringing-transparency-to-confidential.html)
This post talks about Google's Project Oak, which aims to provide infrastructure for securely transferring, storing, and processing confidential user data in a transparent manner. They use the confidential computing paradigm and the SLSA framework to ensure component integrity. This results in trust in secure execution, allowing users to cryptographically verify that their personal data was processed by a trusted provider in a secure environment.

## [CSP and bypasses](https://www.cobalt.io/blog/csp-and-bypasses)
The post explains Content Security Policy (CSP), a standard for controlling resources and scripts in web applications, aiming to prevent XSS attacks and protect users. Its intention is to demonstrate what CSP is and why it is implemented. The text covers its definition, implementation, and importance in preventing attacks, including clickjacking. CSP is integrated into browsers and prevents the execution of unintended scripts.

