import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const dir = '/Users/guisso/Documents/fguisso.github.io/src/content/blog/phone-phreaking';
const files = await readdir(dir);
const targets = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f) && f.startsWith('box-'));

for (const f of targets) {
	const full = join(dir, f);
	const before = (await stat(full)).size;
	if (before < 800_000) {
		console.log(`SKIP ${f} (${(before/1024).toFixed(0)} KB, already small)`);
		continue;
	}
	const tmp = full + '.tmp';
	const isPng = f.toLowerCase().endsWith('.png');
	const pipeline = sharp(full).resize({ width: 1600, withoutEnlargement: true });
	if (isPng) {
		await pipeline.jpeg({ quality: 84, mozjpeg: true }).toFile(tmp);
	} else {
		await pipeline.jpeg({ quality: 84, mozjpeg: true }).toFile(tmp);
	}
	const after = (await stat(tmp)).size;
	const out = isPng ? full.replace(/\.png$/i, '.jpg') : full;
	await sharp(tmp).toFile(out + '.opt');
	console.log(`${f}: ${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB`);
}
