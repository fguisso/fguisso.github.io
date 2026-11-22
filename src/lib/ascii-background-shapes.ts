export interface AsciiCanvas { width: number; height: number; columns: number; rows: number; }
export const asciiCanvas = { width: 324, height: 162, columns: 60, rows: 18 } as const;

export type ShapeKind = 'circle' | 'triangle';
export interface AsciiShape {
  kind: ShapeKind;
  x: number;
  y: number;
  size: number;
  rotation: number;
  fill: number;
  stroke: number;
}

export const asciiBackgroundCompositions = [
  [1, 0], [0, 1],
  [2, 0], [1, 1], [0, 2],
  [2, 1], [1, 2],
] as const satisfies readonly (readonly [triangles: number, circles: number])[];

const glyphs = ' .:-=+*#%@';

export function asciiGlyph(coverage: number): string {
  return glyphs[Math.round(coverage * (glyphs.length - 1))];
}

export function asciiSvg(shapes: string, { width, height }: Pick<AsciiCanvas, 'width' | 'height'> = asciiCanvas): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <g fill="white" stroke="white" stroke-linejoin="round">${shapes}</g>
  </svg>`;
}

export function asciiShape(shape: AsciiShape): string {
  const { kind, x, y, size, rotation, fill, stroke } = shape;
  const paint = `fill-opacity="${fill / 100}" stroke-width="${stroke}"`;
  if (kind === 'circle') return `<circle cx="${x}" cy="${y}" r="${size}" ${paint}/>`;
  return `<polygon transform="translate(${x} ${y}) rotate(${rotation})"
    points="0,${-size} ${size * .87},${size * .5} ${-size * .87},${size * .5}" ${paint}/>`;
}
