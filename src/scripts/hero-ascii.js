export function asciiGrid(width, settings) {
  return {
    columns: Math.max(1, Math.floor(width / (settings.cellSize * 0.69))),
    rows: Math.max(1, Math.floor(width / (settings.cellSize * settings.lineHeight))),
  };
}

export function shadedGlyph(settings, luminance, coverage, opacity) {
  const ramp = settings.glyphs || '.:-=+*#%@';
  const shade = Math.max(0, Math.min(1, 0.5 + (luminance - 0.5) * settings.contrast));
  return {
    character: coverage < 130 ? '.' : ramp[Math.round(shade * (ramp.length - 1))],
    alpha: opacity * (settings.shadeAlphaFloor + (1 - settings.shadeAlphaFloor) * shade),
  };
}
