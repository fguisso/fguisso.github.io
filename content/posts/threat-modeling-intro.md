---
title: "Threat Modeling Intro"
description: "Threat Modeling Intro"
date: 2024-09-28T07:29:47-03:00
showTableOfContents: false
showDate: true
tags: ["Threat Modeling", "Segurança", "DevSecOps"]

---

{{< alert >}}
**Atenção!** Este artigo ainda está em construção...
{{< /alert >}}

# Threat Modeling Express: Uma Abordagem Ágil para a Segurança

## Introdução

Threat Modeling, ou modelagem de ameaças, é uma técnica poderosa para identificar possíveis ameaças e vulnerabilidades em sistemas. Em um cenário de segurança em constante evolução, abordagens ágeis como o **Threat Modeling Express** surgem como uma maneira eficiente e colaborativa de lidar com essas ameaças de forma contínua ao longo do ciclo de desenvolvimento de software. Essa metodologia permite que as equipes visualizem os riscos de forma prática, facilitando a tomada de decisão e a implementação de contramedidas apropriadas.

## O que é Threat Modeling?

**Threat Modeling** é o processo de identificar ameaças, vulnerabilidades e controles em sistemas, com o objetivo de minimizar os riscos e fortalecer a segurança. Ele envolve pensar como um atacante para antecipar possíveis riscos e falhas de segurança em todas as fases de desenvolvimento de um sistema. Diferente de outras práticas, o foco é no impacto para o negócio, conectando ameaças diretamente aos riscos organizacionais.

## Origem e Evolução do Threat Modeling

A modelagem de ameaças evoluiu ao longo das décadas desde os anos 60, com marcos importantes que moldaram a prática atual:

- **1960s**: Início dos primeiros ataques contra sistemas compartilhados com acesso multiusuário.
- **1988**: Robert Barnard desenvolve o primeiro perfil de atacantes para sistemas de TI.
- **1994**: Edward Amoroso introduz o conceito de "threat trees", estruturando graficamente como ameaças podem ser exploradas.
- **1998**: Bruce Schneier populariza "attack trees", permitindo uma análise mais sistemática de riscos cibernéticos.
- **1999**: Microsoft cria o **STRIDE**, uma metodologia amplamente usada para identificar ameaças específicas em sistemas.
- **2020**: Lançamento do **Threat Modeling Manifesto**, enfatizando princípios centrais para a prática de Threat Modeling.
- **2024**: Publicação do documento de **Capacidades de Threat Modeling**, oferecendo diretrizes para maximizar a eficácia da modelagem de ameaças.

Esses avanços mostram como a prática se desenvolveu para se tornar um componente essencial na segurança moderna, integrando-se cada vez mais aos processos de desenvolvimento de software.

## Por que Threat Modeling é Importante?

Diferente de outras práticas de segurança que focam apenas em listar vulnerabilidades, o Threat Modeling permite uma visão mais clara e direta sobre os riscos ao negócio. Ele conecta ameaças específicas a possíveis impactos para a organização, facilitando a comunicação entre a equipe técnica e os gestores.

Por exemplo, é mais fácil para um executivo entender que há um risco de perda financeira devido à manipulação de dados (ameaça) do que explicar que uma vulnerabilidade técnica, como **Insecure Deserialization**, pode levar a um **RCE** (Remote Code Execution). Com a modelagem de ameaças, a comunicação sobre riscos se torna mais clara, e as decisões para mitigação são mais justificáveis.

## Crescimento do Threat Modeling no Mercado

O uso de Threat Modeling tem crescido exponencialmente à medida que empresas buscam maneiras de se proteger proativamente contra ameaças cibernéticas. Em eventos como a **Conferência Internacional de Threat Modeling** (ThreatModCon), líderes da indústria compartilham suas experiências e abordagens inovadoras, mostrando como a prática está evoluindo para atender às necessidades de um mercado em constante mudança.

## Abordagens Tradicionais e Ferramentas de Threat Modeling

Existem várias metodologias tradicionais para Threat Modeling, cada uma com suas peculiaridades:

- **STRIDE**: Focado em ameaças específicas, como spoofing e elevação de privilégio.
- **PASTA**: Um modelo em sete etapas que alinha objetivos de negócios com requisitos técnicos.
- **Trike**: Enfatiza a auditoria e o gerenciamento de riscos.
- **VAST**: Integrado ao DevOps, usa diagramas de fluxo para modelar ameaças de forma ágil.
- **Hybrid**: Combina elementos de diferentes metodologias para cenários complexos.

### Ferramentas de Modelagem de Data Flow

Antes de iniciar o processo de modelagem, é essencial escolher uma ferramenta para desenhar o **data flow**. Algumas opções populares incluem:

- **draw.io**
- **Excalidraw**
- **MermaidJS**

O importante é que o time esteja confortável com a ferramenta escolhida, pois o objetivo é usar o tempo para modelar ameaças e não para aprender a usar uma nova ferramenta. Se o time já tem conhecimento de uma dessas opções, é mais eficiente seguir com ela para garantir que todos estejam focados no objetivo principal.

## Threat Modeling Express

