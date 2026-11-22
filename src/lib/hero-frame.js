import { createHash } from 'node:crypto';
import { Color, MeshBasicMaterial, Triangle, Vector3 } from 'three';
import { heroDefaults as settings } from '../data/hero-settings.ts';
import { asciiGrid, shadedGlyph } from '../scripts/hero-ascii.js';
import { createHeroScene } from '../scripts/hero-scene.js';

// Sample the actual animated meshes without a browser or a GPU during the static build.
const material = hex => new MeshBasicMaterial({ color: hex });
const scene = createHeroScene(
  [settings.faceColorA, settings.faceColorB, settings.faceColorC, settings.faceColorD].map(material),
  material(settings.edgeColor), material(settings.ringColor),
);
const key = new Vector3();
scene.configureView(settings, key);
scene.camera.updateMatrixWorld();
const lights = [
  { direction: key, intensity: settings.keyLight, color: new Color(settings.lightColor) },
  { direction: new Vector3(4, -1, -1).normalize(), intensity: settings.rimLight, color: new Color(0xffffff) },
];

function triangleLuminance(color, a, b, c, isRing) {
  const view = a.clone().add(b).add(c).multiplyScalar(-1 / 3).add(scene.camera.position).normalize();
  const normal = Triangle.getNormal(a, b, c, new Vector3());
  if (normal.dot(view) < 0) normal.negate();
  const lit = color.clone().multiplyScalar(settings.fillLight / Math.PI);
  const specular = settings.reflection * (isRing ? 1 : 0.55);
  for (const light of lights) {
    const diffuse = Math.max(0, normal.dot(light.direction)) * light.intensity / Math.PI;
    if (!diffuse) continue;
    const half = light.direction.clone().add(view).normalize();
    const fresnel = specular + (1 - specular) * (1 - Math.max(0, view.dot(half))) ** 5;
    const shine = 0.25 * (settings.gloss * 0.5 + 1) * Math.max(0, normal.dot(half)) ** settings.gloss * fresnel;
    lit.add(color.clone().addScalar(shine).multiply(light.color).multiplyScalar(diffuse));
  }
  lit.convertLinearToSRGB();
  return 0.2126 * Math.min(1, lit.r) + 0.7152 * Math.min(1, lit.g) + 0.0722 * Math.min(1, lit.b);
}

function edge(a, b, x, y) {
  return (x - a.x) * (b.y - a.y) - (y - a.y) * (b.x - a.x);
}

// A depth buffer for each ASCII layer preserves occlusion between moving tiles.
function rasterTriangle(a, b, c, luminance, layer) {
  const { width, height, shades, depths } = layer;
  const area = edge(a, b, c.x, c.y);
  if (Math.abs(area) < 0.00001) return;
  const left = Math.max(0, Math.ceil(Math.min(a.x, b.x, c.x) - 0.5));
  const right = Math.min(width - 1, Math.floor(Math.max(a.x, b.x, c.x) - 0.5));
  const top = Math.max(0, Math.ceil(Math.min(a.y, b.y, c.y) - 0.5));
  const bottom = Math.min(height - 1, Math.floor(Math.max(a.y, b.y, c.y) - 0.5));
  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      const wa = edge(b, c, x + 0.5, y + 0.5) / area;
      const wb = edge(c, a, x + 0.5, y + 0.5) / area;
      const wc = 1 - wa - wb;
      if (Math.min(wa, wb, wc) < 0) continue;
      const depth = wa * a.z + wb * b.z + wc * c.z;
      const pixel = y * width + x;
      if (depth >= depths[pixel]) continue;
      depths[pixel] = depth;
      shades[pixel] = luminance;
    }
  }
}

function rasterMesh(mesh, layer, isRing) {
  const { position } = mesh.geometry.attributes;
  const world = Array.from({ length: position.count }, (_, i) =>
    new Vector3().fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld)
  );
  const screen = world.map(point => {
    const p = point.clone().project(scene.camera);
    return p.set((1 + p.x) * 0.5 * layer.width, (1 - p.y) * 0.5 * layer.height, p.z);
  });
  const indices = mesh.geometry.index.array;
  const groups = Array.isArray(mesh.material) ? mesh.geometry.groups : [{ start: 0, count: indices.length }];
  for (const group of groups) {
    const color = (Array.isArray(mesh.material) ? mesh.material[group.materialIndex] : mesh.material).color;
    for (let i = group.start; i < group.start + group.count; i += 3) {
      const a = indices[i], b = indices[i + 1], c = indices[i + 2];
      const light = triangleLuminance(color, world[a], world[b], world[c], isRing);
      rasterTriangle(screen[a], screen[b], screen[c], light, layer);
    }
  }
}

