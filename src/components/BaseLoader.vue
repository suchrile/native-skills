<template>
  <div class="loader" :class="classes">
    <div class="loader__body">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    size: String,
    color: String
  },
  computed: {
    classes() {
      return [this.size, this.color]
    }
  }
})
</script>

<style lang="scss" scoped>
.loader {
  // size classes
  &.small {
    width: calc(80px / 3);
    height: calc(80px / 3);
  }

  // color classes
  &.blue div {
    border-color: $blue transparent transparent transparent;
  }

  &__body {
    position: relative;

    & div {
      position: absolute;
      width: calc(64px / 3);
      height: calc(64px / 3);
      margin: calc(8px / 3);
      border: calc(8px / 3) solid;
      border-radius: 50%;
      animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }
    & div:nth-child(1) {
      animation-delay: -0.45s;
    }
    & div:nth-child(2) {
      animation-delay: -0.3s;
    }
    & div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  body[theme='dark'] & {
    &.blue div {
      border-color: $blue transparent transparent transparent;
    }
  }
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}
</style>
