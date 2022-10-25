<template>
  <base-overlay ref="overlay" :title="$t('pose')" @close="resetState">
    <template #headerRight>
      <base-button
        view="plain"
        size="large"
        text="next"
        :disabled="!selected"
        @click="openCropInterface"
      />
    </template>

    <div class="memoji-poses">
      <div class="memoji-poses__preview">
        <div class="memoji-poses__preview-image">
          <transition name="preview-fade">
            <img
              v-if="selected"
              :src="require(`@/assets/memoji/memoji_${selected}.png`)"
              :alt="hero.name"
              :key="selected"
            />
            <img
              v-else
              :src="require(`@/assets/memoji/memoji_${hero.preview}.png`)"
              :alt="hero.name"
            />
          </transition>
        </div>
      </div>

      <div class="memoji-poses__list">
        <div
          v-for="(pose, index) in hero.images"
          :key="pose"
          class="memoji-poses__item"
          :class="{ active: selected === pose }"
          @click="selected = pose"
        >
          <img
            v-lazy="require(`@/assets/memoji/memoji_${pose}.png`)"
            :alt="`${hero.name} ${index + 1}`"
          />
        </div>
      </div>
    </div>

    <transition name="cropper-fade">
      <base-image-cropper
        v-if="isCropInterfaceOpen"
        :image-url="require(`@/assets/memoji/memoji_${selected}.png`)"
        :max-offset-x="0.3"
        :max-offset-y="0.3"
        @cancel="closeCropInterface"
        @crop="onCrop"
      />
    </transition>
  </base-overlay>
</template>

<script>
import BaseOverlay from '@/components/BaseOverlay.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseImageCropper from '@/components/BaseImageCropper'

export default {
  components: {
    BaseImageCropper,
    BaseOverlay,
    BaseButton,
  },

  props: {
    hero: Object,
  },

  emits: ['select'],

  data() {
    return {
      selected: 0,
      isCropInterfaceOpen: false,
    }
  },

  methods: {
    open() {
      this.$refs.overlay.open()
    },

    close() {
      this.$refs.overlay.close()
    },

    resetState() {
      this.selected = null
      this.isCropInterfaceOpen = false
    },

    openCropInterface() {
      this.isCropInterfaceOpen = true
    },

    closeCropInterface() {
      this.isCropInterfaceOpen = false
    },

    onCrop(imageSrc) {
      this.isCropInterfaceOpen = false
      this.$emit('select', imageSrc)
    },
  },
}
</script>

<style lang="scss" scoped>
.memoji-poses {
  height: 100%;

  &__preview {
    padding: rem(10) 0 rem(25);
    position: relative;

    &::after {
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: rem(1);
      background-color: lightgrey;
      position: absolute;
    }

    &-image {
      width: rem(220);
      height: rem(220);
      margin: 0 auto;
      position: relative;

      & img {
        pointer-events: none;
      }
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, rem(105));
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    gap: rem(15);
    height: calc(100% - rem(255));
    overflow-y: scroll;
    padding: rem(20) rem(15);

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: rem(3);
    position: relative;

    &::before {
      content: '';
      top: rem(-3);
      left: rem(-3);
      width: calc(100% + rem(6));
      height: calc(100% + rem(6));
      border: rem(2) solid $blue;
      border-radius: rem(12);
      opacity: 0;
      transition: opacity 0.2s ease;
      position: absolute;
    }

    &.active::before {
      opacity: 1;
    }

    & img {
      pointer-events: none;
    }
  }

  body[theme='dark'] & {
    &__item::before {
      border-color: $darkblue;
    }
    &__preview::after {
      background-color: #2d2d2f;
    }
  }
}

.preview-fade-enter-active,
.preview-leave-active {
  top: 0;
  left: 0;
  width: rem(220);
  height: rem(220);
  transition: 0.25s ease-in-out;
  position: absolute;
}

.preview-fade-leave-to,
.preview-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>
