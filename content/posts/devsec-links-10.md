---
title: "Devsec Links #09"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-11-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "oauth", "postman", "okta", "git"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 9
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês  
   
> Em novembro de 1988, um programa malicioso, o Worm Morris, foi lançado na Internet inicial, infectando milhares de computadores em 24 horas. Originado no MIT, visava sistemas Unix e explorava vulnerabilidades em e-mails e no programa "finger". Entre as muitas vítimas estavam Harvard, Princeton, Stanford, Johns Hopkins, NASA e o Laboratório Nacional Lawrence Livermore. Os danos, estimados em milhões, aumentaram a conscientização sobre cibersegurança. O culpado, Robert Tappan Morris, formou-se em Harvard e foi a primeira pessoa condenada sob a Lei de Fraude e Abuso de Computadores de 1986. O incidente impulsionou a criação da primeira equipe de resposta a emergências em computadores e destacou a importância da cibersegurança na era digital emergente. 

## [Software Supply Chain Security](https://github.com/vishalgarg-sec/Software-Supply-Chain-Security) 
Neste link você encontra um repositório sobre Software Supply Chain Security. Nele, é possível acessar uma lista que inclui iniciativas, padrões, regulamentações, organizações, fornecedores, ferramentas, livros, artigos e uma variedade de outros recursos de aprendizagem voltados para a segurança na cadeia de suprimentos de software.

## [Abusando do OAuth para assumir o controle de milhões de contas](https://salt.security/blog/oh-auth-abusing-oauth-to-take-over-millions-of-accounts)
Neste post, são abordados problemas comuns de implementação do OAuth que possibilitam a atacantes assumir o controle de milhões de contas em diversas plataformas. Os autores exemplificam o ataque no Vidio, Bukalapak e Grammarly.com, evidenciando os impactos da ausência de verificação de token. Além disso, ressaltam a complexidade do OAuth e a vital importância de uma implementação segura.

## [Acesso não autorizado ao sistema de gerenciamento de casos de suporte da Okta: causa raiz e correção](https://sec.okta.com/harfiles)
A Okta relata sobre um incidente de segurança ocorrido de 28/09/2023 a 17/10/2023, no qual um invasor acessou arquivos do sistema de suporte ao cliente, comprometendo dados de 134 clientes. Alguns desses arquivos eram arquivos HAR que continham tokens de sessão. O autor da ameaça conseguiu usar esses tokens para sequestrar as sessões legítimas do Okta de 5 clientes. A falha envolveu uma conta de serviço, cujas credenciais foram expostas devido ao login em um perfil pessoal do Google.

## [Analisando a segurança do código de pesquisa de aprendizado de máquina](https://developer.nvidia.com/blog/analyzing-the-security-of-machine-learning-research-code)
A análise da NVIDIA AI Red Team sobre o Meta Kaggle for Code destaca práticas inseguras em códigos de pesquisa de machine learning. Encontraram uso de credenciais em texto plano, desserialização insegura, falta de treinamento e erros de digitação. Recomendam alternativas para credenciais, automação, formatos seguros de serialização, e medidas contra ataques. Como conclusão, ressalta-se a necessidade de conscientização sobre segurança, incentivando profissionais e pesquisadores a adotarem boas práticas para garantir a integridade de experimentos e produtos.

## [Post leaks](https://github.com/cosad3s/postleaks)
O Postman é uma excelente plataforma para criar e utilizar APIs, amplamente utilizada por desenvolvedores. Ela oferece ativos de API públicos que podem conter endpoints e dados personalizados. Infelizmente, esses itens podem vazar informações sensíveis sobre websites e empresas privadas. Este projeto é um script criado para buscar informações sensíveis que possam estar vazando publicamente em coleções Postman.

## [Gittuf](https://gittuf.dev/design.html)
O gittuf utiliza a semântica TUF para criar uma raiz de confiança em repositórios Git, simplificando a distribuição e revogação de chaves. Estabelece políticas de controle de acesso com base em commits e assinaturas de tags, permitindo aos proprietários definir permissões para desenvolvedores e usuários. Além de superar desafios na identificação de chaves públicas, permite políticas granulares de controle de acesso, apoiando diferentes mecanismos de assinatura e é compatível com repositórios Git padrão.

## [HarvardX: CS50's Introduction to Cybersecurity](https://www.edx.org/learn/cybersecurity/harvard-university-cs50-s-introduction-to-cybersecurity)
Que tal aprimorar o seu conhecimento sobre segurança? O curso introdutório de Segurança Cibernética da HarvardX explora como proteger dados, dispositivos e sistemas contra ameaças atuais e futuras. Aborda hacking ético, engenharia social, ataques de phishing, autenticação, ataques de força bruta, biometria, vírus, worms, e muito mais. Não requer pré-requisitos, é ministrado em inglês e abrange tanto aspectos técnicos quanto conceituais da segurança cibernética.
 
