<template>
  <div ref="container" :class="`${$options.name}__root`">
    <div
      v-for="(image, i) in images"
      :key="image.id"
      :ref="`img-${i}`"
      class="image"
      :class="{ selected: selected == i }"
      @click="onClickImage(i)"
    >
      <v-lazy-image :src="image.previewURL" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import VLazyImage from 'v-lazy-image'

export interface ImageItem {
  id: number
  largeImageURL: string
  previewURL: string
  tags: string
}

export default Vue.extend({
  name: 'HorizontalImageList',

  components: {
    VLazyImage
  },

  props: {
    images: {
      type: Array,
      default: () => []
    } as PropOptions<ImageItem[]>,
    selected: {
      type: Number,
      default: 0
    } as PropOptions<number>
  },

  watch: {
    images: {
      async handler() {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.moveToSelectedImg(this.selected)
      }
    }
  },

  methods: {
    onClickImage(i: number) {
      this.$router.push(`/?id=${i + 1}`)
    },
    getImagePos(idx: number) {
      const imgRefs = this.$refs[`img-${idx}`]
      if (Array.isArray(imgRefs) && imgRefs.length > 0) {
        const imgRef = imgRefs[0] as Element
        return imgRef.getBoundingClientRect()
      } else {
        return null
      }
    },
    moveToSelectedImg(idx: number) {
      // 画像のdivの位置を取得
      const selectedPos = this.getImagePos(idx)
      if (selectedPos === null) return

      // 横スクロールリストの箱自体の位置を取得
      const containerRef = this.$refs.container as Element
      const containerRect = containerRef.getBoundingClientRect()

      // リスト内での画像中央位置を計算
      // * leftはページ全体での座標なので、コンテナ内での相対座標にするためにコンテナの左端座標を引く
      const centerPos =
        selectedPos.left + selectedPos.width / 2 - containerRect.left
      // セットすべきscrollLeftを計算
      const scrollLeftPos = centerPos - containerRect.width / 2

      containerRef.scrollLeft = scrollLeftPos
    }
  }
})
</script>

<style lang="scss" scoped>
.HorizontalImageList {
  &__root {
    width: 100%;
    height: 116px;
    overflow-x: auto;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
  }
}
.image {
  min-width: 50px;
  height: 100px;
  cursor: pointer;
  position: relative;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.selected {
    min-width: 100px;
    margin: 0 16px;
  }
}

.v-lazy-image {
  background-color: #ccc;
}
</style>
