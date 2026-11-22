import { test, expect } from '@playwright/test';

test('home renders hero and latest posts', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/guisso\.dev/i);
	await expect(page.getByRole('heading', { level: 1, name: 'Fernando Guisso', exact: true })).toBeVisible();
	await expect(page.getByText('Um canto pessoal da internet', { exact: true })).toBeVisible();
	await expect(page.locator('.alt-intro .intro-bio')).toHaveCount(2);
	await expect(page.locator('[data-hero-canvas]')).toBeVisible();
	await expect(page.getByRole('heading', { level: 2, name: 'Últimos posts' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Publicações' }).getByRole('link')).toHaveCount(3);
	await expect(page.getByRole('link', { name: 'Abrir todos os posts' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Uses' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Life' })).toBeVisible();
});
