// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { themeConfig } from './src/theme.config';
import tianjiIntegration from './src/integrations/tianji';
import rehypeArticleContent from './src/lib/rehype-article-content.mjs';

const siteEnv = process.env.SITE_URL;
const baseEnv = process.env.PUBLIC_BASE_PATH ?? process.env.BASE_PATH;
const defaultSite = themeConfig.site?.url ?? 'http://localhost:4321/';
const siteUrl = new URL(siteEnv ?? defaultSite);

function normalizeBase(value, fallback = '/') {
	const raw = value ?? fallback ?? '/';
	if (!raw || raw === '/') {
		return '/';
	}

	const cleaned = raw.replace(/^\/|\/$/g, '');
	return cleaned ? `/${cleaned}` : '/';
}

const inferredBase = siteUrl.pathname || '/';
const normalizedBase = normalizeBase(baseEnv, inferredBase);
const siteOrigin = siteUrl.origin;

// https://astro.build/config
export default defineConfig({
	site: siteOrigin,
	base: normalizedBase,
	devToolbar: { enabled: false },
	trailingSlash: 'always',
	integrations: [
		mdx(),
		sitemap({ filter: (url) => !new URL(url).pathname.endsWith('/404/') }),
		tianjiIntegration({
			trackerUrl: 'https://tc.guisso.dev/tracker.js',
			websiteId: 'cmii1ghp20egvjpnvi3fc0asv',
			domains: ['guisso.dev', 'www.guisso.dev', 'localhost', '127.0.0.1'],
			disableInDev: false,
		}),
	],
	i18n: {
		defaultLocale: 'pt',
		locales: ['pt', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	markdown: {
		rehypePlugins: [rehypeArticleContent],
		shikiConfig: {
			themes: { light: 'github-light-high-contrast', dark: 'github-dark' },
			defaultColor: false,
			transformers: [{
				name: 'blog-comment-contrast',
				preprocess(_code, options) {
					const comment = 'var(--muted-on-panel, var(--muted))';
					options.colorReplacements = {
						'github-light-high-contrast': { '#66707b': comment },
						'github-dark': { '#6a737d': comment },
					};
				},
			}],
		},
	},
	vite: {
		optimizeDeps: {
			include: ['three', 'three/examples/jsm/loaders/GLTFLoader.js'],
		},
		plugins: [{
			name: 'astro-generated-image-dev-path',
			apply: 'serve',
			configureServer(server) {
				// Astro 5 applies trailingSlash to dynamic endpoints in development.
				server.middlewares.use((req, _res, next) => {
					const url = req.url;
					if (url?.startsWith(normalizedBase)) {
						const prefix = normalizedBase === '/' ? '' : normalizedBase;
						req.url = prefix + url.slice(prefix.length)
							.replace(/^(\/og\/[^?]*\.png|\/hero-ascii(?:-claro|-areia)?\.svg)(?=\?|$)/, '$1/');
					}
					next();
				});
			},
		}],
	},
});

export { themeConfig };
