import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // const geometry = new THREE.BoxGeometry(0.25, 24, 24);

  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

// edges geometry
  // const geometry = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
  // const material = new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 2 } );
  // const star = new THREE.LineSegments( geometry, material );
  // mesh.add( edges );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(100).fill().forEach(addStar);

// Background
scene.background = "black";

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {

  renderer.render(scene, camera);
}

animate();
