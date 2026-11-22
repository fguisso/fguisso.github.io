import { test, expect } from '@playwright/test';

test.skip(process.env.PLAYWRIGHT_TIANJI_LIVE !== '1', 'Enable explicitly to send live analytics events.');

test('tianji sends a live pageview event after loading', async ({ page }) => {
	const beaconRequests: string[] = [];

	await page.route('https://tc.guisso.dev/**', (route) => {
		const url = route.request().url();
		if (!url.endsWith('tracker.js')) {
			beaconRequests.push(url);
		}
		return route.continue();
	});

	await page.goto('/', { waitUntil: 'networkidle' });

	// Force an explicit event to ensure the pipeline is exercised even if auto-track is suppressed.
	await page.evaluate(async () => {
		if (window.tianji?.track) {
			await window.tianji.track('playwright-live-test', { source: 'e2e' });
		}
	});

	// Give the tracker time to emit the beacon (sendBeacon/fetch).
	await page.waitForTimeout(4000);

	expect(beaconRequests.length).toBeGreaterThan(0);
	const pageviewLike = beaconRequests.find((url) => /(event|collect|page|send)/i.test(url));
	expect(pageviewLike).toBeTruthy();
});
