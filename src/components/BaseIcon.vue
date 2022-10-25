<template>
  <i :style="iconSize">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="icon.viewBox"
      v-html="icon.path"
      :style="iconSize"
    ></svg>
  </i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import icons from '@/assets/icons'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: Number,
    iconOnly: Boolean
  },
  computed: {
    icon() {
      return icons.find((el) => el.name === this.name)
    },
    iconSize() {
      if (this.iconOnly) return `width: ${this.size}px; height: ${this.size}px;`
      return `height: ${this.size}px`
    }
  }
})
</script>

<style lang="scss" scoped>
i {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
</style>
