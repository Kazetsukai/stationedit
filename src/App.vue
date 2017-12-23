<template>
  <div id="app">
    <div id="side-panel">
      <LevelLoadSave :world="world" />
      <PlayerList :players="players" />
    </div>
    <div id="center">
      <LevelView3D :world="world" /> 
    </div>
  </div>
</template>

<script>
import LevelView3D from './components/LevelView3D';
import LevelLoadSave from './components/LevelLoadSave';
import PlayerList from './components/PlayerList';

import { filter } from 'lodash'

export default {
  name: 'app',
  data () {
    return {
      world: undefined
    }
  },
  computed: {
    players () {
      return this.world ? filter(this.world.things, (t) => { return t.type === 'Character' }) : [];
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
    LevelLoadSave,
    PlayerList
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
  display: flex;
}

#side-panel {
  display: flex;
  flex-direction: column;
}
</style>
