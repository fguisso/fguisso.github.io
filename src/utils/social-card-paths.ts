import type { PostLanguage } from './posts';
import { withBase } from './paths';

export function socialCardKey(lang: PostLanguage, postSlug?: string) {
  if (postSlug) return `${lang}/${postSlug}`;
  return lang === 'en' ? 'blog-default-en' : 'blog-default';
}

export function socialCardPath(lang: PostLanguage, postSlug?: string) {
  return withBase(`/og/${socialCardKey(lang, postSlug)}.png`);
}
