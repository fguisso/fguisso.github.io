import { test, expect } from '@playwright/test';

test('assets and tracker requests are issued', async ({ page }) => {
	const requests: string[] = [];

	// Stub the analytics script to keep tests deterministic/offline.
	await page.route('https://tc.guisso.dev/tracker.js', (route) =>
		route.fulfill({ status: 200, body: '', contentType: 'application/javascript' }),
	);

	page.on('request', (req) => {
		requests.push(req.url());
	});

	await page.goto('/');
	await page.waitForLoadState('networkidle');

	const jsAsset = requests.find((url) => /\/_astro\/.*\.js(\?|$)/.test(url));
	const cssAsset = requests.find((url) => /\/_astro\/.*\.css(\?|$)/.test(url));
	// Hashed filenames are expected (e.g., /_astro/index.XYZ123.js); adjust the regex if the output dir changes.
	expect(jsAsset).toBeTruthy();
	expect(cssAsset).toBeTruthy();

	const trackerRequest = requests.find((url) => url.includes('tc.guisso.dev/tracker.js'));
	expect(trackerRequest).toBeTruthy();

	const fontRequest = requests.find((url) => url.endsWith('/fonts/inter.woff2'));
	expect(fontRequest).toBeTruthy();
});
