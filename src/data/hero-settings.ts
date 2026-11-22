// These inks paint the characters after lighting has selected each glyph.
export const heroInks = {
  escuro: { asciiInk: '#85efb7', ringInk: '#b4a3f5', pyramidOpacity: 0.85, ringOpacity: 0.65, shadeAlphaFloor: 0.62 },
  claro: { asciiInk: '#0d472d', ringInk: '#4b2d79', pyramidOpacity: 0.97, ringOpacity: 0.94, shadeAlphaFloor: 0.8 },
  areia: { asciiInk: '#174832', ringInk: '#503368', pyramidOpacity: 0.97, ringOpacity: 0.94, shadeAlphaFloor: 0.8 },
};

export const heroDefaults = {
  ...heroInks.escuro,
  glyphs: ".:-=+*#%@_;'",
  cellSize: 10,
  lineHeight: 1,
  contrast: 1,
  layerOffset: 0.34,
  faceColorA: '#85efb7',
  faceColorB: '#b4a3f5',
  faceColorC: '#6e66a4',
  faceColorD: '#41c380',
  edgeColor: '#514766',
  ringColor: '#b4a3f5',
  lightColor: '#ffffff',
  keyLight: 2.2,
  fillLight: 0.75,
  rimLight: 0.8,
  azimuth: -32,
  elevation: 33,
  reflection: 0.85,
  gloss: 48,
  play: true,
  speed: 1,
  zoom: 1,
  cameraTilt: 0,
  angle: 0,
  ringTilt: 53,
  ringScale: 1,
  twist: true,
  sway: true,
  showPyramid: true,
  showRing: true,
};

export type HeroSettings = typeof heroDefaults;
