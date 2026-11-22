import { test, expect } from '@playwright/test';

test('user can open the archive and filter the original articles', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Abrir todos os posts' }).click();
	await expect(page).toHaveURL(/\/blog\/$/);
	await expect(page.getByRole('heading', { level: 1, name: 'Artigos' })).toBeVisible();

	await page.getByRole('searchbox', { name: 'Buscar artigos' }).fill('explorable explanations');
	const article = page.getByRole('link', { name: /^Explorable Explanations/ });
	await expect(article).toBeVisible();
	await article.click();
	await expect(page.getByRole('heading', { level: 1, name: 'Explorable Explanations' })).toBeVisible();

	await page.locator('.nav-locale summary').click();
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page).toHaveURL(/\/en\/blog\/explorable-explanations-infoviz\/$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('both style guides show article cards backed by generated PNGs', async ({ page, request }) => {
	for (const url of ['/style-guide/', '/en/style-guide/']) {
		await page.goto(url);
		await expect(page.locator('.header-variant')).toHaveCount(4);
		const images = await page.locator('.og-list img').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('src')));
		expect(images).toHaveLength(2);
		for (const image of images) {
			expect(image).toBeTruthy();
			const response = await request.get(image!);
			expect(response.ok()).toBe(true);
			expect(response.headers()['content-type']).toContain('image/png');
		}
	}
});
