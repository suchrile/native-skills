<template>
  <teleport to="body">
    <template v-if="isOpen">
      <section :class="{ opened: isVisible }" class="overlay">
        <div
          class="overlay__body"
          ref="body"
          :class="{ 'with-transition': !isMoving }"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div class="overlay__header">
            <div class="overlay__header-left">
              <base-button
                view="plain"
                size="large"
                text="cancel"
                @click="close"
              />
              <slot name="headerLeft" />
            </div>
            <h3 class="overlay__header-title">{{ title }}</h3>
            <div class="overlay__header-right" id="overlay-header-right">
              <slot name="headerRight" />
            </div>
          </div>

          <div class="overlay__content">
            <slot />
          </div>
        </div>
      </section>
    </template>
  </teleport>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  components: { BaseButton },
  props: {
    title: String,
    movable: Boolean,
    breakpoints: {
      type: Array,
      default: () => [100] // in percents without %
    },
    initialPoint: {
      type: Number,
      default: 100 // in percents without %
    }
  },
  emits: ['open', 'close'],
  data: () => ({
    isOpen: false,
    isVisible: false,
    height: null,
    isMoving: false,
    touchStartPoint: null,
    touchStartTransform: 0,
    touchMoveDistance: 0,
    transform: 0
  }),
  methods: {
    async open() {
      this.isOpen = true
      setTimeout(() => {
        this.isVisible = true
        this.$emit('open')
        this.height = this.$refs.body.clientHeight
        this.setTransform(this.initialPoint)
      })
      document.body.classList.add('no-scroll', 'layer')

      await this.$nextTick()
      this.setLayerTransform('open')
    },

    close() {
      this.setLayerTransform('close')
      this.resetTransform()
      this.isVisible = false
      setTimeout(() => {
        this.isOpen = false
        this.$emit('close')
      }, 300)
    },

    onTouchStart(event) {
      if (!this.movable) return
      this.touchStartPoint = event.touches[0].clientY
      this.isMoving = true
    },

    onTouchMove(event) {
      if (!this.movable) return
      const touchMovePoint = event.touches[0].clientY
      this.touchMoveDistance = touchMovePoint - this.touchStartPoint

      const heightAfterMove =
        this.height - (this.touchStartTransform + this.touchMoveDistance)

      if (heightAfterMove > this.height) {
        return
      }

      this.transform = this.touchStartTransform + this.touchMoveDistance
      this.setTransform()
    },

    onTouchEnd() {
      if (!this.movable) return
      this.isMoving = false
      const movePercent = ((this.height - this.transform) / this.height) * 100

      if (movePercent < this.breakpoints[0] / 2) {
        this.close()
        return
      }

      const closestBreakpoint = this.breakpoints.reduce((prev, cur) => {
        return Math.abs(prev - movePercent) < Math.abs(cur - movePercent)
          ? prev
          : cur
      })

      this.transform = this.height - (this.height * closestBreakpoint) / 100
      this.setTransform()
      this.touchStartTransform = this.transform
    },

    setTransform(value) {
      if (value && value <= 100 && this.breakpoints.includes(value)) {
        this.transform = this.height - (this.height * value) / 100
        this.touchStartTransform = this.transform
      }
      this.$refs.body.style.transform = `translateY(${this.transform}px)`
    },

    resetTransform() {
      this.$refs.body.style.transform = ''
      this.touchStartTransform = 0
    },

    setLayerTransform(action) {
      const view = document.querySelector('#app')
      const overlays = document.querySelectorAll('.overlay__body')
      const layers = [view, ...Array.from(overlays)]

      if (action === 'close') {
        layers.pop()
      }

      const count = layers.length - 1

      if (action === 'close' && layers.length === 1) {
        document.body.classList.remove('no-scroll', 'layer')
        view.removeAttribute('style')
        return
      }

      layers.forEach((layer, index) => {
        if (index === count) {
          layer.setAttribute(
            'style',
            `transform: translateY(0); z-index: ${index + 1};`
          )
          return
        }

        const scaleX =
          (document.body.clientWidth - 30 * (count - index)) /
          document.body.clientWidth

        const scaleY =
          (document.body.clientHeight - 20 * (count - index)) /
          document.body.clientHeight

        const translateY = index > 0 && count > 1 ? -20 : 0

        layer.setAttribute(
          'style',
          `transform: scaleX(${scaleX}) scaleY(${scaleY}) translateY(${translateY}px); z-index: ${
            index + 1
          };`
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  // transition: background-color 0.3s cubic-bezier(0, 0, 0.5, 1);
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  &.opened {
    background-color: rgba($color: #000000, $alpha: 0.35);
  }

  &__body {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: calc(100% - rem(20));
    border-radius: rem(12) rem(12) 0 0;
    background-color: $AppBackgroundColorLight;
    transform: translateY(100%);
    overflow: hidden;

    &.with-transition {
      transition-property: transform;
      transition-duration: 0.3s;
      // transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }

  &__header {
    height: rem(55);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: rem(15);
    align-items: center;
    padding: 0 rem(15);

    &-title {
      font-weight: 500;
      font-size: rem(18);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &-left,
    &-right {
      display: flex;
      gap: rem(10);
    }
    &-right {
      justify-content: flex-end;
    }
  }

  &__content {
    height: calc(100% - rem(55));
    overflow-x: auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  body[theme='dark'] & {
    &.opened {
      background-color: rgba($color: #000000, $alpha: 0.35);
    }
    &__body {
      background-color: $AppBackgroundColorDark;
    }
  }
}
</style>
