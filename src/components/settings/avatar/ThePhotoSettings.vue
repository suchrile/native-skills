<template>
  <base-overlay ref="overlay" :title="$t('photo')" @close="resetState">
    <div class="photo-select">
      <div class="photo-select__upload">
        <label class="photo-select__upload-button">
          <base-icon name="plus-solid" size="100" icon-only />
          <input
            type="file"
            accept="image/*"
            @input="onImageUpload"
            ref="input"
          />
        </label>
        <span class="photo-select__upload-note">
          {{ $t('photoSettingsNote') }}
        </span>
      </div>

      <transition name="cropper-fade">
        <base-image-cropper
          v-if="image"
          :image-url="this.image"
          @cancel="resetState"
          @crop="save"
        />
      </transition>
    </div>
  </base-overlay>
</template>

<script>
import BaseOverlay from '@/components/BaseOverlay'
import BaseIcon from '@/components/BaseIcon'
import BaseImageCropper from '@/components/BaseImageCropper'

export default {
  components: {
    BaseImageCropper,
    BaseIcon,
    BaseOverlay
  },
  emits: ['done'],
  data() {
    return {
      image: null,
      scale: 0
    }
  },
  methods: {
    open() {
      this.$refs.overlay.open()
    },

    resetState() {
      this.image = null
      this.$refs.input.value = ''
    },

    onImageUpload(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        this.image = event.target.result
      }
      reader.readAsDataURL(file)
    },

    async save(imageURL) {
      await this.$store.dispatch('uploadAvatar', imageURL)
      this.$emit('done')
      setTimeout(() => this.$refs.overlay.close(), 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-select {
  height: 100%;

  &__upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: rem(20);
    height: 100%;
    padding: 0 0 rem(50);

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: rem(200);
      height: rem(200);
      border-radius: 50%;
      border: 8px solid lightgrey;
      position: relative;

      &:active {
        background-color: rgba($color: lightgrey, $alpha: 0.2);
      }

      i {
        fill: lightgrey;
        pointer-events: none;
      }

      & input {
        width: 0;
        height: 0;
        opacity: 0;
      }
    }

    &-note {
      font-size: rem(18);
      font-weight: 500;
      color: grey;
    }
  }

  &__crop {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;

    &-image {
      display: block;
      width: rem(300);
      pointer-events: none;
      position: relative;

      &::before {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: rem(300);
        box-shadow: 0 0 0 300vw rgba($color: #000, $alpha: 0.45);
        border-radius: 50%;
        position: absolute;
        z-index: 1;
      }
    }
  }

  body[theme='dark'] & {
    &__upload-button {
      border-color: grey;
      &:active {
        background-color: rgba($color: grey, $alpha: 0.2);
      }
      & i {
        fill: grey;
      }
    }
  }
}
</style>
