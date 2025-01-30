---
title: "Devsec Links #09"
description: "Interesting links on the topic of secure development."
date: 2023-11-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "oauth", "postman", "okta", "git"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 9
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month  
   
> In November 1988, a malicious program, the Morris Worm, was released on the early Internet, infecting thousands of computers within 24 hours. Originating from MIT, it targeted Unix systems and exploited vulnerabilities in emails and the "finger" program. Among the many victims were Harvard, Princeton, Stanford, Johns Hopkins, NASA, and Lawrence Livermore National Laboratory. The damages, estimated in millions, increased awareness about cybersecurity. The culprit, Robert Tappan Morris, graduated from Harvard and was the first person convicted under the Computer Fraud and Abuse Act of 1986. The incident prompted the creation of the first computer emergency response team and highlighted the importance of cybersecurity in the emerging digital era.

## [Software Supply Chain Security](https://github.com/vishalgarg-sec/Software-Supply-Chain-Security) 
In this link, you'll find a repository about Software Supply Chain Security. It provides access to a list that includes initiatives, standards, regulations, organizations, vendors, tools, books, articles, and a variety of other learning resources focused on software supply chain security.

## [Abusing OAuth to take control of millions of accounts](https://salt.security/blog/oh-auth-abusing-oauth-to-take-over-millions-of-accounts)
This post addresses common OAuth implementation issues that allow attackers to take control of millions of accounts across various platforms. The authors exemplify the attack on Vidio, Bukalapak, and Grammarly.com, highlighting the impacts of the lack of token verification. Additionally, they emphasize the complexity of OAuth and the vital importance of secure implementation.

## [Unauthorized access to Okta's support case management system: root cause and remediation](https://sec.okta.com/harfiles)
Okta reports on a security incident that occurred from 09/28/2023 to 10/17/2023, in which an intruder accessed files from the customer support system, compromising data from 134 customers. Some of these files were HAR files containing session tokens. The threat actor managed to use these tokens to hijack legitimate Okta sessions of 5 customers. The flaw involved a service account, whose credentials were exposed due to logging into a personal Google profile.

## [Analyzing the security of machine learning research code](https://developer.nvidia.com/blog/analyzing-the-security-of-machine-learning-research-code)
NVIDIA AI Red Team's analysis of Meta Kaggle for Code highlights unsafe practices in machine learning research codes. They found the use of plaintext credentials, insecure deserialization, lack of training, and typos. They recommend alternatives for credentials, automation, secure serialization formats, and measures against attacks. In conclusion, they emphasize the need for security awareness, encouraging professionals and researchers to adopt good practices to ensure the integrity of experiments and products.

## [Post leaks](https://github.com/cosad3s/postleaks)
Postman is an excellent platform for creating and using APIs, widely used by developers. It offers public API assets that may contain custom endpoints and data. Unfortunately, these items can leak sensitive information about private websites and companies. This project is a script created to search for sensitive information that may be publicly leaking in Postman collections.

## [Gittuf](https://gittuf.dev/design.html)
Gittuf uses TUF semantics to create a root of trust in Git repositories, simplifying key distribution and revocation. It establishes access control policies based on commits and tag signatures, allowing owners to define permissions for developers and users. In addition to overcoming challenges in identifying public keys, it allows granular access control policies, supports different signing mechanisms, and is compatible with standard Git repositories.

## [HarvardX: CS50's Introduction to Cybersecurity](https://www.edx.org/learn/cybersecurity/harvard-university-cs50-s-introduction-to-cybersecurity)
How about improving your knowledge of security? HarvardX's introductory Cybersecurity course explores how to protect data, devices, and systems against current and future threats. It covers ethical hacking, social engineering, phishing attacks, authentication, brute force attacks, biometrics, viruses, worms, and much more. It requires no prerequisites, is taught in English, and covers both technical and conceptual aspects of cybersecurity.

