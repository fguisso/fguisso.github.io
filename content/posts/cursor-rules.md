---
title: "Usando <span>Cursor Rules</span> para Acelerar um <span>Secure Code Review</span>"
date: 2025-08-26
tags: ["secure-code-review", "cursor", "appsec", "sast", "typescript", "checklists"]
description: "Como utilizar Cursor Rules e checklists adaptados ao contexto do projeto para otimizar revisões de segurança em aplicações modernas."
---

Em revisões de código focadas em segurança, o maior desafio não é rodar ferramentas — mas sim **entender o contexto do sistema**.  

Antes de procurar vulnerabilidades, precisamos responder perguntas como:  
- Quais endpoints existem?  
- Como é a arquitetura do banco de dados?  
- Que fluxos de autenticação/autorização estão implementados?  
- Quais dados são mais sensíveis?  

Esse trabalho inicial costuma ser demorado, especialmente em times de AppSec que não têm conhecimento profundo de cada projeto.  

Recentemente testei o [Cursor](https://cursor.sh/) como apoio, configurando **Cursor Rules** (prompts persistentes) e **checklists dinâmicos** para acelerar esse processo. A experiência foi aplicada no [GrowthBook](https://github.com/growthbook/growthbook), um projeto open source em Node.js e TypeScript, mas também repliquei em sistemas internos. Aqui como ficou meus [arquivos de configuração](https://gist.github.com/fguisso/0de78dda4fdaa4abfb94eade01628967).

## O que são Cursor Rules?

As **[Cursor Rules](https://docs.cursor.com/en/context/rules)** são instruções permanentes aplicadas no editor Cursor. Elas funcionam como uma "camada de orientação" para a IA, que passa a priorizar determinados comportamentos.  

Para um **secure code review**, isso significa que podemos:  

- Criar **checklists de segurança** adaptados ao stack do projeto.  
- Direcionar a IA para vulnerabilidades típicas da **linguagem, framework ou protocolo** em uso.  
- Automatizar descobertas iniciais: endpoints, diagramas de dados, fluxos de autenticação.  

## Como Estruturei a Revisão

### 1. Checklist inicial

O primeiro passo foi um checklist genérico de AppSec, cobrindo práticas clássicas (injeção, XSS, autenticação, autorização, exposição de dados sensíveis, etc).  

Com acesso ao código, o Cursor conseguiu:  

- Mapear **endpoints REST**.  
- Reconstruir **diagramas ER do banco** em Mermaid.  
- Destacar tabelas com **dados sensíveis** (tokens, senhas, informações pessoais).  
- Sugerir fluxos de autenticação e autorização inferidos do código.  

Isso já reduziu dias de entendimento para poucas horas.

### 2. Refinando para o stack do projeto

Depois pedi ao Cursor para **refinar o checklist para Node.js + TypeScript**.  
Com isso, passaram a aparecer itens como:  

- Validação de inputs em **Express**.  
- Uso de APIs perigosas como `eval` ou `child_process`.  
- Manipulação insegura de **JWTs**.  
- Falhas em bibliotecas de autenticação OAuth2/OpenID.  

Esse refinamento é **essencial**: vulnerabilidades prioritárias variam conforme o **stack**.  

### 3. Refinando pelo tipo de sistema

Além da linguagem, o tipo de aplicação também muda o foco:  

- **Sistema de Autenticação**  
  - Revisar fluxos de *login/logout*.  
  - Verificar se existe MFA.  
  - Conferir armazenamento de senhas (hash + salt).  
  - Garantir uso correto de JWT (expiração, assinatura, algoritmo).  

- **Projeto que implementa um Protocolo**  
  - Se for **OAuth2/OpenID Connect**, analisar riscos de *token leakage* e *redirects inseguros*.  
  - Se for **GraphQL**, procurar *excessive data exposure* e *BOLA/IDOR*.  
  - Se for **gRPC**, avaliar validação de schemas e autenticação mútua.  

- **Aplicação com Banco de Dados Sensível**  
  - Garantir uso de queries parametrizadas (prevenindo SQLi).  
  - Revisar controles de acesso em tabelas críticas.  
  - Avaliar criptografia em repouso e em trânsito.  

- **Serviços com Alta Integração Externa (APIs)**  
  - Checar validação de payloads recebidos de terceiros.  
  - Revisar tratamento de erros para evitar *leakage*.  
  - Analisar autenticação de chamadas internas (*service-to-service*).  

Essa lógica pode ser traduzida em um **Cursor Rule** adaptado ao projeto.  

### 4. Integração com Terminal e Ferramentas

Outro ponto forte foi usar o **terminal integrado do Cursor**.  

- A IA gerava payloads de ataque direto no `curl`.  
- O output das ferramentas (Semgrep, Gitleaks, TruffleHog, etc.) era correlacionado com o código vulnerável.  
- O resultado era uma análise muito mais **direta e contextualizada**.  

Mesmo com pipeline já rodando SAST, SCA e secret scanning, usar o Cursor localmente deu mais liberdade e insights adicionais.

### 5. Burp MCP: vale a pena?

Testei o **Burp MCP** (Model Context Protocol) no Burp Community Edition mesmo, visto que o MCP deles é free, mas achei limitado demais, acabou mais me atrapalhando no fluxo do que ajudando. Caso queira dar uma olhada, [Burp MCP](https://github.com/PortSwigger/mcp-server)  .
Acabei pedindo ao Cursor para **explicar manualmente como reproduzir testes no Burp**.

## Benefícios Observados

- **Entendimento rápido** do projeto sem depender do time de dev.  
- **Modelagem de ameaças embutida**: já saí com diagramas e controles mapeados.  
- **Menos gargalo com o time de desenvolvimento**: só envolvemos quando já tínhamos findings refinados.  
- **Análise mais focada**: em vez de caçar linha a linha, fui direto aos pontos críticos.  

## Dicas Práticas

1. **Monte um Cursor Rule por projeto.**
   Não existe checklist universal — o contexto é tudo.

2. **Peça refinamento contínuo.**
   À medida que encontra findings, vá pedindo para a IA recalibrar o checklist.

3. **Não confie cegamente.**
   Use a IA para **ganhar tempo**, mas valide manualmente os resultados.

4. **Explore integrações.**
   Combine terminal, ferramentas SAST/SCA e a IA para análises mais ricas.

## Conclusão

Adotar **Cursor Rules** e checklists adaptados mudou a forma como encaro um *secure code review*.
Antes, parte significativa do tempo era gasto tentando entender a arquitetura do projeto, pedindo contexto ao time de desenvolvimento, configurando o ambiente local e descobrindo detalhes que raramente estavam bem documentados.

Com esse processo, consegui **reduzir drasticamente o tempo de rampa**: a IA ajudou a mapear endpoints, bancos de dados, fluxos de autenticação e potenciais pontos críticos logo no início. Isso significou que, quando envolvi o time de dev, já cheguei com findings e modelagens de ameaça bem estruturadas, o que transformou a conversa em algo muito mais produtivo.

Além de economizar esforço e **evitar gargalos de comunicação**, sobrou mais tempo para análises aprofundadas e para discutir soluções em conjunto. O resultado foi um processo mais ágil, colaborativo e com menos desgaste para todos.

No fim das contas, a IA não substitui o olhar crítico de quem faz a revisão, mas ajuda a **eliminar o trabalho braçal inicial** e a liberar espaço para o que realmente importa: **segurança aplicada de forma inteligente e integrada com o time de desenvolvimento**.

## Referências

* [GrowthBook no GitHub](https://github.com/growthbook/growthbook)
* [Cursor Editor](https://cursor.sh/)
* [Meu Gist](https://gist.github.com/fguisso/0de78dda4fdaa4abfb94eade01628967) com exemplo de Cursor Rule para o caso do GrowthBook.