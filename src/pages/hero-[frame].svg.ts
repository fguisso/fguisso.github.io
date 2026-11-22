import type { APIRoute } from 'astro';
import { heroInks } from '../data/hero-settings';
import { readFile } from 'node:fs/promises';
import { create } from 'fontkit';
import { renderHeroFrame } from '../lib/hero-frame.js';

export function getStaticPaths() {
  return Object.entries(heroInks).map(([theme, ink]) => ({
    params: { frame: theme === 'escuro' ? 'ascii' : 'ascii-' + theme },
    props: { ink },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const font = create(await readFile('public/fonts/inter.woff2'));
  if (!('layout' in font)) throw new Error('Expected the Inter typeface');
  const size = 305;
  const shapes = renderHeroFrame('home', size, font, props.ink);
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}">${shapes}</svg>`,
    { headers: { 'Content-Type': 'image/svg+xml' } },
  );
};
