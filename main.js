import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/FBXLoader.js'; //replaced with FBX instead of GLTF


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 50);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

//load the background picture
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('./images/sky.png');
scene.background = backgroundTexture;

//lights
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

//load the ground picture and tile it
const floorTexture = textureLoader.load('./images/dirt.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10); 

//floor
const floorGeometry = new THREE.PlaneGeometry(500, 500);
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.5; 
scene.add(floor);

//add orange PBR textures
const albedoTexture = textureLoader.load('./images/orange/Orange_Base_BaseColor.png');
const displacementTexture = textureLoader.load('./images/orange/Orange_Base_Displacement.png');
const emissionTexture = textureLoader.load('./images/orange/Orange_Base_Emission.png');
const metallicTexture = textureLoader.load('./images/orange/Orange_Base_Metallic.png');
const normalTexture = textureLoader.load('./images/orange/Orange_Base_Normal.png');
const roughnessTexture = textureLoader.load('./images/orange/Orange_Base_Roughness.png');
const alphaTexture = textureLoader.load('./images/orange/Orange_Base_Alpha.png');

// spin orange
let rotationSpeed = 0.01;
const loader = new FBXLoader();
loader.load('./images/orange/orange.fbx', (fbx) => {
  fbx.scale.set(0.1, 0.1, 0.1);
  fbx.position.set(0, 15, 0); 

 //found through FBX tutorial
  fbx.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        displacementMap: displacementTexture,
        displacementScale: 0.1,
        emissiveMap: emissionTexture,
        emissiveIntensity: 1.0,
        metalnessMap: metallicTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        aoMap: alphaTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });
    }
  });

  scene.add(fbx);

 // If click orange, spin other way
  document.addEventListener('click', () => {
    rotationSpeed = -rotationSpeed;
  });


  function rotateModel() {
    fbx.rotation.y += rotationSpeed;
    requestAnimationFrame(rotateModel);
  }
  rotateModel();
  //Added because FBX was acting goofy
}, undefined, (error) => {
  console.error('Error loading FBX model:', error);
});


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Next goal is to add animation or make a full scene
