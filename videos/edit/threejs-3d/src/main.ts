import * as THREE from 'three';
import './style.css';

const OUTPUT_WIDTH = 1080;
const OUTPUT_HEIGHT = 1920;
const LOOP_SECONDS = 8;
const CAPTURE_FPS = 25;

const stage = document.querySelector<HTMLDivElement>('#stage');
const motionButton = document.querySelector<HTMLButtonElement>('#motion-button');
const motionLabel = document.querySelector<HTMLSpanElement>('#motion-label');
const speedSlider = document.querySelector<HTMLInputElement>('#speed-slider');
const speedValue = document.querySelector<HTMLSpanElement>('#speed-value');
const recordButton = document.querySelector<HTMLButtonElement>('#record-button');
const recordStatus = document.querySelector<HTMLSpanElement>('#record-status');
const downloadLink = document.querySelector<HTMLAnchorElement>('#download-link');
const progressBar = document.querySelector<HTMLSpanElement>('#record-progress');

if (!stage || !motionButton || !motionLabel || !speedSlider || !speedValue || !recordButton || !recordStatus || !downloadLink || !progressBar) {
  throw new Error('Un élément de l’interface 3D est introuvable.');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color('#111017');
scene.fog = new THREE.Fog('#111017', 13, 26);

const camera = new THREE.PerspectiveCamera(34, OUTPUT_WIDTH / OUTPUT_HEIGHT, 0.1, 70);
camera.position.set(4.1, 2.65, 10.8);
camera.lookAt(0, 0.15, 0);

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false, powerPreference: 'high-performance'});
renderer.setPixelRatio(1);
renderer.setSize(OUTPUT_WIDTH, OUTPUT_HEIGHT, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;
renderer.domElement.setAttribute('aria-label', 'Animation 3D verticale, rendue localement en 1080 par 1920');
stage.replaceChildren(renderer.domElement);

scene.add(new THREE.AmbientLight('#b9b4cf', 1.35));

const keyLight = new THREE.DirectionalLight('#ffe4d0', 3.1);
keyLight.position.set(-4.5, 7, 6);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.left = -5;
keyLight.shadow.camera.right = 5;
keyLight.shadow.camera.top = 6;
keyLight.shadow.camera.bottom = -5;
scene.add(keyLight);

const roseLight = new THREE.PointLight('#ff716c', 75, 18, 2);
roseLight.position.set(-3.2, 0.4, 3.6);
scene.add(roseLight);

const lilacLight = new THREE.PointLight('#8b73ff', 92, 20, 2);
lilacLight.position.set(3.8, 2.3, -3.6);
scene.add(lilacLight);

const warmRim = new THREE.PointLight('#ffc27a', 38, 13, 2);
warmRim.position.set(0.2, 4.6, 1.8);
scene.add(warmRim);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({color: '#17151e', metalness: 0.24, roughness: 0.5}),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.72;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(18, 36, '#75627c', '#37313f');
grid.position.y = -1.708;
const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
for (const material of gridMaterials) {
  material.transparent = true;
  material.opacity = 0.17;
  material.depthWrite = false;
}
scene.add(grid);

const pedestal = new THREE.Mesh(
  new THREE.CylinderGeometry(1.34, 1.52, 0.28, 96),
  new THREE.MeshPhysicalMaterial({color: '#28232f', metalness: 0.78, roughness: 0.24, clearcoat: 0.8}),
);
pedestal.position.y = -1.55;
pedestal.castShadow = true;
pedestal.receiveShadow = true;
scene.add(pedestal);

const pedestalRim = new THREE.Mesh(
  new THREE.TorusGeometry(1.38, 0.018, 12, 128),
  new THREE.MeshBasicMaterial({color: '#f3b777'}),
);
pedestalRim.rotation.x = Math.PI / 2;
pedestalRim.position.y = -1.397;
scene.add(pedestalRim);

const halo = new THREE.Mesh(
  new THREE.RingGeometry(1.82, 1.9, 128),
  new THREE.MeshBasicMaterial({color: '#bb83ff', transparent: true, opacity: 0.24, side: THREE.DoubleSide, depthWrite: false}),
);
halo.position.set(0, 0.36, -1.62);
scene.add(halo);

const haloInner = new THREE.Mesh(
  new THREE.RingGeometry(2.05, 2.075, 128),
  new THREE.MeshBasicMaterial({color: '#ff9e8c', transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false}),
);
haloInner.position.set(0, 0.36, -1.7);
scene.add(haloInner);

const hero = new THREE.Group();
hero.position.y = 0.32;
scene.add(hero);

const core = new THREE.Mesh(
  new THREE.SphereGeometry(0.52, 64, 64),
  new THREE.MeshPhysicalMaterial({color: '#f6ddc8', metalness: 0.18, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08}),
);
core.castShadow = true;
core.receiveShadow = true;
hero.add(core);

const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.88, 0.235, 320, 32, 2, 3),
  new THREE.MeshPhysicalMaterial({color: '#eb8477', metalness: 0.42, roughness: 0.19, clearcoat: 1, clearcoatRoughness: 0.09}),
);
knot.castShadow = true;
knot.receiveShadow = true;
hero.add(knot);

