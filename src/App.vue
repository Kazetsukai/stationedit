<template>
  <div id="app">
    <LevelLoadSave :world="world" />
    <LevelView3D :world="world" />
  </div>
</template>

<script>
import LevelView3D from './components/LevelView3D';
import LevelLoadSave from './components/LevelLoadSave';

export default {
  name: 'app',
  data () {
    return {
      world: undefined
    }
  },
  created () {
    var vm = this;
    document.bus.$on("world-loaded", (world) => {
      vm.world = world;
    });
  },
  components: {
    LevelView3D,
    LevelLoadSave
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
