# Blog de Fernando Guisso

## Como rodar localmente

```bash
npm ci
npm run dev
```

O Astro exibe no terminal a URL local, normalmente `http://localhost:4321/`.

## Build e testes

```sh
npx playwright install chromium
npm run test:e2e:preview
```

`npm run build` gera o site estático, os feeds, o sitemap e os PNGs de Open Graph em `dist/`. `npm run preview` serve esse build. Os testes de interface usam uma resposta local para o rastreador. Para exercitar a coleta real, rode com `PLAYWRIGHT_TIANJI_LIVE=1`.

## Conteúdo e componentes

- Os artigos ficam em `src/content/blog/`. A dupla `lang` e `canonicalSlug` determina os endereços e conecta as traduções.
- Os guias de estilo em `/style-guide/` e `/en/style-guide/` usam os mesmos componentes das páginas do blog.
- O Bento de Open Graph tem 24 px de respiro em cada lado de um PNG de 1200 × 630. A seed do título define o tom e a composição ASCII, com até três formas entre círculos e triângulos.
- Uses e Life incluem referências editoriais creditadas a Paul Stamatiou, usadas como amostras no laboratório.
