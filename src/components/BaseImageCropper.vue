<template>
  <div class="cropper" ref="cropper">
    <span class="cropper__note">{{ $t('cropperNote') }}</span>
    <div class="cropper__preview cropper-preview" ref="preview">
      <div
        class="cropper-preview__image"
        :class="{ 'with-transition': !isMoving }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        ref="image"
      >
        <img :src="imageUrl" alt="Preview" />
      </div>
    </div>

    <base-range
      :min="minScale"
      :max="maxScale"
      :step="stepScale"
      v-model.number="scale"
      @input="setScale"
      class="cropper__scale-range"
    />

    <div class="cropper__footer">
      <base-button view="plain" size="large" text="cancel" @click="cancel" />
      <base-button
        view="plain"
        size="large"
        text="choose"
        :loading="isLoading"
        @click="save"
      />
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import BaseButton from '@/components/BaseButton.vue'
import BaseRange from '@/components/BaseRange'

export default {
  components: {
    BaseRange,
    BaseButton,
  },

  props: {
    imageUrl: String,
    maxOffsetX: {
      type: Number,
      default: 0,
    },
    maxOffsetY: {
      type: Number,
      default: 0,
    },
  },

  emits: ['crop', 'cancel'],

  data() {
    return {
      previewSize: 300,
      maxPreviewSize: 400,

      minScale: 1,
      maxScale: 3,
      stepScale: 0.01,
      scale: 1,

      touchStartX: 0,
      touchStartY: 0,
      currentTransformX: 0,
      currentTransformY: 0,
      transformX: 0,
      transformY: 0,

      isMoving: false,
      isLoading: false,
    }
  },

  methods: {
    onTouchStart(event) {
      this.isMoving = true
      this.touchStartX = event.touches[0].clientX
      this.touchStartY = event.touches[0].clientY
    },

    onTouchMove(event) {
      let touchMoveX = event.touches[0].clientX
      let touchMoveY = event.touches[0].clientY

      this.transformX = this.currentTransformX + (touchMoveX - this.touchStartX)
      this.transformY = this.currentTransformY + (touchMoveY - this.touchStartY)

      this.setTransform()
    },

    onTouchEnd() {
      this.isMoving = false

      this.removeTransformExcess()
      this.setTransform()

      this.currentTransformX = this.transformX
      this.currentTransformY = this.transformY
    },

    removeTransformExcess() {
      const imageWidth = this.$refs.image.offsetWidth
      const imageHeight = this.$refs.image.offsetHeight

      const maxShiftX =
        (imageWidth * this.scale - this.previewSize) / 2 +
        this.previewSize * this.maxOffsetX
      const maxShiftY =
        (imageHeight * this.scale - this.previewSize) / 2 +
        this.previewSize * this.maxOffsetY

      if (Math.abs(this.transformX) > maxShiftX) {
        const excess = Math.abs(this.transformX) - maxShiftX

        if (this.transformX > 0) {
          this.transformX = this.transformX - excess
        } else {
          this.transformX = this.transformX + excess
        }
      }

      if (Math.abs(this.transformY) > maxShiftY) {
        const excess = Math.abs(this.transformY) - maxShiftY

        if (this.transformY > 0) {
          this.transformY = this.transformY - excess
        } else {
          this.transformY = this.transformY + excess
        }
      }
    },

    setScale() {
      this.isMoving = true
      this.removeTransformExcess()
      this.setTransform()
      this.currentTransformX = this.transformX
      this.currentTransformY = this.transformY
    },

    setTransform() {
      this.$refs.image.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.transformX}, ${this.transformY})`
    },

    setPreviewSize() {
      const cropper = this.$refs.cropper
      const width = cropper.offsetWidth * 0.9
      this.previewSize =
        width < this.maxPreviewSize ? width : this.maxPreviewSize
      cropper.style.setProperty('--preview-size', this.previewSize + 'px')
    },

    adjustScale() {
      const image = this.$refs.image
      if (
        image.offsetWidth < this.previewSize ||
        image.offsetHeight < this.previewSize
      ) {
        this.minScale = Math.max(
          this.previewSize / image.offsetWidth,
          this.previewSize / image.offsetHeight
        )
        this.maxScale = this.maxScale + (this.minScale - 1)
        this.scale = this.minScale
        this.setTransform()
      }
    },

    async crop() {
      const preview = this.$refs.preview.cloneNode(true)
      preview.classList.add('hidden')
      this.$refs.cropper.append(preview)

      const canvas = await html2canvas(preview, {
        backgroundColor: null,
      })

      const imageURL = canvas.toDataURL('image/png', 1.0).toString()

      preview.remove()

      return imageURL
    },

    async save() {
      this.isLoading = true
      const image = await this.crop()
      this.$emit('crop', image)
    },

    cancel() {
      this.$emit('cancel')
    },
  },
  mounted() {
    this.setPreviewSize()
    const interval = setInterval(() => {
      if (this.$refs.image.offsetHeight) {
        this.adjustScale()
        clearInterval(interval)
      }
    }, 50)
  },
}
</script>

<style lang="scss" scoped>
.cropper {
  --preview-size: rem(300);

  display: grid;
  grid-template-rows: 1fr var(--preview-size) 1fr;
  justify-items: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;

  &__note {
    font-size: rem(19);
    pointer-events: none;
    color: $AppTextColorLight;
    z-index: 2;
  }

  & .cropper-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: var(--preview-size);
    height: var(--preview-size);
    border-radius: 50%;
    position: relative;

    &.hidden {
      top: -200vh;
      left: -200vw;
      overflow: hidden;
      position: absolute;
    }

    &::before {
      content: '';
      top: 50%;
      left: 0;
      width: 100%;
      height: var(--preview-size);
      box-shadow: 0 0 0 500vw rgba($color: #000, $alpha: 0.7);
      border-radius: 50%;
      transform: translate(0, -50%);
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }

    &__image {
      pointer-events: auto;

      &.with-transition {
        transition: transform 0.3s ease;
      }

      & img {
        will-change: transform;
        pointer-events: none;
      }
    }
  }

  &__scale-range {
    z-index: 2;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 rem(15) rem(15);
    pointer-events: none;
    z-index: 2;

    & button {
      color: white !important;
      pointer-events: auto;
    }
  }

  body[theme='dark'] & {
    background-color: #1c1c1e;
    &__note {
      color: inherit;
    }
  }
}

.cropper-fade-enter-active,
.cropper-fade-leave-active {
  transition: 0.2s ease-in-out;
}

.cropper-fade-leave-to,
.cropper-fade-enter-from {
  opacity: 0;
}
</style>
