---
title: "<span>Proxmox</span> and <span>Homelab</span>: How I <span>Transformed</span> a Mini PC into a <span>Respectable Server</span>"
description: "How I Transformed a Mini PC into a Respectable Server"
date: 2024-08-17T10:42:45-03:00
showTableOfContents: true
showDate: true
tags: ["proxmox", "debian", "adguard", "tailscale", "homelab"]
categories:
- Homelab
- Proxmox
---

Recently, I had the opportunity to present at Debian Day Natal 2024, where I shared my journey of transforming a mini PC, purchased from AliExpress, into a complete homelab server. Using Proxmox, a Debian-based operating system, I managed to set up a series of services that facilitate both my personal and professional life. If you're a free software enthusiast and want to explore the possibilities of a homelab, this article is for you.

#### **What Is Proxmox and Why Use It?**
In my talk, I started by explaining what [Proxmox](https://www.proxmox.com/en/downloads) is. For those unfamiliar, Proxmox is a Debian-based virtualization platform that allows for simple and efficient creation and management of containers and virtual machines. Its installation is straightforward and offers a powerful web interface, accessible even from your phone.

#### **My Homelab and Hardware Used**
For this project, I used a mini PC with the following hardware:
- **Processor:** AMD Ryzen 5 5600H
- **Memory:** 16GB RAM
- **Storage:** 500GB SSD

If you're interested, you can find this mini PC on [AliExpress](https://pt.aliexpress.com/item/1005003443853901.html?spm=a2g0o.order_list.order_list_main.187.4d3ecaa4Qh7Z9i&gatewayAdapt=glo2bra).

This setup allowed me to run several services in containers and VMs, meeting my needs with plenty of room to spare. However, if you're looking for a more compact and affordable solution, you might consider using a Raspberry Pi with [Pimox](https://github.com/pimox/pimox7), which brings Proxmox functionalities to Raspberry Pi hardware.

#### **My Homelab and Tailscale**
I use Proxmox as the foundation for my homelab, where I run various services that I can access from anywhere. To simplify remote access, I use Tailscale, a VPN solution that makes the connection secure and easy to set up on different devices. During the demonstration, I used my phone to show the Proxmox Web, explaining how I manage containers and VMs.

#### **Services that Transform the Homelab**
**1. AdGuard:**
The first service I presented was [AdGuard](https://tteck.github.io/Proxmox/#adguard-home-lxc). It's an ad and tracking blocker that protects the entire network. Additionally, I showed how I use the rule "rewrite" feature to create my own local domains, such as `pve.pandora:8006` and `photoprism.pandora:80`.

**2. Paperlessngx:**
This is the service I use to digitize and organize documents such as invoices and personal papers. [Paperlessngx](https://tteck.github.io/Proxmox/#paperless-ngx-lxc) eliminates the need to keep stacks of paper, allowing for efficient and accessible management of my documents.

**3. Photoprism:**
[Photoprism](https://tteck.github.io/Proxmox/#photoprism-lxc) is my intelligent photo manager. Even on limited hardware, it can perform facial searches and index all my photos and videos. This makes organizing and searching for images extremely easy and efficient.

**4. VSCode Web:**
Lastly, I presented [VSCode Web](https://tteck.github.io/Proxmox/#vs-code-server). With it, I can program remotely, using just a tablet or phone, and execute terminal commands directly on the server. This greatly facilitates development, especially when I need to compile and test code quickly.

#### **Automating with tteck and Future Expansions**
To make things even easier, I finished by showing the list of automated scripts from [tteck](https://tteck.github.io/Proxmox), which allow for quick creation of various services in Proxmox. Although I didn't mention it during the talk, it's also worth exploring other tools that can be integrated into your homelab, such as:

- **[Nextcloud](https://tteck.github.io/Proxmox/#nextcloud-lxc):** An excellent solution for file storage and synchronization.
- **[Nginx Proxy Manager](https://tteck.github.io/Proxmox/#nginx-proxy-manager-lxc):** For managing reverse proxies easily and intuitively.
- **[Jellyfin Media Server](https://tteck.github.io/Proxmox/#jellyfin-media-server-lxc):** An open-source solution for media streaming.
- **[Vaultwarden](https://tteck.github.io/Proxmox/#vaultwarden-lxc):** A secure and efficient password manager.

I hope this article inspires you to explore the world of homelabs. With a little creativity and the right tools, the possibilities are endless!
