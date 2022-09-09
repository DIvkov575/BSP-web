import './style.css';
import * as THREE from 'three';
import { randRange, randRotation } from './components';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {Loader, MeshBasicMaterial} from "three";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

//setup
let t = 0
let cubeList = [];
let cubeList2 = [];
let containerList = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
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
    .map(() => THREE.MathUtils.randFloatSpread(250));
  wireframe.position.set(x, y, z-50);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  wireframe.layers.set(1)
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
    .map(() => THREE.MathUtils.randFloatSpread(250));
  wireframe.position.set(x, y, z-50);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  wireframe.layers.set(1)
  scene.add(wireframe);
  return wireframe;
}
for (let index = 0; index < 15; index++) {
  addWireFrameCube()
  cubeList.push(addWireFrameCube())
  cubeList.push(addWireFrameCube())
}
for (let index = 0; index < 1; index++) {
  addBigWireFrameCube()
  cubeList.push(addWireFrameCube())
}

// grid
let gridGeo = new THREE.SphereGeometry( 500, 359,179);
let gridMat = new THREE.MeshPhongMaterial( { color: 0x000000 } );
let grid = new THREE.Mesh( gridGeo, gridMat );
let gridEdge = new THREE.EdgesHelper(grid, 0xaaaaff);
grid.position.x -= 505.1
gridEdge.position.x -= 505;
gridEdge.material.linewidth = 3;
gridEdge.layers.set(1)
grid.layers.set(1)
scene.add(grid);
scene.add(gridEdge);

//plane
let planeShape = new THREE.PlaneGeometry(150,350,20,25)
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x66554d , side:THREE.DoubleSide,flatShading:THREE.FlatShading});
let plane = new THREE.Mesh( planeShape, planeMaterial );
const {array} = plane.geometry.attributes.position;
for (let i = 0; i < array.length; i+=9) {
  const x1 = array[i];
  const y1 = array[i+1];
  const z1 = array[i+2];

  if (x1 == -50)  {array[i+2] = z1;}
  if ((y1 > -25 && y1 <25) || (x1 <= -25)) {
    array[i + 2] = z1 + 15 * Math.random();
  } else {array[i + 2] = z1 + 30 * Math.random();}
}
plane.layers.set(1)
scene.add(plane);

// container
function addContainer() {
  function getDir() {
    if (Math.random() >= 0.5) {
      return 1;
    } else {
      return -1;
    }
  }
  const x = Math.round(Math.random()*40);
  const z = Math.round(Math.random()*300);
  const y = Math.round(Math.random()*400);
  const speed = Math.random()*0.03;
  const direction = getDir();
  let objLoader = new OBJLoader();
  const material1 = new THREE.MeshPhongMaterial({ color: 0x6b2020 , side:THREE.DoubleSide,flatShading:THREE.FlatShading});
  const material2 = new THREE.MeshPhongMaterial({ color: 0x0a1d40 , side:THREE.DoubleSide,flatShading:THREE.FlatShading});
  const materialPicks = [material1, material2]
  const material = materialPicks[Math.round(Math.random())]
  objLoader.setPath('assets/')
  objLoader.load('cargo.obj', function (object) {
    object.scale.setScalar(0.1)
    object.rotation.y = Math.PI/4.15
    object.rotation.x = Math.PI/2

    object.position.z = -z;
    object.position.x = 10 + x; 
    object.position.y = y;

    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material = material;
      }})
    object.layers.set(1)
    scene.add(object)
    object.x = x;
    object.y = y;
    object.z = z;
    object.speed = speed;
    object.direction = direction;
    containerList.unshift(object)
  })
}
for (let i = 0 ; i < 5; i++){
  addContainer()
}

//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(1, 15);
const material = new THREE.MeshBasicMaterial({ color: color });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
sphere.layers.set(1);
scene.add(sphere);


plane.rotation.y = Math.PI/2;
plane.position.z -= 150
plane.position.x -= 10
camera.rotation.z = -Math.PI/2
camera.rotation.y -= 0.1;

function moveContainer(container, t){
  const y = container.y;
  const speed = container.speed;
  const d = container.direction;
  
  container.position.y  = d*(50+y)-d*(t-200)*(0.06+speed)
}

function moveCamera() {
  const t = -document.body.getBoundingClientRect().top;
  if (t < 2500) {
  gridEdge.rotation.y -= 0.5
  camera.position.z = (-t * 0.03) + 100;
  containerList.forEach((container)=>{moveContainer(container, t)})
  }
  if (t > 2500 && t < 4800) {
    gridEdge.rotation.y -= 0.5
    camera.position.z = (-t * 0.03) + 100;
    containerList.forEach((container)=>{moveContainer(container, t)})
    camera.rotation.y = -(t-2500)*0.00015;
    camera.position.x = (t-2500)*0.0001;
  }
}

function animate() {
  controls.update(0.05)



  // torus.rotation.x += 0.005;
  // torus.rotation.y += 0.01;
  // torus.rotation.z += 0.005;
  cubeList.forEach((cube)=>cube.rotation.x += 0.008)
  requestAnimationFrame(animate);
  camera.layers.set(1);
  bloomComposer.render();
}
document.body.onscroll = moveCamera;
moveCamera();
animate();

// Miscellaneous

