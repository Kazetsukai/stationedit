<template>
	<div class="view3d"></div>
</template>

<script>
import {Scene, PerspectiveCamera, WebGLRenderer, BoxBufferGeometry, MeshPhongMaterial, Mesh, SmoothShading, DirectionalLight, AmbientLight, Group} from 'three';

export default {
  name: 'LevelView3D',
  mounted: function() {
    var intervalID;
    var renderer, scene, camera, levelGroup, dirLight, ambLight;
    var vm = this;

    function render() {
      renderer.render( scene, camera );
    }

    var oldX, oldY;
    function mouseMove(ev) {
      if (oldX) {
        camera.rotation.y += ev.movementX / 1000;
        camera.rotation.x += ev.movementY / 1000;

        console.log(ev);
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
      var geometry = new BoxBufferGeometry( 1, 1, 1 );
      var bigGeo = new BoxBufferGeometry( 2, 2, 2 );
      var whiteMat = new MeshPhongMaterial( { color: 0xffffff, shading: SmoothShading } );
      var redMat = new MeshPhongMaterial( { color: 0xff1111, shading: SmoothShading } );

      renderer = new WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( 600, 600 );
      vm.$el.appendChild( renderer.domElement );

      // Set up mouse locking
      
      renderer.domElement.onmousedown = function (ev) {
        if (ev.button === 2) {
          renderer.domElement.requestPointerLock();
          document.addEventListener("mousemove", mouseMove, false);
        }
      };
      renderer.domElement.onmouseup = function (ev) {
        //document.exitPointerLock();
        //document.removeEventListener("mousemove", mouseMove, false);
      };

      dirLight = new DirectionalLight( 0xffffdd, 0.5 );
      dirLight.position.set( -10, 300.75, 500 );
      scene.add( dirLight );

      ambLight = new AmbientLight( 0xffffff, 0.5 );
      scene.add( ambLight );

      levelGroup = new Group();

      world.things.forEach((thing) => {
        var mesh;
        
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
      if (intervalID) {
        clearInterval(intervalID);
        vm.$el.removeChild( renderer.domElement );
      }

      init(world);

      // New render tick
      intervalID = setInterval(render, 16);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
