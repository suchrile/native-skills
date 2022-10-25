<template>
  <base-overlay ref="overlay" :title="$t('monogram')" @open="onOpen">
    <template #headerRight>
      <base-button
        view="plain"
        size="large"
        text="done"
        :loading="loading"
        @click="save"
      />
    </template>

    <div class="monogram-select">
      <div class="monogram-select__preview">
        <div
          class="monogram-select__preview-image"
          :style="`background: ${selectedGradient.gradient};`"
        >
          <input
            type="text"
            maxlength="2"
            v-model="monogram"
            :disabled="loading"
            ref="input"
          />
        </div>
        <span class="monogram-select__note">{{
          $t('monogramSettingsNote')
        }}</span>
      </div>

      <div class="monogram-select__style">
        <div class="monogram-select__colors">
          <div
            v-for="g in gradients"
            :key="g.id"
            :style="`background: ${g.gradient};`"
            class="monogram-select__color"
            :class="{ active: g.id === selectedGradientID }"
            @click="this.selectedGradientID = g.id"
          >
            <span>{{ monogram }}</span>
          </div>
        </div>
      </div>
    </div>
  </base-overlay>
</template>

<script>
import { mapGetters } from 'vuex'
import { monogramGradients as gradients } from '@/assets/monogramGradients'
import { makeImage, setAvatar } from '@/services/avatar'
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
      gradients,
      monogram: '',
      selectedGradientID: 1,

      loading: false
    }
  },
  mounted() {
    console.log(this.gradients)
  },
  computed: {
    ...mapGetters(['userData']),

    selectedGradient() {
      return this.gradients.find((el) => el.id === this.selectedGradientID)
    },

    userInitials() {
      return this.userData.firstname[0] + (this.userData.lastname[0] || '')
    }
  },
  watch: {
    monogram() {
      const regex = /^[А-Яа-яA-Za-z]{1,2}$/
      const match = this.monogram.match(regex)

      if (!match) {
        this.monogram = ''
      }
    }
  },
  methods: {
    open() {
      this.$refs.overlay.open()
    },

    onOpen() {
      this.monogram = this.userInitials
    },

    async makeImage() {
      return makeImage(this.monogram, this.selectedGradient)
    },

    async save() {
      this.loading = true
      const imageURL = await this.makeImage()
      await setAvatar(imageURL)
      this.$emit('done')
      setTimeout(() => this.$refs.overlay.close(), 300)

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.monogram-select {
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

      & input {
        width: inherit;
        height: inherit;
        font-size: rem(105);
        font-family: 'SF Compact Rounded', sans-serif;
        color: white;
        line-height: 1;
        text-align: center;
        text-transform: uppercase;
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
      font-family: 'SF Compact Rounded', sans-serif;
      font-size: rem(34);
      font-weight: 500;
      color: white;
      line-height: 1;
      text-transform: uppercase;
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
