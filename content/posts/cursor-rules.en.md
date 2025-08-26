---
title: "Using <span>Cursor Rules</span> to Accelerate a <span>Secure Code Review</span>"
date: 2025-08-26
tags: ["secure-code-review", "cursor", "appsec", "sast", "typescript", "checklists"]
description: "How to use Cursor Rules and checklists adapted to the project context to optimize security reviews in modern applications."
---

In security-focused code reviews, the biggest challenge isn't running tools — it's **understanding the system context**.

Before looking for vulnerabilities, we need to answer questions like:
- What endpoints exist?
- How is the database architecture?
- What authentication/authorization flows are implemented?
- Which data is most sensitive?

This initial work is usually time-consuming, especially for AppSec teams that don't have deep knowledge of each project.

Recently I tested [Cursor](https://cursor.sh/) as support, configuring **Cursor Rules** (persistent prompts) and **dynamic checklists** to accelerate this process. The experience was applied to [GrowthBook](https://github.com/growthbook/growthbook), an open source project in Node.js and TypeScript, but I also replicated it in internal systems. Here's how my [configuration files](https://gist.github.com/fguisso/0de78dda4fdaa4abfb94eade01628967) turned out.

## What are Cursor Rules?

**[Cursor Rules](https://docs.cursor.com/en/context/rules)** are permanent instructions applied in the Cursor editor. They work as a "guidance layer" for AI, which then prioritizes certain behaviors.

For a **secure code review**, this means we can:

- Create **security checklists** adapted to the project's stack.
- Direct AI to typical vulnerabilities of the **language, framework, or protocol** in use.
- Automate initial discoveries: endpoints, data diagrams, authentication flows.

## How I Structured the Review

### 1. Initial checklist

The first step was a generic AppSec checklist, covering classic practices (injection, XSS, authentication, authorization, exposure of sensitive data, etc.).

With access to the code, Cursor was able to:

- Map **REST endpoints**.
- Reconstruct **ER database diagrams** in Mermaid.
- Highlight tables with **sensitive data** (tokens, passwords, personal information).
- Suggest authentication and authorization flows inferred from the code.

This already reduced days of understanding to a few hours.

### 2. Refining for the project stack

Then I asked Cursor to **refine the checklist for Node.js + TypeScript**.
With this, items like:

- Input validation in **Express**.
- Use of dangerous APIs like `eval` or `child_process`.
- Insecure JWT handling.
- Failures in OAuth2/OpenID authentication libraries.

This refinement is **essential**: priority vulnerabilities vary according to the **stack**.

### 3. Refining by system type

Beyond the language, the type of application also changes the focus:

- **Authentication System**
  - Review *login/logout* flows.
  - Check if MFA exists.
  - Verify password storage (hash + salt).
  - Ensure correct JWT usage (expiration, signature, algorithm).

- **Project that implements a Protocol**
  - If it's **OAuth2/OpenID Connect**, analyze risks of *token leakage* and *insecure redirects*.
  - If it's **GraphQL**, look for *excessive data exposure* and *BOLA/IDOR*.
  - If it's **gRPC**, evaluate schema validation and mutual authentication.

- **Application with Sensitive Database**
  - Ensure use of parameterized queries (preventing SQLi).
  - Review access controls on critical tables.
  - Evaluate encryption at rest and in transit.

- **Services with High External Integration (APIs)**
  - Check validation of payloads received from third parties.
  - Review error handling to avoid *leakage*.
  - Analyze authentication of internal calls (*service-to-service*).

This logic can be translated into a **Cursor Rule** adapted to the project.

### 4. Integration with Terminal and Tools

Another strong point was using the **integrated terminal in Cursor**.

- AI generated attack payloads directly in `curl`.
- The output of tools (Semgrep, Gitleaks, TruffleHog, etc.) was correlated with vulnerable code.
- The result was a much more **direct and contextualized** analysis.

Even with SAST, SCA, and secret scanning pipelines already running, using Cursor locally gave more freedom and additional insights.

### 5. Burp MCP: is it worth it?

I tested **Burp MCP** (Model Context Protocol) in Burp Community Edition, since their MCP is free, but I found it too limited, it ended up hindering my workflow more than helping. If you want to take a look, [Burp MCP](https://github.com/PortSwigger/mcp-server).
I ended up asking Cursor to **explain manually how to reproduce tests in Burp**.

## Observed Benefits

- **Quick understanding** of the project without depending on the dev team.
- **Embedded threat modeling**: I already left with mapped diagrams and controls.
- **Less bottleneck with the development team**: we only involved them when we already had refined findings.
- **More focused analysis**: instead of hunting line by line, I went straight to critical points.

## Practical Tips

1. **Set up a Cursor Rule per project.**
   There's no universal checklist — context is everything.

2. **Ask for continuous refinement.**
   As you find findings, keep asking the AI to recalibrate the checklist.

3. **Don't trust blindly.**
   Use AI to **save time**, but manually validate the results.

4. **Explore integrations.**
   Combine terminal, SAST/SCA tools, and AI for richer analyses.

## Conclusion

Adopting **Cursor Rules** and adapted checklists changed how I approach a *secure code review*.
Before, a significant portion of time was spent trying to understand the project architecture, asking the development team for context, configuring the local environment, and discovering details that were rarely well documented.

With this process, I was able to **drastically reduce ramp time**: AI helped map endpoints, databases, authentication flows, and potential critical points right from the start. This meant that when I involved the dev team, I already arrived with well-structured findings and threat modeling, which transformed the conversation into something much more productive.

Beyond saving effort and **avoiding communication bottlenecks**, there was more time for in-depth analysis and discussing solutions together. The result was a more agile, collaborative process with less friction for everyone.

In the end, AI doesn't replace the critical eye of who does the review, but it helps **eliminate the initial manual work** and free up space for what really matters: **security applied intelligently and integrated with the development team**.

## References

* [GrowthBook on GitHub](https://github.com/growthbook/growthbook)
* [Cursor Editor](https://cursor.sh/)
* [My Gist](https://gist.github.com/fguisso/0de78dda4fdaa4abfb94eade01628967) with Cursor Rule example for the GrowthBook case.