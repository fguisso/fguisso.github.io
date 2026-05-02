// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { themeConfig } from './src/theme.config';
import tianjiIntegration from './src/integrations/tianji';

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
	integrations: [
		mdx(),
		sitemap(),
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
	vite: {
		optimizeDeps: {
			include: ['three', 'three/examples/jsm/loaders/GLTFLoader.js'],
		},
	},
});

export { themeConfig };
