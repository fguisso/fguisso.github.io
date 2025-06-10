---
title: "Top 5 Vulnerabilidades em Rust Criado com IA"
date: 2025-06-10
draft: false
description: "Resumo das 5 vulnerabilidades mais comuns em aplicações Rust, gerado com apoio de IA e baseadas em dados do RustSec."
tags: ["rust", "segurança", "devsecops", "appsec"]
---

Essa semana estou ajeitando tudo para preparar um workshop de desenvolvimento seguro — uma atividade comum no dia a dia aqui no trabalho com AppSec. A ideia é simples: trazer exercícios práticos sobre vulnerabilidades reais para que desenvolvedores possam aprender, na prática, como evitar esses problemas no código do dia a dia.

Uma das linguagens utilizadas aqui no trabalho é o Rust, e eu, sinceramente, ainda não tenho tanta experiência com ela. Então comecei a pesquisar e estudar manualmente quais são as vulnerabilidades mais comuns em aplicações Rust.

Só que foi bem mais difícil do que eu imaginava.

## O desafio de encontrar vulnerabilidades específicas em Rust

Não existe ainda um OWASP Top 10 exclusivo para Rust, e os materiais sobre segurança na linguagem são bem dispersos. Achei alguns artigos tentando aplicar o OWASP Top 10 “geral” no Rust, mas isso não é tão útil assim. Cada linguagem tem suas próprias nuances — e muitas vezes, o que é uma vulnerabilidade crítica em uma, simplesmente não se aplica em outra. O compilador do Rust, por exemplo, já elimina de cara várias classes inteiras de bugs comuns em C e C++.

Mas isso não quer dizer que Rust seja imune a vulnerabilidades.

## Ajudinha da IA para organizar tudo

Depois de juntar uma porção de artigos, links e PDFs, percebi que tinha um monte de informação solta e difícil de digerir. Então usei o NotebookLM Pro — uma ferramenta da Google que permite criar um assistente com base nos seus próprios documentos.

Joguei ali todos os links que coletei, incluindo a lista de alertas de segurança do RustSec, e comecei a conversar com o chat da ferramenta. O resultado foi muito massa: ele me ajudou a estruturar um Top 5 vulnerabilidades comuns em Rust, especialmente em aplicações web.

Então deixo aqui pra você esse resumo do que encontrei, que inclusive vai servir de base para o nosso workshop!

## Top 5 Vulnerabilidades Comuns em códigos Rust

### 1. Negação de serviço (DoS) por consumo ilimitado de recursos ou pânico

Rust não impede ataques de DoS via inputs massivos ou profundamente aninhados:

- Exemplos: JSONs grandes, XML recursivos, streams de upload.
- Isso pode causar `OOM`, *stack overflow* ou `panic!`, interrompendo o serviço.
- Muitos casos estão catalogados no RustSec, como:
  - [RUSTSEC-2024-0401: zlib-rs - stack overflow](https://rustsec.org/advisories/RUSTSEC-2024-0401.html)
  - [RUSTSEC-2024-0376: tonic - DoS remoto](https://rustsec.org/advisories/RUSTSEC-2024-0376.html)

### 2. Insegurança (Unsoundness) em código `unsafe` ou abstrações

Blocos `unsafe` e abstrações mal projetadas podem quebrar as garantias de segurança:

- Uso incorreto de `unsafe`: *use-after-free*, *out-of-bounds*, condições de corrida ou *UB*.
- Exemplo:
  - [RUSTSEC-2024-0379: fast-float - violação de segurança de memória](https://rustsec.org/advisories/RUSTSEC-2024-0379.html)

### 3. Validação de entrada inadequada

Mesmo sem falhas de memória, lógicas incorretas podem levar a ataques como:

- Request smuggling: headers HTTP mal formatados.
- XSS em parsers de Markdown/HTML.
- Cache poisoning, manipulação HTTP.
- Exemplo:
  - [RUSTSEC-2024-0009: trillium - CRLF injection em headers HTTP](https://rustsec.org/advisories/RUSTSEC-2024-0009.html)

### 4. Vulnerabilidades na cadeia de suprimentos (supply chain)

Crates de terceiros apresentam riscos significativos:

- Crates desatualizados ou abandonados.
- Procedural macros que executam código durante o build.
- Exemplos:
  - [RUSTSEC-2024-0370: proc-macro-error - crate descontinuado](https://rustsec.org/advisories/RUSTSEC-2024-0370.html)
  - [RUSTSEC-2024-0425: better-macro - macros maliciosas](https://rustsec.org/advisories/RUSTSEC-2024-0425.html)

### 5. Exposição de dados sensíveis e uso cripto inseguro

Falhas nessa área podem levar ao vazamento de dados críticos:

- Logs involuntários contendo tokens ou chaves.
- Uso de algoritmos fracos como MD5 ou DES.
- Problemas em validação TLS ou ataques de timing.
- Exemplo:
  - [RUSTSEC-2024-0430: magic-crypt - algoritmo fraco de criptografia](https://rustsec.org/advisories/RUSTSEC-2024-0430.html)

## Conclusão

Embora Rust ofereça fortes garantias em segurança de memória, **não elimina problemas lógicos, criptográficos ou de supply chain**. A segurança segue sendo responsabilidade do desenvolvedor e da auditoria constante das bibliotecas utilizadas.
