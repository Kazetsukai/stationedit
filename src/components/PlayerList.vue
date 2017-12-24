<template>
  <div>
    <h3>Players:</h3>
    <ul class="player-list">
      <li v-for="player in players" @click="selectPlayer(player)">
        {{player.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['players'],
  methods: {
    selectPlayer: function(player) {
      document.bus.$emit("thing-selected", player);
    }
  }
}
</script>

<style scoped>

</style>
