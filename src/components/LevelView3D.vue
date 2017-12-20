<template>
	<canvas width="800" height="600"></canvas>
</template>

<script>
export default {
  name: 'LevelView3D',
  mounted: function(el) {
    var ctx = this.$el.getContext('2d');

    function clearScreen() {
      ctx.fillStyle = 'rgba(17, 17, 17, 1)';
      ctx.fillRect(0, 0, 800, 600);
    }

    function drawObj(obj) {
      if (obj.type.indexOf("StructureFrame", 0) === 0) {
        ctx.fillStyle = 'rgba(200, 200, 200, 1)';
      } else {
        ctx.fillStyle = 'rgba(200, 150, 150, 1)';
      }
      ctx.fillRect(obj.pos.x*1 + 300, obj.pos.z*1 + 300, 1, 1);
    }

    clearScreen();

    document.bus.$on("world-loaded", (world) => {
      clearScreen();

      world.things.forEach((thing) => {
        drawObj(thing);
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
