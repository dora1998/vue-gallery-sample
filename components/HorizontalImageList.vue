<template>
  <div :class="`${$options.name}__root`">
    <div
      v-for="(image, i) in images"
      :key="image.id"
      class="image"
      @click="onClickImage(i)"
    >
      <img :src="image.previewURL" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export interface ImageItem {
  id: number
  largeImageURL: string
  previewURL: string
  tags: string
}

export default Vue.extend({
  name: 'HorizontalImageList',
  props: {
    images: {
      type: Array,
      default: () => []
    } as PropOptions<ImageItem[]>
  },
  methods: {
    onClickImage(i: number) {
      this.$router.push(`/?id=${i + 1}`)
    }
  }
})
</script>

<style lang="scss">
.HorizontalImageList {
  &__root {
    width: 100%;
    height: 100px;
    overflow-x: auto;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
  }
}
.image {
  min-width: 100px;
  height: 100px;
  margin-right: 16px;
  cursor: pointer;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
