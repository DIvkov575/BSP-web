import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randRange, randRotation } from './components';

let cubeList = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);


//  cubes !!
function addWireFrameCube() {
  const cubeGeometry = new THREE.BoxGeometry(5,5,5);
  const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); // or WireframeGeometry( geometry )
  const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  const wireframe = new THREE.LineSegments( cubeGeo, mat );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  wireframe.position.set(x, y, z);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  scene.add(wireframe);
  return wireframe;
}
function addBigWireFrameCube() {
  const cubeBigGeometry = new THREE.BoxGeometry(15,15,15);
  const cubeBigGeo = new THREE.EdgesGeometry( cubeBigGeometry ); // or WireframeGeometry( geometry )
  const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  const wireframe = new THREE.LineSegments( cubeBigGeo, mat );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  wireframe.position.set(x, y, z);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  scene.add(wireframe);
  return wireframe;
}
for (let index = 0; index < 75; index++) {
  cubeList.push(addWireFrameCube())
}
for (let index = 0; index < 3; index++) {
  cubeList.push(addBigWireFrameCube())
}


// asteroids !!
function addAsteroid() {
  const sphereGeo = new THREE.SphereGeometry(5,20,20);
  const material = new THREE.LineBasicMaterial( {color: 0xff1111});
  const asteroid = new THREE.LineSegments
}



// Animation !!
let rate = 1
function moveCamera() {
  const t = -document.body.getBoundingClientRect().top;
  if (t < 1200) {
    camera.position.z = t * 0.1;
    camera.position.x = t * 0.001;
    camera.rotation.y = t * 0.0002;
    camera.rotation.x = t * 0.0005;
    for (let i = 0; i < cubeList.length; i++){randRotation(cubeList[i], t)}
  } 
  else if (t > 1300 && t < 1400) {
  camera.rotation.x = 0;
  camera.rotation.y = 1;  
  camera.rotation.z = 0;
}
  else if (t > 900 && t < 1350) {
    console.log(t)
    camera.rotation.y -= (0-camera.rotation.y) / rate*7
    camera.rotation.z -= (0-camera.rotation.x) / rate*7
    rate += (t-1350) * 0.2
  }

  else if (t >1800) {
  }
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
document.body.onscroll = moveCamera;
moveCamera();
animate();

// Standard JS