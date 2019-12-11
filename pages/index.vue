<template>
  <div class="container">
    <search-box />
    <img
      class="preview-img"
      src="https://pixabay.com/get/55e0d340485aa814f6da8c7dda79367c1739d8ed57516c4870287dd49544c15cbe_1280.jpg"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchBox from '@/components/SearchBox.vue'

export default Vue.extend({
  components: {
    SearchBox
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.preview-img {
  flex-grow: 1;
  object-fit: contain;
}
</style>
