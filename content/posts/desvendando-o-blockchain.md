---
title: "Desvendando o blockchain"
description: "Uma das tecnologias que estão revolucionando varios mercados que você precisa conhecer."
date: 2018-09-01T20:42:45-03:00
showDate: true
tags: ["blockchain", "bitcoin", "pt-br"]
categories:
- Blockchain
---

São quase 10 anos desde o paper de Satoshi Nakamoto apresentando o conceito de um sistema de dinheiro eletrônico peer-to-peer, e você ainda não sabe o que é Bitcoin e muito menos Blockchain. Então vamos lá porque ainda da tempo de entrar na crista da onda!

![In Blockchain we trust!](https://cdn-images-1.medium.com/max/2000/0*JqgiftyvFtTFVAao.jpg)*In Blockchain we trust!*

Existem alguns textos para crianças de cinco anos explicando o conceito, mas nesta época que vivemos, essas crianças já nascem sabendo, então não sinta-se desmerecido em ler textos deste tipo, com certeza você vai conseguir visualizar o conceito e depois partir para partes mais técnicas. Aqui vai um dos exemplos que sempre utilizo e gosto muito:

### A troca da maçã

Nós estamos sentados em um banco no parque Ibirapuera. É um belo dia. Eu tenho uma maçã comigo, e dou ela pra você.

![](https://cdn-images-1.medium.com/max/2000/0*ds2ohSBurU8x40Ss.jpg)

Você agora tem um maçã e eu tenho zero. Muito simples, certo?

Minha maçã esta fisicamente sendo coloca em sua mão. Você sabe que aconteceu. Eu estava lá, você estava lá — você a tocou.

Não precisamos de uma terceira pessoa para nos ajudar na transferencia. Não precisamos de um Juiz entre nós para confirmar que a maçã passou de mim para você.

A maçã agora é sua! Eu não posso de entregar outra maça porque não tenho mais nenhuma. Eu não tenho controle sobre ela mais. A maçã saiu de minha posse. Agora você total controle sobre a maçã. Você pode entregar a maçã para um amigo se quiser, então o seu amigo pode entregar para o amigo dele, e por ai vai.

Agora, digamos que eu tenha uma maçã digital. Vou te entregar minha maçã digital. Agora a coisa fica interessante.

Como você sabe que a maçã digital que costumava ser minha, agora é sua e somente sua? Pense nisso por um instante. É um pouco mais complicado, certo? Como você sabe que eu não mandei esta maçã por email em anexo para meu tio. Ou para meu amigo João. Ou minha amiga Lua também?

Talvez eu tenha feito algumas cópias daquela maçã em meu computador. Talvez eu tenha colocado a maçã para download na internet para um milhão de pessoas baixarem.

Como você pode ver, essa troca digital é um problema. Enviar maçãs digitais não parece igual a enviar maçãs físicas.

Aqui temos um grande problema da computação chamado “gasto duplo” ou “double-spending problem”.

Uma solução para este problema séria fazer um registro da troca em um livro digital. Assim alguém rastreia nossas maçãs e podemos ficar mais tranquilos, problema resolvido!

Ainda temos dois problemas aqui:

1. Alguém em posse do livro digital, pode criar quantas maçãs quiser.

1. Não é a mesma coisa que o nosso dia no parque Ibirapuera onde só estávamos você e eu. Alguém com controle do livro é como colocar um Juiz no meio de nossa troca.

Mas como eu posso trocar minha maçã digital com você desta maneira usual?

E se eu desse este livro para todo mundo? No lugar do livro ficar com apenas umas pessoa, ele estaria na computador de todo mundo. Todas as trocas que já aconteceram, de todos os tempos, em maçãs digitais, serão gravados nele.

Você não pode enganar, Eu não posso enviar maçãs que eu não tenho, porque então não seria capaz de sincronizar com todas as outras pessoas no sistema. Seria um sistema difícil de vencer. Especialmente se ficar muito grande.

Ainda mais, não é controlado por uma única pessoa, então eu sei que ninguém pode decidir por dar mais maçãs digitais a si mesmo. As regras do sistema já foram definidas no inicio.

E os códigos e regras são abertos, você pode participar da rede também — atualizando o livro e certificando-se de que tudo fosse feito. Para o problema, você poderia obter 25 maçãs digitais como recompensa. Na verdade, essa é a única maneira de criar mais maçãs digitais no sistema.

## Criptografia e mineração

Bom, até aqui entendemos o conceito da cadeia de blocos, mas onde entra a tão famosa ideia de “Minerador” e como a criptografia ajuda no sistema para que pessoas estranhas possam se confiar?

Seguindo a linha da troca de maça no livro digital, cada folha do livro, vamos chamar de bloco, é onde contem algumas trocas registradas. Cada bloco do livro contem um [hash](https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_hash)(resultado de um algoritmo que representa o arquivo total mas em um tamanho determinado) do bloco anterior, criando uma corrente de blocos(Blockchain), entre outras informações, para que seja calculado uma nova hash.

Para um novo bloco entrar no livro, precisa ser feito uma conta matemática, que apesar de simples([Minerando bitcoin na mão](http://www.righto.com/2014/09/mining-bitcoin-with-pencil-and-paper.html)), leva um tempo para ser feita, por isso o computador consegue fazer bem mais rápido.

A cada 10 minutos, a rede do Bitcoin altera os valores desta conta matemática, deixando a aleatoriedade escolher qual computador vai conseguir fazer está conta primeiro. Estes computadores que ficam o dia todo dedicado a fazer esta conta, chamamos de “Mineradores” e a cada bloco minerado, eles ganham uma recompensa, para que o poder de processamento continue valendo a pena.

Agora, se todos da rede precisassem fazer esta conta, provavelmente o Bitcoin não teria crescido tanto, é por isso que o algoritmo de calculo do bloco é demorado, mas o calculo de verificação é um pouco mais rápido. Assim, depois que algum computador encontrar o calculo do bloco, os outros apenas precisam validar esta conta.

Vamos imaginar um artista plástico, que precisa criar um cor para seu quadro com misturas de outras cores. Ele ainda só visualiza a cor que quer chegar nessa mistura em sua cabeça, por isso ele precisa testar muitas vezes até chegar ao resultado esperado, do mesmo jeito é a arte de calcular um novo bloco. Mas depois que o artista chega a cor desejada e aplica a sua obra, quando ele precisar desta nova cor, ele já terá uma referencia, ele não anotou a quantidade de cores que precisa para chegar no resultado, mas com a referencia, fica muito mais fácil ir testando até chegar na cor igual. Então quando temos um bloco já calculado, fica mais fácil fazer a conta de verificação, já que o resultado tem que ser verdadeiro ou falso. Caso seja falso, o bloco não entra na cadeia e alguém ainda tem que calcular o valor real do bloco. Caso verdadeiro, os outros computadores da rede podem adicionar o bloco a sua cadeia.

## From Zero to 4

Agora que você entendeu como funciona o Blockchain, vamos trazer mais novidades. Apesar de que o Blockchain é um conceito e termos variantes de todos os tipos, usamos um versionamento para dizer em qual época de ideias estamos.

### Blockchain 1.0

O começo de tudo, ou pelo menos quando as coisas se juntaram e tomaram forma, o Bitcoin. O primeiro exemplo de blockchain para cryptomoedas, uma forma de registro de trocar e transações financeiras. O tempo do *dinheiro da internet.*

### Blockchain 2.0

Chamem os Robodivogados, chegou a onda dos Smart Contracts. Contratos inteligentes, registrados no blockchain para serem executados de modo autônomo. Neste campo, o blockchain do Ethereum é um dos mais utilizados para criar Smart Contracts.

### Blockchain 3.0

Até este momento, os Smart Contracts eram escritos como linguagens de programação, se deu bem o Advogado que aprendeu a programar em algum curso por ai. Outras pessoas não conseguiam interagir com esses novos contratos, foi ai que surgiu os Dapps, Decentralized Applications, que nada mais é que um sistema que utiliza os Smart Contracts como back-end, e tem uma camada de front-end para o usuário comum conseguir interagir com o blockchain.

### Blockchain 4.0

Aqui temos um match com um outro conceito novo, a Industria 4.0, onde você utiliza IoT para conectar as maquinas de industrias a rede. Juntando Cryptomoedas, Dapps e IoT chegamos a nova fase do blockchain.
