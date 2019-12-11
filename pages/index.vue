<template>
  <div class="container">
    <img
      class="preview-img"
      src="https://pixabay.com/get/55e0d340485aa814f6da8c7dda79367c1739d8ed57516c4870287dd49544c15cbe_1280.jpg"
    />
    <horizontal-image-list :images="imgs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HorizontalImageList from '@/components/HorizontalImageList.vue'

export default Vue.extend({
  components: {
    HorizontalImageList
  },

  data() {
    return {
      imgs: []
    }
  },

  validate({ query }) {
    if ('id' in query) {
      return !isNaN(+query.id)
    }
    return true
  },

  async mounted() {
    const res: any = await this.$http.$get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_APIKEY}&q=yellow+flowers&image_type=photo`
    )
    this.imgs = res.hits
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
