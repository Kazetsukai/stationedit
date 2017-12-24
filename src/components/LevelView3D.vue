<template>
	<div class="level-view"></div>
</template>

<script>
import {Scene, PerspectiveCamera, WebGLRenderer, BoxBufferGeometry, MeshPhongMaterial, Mesh, SmoothShading, DirectionalLight, AmbientLight, Group, Quaternion, Vector3, Vector2, Raycaster} from 'three';

let renderer, scene, camera, levelGroup, dirLight, ambLight;
let didSetup;
let rotX = -0.8, rotY = 0;

let meshThingMap = [];
let raycaster = new Raycaster();
let oldMaterial;
let selectedMaterial;

let renderFunc = render;
let keys = [];

function render() {
  let forward = camera.getWorldDirection();
  forward.multiplyScalar(0.3);

  // Get keys
  if (keys[87]) { // W
    camera.position.add(forward);
  }
  if (keys[65]) { // A
    //camera.position.add(forward);
  }
  if (keys[83]) { // S
    camera.position.add(forward.multiplyScalar(-1));
  }
  if (keys[68]) { // D
    //camera.position.add(forward);
  }

  // Update camera rotation
  camera.setRotationFromQuaternion(new Quaternion(0, 0, 0, 1));
  camera.rotateOnWorldAxis(new Vector3(1, 0, 0), rotX);
  camera.rotateOnWorldAxis(new Vector3(0, 1, 0), rotY);


  renderer.render( scene, camera );
  window.requestAnimationFrame(renderFunc);
}

let oldX, oldY;
function mouseMove(ev) {
  if (oldX) {
    rotY -= ev.movementX / 1000;
    rotX -= ev.movementY / 1000;
  }

  oldX = ev.offsetX;
  oldY = ev.offsetY;
}

function init(world) {
  meshThingMap = [];

  camera = new PerspectiveCamera( 70, 1, 1, 1000 );

  camera.position.z = 50;
  camera.position.y = 50;

  camera.rotation.x = -0.8;

  scene = new Scene();

  let smlGeo = new BoxBufferGeometry( 0.2, 0.2, 0.2 );
  let midGeo = new BoxBufferGeometry( 1, 1, 1 );
  let bigGeo = new BoxBufferGeometry( 2, 2, 2 );
  let whiteMat = new MeshPhongMaterial( { color: 0xffffff, shading: SmoothShading } );
  let redMat = new MeshPhongMaterial( { color: 0xff1111, shading: SmoothShading } );
  let greenMat = new MeshPhongMaterial( { color: 0x11ff11, shading: SmoothShading } );
  selectedMaterial = new MeshPhongMaterial( { color: 0xffff11, shading: SmoothShading } );


  dirLight = new DirectionalLight( 0xffffdd, 0.5 );
  dirLight.position.set( -10, 300.75, 500 );
  scene.add( dirLight );

  ambLight = new AmbientLight( 0xffffff, 0.5 );
  scene.add( ambLight );

  levelGroup = new Group();

  world.things.forEach((thing) => {
    let mesh;
    
    if (thing.type.indexOf('StructureFrame', 0) === 0) {
      mesh = new Mesh( bigGeo, whiteMat );
    } else if (thing.parent) {
      mesh = new Mesh( smlGeo, greenMat );
    } else {
      mesh = new Mesh( midGeo, redMat );
    } 

    mesh.position.x = thing.pos.x;
    mesh.position.y = thing.pos.y;
    mesh.position.z = thing.pos.z;

    levelGroup.add(mesh);

    thing.mesh = mesh;
    meshThingMap[thing.mesh.uuid] = thing;
  });

  scene.add(levelGroup);
}

export default {
  props: [ 'world', 'selected' ],
  watch: {
    world: function (world) {
      init(world);

      window.requestAnimationFrame(render);
      didSetup = true;
    },
    selected: function(thing, oldThing) {
      if (oldThing.mesh) {
        oldThing.mesh.material = oldMaterial;
      }

      oldMaterial = thing.mesh.material;
      thing.mesh.material = selectedMaterial;

      oldThing = thing;
    }
  },
  mounted () {
    window.onkeyup = function(e) {
      keys[e.keyCode]=false; 
      //console.log(e.keyCode);
    }
    window.onkeydown = function(e) {keys[e.keyCode]=true;}

    renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( 600, 600 );
    this.$el.appendChild( renderer.domElement );    

    // Set up mouse locking
    renderer.domElement.oncontextmenu = function (ev) {
      return false;
    }
    renderer.domElement.onmousedown = function (ev) {
      if (ev.button === 2) { // Right click - drag to look around
        renderer.domElement.requestPointerLock();
        document.addEventListener("mousemove", mouseMove, false);
      } else if (ev.button === 0) { // Left click - select
        let clickPos = new Vector2((ev.offsetX / ev.target.clientWidth) * 2 - 1, -(ev.offsetY / ev.target.clientHeight) * 2 + 1);
        console.log(clickPos);
        raycaster.setFromCamera( clickPos, camera );
        var intersects = raycaster.intersectObjects( levelGroup.children );
        if (intersects.length) {
          document.bus.$emit("thing-selected", meshThingMap[intersects[0].object.uuid]);
        }
      }
      return false;
    };
    renderer.domElement.onmouseup = function (ev) {
      document.exitPointerLock();
      document.removeEventListener("mousemove", mouseMove, false);
      return false;
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
