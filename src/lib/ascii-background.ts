import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { asciiBackgroundCompositions, asciiCanvas, asciiGlyph, asciiShape, asciiSvg, type AsciiCanvas, type AsciiShape } from './ascii-background-shapes';

export type ArticleArtTone = 'green' | 'purple';
type Composition = (typeof asciiBackgroundCompositions)[number];

export interface AsciiBackgroundScene {
  tone: ArticleArtTone;
  shapes: readonly AsciiShape[];
}

// Leave room between silhouettes as more shapes enter the composition.
const layouts = [
  { size: 48, points: [[199, 81]] },
  { size: 43, points: [[120, 90], [237, 72]] },
  { size: 35, points: [[91, 92], [172, 69], [257, 90]] },
] as const;

export function asciiBackgroundScene(title: string, composition?: Composition): AsciiBackgroundScene {
  const seed = createHash('sha256').update(title.trim().normalize('NFC')).digest();
  const tone = seed[0] % 2 === 0 ? 'green' : 'purple';
  const [triangles, circles] = composition ?? asciiBackgroundCompositions[seed.readUInt16BE(1) % asciiBackgroundCompositions.length];
  const kinds: AsciiShape['kind'][] = [
    ...Array.from({ length: triangles }, () => 'triangle' as const),
    ...Array.from({ length: circles }, () => 'circle' as const),
  ];
  for (let index = kinds.length - 1; index > 0; index--) {
    const swap = seed[3 + index] % (index + 1);
    [kinds[index], kinds[swap]] = [kinds[swap], kinds[index]];
  }

  const { size, points } = layouts[kinds.length - 1];
  const shapes = kinds.map((kind, index): AsciiShape => {
    const [x, y] = points[index];
    const offset = 7 + index * 6;
    const shapeSize = size + seed[offset + 2] % 18;
    const stroke = 4 + seed[offset + 5] % 3;
    const margin = Math.ceil(shapeSize + stroke / 2) + 1;
    return {
      kind,
      x: x + seed[offset] % 17 - 8,
      y: Math.max(margin, Math.min(asciiCanvas.height - margin, y + seed[offset + 1] % 13 - 6)),
      size: shapeSize,
      rotation: kind === 'triangle' ? seed[offset + 3] % 180 - 90 : 0,
      fill: seed[offset + 4] % 2 === 0 ? 0 : 40 + seed[offset + 4] % 31,
      stroke,
    };
  });

  return { tone, shapes };
}

export async function renderAsciiBackground(shapes: readonly AsciiShape[], zoom = 1, canvas: AsciiCanvas = asciiCanvas): Promise<string> {
  const { columns, rows, width, height } = canvas;
  const originX = width / 2;
  const originY = height / 2;
  const artwork = shapes.map(shape => asciiShape(zoom === 1 ? shape : {
    ...shape,
    x: originX + (shape.x - originX) * zoom,
    y: originY + (shape.y - originY) * zoom,
    size: shape.size * zoom,
  })).join('');
  const svg = asciiSvg(artwork, canvas);
  const { data, info } = await sharp(Buffer.from(svg))
    .resize(columns, rows, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Each ASCII cell represents the coverage of one SVG sample.
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, column) => {
      const pixel = (row * columns + column + 1) * info.channels - 1;
      const coverage = data[pixel] / 255;
      return asciiGlyph(coverage);
    }).join('')
  ).join('\n');
}
