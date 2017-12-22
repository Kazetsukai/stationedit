<template>
	<div class="view3d"></div>
</template>

<script>
import {Scene, PerspectiveCamera, WebGLRenderer, BoxBufferGeometry, MeshPhongMaterial, Mesh, SmoothShading, DirectionalLight, AmbientLight, Group, Quaternion, Vector3} from 'three';

export default {
  name: 'LevelView3D',
  mounted: function() {
    let didSetup;
    let renderer, scene, camera, levelGroup, dirLight, ambLight;
    let vm = this;

    let keys = [];
    window.onkeyup = function(e) {keys[e.keyCode]=false;}
    window.onkeydown = function(e) {keys[e.keyCode]=true;}

    let rotX = 0, rotY = 0;

    let renderFunc = render;

    function render() {
      let forward = camera.getWorldDirection();
      forward.multiplyScalar(0.1);

      // Get keys
      if (keys[87]) { // W
        camera.position.add(forward);
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
      camera = new PerspectiveCamera( 70, 1, 1, 1000 );
      
      camera.position.z = 50;
      camera.position.y = 50;

      camera.rotation.x = -0.8;

      scene = new Scene();
      let geometry = new BoxBufferGeometry( 1, 1, 1 );
      let bigGeo = new BoxBufferGeometry( 2, 2, 2 );
      let whiteMat = new MeshPhongMaterial( { color: 0xffffff, shading: SmoothShading } );
      let redMat = new MeshPhongMaterial( { color: 0xff1111, shading: SmoothShading } );

      renderer = new WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( 600, 600 );
      vm.$el.appendChild( renderer.domElement );

      // Set up mouse locking
      renderer.domElement.oncontextmenu = function (ev) {
        return false;
      }
      renderer.domElement.onmousedown = function (ev) {
        if (ev.button === 2) {
          renderer.domElement.requestPointerLock();
          document.addEventListener("mousemove", mouseMove, false);
        }
        return false;
      };
      renderer.domElement.onmouseup = function (ev) {
        document.exitPointerLock();
        document.removeEventListener("mousemove", mouseMove, false);
        return false;
      };

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
        } else {
          mesh = new Mesh( geometry, redMat );
        }

        mesh.position.x = thing.pos.x;
        mesh.position.y = thing.pos.y;
        mesh.position.z = thing.pos.z;

        levelGroup.add(mesh);
      });

      scene.add(levelGroup);
    }

    document.bus.$on("world-loaded", (world) => {
      // Cleanup
      if (didSetup) {
        vm.$el.removeChild( renderer.domElement );
      }

      init(world);

      window.requestAnimationFrame(render);
      didSetup = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
