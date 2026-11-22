import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { create, type Font } from 'fontkit';
import sharp from 'sharp';
import { splitArticleTitle } from './article-title';
import { asciiBackgroundScene, renderAsciiBackground } from './ascii-background';
import { asciiCanvas } from './ascii-background-shapes';
import { renderHeroFrame } from './hero-frame.js';

type SocialCard = {
  title: string;
  seed: string;
  lang: 'pt' | 'en';
} & ({ kind: 'site' } | { kind: 'post'; tags: readonly string[] });

const colors = {
  background: '#101113', ink: '#eeedf2', muted: '#b8bac4', green: '#85efb7',
};
const bentoPalette = {
  green: { surface: '#172522', ink: '#c2f6d8', accent: '#8ee4af', border: '#4f6a5e' },
  purple: { surface: '#2e2b3c', ink: '#cfc6f4', accent: '#b4a3f5', border: '#635e79' },
};
export const articleOgInset = 24;
const articleOgContentScale = (1200 - 2 * articleOgInset) / 1200;
const bentoHeight = (630 - 2 * articleOgInset) / articleOgContentScale;

// CornerCard's desktop OG prototype is 960px wide, scaled here to 1200px.
const bentoScale = 1200 / 960;
const bentoStart = { width: 276, height: 108 };
const bentoEnd = 96;
function bentoOutline(inset = 0) {
  const left = inset;
  const top = inset;
  const right = 1200 - inset;
  const bottom = bentoHeight - inset;
  const radius = 18 * bentoScale - inset;
  const turn = 12 * bentoScale - inset;
  const curve = 20 * bentoScale + inset;
  const startRight = left + bentoStart.width;
  const startBottom = top + bentoStart.height;
  const endLeft = right - bentoEnd;
  const endTop = bottom - bentoEnd;
  const arc = (r: number, sweep: number, x: number, y: number) => `A${r} ${r} 0 0 ${sweep} ${x} ${y}`;
  return [
    `M${startRight + turn} ${top}H${right - radius}`,
    arc(radius, 1, right, top + radius), `V${endTop - turn}`,
    arc(turn, 1, right - turn, endTop), `H${endLeft + curve}`,
    arc(curve, 0, endLeft, endTop + curve), `V${bottom - turn}`,
    arc(turn, 1, endLeft - turn, bottom), `H${left + radius}`,
    arc(radius, 1, left, bottom - radius), `V${startBottom + turn}`,
    arc(turn, 1, left + turn, startBottom), `H${startRight - curve}`,
    arc(curve, 0, startRight, startBottom - curve), `V${top + turn}`,
    arc(turn, 1, startRight + turn, top), 'Z',
  ].join(' ');
}

async function readFont(file: string) {
  const font = create(await readFile(file));
  if (!('layout' in font)) throw new Error('A single typeface is required for social cards');
  return font;
}

async function loadAssets() {
  const publicPath = join(process.cwd(), 'public');
  const [inter, wordmark, avatar] = await Promise.all([
    readFont(join(publicPath, 'fonts/inter.woff2')),
    sharp(join(publicPath, 'style-guide/logo-wordmark.png'))
      .trim({ background: '#00000000' }).resize({ width: 288 }).png().toBuffer(),
    sharp(join(publicPath, 'style-guide/guisso-avatar.webp'))
      .resize(58, 58, { kernel: 'nearest' }).png().toBuffer(),
  ]);
  return { inter, wordmark: wordmark.toString('base64'), avatar: avatar.toString('base64') };
}

let assets: ReturnType<typeof loadAssets>;
let italicFont: Promise<Font>;

// Use the same shaped glyphs for measurement and drawing on every build host.
function textPath(font: Font, text: string, size: number, x: number, baseline: number, fill: string, tracking = 0) {
  const run = font.layout(text);
  let advance = 0;
  const paths = run.glyphs.map((glyph, i) => {
    const pos = run.positions[i];
    const outline = glyph.path.toSVG();
    const path = outline && `<path transform="translate(${advance + pos.xOffset} ${pos.yOffset})" d="${outline}"/>`;
    advance += pos.xAdvance + tracking * font.unitsPerEm;
    return path;
  });
  const scale = size / font.unitsPerEm;
  return `<g fill="${fill}" transform="translate(${x} ${baseline}) scale(${scale} ${-scale})">${paths.join('')}</g>`;
}

function textWidth(font: Font, text: string, size = 1, tracking = 0) {
  const run = font.layout(text);
  return (run.advanceWidth / font.unitsPerEm + Math.max(0, run.glyphs.length - 1) * tracking) * size;
}

