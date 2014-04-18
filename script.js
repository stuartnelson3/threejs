var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);
// set up the sphere vars
var radius = 1,
segments = 16,
rings = 16;

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var sphereMaterial =
    new THREE.MeshLambertMaterial({color:0x00ff00});
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry( radius, segments, rings),
  sphereMaterial);

// add the sphere to the scene
scene.add(sphere);

var pointLight =
    new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

function calculateLightOrbit(position, r, theta) {
  // theta is the angle passed
  position.x = Math.cos(theta) * r
  position.z = Math.sin(theta) * r
}

angle = 0
var render = function () {
  requestAnimationFrame(render);

  sphere.rotation.x += 0.1;
  sphere.rotation.y += 0.1;

  calculateLightOrbit(
    pointLight.position,
    pointLight.position.y,
    angle
  );
  angle += 0.1

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();
