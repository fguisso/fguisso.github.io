---
title: "Vulnerabilidades de <span>Configuração Incorreta</span> em <span>Proxies Reversos</span>: Um Guia Completo"
description: "Reverse proxies are essential for managing client-server interactions, but improper handling of headers like X-Forwarded-For and X-Real-IP can introduce significant security vulnerabilities."
date: 2024-09-02T10:44:55-03:00
showTableOfContents: false
showDate: true
tags: ["reverse proxy", "X-Forwarded-For", "X-Real-IP", "security vulnerabilities", "header management", "network security", "NGINX", "Apache", "Kong", "Apigee", "load balancer", "application security", "misconfiguration", "API security", "Forwarded header", "security best practices"]
categories:
- Network Security
- Application Security
- API Management
- Reverse Proxies

---

## **Vulnerabilidades de Configuração Incorreta em Proxies Reversos: Um Guia Completo**

### **Introdução**

Proxies reversos são um componente crucial nas arquiteturas web modernas, gerenciando solicitações entre clientes e servidores backend. Eles oferecem várias funcionalidades, como balanceamento de carga, cache e terminação de SSL. No entanto, configurações incorretas em proxies reversos podem introduzir sérias vulnerabilidades de segurança, particularmente no que diz respeito a cabeçalhos como `X-Forwarded-For` e `X-Real-IP`.

Esses cabeçalhos são usados para passar endereços IP dos clientes através de várias camadas de proxies. O gerenciamento e validação adequados desses cabeçalhos são essenciais para garantir a identificação precisa dos clientes e manter a segurança.

Aqui está um diagrama de fluxo simples que ilustra como os usuários interagem com um proxy reverso e depois com uma aplicação:

{{< mermaid >}}
graph LR
    A((Usuarios)) --> B[Proxy Reverso]
    B --> C(App)
{{< /mermaid >}}

Neste fluxo, o `Proxy Reverso` lida com solicitações recebidas dos `Usuários` e as encaminha para o `App`. O gerenciamento adequado dos cabeçalhos como `X-Forwarded-For` e `X-Real-IP` é essencial para garantir que o `App` receba informações precisas sobre os clientes e mantenha a segurança.

### **Como os Proxies Reversos Lidam com os Cabeçalhos de Segurança**

Os proxies reversos desempenham um papel crítico na gestão e encaminhamento das solicitações dos clientes para os servidores backend. Um aspecto fundamental de sua operação envolve o manuseio de cabeçalhos como `X-Forwarded-For` e `X-Real-IP`. Entender como diferentes proxies reversos gerenciam esses cabeçalhos é fundamental para garantir uma identificação segura e precisa dos clientes.

**Práticas Gerais em Proxies Reversos:**

1. **Não Confiar em Cabeçalhos de Entrada por Padrão**:
   - **Consideração de Segurança**: Proxies reversos normalmente não confiam diretamente em cabeçalhos como `X-Forwarded-For` ou `X-Real-IP` vindos do cliente. Isso porque esses cabeçalhos podem ser manipulados por atacantes para falsificar endereços IP ou outras informações do cliente.
   - **Ação Tomada**: Em vez disso, os proxies reversos frequentemente usam mecanismos e configurações internas para lidar com esses cabeçalhos de forma segura.

2. **Reescrever Cabeçalhos com Base em Informações Internas**:
   - **Manuseio de Endereços Internos**: Proxies reversos frequentemente reescrevem ou atualizam cabeçalhos com base em seu conhecimento interno. Por exemplo, o `remote_addr` (o endereço IP do cliente como visto pelo proxy) pode ser usado para definir ou atualizar o `X-Forwarded-For`.
   - **Configuração**: Isso garante que os cabeçalhos passados para os servidores backend sejam baseados em dados internos confiáveis em vez de cabeçalhos fornecidos pelo cliente.

**Exemplos de Manuseio de Cabeçalhos em Vários Proxies Reversos:**

- **NGINX**:
  - O NGINX usa o `ngx_http_realip_module` para lidar com cabeçalhos. Pode ser configurado para confiar em IPs específicos e garantir o manuseio correto dos cabeçalhos.
  - Exemplo de Configuração:
    ```nginx
    http {
        set_real_ip_from 192.168.1.0/24; # IPs de proxy confiáveis
        real_ip_header X-Forwarded-For;
    }
    ```

- **Apache**:
  - O Apache usa o módulo `mod_remoteip` para substituir o endereço IP do cliente pelo fornecido no cabeçalho `X-Forwarded-For`, se o proxy for confiável.
  - Exemplo de Configuração:
    ```apache
    RemoteIPHeader X-Forwarded-For
    RemoteIPTrustedProxy 192.168.1.0/24
    ```

- **Kong**:
  - O Kong lida com esses cabeçalhos através de seus plugins e configurações. Pode ser configurado para gerenciar IPs de clientes e outros cabeçalhos de forma segura com base no processamento interno.

- **Apigee**:
  - O Apigee processa cabeçalhos como parte de suas políticas de gerenciamento de API. É configurado para garantir que os cabeçalhos usados para controle de acesso e registro sejam processados de forma segura e precisa.

- **Balanceadores de Carga**:
  - Balanceadores de carga podem lidar com esses cabeçalhos de forma diferente dependendo de suas configurações. Eles frequentemente configuram faixas de IP confiáveis e garantem que os cabeçalhos sejam corretamente gerenciados para evitar vulnerabilidades.