function fitTitle(title: string, font: Font, width: number, height: number, maxSize: number, tracking: number) {
  const words = title.trim().split(/\s+/u);
  const measurements = new Map<string, number>();
  function measure(line: string) {
    let width = measurements.get(line);
    if (width === undefined) {
      width = textWidth(font, line, 1, tracking);
      measurements.set(line, width);
    }
    return width;
  }
  function wrap(limit: number) {
    // Minimize raggedness across the whole title, including its last line.
    const costs = new Array<number>(words.length + 1).fill(Infinity);
    const breaks = new Array<number>(words.length);
    costs[words.length] = 0;
    for (let start = words.length - 1; start >= 0; start--) {
      for (let end = start + 1; end <= words.length; end++) {
        const space = limit - measure(words.slice(start, end).join(' '));
        if (space < -0.0001) break;
        // A colon often separates the main title from its subtitle.
        const breakWeight = words[end - 1].endsWith(':') ? 0.15 : 1;
        const cost = breakWeight * space * space + costs[end];
        if (cost < costs[start]) {
          costs[start] = cost;
          breaks[start] = end;
        }
      }
    }
    const lines: string[] = [];
    for (let i = 0; i < words.length; i = breaks[i]) {
      lines.push(words.slice(i, breaks[i]).join(' '));
    }
    return lines;
  }

  // A long identifier must also fit when there is no space to wrap it at.
  let size = Math.min(maxSize, width / Math.max(...words.map(measure), 1));
  for (;;) {
    const lines = wrap(width / size);
    const leading = size * 1.18;
    if (lines.length * leading <= height) return { size, leading, lines };
    size *= 0.94;
  }
}

function articleHeading(title: string, inter: Font, italic: Font, palette: typeof bentoPalette.green) {
  const { prefix, suffix } = splitArticleTitle(title);
  const parts = [
    { text: prefix, font: inter, color: palette.ink, tracking: -.04 },
    { text: suffix, font: italic, color: palette.accent, tracking: -.025 },
  ].filter(part => part.text);
  if (!parts.length) return '';

  const width = 876;
  let size = Math.min(84, ...parts.flatMap(part => part.text.split(/\s+/u).map(word =>
    width / Math.max(1, textWidth(part.font, word, 1, part.tracking)),
  )));

  for (;;) {
    const leading = size * 1.04;
    const lines = parts.flatMap(part =>
      fitTitle(part.text, part.font, width, Infinity, size, part.tracking).lines.map(line => ({ ...part, text: line })),
    );
    const span = (lines.length - 1) * leading;
    if (span + size <= 350) {
      const baseline = (bentoHeight - span) / 2 + size * .31;
      return lines.map(({ font, text, color, tracking }, i) =>
        textPath(font, text, size, 72, baseline + i * leading, color, tracking),
      ).join('');
    }
    size *= .94;
  }
}

function articleTags(tags: readonly string[], font: Font, palette: typeof bentoPalette.green) {
  const labels = tags.filter(tag => tag.trim()).slice(0, 3);
  if (!labels.length) return '';
  const gap = 8;
  const padding = 14;
  const available = 976 - labels.length * padding * 2 - (labels.length - 1) * gap;
  const weight = labels.reduce((sum, label) => sum + textWidth(font, label), 0);
  const size = Math.min(20, available / Math.max(1, weight));
  const y = bentoHeight - 95;
  let x = 72;
  return labels.map(label => {
    const width = textWidth(font, label, size) + padding * 2;
    const tag = `<rect x="${x}" y="${y}" width="${width}" height="35" rx="17.5" fill="${palette.surface}" stroke="${palette.border}"/>
      ${textPath(font, label, size, x + padding, y + 17.5 + size * .32, palette.ink)}`;
    x += width + gap;
    return tag;
  }).join('');
}

function articleArtwork(ascii: string, font: Font, color: string) {
  const artWidth = 1200 * .82;
  const artHeight = artWidth * asciiCanvas.height / asciiCanvas.width;
  const x = 1200 * 1.15 - artWidth; // Match the OG prototype's 15% bleed on the right.
  const y = (bentoHeight - artHeight) / 2;
  const cell = artWidth / asciiCanvas.columns;
  const row = artHeight / asciiCanvas.rows;
  const glyphs = new Map([...new Set(ascii.replace(/\s/g, ''))].map((char, index) => [char, `ascii-${index}`]));
  const symbols = [...glyphs].map(([char, id]) => {
    const size = Math.min(row, cell / textWidth(font, char));
    return `<g id="${id}">${textPath(font, char, size, (cell - textWidth(font, char, size)) / 2, row * .8, color)}</g>`;
  }).join('');
  const cells = ascii.split('\n').map((line, lineIndex) => Array.from(line, (char, column) => {
    const id = glyphs.get(char);
    return id ? `<use xlink:href="#${id}" x="${x + column * cell}" y="${y + lineIndex * row}"/>` : '';
  }).join('')).join('');

  return `<defs>
    ${symbols}
    <linearGradient id="ascii-fade"><stop stop-color="white" stop-opacity="0"/><stop offset=".48" stop-color="white"/><stop offset="1" stop-color="white"/></linearGradient>
    <mask id="ascii-mask" maskUnits="userSpaceOnUse"><rect x="${x}" width="${artWidth}" height="${bentoHeight}" fill="url(#ascii-fade)"/></mask>
  </defs><g opacity=".64" mask="url(#ascii-mask)">${cells}</g>`;
}

