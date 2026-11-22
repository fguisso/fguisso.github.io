import {
  BufferGeometry, Float32BufferAttribute, Group, Mesh, PerspectiveCamera,
  MathUtils, Quaternion, Scene, TorusGeometry, Vector3,
} from 'three';

// Keep the original hero's torus and tiled Pyraminx, including its half-turns.
const corners = [
  new Vector3(0, 1, 0),
  new Vector3(Math.sqrt(8 / 9), -1 / 3, 0),
  new Vector3(-Math.sqrt(2 / 9), -1 / 3, Math.sqrt(2 / 3)),
  new Vector3(-Math.sqrt(2 / 9), -1 / 3, -Math.sqrt(2 / 3)),
].map((vertex) => vertex.multiplyScalar(1.45));
const faces = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]];

export function createHeroScene(faceMaterials, edgeMaterial, ringMaterial, segments = [24, 112]) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 30);
  camera.position.z = 6.6;
  const sculpture = new Group();
  const pyramid = new Group();
  const ring = new Mesh(new TorusGeometry(2.1, 0.18, ...segments), ringMaterial);
  scene.add(sculpture);
  sculpture.add(ring, pyramid);

  const tiles = faces.flatMap((face, faceIndex) => {
    const [a, b, c] = face.map((index) => corners[index]);
    const ab = a.clone().lerp(b, 0.5);
    const bc = b.clone().lerp(c, 0.5);
    const ca = c.clone().lerp(a, 0.5);
    const front = faceMaterials[faceIndex];

    return [[a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]].map((triangle) => {
      const center = new Vector3().add(triangle[0]).add(triangle[1]).add(triangle[2]).divideScalar(3);
      const surface = triangle.map((vertex) => center.clone().lerp(vertex, 0.88));
      const back = surface.map((vertex) => vertex.clone().multiplyScalar(0.57));
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(
        [...surface, ...back].flatMap((vertex) => vertex.toArray()), 3,
      ));
      geometry.setIndex([0, 1, 2, 3, 5, 4, 0, 3, 4, 0, 4, 1, 1, 4, 5, 1, 5, 2, 2, 5, 3, 2, 3, 0]);
      geometry.addGroup(0, 3, 0);
      geometry.addGroup(3, 21, 1);
      geometry.computeVertexNormals();
      const mesh = new Mesh(geometry, [front, edgeMaterial]);
      pyramid.add(mesh);
      return { mesh, center, faceIndex };
    });
  });

  const turns = [[0, 1], [0, 2], [1, 3]].map(([first, second]) => {
    const axis = new Vector3().addVectors(corners[first], corners[second]).normalize();
    const moving = new Set(tiles.filter(({ center }) => center.dot(axis) > 0.02));
    return { axis, moving };
  });
  const rotation = new Quaternion();

  function pose(elapsed, { angle = 0, ringTilt = 0.92, sway = true, twist = true } = {}) {
    sculpture.rotation.y = -0.32 + angle + elapsed * 0.25;
    ring.rotation.set(ringTilt + (sway ? Math.sin(elapsed * 0.48) * 0.3 : 0), 0.17, -0.45);
    pyramid.rotation.set(0.2, 0.35 - elapsed * 0.28, -0.12);

    const turnDuration = 5;
    const progress = (elapsed % turnDuration) / turnDuration;
    const turn = turns[Math.floor(elapsed / turnDuration) % turns.length];
    rotation.setFromAxisAngle(turn.axis, Math.PI * (1 - Math.cos(progress * 2 * Math.PI)) / 2);
    for (const tile of tiles) {
      tile.mesh.quaternion.identity();
      if (twist && turn.moving.has(tile)) tile.mesh.quaternion.copy(rotation);
    }

  }

  function configureView(settings, keyPosition) {
    ring.scale.setScalar(settings.ringScale);
    const distance = 6.6 / settings.zoom;
    const tilt = MathUtils.degToRad(settings.cameraTilt);
    camera.position.set(0, Math.sin(tilt) * distance, Math.cos(tilt) * distance);
    camera.lookAt(0, 0, 0);
    const azimuth = MathUtils.degToRad(settings.azimuth);
    const elevation = MathUtils.degToRad(settings.elevation);
    keyPosition.set(Math.sin(azimuth) * Math.cos(elevation), Math.sin(elevation), Math.cos(azimuth) * Math.cos(elevation));
  }

  function poseFrame(elapsed, settings) {
    pose(elapsed, {
      angle: MathUtils.degToRad(settings.angle), ringTilt: MathUtils.degToRad(settings.ringTilt),
      sway: settings.sway, twist: settings.twist,
    });
  }

  return { scene, camera, sculpture, pyramid, ring, tiles, configureView, poseFrame };
}
