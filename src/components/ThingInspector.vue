<template>
  <div class="inspector">
    <h3>{{thing.name}}</h3>
    <ul>
      <li>{{thing.type}}</li>
      <li>{{thing.pos}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['thing']
}
</script>

<style scoped>
  
</style>