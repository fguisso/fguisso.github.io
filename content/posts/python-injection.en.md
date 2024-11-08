---
title: "<span>Python</span> Injection"
description: "Demonstration of a Telegram bot made in Python with injection vulnerability"
date: 2024-03-23T10:42:45-03:00
showDate: true
showTableOfContents: true
tags: ["owasp", "appsec", "python", "injection", "en"]
categories:
- OWASP
- AppSec
- Python
- Telegram
- Injection
---

## Telegram Bot with Injection Vulnerability

This project demonstrates a simple Telegram bot implemented in Python using the `python-telegram-bot` library. The bot includes a vulnerability in the `echo` function, which evaluates any received text input, potentially leading to code injection attacks.

## Running the Project

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/fguisso/python-injection
   ```

2. Install the necessary dependencies:

   ```bash
   pip install python-telegram-bot
   ```

3. Obtain a Telegram Bot Token:

   - Start a conversation with BotFather on Telegram. You can find it by searching for "@BotFather" in the Telegram search bar or clicking [here](https://t.me/BotFather).
   - Send the `/newbot` command to start the process of creating a new bot.
   - Follow the instructions to choose a name and username for your bot.
   - After creating the bot, BotFather will provide a token. Copy this token.

4. Set the Bot Token as an Environment Variable:

   ```bash
   export TOKEN_TELEGRAM="your_bot_token_here"
   ```

5. Run the Python script:

   ```bash
   python main.py
   ```

6. Interact with the bot on Telegram.

## Bot Functionality

The bot is configured to receive messages containing mathematical operations as input. These operations are solved in the `echo` command, which returns the result of the operation as a response.

For example, when sending the message `2 + 2` to the bot, it will return `4`. This can be useful for performing simple calculations directly on Telegram.

## Explanation of the Vulnerability

Injection vulnerabilities are among the main concerns in web application security. According to the [OWASP Top 10](https://owasp.org/www-project-top-ten/), code injection (such as SQL injection, XSS, Command Injection, and others) is one of the main threats to application security.

In the context of this bot, the injection vulnerability occurs in the `echo` function, which uses the `eval` function to evaluate any received text input. This allows potential attackers to execute arbitrary code by sending malicious input. Exploits are malicious codes used to attack systems, and in this scenario, here are some examples of exploits you can send to your bot that will be executed on the machine where your bot is running:

|Message to the bot|Exploit result|
|--|--|
|`os.getenv("TOKEN_TELEGRAM")`|Access to environment variables|
|`os.system("rm -rf /")`|Execution of operating system commands, in this case, rm will delete all system files.|
|`import malicious_module`|Importing malicious modules|
|`__import__("malicious_module").malicious_function()`|Execution of malicious code.|

Users are encouraged to test these exploits on their own bot and observe the results. However, be careful when using exploits, as they can cause damage to the system.

## Documentation

- [python-telegram-bot Documentation](https://python-telegram-bot.readthedocs.io/en/stable/)
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Telegram BotFather Documentation](https://core.telegram.org/bots#botfather)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) [OWASP Top 10](https://owasp.org/www-project-top-ten/)
