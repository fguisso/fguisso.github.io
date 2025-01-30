---
title: "Devsec Links #08"
description: "Interesting links on the topic of secure development."
date: 2023-10-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "pypi", "npm", "openapi", "api", "imds"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 8
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month   
    
> In October 2019, Google revealed the "StrandHogg" vulnerability in the Android system. This flaw allowed malicious apps to pose as legitimate apps, collecting sensitive user data. The problem was resolved with security updates, emphasizing the importance of keeping devices updated and reviewing app permissions. 
 
## [Manifest Confusion in PyPI](https://stiankri.substack.com/p/manifest-confusion-in-pypi) 
Manifest Confusion is a problem in the PyPI ecosystem, the main repository for Python packages. It arises from inconsistencies between metadata on PyPI and in the files downloaded by it, leading to different dependency resolutions by package management and security tools. This can result in the installation of malicious or vulnerable packages. The recommended solution is to use PEP 658 instead of PyPI's JSON API to resolve dependencies. 

## [The massive hole in the npm ecosystem](https://blog.vlt.sh/blog/the-massive-hole-in-the-npm-ecosystem) 
The text describes a problem in the npm ecosystem, where validation of manifest information with the content of the package tarball is not done by the npm Public Registry. Instead, it is left to npm-compatible clients, which can lead to various issues such as cache poisoning, installation of unknown dependencies, execution of unlisted scripts, and possible downgrade attacks. The author suggests that documentation of the npm Public Registry APIs be done quickly and encourages developers to contact maintainers of tools that depend on manifest data, encouraging the use of package content for metadata whenever appropriate.  

## [A big look at security in OpenAPI](https://blog.liblab.com/a-big-look-at-security-in-openapi/) 
The article addresses the security options available in OpenAPI, discusses how companies of different sizes are implementing security in their APIs, and offers guidance for building a secure API. 

## [Passkeys are generally available on Github](https://github.blog/2023-09-21-passkeys-are-generally-available/)
Passkeys are a new, more secure form of authentication for GitHub accounts, reducing dependence on easily phishable methods like passwords. They are now available to all users. Broad industry support from companies like Apple, Google, and Microsoft has been crucial to the success of Passkeys, with recent enhancements in Windows and Chrome improving cross-device and cross-ecosystem compatibility. 

## [Get the full benefits of IMDSv2 and disable IMDSv1 across your AWS infrastructure](https://aws.amazon.com/blogs/security/get-the-full-benefits-of-imdsv2-and-disable-imdsv1-across-your-aws-infrastructure/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-202-kubehound-supply-chain-security-vendor-landscape-cspm-evaluation-matrix) 
The Instance Metadata Service (IMDS) solves a cloud security challenge by providing temporary credentials, eliminating the need to manually or programmatically distribute sensitive credentials to instances. IMDSv1, by not having authentication to fetch data from the IMDS endpoint, allows an attacker to gain access to sensitive information present in the metadata service. Therefore, upgrading to IMDSv2 is crucial, and that's exactly what the article addresses. 

## [Thousands of GitHub Comments leak live API keys](https://trufflesecurity.com/blog/thousands-of-github-comments-leak-live-api-keys/)
In the article, you'll see a study concluding that developers inadvertently expose credentials on GitHub through public comments, resulting in thousands of leaked keys and passwords. This practice differs from leaks in commits. Most cases occur in text, not code, and editing comments doesn't completely remove them. It's crucial to regularly scan comments, rotate exposed keys, and use TruffleHog for verification.

