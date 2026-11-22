import type { EditorialArticle } from './editorial';
import { localizedPath } from '../utils/i18n';
import { postHref, type PostLanguage } from '../utils/posts';

export function getGear(lang: PostLanguage): EditorialArticle[] {
  const t = (pt: string, en: string) => lang === 'en' ? en : pt;
  const credit = t('Foto de Paul Stamatiou', 'Photo by Paul Stamatiou');
  const entries: Omit<EditorialArticle, 'href'>[] = [
    {
      slug: 'mini-pc-proxmox',
      label: 'Homelab',
      title: t('Mini PC com Proxmox', 'A mini PC running Proxmox'),
      description: t('O servidor de casa que mostrei no Debian Day Natal.', 'The small server behind my demo at Debian Day Natal.'),
      sections: [
        {
          heading: t('O que cabe nessa máquina', 'What fits on one machine'),
          text: t(
            'O mini PC tem um Ryzen 5 5600H, 16 GB de memória e um SSD de 500 GB. Instalei o Proxmox para dividir esses recursos entre máquinas virtuais e containers. Um dos serviços é o AdGuard Home, que cuida do DNS da rede e dá nomes fáceis de lembrar aos serviços internos.',
            'The mini PC has a Ryzen 5 5600H, 16 GB of memory and a 500 GB SSD. I installed Proxmox to share those resources among virtual machines and containers. One of the services is AdGuard Home, which handles DNS on my network and gives my internal services names I can remember.',
          ),
        },
        {
          heading: t('O painel no celular', 'The dashboard on a phone'),
          text: t(
            'Na palestra de 2024, abri o painel do Proxmox pelo celular e mostrei as máquinas que rodavam em casa. A conexão passava pelo Tailscale, então pude fazer a demonstração de fora da rede sem publicar o painel na internet.',
            'During my 2024 talk, I opened the Proxmox dashboard on my phone to show the machines running at home. Tailscale carried the connection, so I could give the demo from the venue while keeping the dashboard private.',
          ),
        },
      ],
      source: { title: t('Meu relato do Debian Day Natal', 'My notes from Debian Day Natal'), href: postHref('proxmox-debian-day', lang) },
    },
    {
      slug: 'ipod',
      label: t('Áudio · Paul Stamatiou', 'Audio · Paul Stamatiou'),
      title: t('Revisitando o iPod', 'Revisiting the iPod'),
      description: t('Vinte anos depois, uma roda sensível ao toque ainda dá conta de uma biblioteca de músicas.', 'Twenty years later, a touch wheel still makes a good way to browse a music library.'),
      image: {
        src: '/preview/stamatiou-ipod.webp',
        alt: t('Um iPod clássico com roda de controle abaixo da tela', 'A classic iPod with a scroll wheel below the screen'),
        width: 750, height: 526,
      },
      credit,
      sections: [
        {
          heading: t('Uma roda para percorrer a lista', 'A wheel for long playlists'),
          text: t(
            'Paul Stamatiou procurou um iPod de segunda geração como o que tinha na época. Nesse modelo, a roda fica parada sob o dedo. Um movimento circular percorre a lista de faixas, e os botões ao redor cuidam da reprodução.',
            'Paul Stamatiou went looking for a second-generation iPod like the one he used to own. On this model the wheel stays still under your thumb. A circular gesture scrolls through tracks, with separate buttons around the wheel for playback.',
          ),
        },
        {
          heading: t('Do Mac para o bolso', 'From the Mac to the pocket'),
          text: t(
            'Para carregar músicas, Paul precisou ligar a porta FireWire do iPod à Thunderbolt do MacBook com uma sequência de adaptadores. Feita a conexão, o Finder reconheceu o aparelho e sincronizou a biblioteca. Depois foi só soltar o cabo e escolher o que ouvir.',
            'Getting music onto the iPod meant joining its FireWire port to the Thunderbolt port on a MacBook through a chain of adapters. Finder recognized the player and synced the library. Once unplugged, the iPod was ready to play.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Revisiting the iPod', href: 'https://paulstamatiou.com/revisiting-the-apple-ipod' },
    },
    {
      slug: 'neovim',
      label: 'Editor',
      title: 'Neovim',
      description: t('O editor da bancada e o plugin que aproxima os resultados da análise de código dos arquivos que preciso revisar.', 'The editor on my workbench and the plugin that brings analysis findings closer to the files under review.'),
      sections: [
        {
          heading: t('Ler um relatório no editor', 'Reading a report in the editor'),
          text: t(
            'Uma análise do CodeQL pode produzir um arquivo SARIF. Nele, cada resultado aponta para uma regra e para um trecho do projeto. Uso o sfer.nvim para ler esse material ao lado do código no Neovim.',
            'A CodeQL analysis can produce a SARIF file. Each finding refers to a rule and a location in the project. I use sfer.nvim to read the report alongside the code in Neovim.',
          ),
        },
        {
          heading: t('Da regra ao arquivo', 'From rule to file'),
          text: t(
            'O plugin organiza regras, resultados e localizações numa barra lateral. Ao expandir uma regra, dá para percorrer os trechos relacionados e escolher qual merece uma leitura mais atenta.',
            'The plugin organizes rules, results and locations in a sidebar. Expanding a rule reveals the related places in the code, so you can choose which one deserves a closer read.',
          ),
        },
      ],
      source: { title: t('sfer.nvim no GitHub', 'sfer.nvim on GitHub'), href: 'https://github.com/fguisso/sfer.nvim' },
    },
    {
      slug: 'leica-m-ev1',
      label: t('Câmera · Paul Stamatiou', 'Camera · Paul Stamatiou'),
      title: 'Leica M EV1',
      description: t('Uma câmera compacta para voltar a fotografar sem fazer de cada saída um ensaio inteiro.', 'A compact camera for taking photographs again, one frame at a time.'),
      image: {
        src: '/preview/stamatiou-leica.webp',
        alt: t('Câmera Leica M EV1', 'Leica M EV1 camera'),
        width: 650, height: 542,
      },
      credit,
      sections: [
        {
          heading: t('Uma foto já basta', 'One photograph is enough'),
          text: t(
            'Ao retomar a fotografia, Paul Stamatiou queria levar menos equipamento e passar menos tempo editando. A Leica M EV1 que ganhou de aniversário entrou nessa rotina com lentes de distância focal fixa da Voigtländer.',
            'When Paul Stamatiou picked up photography again, he wanted to carry less equipment and spend less time editing. The Leica M EV1 he received for his birthday became part of that routine, paired with Voigtländer prime lenses.',
          ),
        },
        {
          heading: t('Onde apoiar o polegar', 'Somewhere to rest a thumb'),
          text: t(
            'Paul achou desconfortável segurar o corpo compacto por muito tempo. Uma empunhadura e um apoio para o polegar mudaram os pontos de contato da mão com a câmera.',
            'A compact body came with a drawback for Paul. He found it uncomfortable to hold for long stretches. A grip and a thumb rest gave his hand better purchase on the camera.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Leica M EV1', href: 'https://paulstamatiou.com/gear/leica-m-ev1' },
    },
    {
      slug: 'casio-fb100w',
      label: t('Relógio · Paul Stamatiou', 'Watch · Paul Stamatiou'),
      title: 'Casio F-B100W',
      description: t('Um relógio digital simples com contador de passos e ajuste de hora pelo celular.', 'A digital watch with a step counter and a clock you can set from your phone.'),
      image: {
        src: '/preview/stamatiou-casio.webp',
        alt: t('Relógio digital Casio F-B100W', 'Casio F-B100W digital watch'),
        width: 650, height: 650,
      },
      credit,
      sections: [
        {
          heading: t('Do F-91W ao F-B100W', 'From the F-91W to the F-B100W'),
          text: t(
            'Paul Stamatiou já usava o F-91W quando experimentou o F-B100W. O novo Casio acrescenta Bluetooth e contagem de passos. A bateria tem duração estimada de dois anos, contra sete no modelo anterior.',
            'Paul Stamatiou had been wearing the F-91W before he tried the F-B100W. The newer Casio adds Bluetooth and step tracking. That changes the battery estimate from seven years on the older model to two on this one.',
          ),
        },
        {
          heading: t('Acertar a hora em viagem', 'Setting the time while traveling'),
          text: t(
            'Para Paul, o melhor motivo para conectar o relógio ao telefone é acertar a hora ao chegar a outro fuso. É uma função pequena, mas poupa ter de lembrar a sequência de botões no pulso.',
            'For Paul, the most useful reason to connect the watch to a phone is to set the time after crossing time zones. It saves him from having to remember the sequence of button presses on the watch.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Casio F-B100W', href: 'https://paulstamatiou.com/gear/casio-fb100w-watch' },
    },
  ];

  return entries.map(entry => ({ ...entry, href: localizedPath('/gear/' + entry.slug + '/', lang) }));
}
