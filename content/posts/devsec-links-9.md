---
title: "Devsec Links #08"
description: "Links interessantes no tema de desenvolvimento seguro."
date: 2023-10-01T09:45:33-03:00
tags: ["DevSec", "AppSec", "Links", "pypi", "npm", "openapi", "api", "imds"]
categories: ["DevSec"]
series: ["DevSec Links"]
series_order: 8
---

Escrito por [Geovana](https://www.linkedin.com/in/geovana-silva/) & Guisso

## Curiosidade do mês   
    
> Em outubro de 2019, o Google revelou a vulnerabilidade "StrandHogg" no sistema Android. Esta falha permitia a aplicativos maliciosos se passarem por apps legítimos, coletando dados sensíveis dos usuários. O problema foi resolvido com atualizações de segurança, enfatizando a importância de manter os dispositivos atualizados e revisar permissões de aplicativos. 
 
## [Manifest Confusion no PyPI](https://stiankri.substack.com/p/manifest-confusion-in-pypi) 
O Manifest Confusion é um problema no ecossistema PyPI, o repositório principal de pacotes Python. Ele surge por inconsistências entre metadados no PyPI e nos arquivos baixados por ele, levando a diferentes resoluções de dependências por ferramentas de gerenciamento e segurança de pacotes. Isso pode resultar na instalação de pacotes maliciosos ou vulneráveis. A solução recomendada é utilizar o PEP 658 em vez da API JSON do PyPI para resolver dependências. 

## [O enorme bug no coração do ecossistema npm](https://blog.vlt.sh/blog/the-massive-hole-in-the-npm-ecosystem) 
O texto descreve um problema no ecossistema npm, onde a validação de informações do manifesto com o conteúdo do pacote tarball não é feita pelo Registro Público do npm. Em vez disso, é deixado para os clientes compatíveis com npm, o que pode levar a várias questões, como envenenamento de cache, instalação de dependências desconhecidas, execução de scripts não listados e possíveis ataques de downgrade. O autor sugere que a documentação dos APIs do Registro Público do npm seja feita rapidamente e encoraja os desenvolvedores a entrar em contato com os mantenedores de ferramentas que dependem dos dados do manifesto, incentivando o uso do conteúdo do pacote para metadados sempre que apropriado.  

## [Uma visão geral da segurança no OpenAPI](https://blog.liblab.com/a-big-look-at-security-in-openapi/) 
O artigo aborda as opções de segurança disponíveis no OpenAPI, discute como empresas de diferentes tamanhos estão implementando segurança em suas APIs e oferece orientações para construir uma API segura. 

## [Passkeys estão disponíveis no Github](https://github.blog/2023-09-21-passkeys-are-generally-available/)
As Passkeys são uma nova forma de autenticação mais segura para contas do GitHub, reduzindo a dependência de métodos facilmente passíveis de phishing, como senhas. Agora, estão disponíveis para todos os usuários. O suporte amplo da indústria por parte de empresas como Apple, Google e Microsoft tem sido crucial para o sucesso das Passkeys, com aprimoramentos recentes no Windows e Chrome aprimorando a compatibilidade entre dispositivos e ecossistemas. 

## [Obtenha todos os benefícios do IMDSv2 e desative o IMDSv1 em sua infraestrutura AWS](https://aws.amazon.com/blogs/security/get-the-full-benefits-of-imdsv2-and-disable-imdsv1-across-your-aws-infrastructure/?utm_source=tldrsec.com&utm_medium=newsletter&utm_campaign=tl-dr-sec-202-kubehound-supply-chain-security-vendor-landscape-cspm-evaluation-matrix) 
O Instance Metadata Service (IMDS) soluciona um desafio de segurança na nuvem ao oferecer credenciais temporárias, eliminando a necessidade de distribuir manual ou programaticamente credenciais confidenciais para instâncias. O IMDSv1, por não ter autenticação para buscar dados do terminal IMDS, um invasor pode obter acesso a informações confidenciais presentes no serviço de metadados. Portanto, a atualização para o IMDSv2 é crucial, e é exatamente isso que o artigo aborda. 

## [Milhares de GitHub Comments vazam chaves de API ativas](https://trufflesecurity.com/blog/thousands-of-github-comments-leak-live-api-keys/)
No artigo, você verá uma pesquisa que conclui que os desenvolvedores inadvertidamente expõem credenciais no GitHub através de comentários públicos, resultando em milhares de chaves e senhas vazadas. Essa prática difere dos vazamentos em commits. A maioria dos casos ocorre em texto, não em código, e editar os comentários não os remove completamente. É crucial varrer regularmente os comentários, girar chaves expostas e utilizar o TruffleHog para verificação.

