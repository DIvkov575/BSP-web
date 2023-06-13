// import "./main.scss";
// import  "./assets/terms.txt";
// import "./assets/logo1.png";
// import  "./assets/loading3.gif";
// import "./assets/favicon.svg";

// require('./main.scss');
require('./home.html');
// require('./assets/terms.txt');
// require('./assets/logo1.png');
// require('./assets/loading3.gif');
// // require('./assets/favicon.svg');

class FullCanvas {
  constructor() {
    this.prev_t = 0;
    this.cubeList = [];
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
    this.pointLight = new THREE.PointLight(0xffffff, 1);
    this.gridGeo = new THREE.SphereGeometry( 500, 150,100);
    this.gridMat = new THREE.MeshPhongMaterial( { color: 0x000000 } );
    this.grid = new THREE.Mesh( this.gridGeo, this.gridMat );

    this.gridEdge = new THREE.EdgesHelper(this.grid, 0xaaaaff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.setZ(30);
    this.camera.position.setX(-4);
    this.renderer.render(this.scene, this.camera);
    this.camera.updateProjectionMatrix();
    this.pointLight.position.set(100, 100, 100);
    this.scene.add(this.pointLight)
    for (let index = 0; index < 30; index++) { this.cubeList.push(this.addWireFrameCube(7)) }
    this.grid.position.x -= 505.1
    this.gridEdge.position.x -= 505;
    this.gridEdge.material.linewidth = 3;
    this.scene.add(this.grid);
    this.scene.add(this.gridEdge);
    let planeShape = new THREE.PlaneGeometry(150,350,20,25)
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x66554d , side:THREE.DoubleSide,flatShading:THREE.FlatShading});
    let plane = new THREE.Mesh( planeShape, planeMaterial );
    const {array} = plane.geometry.attributes.position;
    for (let i = 0; i < array.length; i+=9) {
      const x1 = array[i];
      const y1 = array[i+1];
      const z1 = array[i+2];
      if ((y1 > -25 && y1 <25) || (x1 <= -25)) {
        array[i + 2] = z1 + 15 * Math.random();
      } else {array[i + 2] = z1 + 30 * Math.random();}
    }
    this.scene.add(plane);
    plane.rotation.y = Math.PI/2;
    plane.position.z -= 150
    plane.position.x -= 10
    this.camera.rotation.z = -Math.PI/2
    this.camera.rotation.y -= 0.1;
  }
  animate = () => {
    this.cubeList.forEach((cube)=>cube.rotation.x += 0.009);
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
  addWireFrameCube = (size) => {
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
    this.scene.add(wireframe);
    return wireframe;
  }

  moveCamera = () => {
    const t = document.body.getBoundingClientRect().top;
    const diff = this.prev_t-t;
    // console.log(this.prev_t)
    // console.log(t);
    // console.log(diff);
    // console.log("------------")
    this.camera.position.z = (-t * 0.03) + 100;
    this.gridEdge.rotation.y -= diff * 0.001;
    this.prev_t = t;
  }

}
let canv = new FullCanvas();
if (visualViewport != null) {visualViewport.addEventListener("resize", (event) => {canv = new FullCanvas();});}
window.onscroll = () => {canv.moveCamera();}
canv.moveCamera()
canv.animate()

const form = document.getElementById('form1'); 
const termsButton=  document.getElementById('check1');
const button1 = document.querySelector("#b2") ;
button1.addEventListener('click', buttonFunc1);

function buttonFunc1(e){
    e.preventDefault()
    let input = []

    input.push((form.elements[0]).value);
    for (let i = 1; i < 3; i++){
        if (form.elements[i].value.length <= 1) {alert("Input value too short or Missing"); return;}
        if (form.elements[i].value.length >= 50) { alert("Please shorten input"); return;}
        input.push((form.elements[i]).value)
    }
    if (!termsButton.checked) {alert("Please check that you have read terms and conditions"); return;}
    submit(input)
    form.reset();
}

async function submit(input){
    // console.log(input)
    const res = await fetch(window.location.href, {
        method: 'POST',
        headers: {
        "Content-Type":"application/json"
    },
        body: JSON.stringify({
        parcel: input.join(', ') 
        })
    })
    alert("Message Sending");
}
console.log("TS connected");