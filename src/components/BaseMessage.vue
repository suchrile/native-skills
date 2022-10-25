<template>
  <teleport to="body">
    <div v-if="isOpen" class="message" :class="{ open: isVisible }">
      <div class="message__body">
        <div class="message__content">
          <div v-if="title" class="message__title" v-html="title"></div>
          <div v-if="text" class="message__text" v-html="text"></div>
        </div>
        <div class="message__buttons">
          <base-button view="plain" size="large" text="close" @click="close" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  components: {
    BaseButton,
  },
  props: {
    title: String,
    text: String,
  },
  messageController: null,
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
      this.$options.messageController = { resolve, reject }

      this.isOpen = true
      this.$nextTick(() => {
        setTimeout(() => (this.isVisible = true))
      })
      document.body.classList.add('no-scroll')

      return promise
    },
    close() {
      this.isVisible = false
      setTimeout(() => (this.isOpen = false), 200)
      document.body.classList.remove('no-scroll')

      this.$options.messageController.resolve()
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.2s ease-in-out;
  position: fixed;
  z-index: 99;

  &.open {
    background-color: rgba($color: #000000, $alpha: 0.2);
    .message__body {
      opacity: 1;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 70%;
    opacity: 0;
    border-radius: rem(12);
    background-color: #fff;
    backdrop-filter: blur(15px);
    transition: opacity 0.2s ease-in-out;
    overflow: hidden;
    z-index: 100;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(6);
    padding: rem(18) rem(15);
    text-align: center;
  }

  &__title {
    font-size: rem(18);
    font-weight: 600;
    line-height: 1.2;
    opacity: 0.9;
  }

  &__text {
    font-size: rem(15);
    line-height: 1.2;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    border-top: rem(1) solid #e5e5e5;

    & button {
      width: 100%;
      padding: rem(9) 0 rem(11) !important;
      text-align: center;
      &:not(:last-child) {
        border-right: rem(1) solid #e5e5e5;
      }
      &:active {
        background-color: #e5e5e5;
        opacity: 1 !important;
      }
    }
  }

  body[theme='dark'] & {
    &.open {
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
    &__body {
      background-color: rgba($color: #252525, $alpha: 0.85);
    }
    &__buttons {
      border-top: rem(1) solid #2d2d30;
      & button {
        &:not(:last-child) {
          border-right: rem(1) solid #2d2d30;
        }
        &:active {
          background-color: #2d2d30;
        }
      }
    }
  }
}
</style>
