//setup
// import three from './three/three.js';
let t = 0
let cubeList = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);
camera.updateProjectionMatrix();

//lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(100, 100, 100);
scene.add(pointLight)

//  cubes !!
function addWireFrameCube(size) {
  const cubeGeometry = new THREE.BoxGeometry(size, size, size);
  const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); // or WireframeGeometry( geometry )
  const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  const wireframe = new THREE.LineSegments( cubeGeo, mat );
  let [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));
  x /= 2;
  wireframe.position.set(x, y, z-50);
  wireframe.rotation.x = THREE.MathUtils.randFloatSpread(360);
  wireframe.rotation.y = THREE.MathUtils.randFloatSpread(360);
  wireframe.rotation.z = THREE.MathUtils.randFloatSpread(360);
  scene.add(wireframe);
  return wireframe;
}
for (let index = 0; index < 20; index++) { cubeList.push(addWireFrameCube(7)) }
for (let index = 0; index < 7; index++) { addWireFrameCube(20) }

// grid
let gridGeo = new THREE.SphereGeometry( 500, 150,100);
let gridMat = new THREE.MeshPhongMaterial( { color: 0x000000 } );
let grid = new THREE.Mesh( gridGeo, gridMat );
let gridEdge = new THREE.EdgesHelper(grid, 0xaaaaff);
grid.position.x -= 505.1
gridEdge.position.x -= 505;
gridEdge.material.linewidth = 3;
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

  // if (x1 == -50)  {array[i+2] = z1;}
  if ((y1 > -25 && y1 <25) || (x1 <= -25)) {
    array[i + 2] = z1 + 15 * Math.random();
  } else {array[i + 2] = z1 + 30 * Math.random();}
}
scene.add(plane);

plane.rotation.y = Math.PI/2;
plane.position.z -= 150
plane.position.x -= 10
camera.rotation.z = -Math.PI/2
camera.rotation.y -= 0.1;

function moveCamera() {
  const t = -document.body.getBoundingClientRect().top;
  camera.position.z = (-t * 0.025) + 100;

  if (t < 2500) {
  gridEdge.rotation.y -= 0.2 
  }
  if (t > 2500) {
    gridEdge.rotation.y -= 0.02
    camera.rotation.y = -(t-2500)*0.00015;
    camera.position.x = (t-2500)*0.00015;
  }
}

function animate() {
  cubeList.forEach((cube)=>cube.rotation.x += 0.009)
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
document.body.onscroll = moveCamera;
moveCamera();
animate();
