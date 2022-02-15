import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(new THREE.Color('#000210'), 1);
camera.position.setZ(3);

renderer.render( scene, camera );

const torusGeometry = new THREE.TorusGeometry( 1, .2, 16, 100 );
const particleGeometry = new THREE.BufferGeometry;
const particlesCount = 1000;

const posArr = new Float32Array(particlesCount * 3);

for ( let i = 0; i < particlesCount * 3; i++ ) {
  posArr[i] = (Math.random() - 0.5) * 7;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

const material = new THREE.PointsMaterial({
  size: 0.001,
});

const particleMaterial = new THREE.PointsMaterial({
  size: 0.001,
})

const torus = new THREE.Points( torusGeometry, material );
const particleMesh = new THREE.Points( particleGeometry, particleMaterial );

scene.add(torus, particleMesh);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.z += 0.001;
  particleMesh.rotation.x += 0.0075;
  particleMesh.rotation.y += 0.0075;

  controls.update();

  renderer.render( scene, camera );
}

animate();
