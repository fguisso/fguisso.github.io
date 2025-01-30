---
title: "Devsec Links #06"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-08-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "slsa", "csrf", "cors", "api", "csp"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 6
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês 
  
> Em agosto de 2005, o worm "Zotob" surgiu, explorando uma vulnerabilidade no Windows 2000. O worm se espalhou rapidamente, afetando grandes organizações e causando interrupções em sistemas em todo o mundo. Empresas conhecidas como a CNN, The New York Times e a Caterpillar Inc. foram afetadas, com alguns sistemas desligando e reiniciando repetidamente. O impacto do Zotob chamou a atenção para a necessidade de gerenciamento eficaz de patches e a rápida resposta a vulnerabilidades conhecidas.

## ["Uma história moderna do CORS" por Devdatta Akhawe](https://www.youtube.com/watch?v=0YJ-yhoJh2I)
Se o CORS sempre gerou confusão, esta palestra pode te auxiliar. Ela aborda a história da web e do CORS, além de explorar os padrões modernos de origem cruzada (corp, corb, coop, coep, oh my) e como podem contribuir para o design seguro de aplicações web.

## [Pesquisa do Github revela milhões de repositorios vulneráveis a RepoJacking](https://blog.aquasec.com/github-dataset-research-reveals-millions-potentially-vulnerable-to-repojacking?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-189-cisa-on-defending-ci-cd-backdooring-npm-via-s3-ai-reverse-engineering)
Pesquisa do GitHub aponta milhões de repositórios potencialmente vulneráveis ​​ao RepoJacking, também chamado de sequestro de dependência. Organizações como Google e Lyft estão entre os vulneráveis. O blog detalha análise do Projeto GHTorrent, expondo riscos e fornecendo cenários e exemplos de exploração.

## [Usando Sec-Fetch-metadata headers para evitar ataques de CSRF](https://www.youtube.com/watch?v=EBTHtsS7rYM)
Neste vídeo, é abordado o assunto de Cross-Site Request Forgery (CSRF). Através de uma demonstração, é explicado como os cookies SameSite podem contribuir para a proteção contra esse tipo de ataque. Além disso, são analisadas suas limitações e é explorado como os cabeçalhos Fetch Metadata podem oferecer uma solução alternativa.

## [Contaminação da conexão HTTP/3: uma ameaça futura?](https://portswigger.net/research/http-3-connection-contamination)
O autor aborda o perigo do "first-request routing" em proxies reversos, permitindo ataques de headers em sistemas de back-end. Isso, combinado com a "HTTP connection coalescing" dos navegadores, contamina conexões HTTP/2 e, potencialmente, HTTP/3, expondo a segurança. A remoção do requisito de endereço IP no HTTP/3 amplia a ameaça. A pesquisa explora exemplos de ataques e oferece insights sobre como prevenir tais explorações por meio de medidas de segurança.

## [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)
O repositório do GitHub, "API Security Checklist", criado pela Shieldfy, oferece uma lista de verificação abrangente e orientações para auxiliar desenvolvedores na garantia da segurança de suas APIs. A lista abrange itens como autenticação, autorização, controle de acesso, integração em CI/CD e monitoramento, entre outros. É uma ótima ferramenta para verificar na hora de projetar, testar e liberar sua API.

## [Trazendo transparência para a computação confidencial com SLSA](https://security.googleblog.com/2023/06/bringing-transparency-to-confidential.html)
Nesse post é falado do Projeto Oak do Google que tem como objetivo fornecer infraestrutura para transferir, armazenar e processar dados confidenciais do usuário de maneira segura e transparente. Eles usam o paradigma de computação confidencial e a estrutura SLSA para garantir integridade dos componentes. Isso resulta em confiança na execução segura, permitindo que os usuários verifiquem criptograficamente se seus dados pessoais foram processados ​​por um provedor confiável em um ambiente seguro.

## [CSP e desvios](https://www.cobalt.io/blog/csp-and-bypasses)
O post explica a Content Security Policy (CSP), um padrão para controlar recursos e scripts em aplicativos da web, visando evitar ataques XSS e proteger os usuários. Sua intenção é demonstrar o que é o CSP e por que ele é implementado. O texto aborda sua definição, implementação e importância na prevenção de ataques, incluindo o clickjacking. O CSP é integrado nos navegadores e impede a execução de scripts não intencionais. 

