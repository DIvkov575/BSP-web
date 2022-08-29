import './style.css';
import * as THREE from 'three';
import { randRange, randRotation } from './components';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {MeshBasicMaterial} from "three";

//setup
let cubeList = [];
let cubeList2 = [];
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
pointLight.position.set(100, 100, 100);
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
  wireframe.position.set(x, y, z-50);
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
  wireframe.position.set(x, y, z-50);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  scene.add(wireframe);
  return wireframe;
}
for (let index = 0; index < 20; index++) {
  addWireFrameCube()
  cubeList2.push(addWireFrameCube())
  cubeList.push(addWireFrameCube())
}
for (let index = 0; index < 2; index++) {
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

// grid
let gridGeo = new THREE.SphereGeometry( 500, 359,179);
let gridMat = new THREE.MeshPhongMaterial( { color: 0x000000 } );
let grid = new THREE.Mesh( gridGeo, gridMat );
let gridEdge = new THREE.EdgesHelper(grid, 0xaaaaff);
grid.position.x -= 505.1
gridEdge.position.x -= 505;
gridEdge.rotation.z += Math.PI/2;
// grid.rotation.z += Math.PI/2;
gridEdge.material.linewidth = 3;
scene.add(grid);
scene.add(gridEdge);

//plane
let planeShape = new THREE.PlaneGeometry(100,200,200,400)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x451c09 });
let plane = new THREE.Mesh( planeShape, planeMaterial );
let planeEdge = new THREE.EdgesHelper(plane, 0xaaaaff);
planeEdge.rotation.y = Math.PI/2;
planeEdge.position.z -= 150
planeEdge.position.x -= 10
planeEdge.material.linewidth = 3;
scene.add(planeEdge);


camera.rotation.z = -Math.PI/2
// camera.position.x += 15;
camera.rotation.y -= 0.1;
let prevX
// Animation !!
function moveCamera() {
  const t = -document.body.getBoundingClientRect().top;
  console.log(t)
  gridEdge.rotation.y -= 0.5
  // console.log(t)
//   console.log(
//   camera.position.x,
//   camera.position.y,
//   camera.position.z,
//   camera.rotation.x,
//   camera.rotation.y,
//   camera.rotation.z
// )
  if (t < 300) {

  } else if (t > 700 && t < 1000) {
    let cube1 = addWireFrameCube();
    cube1.position.z = (t * 0.01)-300
  }

}
let t = 0
function animate() {
  controls.update(0.01)

  // t++
  if (t > 500) {
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