const orbit = new THREE.Group();
hero.add(orbit);

const orbitGold = new THREE.Mesh(
  new THREE.TorusGeometry(1.48, 0.018, 12, 180),
  new THREE.MeshStandardMaterial({color: '#f6c47e', metalness: 0.72, roughness: 0.2, emissive: '#5d351c', emissiveIntensity: 0.23}),
);
orbitGold.rotation.set(0.95, 0.28, 0.08);
orbit.add(orbitGold);

const orbitLilac = new THREE.Mesh(
  new THREE.TorusGeometry(1.7, 0.012, 8, 180),
  new THREE.MeshStandardMaterial({color: '#c2a4ff', metalness: 0.63, roughness: 0.25, emissive: '#33204d', emissiveIntensity: 0.28}),
);
orbitLilac.rotation.set(1.36, 0.68, -0.4);
orbit.add(orbitLilac);

const satellite = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.145, 2),
  new THREE.MeshPhysicalMaterial({color: '#fff0cd', metalness: 0.75, roughness: 0.15, clearcoat: 1}),
);
satellite.position.set(1.49, 0, 0);
satellite.castShadow = true;
orbit.add(satellite);

const orbitSpark = new THREE.Mesh(
  new THREE.SphereGeometry(0.072, 28, 28),
  new THREE.MeshBasicMaterial({color: '#ff9386'}),
);
orbitSpark.position.set(-1.32, 0.73, 0.18);
orbit.add(orbitSpark);

const badgeCanvas = document.createElement('canvas');
badgeCanvas.width = 1024;
badgeCanvas.height = 256;
const badgeContext = badgeCanvas.getContext('2d');
if (badgeContext) {
  badgeContext.clearRect(0, 0, badgeCanvas.width, badgeCanvas.height);
  badgeContext.beginPath();
  badgeContext.roundRect(18, 26, 988, 204, 102);
  badgeContext.fillStyle = 'rgba(25, 20, 31, 0.88)';
  badgeContext.fill();
  badgeContext.lineWidth = 4;
  badgeContext.strokeStyle = 'rgba(246, 196, 126, 0.8)';
  badgeContext.stroke();
  badgeContext.fillStyle = '#f4dfcb';
  badgeContext.font = '600 63px Arial, sans-serif';
  badgeContext.textAlign = 'center';
  badgeContext.textBaseline = 'middle';
  badgeContext.fillText('MOTION  /  VOL. 01', 512, 130);
}
const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
badgeTexture.colorSpace = THREE.SRGBColorSpace;
badgeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const badge = new THREE.Mesh(
  new THREE.PlaneGeometry(2.55, 0.64),
  new THREE.MeshBasicMaterial({map: badgeTexture, transparent: true, side: THREE.DoubleSide, depthWrite: false}),
);
badge.position.set(0, -1.2, 0.72);
scene.add(badge);

let seed = 317;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const particleCount = 280;
const particlePositions = new Float32Array(particleCount * 3);
for (let index = 0; index < particleCount; index += 1) {
  particlePositions[index * 3] = (random() - 0.5) * 9.5;
  particlePositions[index * 3 + 1] = (random() - 0.4) * 8.5;
  particlePositions[index * 3 + 2] = -4.2 - random() * 4.5;
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({color: '#f2cba6', size: 0.027, transparent: true, opacity: 0.62, sizeAttenuation: true, depthWrite: false}),
);
scene.add(particles);

let elapsed = 0;
let lastFrame = performance.now();
let paused = false;
let speed = Number(speedSlider.value);

