import { test, expect, type Page } from '@playwright/test';

async function captureTianji(page: Page) {
	const events: string[] = [];
	await page.route('https://tc.guisso.dev/tracker.js', (route) => route.fulfill({
		contentType: 'application/javascript',
		body: `document.addEventListener('click', (event) => {
			const item = event.target.closest('[data-tianji-event]');
			if (item) fetch('https://tc.guisso.dev/api/website/send', {
				method: 'POST',
				body: JSON.stringify({ name: item.dataset.tianjiEvent }),
				keepalive: true,
			});
		});`,
	}));
	await page.route('https://tc.guisso.dev/api/website/send', async (route) => {
		events.push(route.request().postDataJSON().name);
		await route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' } });
	});
	return events;
}

test('a project click emits click_project', async ({ page }) => {
	const events = await captureTianji(page);
	await page.goto('/');
	const project = page.getByRole('link', { name: /Projeto sfer.nvim/ });
	await project.evaluate((element) => element.addEventListener('click', (event) => event.preventDefault(), { once: true }));
	await project.click();
	await expect.poll(() => events).toContain('click_project_sfer-nvim_pt');
});

test('the bio buttons emit photo download and copy events', async ({ page }) => {
	const events = await captureTianji(page);
	await page.goto('/about/');
	const download = page.getByRole('link', { name: /Baixar foto/ });
	await download.evaluate((element) => element.addEventListener('click', (event) => event.preventDefault(), { once: true }));
	await download.click();
	await page.getByRole('button', { name: 'Copiar bio' }).click();
	await expect.poll(() => events).toEqual(['download_bio_photo_pt', 'copy_bio_text_pt']);
});

test('talk links emit repository and resource events', async ({ page }) => {
	const events = await captureTianji(page);
	await page.goto('/talk/');
	const repo = page.getByRole('link', { name: 'Ver repositório' });
	const article = page.locator('.talk-article').first();
	for (const link of [repo, article]) {
		await link.evaluate((element) => element.addEventListener('click', (event) => event.preventDefault(), { once: true }));
		await link.click();
	}
	await expect.poll(() => events.some((name) => name.startsWith('click_talk_repo_'))).toBe(true);
	await expect.poll(() => events.some((name) => name.startsWith('click_talk_resource_'))).toBe(true);
});

test('a social link emits an outbound event', async ({ page }) => {
	const events = await captureTianji(page);
	await page.goto('/');
	const marquee = page.getByRole('navigation', { name: 'Redes sociais' });
	await marquee.getByRole('button', { name: 'Pausar movimento das redes sociais' }).click();
	const social = marquee.getByRole('link', { name: 'GitHub' });
	await social.evaluate((element) => element.addEventListener('click', (event) => event.preventDefault(), { once: true }));
	await social.click();
	await expect.poll(() => events).toContain('outbound_link_github_pt');
});
