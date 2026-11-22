import type { APIRoute, InferGetStaticParamsType, InferGetStaticPropsType } from 'astro';
import { renderSocialCard } from '../../lib/social-card';
import { getPosts } from '../../utils/posts';
import { socialCardKey } from '../../utils/social-card-paths';

export async function getStaticPaths() {
  const languages = ['pt', 'en'] as const;
  const paths = await Promise.all(languages.map(async (lang) => {
    const posts = await getPosts(lang);
    return [
      ...[socialCardKey(lang), `${lang}/blog-default`].map((card) => ({
        params: { card },
        props: { kind: 'site' as const, lang, title: 'Fernando Guisso' },
      })),
      ...posts.map(({ data }) => ({
        params: { card: socialCardKey(lang, data.canonicalSlug) },
        props: {
          kind: 'post' as const,
          lang,
          title: data.title,
          tags: data.tags,
        },
      })),
    ];
  }));
  return paths.flat();
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = async ({ props, params }) => {
  const seed = props.kind === 'site' ? socialCardKey(props.lang) : params.card;
  const png = await renderSocialCard({ ...props, seed });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
