<template>
  <div id="app">
    <LevelLoadSave />
    <LevelView3D />
  </div>
</template>

<script>
import LevelView3D from './components/LevelView3D';
import LevelLoadSave from './components/LevelLoadSave';

export default {
  name: 'app',
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
