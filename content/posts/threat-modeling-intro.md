---
title: "Threat Modeling Intro"
description: "Threat Modeling Intro"
date: 2024-09-28T07:29:47-03:00
showTableOfContents: false
showDate: true
tags: ["Threat Modeling", "Segurança", "DevSecOps"]

---

{{< alert >}}
**Atenção!** Este artigo ainda esta em construção...
{{< /alert >}}

# Threat Modeling Express: Uma Abordagem Ágil para a Segurança

{{< button href="https://guisso.dev/talks/threat-modeling" target="_self" >}}
Slides
{{< /button >}}


## Introdução

Threat Modeling, ou modelagem de ameaças, é uma técnica poderosa para identificar possíveis ameaças e vulnerabilidades em sistemas. Em um cenário de segurança em constante evolução, abordagens ágeis como o **Threat Modeling Express** surgem como uma maneira eficiente e colaborativa de lidar com essas ameaças de forma contínua ao longo do ciclo de desenvolvimento de software.

Neste artigo, vamos explorar o conceito de Threat Modeling, sua evolução, as abordagens tradicionais e uma nova abordagem ágil e prática para integrar a modelagem de ameaças nos fluxos de trabalho de equipes de desenvolvimento e segurança.

## O que é Threat Modeling?

**Threat Modeling** é o processo de identificar ameaças, vulnerabilidades e contramedidas em sistemas, com o objetivo de minimizar os riscos e fortalecer a segurança. Ele envolve pensar como um atacante para antecipar possíveis riscos e falhas de segurança em todas as fases de desenvolvimento de um sistema.

## Origem do Threat Modeling

A modelagem de ameaças tem uma longa história que começou nos anos 60, quando os primeiros sistemas compartilhados começaram a sofrer com tentativas de exploração de vulnerabilidades. Aqui estão alguns marcos importantes:

- **1960s**: Primeiros ataques contra sistemas compartilhados.
- **1988**: Robert Barnard desenvolve o primeiro perfil de atacantes para sistemas de TI.
- **1994**: Edward Amoroso introduz o conceito de árvores de ameaças ("threat trees").
- **1998**: Bruce Schneier apresenta "attack trees", que sistematizam a análise de riscos cibernéticos.
- **1999**: Microsoft desenvolve o **STRIDE**, um dos modelos de Threat Modeling mais populares.
- **2020**: Publicação do **Threat Modeling Manifesto**, destacando os valores e princípios essenciais para a prática de Threat Modeling.
- **2024**: Lançamento do documento de **Capacidades de Threat Modeling**, que ajuda a maximizar o valor da prática.

## Crescimento do Threat Modeling no Mercado

À medida que a segurança cibernética ganha relevância, mais empresas estão adotando o **Threat Modeling** como parte de suas estratégias de desenvolvimento seguro. Ele permite uma visão mais clara dos riscos e vulnerabilidades durante as fases de design, reduzindo os custos de correção ao antecipar problemas.

Em eventos como a **Conferência Internacional de Threat Modeling** (ThreatModCon), as principais lideranças do setor discutem as novas tendências e melhores práticas na aplicação do Threat Modeling. O evento reúne mais de 100 empresas, 20 palestrantes internacionais e um público majoritariamente formado por profissionais de segurança.

## Abordagens Tradicionais

Há várias metodologias bem estabelecidas para **Threat Modeling**, cada uma com suas peculiaridades. Aqui estão algumas das mais conhecidas:

- **STRIDE**: Criada pela Microsoft, ajuda a identificar ameaças em sistemas complexos.
- **PASTA**: Foco na simulação de ataques e análise de compliance.
- **Trike**: Usa a modelagem de ameaças para auditoria e gerenciamento de riscos.
- **VAST**: Integrada ao DevOps e baseada em fluxos de processos e diagramas.
- **Hybrid**: Combina diferentes metodologias para uma abordagem personalizada.

## Threat Modeling Express

A nova abordagem ágil chamada **Threat Modeling Express** simplifica o processo tradicional, com foco em colaboração, iterações rápidas e integração contínua com DevSecOps. Seus princípios são baseados na agilidade e flexibilidade, o que a torna ideal para equipes que precisam integrar segurança no ritmo acelerado do desenvolvimento moderno.

