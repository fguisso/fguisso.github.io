---
title: "Devsec Links #10"
description: "Interesting links on the topic of secure development."
date: 2023-12-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "secrets", "ci/cd", "chatgpt", "copilot"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 10
---

Written by [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosity of the month  
   
> The Father Christmas worm, launched in December 1988, attacked VAX/VMS systems via DECnet, sending Christmas greetings. Originating from NASA's Space Physics Analysis Network (SPAN), the worm aimed to create the "Hi.com" file and send Christmas messages. The incident strengthened security measures in SPAN and DECnet. In January 1989, a variant was contained thanks to previous experience.

## [Secure by Design](https://www.cisa.gov/securebydesign) 
CISA (Cybersecurity and Infrastructure Security Agency) and 17 global partners, including Japan, Israel, and Singapore, released a version of "Shifting the Balance of Cybersecurity Risk," calling on software manufacturers to prioritize secure-by-design products. The guide emphasizes three principles: Taking responsibility for customer security outcomes, adopting transparency and accountability, and top-down leadership. The update, incorporating feedback from various stakeholders, provides a roadmap for manufacturers to enhance product security and compete securely. The guide promotes responsibility, transparency, and customer demand for secure-by-design software.

## ['Distilling' outdated software could save Defense Dept. millions in time and money](https://coe.gatech.edu/news/2023/08/distilling-outdated-software-could-save-defense-dept-millions-time-and-money)
A Georgia Tech team is using $10 million in funding from DARPA (Defense Advanced Research Projects Agency) to accelerate the updating of critical defense software. Instead of time-consuming reverse engineering methods, they apply a technique called "distillation" to transform binary code into a readable representation. The automated process drastically reduces update time from years to weeks and also improves software efficiency by up to 60%. The project aims to provide robust techniques for updating legacy software in defense systems and may have applications in other industries, promoting security and efficiency.

## [A framework for securely using LLMs in the enterprise - Securing ChatGPT and GitHub Copilot](https://boringappsec.substack.com/p/edition-23-a-framework-to-securely)
This text addresses the security risks associated with using two popular tools: ChatGPT and Github Copilot. It discusses the risks, security controls, and usage methods for both tools, highlighting the need for clear policies and employee awareness to mitigate risks. ChatGPT presents risks of sensitive data leakage and over-reliance on generated output, while Github Copilot may involve data leakage and license violations. Security controls, such as prompt restrictions and code review, are provided for both tools.

## [Attacking Gitlab CI/CD via shared runners](https://pulsesecurity.co.nz/articles/OMGCICD-gitlab)
This article addresses practical attacks on GitLab CI/CD environments, highlighting vulnerabilities in shared runners. An attacker, through a malicious pipeline, can compromise the shared runner used for production deployment, exposing credentials. The focus is on exploiting the docker-in-docker (DIND) executor, allowing users to gain access to the runner, escape the container, and access sensitive information from other pipelines. The article highlights the importance of correctly configuring runners to ensure workload isolation, and mitigation strategies are discussed.

## [State of Cloud Security](https://www.datadoghq.com/state-of-cloud-security/)
Organizations face challenges in securing cloud identities and resources. Issues include long-lived credentials, insufficient MFA, low adoption of IMDSv2, and increased public access blocks for storage. Additionally, some VMs remain exposed to the public. Some improvements that should be made continuously are addressed.

## [The ticking supply chain attack bomb of exposed Kubernetes secrets](https://blog.aquasec.com/the-ticking-supply-chain-attack-bomb-of-exposed-kubernetes-secrets)
Exposed on GitHub, Kubernetes secrets represent a serious supply chain attack threat. Researchers discovered credentials from companies like SAP and secret blocks in public repositories. Common secret scanners fail to detect these base64-encoded secrets, highlighting a significant risk. Mitigation actions include removing sensitive files, using secret management tools, and adopting security practices such as frequent key rotation.

## [Our audit of PyPI](https://blog.trailofbits.com/2023/11/14/our-audit-of-pypi/)
Audit reveals non-critical but potentially compromising findings in PyPI infrastructure, the foundation for Python programs. Warehouse (PyPI's backend) and cabotage (deployment) were audited. Findings include weak signing, information leakage, and vulnerabilities. Although mitigated, they highlight areas for improvement, especially in cabotage. The review emphasizes the importance of manual review, despite automated security practices.

