import { test, expect } from '@playwright/test';

test('home renders hero and latest posts', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/guisso\.dev/i);
	await expect(page.getByRole('heading', { level: 1, name: 'Fernando Guisso', exact: true })).toBeVisible();
	await expect(page.getByText('Um canto pessoal da internet', { exact: true })).toBeVisible();
	await expect(page.locator('.alt-intro .intro-bio')).toHaveCount(2);
	await expect(page.locator('[data-hero-canvas]')).toBeVisible();
	await expect(page.getByRole('heading', { level: 2, name: 'Últimos posts' })).toBeVisible();
	const latestPosts = page.getByRole('region', { name: 'Publicações' }).getByRole('link');
	await expect(latestPosts).toHaveCount(3);
	const featured = page.locator('a.featured-story');
	const latestTitle = await latestPosts.first().locator('.row-title').innerText();
	await expect(featured.locator('.featured-art').getByRole('heading', { level: 2 })).toHaveText(latestTitle);
	await expect(page.getByRole('link', { name: 'Abrir todos os posts' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Projetos' }).getByRole('link')).toHaveCount(4);
	await expect(page.locator('.site-nav a[href="/gear/"], .site-nav a[href="/life/"]')).toHaveCount(0);
});