## Processo do Threat Modeling Express

### 1. Preparação e Engajamento da Equipe

O primeiro passo é garantir que a equipe de desenvolvimento e segurança esteja alinhada. A criação de uma cultura de segurança compartilhada é fundamental para que todos compreendam a importância da modelagem de ameaças.

### 2. Criação do Data Flow

Mapear os principais fluxos de dados no sistema é essencial para identificar pontos críticos de vulnerabilidade. Visualize onde os dados transitam e como eles podem ser interceptados ou comprometidos.

### 3. Identificação de Ativos

É importante identificar os ativos mais críticos para a segurança do sistema, aqueles que precisam de maior proteção. Cada parte do sistema que armazena ou processa dados sensíveis deve ser avaliada em termos de vulnerabilidade.

### 4. Listagem de Ameaças

Nesta fase, você deve se colocar no lugar dos atacantes e pensar como eles poderiam comprometer o sistema. Considere diferentes tipos de ameaças, como cibercriminosos, atores estatais, hacktivistas, e até ameaças internas, como funcionários insatisfeitos.

### 5. Definição de Controles

Com as ameaças identificadas, a próxima etapa é definir os controles técnicos e processuais para mitigar essas ameaças. Esses controles são implementados como tarefas claras para a equipe de desenvolvimento e segurança.

## Ferramentas e Técnicas

Para facilitar o processo de Threat Modeling, algumas ferramentas podem ser utilizadas:

- **Excalidraw**: Ferramenta para visualização de fluxos de dados e modelagem de ameaças.
- **Jira/Trello**: Gerenciamento de tarefas e integração com o processo de modelagem de ameaças.
  
Outras ferramentas importantes incluem:

- **Microsoft Threat Modeling Tool**: Utiliza o modelo STRIDE para identificar ameaças.
- **IriusRisk**: Ferramenta que integra a modelagem de ameaças ao longo do ciclo de vida de desenvolvimento.
- **OWASP Threat Dragon**: Uma ferramenta de código aberto que ajuda a criar diagramas de ameaças como parte do ciclo de desenvolvimento seguro.

## Tipos de Ameaças

Enumerar ameaças é um dos principais passos da modelagem. Para isso, é necessário se colocar no lugar de cada **ator de ameaça** e pensar nas maneiras como eles poderiam causar problemas ao sistema ou acessar ativos. Alguns exemplos de atores de ameaça incluem:

- **Cibercriminosos**: Motivados por ganhos financeiros.
- **Atores patrocinados por estados**: Envolvidos em espionagem e sabotagem.
- **Hacktivistas**: Utilizam ataques para promover causas políticas ou sociais.
- **Curiosos**: Atacam por diversão ou aprendizado, mas podem causar danos.
- **Insiders**: Ameaças internas, intencionais ou acidentais, de funcionários.
- **Ciberterroristas**: Atuam por motivações políticas ou ideológicas.

Além desses atores tradicionais, em nossa empresa discutimos outras possibilidades, como **fãs de reality shows**, que podem realizar mutirões para votar em massa, derrubar votações ou até promover campanhas de difamação online. Para mais informações sobre atores de ameaças emergentes, confira a palestra da [OWASP Global AppSec 2023](https://owasp2023globalappsecwashin.sched.com/event/1M6Qh/the-threat-actors-we-forgot-to-model-profiling-socially-motivated-cyber-criminals).

## Conclusão

O **Threat Modeling Express** oferece uma maneira ágil e eficiente de integrar a modelagem de ameaças ao ciclo de desenvolvimento, ajudando a mitigar riscos antes que eles se tornem problemas. Com a crescente complexidade das ameaças, é essencial que as equipes de segurança e desenvolvimento trabalhem juntas para proteger seus sistemas de forma proativa.

Se você ainda não implementou o Threat Modeling, agora é a hora de começar. Integre-o ao seu pipeline de desenvolvimento e mantenha sua organização segura contra as ameaças de hoje e de amanhã.