Ao não confiar diretamente em cabeçalhos fornecidos pelo usuário e usar mecanismos internos para gerenciar esses cabeçalhos, os proxies reversos ajudam a manter informações precisas e seguras sobre os clientes.

### **Configurações Incorretas Comuns e Seus Impactos**

Configurações incorretas relacionadas aos cabeçalhos `X-Forwarded-For` e `X-Real-IP` podem levar a sérios problemas de segurança:

1. **Confiança Excessiva em Cabeçalhos**:
   - Se um proxy reverso estiver configurado para confiar em todos os cabeçalhos de entrada sem validação adequada, atacantes podem manipular esses cabeçalhos para falsificar endereços IP. Isso pode levar a limitações de taxa ou controle de acesso incorretos baseados em IP.

2. **Configurações de Confiança Incorretas**:
   - Em cenários com múltiplos proxies, como em ambientes em nuvem, cada proxy deve ser configurado corretamente para encaminhar cabeçalhos. Configurações incorretas podem resultar na recepção de um IP de cliente incorreto ou na exposição de dados sensíveis.

**Exemplo do Mundo Real**:

Em uma infraestrutura complexa com um balanceador de carga do GCP, balanceador de carga interno, proxy reverso interno e uma aplicação final, uma configuração incorreta do cabeçalho `X-Real-IP` levou a uma vulnerabilidade. Desenvolvedores assumiram que o cabeçalho `X-Real-IP` do último proxy reverso era o verdadeiro IP do cliente. Na realidade, era o IP do último proxy, fazendo com que todos os usuários parecessem vir do mesmo IP. Essa configuração incorreta afetou aplicações que dependiam do rastreamento de comportamento baseado em IP.

Aqui está um diagrama MermaidJS ilustrando esse cenário:

{{< mermaid >}}
flowchart TD
    A((Usuario)) --> B[GCP Load Balancer]
    B --> C[K8s Load Balancer]
    C --> D[NGINX]
    D --> E(App)
    
    subgraph Vulnerabilidade
        E -->|`X-Real-IP` configurado com IP do NGINX| F[App Misconf]
    end
    
    F --> G[Todos usuarios aparecem com o mesmo IP]
    G --> H[Problema de Rastreamento de Comportamento Baseado em IP]
{{< /mermaid >}}

### **Estratégias de Prevenção**

Para evitar configurações incorretas, considere as seguintes estratégias:

- **Documentar a Infraestrutura**: Garanta que toda a infraestrutura de proxy reverso esteja bem documentada e compartilhada com os desenvolvedores. Esta documentação deve incluir como os cabeçalhos são tratados em cada camada e quaisquer configurações que afetam o processamento de cabeçalhos.

- **Configurar Proxies Confiáveis**: Configure corretamente proxies confiáveis para garantir que os cabeçalhos sejam manuseados de forma correta. Utilize módulos ou configurações que evitem que cabeçalhos sejam facilmente falsificados ou manipulados.

- **Validação e Sanitização**: Implemente validação e sanitização dos cabeçalhos recebidos para evitar aceitar dados potencialmente manipulados.

**Exemplos de Configuração**:

- **NGINX**:
  ```nginx
  http {
      set_real_ip_from 192.168.1.0/24; # IPs de proxy confiáveis
      real_ip_header X-Forwarded-For;
  }
  ```

- **Apache**:
  ```apache
  RemoteIPHeader X-Forwarded-For
  RemoteIPTrustedProxy 192.168.1.0/24
  ```

- **Kong**: Configure o plugin `ip-restriction` ou use configurações semelhantes para lidar com o `X-Forwarded-For` de forma segura.

### **Tendências Emergentes: O Novo Cabeçalho `Forwarded`**

O cabeçalho `Forwarded` é um novo padrão que visa fornecer uma forma mais robusta e consistente de gerenciar informações do cliente através de proxies. Ele combina vários cabeçalhos de encaminhamento em um único formato de cabeçalho, reduzindo o risco de manipulação de cabeçalhos.

**Exemplo**:
```
Forwarded: for=192.0.2.60; proto=http; by=203.0.113.43
```

Claro, aqui está a conclusão e os links adicionados:

### **Conclusão**

Compreender e configurar corretamente proxies reversos é fundamental para manter a segurança de sua infraestrutura. O gerenciamento adequado de cabeçalhos como `X-Forwarded-For` e `X-Real-IP` ajuda a garantir uma identificação precisa dos clientes e evita vulnerabilidades. A documentação completa da infraestrutura, a configuração apropriada dos proxies confiáveis e a implementação de validação e sanitização dos cabeçalhos são práticas essenciais para evitar configurações incorretas.

À medida que novas práticas e padrões emergem, como o cabeçalho `Forwarded`, é crucial manter-se atualizado e adaptar suas configurações para assegurar a robustez e a segurança da sua aplicação.

### **Leitura Adicional**

- [Documentação do Módulo Real IP do NGINX](https://nginx.org/en/docs/http/ngx_http_realip_module.html)
- [Documentação do `mod_remoteip` do Apache](https://httpd.apache.org/docs/2.4/mod/mod_remoteip.html)
- [Manuseio do IP do Cliente no Kong](https://docs.konghq.com/kubernetes-ingress-controller/latest/guides/security/client-ip/)
- [Política de Controle de Acesso do Apigee](https://docs.apigee.com/api-platform/reference/policies/access-control-policy)
