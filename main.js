import './style.css';
import * as THREE from 'three';
import { randRange, randRotation } from './components';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {MeshBasicMaterial} from "three";

//setup
let cubeList = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

//flying camera
let controls = new FlyControls( camera, renderer.domElement );
controls.movementSpeed = 100;
controls.rollSpeed = Math.PI / 24;
controls.autoForward = false;
controls.dragToLook = true;
const axesHelper = new THREE.AxesHelper( 1000  );
scene.add( axesHelper );

//lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 0, 100);
scene.add(pointLight)

//  cubes !!
function addWireFrameCube() {
  const cubeGeometry = new THREE.BoxGeometry(5,5,5);
  const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); // or WireframeGeometry( geometry )
  const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  const wireframe = new THREE.LineSegments( cubeGeo, mat );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));
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
    .map(() => THREE.MathUtils.randFloatSpread(150));
  wireframe.position.set(x, y, z);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  scene.add(wireframe);
  return wireframe;
}
for (let index = 0; index < 40; index++) {
  addWireFrameCube()
  addWireFrameCube()
  cubeList.push(addWireFrameCube())
}
for (let index = 0; index < 3; index++) {
  addBigWireFrameCube()
  cubeList.push(addWireFrameCube())
}


// asteroids !!
function addAsteroid() {
  const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(250));

  let objLoader = new OBJLoader();
  const material = new THREE.MeshStandardMaterial({ color: 0x451c09 });


  objLoader.setPath('assets/stl/')
  objLoader.load('kleopatra_south.obj', function (object) {
    object.scale.setScalar(0.25)
    object.position.set(x+100, y-50, z/10 +220);
    object.rotation.z += Math.PI/2;
    object.rotation.y += Math.PI;

    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material = material;

      }})
    scene.add(object)
  })


}

//grid
// let gridGeo = new THREE.SphereGeometry( 500, 359,179);
// let gridMat = new THREE.MeshPhongMaterial( { color: 0x000000 } );
// let grid = new THREE.Mesh( gridGeo, gridMat );
// let gridEdge = new THREE.EdgesHelper(grid, 0xaaaaff);
// gridEdge.material.linewidth = 3;
// grid.rotateZ(1/2*Math.PI);
// scene.add(grid);
// scene.add(gridEdge);

// Animation !!
function moveCamera() {
  const t = -document.body.getBoundingClientRect().top;
//   console.log(
//   camera.position.x,
//   camera.position.y,
//   camera.position.z,
//   camera.rotation.x,
//   camera.rotation.y,
//   camera.rotation.z
// )
  if (t < 50) {
    camera.rotation.x = 0;
    camera.rotation.y = 0 ;
    camera.rotation.z = 0;
    camera.position.x = -30;
    camera.position.y = 0;
    camera.position.z = -0;
  } else if (t > 50 && t < 1950) {
    camera.position.z = t * 0.1;
    camera.position.x = t * 0.001;
    camera.rotation.y = t * 0.0002;
    camera.rotation.x = t * 0.0005;
    camera.rotation.z = t * 0.001;
    for (let i = 0; i < cubeList.length; i++){randRotation(cubeList[i], t)}
  }
  else if (t > 1950 && t < 2050) {
    camera.rotation.x = Math.PI/2;
    camera.rotation.y = Math.PI ;
    camera.rotation.z = Math.PI;
    camera.position.x = 2;
    camera.position.y = 0;
    camera.position.z = 200;
  }
//   else if (t > 2050 && t < 2150) {
//   camera.rotation.x = 0;
//   camera.rotation.y = 0;
//   camera.rotation.z = 0;
//   camera.position.x = 0;
//   camera.position.y = 0;
//   camera.position.z = 0;
// }
//   else if (t > 1900 && t < 2000) {
//     camera.rotation.y -= (0-camera.rotation.y) / rate*7
//     camera.rotation.z -= (0-camera.rotation.x) / rate*7
//     rate += (t-1350) * 0.2
//   }

  // else if (t >2100) {
  //   console.log(
  //       camera.rotation.x,
  //       camera.rotation.y,
  //       camera.rotation.z,
  //       camera.position.x,
  //       camera.position.y,
  //       camera.position.z,
  //   )


}
let t = 0
function animate() {
  controls.update(0.01)

  t++
  if (t > 100) {
    t = 0;
    console.log(
        camera.position.x,
        camera.position.y,
        camera.position.z,
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z
    )
  }

  cubeList.forEach((cube)=>cube.rotation.x += 0.008)
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
document.body.onscroll = moveCamera;
moveCamera();
animate();

// Miscellaneous

