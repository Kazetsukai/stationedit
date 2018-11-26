<template>
  <div id="app">
    <div id="left-panel">
      <LevelLoadSave :world="world" />
      <h3>Players:</h3>
      <ThingList :things="players" />
    </div>
    <div id="center">
      <LevelView3D :world="world" :selected="selected" />
    </div>
    <div id="right-panel">
      <ThingInspector :thing="selected" />
    </div>
  </div>
</template>

<script>
import LevelView3D from './components/LevelView3D';
import LevelLoadSave from './components/LevelLoadSave';
import ThingList from './components/ThingList';
import ThingInspector from './components/ThingInspector';

import { filter } from 'lodash'

export default {
  name: 'app',
  data () {
    return {
      world: {},
      selected: {}
    }
  },
  computed: {
    players () {
      return filter(this.world.things, (t) => { return t && t.type === 'Character' });
    }
  },
  created () {
    let vm = this;
    let oldMaterial;

    document.bus.$on("world-loaded", (world) => {
      vm.world = world;
    });
    document.bus.$on("thing-selected", (thing) => {
      vm.selected = thing;
      // Mesh change here
    });
  },
  components: {
    LevelView3D,
    LevelLoadSave,
    ThingList,
    ThingInspector
  }
}
</script>

<style>
body {
  background: #f0f0f0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

#left-panel {
  display: flex;
  flex-direction: column;
}
</style>
