<template>
  <base-overlay ref="overlay" :title="$t('style')" @close="resetState">
    <template #headerRight>
      <base-button
        view="plain"
        size="large"
        text="done"
        :loading="isSaveButtonLoading"
        @click="save"
      />
    </template>

    <div class="memoji-style">
      <div class="memoji-style__preview">
        <div
          class="memoji-style__preview-image"
          :style="`background-color: ${selectedColorHex};`"
        >
          <img :src="imageSrc" alt="Preview" />
        </div>
      </div>

      <div class="memoji-style__colors">
        <div
          v-for="c in colors"
          :key="c.id"
          :class="{ active: selected === c.id }"
          class="memoji-style__color"
          :style="`background-color: ${c.hex}`"
          @click="this.selected = c.id"
        >
          <img :src="imageSrc" :alt="`Style ${c.id}`" />
        </div>
      </div>
    </div>
    <base-loader size="small" color="blue" />
  </base-overlay>
</template>

<script>
import html2canvas from 'html2canvas'
import { colors } from '@/assets/memoji/memoji'
import BaseOverlay from '@/components/BaseOverlay'
import BaseButton from '@/components/BaseButton'
import BaseLoader from '@/components/BaseLoader'

export default {
  components: {
    BaseLoader,
    BaseButton,
    BaseOverlay,
  },
  props: {
    imageSrc: String,
  },
  emits: ['select'],
  data() {
    return {
      colors,
      selected: 1,
      isSaveButtonLoading: false,
    }
  },
  computed: {
    selectedColorHex() {
      return this.colors.find((el) => el.id === this.selected).hex
    },
  },
  methods: {
    open() {
      this.$refs.overlay.open()
    },

    close() {
      this.$refs.overlay.close()
    },

    resetState() {
      this.selected = 1
      this.isSaveButtonLoading = false
    },

    async save() {
      this.isSaveButtonLoading = true

      const canvas = await html2canvas(
        document.querySelector('.memoji-style__preview-image'),
        {
          backgroundColor: null,
        }
      )

      const imageSrc = canvas.toDataURL('image/png', 1.0).toString()

      this.$emit('select', imageSrc)
    },
  },
}
</script>

<style lang="scss" scoped>
.memoji-style {
  height: 100%;

  &__preview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    pointer-events: none;
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
      width: rem(230);
      height: rem(230);
      border-radius: 50%;
      transition: background-color 0.2s ease;
      overflow: hidden;
    }
  }

  &__colors {
    display: grid;
    grid-template-columns: repeat(auto-fill, rem(78));
    justify-items: center;
    justify-content: space-around;
    gap: rem(10);
    padding: rem(20) rem(15);
  }

  &__color {
    border-radius: 50%;
    position: relative;

    &::before {
      content: '';
      top: rem(-5);
      left: rem(-5);
      width: calc(100% + rem(10));
      height: calc(100% + rem(10));
      border: rem(2) solid $blue;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s ease;
      position: absolute;
    }

    &.active::before {
      opacity: 1;
    }

    & img {
      border-radius: 50%;
      overflow: hidden;
      pointer-events: none;
    }
  }

  body[theme='dark'] & {
    &__preview::after {
      background-color: #2d2d2f;
    }
    &__color::before {
      border-color: $darkblue;
    }
  }
}
</style>
