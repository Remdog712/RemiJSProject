import*as e from"https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
// Imports at the top
import './style.css';
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// HTML
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(50);
camera.position.setX(-3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), 
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// background image s
const spaceTexture = new THREE.TextureLoader().load('images/wavybackground.jpg');
scene.background = spaceTexture;

// add cubes
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-15, 0, -15);
scene.add(cube);

// add in the icosphere
const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);
icoMesh.position.set(15, 0, -15);
scene.add(icoMesh);

// Put images on objects
const smileTexture = new THREE.TextureLoader().load('images/orange_peel.jpg');
const sphereGeometry = new THREE.SphereGeometry(10, 22, 10);
const smileMaterial = new THREE.MeshBasicMaterial({ map: smileTexture });
const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);
smileMesh.position.set(0, -10, -30);
scene.add(smileMesh);

// put the water texture onto the object
const normalTexture = new THREE.TextureLoader().load('images/normals/test_Normal.jpg');
const torusGeo = new THREE.TorusKnotGeometry(5, 1, 250, 5, 9, 15);
const torusMaterial = new THREE.MeshStandardMaterial({
  normalMap: normalTexture,
  roughness: 0,
  metalness: 0.8
});
const torusKnot = new THREE.Mesh(torusGeo, torusMaterial);
torusKnot.position.y = 20;
scene.add(torusKnot);

// lights into scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);
scene.add(ambientLight);

// Adds the helpers for the scene
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// Does the orbit control
const controls = new OrbitControls(camera, renderer.domElement);

// Rendering the scene stuff
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  icoMesh.rotation.z -= 0.03;
  icoMesh.rotation.y -= 0.03;

  smileMesh.rotation.y += 0.05;

  torusKnot.rotation.x += 0.02;

  controls.update();

  renderer.render(scene, camera);
}

animate();

