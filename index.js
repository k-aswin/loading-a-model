import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function init (geometry) { 
  const material = new THREE.MeshNormalMaterial({
    matcap: new THREE.TextureLoader().load('./assets/textures/matcaps/black-n-shiney.jpg'),
    wireframe:false,
    flatShading:false
  });
  // const material = new THREE.MeshMatcapMaterial({
  //   matcap: new THREE.TextureLoader().load('./assets/textures/matcaps/black-n-shiney.jpg')
  // });



  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const sunlight = new THREE.DirectionalLight(0xffff);
  sunlight.position.y = 2;
  scene.add(sunlight);

  const filllight = new THREE.DirectionalLight(0x234345);
  filllight.position.x = 1;
  filllight.position.y = -2;
  scene.add(filllight);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

const loader = new OBJLoader();
loader.load("./assets/models/monkey.obj", (obj) => init(obj.children[0].geometry) );

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);