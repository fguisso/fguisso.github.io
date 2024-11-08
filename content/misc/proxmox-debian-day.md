---
title: "<span>Proxmox</span> e <span>Homelab</span>: Como <span>Transformei</span> um Mini PC em um <span>Servidor de Respeito</span>"
description: "Como Transformei um Mini PC em um Servidor de Respeito"
date: 2024-08-17T10:42:45-03:00
showTableOfContents: true
showDate: true
tags: ["proxmox", "debian", "adguard", "tailscale", "homelab"]
categories:
- Homelab
- Proxmox
---

Recentemente, tive a oportunidade de apresentar no Debian Day Natal 2024, onde compartilhei minha jornada de transformar um mini PC, adquirido no AliExpress, em um servidor de homelab completo. Utilizando o Proxmox, um sistema operacional baseado em Debian, consegui configurar uma série de serviços que facilitam tanto minha vida pessoal quanto profissional. Se você é um entusiasta de software livre e quer explorar as possibilidades de um homelab, este artigo é para você.

#### **O Que É Proxmox e Por Que Usá-lo?**
Na minha palestra, comecei explicando o que é o [Proxmox](https://www.proxmox.com/en/downloads). Para quem não está familiarizado, Proxmox é uma plataforma de virtualização baseada em Debian que permite a criação e gestão de containers e máquinas virtuais de maneira simples e eficiente. Sua instalação é direta e oferece uma interface web poderosa, acessível até pelo celular.

#### **Meu Homelab e Hardware Utilizado**
Para este projeto, utilizei um mini PC com o seguinte hardware:
- **Processador:** AMD Ryzen 5 5600H
- **Memória:** 16GB RAM
- **Armazenamento:** 500GB SSD

Se você estiver interessado, pode encontrar esse mini PC no [AliExpress](https://pt.aliexpress.com/item/1005003443853901.html?spm=a2g0o.order_list.order_list_main.187.4d3ecaa4Qh7Z9i&gatewayAdapt=glo2bra).

Este setup me permitiu rodar vários serviços em containers e VMs, atendendo minhas necessidades com folga. No entanto, se você procura uma solução mais compacta e acessível, pode considerar utilizar um Raspberry Pi com o [Pimox](https://github.com/pimox/pimox7), que traz as funcionalidades do Proxmox para o hardware do Raspberry.

#### **Meu Homelab e Tailscale**
Uso o Proxmox como base para meu homelab, onde rodo vários serviços que posso acessar de qualquer lugar. Para simplificar o acesso remoto, utilizo o Tailscale, uma solução VPN que torna a conexão segura e fácil de configurar em diferentes dispositivos. Durante a demonstração, usei meu celular para mostrar o Proxmox Web, explicando como gerencio containers e VMs.

#### **Serviços que Transformam o Homelab**
**1. AdGuard:**
O primeiro serviço que apresentei foi o [AdGuard](https://tteck.github.io/Proxmox/#adguard-home-lxc). Trata-se de um bloqueador de anúncios e rastreamento que protege toda a rede. Além disso, mostrei como utilizo o recurso de "rewrite" de regras para criar meus próprios domínios locais, como `pve.pandora:8006` e `photoprism.pandora:80`.

**2. Paperlessngx:**
Este é o serviço que utilizo para digitalizar e organizar documentos como notas fiscais e documentos pessoais. O [Paperlessngx](https://tteck.github.io/Proxmox/#paperless-ngx-lxc) elimina a necessidade de manter pilhas de papel, permitindo um gerenciamento eficiente e acessível dos meus documentos.

**3. Photoprism:**
O [Photoprism](https://tteck.github.io/Proxmox/#photoprism-lxc) é meu gerenciador de fotos inteligente. Mesmo em um hardware limitado, ele é capaz de realizar buscas por rostos e indexar todas as minhas fotos e vídeos. Isso torna a organização e a busca de imagens extremamente fácil e eficiente.

**4. VSCode Web:**
Por fim, apresentei o [VSCode Web](https://tteck.github.io/Proxmox/#vs-code-server). Com ele, posso programar remotamente, utilizando apenas um tablet ou celular, além de executar comandos de terminal diretamente no servidor. Isso facilita muito o desenvolvimento, especialmente quando preciso compilar e testar códigos rapidamente.

#### **Automatizando com tteck e Expansões Futuras**
Para facilitar ainda mais, finalizei mostrando a lista de scripts automatizados do [tteck](https://tteck.github.io/Proxmox), que permitem a criação rápida de diversos serviços no Proxmox. Embora não tenha mencionado durante a palestra, também vale a pena explorar outras ferramentas que podem ser integradas ao seu homelab, como:

- **[Nextcloud](https://tteck.github.io/Proxmox/#nextcloud-lxc):** Uma excelente solução para armazenamento e sincronização de arquivos.
- **[Nginx Proxy Manager](https://tteck.github.io/Proxmox/#nginx-proxy-manager-lxc):** Para gerenciar proxies reversos de maneira fácil e intuitiva.
- **[Jellyfin Media Server](https://tteck.github.io/Proxmox/#jellyfin-media-server-lxc):** Uma solução open-source para streaming de mídia.
- **[Vaultwarden](https://tteck.github.io/Proxmox/#vaultwarden-lxc):** Um gerenciador de senhas seguro e eficiente.

Espero que este artigo inspire você a explorar o mundo dos homelabs. Com um pouco de criatividade e as ferramentas certas, as possibilidades são infinitas!
