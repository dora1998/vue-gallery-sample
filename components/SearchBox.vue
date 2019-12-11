<template>
  <div :class="`${$options.name}__root`">
    <input type="text" class="query" />
    <button class="search">検索</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SearchBox'
})
</script>

<style lang="scss">
.SearchBox {
  &__root {
    width: 100%;
    max-width: 480px;
    margin: 16px auto;
    display: flex;
    flex-direction: row;
  }
}
.query {
  flex-grow: 1;
}
</style>
