---
title: "<span>Threat Modeling</span> Intro"
description: "Threat Modeling Intro"
date: 2024-09-28T07:29:47-03:00
showTableOfContents: false
showDate: true
hideFeatureImage: true
tags: ["Threat Modeling", "Segurança", "DevSecOps"]

---

## Introdução

Threat Modeling, ou modelagem de ameaças, é uma prática essencial para equipes que buscam identificar e mitigar ameaças e vulnerabilidades em seus sistemas. Em um cenário de segurança em constante evolução, o **Threat Modeling Express** é uma abordagem que permite integrar segurança ao ciclo de desenvolvimento ágil de forma contínua e colaborativa. Essa prática permite uma visão do todo, facilitando tanto a detecção de problemas como o engajamento do time em práticas de segurança.

Neste artigo, veremos a aplicação prática do Threat Modeling Express, explorando desde a concepção até os controles implementados. Adicionaremos os aprendizados do dia a dia para que o processo seja completo e realista.

### Palestra e video

Caso queira acompanhar este artigo como uma palestra, você pode acessar meus slides interativos <a href="https://guisso.dev/talks/threat-modeling" target="_blank">aqui</a> e o video desta palestra no Capítulo OWASP Brasília <a href="https://www.youtube.com/watch?v=3TVmFqaAA1o" target="_blank">aqui</a>.

## O que é Threat Modeling?

**Threat Modeling** é o processo de identificar ameaças, vulnerabilidades e contramedidas em sistemas, com o objetivo de minimizar os riscos e fortalecer a segurança. Ele exige que pensemos como atacantes para antecipar possíveis falhas de segurança. Ao contrário de ferramentas de segurança que geralmente detectam apenas vulnerabilidades técnicas, o Threat Modeling permite enxergar o impacto direto de ameaças no negócio.

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

Diferente de outras práticas de segurança que focam em vulnerabilidades, o Threat Modeling permite entender o impacto direto das ameaças sobre o negócio. Em vez de apresentar uma lista técnica de falhas, trazemos uma visão clara e compreensível para gestores, explicando o impacto de cada ameaça e justificando a importância de mitigá-las. Isso facilita a comunicação entre equipes técnicas e de negócios, trazendo alinhamento e evitando retrabalhos em produção.

Por exemplo, é mais fácil para um executivo entender que há um risco de perda financeira devido à manipulação de dados (ameaça) do que explicar que uma vulnerabilidade técnica, como **Insecure Deserialization**, pode levar a um **RCE** (Remote Code Execution).

## Crescimento do Threat Modeling no Mercado

