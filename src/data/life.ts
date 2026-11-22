import type { EditorialArticle } from './editorial';
import { localizedPath } from '../utils/i18n';
import { postHref, type PostLanguage } from '../utils/posts';

export interface LifeEntry extends EditorialArticle {
  captured?: string;
}

export function getLife(lang: PostLanguage): LifeEntry[] {
  const t = (pt: string, en: string) => lang === 'en' ? en : pt;
  const credit = t('Foto de Paul Stamatiou', 'Photo by Paul Stamatiou');
  const album = t('Álbum · Paul Stamatiou', 'Photo essay · Paul Stamatiou');
  const entries: Omit<LifeEntry, 'href'>[] = [
    {
      slug: 'networking-events',
      label: t('Comunidade', 'Community'),
      title: t('Encontros de tecnologia', 'Tech meetups'),
      description: t('Uma conversa sobre Terraform que começou com um jeito diferente de trocar contatos.', 'A conversation about Terraform that began with an unusual way to swap contact details.'),
      sections: [
        {
          heading: t('Um cartão de visitas debaixo da pele', 'A business card under the skin'),
          text: t(
            'Uso um biochip que guarda meus dados de contato. Em um evento, a curiosidade sobre ele rendeu uma conversa com o Field CTO da HashiCorp. Começamos falando do chip e acabamos discutindo as mudanças na licença do Terraform.',
            'I keep my contact details on a biochip. At one event it caught the attention of HashiCorp’s Field CTO. We started out talking about the chip and ended up discussing the changes to Terraform’s license.',
          ),
        },
        {
          heading: t('Deixar um intervalo na agenda', 'Leaving a gap in the schedule'),
          text: t(
            'Na H2HC, dá para preencher o dia inteiro só com palestras. Gosto de escolher algumas com antecedência e deixar tempo para conversar depois. Às vezes, a pergunta que alguém faz ao sair da sala rende assunto para o resto do intervalo.',
            'At H2HC, talks alone could fill the whole day. I like to pick a few in advance and leave time afterward to talk. Sometimes a question someone asks on the way out of the room carries a conversation through the break.',
          ),
        },
      ],
      source: { title: t('Networking e carreira em eventos tech', 'Networking and careers at tech events (Portuguese)'), href: postHref('networking-events', 'pt') },
    },
    {
      slug: 'the-leica-reset',
      label: t('Fotografia · Paul Stamatiou', 'Photography · Paul Stamatiou'),
      title: t('De volta à fotografia', 'The Leica reset'),
      description: t('Com uma Leica M EV1 nas mãos, Paul Stamatiou repensa o trabalho que uma única foto precisa dar.', 'Picking up a Leica M EV1 gave Paul Stamatiou a chance to reconsider how much work one photograph should take.'),
      image: {
        src: '/preview/stamatiou-leica.webp',
        alt: t('Câmera Leica M EV1', 'Leica M EV1 camera'),
        width: 650, height: 542,
      },
      credit,
      sections: [
        {
          heading: t('A viagem depois da viagem', 'The trip after the trip'),
          text: t(
            'Durante anos, uma viagem de Paul podia render meses de edição no Lightroom. Cada álbum ainda ganhava um site feito sob medida. Quando voltou a viajar depois da pandemia, o celular acabou sendo a câmera que ele tinha vontade de levar.',
            'For years, a trip could leave Paul with months of Lightroom edits. He would then build a website for the finished album. When he started traveling again after the pandemic, his phone was the camera he felt like taking along.',
          ),
        },
        {
          heading: t('Uma foto por vez', 'One frame at a time'),
          text: t(
            'A M EV1 veio de presente de aniversário. Com ela, Paul retomou o foco manual e se deu a liberdade de publicar uma foto avulsa. A caminhada que rende uma imagem já tem um fim, sem precisar esperar o próximo álbum.',
            'The M EV1 was a birthday gift. With it, Paul returned to manual focus and gave himself room to share individual pictures. A walk that yields a single frame can end there, without waiting for the next album.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · The Leica reset', href: 'https://paulstamatiou.com/the-leica-reset' },
    },
    {
      slug: 'amsterdam',
      label: album,
      title: 'Amsterdam',
      description: t('Os canais de Amsterdam em duas visitas de Paul Stamatiou, separadas por seis meses.', 'Six months apart, two visits gave Paul Stamatiou two views of Amsterdam’s canals.'),
      captured: '2018-09',
      image: {
        src: '/preview/stamatiou-amsterdam.webp',
        alt: t('Barcos atracados nas duas margens de um canal arborizado, com uma torre ao fundo', 'Boats moored along a tree-lined canal with a tower in the distance'),
        width: 900, height: 587,
      },
      credit,
      sections: [
        {
          heading: t('Março, com os canais congelados', 'March, when the canals froze'),
          photo: {
            src: '/preview/stamatiou-amsterdam-frozen-canal.webp',
            alt: t('Barcos atracados num canal coberto por placas de gelo, com uma torre ao fundo', 'Moored boats line a canal covered in broken ice, with a tower in the distance'),
            width: 1000, height: 667,
            caption: t('Gelo no canal durante a visita de março de 2018.', 'Ice on the canal during the March 2018 visit.'),
          },
          text: t(
            'Na volta de uma viagem à África, Paul passou dois dias em Amsterdam. Chegou logo depois de os canais congelarem e percorreu o centro a pé. O frio mudou a paisagem, mas as bicicletas continuaram disputando espaço nas ruas estreitas.',
            'Paul spent two days in Amsterdam on his way home from Africa. The canals had just frozen, and he explored the center on foot. The cold changed the view from the bridges, while cyclists still filled the narrow streets.',
          ),
        },
        {
          heading: t('Setembro, à beira do rio Zaan', 'September on the River Zaan'),
          photo: {
            src: '/preview/stamatiou-amsterdam-zaanse-schans.webp',
            alt: t('Uma fileira de moinhos de vento e casas de telhado vermelho à beira do rio', 'A row of windmills and red-roofed houses along the riverbank'),
            width: 1000, height: 683,
            caption: t('Zaanse Schans, em um passeio fora de Amsterdam em setembro de 2018.', 'Zaanse Schans, on a day trip from Amsterdam in September 2018.'),
          },
          text: t(
            'A conferência de design Framer Loupe trouxe Paul de volta no começo do outono. Em um dos dias, ele saiu da cidade para conhecer Zaanse Schans. A água volta à foto, agora com moinhos de vento recortados contra o céu na margem do Zaan.',
            'The Framer Loupe design conference brought Paul back in early autumn. One day he headed out of town to Zaanse Schans. Water fills the foreground again, this time with the windmills silhouetted against the sky on the banks of the Zaan.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Amsterdam', href: 'https://paulstamatiou.com/photos/amsterdam' },
    },
    {
      slug: 'africa',
      label: album,
      title: t('África', 'Africa'),
      description: t('Duas semanas entre as montanhas de Ruanda e as planícies do Serengeti, na Tanzânia.', 'Two weeks between Rwanda’s mountains and Tanzania’s Serengeti plains.'),
      captured: '2018-02',
      image: {
        src: '/preview/stamatiou-africa.webp',
        alt: t('Um leopardo olha entre os galhos de uma árvore no Serengeti', 'A leopard peers between tree branches in the Serengeti'),
        width: 850, height: 850,
      },
      credit,
      sections: [
        {
          heading: t('Na trilha dos gorilas', 'On the gorilla trail'),
          text: t(
            'O grupo de Paul saiu de Kigali rumo ao Parque Nacional dos Vulcões. Na primeira caminhada, os guias acompanharam pelo rádio a localização de uma família de gorilas. O encontro só começou depois de uma espera na encosta.',
            'Paul’s group traveled from Kigali to Volcanoes National Park. On their first hike, the guides stayed in radio contact with trackers looking for a gorilla family. The group waited on the mountainside for word to go ahead.',
          ),
        },
        {
          heading: t('Entre os galhos no Serengeti', 'Among the branches in the Serengeti'),
          text: t(
            'Na Tanzânia, o grupo percorreu de carro o sul e o norte do Serengeti. A foto de capa pede um segundo olhar. Primeiro aparece o tronco da árvore, depois o focinho do leopardo e as manchas que quase se confundem com a casca.',
            'In Tanzania the group traveled through the southern and northern Serengeti by vehicle. The cover rewards a second look. The trunk catches the eye first, then the leopard’s muzzle and the spots that almost disappear against the bark.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Africa', href: 'https://paulstamatiou.com/photos/africa' },
    },
    {
      slug: 'grand-cayman-island',
      label: album,
      title: t('Ilhas Cayman', 'Cayman Islands'),
      description: t('Seis noites em Grand Cayman, entre um passeio de barco, mergulhos e os primeiros voos de um pequeno drone em viagem.', 'Six nights on Grand Cayman, with time for snorkeling, a boat trip and the first flights of a small travel drone abroad.'),
      captured: '2017-11',
      image: {
        src: '/preview/stamatiou-cayman.webp',
        alt: t('Um barco branco visto de cima em águas azul-turquesa', 'A white boat seen from above in turquoise water'),
        width: 850, height: 479,
      },
      credit,
      sections: [
        {
          heading: t('A ilha vista de cima', 'The island from above'),
          text: t(
            'Paul visitou Grand Cayman com a família no feriado de Ação de Graças de 2017. Era a primeira vez que levava seu drone para fora do país. Na vista aérea, o barco vira um pequeno ponto branco e fica fácil distinguir as manchas escuras sob a água.',
            'Paul visited Grand Cayman with his family over Thanksgiving in 2017. It was his first time taking a drone abroad. From overhead, the boat shrinks to a white speck and dark patches beneath the water come into view.',
          ),
        },
        {
          heading: t('Duas visitas a Rum Point', 'Twice around Rum Point'),
          text: t(
            'A primeira parada em Rum Point aconteceu num dia chuvoso. No último dia, a família voltou de barco e com tempo bom. Dessa vez deu para mergulhar e seguir até as águas rasas de Starfish Point e Stingray City.',
            'The family first stopped at Rum Point on a rainy day. On their last day they came back by boat in better weather, snorkeled nearby and continued to the shallows at Starfish Point and Stingray City.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Cayman Islands', href: 'https://paulstamatiou.com/photos/grand-cayman-island' },
    },
    {
      slug: 'two-weeks-in-greece',
      label: album,
      title: t('Grécia', 'Greece'),
      description: t('Quatro ilhas e uma passagem por Atenas no reencontro de Paul Stamatiou com a Grécia.', 'Four islands and a stop in Athens on Paul Stamatiou’s return to Greece.'),
      captured: '2014-09',
      image: {
        src: '/preview/stamatiou-greece.webp',
        alt: t('Espreguiçadeiras e guarda-sóis à beira-mar vistos através de um arco branco', 'Sun loungers and beach umbrellas by the sea, framed by a white arch'),
        width: 650, height: 455,
      },
      credit,
      sections: [
        {
          heading: t('De volta depois de dez anos', 'Returning after ten years'),
          text: t(
            'Paul conhecia a Grécia das férias da infância. Em 2014 voltou depois de uma década e organizou as fotos por lugar. Creta abre o percurso, seguida por Paros, Naxos e Folegandros. Atenas fecha o álbum.',
            'Paul knew Greece from childhood vacations. He returned in 2014 after a decade away and arranged the photographs by place. Crete opens the journey, followed by Paros, Naxos and Folegandros. Athens closes the album.',
          ),
        },
        {
          heading: t('Desembarque antes do amanhecer', 'Coming ashore before dawn'),
          text: t(
            'O vento atrasou a balsa que saía de Naxos, e Paul chegou a Folegandros perto das quatro da manhã. Mais tarde, em Chora, subiu o caminho em zigue-zague até a igreja de Panagia para ver a vila do alto.',
            'High winds delayed the ferry from Naxos. Paul reached Folegandros close to four in the morning. Later, in Chora, he walked the switchbacks up to the church of Panagia for a view over the village.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Greece', href: 'https://paulstamatiou.com/photos/greece/two-weeks-in-greece' },
    },
    {
      slug: 'two-weeks-in-japan',
      label: album,
      title: t('Japão', 'Japan'),
      description: t('Um diário fotográfico de duas semanas, dos bairros de Tóquio aos templos de Quioto.', 'A two-week photographic diary from Tokyo’s neighborhoods to the temples of Kyoto.'),
      captured: '2013-11',
      image: {
        src: '/preview/stamatiou-japan.webp',
        alt: t('O Pavilhão Dourado de Quioto refletido no lago entre as árvores', 'Kyoto’s Golden Pavilion reflected in a pond among the trees'),
        width: 650, height: 434,
      },
      credit,
      sections: [
        {
          heading: t('O caminho pelo bambuzal', 'The path through the bamboo'),
          text: t(
            'O diário de Paul acompanha a viagem dia a dia. Depois de explorar Tóquio e passar por Hakone, ele foi a Quioto. Num dos passeios, reuniu numa mesma sequência o bambuzal de Arashiyama, o santuário Fushimi Inari e o templo Kiyomizu-dera.',
            'Paul kept a day-by-day record. After exploring Tokyo and visiting Hakone, he traveled to Kyoto. One day’s sequence links the bamboo grove at Arashiyama with Fushimi Inari shrine and Kiyomizu-dera temple.',
          ),
        },
        {
          heading: t('O pavilhão à beira do lago', 'The pavilion beside the pond'),
          text: t(
            'No nono dia, uma viagem de ônibus levou Paul ao Kinkaku-ji. A luz no dourado do pavilhão reaparece na água logo abaixo. Ainda naquela tarde, ele já estava no trem-bala para Hiroshima.',
            'On day nine, a bus took Paul to Kinkaku-ji. The light on the gold pavilion shows up again in the pond below it. That same afternoon he was on the bullet train to Hiroshima.',
          ),
        },
      ],
      source: { title: 'Paul Stamatiou · Japan', href: 'https://paulstamatiou.com/photos/japan/two-weeks-in-japan' },
    },
  ];

  return entries.map(entry => ({ ...entry, href: localizedPath('/life/' + entry.slug + '/', lang) }));
}
