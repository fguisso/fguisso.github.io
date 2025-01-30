---
title: "Devsec Links #07"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-09-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "gcp", "defcon", "ci/cd", "secrets"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 7
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês   
    
> Em setembro de 2017, a Equifax, uma das principais agências de crédito dos EUA, sofreu um grave incidente de segurança. Cerca de 143 milhões de americanos tiveram seus dados comprometidos devido a uma vulnerabilidade no software Apache Struts, utilizado pela empresa. Isso ressaltou a importância da segurança de aplicativos e a necessidade de manter o software atualizado para proteger informações sensíveis. O incidente também influenciou as regulamentações de proteção de dados nos EUA. 
 
## [Como as secrets vazam em pipelines de CI/CD](https://trufflesecurity.com/blog/secrets-leak-in-ci-cd/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-196-how-secrets-leak-in-ci-cd-ai-threat-modeling-supply-chain)  

O texto explora vazamentos de secrets em pipelines CI/CD, destacando a importância de proteger informações sensíveis durante o desenvolvimento e a entrega de software para evitar brechas de segurança e proteger a integridade do código. São oferecidas práticas e ferramentas para mitigar esse risco. 

## [Prevenindo secrets no código](https://semgrep.dev/blog/2023/preventing-secrets-in-code/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-199-supply-chain-security-overview-container-escapes-ai-cybersecurity) 
O artigo aborda a prevenção de vazamento de secrets no código, enfatizando a importância de identificar e proteger informações sensíveis no desenvolvimento de software. Também menciona uma palestra ocorrida no BSidesSF 2023 sobre esse assunto. 

## [4.500 dos 1 milhão de principais sites vazaram código-fonte e secrets](https://trufflesecurity.com/blog/4500-of-the-top-1-million-websites-leaked-source-code-secrets/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-199-supply-chain-security-overview-container-escapes-ai-cybersecurity) 
A pesquisa identificou milhares de diretórios .git expostos em sites do Alexa Top 1 Million. Isso expõe códigos e secrets, incluindo centenas de chaves de API válidas. Chaves AWS e GitHub foram as credenciais mais frequentemente vazadas. Além disso, foi identificada uma grande proporção de credenciais do GitHub com privilégios de administrador. Um site chegou a expor a chave privada do certificado SSL. A pesquisa também destacou práticas para evitar a exposição de dados em diretórios Git. 

## [DEF CON 31 - The GitHub Actions Worm - Asi Greenholts](https://www.youtube.com/watch?v=j8ZiIOd53JU) 
Na palestra realizada na DEF CON, o palestrante explica como um invasor pode explorar o ecossistema de Actions personalizadas do GitHub, infectando uma Action para disseminar código malicioso em outras Actions e projetos. A apresentação termina com uma demonstração de um malware de prova de conceito, destacando a importância de defesas contra esse tipo de ataque. 

## [Assinatura de URLs no GCP: conveniência x segurança](https://lsgeurope.com/post/signing-urls-in-gcp-convenience-vs-security?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-194-cnappgoat-kubefuzz-tl-dr-sec-swag) 
É abordado a criação de URLs assinados no Google Cloud Platform (GCP) usando chaves de conta de serviço, explicando dois métodos: a assinatura com a chave da conta de serviço e o método signBlob IAM. Destaca-se a importância de considerar os riscos de segurança, especialmente no uso do método signBlob, que pode levar a escalonamento de privilégios se a conta de serviço for comprometida.  

## [Cherrybomb](https://github.com/blst-security/cherrybomb?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-198-building-a-detection-as-code-pipeline-nist-on-ci-cd-supply-chain-security-finding-malware-with-llms) 
Cherrybomb é uma ferramenta CLI que previne a implementação incorreta de código no início do desenvolvimento. Ele valida e testa APIs usando arquivos OpenAPI para garantir o funcionamento adequado e a conformidade com as regras da OEA. Além disso, identifica problemas e vulnerabilidades comuns, fornecendo relatórios detalhados para facilitar a correção. O objetivo é reduzir erros de segurança e assegurar o funcionamento correto da API. 

