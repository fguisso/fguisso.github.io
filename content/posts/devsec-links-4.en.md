---
title: "Devsec Links #03"
description: "Interesting links on the topic of secure development."
date: 2023-05-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "golang", "oidc", "lambda", "redos"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 3
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month 
  
> WannaCry, a notorious ransomware attack, had its anniversary on May 12th, reminding us of the global impact in 2017 when it affected hundreds of thousands of computers in more than 150 countries. This event highlights the importance of keeping operating systems and software up to date, performing regular backups, and implementing effective security measures to protect critical information and systems.

## [The state of cybersecurity in 2022 and trends and predictions for 2023](https://www.returnonsecurity.com/2022-annual-review/) 

The article is a 2022 annual summary of trends, threats, and solutions in cybersecurity, as well as predictions for innovations in 2023. Some of the predictions include increased use of AI and Machine Learning for threat detection and prevention, as well as the development of more integrated and automated security solutions. Additionally, cloud security, mobile device protection, and data privacy are expected to continue being focus areas for companies and cybersecurity providers.
 
## [safeurl for Go](https://blog.doyensec.com/2022/12/13/safeurl.html) 

Safeurl is a GO library that protects web applications against SSRF (Server-Side Request Forgery) attacks, with built-in protection against DNS rebinding. It's an easy-to-use solution that can replace Go's standard net/http. The library validates all HTTP connections against a whitelist and blocklist, blocking traffic to private or reserved IP addresses by default. The library allows developers to customize and filter permission options to make their applications more secure.

## [Attacks using IDs](https://exact.realty/blog/posts/2023/03/30/enumeration-timing-uuids/) 

This post discusses how the use of UUIDs (Universally Unique Identifiers) can be exploited by attackers to obtain sensitive information. The article addresses two types of attacks - enumeration and timing. It also presents a method to neutralize these attacks using AEAD encryption, which protects the integrity, confidentiality, and authenticity of the data.

## [Can we prevent a security incident like Loom's?](https://www.bearer.com/blog/loom-express-session-incident?utm_source=newsletter.securitypills.news&utm_medium=newsletter&utm_campaign=security-pills-issue-44)

On March 7, 2023, Loom experienced a security incident caused by a change in their CDN configurations that caused incorrect session cookies to be sent back to users. Even with extensive internal testing, the nature of the problem went unnoticed until the change was applied in production. The article discusses how static code analysis tools integrated into development processes could have prevented the problem.

## [Introducing 'Trusted Publishers'](https://blog.pypi.org/posts/2023-04-20-introducing-trusted-publishers/)

The article introduces the new "Trusted Publishers" feature on PyPI that uses OpenID Connect to exchange short-lived identity tokens between PyPI and a trusted third-party service, eliminating the need for username/password or API tokens for authentication. Currently, this method is compatible with GitHub Actions, with additional security protection options available. The article discusses how the Trusted Publishers feature works and how to use it.

## [Lambda risks](https://ramimac.github.io/wiki/lambda-risks/)

The article explores the risks and challenges associated with using Lambda functions in AWS, including security vulnerabilities, costs, infrastructure management, and more. The author analyzes best practices for mitigating these risks and increasing security, as well as discusses the limitations and pitfalls associated with using Lambda functions. The article is an informative read for those who use or plan to use Lambda functions in AWS.

## [ReDoS "vulnerabilities" and misaligned incentives](https://blog.yossarian.net/2022/12/28/ReDoS-vulnerabilities-and-misaligned-incentives)

This article discusses ReDoS vulnerabilities in regular expressions and how they can be exploited by attackers to cause delays in data processing and even crash a system. It also highlights the lack of incentives for companies to fix these vulnerabilities, as they often don't directly affect the end user and can be expensive to fix. The author argues that it's important to raise awareness about the severity of these vulnerabilities and encourage companies to take steps to fix them.

## [Top 10 web hacking techniques of 2022](https://portswigger.net/research/top-10-web-hacking-techniques-of-2022)

This PortSwigger article lists the ten techniques most used by hackers in 2022 to attack web applications. The list includes attacks such as SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), HTTP header injection, among others. The article provides a brief description of each technique, examples of how they can be exploited, and how to protect against them. Additionally, the article highlights the importance of cybersecurity and how crucial it is for companies to be prepared to protect their web applications against these types of attacks.

[OAuth2 - Security Best Practices in Authentication](https://www.youtube.com/watch?v=uMehxhNTC2I)

[Secure development with OWASP top 10](https://www.youtube.com/watch?v=rrFVjyevis0)

