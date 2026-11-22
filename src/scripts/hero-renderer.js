import { AmbientLight, DirectionalLight, DoubleSide, MeshPhongMaterial, Vector2, WebGLRenderer } from 'three';
import { createHeroScene } from './hero-scene.js';
import { asciiGrid, shadedGlyph } from './hero-ascii.js';

const easeInOut = (progress) => (1 - Math.cos(Math.PI * progress)) / 2;
const pushOutDuration = 0.9;
const pushReturnDuration = 1.5;
const tapSlop = 10;

/**
 * @param {HTMLElement} stage
 * @param {import('../data/hero-settings').HeroSettings} initial
 */
export function mountHeroRenderer(stage, initial) {
  const source = stage.querySelector('[data-scene-webgl]');
  const output = stage.querySelector('[data-scene-output]');
  const display = output.getContext('2d');
  const sample = document.createElement('canvas');
  const sampler = sample.getContext('2d', { willReadFrequently: true });
  if (!display || !sampler) throw new Error('Canvas 2D unavailable');

  const renderer = new WebGLRenderer({ canvas: source, alpha: true, antialias: true });
  const lit = Array.from({ length: 6 }, (_, index) => new MeshPhongMaterial({
    side: DoubleSide, flatShading: index < 5,
  }));
  const { scene, camera, sculpture, pyramid, ring, configureView, poseFrame } = createHeroScene(lit.slice(0, 4), lit[4], lit[5]);
  const key = new DirectionalLight(0xffffff);
  const fill = new AmbientLight(0xffffff);
  const rim = new DirectionalLight(0xffffff);
  rim.position.set(4, -1, -1);
  scene.add(key, fill, rim);

  let settings = initial;
  let elapsed = 0;
  let lastFrame = 0;
  let visible = false;
  let running = false;
  let lost = false;
  let width = 1;
  let cellWidth = 1;
  let cellHeight = 1;
  let touchPointerId = null;
  let press = null;
  let push = null;
  let pushOffset = 0;
  const pointer = new Vector2();
  const pointerTarget = new Vector2();

  function applySceneSettings() {
    const colors = [
      settings.faceColorA, settings.faceColorB, settings.faceColorC,
      settings.faceColorD, settings.edgeColor, settings.ringColor,
    ];
    for (const [index, material] of lit.entries()) {
      material.color.set(colors[index]);
      material.specular.setScalar(settings.reflection * (index === 5 ? 1 : 0.55));
      material.shininess = settings.gloss;
    }
    configureView(settings, key.position);
    key.color.set(settings.lightColor);
    key.intensity = settings.keyLight;
    fill.intensity = settings.fillLight;
    rim.intensity = settings.rimLight;
  }

  function drawCharacters(isRing) {
    const { width: columns, height: rows } = sample;
    sampler.imageSmoothingEnabled = true;
    sampler.clearRect(0, 0, columns, rows);
    sampler.drawImage(source, 0, 0, columns, rows);
    const { data } = sampler.getImageData(0, 0, columns, rows);
    const opacity = isRing ? settings.ringOpacity : settings.pyramidOpacity;
    const offset = isRing ? settings.layerOffset : 0;

    display.fillStyle = isRing ? settings.ringInk : settings.asciiInk;
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = 4 * (row * columns + column);
        const coverage = data[index + 3];
        if (coverage < 40) continue;
        const red = data[index], green = data[index + 1], blue = data[index + 2];
        const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
        const { character, alpha } = shadedGlyph(settings, luminance, coverage, opacity);
        display.globalAlpha = alpha;
        display.fillText(character, (column + 0.5 + offset) * cellWidth, (row + 0.5 + offset) * cellHeight);
      }
    }
  }

  function draw() {
    if (lost) return;
    poseFrame(elapsed, settings);
    sculpture.position.x = pushOffset * 0.46;
    ring.rotation.x += pointer.y * 0.22;
    ring.rotation.y -= pointer.x * 0.19 + pushOffset * 0.29;
    ring.position.set(pointer.x * 0.15, -pointer.y * 0.1, 0);
    pyramid.rotation.x += pointer.y * 0.15;
    pyramid.rotation.y += pointer.x * 0.24 + pushOffset * 0.37;

    display.clearRect(0, 0, width, width);
    pyramid.visible = false;
    ring.visible = settings.showRing;
    if (ring.visible) {
      renderer.render(scene, camera);
      drawCharacters(true);
    }
    ring.visible = false;
    pyramid.visible = settings.showPyramid;
    if (pyramid.visible) {
      renderer.render(scene, camera);
      drawCharacters(false);
    }
  }

  function resize() {
    width = Math.max(1, stage.clientWidth);
    output.hidden = false;
    stage.dataset.mode = 'ascii';
    renderer.setPixelRatio(1);
    const { columns, rows } = asciiGrid(width, settings);
    sample.width = columns;
    sample.height = rows;
    cellWidth = width / sample.width;
    cellHeight = width / sample.height;
    const density = Math.min(devicePixelRatio, 2);
    output.width = output.height = Math.round(width * density);
    display.setTransform(density, 0, 0, density, 0, 0);
    display.font = settings.cellSize + 'px ' + getComputedStyle(stage).getPropertyValue('--sans').trim();
    display.textAlign = 'center';
    display.textBaseline = 'middle';
    const buffer = 2 * Math.max(sample.width, sample.height);
    renderer.setSize(buffer, buffer, false);
    draw();
    if (!lost) stage.dataset.ready = '';
  }

  function animate(now) {
    const delta = now - lastFrame;
    if (delta < 32) return;
    if (lastFrame) {
      const seconds = Math.min(delta, 80) / 1000;
      elapsed += seconds * settings.speed;
      const response = touchPointerId === null ? 9 : 16;
      pointer.lerp(pointerTarget, 1 - Math.exp(-response * seconds));
      advancePush(seconds);
    }
    lastFrame = now;
    draw();
  }

  function advancePush(seconds) {
    if (!push) return;
    push.elapsed += seconds;
    if (push.elapsed < pushOutDuration) {
      const progress = easeInOut(push.elapsed / pushOutDuration);
      pushOffset = push.from + (push.direction - push.from) * progress;
      return;
    }

    const progress = Math.min(1, (push.elapsed - pushOutDuration) / pushReturnDuration);
    pushOffset = push.direction * (1 - easeInOut(progress));
    if (progress === 1) push = null;
  }

  function syncLoop() {
    const next = visible && settings.play && settings.speed > 0 && !lost;
    if (running === next) return;
    running = next;
    lastFrame = 0;
    renderer.setAnimationLoop(next ? animate : null);
  }

  function trackPointer(event, strength) {
    const bounds = stage.getBoundingClientRect();
    pointerTarget.set(
      2 * (event.clientX - bounds.left) / bounds.width - 1,
      2 * (event.clientY - bounds.top) / bounds.height - 1,
    ).clampScalar(-1, 1).multiplyScalar(strength);
  }

  function resetPointer() {
    touchPointerId = null;
    pointerTarget.set(0, 0);
  }

  function resetInteraction() {
    resetPointer();
    pointer.set(0, 0);
    press = null;
    push = null;
    pushOffset = 0;
  }

  function movedPastTapSlop(event) {
    return Math.hypot(event.clientX - press.x, event.clientY - press.y) > tapSlop;
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) resetInteraction();
    syncLoop();
  }).observe(stage);
  new ResizeObserver(resize).observe(stage);
  stage.addEventListener('pointerdown', (event) => {
    if (!settings.play || !event.isPrimary || event.button !== 0) return;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY };
    if (event.pointerType === 'touch') {
      touchPointerId = event.pointerId;
      trackPointer(event, 1.9);
    }
  });
  stage.addEventListener('pointermove', (event) => {
    if (!settings.play) return;
    if (press?.id === event.pointerId && movedPastTapSlop(event)) press = null;
    if (event.pointerId === touchPointerId) trackPointer(event, 1.9);
    else if (touchPointerId === null && event.pointerType === 'mouse') trackPointer(event, 1);
  });
  stage.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse') return;
    if (press?.id === event.pointerId) press = null;
    if (touchPointerId === null) resetPointer();
  });
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    stage.addEventListener(name, (event) => {
      if (press?.id === event.pointerId) {
        if (name === 'pointerup' && !movedPastTapSlop(event)) {
          const { left, width: stageWidth } = stage.getBoundingClientRect();
          const direction = event.clientX < left + stageWidth / 2 ? 1 : -1;
          push = { elapsed: 0, from: pushOffset, direction };
        }
        press = null;
      }
      if (event.pointerId === touchPointerId) resetPointer();
    });
  }
  source.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    lost = true;
    delete stage.dataset.ready;
    syncLoop();
  });
  source.addEventListener('webglcontextrestored', () => {
    lost = false;
    resize();
    syncLoop();
  });
  document.fonts?.ready.then(draw);
  applySceneSettings();
  resize();

  return {
    update(next) {
      const dimensionsChanged = ['cellSize', 'lineHeight']
        .some(key => settings[key] !== next[key]);
      settings = next;
      if (!settings.play) resetInteraction();
      applySceneSettings();
      if (dimensionsChanged) resize();
      else draw();
      syncLoop();
    },
  };
}
