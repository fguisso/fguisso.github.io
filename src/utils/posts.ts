import { getCollection } from 'astro:content';
import { localizedPath } from './i18n';

export type PostLanguage = 'pt' | 'en';

export const getPosts = async (lang: PostLanguage = 'pt') => (await getCollection('blog'))
  .filter((post) => post.data.lang === lang)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

export const archiveHref = (lang: PostLanguage = 'pt') => localizedPath('/blog/', lang);
export const postHref = (slug: string, lang: PostLanguage = 'pt') => `${archiveHref(lang)}${slug}/`;
export const postTagHref = (tag: string, lang: PostLanguage = 'pt') => `${archiveHref(lang)}?q=${encodeURIComponent('#' + tag)}`;
export const formatDate = (date: Date, lang: PostLanguage = 'pt') => new Intl.DateTimeFormat(lang === 'en' ? 'en' : 'pt-BR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(date);
export const shortDate = (date: Date, lang: PostLanguage = 'pt') => new Intl.DateTimeFormat(lang === 'en' ? 'en' : 'pt-BR', {
  day: '2-digit', month: 'short', timeZone: 'UTC',
}).format(date);
export const wordCount = (body = '') => body.trim() ? body.trim().split(/\s+/u).length : 0;
export const readingMinutes = (body = '') => Math.max(1, Math.ceil(wordCount(body) / 200));

export async function getPostPaths(lang: PostLanguage) {
  const [posts, translations] = await Promise.all([getPosts(lang), getPosts(lang === 'pt' ? 'en' : 'pt')]);
  const translatedSlugs = new Set(translations.map(({ data }) => data.canonicalSlug));
  return posts.map((post) => ({
    params: { slug: post.data.canonicalSlug },
    props: { post, hasTranslation: translatedSlugs.has(post.data.canonicalSlug) },
  }));
}
