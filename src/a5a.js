import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const texLoader = new THREE.TextureLoader();
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

let cat, cylinder, box, floor, sphere = null;

const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
addBox();
addFloor();
addSphere();
addCylinder();
addCat();
addLight();
adjustCamera();
animate();

	

function animate() {
	requestAnimationFrame( animate );

	box.rotation.x += 0.01;
	box.rotation.y += 0.01;

	cylinder.rotation.x -= 0.01;
	cylinder.rotation.y -= 0.01;
	if(cat != null)
		cat.rotation.z += 0.01;
	renderer.render( scene, camera );
}

function addBox()
{
	const texture = texLoader.load( 'textures/fish.jpg' );
	texture.colorSpace = THREE.SRGBColorSpace;
	const boxGeo = new THREE.BoxGeometry( 20, 20, 20 );
	const boxMat = new THREE.MeshBasicMaterial({
		color: 0xFF8844,
		map: texture,
	});
	box = new THREE.Mesh( boxGeo, boxMat );
	box.translateX(-50);
	scene.add( box );
}

function addFloor()
{
	const floorGeo = new THREE.BoxGeometry( 800, 800, 20 );
	const floorMat = new THREE.MeshBasicMaterial( {color: 0x0000FF} );
	floor = new THREE.Mesh( floorGeo, floorMat );
	floor.translateZ(-30);
	scene.add( floor );
}

function addCylinder()
{
	const cylGeo = new THREE.CylinderGeometry(10, 10, 40 );
	const cylMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	cylinder = new THREE.Mesh( cylGeo, cylMat );
	cylinder.translateX(50);
	scene.add( cylinder );
}

function addSphere()
{
	const sphGeo = new THREE.SphereGeometry(8);
	const sphMat = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	sphere = new THREE.Mesh( sphGeo, sphMat );
	sphere.translateZ(70);
	sphere.translateY(50);
	scene.add( sphere );
}

function addCat()
{
	mtlLoader.load('cat/12221_Cat_v1_l3.mtl', (mtl) => {
		mtl.preload();
		objLoader.setMaterials(mtl);
		objLoader.load(
			// resource URL
			'cat/12221_Cat_v1_l3.obj',
			// called when resource is loaded
			function ( object ) {
				cat = object;
				scene.add( object );
			},
			// called when loading is in progresses
			function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				console.log( 'An error happened' );
			});
	});
}

function addLight()
{
	const lColor = 0xFFFFFF;
    const lIntensity = 2;
    const light = new THREE.DirectionalLight(lColor, lIntensity);
    light.position.set(50, -100, 150);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
}

function adjustCamera()
{
	camera.position.z = 20;
	camera.position.y = -50;
	camera.rotateX(Math.PI/2)
}


