---
title: "Devsec Links #01"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-03-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "chagpt", "api", "cors", "tls", "git", "secrets"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 1
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês 
  
> Em março de 1988, o "Morris Worm", primeiro worm de computador em larga escala, foi descoberto. Espalhando-se por redes
Unix, causou interrupções globais. Isso destacou a importância da segurança da informação e a necessidade de proteger
os sistemas de vulnerabilidades. Desde então, as técnicas de segurança evoluíram para proteger as redes contra ameaças
cibernéticas sofisticadas. 

## [Revisão do código de segurança com ChatGPT](https://research.nccgroup.com/2023/02/09/security-code-review-with-chatgpt/)

O artigo apresenta uma análise crítica sobre a aplicação do ChatGPT na revisão de código de segurança, demonstrando que, embora o modelo de linguagem natural treinado por máquina possa ser útil para identificar algumas vulnerabilidades, ele não é confiável o suficiente para substituir completamente as técnicas de revisão de código tradicionais. Os autores discutem os limites do ChatGPT e as falhas que podem ocorrer quando se confia exclusivamente no modelo para identificar problemas de segurança no código-fonte.

## [Detectando pacotes maliciosos e como eles ofuscam o código para você não perceber](https://jfrog.com/blog/detecting-known-and-unknown-malicious-packages-and-how-they-obfuscate-their-malicious-code/)

Neste post a JFrog apresenta técnicas de detecção de pacotes maliciosos conhecidos e desconhecidos em repositories, explicando como esses pacotes maliciosos ocultam o código malicioso por meio de ofuscação. O autor discute as estratégias para detectar e evitar que esses pacotes sejam implantados em seu código, destacando a importância da colaboração entre os fornecedores de ferramentas de segurança e as comunidades de código aberto para proteger os desenvolvedores e usuários finais de ataques maliciosos. 

## [c{api}tal](https://github.com/Checkmarx/capital)

O aplicativo c{api}tal contém 10 desafios de API que correspondem aos 10 principais riscos de API segundo a OWASP. O objetivo é ajudar os desenvolvedores a entender e lidar com as vulnerabilidades comuns em APIs na prática. O aplicativo é feito em Python(FastAPI) e JS(React), utiliza OpenAPI3 e JWT para autenticação. O link inclui instruções para executar o aplicativo localmente e uma visão geral dos desafios e riscos de segurança abordados. 

## [Fearless CORS](https://jub0bs.com/posts/2023-02-08-fearless-cors/): uma filosofia de design para bibliotecas de middleware CORS (e uma implementação Go)

Apresentando a política Same-Origin da Web e como ela pode ser contornada por meio do Cross-Origin Resource Sharing (CORS) o autor apresenta uma abordagem chamada "Fearless CORS", que permite o uso seguro de recursos de origem cruzada sem expor a aplicação a vulnerabilidades de segurança. Seguindo alguns princípios como otimizar a leitura, API simples e concisa e performática, ele discute como essa abordagem pode ser implementada e fornece exemplos de código para ajudar os desenvolvedores a implementá-la em suas aplicações Web.

## [TLS mútuo voltado para funcionários](https://medium.com/pinterest-engineering/employee-facing-mutual-tls-8643fe0cc0f9)

A empresa Pinterest implementou uma solução de autenticação forte usando Mutual TLS (mTLS) para autenticar os funcionários em seus serviços internos. O autor discute como a abordagem mTLS fornece um nível mais alto de segurança em comparação com outras soluções de autenticação, incluindo a autenticação baseada em senha, e descreve como a Pinterest implementou a solução em sua infraestrutura com o mínimo de impacto no lado do usuário. O artigo também destaca os desafios encontrados durante a implementação e como eles foram superados. 

## [Tornando-se Phishless](https://panther.com/blog/going-phishless-how-panther-deployed-webauthn/): como a Panther implantou o WebAuthN com Okta e YubiKeys

Phishing é um tipo de ataque que leva os usuários a clicar em emails e links maliciosos, seja para roubar credenciais de sistemas, informações bancárias ou instalação de malwares. Neste artigo a Panther Security implementou a autenticação sem senha (passwordless) usando a WebAuthn para proteger seus serviços internos de phishing e outras ameaças de segurança. O autor discute como a abordagem passwordless fornece um nível mais alto de segurança em comparação com senhas tradicionais e como a Panther implementou a solução em sua infraestrutura. O artigo também destaca os desafios encontrados durante a implementação e como eles foram superados.

## [Relatório GitGuardian 2023: Secrets Sprawl](https://www.gitguardian.com/state-of-secrets-sprawl-report-2023)
Sabia que em 2022, 10 milhões de secrets foram detectados em commits públicos no GitHub? Um aumento de 67% em comparação com 2021. É um numero alarmante! O relatório State of Secrets Sprawl da GitGuardian revela os dados sensíveis mais comprometidos, as falhas de segurança mais comuns e as ameaças emergentes que você precisa conhecer na hora de utilizar o Git.

