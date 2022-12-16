//my module
function randRange(numA, numB){
  return ((numB-numA)*Math.random())+numA
}

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
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);
camera.updateProjectionMatrix();

// //flying camera
// let controls = new FlyControls( camera, renderer.domElement );
// controls.movementSpeed = 100;
// controls.rollSpeed = Math.PI / 24;
// controls.autoForward = false;
// controls.dragToLook = true;
// const axesHelper = new THREE.AxesHelper( 1000  );
// scene.add( axesHelper );

//lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(100, 100, 100);
scene.add(pointLight)

//  cubes !!
function addWireFrameCube() {
  const cubeGeometry = new THREE.BoxGeometry(7,7,7);
  const cubeGeo = new THREE.EdgesGeometry( cubeGeometry ); // or WireframeGeometry( geometry )
  const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  const wireframe = new THREE.LineSegments( cubeGeo, mat );
  let [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));
  x /= 2;
  wireframe.position.set(x, y, z-50);
  wireframe.rotation.x = randRange(0,360);
  wireframe.rotation.y = randRange(0,360);
  wireframe.rotation.z = randRange(0,360);
  scene.add(wireframe);
  return wireframe;
}
function addBigWireFrameCube() {
  const cubeBigGeometry = new THREE.BoxGeometry(20,20,20);
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
  scene.add(wireframe);
  return wireframe;
}
for (let index = 0; index < 10; index++) {
  addWireFrameCube()
  cubeList.push(addWireFrameCube())
  cubeList.push(addWireFrameCube())
}
for (let index = 0; index < 1; index++) {
  addBigWireFrameCube()
  cubeList.push(addWireFrameCube())
}

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

  if (x1 == -50)  {array[i+2] = z1;}
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

function moveContainer(container, t){
  const y = container.y;
  const speed = container.speed;
  const d = container.direction;

  container.position.y  = d*(50+y)-d*(t-200)*(0.06+speed)
}

function moveCamera() {
  const t = -document.body.getBoundingClientRect().top;
  camera.position.z = (-t * 0.025) + 100;

  if (t < 2500) {
  gridEdge.rotation.y -= 0.5
  containerList.forEach((container)=>{moveContainer(container, t)})
  }
  if (t > 2500) {
    gridEdge.rotation.y -= 0.5
    containerList.forEach((container)=>{moveContainer(container, t)})
    camera.rotation.y = -(t-2500)*0.00015;
    camera.position.x = (t-2500)*0.00015;
  }
}

function animate() {
  // controls.update(0.05)

  cubeList.forEach((cube)=>cube.rotation.x += 0.009)
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
document.body.onscroll = moveCamera;
moveCamera();
animate();

// Miscellaneous