A abordagem ágil chamada **Threat Modeling Express** simplifica o processo tradicional, focando na colaboração e iterações rápidas. A metodologia é desenhada para se integrar ao DevSecOps, permitindo que equipes desenvolvam modelos de ameaça em ciclos curtos e continuem aprimorando-os à medida que o desenvolvimento avança.

## Processo do Threat Modeling Express

### 1. Preparação e Engajamento da Equipe

O primeiro passo é garantir que a equipe de desenvolvimento e segurança esteja alinhada e engajada. Isso começa com a criação de uma cultura de segurança compartilhada. Participe dos ritos já presentes no time, como dailies e reuniões de planejamento, para entender o que a equipe faz e como cada parte se conecta ao produto. Esse engajamento inicial ajuda a criar confiança e interesse em segurança.

A frase “Segurança deve ser defendida como linguagens de programação ou IDEs” é fundamental aqui. O objetivo é fazer com que o time “brigue” por segurança da mesma forma que defendem suas tecnologias favoritas. Quando a equipe sente que é parte do processo e vê valor no que está fazendo, a colaboração flui melhor, e a modelagem de ameaças se torna mais eficaz.

### 2. Criação do Data Flow

A criação do **data flow** é fundamental para mapear onde os dados transitam no sistema e onde podem ser comprometidos. O processo envolve a equipe de desenvolvimento, pois são eles que conhecem melhor o sistema. Incentive o time a direcionar a criação do dataflow, identificando usuários, processos e bancos de dados.

Durante essa etapa, é importante focar nos fluxos principais e simplificar. Podemos detalhar cada endpoint, mas, para uma abordagem mais ágil, o objetivo é capturar os fluxos mais críticos. Lembre-se de que o escopo deve se concentrar no que o time pode atuar, evitando mapear processos que estão fora do controle direto da equipe.

### 3. Identificação de Ativos

A identificação de ativos é o próximo passo. Aqui, listamos os componentes críticos do sistema que precisam ser protegidos, como bases de dados, APIs e serviços sensíveis. Explique ao time o que são ativos e por que é importante focar no que realmente pode impactar o negócio. Ao destacar os ativos, a equipe começa a ver claramente onde os riscos estão concentrados.

### 4. Listagem de Ameaças

Na listagem de ameaças, o objetivo é se colocar na posição dos atacantes e pensar como eles comprometeriam o sistema. A equipe deve usar o **data flow** criado para identificar os pontos onde os ativos podem ser atacados. Incentive o time a "vestir o chapéu" de diferentes atores de ameaças, abrindo a mente para novas possibilidades.

#### Atores de Ameaça

A modelagem de ameaças deve considerar uma variedade de atores, incluindo:

- **Cibercriminosos**: Motivados por ganhos financeiros, frequentemente utilizam ransomware e phishing.
- **Atores patrocinados por estados**: Focados em espionagem e sabotagem, visando infraestruturas críticas.
- **Hacktivistas**: Buscam promover causas sociais ou políticas.
- **Curiosos**: Atacam por diversão ou aprendizado, mas podem causar danos.
- **Insiders**: Atores internos, intencionais ou acidentais, que têm acesso privilegiado ao sistema.
- **Ciberterroristas**: Movidos por ideologias políticas ou religiosas, buscando causar caos.

Além desses, na nossa empresa discutimos novas possibilidades, como **fãs de reality shows(Big Brother Brasil)** que organizam mutirões de votos ou campanhas de difamação online são uma tipo de ator de ameaça que pode trazer muito impacto para nosso produto. Hoje temos mais de [3M votos por minuto](https://www.hcaptcha.com/post/globo-counts-nearly-3-million-votes-per-minute-with-hcaptcha-enterprise) que precisam sem bem controlados, pois este programa é um dos grandes produtos da empresa. Para entender melhor sobre como pensar novos atores, confira esta palestra da [OWASP Global AppSec 2023](https://owasp2023globalappsecwashin.sched.com/event/1M6Qh/the-threat-actors-we-forgot-to-model-profiling-socially-motivated-cyber-criminals).

### 5. Definição de Controles

Com as ameaças identificadas, o próximo passo é definir controles técnicos e processuais para mitigá-las. Aqui, a equipe deve anotar todos os controles, mesmo aqueles já implementados, para garantir que eles continuem sendo aplicados corretamente e sejam eficazes.

O time deve criar tarefas claras para implementação e acompanhamento desses controles ao longo do ciclo de vida do produto. Isso inclui, por exemplo, validar se controles como autenticação multifator ou criptografia continuam ativos e eficazes após atualizações no sistema.

## Conclusão

O **Threat Modeling Express** oferece uma maneira ágil e eficiente de integrar a modelagem de ameaças ao ciclo de desenvolvimento, ajudando a mitigar riscos antes que eles se tornem problemas. Com a crescente complexidade das ameaças, é essencial que as equipes de segurança e desenvolvimento trabalhem juntas para proteger seus sistemas de forma proativa.

Se você ainda não implementou o Threat Modeling, agora é a hora de começar. Integre-o ao seu pipeline de desenvolvimento e mantenha sua organização segura contra as ameaças de hoje e de amanhã.

Lembre-se, segurança é um processo contínuo e colaborativo, e quanto mais cedo ela for integrada no desenvolvimento, mais eficaz será a proteção de seus sistemas.

