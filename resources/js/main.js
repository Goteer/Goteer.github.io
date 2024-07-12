import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/*const renderer = new THREE.WebGLRenderer(
    {
        canvas: document.getElementsByClassName("threeD-canvas")[0],

    }
);

const renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );



renderer.setSize( window.innerWidth, window.innerHeight*0.75 );
window.addEventListener('resize', function(event) {
    renderer.setSize( window.innerWidth, window.innerHeight*0.75 );
}, true);*/


let camera, scene, renderer, clock, mixer;
var animations = [];

function init() {
	// Init scene
	scene = new THREE.Scene();
	clock = new THREE.Clock();

// loading model
var loader = new GLTFLoader();
var obj
loader.load( '/resources/3d/GH Pages Env.glb',
    function ( gltf ) {
        camera = gltf.cameras[ '0' ]; //if you have one camera or you need the first
        mixer = new THREE.AnimationMixer( gltf.scene );
        animations.push(mixer.clipAction( gltf.animations[ 0 ] ));

        obj = gltf.scene

        scene.add( obj );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        startTour();
},
// called while loading is progressing
function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    if (xhr.loaded / xhr.total * 100 == 100) {
        console.log('Model loaded.')
        scene.background = new THREE.Color( '#21282F' );
    }
},
// called when loading has errors
function ( error ) {
    console.log( 'An error happened' );
    console.log (error);
}
);

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth*0.99 / window.innerHeight,
		0.1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        physicallyCorrectLights:true,
        canvas: document.getElementsByClassName("threeD-canvas")[0],
     });

	// Set size (whole window)
	renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.747);

	// Render to canvas element
	//document.body.appendChild(renderer.domElement);
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame( animate );

	var delta = clock.getDelta();

	if ( mixer ) mixer.update( delta );

	renderer.render( scene, camera );

}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth*0.99 / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.747);
}

function startTour(){
   animations[0].play();
   //console.log(animations);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

