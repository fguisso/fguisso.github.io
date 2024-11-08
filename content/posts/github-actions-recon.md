---
title: "Automação básica de <span>Recon</span> utilizando o <span>Github Actions</span>"
description: "Demostração de como utilizar o Github Actions para automatizar um Recon"
date: 2022-03-16T00:00:45-03:00
showDate: true
tags: ["owasp", "appsec", "recon", "pt-br", "amass", "naabu", "nuclei"]
categories:
- OWASP
- AppSec
---

Atualmente vem crescendo o número de empresas que utilizam soluções de CI(Continuous Integration) e CD(Continuous Deploy) para automatizar o processo do ciclo de vida do software(SLD). As ferramentas mais utilizadas são Jenkins, Github Actions, Gitlab CI e por aí vai. Estas ferramentas trazem a facilidade de automatizar os testes de software, linters de código, criação de releases e versões finais do software.

No mundo da segurança algumas empresas também já estão implementando os testes de segurança estáticos(SAST) e testes de composição de software(SCA) comprometidos. A cada adição de código ou feature, agora o software pode ser testado antes de ir para produção.

A ideia de trabalhar com ferramentas de segurança no CI/CD vai além do fato de automatizar tarefas, mas também de trazer a cultura de segurança da informação para os times de desenvolvedores e times de infraestrutura, a famosa cultura de DevSecOps. Muito importante no momento que passamos onde os times de desenvolvimento estão escalando absurdamente e não temos especialistas de segurança para acompanhar estes times.

## Casos de usos para além dos testes estáticos(SAST e SCA)

O caso mais simples de uso que podemos abordar é testes dinâmicos de segurança agendados para acontecer periodicamente, levando em conta que a aplicação já esteja em produção.

Outros casos interessantes seria a possibilidade de times de Red Team, se aproveitarem das notificações de eventos de uma pipeline, para lançar testes automatizados assim que comece o desenvolvimento de uma nova feature. Irei abordar este tema mais a fundo em outro artigo.

O que vamos explorar mais neste artigo é o reconhecimento de aplicação já em produção, onde vamos apontar um domínio para nosso CI que vai rodar periodicamente algumas ferramentas de reconhecimento, o que pode ser usado depois pelos times de segurança para futuras análises de segurança.

## Github e Github Actions

Vamos utilizar o Github para versionar e armazenar nosso projeto, então acesse github.com e crie um novo repositório. Agora vamos criar e editar alguns arquivos, caso você não conheça bem o funcionamento do Github, pode usar a interface gráfica mesmo.
O Github Actions já é um serviço habilitado do Github, bastando apenas que você coloque os arquivos de configuração da pipeline em uma pasta chamada `.github/workflows` e todas as interações e logs desta pipeline serão visíveis na aba actions.


Para facilitar a criação de pipelines, o Github Actions oferece as Actions, que são conjuntos de configurações e instalações prontas para você utilizar na sua pipeline, sem a necessidade de você se preocupar com isso. Algumas Actions oficiais estão disponíveis no Marketplace do Github, porém você pode utilizar diretamente qualquer Action que seja um repositório no Github.

Saiba mais sobre as Actions aqui e o link para o marketplace.

