---
title: "O <span>Caso Event-Stream</span>: Anatomia de um Ataque à Cadeia de Suprimentos"
description: "Entenda em detalhes o ataque que comprometeu um dos pacotes mais populares do ecossistema Node.js"
date: 2025-05-12
tags: ["segurança", "javascript", "npm", "supply chain", "código suspeito"]
categories: ["análises", "incidentes"]
draft: false
---

Este artigo é um complemento do episódio piloto do podcast **Código Suspeito**, que narra histórias reais de falhas de segurança exploradas no mundo do software. Aqui você encontra uma análise técnica e contextual mais aprofundada sobre o caso do `event-stream`, um incidente que se tornou referência em ataques à cadeia de suprimentos de software open source.

## Introdução

Em 2018, um dos pacotes mais utilizados no ecossistema JavaScript foi comprometido de maneira silenciosa, sofisticada e persistente. Com milhões de downloads semanais, `event-stream` estava presente em milhares de projetos — diretos e indiretos — espalhados por toda a web.

O ataque explorou a confiança comum entre desenvolvedores e mantenedores de pacotes open source, abusando da ausência de validações no processo de publicação de bibliotecas no npm.

## Quem é Dominic Tarr?

Dominic Tarr é um conhecido desenvolvedor no meio JavaScript, responsável por dezenas de bibliotecas open source minimalistas. Uma de suas criações foi o `event-stream`, lançado em 2011 com o objetivo de facilitar a composição de streams de dados no Node.js.

Após anos de manutenção ativa, Dominic deixou de utilizar o pacote em seus projetos e parou de atualizá-lo regularmente. Foi nesse contexto que outro usuário, `right9ctrl`, entrou em cena oferecendo ajuda para manter o projeto.

## A entrada de `right9ctrl`

Após alguns commits pequenos e contribuições aparentemente legítimas, Dominic concedeu acesso de escrita ao repositório para `right9ctrl`. Em seguida, esse novo colaborador adicionou uma nova dependência chamada `flatmap-stream`, sugerindo melhorias funcionais. O pacote foi criado por outro usuário obscuro, `hugeglass`, e tinha apenas um commit no GitHub.

O conteúdo do [`package.json`](https://github.com/hugeglass/flatmap-stream/blob/a0d127c1782991a423d106f50038a26d127bbecf/package.json) indicava como autor "Antonio Macias" — uma identidade que jamais foi confirmada.

## A armadilha

A versão `0.1.0` do `flatmap-stream`, inicialmente publicada no npm, era limpa. Mas pouco tempo depois, `hugeglass` lançou a versão `0.1.1`, que continha uma carga maliciosa inserida apenas na versão minificada — ou seja, o código-fonte visível no GitHub não mostrava o que estava sendo distribuído.

Essa versão foi adicionada com o modificador de versão `^0.1.0`, o que permitia ao npm resolver automaticamente para `0.1.1` sem necessidade de ação dos desenvolvedores. Isso foi possível graças ao versionamento semântico (SemVer), onde mudanças dentro da mesma versão major são consideradas seguras.

Antes de sair do projeto, `right9ctrl` removeu a dependência e promoveu o `event-stream` para a versão 4, o que efetivamente impedia que usuários atualizassem automaticamente para a versão limpa caso tivessem travado em `^3.x`.

## O alvo: Copay

A carga maliciosa era ativada somente quando detectava um ambiente específico — mais precisamente, quando a variável `process.env.npm_package_description` tinha o valor “A Secure Bitcoin Wallet”. Esse valor estava presente na descrição do projeto da carteira Copay, mantida pela BitPay.

Ao identificar esse valor, o código:

1. Coletava a chave privada da carteira;
2. Criptografava com uma chave pública embutida;
3. Enviava via HTTP para servidores remotos.

Versões afetadas: Copay entre 5.0.2 e 5.1.0, além de forks que não alteraram a descrição do pacote.

## Como a comunidade descobriu

A descoberta não veio por meio de ferramentas de segurança avançadas, mas por um simples [alerta de função obsoleta](https://medium.com/@hkparker/analysis-of-a-supply-chain-attack-2bd8fa8286ac) no console — a função `crypto.createDecipher` estava sendo usada em um pacote inesperado. Isso levou desenvolvedores a investigar o `flatmap-stream` e a encontrar a discrepância entre o código no GitHub e o publicado no npm.

## O funcionamento do código malicioso

O ataque foi estruturado em três camadas:

- **Verificação de ambiente**: ativava a carga apenas se o pacote estivesse rodando em um projeto com a descrição exata.
- **Coleta da chave privada**: extraía as informações sensíveis diretamente da execução do Copay.
- **Exfiltração**: criptografava os dados e os enviava para IPs externos.

O código era ofuscado, minificado e distribuído somente via npm. Não havia evidência pública da carga nos repositórios de origem. A análise técnica pode ser conferida em [es-incident.github.io](https://es-incident.github.io/paper.html), no [post-mortem da Snyk](https://snyk.io/pt-BR/blog/a-post-mortem-of-the-malicious-event-stream-backdoor/) e no artigo da [ACM 2022](https://dl.acm.org/doi/pdf/10.1145/3517208.3523753).

## A reação da comunidade

A [resposta oficial do npm](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident) envolveu a remoção do pacote malicioso e alertas para os projetos afetados. No entanto, o episódio mostrou uma fragilidade estrutural na forma como a cadeia de suprimentos de software é gerida.

Dominic também publicou [uma resposta pessoal](https://gist.github.com/dominictarr/9fd9c1024c94592bc7268d36b8d83b3a), explicando como cedeu o acesso e refletindo sobre os limites da responsabilidade individual no open source.

## Conclusões

O caso `event-stream` não foi apenas um incidente isolado. Ele simboliza os riscos invisíveis de se depender de bibliotecas open source mantidas por poucos — ou nenhum — colaborador ativo.

As principais lições desse caso incluem:

- Verificar a procedência de dependências adicionadas tardiamente;
- Automatizar auditorias e comparar pacotes publicados com seu código-fonte;
- Entender os impactos de versionamento no ecossistema npm;
- E manter atualizações constantes de segurança, mesmo em pacotes "pequenos".

---

Este artigo é um complemento do episódio 01 do podcast **Código Suspeito**.

**Hack the planet.**
