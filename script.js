var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);

// set up the sphere vars
var radius = 1,
segments = 90;
// # of polygons used to render circle.
// more polygons == smoother sphere.
var rings = segments;

// create sphere material and geometry
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
dx = 0.1
dy = 0.2
dz = 0.3

var xBoundary = window.innerWidth/296.30769
var yBoundary = window.innerHeight/318.46153
var zBoundary = 3

var render = function () {
  requestAnimationFrame(render);

  sphere.position.z += dz
  if (sphere.position.z >= 2 || sphere.position.z <= -10) {
    dz *= -1
  }
  sphere.position.x += dx
  if (sphere.position.x >= xBoundary || sphere.position.x <= -xBoundary) {
    dx *= -1
  }
  sphere.position.y += dy
  if (sphere.position.y >= yBoundary || sphere.position.y <= -yBoundary) {
    dy *= -1
  }

  // sphere.rotation.x += 0.1;
  // sphere.rotation.y += 0.1;

  calculateLightOrbit(
    pointLight.position,
    pointLight.position.y,
    angle
  );
  angle += 0.05

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();
