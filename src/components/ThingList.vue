<template>
  <ul class="thing-list">
    <li class="thing-item" v-for="thing in things" @click="select(thing)">
      {{thing.name || thing.type}}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['things', 'title'],
  methods: {
    select: function(thing) {
      document.bus.$emit("thing-selected", thing);
    }
  }
}
</script>

<style scoped>
  .thing-item:hover {
    text-decoration: underline;
  }
</style>
