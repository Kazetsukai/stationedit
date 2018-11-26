<template>
  <div class="inspector">
    <h3>{{thing.name}}</h3>
    <ul>
      <li>{{thing.type}}</li>
      <li>{{thing.pos}}</li>
    </ul>
    <h5>Contents:</h5>
    <ThingList :things="thing.children" />
  </div>
</template>

<script>
import ThingList from './ThingList';

export default {
  props: ['thing'],
  components: {
    ThingList
  }
}
</script>

<style scoped>
.inspector {
  margin: 20px;
}
</style>