<template>
  <div
    v-if="isOpen"
    class="popup"
    :class="{ open: isVisible }"
    @click.self="close"
  >
    <div class="popup__body">
      <div class="popup__close" @click="close">
        <base-button
          view="icon grey"
          size="small"
          icon="xmark-regular"
          icon-only
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<!-- -------------------- USAGE -------------------- -->
<!-- <base-popup ref="popup"></base-popup> -->
<!-- async openPopup() { -->
<!--    const result = await this.$refs.popup.open() -->
<!--    if (result === false) { -->
<!--      alert('closed') -->
<!--    } -->
<!-- }, -->
<!-- -------------------- USAGE -------------------- -->

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: { BaseButton },
  popupController: null,
  data: () => ({
    isOpen: false,
    isVisible: false,
  }),
  methods: {
    async open() {
      let resolve
      let reject

      const promise = new Promise((ok, fail) => {
        resolve = ok
        reject = fail
      })
      this.$options.popupController = { resolve, reject }

      this.isOpen = true
      setTimeout(() => (this.isVisible = true))
      document.body.classList.add('no-scroll')

      return promise
    },
    close() {
      this.isVisible = false
      setTimeout(() => (this.isOpen = false), 300)
      document.body.classList.remove('no-scroll')

      this.$options.popupController.resolve()
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  transition: background-color 0.2s ease;
  &.open {
    background-color: rgba($color: #000000, $alpha: 0.25);
    .popup__body {
      transform: translateY(0);
    }
  }

  &__body {
    min-height: rem(100);
    margin: rem(10) rem(10) calc(env(safe-area-inset-bottom) + rem(10)) rem(10);
    padding: rem(15);
    border-radius: rem(16);
    background-color: $AppBackgroundColorLight;
    transform: translateY(calc(100% + rem(10)));
    transition: transform 0.3s cubic-bezier(0.32, 0.74, 0.3, 1.1);
    position: relative;
    z-index: 100;
  }

  &__close {
    top: rem(15);
    right: rem(15);
    position: absolute;
  }

  body[theme='dark'] & {
    &__body {
      background-color: $AppBackgroundColorDark;
    }
  }
}
</style>
