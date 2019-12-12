<template>
  <div class="container">
    <div class="preview-img">
      <v-lazy-image
        v-if="imgs.length > 0"
        :src="imgs[selected].largeImageURL"
        :src-placeholder="imgs[selected].previewURL"
      />
    </div>
    <div class="list">
      <horizontal-image-list :images="imgs" :selected="selected" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VLazyImage from 'v-lazy-image'
import HorizontalImageList from '@/components/HorizontalImageList.vue'

export default Vue.extend({
  components: {
    HorizontalImageList,
    VLazyImage
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
      `https://pixabay.com/api/?key=${process.env.PIXABAY_APIKEY}&q=yellow+flowers&image_type=photo&per_page=50`
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
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .v-lazy-image {
    filter: blur(5px);
    &.v-lazy-image-loaded {
      filter: blur(0);
    }
  }
}
</style>
