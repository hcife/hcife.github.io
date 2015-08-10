var renderer,
    scene,
    camera,
    cube,
    animating = false;

function init() {
    var can = document.getElementById('can');
    render = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(can.offsetWidth, can.offsetHeight);
    can.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, can.offsetWidth / can.offsetHeight, 1, 4000);
    camera.position.set(0, 0, 3);
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);
    var mapURL = '../bg.jpg';
    var map = THREE.ImageUtils.loadTexture(mapURL);
    var material = new THREE.MeshPhongMaterial({
        map: map
    });
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    cube = new THREE.Mesh(geometry, material);

    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);
    addMouseHandler();
    run();
}

function run() {
    renderer.render(scene, camera);
    if (animating) {
        cube.rotation.y -= 0.02;
    }
    requestAnimationFrame(run);
}

function addMouseHandler() {
    var dom = renderer.domElement;
    dom.addEventListener('mouseup', function() {
        animating = !animating;
    }, false);
}

window.onload=init;