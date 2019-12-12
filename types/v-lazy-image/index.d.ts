// Type definitions for v-lazy-image 1.3.2
// Project: https://github.com/alexjoverm/v-lazy-image

declare module 'v-lazy-image' {
  import { Component, PluginObject, PropOptions } from 'vue'

  interface Data {
    observer: IntersectionObserver | null
    intersected: boolean
    loaded: boolean
  }
  interface Methods {
    load: () => void
  }
  interface Computed {
    srcImage: () => string
    srcsetImage: () => string | boolean
  }
  interface Props {
    src: PropOptions<string>
    srcPlaceholder: PropOptions<string>
    srcset: PropOptions<string>
    intersectionOptions: PropOptions<IntersectionObserverInit>
    usePicture: PropOptions<boolean>
  }
  const VLazyImageComponent: Component<Data, Methods, Computed, Props>

  export default VLazyImageComponent
  export const VLazyImagePlugin: PluginObject<any>
}
