<template>
  <base-overlay ref="overlay" :title="$t('emoji')">
    <template #headerRight>
      <base-button
        view="plain"
        size="large"
        text="done"
        :loading="loading"
        @click="save"
      />
    </template>

    <div class="emoji-select">
      <div class="emoji-select__preview">
        <div
          class="emoji-select__preview-image"
          :style="`background-color: ${selectedColorHex};`"
        >
          <input
            type="text"
            :value="emoji"
            @input="onInput"
            :disabled="loading"
          />
        </div>
        <span class="emoji-select__note">{{ $t('emojiSettingsNote') }}</span>
      </div>

      <div class="emoji-select__style">
        <div class="emoji-select__colors">
          <div
            v-for="c in colors"
            :key="c.id"
            :style="`background-color: ${c.hex};`"
            class="emoji-select__color"
            :class="{ active: c.id === selectedColorID }"
            @click="this.selectedColorID = c.id"
          >
            <span>{{ emoji }}</span>
          </div>
        </div>
      </div>
    </div>
  </base-overlay>
</template>

<script>
import { emojiRegExp } from '@/assets/emojiRegExp'
import { colors } from '@/assets/memoji/memoji'
import BaseOverlay from '@/components/BaseOverlay'
import BaseButton from '@/components/BaseButton'

export default {
  components: {
    BaseButton,
    BaseOverlay
  },
  emits: ['done'],
  data() {
    return {
      emojiRegExp,
      colors,
      emoji: '😊',
      selectedColorID: 1,

      loading: false
    }
  },
  computed: {
    selectedColorHex() {
      return this.colors.find((el) => el.id === this.selectedColorID).hex
    }
  },
  methods: {
    open() {
      this.$refs.overlay.open()
    },

    onInput(event) {
      const value = event.target.value.trim()

      if (value === '') {
        this.emoji = ''
        return
      }

      const match = this.emojiRegExp.test(value)

      if (match) {
        this.emoji = value
      } else {
        event.target.value = this.emoji
      }
    },

    async makeImage() {
      const canvas = document.createElement('canvas')

      canvas.width = 400
      canvas.height = 400
      canvas.style.background = 'transparent'
      canvas.classList.add('emoji-canvas')
      canvas.setAttribute(
        'style',
        'top: -200vh; left: -200vw; position: absolute;'
      )

      document.body.append(canvas)
      const context = canvas.getContext('2d')

      const center = canvas.width / 2
      const radius = canvas.width / 2

      context.arc(center, center, radius, 0, 2 * Math.PI, false)
      context.fillStyle = this.selectedColorHex
      context.fill()

      context.font = '235px SFProDisplay'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      const measure = context.measureText(this.emoji)
      const halfTextY =
        (measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent) / 2
      const halfTextX =
        (measure.actualBoundingBoxLeft - measure.actualBoundingBoxRight) / 2
      context.fillText(this.emoji, center + halfTextX, center + halfTextY)

      const imageURL = canvas.toDataURL('image/png', 1.0).toString()

      canvas.remove()

      return imageURL
    },

    async save() {
      this.loading = true

      const imageURL = await this.makeImage()

      await this.$store.dispatch('uploadAvatar', imageURL)
      this.$emit('done')
      setTimeout(() => this.$refs.overlay.close(), 300)

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.emoji-select {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;

  &__preview {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50%;
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: rem(220);
      height: rem(220);
      border-radius: 50%;
      transition: background-color 0.2s ease;

      & input {
        width: inherit;
        height: inherit;
        font-size: rem(140);
        line-height: 1;
        text-align: center;
        border: none;
        background: transparent;
        appearance: none;

        &:disabled {
          opacity: 1;
        }
      }
    }
  }

  &__note {
    padding: 0 0 rem(10);
    font-size: rem(17);
    white-space: nowrap;
  }

  &__style {
    height: 50%;
    padding: rem(20) rem(15);
  }

  &__colors {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: rem(15);
  }

  &__color {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(75);
    height: rem(75);
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

    & span {
      font-size: rem(45);
      line-height: 1;
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