function glyphLayer(meshes, isRing, size, columns, rows, font, paint) {
  const width = columns * 2;
  const height = rows * 2;
  const shades = new Float32Array(width * height).fill(-1);
  const depths = new Float32Array(width * height).fill(Infinity);
  const layer = { width, height, shades, depths };
  for (const mesh of meshes) rasterMesh(mesh, layer, isRing);

  const ink = isRing ? paint.ringInk : paint.asciiInk;
  const opacity = isRing ? paint.ringOpacity : paint.pyramidOpacity;
  const offset = isRing ? settings.layerOffset : 0;
  const scale = settings.cellSize / font.unitsPerEm;
  const baseline = (font.ascent + font.descent) / 2 * scale;
  const uses = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const origin = 2 * row * width + 2 * col;
      const samples = [shades[origin], shades[origin + 1], shades[origin + width], shades[origin + width + 1]]
        .filter(shade => shade >= 0);
      if (!samples.length) continue;
      const luminance = samples.reduce((sum, value) => sum + value, 0) / samples.length;
      const { character, alpha } = shadedGlyph(paint, luminance, samples.length * 255 / 4, opacity);
      const id = character.codePointAt(0);
      const x = (col + 0.5 + offset) * size / columns;
      const y = (row + 0.5 + offset) * size / rows + baseline;
      uses.push(`<use xlink:href="#hero-glyph-${id}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" opacity="${alpha.toFixed(3)}"/>`);
    }
  }
  // Keep punctuation legible when a social feed downsamples the 1200px card.
  const stroke = 0.9 / scale;
  return `<g fill="${ink}" stroke="${ink}" stroke-width="${stroke}" stroke-linejoin="round">${uses.join('')}</g>`;
}

// Select a real animation frame whose torus still has a readable opening in a thumbnail.
/** @param {string} seed @returns {number} Chosen time on the home animation, in seconds. */
export function poseHeroFrame(seed) {
  const normal = new Vector3();
  const towardCamera = scene.camera.position.clone().normalize();
  const digest = createHash('sha256').update(seed).digest();
  let candidate = digest.readUInt32BE(0);
  let bestOpening = -1;
  let bestTime = 0;
  for (let attempt = 0; attempt < 24; attempt++) {
    const elapsed = candidate / 0x100000000 * 180;
    scene.poseFrame(elapsed, settings);
    // The torus is centered on the sculpture and its normal is local +Z.
    scene.ring.getWorldDirection(normal);
    const opening = Math.abs(normal.dot(towardCamera));
    if (opening >= 0.32) return elapsed;
    if (opening > bestOpening) {
      bestOpening = opening;
      bestTime = elapsed;
    }
    // Full-period 32-bit sequence so rejected poses do not cluster at the threshold.
    candidate = (Math.imul(1664525, candidate) + 1013904223) >>> 0;
  }
  // A future preset might keep the ring edge-on for its entire motion.
  scene.poseFrame(bestTime, settings);
  return bestTime;
}

/** @param {string} seed @param {number} size @param {import('fontkit').Font} inter */
export function renderHeroFrame(seed, size, inter, ink = settings) {
  poseHeroFrame(seed);
  scene.scene.updateMatrixWorld();
  const { columns, rows } = asciiGrid(size, settings);
  const scale = settings.cellSize / inter.unitsPerEm;
  const paint = { ...settings, ...ink };
  const defs = [...new Set('.' + settings.glyphs)].map(char => {
    const glyph = inter.glyphForCodePoint(char.codePointAt(0));
    return `<path id="hero-glyph-${char.codePointAt(0)}" transform="scale(${scale} ${-scale}) translate(${-glyph.advanceWidth / 2} 0)" d="${glyph.path.toSVG()}"/>`;
  });
  return `<defs>${defs.join('')}</defs>`
    + glyphLayer([scene.ring], true, size, columns, rows, inter, paint)
    + glyphLayer(scene.pyramid.children, false, size, columns, rows, inter, paint);
}
