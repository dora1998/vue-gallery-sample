<template>
  <div class="container">
    <img
      class="preview-img"
      :src="imgs.length > 0 ? imgs[selected].largeImageURL : ''"
    />
    <div class="list">
      <horizontal-image-list :images="imgs" :selected="selected" />
    </div>
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

  computed: {
    selected() {
      return 'id' in this.$route.query ? Number(this.$route.query.id) - 1 : 0
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.preview-img {
  flex-grow: 1;
  object-fit: contain;
}
.list {
  flex-basis: 100px;
}
</style>
