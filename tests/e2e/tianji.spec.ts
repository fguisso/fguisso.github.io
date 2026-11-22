import { test, expect } from '@playwright/test';

test('tianji tracker script loads with correct attrs and requests fire', async ({ page }) => {
	const trackerRequests: string[] = [];

	// Capture and stub tracker.js to avoid external dependency.
	await page.route('https://tc.guisso.dev/tracker.js', (route) => {
		trackerRequests.push(route.request().url());
		return route.fulfill({ status: 200, body: '', contentType: 'application/javascript' });
	});

	await page.goto('/');
	await page.waitForLoadState('networkidle');

	// Request to tracker.js was made.
	expect(trackerRequests.some((url) => url.includes('tc.guisso.dev/tracker.js'))).toBe(true);

	// Script tag is present with the expected attributes.
	const script = page.locator('script[src="https://tc.guisso.dev/tracker.js"]');
	await expect(script).toHaveAttribute('data-website-id', 'cmii1ghp20egvjpnvi3fc0asv');
	await expect(script).toHaveAttribute('data-domains', 'guisso.dev,www.guisso.dev,localhost,127.0.0.1');
});