function render(now: number) {
  const delta = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;

  if (!paused) elapsed += delta * speed;
  const phase = (elapsed / LOOP_SECONDS) * Math.PI * 2;

  hero.rotation.set(Math.sin(phase) * 0.12, phase, Math.cos(phase) * 0.07);
  orbit.rotation.set(Math.cos(phase) * 0.08, -phase * 0.5, Math.sin(phase) * 0.12);
  core.scale.setScalar(1 + Math.sin(phase * 2) * 0.035);
  halo.rotation.z = -phase * 0.14;
  haloInner.rotation.z = phase * 0.11;
  particles.rotation.y = phase * 0.018;
  badge.rotation.y = Math.sin(phase) * 0.025;
  camera.position.x = 4.1 + Math.sin(phase) * 0.13;
  camera.position.y = 2.65 + Math.cos(phase) * 0.08;
  camera.lookAt(0, 0.14, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

function updateMotionButton() {
  motionButton!.setAttribute('aria-pressed', String(paused));
  motionLabel!.textContent = paused ? 'Reprendre le mouvement' : 'Mettre en pause';
  motionButton!.querySelector<HTMLElement>('.play-symbol')!.textContent = paused ? '▶' : 'Ⅱ';
}

motionButton.addEventListener('click', () => {
  paused = !paused;
  updateMotionButton();
});

function formatSeconds(seconds: number) {
  return `${Number.isInteger(seconds) ? seconds : seconds.toFixed(1)} S`;
}

function captureLabel() {
  return `ENREGISTRER · ${formatSeconds(LOOP_SECONDS / speed)}`;
}

speedSlider.addEventListener('input', () => {
  speed = Number(speedSlider.value);
  speedValue.textContent = `${speed.toFixed(2)}×`;
  recordButton!.innerHTML = `<span class="record-icon" aria-hidden="true"></span>${captureLabel()}`;
  recordStatus!.textContent = `Boucle entière · ${formatSeconds(LOOP_SECONDS / speed)} à cette vitesse`;
});

let recorder: MediaRecorder | null = null;
let activeStream: MediaStream | null = null;
let timerId = 0;
let intervalId = 0;
let recordingStart = 0;
let captureDurationMs = LOOP_SECONDS * 1000;
let lastDownloadUrl: string | null = null;

function setRecordingControls(isRecording: boolean) {
  motionButton!.disabled = isRecording;
  speedSlider!.disabled = isRecording;
  recordButton!.classList.toggle('is-recording', isRecording);
  recordButton!.innerHTML = isRecording
    ? '<span class="record-icon" aria-hidden="true"></span>ARRÊTER LA CAPTURE'
    : `<span class="record-icon" aria-hidden="true"></span>${captureLabel()}`;
}

function stopRecording() {
  window.clearTimeout(timerId);
  window.clearInterval(intervalId);
  if (recorder?.state === 'recording') recorder.stop();
}

recordButton.addEventListener('click', () => {
  if (recorder?.state === 'recording') {
    stopRecording();
    return;
  }

  if (typeof MediaRecorder === 'undefined' || typeof renderer.domElement.captureStream !== 'function') {
    recordStatus.textContent = 'Capture WebM non prise en charge par ce navigateur.';
    return;
  }

  const mimeType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
    .find((candidate) => MediaRecorder.isTypeSupported(candidate));
  if (!mimeType) {
    recordStatus.textContent = 'Aucun encodeur WebM compatible dans ce navigateur.';
    return;
  }

  if (lastDownloadUrl) {
    URL.revokeObjectURL(lastDownloadUrl);
    lastDownloadUrl = null;
  }
  downloadLink.hidden = true;
  progressBar.style.width = '0%';

  if (paused) {
    paused = false;
    updateMotionButton();
  }
  captureDurationMs = (LOOP_SECONDS / speed) * 1000;
  activeStream = renderer.domElement.captureStream(CAPTURE_FPS);
  const chunks: BlobPart[] = [];
  try {
    recorder = new MediaRecorder(activeStream, {mimeType, videoBitsPerSecond: 14_000_000});
  } catch {
    activeStream.getTracks().forEach((track) => track.stop());
    activeStream = null;
    recordStatus.textContent = 'Impossible de démarrer l’encodeur WebM.';
    return;
  }

  recorder.addEventListener('dataavailable', (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  });
  recorder.addEventListener('error', () => {
    recordStatus.textContent = 'La capture a rencontré une erreur.';
    stopRecording();
  }, {once: true});
  recorder.addEventListener('stop', () => {
    activeStream?.getTracks().forEach((track) => track.stop());
    activeStream = null;
    const blob = new Blob(chunks, {type: 'video/webm'});
    lastDownloadUrl = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    downloadLink.href = lastDownloadUrl;
    downloadLink.download = `atelier-3d-${timestamp}.webm`;
    downloadLink.hidden = false;
    recordStatus.textContent = `Capture prête · ${(blob.size / (1024 * 1024)).toFixed(1)} Mo · WebM sans audio`;
    progressBar.style.width = '100%';
    setRecordingControls(false);
  }, {once: true});

  recorder.start(250);
  recordingStart = performance.now();
  setRecordingControls(true);
  recordStatus.textContent = `Enregistrement local · ${formatSeconds(captureDurationMs / 1000)}`;

  intervalId = window.setInterval(() => {
    const fraction = Math.min((performance.now() - recordingStart) / captureDurationMs, 1);
    progressBar.style.width = `${fraction * 100}%`;
    const secondsLeft = Math.max(0, Math.ceil((captureDurationMs - (performance.now() - recordingStart)) / 1000));
    recordStatus.textContent = `Capture en cours · 00:${String(secondsLeft).padStart(2, '0')}`;
  }, 80);
  timerId = window.setTimeout(stopRecording, captureDurationMs);
});

downloadLink.addEventListener('click', () => {
  window.setTimeout(() => {
    if (lastDownloadUrl) URL.revokeObjectURL(lastDownloadUrl);
    lastDownloadUrl = null;
    downloadLink.hidden = true;
  }, 60_000);
});

window.addEventListener('beforeunload', () => {
  if (lastDownloadUrl) URL.revokeObjectURL(lastDownloadUrl);
  activeStream?.getTracks().forEach((track) => track.stop());
  renderer.dispose();
});
