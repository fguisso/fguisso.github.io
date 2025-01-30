---
title: "Devsec Links #10"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-12-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "secrets", "ci/cd", "chatgpt", "copilot"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 10
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês  
   
> O worm Father Christmas, lançado em dezembro de 1988, atacou sistemas VAX/VMS via DECnet, enviando saudações de Natal. Originou-se na Space Physics Analysis Network (SPAN) da NASA, o worm visava criar o arquivo “Hi.com” e enviar mensagens de Natal. O incidente fortaleceu medidas de segurança na SPAN e DECnet. Em janeiro de 1989, uma variante foi contida graças à experiência anterior.

## [Secure by Design](https://www.cisa.gov/securebydesign) 
A CISA (Cybersecurity and Infrastructure Security Agency) e 17 parceiros globais, incluindo o Japão, Israel e Singapura, lançaram uma versão de "Shifting the Balance of Cybersecurity Risk", pedindo aos fabricantes de software a priorizar produtos seguros por design. O guia enfatiza três princípios: Assumir a responsabilidade pelos resultados de segurança do cliente, adotar transparência e responsabilidade e liderança de cima para baixo. A atualização, incorporando feedback de diversas partes interessadas, fornece um roteiro para fabricantes aprimorarem a segurança do produto e competirem de maneira segura. O guia promove a responsabilidade, transparência e a demanda do cliente por software seguro por design.

## ['Destilar' software desatualizado pode economizar milhões em tempo e dinheiro para o Departamento de Defesa](https://coe.gatech.edu/news/2023/08/distilling-outdated-software-could-save-defense-dept-millions-time-and-money)
Uma equipe da Georgia Tech está usando um financiamento de $10 milhões da DARPA (Defense Advanced Research Projects Agency) para acelerar a atualização de software crítico de defesa. Em vez de métodos demorados de engenharia reversa, eles aplicam uma técnica chamada "destilação" para transformar código binário em uma representação legível. O processo automatizado reduz drasticamente o tempo de atualização, de anos para semanas, e também melhora a eficiência do software em até 60%. O projeto visa fornecer técnicas robustas para atualizar software legado em sistemas de defesa e pode ter aplicações em outras indústrias, promovendo segurança e eficiência.

## [Uma estrutura para usar LLMs com segurança nas empresas - Protegendo ChatGPT e GitHub Copilot](https://boringappsec.substack.com/p/edition-23-a-framework-to-securely)
Este texto aborda os riscos de segurança associados ao uso de duas ferramentas populares: ChatGPT e o Github Copilo. Discute os riscos, controles de segurança e métodos de uso para ambas as ferramentas, destacando a necessidade de políticas claras e conscientização dos funcionários para mitigar riscos. O ChatGPT apresenta riscos de vazamento de dados sensíveis e dependência excessiva da saída gerada, enquanto o Github Copilot pode envolver vazamento de dados e violações de licença. São fornecidos controles de segurança, como restrições de prompts e revisão de código, para ambas as ferramentas.

## [Atacando CI/CD do Gitlab por meio de runners compartilhados](https://pulsesecurity.co.nz/articles/OMGCICD-gitlab)
Este artigo aborda ataques práticos a ambientes GitLab CI/CD, destacando vulnerabilidades em runners compartilhados. Um atacante, por meio de um pipeline malicioso, pode comprometer o runner compartilhado usado para implantação na produção, expondo credenciais. O foco está na exploração do executor docker-in-docker (DIND), permitindo que usuários ganhem acesso ao runner, escape do contêiner e acessem informações sensíveis de outros pipelines. O artigo destaca a importância de configurar corretamente os runners para garantir a isolamento de workloads, além disso, são discutidas estratégias de mitigação.

## [State of Cloud Security](https://www.datadoghq.com/state-of-cloud-security/)
Organizações enfrentam desafios na segurança de identidades e recursos em nuvem. Problemas incluem credenciais de longa duração, MFA insuficiente, baixa adoção do Organizações enfrentam desafios na segurança de identidades e recursos em nuvem. Problemas incluem credenciais de longa duração, MFA insuficiente, baixa adoção do IMDSv2 e aumento de blocos de acesso público para armazenamento. Além disso, algumas VMs permanecem expostas ao público. São abordadas algumas melhorias que devem ser feitas continuamente.

## [A bomba de ataque à cadeia de suprimentos de secrets expostos do Kubernetes](https://blog.aquasec.com/the-ticking-supply-chain-attack-bomb-of-exposed-kubernetes-secrets)
Expostos no GitHub, secrets do Kubernetes representam séria ameaça de ataque à cadeia de suprimentos. Pesquisadores descobriram credenciais de empresas como SAP e blocos de secrets em repositórios públicos. Os scanners de secrets comuns não conseguem detectar essas secrets codificados em base64, destacando um risco significativo. As ações de mitigação incluem remover arquivos sensíveis, usar ferramentas de gerenciamento de secrets e adotar práticas de segurança, como rotação frequente de chaves.

## [Nossa auditoria do PyPI](https://blog.trailofbits.com/2023/11/14/our-audit-of-pypi/)
Auditoria revela descobertas não críticas, mas potencialmente comprometedoras na infraestrutura PyPI, base para programas Python. O Warehouse (backend do PyPI) e a cabotagem (implantação) foram auditados. Descobertas incluem assinatura fraca, vazamento de informações e vulnerabilidades. Embora mitigadas, destacam áreas de melhoria, especialmente na cabotagem. A revisão destaca a importância da revisão manual, apesar das práticas de segurança automatizadas. 


