---
title: "Top 5 Rust Vulnerabilities Created with AI"
date: 2025-06-10
draft: false
description: "Summary of the 5 most common vulnerabilities in Rust applications, generated with AI support and based on RustSec data."
tags: ["rust", "security", "devsecops", "appsec"]
---

This week I’ve been organizing a secure development workshop — a common activity in the day-to-day life of AppSec. The idea is simple: bring hands-on exercises with real-world vulnerabilities so developers can learn how to avoid these problems in their code.

One of the languages we use at work is **Rust**, and honestly, I don’t have much experience with it yet. So I started manually researching and studying the most common vulnerabilities in Rust applications.

And it was much harder than I expected.

## The challenge of finding Rust-specific vulnerabilities

There’s no OWASP Top 10 specifically for Rust yet, and security content for the language is still pretty scattered. I found a few articles trying to apply the “general” OWASP Top 10 to Rust, but that’s not really helpful. Each language has its own nuances — and often, what’s a critical vulnerability in one doesn’t even apply to another. Rust’s compiler, for example, eliminates entire classes of bugs that are common in C and C++.

But that doesn’t mean Rust is immune to vulnerabilities.

## AI to the rescue

After collecting a bunch of articles, links, and PDFs, I realized I had a pile of information that was hard to digest. So I used NotebookLM Pro — a Google tool that lets you create an assistant based on your own documents.

I threw in all the links I collected, including the RustSec security advisory list, and started chatting with the tool. The result was great: it helped me structure a **Top 5 of common Rust vulnerabilities**, especially in web applications.

So here’s a summary of what I found — and what I’ll use as the foundation for our workshop.

## Top 5 Common Rust Vulnerabilities

### 1. Denial of Service (DoS) through unlimited resource usage or panic

Rust doesn’t prevent DoS attacks via massive or deeply nested inputs:

- Examples: large JSONs, recursive XMLs, file upload streams.
- These can cause `OOM`, *stack overflow*, or `panic!`, taking down your service.
- Several cases are listed in RustSec, such as:
  - [RUSTSEC-2024-0401: zlib-rs - stack overflow](https://rustsec.org/advisories/RUSTSEC-2024-0401.html)
  - [RUSTSEC-2024-0376: tonic - remote DoS](https://rustsec.org/advisories/RUSTSEC-2024-0376.html)

### 2. Unsoundness in `unsafe` code or library abstractions

`unsafe` blocks and poorly designed abstractions can break Rust's safety guarantees:

- Misuse of `unsafe`: use-after-free, out-of-bounds access, data races, or undefined behavior (UB).
- Example:
  - [RUSTSEC-2024-0379: fast-float - memory safety violation](https://rustsec.org/advisories/RUSTSEC-2024-0379.html)

### 3. Inadequate input validation

Even without memory safety issues, logic flaws can lead to attacks such as:

- Request smuggling: poorly handled HTTP headers.
- XSS in Markdown/HTML parsers.
- Cache poisoning, HTTP tampering.
- Example:
  - [RUSTSEC-2024-0009: trillium - CRLF injection in HTTP headers](https://rustsec.org/advisories/RUSTSEC-2024-0009.html)

### 4. Supply chain vulnerabilities

Third-party crates introduce significant risks:

- Outdated or abandoned crates.
- Procedural macros executing arbitrary code during build.
- Examples:
  - [RUSTSEC-2024-0370: proc-macro-error - unmaintained crate](https://rustsec.org/advisories/RUSTSEC-2024-0370.html)
  - [RUSTSEC-2024-0425: better-macro - malicious macros](https://rustsec.org/advisories/RUSTSEC-2024-0425.html)

### 5. Exposure of sensitive data and insecure crypto

Issues in this area can lead to major data leaks:

- Logging of sensitive data like tokens or API keys.
- Use of weak algorithms such as MD5 or DES.
- TLS misconfigurations or timing attacks.
- Example:
  - [RUSTSEC-2024-0430: magic-crypt - weak crypto algorithm](https://rustsec.org/advisories/RUSTSEC-2024-0430.html)

## Conclusion

Even though Rust offers strong memory safety guarantees, it **doesn’t eliminate logic, crypto, or supply chain problems**. Security is still the developer’s responsibility — and requires constant auditing of dependencies.

This Top 5 will be the starting point for our upcoming workshop. If you want to join or discuss it further, hit me up!
