<template>
  <div>
    <h3>Players:</h3>
    <ul class="player-list">
      <li v-for="player in players">
        {{player.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['players']
}
</script>

<style scoped>

</style>
