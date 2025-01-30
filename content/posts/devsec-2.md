---
title: "Devsec Links #02"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-04-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "oauth", "oidc", "passwordless", "iam", "terraform"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 2
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês  
   
> Em abril de 2017, o grupo de hackers Shadow Brokers vazou ferramentas de hacking da NSA, incluindo o notório exploit EternalBlue. Esses vazamentos levaram aos ataques maciços de ransomware WannaCry e NotPetya em 2017, causando interrupções globais e perdas financeiras. O incidente destacou os riscos de espionagem cibernética, armazenamento de vulnerabilidades do governo e a necessidade de uma melhor cooperação entre pesquisadores de segurança cibernética e agências governamentais. 

## [Um guia ilustrado para OAuth e OpenID Connect](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc) 

Nada melhor do que um guia ilustrativo para explicar o funcionamento dos protocolos OAuth e OpenID Connect (OIDC) em um contexto de autenticação e autorização de aplicativos. Nesse artigo os autores usam ilustrações e exemplos para tornar a compreensão desses conceitos mais acessível, explicando desde a diferença entre autenticação e autorização até como os tokens de acesso e atualização são usados para permitir que os usuários acessem recursos protegidos em nome de aplicativos. Esse guia fornece informações úteis para nos ensinar a projetar sistemas que requerem autenticação segura!
 
## [SCARLETEEL: Operação aproveitando Terraform, Kubernetes e AWS para roubo de dados](https://sysdig.com/blog/cloud-breach-terraform-data-theft/) 

Artigo sobre um caso real de violação de dados na nuvem através de uma infraestrutura mal configurada no Terraform. Um invasor conseguiu acessar as credenciais de um bucket S3 e copiar dados sensíveis. Os autores destacam a importância da segurança na configuração do Terraform e recomendam medidas preventivas, como a criptografia de dados e o uso de controles de acesso. 

## [Cinco coisas que você precisa saber sobre malware no Storage Buckets](https://orca.security/resources/blog/the-risks-of-malware-in-storage-buckets/) 

Artigo que destaca os riscos de segurança associados à presença de malware em buckets de armazenamento em nuvem. Os autores explicam como os cibercriminosos exploram vulnerabilidades em configurações inadequadas de armazenamento para infectar arquivos com malware. Eles recomendam medidas preventivas, como a implementação de práticas de segurança robustas e a utilização de soluções de detecção e resposta a ameaças em tempo real. 

## [Novas contratações, chaves perdidas e lições aprendidas (série de autenticação sem senha, nº 3)](https://blog.palantir.com/new-hires-lost-keys-lessons-learned-passwordless-authentication-series-3-dfdd79e89fb6) 

Nesse artigo você verá uma abordagem sobre a adoção de autenticação sem senha ( Passwordless Authentication) na empresa Palantir e as vantagens dessa abordagem em relação aos métodos tradicionais baseados em senhas. O texto destaca as lições aprendidas com a implementação do novo sistema e como a autenticação sem senha pode ser uma solução segura e eficaz para empresas preocupadas com a segurança dos dados. 

## [Mobile Security](https://github.com/wh0isdxk/MobileSecurity) 

O MobileSecurity é um repositório no Github que contém diversos conteúdos como resumos e sugestões de ferramentas e palestras voltadas para ajudar a garantir a segurança e privacidade do usuário em dispositivos móveis, como smartphones e tablets. O repositório é de open source e pode ser usado e modificado por qualquer pessoa interessada em segurança móvel. 

## [Revisão do CoPilot: meus pensamentos após 6 meses](https://www.youtube.com/watch?v=RDd71IUIgpg) 

O vídeo é um comentário de um programador sobre o "GitHub CoPilot", uma ferramenta de assistência de código que usa inteligência artificial para gerar sugestões de código enquanto o programador escreve. O vídeo oferece uma perspectiva crítica sobre a tecnologia e termina com a opinião do programador quanto ao uso do CoPilot. Vale a pena conferir! 

## [kbd-audio: Cuidado com seu teclado mecânico](https://github.com/ggerganov/kbd-audio) 

O kbd-audio é uma coleção de ferramentas que permitem capturar o áudio do teclado e usá-lo para fins de análise. Ele usa algoritmos de aprendizado de máquina para identificar quais teclas estão sendo pressionadas com base nos sons que elas produzem. O programa pode ser usado para monitorar a atividade do teclado em tempo real ou para gravar e analisar arquivos de áudio. O kbd-audio é compatível com sistemas operacionais Windows, Linux e macOS. 

## [Ory Summit - Construindo um sistema IAM semelhante ao Google a partir do zero por meio de produtos Ory](https://www.youtube.com/watch?v=lsH2dYh-_3g) 

O vídeo mostra a construção de um sistema de gerenciamento de identidade e acesso (IAM) semelhante ao Google do zero, usando produtos Ory. Ele discute o processo de construção do sistema usando as ferramentas Ory e oferece insights sobre as melhores práticas para IAM. 


