---
title: "Criando <span>KPIs</span> para um Programa de <span>AppSec</span>"
description: "Compartilho aqui minhas experiências e aprendizados sobre a criação de KPIs para segurança de aplicações, sem fórmulas mágicas, mas com insights práticos que podem ajudar outros profissionais na área."
date: 2025-01-30
tags: ["AppSec", "KPIs", "Segurança de Aplicações"]
---
{{< katex >}}

# Criando KPIs para um Programa de AppSec: Um Caminho Possível

Se você trabalha com **segurança de aplicações (AppSec)** e já precisou definir métricas de acompanhamento, provavelmente enfrentou a mesma dificuldade que eu: **como criar KPIs que realmente façam sentido?**  

Diferente de um gestor ou coordenador, minha experiência vem do **dia a dia técnico e de conversas com outros profissionais** que atuam diretamente em segurança de software. Nunca tive que estruturar KPIs de maneira formal antes, mas percebi que esse era um passo necessário para **mostrar impacto, justificar investimentos e guiar melhorias no programa de AppSec**.  

Este artigo é o resultado das minhas experiências, discussões e aprendizado contínuo. **Não é um guia definitivo**, mas um ponto de partida para quem, como eu, está buscando uma abordagem prática para medir a segurança de aplicações.

---

## 🏗️ **Por Onde Começar?**

Antes de definir métricas específicas, **precisamos entender o que queremos medir e por quê**. Algumas perguntas ajudam nesse processo:

- **Qual o objetivo do programa de AppSec?** (Ex.: Redução de riscos, aumento de automação, conscientização de times, etc.)
- **Quem vai usar essas métricas?** (Time de segurança, liderança, desenvolvedores, auditoria?)
- **O que já conseguimos medir hoje?** (Não adianta criar um KPI impossível de acompanhar)
- **Os dados estão disponíveis e são fáceis de coletar?** (KPIs sem dados acessíveis viram números vazios)
- **A métrica ajuda a tomar uma decisão?** (Se não gera ação, talvez não seja um KPI útil)

---

## 🎯 **Definindo KPIs para AppSec**

Após muitas discussões e trocas com a comunidade, percebi que os KPIs de AppSec podem ser agrupados em **três grandes categorias**:

1. **KPIs de Adoção e Cobertura** → Medem o uso de ferramentas e processos de segurança.  
2. **KPIs de Eficiência** → Avaliam a rapidez e eficácia na correção de vulnerabilidades.  
3. **KPIs de Impacto** → Mostram como o programa está reduzindo riscos ou melhorando práticas seguras.  

Aqui estão dois KPIs que estruturamos recentemente e que fazem sentido no nosso contexto:

---

### **📌 KPI 1: Uso Detalhado do GitHub Advanced Security**
> **Objetivo:** Monitorar a adoção e uso eficaz das ferramentas do GitHub Advanced Security para garantir práticas "secure by default".

- **Fórmula de Cálculo:**  
\\(\text{Cobertura Geral} = \left( \frac{\text{Repositórios com Pelo Menos uma Funcionalidade Ativa}}{\text{Total de Repositórios}} \right) \times 100\\)

Já a cobertura específica de cada funcionalidade pode ser calculada da seguinte forma:

- **Detalhamento de calculos**
  - **CodeQL**: \\(\frac{\text{Repositórios com CodeQL Ativo}}{\text{Total de Repositórios}} \times 100\\)
  - **Secret Scanning**: \\(\frac{\text{Repositórios com Secret Scanning Ativo}}{\text{Total de Repositórios}} \times 100\\)
  - **Push Protection**: \\(\frac{\text{Repositórios com Push Protection Ativo}}{\text{Total de Repositórios}} \times 100\\)
  - **Dependabot**: \\(\frac{\text{Repositórios com Dependabot Ativo}}{\text{Total de Repositórios}} \times 100\\)
- **Frequência:** Mensal  
- **Fonte de Dados:** Logs e API do GitHub  
- **Automação:** Criar scripts para extração e visualização em um dashboard  

**📌 Por que escolhemos esse KPI?**  
A ideia é **mapear a adoção das ferramentas já disponíveis**, entender onde temos gaps e incentivar melhorias sem impor barreiras para os desenvolvedores.

---

### **📌 KPI 2: Taxa de Participação em Treinamento Regular**
> **Objetivo:** Fornecer o contexto necessário para que os desenvolvedores tomem decisões informadas sobre segurança, promovendo autonomia e práticas seguras alinhadas ao conceito de "Context, not Control".

- **Fórmula de Cálculo:**  
\\(  \text{Taxa de Participação} = \left( \frac{\text{Número de Desenvolvedores Treinados}}{\text{Número Total de Desenvolvedores}} \right) \times 100\\)

- **Frequência:** Trimestral ou Semestral  
- **Fonte de Dados:** Relatórios da plataforma de treinamento (ex.: KnowBe4, material interno)  
- **Automação:** Criar integração com um dashboard para acompanhar presença e evolução  

**📌 Por que escolhemos esse KPI?**  
Treinamento não pode ser apenas um "checkbox". Ele precisa **fornecer contexto para os desenvolvedores** tomarem decisões seguras sem precisar depender sempre do time de AppSec.  

---

## 🔥 **Outras Métricas que Consideramos**
Além dos dois KPIs que escolhemos, algumas outras métricas discutidas com a comunidade podem ser úteis, dependendo do estágio do seu programa:

📊 **Cobertura de Linguagens** → Mede se todas as linguagens usadas na empresa têm suporte a alguma ferramenta de segurança.  
📉 **Tempo Médio de Correção de Vulnerabilidades (MTTR)** → Ajuda a entender se estamos melhorando a velocidade de correção.  
🛡️ **Taxa de Adoção de Componentes de Segurança** → Mede quantos times utilizam soluções "secure by default".  
🚨 **Número de Incidentes Relacionados a Código Inseguro** → Indica se as vulnerabilidades detectadas estão sendo levadas a sério.  

---

## 💡 **Conclusão**
Criar KPIs para AppSec não é fácil. No início, eu também achava que precisava ter métricas perfeitas e super estratégicas, mas percebi que o mais importante é **começar de forma prática e iterar ao longo do tempo**.  

Se você também está montando métricas para seu programa de AppSec, **minha dica é:**  
- Comece simples  
- Escolha **KPIs que ajudam na tomada de decisão**  
- **Automatize o que for possível**  
- **Não foque apenas em números, mas no impacto real**  

---

## 📚 **Referências e Leituras Recomendadas**
- [Netflix Security Approach: Scaling AppSec](https://netflixtechblog.com/scaling-appsec-at-netflix-2c3b6c51b1b2)
- [GitHub Advanced Security Features](https://github.com/features/security)
- [OWASP SAMM: Security Metrics](https://owaspsamm.org/model/measure/)