async function renderArticleCard(card: Extract<SocialCard, { kind: 'post' }>, shared: Awaited<ReturnType<typeof loadAssets>>) {
  const { inter, wordmark, avatar } = shared;
  const scene = asciiBackgroundScene(card.title);
  const palette = bentoPalette[scene.tone];
  const [ascii, italic] = await Promise.all([
    renderAsciiBackground(scene.shapes),
    italicFont ??= readFont(join(process.cwd(), 'src/lib/assets/gelasio-italic.ttf')),
  ]);
  const avatarX = 1200 - bentoEnd / 2;
  const avatarY = bentoHeight - bentoEnd / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <clipPath id="bento-cutout"><path d="${bentoOutline(bentoScale)}"/></clipPath>
      <clipPath id="avatar"><circle cx="${avatarX}" cy="${avatarY}" r="32"/></clipPath>
    </defs>
    <rect width="1200" height="630" fill="${colors.background}"/>
    <g transform="translate(${articleOgInset} ${articleOgInset}) scale(${articleOgContentScale})">
      <path d="${bentoOutline()}" fill="#2d3037"/>
      <g clip-path="url(#bento-cutout)">
        <rect width="1200" height="${bentoHeight}" fill="${palette.surface}"/>
        ${articleArtwork(ascii, inter, palette.accent)}
        ${articleHeading(card.title, inter, italic, palette)}
        ${articleTags(card.tags, inter, palette)}
      </g>
      <image x="${(bentoStart.width - 188) / 2}" y="${(bentoStart.height - 64) / 2}" width="188" height="64" xlink:href="data:image/png;base64,${wordmark}"/>
      <image x="${avatarX - 32}" y="${avatarY - 32}" width="64" height="64" clip-path="url(#avatar)" xlink:href="data:image/png;base64,${avatar}"/>
    </g>
  </svg>`;
  return sharp(Buffer.from(svg)).png({ palette: true, colours: 200 }).toBuffer();
}

export async function renderSocialCard(card: SocialCard): Promise<Buffer> {
  const shared = await (assets ??= loadAssets());
  if (card.kind === 'post') return renderArticleCard(card, shared);

  const { inter, wordmark, avatar } = shared;
  const english = card.lang === 'en';
  const label = english ? 'A personal corner of the internet' : 'Um canto pessoal da internet';
  const subtitle = english ? 'Software engineering, security and curiosity.' : 'Engenharia de software, segurança e curiosidade.';
  const x = 56;
  const title = fitTitle(card.title, inter, 704, 218, 84, 0);
  const labelSize = Math.min(23, 620 * inter.unitsPerEm / inter.layout(label).advanceWidth);
  const labelBaseline = 270;
  const baseline = 365;
  const titlePaths = title.lines.map((line, i) =>
    textPath(inter, line, title.size, x, baseline + i * title.leading, colors.green)
  ).join('');
  const domain = 'guisso.dev';
  const domainSize = 25;
  const domainWidth = inter.layout(domain).advanceWidth * domainSize / inter.unitsPerEm;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <pattern id="hatch" width="9" height="8" patternUnits="userSpaceOnUse"><path d="M-2 8 6 0m1 8 8-8" stroke="${colors.muted}" stroke-width="2"/></pattern>
      <clipPath id="avatar"><rect x="1090" y="42" width="58" height="58" rx="12"/></clipPath>
    </defs>
    <rect width="1200" height="630" fill="${colors.background}"/>
    <g transform="translate(662 24) scale(2.25)" opacity=".5">${renderHeroFrame(card.seed, 400, inter)}</g>
    <image x="52" y="48" width="144" height="45" xlink:href="data:image/png;base64,${wordmark}"/>
    ${textPath(inter, domain, domainSize, 1071 - domainWidth, 80, colors.ink)}
    <image x="1090" y="42" width="58" height="58" clip-path="url(#avatar)" xlink:href="data:image/png;base64,${avatar}"/>
    <rect x="52" y="134" width="1096" height="6" fill="url(#hatch)" opacity=".52"/>
    <path d="M${x} ${labelBaseline - 3}l7 -12 7 12Z" fill="${colors.green}"/>
    ${textPath(inter, label, labelSize, x + 26, labelBaseline, colors.muted)}
    ${titlePaths}
    ${textPath(inter, subtitle, 28, x, baseline + (title.lines.length - 1) * title.leading + 64, colors.muted)}
  </svg>`;
  return sharp(Buffer.from(svg)).png({ palette: true, colours: 200 }).toBuffer();
}
