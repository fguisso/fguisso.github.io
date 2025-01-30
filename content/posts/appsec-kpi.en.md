---
title: "Creating <span>KPIs</span> for an <span>AppSec</span> Program"
description: "I share here my experiences and learnings about creating KPIs for application security, without magic formulas, but with practical insights that can help other professionals in the field."
date: 2025-01-30
tags: ["AppSec", "KPIs", "Application Security"]
---
{{< katex >}}

# Creating KPIs for an AppSec Program: A Possible Path

If you work with **application security (AppSec)** and have had to define monitoring metrics, you've probably faced the same difficulty as I have: **how to create KPIs that really make sense?**  

Unlike a manager or coordinator, my experience comes from **daily technical work and conversations with other professionals** who work directly in software security. I had never had to formally structure KPIs before, but I realized that this was a necessary step to **show impact, justify investments, and guide improvements in the AppSec program**.  

This article is the result of my experiences, discussions, and continuous learning. **It's not a definitive guide**, but a starting point for those who, like me, are looking for a practical approach to measuring application security.

---

## 🏗️ **Where to Start?**

Before defining specific metrics, **we need to understand what we want to measure and why**. Some questions help in this process:

- **What is the goal of the AppSec program?** (E.g., Risk reduction, increased automation, team awareness, etc.)
- **Who will use these metrics?** (Security team, leadership, developers, auditors?)
- **What can we already measure today?** (There's no point in creating an impossible KPI to track)
- **Is the data available and easy to collect?** (KPIs without accessible data become empty numbers)
- **Does the metric help in decision-making?** (If it doesn't generate action, it might not be a useful KPI)

---

## 🎯 **Defining KPIs for AppSec**

After many discussions and exchanges with the community, I realized that AppSec KPIs can be grouped into **three major categories**:

1. **Adoption and Coverage KPIs** → Measure the use of security tools and processes.  
2. **Efficiency KPIs** → Evaluate the speed and effectiveness in fixing vulnerabilities.  
3. **Impact KPIs** → Show how the program is reducing risks or improving secure practices.  

Here are two KPIs that we recently structured and that make sense in our context:

---

### **📌 KPI 1: Detailed Use of GitHub Advanced Security**
> **Objective:** Monitor the adoption and effective use of GitHub Advanced Security tools to ensure "secure by default" practices.

- **Calculation Formula:**  
\\(\text{Overall Coverage} = \left( \frac{\text{Repositories with At Least One Active Feature}}{\text{Total Repositories}} \right) \times 100\\)

The specific coverage of each feature can be calculated as follows:

- **Calculation Details**
  - **CodeQL**: \\(\frac{\text{Repositories with Active CodeQL}}{\text{Total Repositories}} \times 100\\)
  - **Secret Scanning**: \\(\frac{\text{Repositories with Active Secret Scanning}}{\text{Total Repositories}} \times 100\\)
  - **Push Protection**: \\(\frac{\text{Repositories with Active Push Protection}}{\text{Total Repositories}} \times 100\\)
  - **Dependabot**: \\(\frac{\text{Repositories with Active Dependabot}}{\text{Total Repositories}} \times 100\\)
- **Frequency:** Monthly  
- **Data Source:** GitHub Logs and API  
- **Automation:** Create scripts for extraction and visualization in a dashboard  

**📌 Why did we choose this KPI?**  
The idea is to **map the adoption of already available tools**, understand where we have gaps, and encourage improvements without imposing barriers for developers.

---

### **📌 KPI 2: Regular Training Participation Rate**
> **Objective:** Provide the necessary context for developers to make informed security decisions, promoting autonomy and secure practices aligned with the concept of "Context, not Control".

- **Calculation Formula:**  
\\(  \text{Participation Rate} = \left( \frac{\text{Number of Trained Developers}}{\text{Total Number of Developers}} \right) \times 100\\)

- **Frequency:** Quarterly or Semi-annually  
- **Data Source:** Training platform reports (e.g., KnowBe4, internal material)  
- **Automation:** Create integration with a dashboard to track attendance and progress  

**📌 Why did we choose this KPI?**  
Training can't be just a "checkbox". It needs to **provide context for developers** to make secure decisions without always having to rely on the AppSec team.  

---

## 🔥 **Other Metrics We Considered**
In addition to the two KPIs we chose, some other metrics discussed with the community can be useful, depending on the stage of your program:

📊 **Language Coverage** → Measures if all languages used in the company have support for some security tool.  
📉 **Mean Time to Remediate Vulnerabilities (MTTR)** → Helps understand if we're improving the speed of correction.  
🛡️ **Security Component Adoption Rate** → Measures how many teams use "secure by default" solutions.  
🚨 **Number of Incidents Related to Insecure Code** → Indicates if detected vulnerabilities are being taken seriously.  

---

## 💡 **Conclusion**
Creating KPIs for AppSec is not easy. At first, I also thought I needed to have perfect and super strategic metrics, but I realized that the most important thing is to **start practically and iterate over time**.  

If you're also setting up metrics for your AppSec program, **my advice is:**  
- Start simple  
- Choose **KPIs that help in decision-making**  
- **Automate what's possible**  
- **Don't focus only on numbers, but on real impact**  

---

## 📚 **References and Recommended Reading**
- [Netflix Security Approach: Scaling AppSec](https://netflixtechblog.com/scaling-appsec-at-netflix-2c3b6c51b1b2)
- [GitHub Advanced Security Features](https://github.com/features/security)
- [OWASP SAMM: Security Metrics](https://owaspsamm.org/model/measure/)
`