![image](https://user-images.githubusercontent.com/5755568/158624544-226a1e59-fef5-441e-beca-73b66c30dd5d.png)
*Exemplos de arquivos workflow separados.*

![image](https://user-images.githubusercontent.com/5755568/158624831-2aebfc25-a58b-49b2-91cb-33d17f0f77c2.png)
*Aba de recursos do Github Actions com workflows configurados.*

### Amass Action

Amass de acordo com sua documentação oficial:

O projeto OWASP Amass realiza mapeamento de rede de superfícies de ataque e descoberta de ativos externos usando coleta de informações de código aberto e técnicas de reconhecimento ativo.

Amass é uma ferramenta muito poderosa que nos fornece funções para o reconhecimento e também para o gerenciamento das informações coletadas. Em nosso caso, vamos utilizar o Amass Action apenas para enumerar um domínio e trazer o resultado em um arquivo txt para usar posteriormente.

Em seu repositório crie um arquivo chamado `amass.yml` dentro da pasta `.github/workflows` e adicione estas configurações e vamos analisar linha a linha o que estamos fazendo:

```yaml
name: 🔎 Recon

on:
    workflow_dispatch:

jobs:
  recon:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-go@v2
        with:
          go-version: 1.17

      - name: Amass - Enumeration
        uses: fguisso/amass-action@main
        with:
          domains: owasp.org
          brute: true
          output: hosts.txt

      - name: GitHub Workflow artifacts
        uses: actions/upload-artifact@v2
        with:
          name: hosts.txt
          path: hosts.txt
```

Obs: arquivos .yml/.yaml são fortemente identados, então os tabs e espaços dentro do arquivo precisam estar corretos para não acontecer erros. Você pode utilizar o próprio Github para validar seu arquivo ou utilizar um linter de arquivos YAML.

Na primeira linha `name:` é apenas um identificador para sua pipeline ser facilmente encontrada dentro da aba Actions do Github.

Depois do `on:` é onde podemos automatizar para que o workflow inicie de acordo com algum evento programado, podendo ser acionada por um ou mais eventos, no momento escolhemos `workflow_dispatch:` para que ela fique disponível no dashboard de Actions e possamos ativar a qualquer momento. Mais para o final veremos como disparar este workflow agendada para rodar 1 vez por semana, mas você também pode disparar usando eventos do Git como, disparar sempre que houver um Pull Request na branch de desenvolvimento, disparar apenas quando acontecer um Merge do branch principal.

`jobs:` é onde podemos separar Actions para rodar em paralelo, como estamos usando a versão Free do Github Actions, vamos tentar manter sempre apenas um job executando tudo o que precisarmos. [Link da documentação sobre jobs](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow).

Os primeiros `steps` vou resumir como apenas configurações para compilar e rodar a ferramenta Amass que é desenvolvida em Golang. Geralmente quando você for usar uma Action, as configurações necessárias estarão na documentações, não se preocupe.

Depois dos `steps` iniciais, vamos chamar o Amass Action utilizando o endereço da Action no Github, `uses: fguisso/amass-action@main` e passar alguns inputs de configurações:

`domains:` vou utilizar o domínio da owasp.org para ser nosso target, você pode utilizar o domínio de sua aplicação ou também passar mais de um domínio separados por vírgula.

Vamos habilitar o `brute:` para fazer um brute force nas pesquisas encontradas e para finalizar vamos passar o nome do arquivo final `output: hosts.txt`, onde vamos armazenar os resultados.

Bom, até aqui já fizemos todo o processo de utilizar uma ferramenta pelo Github Actions, mas devido ao como funciona uma pipeline automatizada, todo `job` que rodamos, vai subir uma nova máquina e no final do processo ela é desligada e deletada, não segurando nenhuma informação ou arquivos criados. Sendo assim, precisamos pegar o nosso arquivo final `hosts.txt` e salvar em algum lugar para ser consultado posteriormente. Temos várias opções como fazer o upload do arquivo para outra máquina, salvar o resultado no próprio repositório Git, utilizando o Github Actions podemos também criar e interagir com as Issues ou Pull Request e o mais utilizado para serviços de CI/CD é criar um artefato do seu `job`, que é o que vamos fazer.

No ultimo `step` iniciamos uma outra Action que serve para fazer o upload de arquivos para os artefatos do seu workflow, apenas bastando passar o nome do arquivo atual e qual o nome final que ficará disponível dentro dos artefatos deste workflow.

Agora vamos rodar nosso workflow manualmente, basta ir na aba Actions do seu repositório, escolher o workflow Amass Enum e clicar no botão Run Workflow.
![image](https://user-images.githubusercontent.com/5755568/158627084-09f2ab97-6d95-439e-9241-6557a5e72aef.png)


Logo apos você podera ver seu workflow rodando e caso queira acompanhar os `steps` e logs, é só clicar no seu `job` `recon`.

Assim que o workflow finalizar todos os `steps` você vai conseguir ver os resultados e seu artefato estará disponível para download:

![image](https://user-images.githubusercontent.com/5755568/158697555-07a8c02a-8132-45e8-ab55-4a3d790cf092.png)

### Naabu Action

Naabu é uma ferramenta de scan de portas, onde ele vai procurar as portas abertas e ativas de um determinado host. Os criadores do projeto mantém uma versão oficial de uma Github Actions para rodar o Naabu, então vamos seguir a documentação deles para seguir com o nosso workflow de recon.

Vamos adicionar a Naabu Action para fazermos o reconhecimento das portas dessa lista de domínios que o Amass nos entregou. Como um depende do resultado do outro, vamos colocar na sequência de `steps` para que seja executado logo em seguida caso não tenha nenhum erro na execução do passo anterior.

```yaml
      - name: Naabu - Port Scannner
        uses: projectdiscovery/naabu-action@main
        with:
            list: hosts.txt
            output: urls.txt
```

Como estamos trabalhando com apenas um `job`, o Github Actions sobe uma máquina com algumas configurações e ao final do processo esta máquina vai ser desligada e removida, com tudo o que foi gerado dentro dela. Já que não finalizamos nosso `job` ainda, então o arquivo `hosts.txt` ainda está disponível. Caso você queira manter estes resultados, precisamos fazer como anteriormente e passar os arquivos de resultado para os artefatos deste `job`.

```yaml
      - name: GitHub Workflow artifacts
        uses: actions/upload-artifact@v2
        with:
          name: hosts.txt
          path: |
            hosts.txt
            urls.txt
```

Para simplificar, vamos passar os arquivos direto para apenas um artefato, assim o Github vai criar um arquivo .zip final para você com todos estes arquivos dentro.

### Nuclei Action

Nuclei é uma ferramenta de scan de vulnerabilidades baseado em templates, com a ajuda da comunidade hoje existem mais de 1000 templates prontos para usar que vão testar sua aplicação em busca de vulnerabilidades conhecidas. Assim como Naabu, também temos um Action oficial do Nuclei que vamos utilizar: https://github.com/marketplace/actions/nuclei-dast-scan

**Atenção!** Devido a um bug encontrado nas Actions do ProjectDiscovery, vou utilizar um fork proprio onde eu corrigi o problema, assim que a correção for incluida no projeto oficial, vou fazer o update do artigo e trocar `fguisso/nuclei-action@inputs` por `projectdiscovery/nuclei-action@main`.

```yaml
      - name: Nuclei - DAST Scan
        uses: fguisso/nuclei-action@inputs
        with:
          urls: urls.txt
          output: nuclei.txt
```

Com o resultado anterior, agora temos os hosts e suas portas ativas, vamos passar para o nuclei verificar se em todos estes serviços encontrados, achamos alguma vulnerabilidade.

### Rodando seu workflow manualmente

Com tudo configurado, agora podemos rodar o nosso workflow manualmente. Basta acessar a aba Actions no seu repositório, selecionar seu workflow e clicar em `Run workflow`.

Você pode acompanhar a execução do seu workflow ou apenas esperar até o ícone ficar verde, o que quer dizer que todas os `steps` aconteceram de forma correta e provavelmente você pode baixar seus resultados no campo de artefatos.

Sempre que quiser, você pode atualizar o domínio que quer escanear e também pode acrescentar mais de um domínio utilizando apenas vírgulas para separá-los. Ex: `owasp.org,github.com`.

### Eventos para automatizar

Como já falado anteriormente, os workflows podem responder a eventos específicos para poder rodar e aqui vamos apenas criar um agendamento, para que possamos rodar nosso workflow uma vez por semana.

```yaml
on:
    schedule:
        - cron: '0 0 * * 0'
    workflow_dispatch:
```

Podemos agendar usando expressões cron schedule, assim nosso workflow vai executar uma vez por semana, toda segunda feira as 00:00.

Não remova a linha `workflow_dispatch` a não ser que você já esteja certo de que não vai usar mais o botão de disparo manual.

Aqui tem uma lista de outros eventos que você pode utilizar para executar seus workflows automaticamente. Leia mais sobre na documentação do Github Actions https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on.
