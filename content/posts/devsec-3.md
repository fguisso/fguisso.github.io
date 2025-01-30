---
title: "Devsec Links #03"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-05-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "golang", "oidc", "lambda", "redos"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 3
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês 
  
> O WannaCry, um notório ataque de ransomware, teve seu aniversário em 12 de maio, lembrando o impacto global de 2017, quando afetou centenas de milhares de computadores em mais de 150 países. Esse evento ressalta a importância de manter sistemas operacionais e softwares atualizados, realizar backups regulares e implementar medidas de segurança eficazes para proteger informações e sistemas críticos.

## [O estado da cibersegurança em 2022 e as tendências e previsões para 2023](https://www.returnonsecurity.com/2022-annual-review/) 

O artigo é um resumo anual de 2022 sobre as tendências, ameaças e soluções em segurança cibernética, bem como as previsões das inovações para 2023. Algumas das previsões incluem o aumento do uso de IA e Machine Learning para detecção e prevenção de ameaças, como também o desenvolvimento de soluções de segurança mais integradas e automatizadas. Além disso, espera-se que a segurança em nuvem, a proteção de dispositivos móveis e a privacidade dos dados continuem sendo áreas de foco para as empresas e fornecedores de segurança cibernética.
 
## [safeurl para Go](https://blog.doyensec.com/2022/12/13/safeurl.html) 

Safeurl é uma biblioteca GO que protege aplicativos web contra ataques de SSRF (Server-Side Request Forgery), com proteção integrada contra DNS rebinding. É uma solução fácil de usar que pode substituir o net/http padrão do Go. A biblioteca valida todas as conexões HTTP em relação a uma lista de permissões e bloqueios, bloqueando o tráfego para endereços IP privados ou reservados por padrão. A biblioteca permite que os desenvolvedores personalizem e filtrem as opções de permissão para tornar suas aplicações mais seguras.

## [Ataques usando IDs](https://exact.realty/blog/posts/2023/03/30/enumeration-timing-uuids/) 

Essa postagem discute como o uso de UUIDs (Identificadores Únicos Universais) pode ser explorado por invasores para obter informações sensíveis, para isso, o artigo aborda dois tipos de ataques - enumeração e temporização. Também é apresentado um método para neutralizar esses ataques usando criptografia AEAD, que protege a integridade, confidencialidade e autenticidade dos dados. 

## [Podemos evitar um incidente de segurança como o do Loom?](https://www.bearer.com/blog/loom-express-session-incident?utm_source=newsletter.securitypills.news&utm_medium=newsletter&utm_campaign=security-pills-issue-44)

No dia 7 de março de 2023, a empresa Loom sofreu um incidente de segurança causado por uma mudança nas configurações de seu CDN que fez com que cookies de sessão incorretos fossem enviados de volta aos usuários. Mesmo com testes internos extensivos, a natureza do problema passou despercebida até a mudança ser aplicada em produção. O artigo discute como as ferramentas de análise de código estático integradas aos processos de desenvolvimento poderiam ter prevenido o problema.

## [Apresentando 'Trusted Publishers'](https://blog.pypi.org/posts/2023-04-20-introducing-trusted-publishers/)

O artigo apresenta a nova funcionalidade "Trusted Publishers" no PyPI que usa o OpenID Connect para trocar tokens de identidade de curta duração entre o PyPI e um serviço terceirizado confiável, eliminando a necessidade de nome de usuário/senha ou tokens de API para autenticação.  Atualmente, esse método é compatível com o GitHub Actions, com opções adicionais de proteção de segurança disponíveis. O artigo discute como funciona a funcionalidade Trusted Publishers e como usá-la.

## [Riscos lambda](https://ramimac.github.io/wiki/lambda-risks/)

O artigo explora os riscos e desafios associados ao uso de funções Lambda no AWS, incluindo vulnerabilidades de segurança, custos, gerenciamento de infraestrutura e mais. O autor analisa as melhores práticas para mitigar esses riscos e aumentar a segurança, bem como discute as limitações e armadilhas associadas ao uso de funções Lambda. O artigo é uma leitura informativa para quem usa ou planeja usar funções Lambda no AWS.

## [ReDoS "vulnerabilidades" e incentivos desalinhados](https://blog.yossarian.net/2022/12/28/ReDoS-vulnerabilities-and-misaligned-incentives)

Este artigo discute as vulnerabilidades de ReDoS em expressões regulares e como elas podem ser exploradas por invasores para causar atrasos no processamento de dados e até mesmo travar um sistema. Ele também destaca a falta de incentivos para que as empresas corrijam essas vulnerabilidades, já que elas muitas vezes não afetam diretamente o usuário final e podem ser caras de corrigir. O autor argumenta que é importante aumentar a conscientização sobre a gravidade dessas vulnerabilidades e incentivar as empresas a tomar medidas para corrigi-las.

## [As 10 principais técnicas de hacking da web de 2022](https://portswigger.net/research/top-10-web-hacking-techniques-of-2022)

Este artigo do PortSwigger lista as dez técnicas mais usadas pelos hackers em 2022 para atacar aplicações web. A lista inclui ataques como injeção de SQL, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), HTTP header injection, entre outros. O artigo fornece uma breve descrição de cada técnica, exemplos de como elas podem ser exploradas e como se proteger contra elas. Além disso, o artigo destaca a importância da segurança cibernética e de como é fundamental que as empresas estejam preparadas para proteger suas aplicações web contra esses tipos de ataques.

[OAuth2 - Boas Práticas de Segurança em Autenticação](https://www.youtube.com/watch?v=uMehxhNTC2I)

[Desenvolvimento seguro com OWASP top 10](https://www.youtube.com/watch?v=rrFVjyevis0)