O uso de Threat Modeling tem crescido exponencialmente à medida que empresas buscam maneiras de se proteger proativamente contra ameaças cibernéticas. Em eventos como a [ThreatModCon](https://www.threatmodcon.com/), líderes da indústria compartilham suas experiências e abordagens inovadoras, mostrando como a prática está evoluindo para atender às necessidades de um mercado em constante mudança.

## Abordagens Tradicionais e Ferramentas de Threat Modeling

Existem várias metodologias tradicionais para Threat Modeling, cada uma com suas peculiaridades:

- **[STRIDE](https://learn.microsoft.com/en-us/previous-versions/commerce-server/ee823878(v=cs.20))**: Focado em ameaças específicas, como spoofing e elevação de privilégio.
- **[PASTA](https://www.wiley.com/en-us/Risk+Centric+Threat+Modeling%3A+Process+for+Attack+Simulation+and+Threat+Analysis-p-9780470500965)**: Um modelo em sete etapas que alinha objetivos de negócios com requisitos técnicos.
- **[Trike](https://www.iriusrisk.com/resources-blog/trike-threat-modeling-methodologies)**: Enfatiza a auditoria e o gerenciamento de riscos.
- **[VAST](https://www.threatmodeler.com/threat-modeling-methodologies-vast/)**: Integrado ao DevOps, usa diagramas de fluxo para modelar ameaças de forma ágil.
- **Hybrid**: Combina elementos de diferentes metodologias para cenários complexos.

# Threat Modeling Express

A abordagem ágil chamada **Threat Modeling Express** simplifica o processo tradicional, focando na colaboração e iterações rápidas. A metodologia é desenhada para se integrar ao DevSecOps, permitindo que equipes desenvolvam modelos de ameaça em ciclos curtos e continuem aprimorando-os à medida que o desenvolvimento avança.

## Processo do Threat Modeling Express

### 1. Preparação e Engajamento da Equipe

O engajamento da equipe é o ponto de partida e deve começar antes da modelagem de ameaças em si. Garantir que os desenvolvedores estejam confortáveis com as práticas de segurança e integrados ao time é essencial. A prática de DevSecOps preza pelo envolvimento de todos os membros do time, incluindo engenheiros, designers e PMs. É importante que todos compreendam a importância de cada etapa do processo, o que facilita a implementação dos controles mais tarde.

> *Meu papel como appsec é fazer os devs "brigarem" por segurança, assim como hoje eles "birgam" pelo vscode ser melhor que o vim ou emacs.*<br>
> — Fernando Guisso

### 2. Criação do Data Flow

A criação do **data flow** é fundamental para mapear onde os dados transitam no sistema e onde podem ser comprometidos. O processo envolve a equipe de desenvolvimento, pois são eles que conhecem melhor o sistema. Incentive o time a direcionar a criação do dataflow, identificando usuários, processos e bancos de dados.

Ferramentas familiares ao time, como Excalidraw, draw.io ou até mesmo diagramas MermaidJS, podem ser usadas para garantir que todos estejam confortáveis com o processo. O importante é que a equipe esteja à vontade com a ferramenta escolhida, para que o foco esteja na análise das ameaças, e não na adaptação à tecnologia usada para o dataflow.

Durante essa etapa, é importante focar nos fluxos principais e simplificar. Podemos detalhar cada endpoint, mas, para uma abordagem mais ágil, o objetivo é capturar os fluxos mais críticos. Lembre-se de que o escopo deve se concentrar no que o time pode atuar, evitando mapear processos que estão fora do controle direto da equipe.

![threat-modeling-sample](/img/threat-modeling-sample.svg)

### 3. Identificação de Ativos

Após o mapeamento do fluxo de dados, é importante identificar quais ativos são críticos e necessitam de proteção extra. A equipe deve listar todos os componentes ou dados essenciais que podem gerar impactos relevantes caso sejam comprometidos. No entanto, é preciso restringir a lista apenas aos elementos mais críticos, aqueles que realmente exigem controles de segurança específicos.

![threat-modeling-assets](/img/threat-modeling-assets.svg)

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">A1</span> **Token de sessão do usuário**:
- Ao analisar a aplicação, vimos que o Token de sessão é o principal mecanismo de autenticação e autorização para o usuário. Se um atacante obtiver esse token, ele pode realizar ações em nome do usuário sem qualquer restrição. Isso é crítico, pois envolve diretamente a identidade do usuário e pode resultar em acesso indevido a informações sensíveis.
- Aqui você pode notar que o A1 estão em mais de um lugar, no caso só anotamos onde os dados estão em repouso, mas a depender do seu tempo para montar o Dataflow, você pode anotar todos os pontos por onde um Ativo esta em repouso ou em trânsito.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">A2</span> **Dados pessoais**:
- Identificamos que a aplicação armazena dados pessoais, como nome, CPF, e possivelmente outras informações sensíveis dos usuários. Esses dados não apenas precisam estar protegidos por conformidade com leis de privacidade, mas também são um alvo comum de ataques. Garantir a proteção desses dados é fundamental para evitar vazamentos que poderiam comprometer a privacidade e a confiança dos usuários.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">A3</span> **Credenciais do banco de dados**:
- As credenciais do banco de dados são essenciais para a aplicação se conectar ao banco e realizar operações. Se um atacante conseguir acesso a essas credenciais, ele pode obter acesso direto ao banco de dados, com potencial para ler, alterar ou até mesmo excluir dados. Esse é um ativo de alta prioridade, pois a exposição dessas credenciais comprometeria totalmente a integridade e confidencialidade dos dados armazenados.

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

![threat-modeling-threats](/img/threat-modeling-threats.svg)

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T1</span> **Interceptação de Dados Sensíveis**:

- Esta ameaça foi identificada ao analisarmos o fluxo de dados entre o cliente e o servidor. Quando informações, como credenciais e dados pessoais, são transmitidas, existe o risco de interceptação, principalmente se a comunicação não estiver criptografada. A interceptação pode permitir que um atacante obtenha informações confidenciais em trânsito, comprometendo a privacidade e a integridade dos dados dos usuários.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T2</span> **Exposição de Token de Sessão**:

- O token de sessão é essencial para autenticação, então qualquer falha que permita seu acesso não autorizado pode resultar em sequestro de sessão. Se o token for exposto, um invasor pode realizar ações no sistema em nome do usuário. Isso foi identificado ao pensarmos nas possibilidades de armazenamento inseguro ou na transmissão inadequada do token em canais de comunicação vulneráveis.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T3</span> **Indisponibilidade de Serviço**:

- A disponibilidade é um pilar importante de segurança. Esta ameaça foi considerada ao pensar em ataques de negação de serviço (DoS) ou sobrecarga de recursos que podem tornar o sistema inacessível aos usuários. A indisponibilidade, seja por ataque intencional ou falha técnica, impacta diretamente a experiência do usuário e a confiabilidade do sistema.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T4</span> **Exposição de Credenciais**:

- As credenciais de acesso ao banco de dados e a outros serviços críticos são altamente sensíveis. Durante a análise, verificamos que uma má configuração ou falta de proteção adequada dessas credenciais poderia expô-las, permitindo que um atacante acesse diretamente os dados. Essa ameaça visa comprometer diretamente a segurança do sistema, facilitando outros ataques.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">T5</span> **Acesso Não Autorizado a Informações Pessoais**:

- Essa ameaça surgiu da análise de quem pode acessar informações pessoais sem permissão. A exposição ou acesso não autorizado a dados pessoais pode ocorrer por falhas de controle de acesso ou vulnerabilidades que permitam a exploração direta do sistema. Isso representa uma violação de privacidade e poderia levar a consequências legais e perda de confiança dos usuários.

### 5. Definição de Controles

Com as ameaças listadas, o próximo passo é definir os controles específicos que mitigarão os riscos. Esses controles podem ser técnicos ou processuais e devem ser documentados, mesmo se já estiverem implementados. Isso garante uma visão ampla dos mecanismos de defesa e permite acompanhar a validade e eficácia dos controles ao longo do tempo.

O time deve criar tarefas claras para implementação e acompanhamento desses controles ao longo do ciclo de vida do produto. Isso inclui, por exemplo, validar se controles como autenticação multifator ou criptografia continuam ativos e eficazes após atualizações no sistema.

![threat-modeling-controls](/img/threat-modeling-controls.svg)

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C1</span> **TLS Pinning**:

- Para evitar ataques man-in-the-middle (MitM), onde um invasor pode interceptar ou modificar dados em trânsito, implementamos TLS Pinning. Este controle garante que a aplicação apenas aceite certificados específicos e válidos, protegendo a autenticidade da conexão com o servidor.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C2</span> **Criptografia de Dados Sensíveis em Trânsito**:

- Dados sensíveis, como informações pessoais ou tokens de sessão, estão em risco de interceptação. A criptografia dos dados em trânsito garante que qualquer dado capturado em uma interceptação seja ilegível e, portanto, inutilizável para o atacante.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C3</span> **Armazenamento Seguro de Tokens**:

- Para proteger tokens de sessão, é essencial evitar o armazenamento em áreas vulneráveis. Em dispositivos móveis, utilizamos o Keychain (iOS) e o Keystore (Android), que fornecem áreas seguras e criptografadas, dificultando o acesso não autorizado ao token.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C4</span> **Rate Limiting e Controle de Solicitações**:

- Ataques de negação de serviço (DoS) e sobrecarga de recursos são mitigados ao limitar a quantidade de solicitações permitidas por IP ou origem. Esse controle ajuda a manter a disponibilidade do sistema e a detectar acessos anômalos.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C5</span> **Armazenamento de Credenciais em Gerenciamento de Segredos**:

- As credenciais do banco de dados são alvos de alta prioridade para invasores. Usar um sistema de gerenciamento de segredos, como AWS Secrets Manager ou HashiCorp Vault, permite o armazenamento criptografado e seguro, protegendo as credenciais e facilitando a rotação e monitoramento de acesso.

<span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">C6</span> **Controles de Acesso Granulares**:

- Para reduzir o risco de acesso não autorizado, implementamos controles de acesso com base no princípio do menor privilégio, garantindo que cada usuário ou processo tenha acesso apenas aos dados e operações estritamente necessários. Isso limita o impacto em caso de comprometimento de contas ou funções.

### Resultado final

Em conclusão, este exemplo ilustra como o processo de Threat Modeling vai além de simplesmente mapear o fluxo de dados (dataflow). Embora o dataflow seja crucial para entendermos as interações e pontos de entrada do sistema, o verdadeiro valor para a maturidade de segurança do produto está nas anotações detalhadas das ameaças e controles identificados.

As ameaças documentadas servem como uma base para antecipar riscos que podem surgir ao longo do desenvolvimento, enquanto os controles fornecem a linha de defesa necessária para mitigar esses riscos. Manter essas anotações atualizadas e revisá-las periodicamente garante que, à medida que o sistema evolui, a segurança continue a ser aprimorada, ajudando a proteger o produto contra ataques e a fortalecer a confiança dos usuários.

## Ferramentas e Técnicas de Apoio

Para facilitar o processo de Threat Modeling Express, é possível usar ferramentas como Excalidraw para visualização rápida de fluxos de dados, Jira e Trello para gestão de tarefas, e Microsoft Threat Modeling Tool e OWASP Threat Dragon para modelagem de ameaças. A escolha da ferramenta deve priorizar a familiaridade da equipe, para que o tempo seja dedicado ao processo de segurança em si.

Antes de iniciar o processo de modelagem, é essencial escolher uma ferramenta para desenhar o **data flow**. Algumas opções populares incluem:

- Dataflow: Visualize fluxos de dados e identifique ameaças.
  - **[Excalidraw](https://excalidraw.com/)**
  - **[Draw.io](htpps://draw.io)**
  - **[Miro](https://miro.com/)**
  - **[MermaidJS](http://mermaid.js.org/)**
- Gerenciar Ameaças
  - **Integração com Jira e Trello**: Gerencie tarefas relacionadas ao Threat Modeling.
  - <span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">Interno</span> **Threat Modeling API**: Sistema interno do time de AppSec da Globo
  - <span class="rounded-md border border-primary-400 px-1 py-[1px] text-xs font-normal text-primary-700 dark:border-primary-600 dark:text-primary-400">Em construção</span> **[ThreatMax](https://github.com/fguisso/threatmax)**  

O importante é que o time esteja confortável com a ferramenta escolhida, pois o objetivo é usar o tempo para modelar ameaças e não para aprender a usar uma nova ferramenta. Se o time já tem conhecimento de uma dessas opções, é mais eficiente seguir com ela para garantir que todos estejam focados no objetivo principal.

## Desafios e Boas Práticas

A implementação de Threat Modeling Express pode enfrentar resistência devido à necessidade de mudança cultural. Engajar o time e promover uma cultura de segurança são essenciais para superar esse desafio. Para algumas empresas, programas de Security Champions, recompensas por participação e eventos regulares de segurança, como dojo e sessões de hands-on, ajudam a cultivar uma cultura de segurança.

## Medindo o Sucesso

Para monitorar o sucesso do Threat Modeling, é importante acompanhar métricas, como o número de ameaças identificadas e mitigadas. Algumas empresas desenvolvem sistemas personalizados para registrar ameaças e controles, permitindo análise contínua e ajuste de processos conforme necessário.

## Casos de Uso: Iterações Contínuas e Alinhamento Constante

Em equipes ágeis, onde as funcionalidades mudam a cada sprint, recomenda-se realizar uma análise de Threat Modeling em incrementos pequenos, acompanhando cada nova funcionalidade. No entanto, o nível de maturidade da equipe pode influenciar a frequência da modelagem.

## Conclusão

O **Threat Modeling Express** oferece uma maneira ágil e eficiente de integrar a modelagem de ameaças ao ciclo de desenvolvimento, ajudando a mitigar riscos antes que eles se tornem problemas. Com a crescente complexidade das ameaças, é essencial que as equipes de segurança e desenvolvimento trabalhem juntas para proteger seus sistemas de forma proativa.

Se você ainda não implementou o Threat Modeling, agora é a hora de começar. Integre-o ao seu pipeline de desenvolvimento e mantenha sua organização segura contra as ameaças de hoje e de amanhã.

Lembre-se, segurança é um processo contínuo e colaborativo, e quanto mais cedo ela for integrada no desenvolvimento, mais eficaz será a proteção de seus sistemas.

<script>
    window.onload = function() {
        var zenButton = document.getElementById('zen-mode-button');
        zenButton.click();
    };
</script>