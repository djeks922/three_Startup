import "./style.css";
import * as THREE from "three";
import dat from 'dat.gui';
import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertex from "./shaders/vertex.glsl";
import vertexP from './shaders/points_vertex.glsl';
import fragment from "./shaders/fragment.glsl";


/**
 *  Main
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Dat Gui
const gui = new dat.GUI();


// Parameters for gui
const parameters = {};



// CURL NOISE FUNC
// const SimplexNoise = require("simplex-noise"),
//   simplex = new SimplexNoise(Math.random);

// function computeCurl(x, y, z) {
//   var eps = 0.0001;

//   var curl = new THREE.Vector3();

//   //Find rate of change in YZ plane
//   var n1 = simplex.noise3D(x, y + eps, z);
//   var n2 = simplex.noise3D(x, y - eps, z);
//   //Average to find approximate derivative
//   var a = (n1 - n2) / (2 * eps);
//   var n1 = simplex.noise3D(x, y, z + eps);
//   var n2 = simplex.noise3D(x, y, z - eps);
//   //Average to find approximate derivative
//   var b = (n1 - n2) / (2 * eps);
//   curl.x = a - b;

//   //Find rate of change in XZ plane
//   n1 = simplex.noise3D(x, y, z + eps);
//   n2 = simplex.noise3D(x, y, z - eps);
//   a = (n1 - n2) / (2 * eps);
//   n1 = simplex.noise3D(x + eps, y, z);
//   n2 = simplex.noise3D(x - eps, y, z);
//   b = (n1 - n2) / (2 * eps);
//   curl.y = a - b;

//   //Find rate of change in XY plane
//   n1 = simplex.noise3D(x + eps, y, z);
//   n2 = simplex.noise3D(x - eps, y, z);
//   a = (n1 - n2) / (2 * eps);
//   n1 = simplex.noise3D(x, y + eps, z);
//   n2 = simplex.noise3D(x, y - eps, z);
//   b = (n1 - n2) / (2 * eps);
//   curl.z = a - b;

//   return curl;
// }

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Object
 */

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uResolution: {value : new THREE.Vector2(sizes.width,sizes.height)},
    uMouse: {value: new THREE.Vector2(0,0)}
  },
  vertexShader: vertexP,
  fragmentShader: fragment,
  // transparent: true,
  side: THREE.DoubleSide,
});
const materialSecond = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uResolution: {value : new THREE.Vector2(sizes.width,sizes.height)},
    uMouse: {value: new THREE.Vector2(0,0)}
  },
  vertexShader: vertex,
  fragmentShader: fragment,
  // transparent: true,
  side: THREE.DoubleSide,
});

const geometry = new THREE.PlaneBufferGeometry(1,1,10,10)

const mesh = new THREE.Points(geometry,material)
scene.add(mesh);

/**
 *   Raycast Func 
 * */

// const mouse = new THREE.Vector2();

// function raycast(objects){

//   const raycaster = new THREE.Raycaster();

//   window.addEventListener("mousemove", onMouseMove);
//   function onMouseMove(event) {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects([]);
//     if (intersects.length > 0) {
    
//       // console.log(intersects)
//     }
//   }
// };



window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.0001,1000);
// gsap.fromTo(camera.position,{z:-1},{duration:10,z:1})
// gsap.to(camera.position,{z:-1,delay:10})
camera.position.z = 1
scene.add(camera);

/**
 *  Controls
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(new THREE.Color("rgb(0,0,20)"));
// renderer.autoClear = false;
/**
 *  Main
 */


/**
 *  Animation
 */
const clock = new THREE.Clock();
const animate = () => {
  // Time
  let elapseTime = clock.getElapsedTime();

  // Controls update
  controls.update();

  // camera

 

  // renderer
  renderer.render(scene,camera)
  

  // recall animationFunc

  window.requestAnimationFrame(animate);
};

animate();

