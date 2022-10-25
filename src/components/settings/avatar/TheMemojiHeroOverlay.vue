<template>
  <base-overlay ref="overlay" :title="$t('memoji')" @close="resetState">
    <template #headerRight>
      <base-button
        view="plain"
        size="large"
        text="next"
        :disabled="!selected"
        @click="select"
      />
    </template>

    <div class="memoji-heroes">
      <div
        v-for="m in memojis"
        :key="m.id"
        class="memoji-hero"
        :class="{ active: m.id === selected }"
        @click="this.selected = m.id"
      >
        <img
          v-lazy="require(`@/assets/memoji/memoji_${m.preview}.png`)"
          :alt="m.name"
          :style="`transform: scale(${m.previewSize});`"
        />
      </div>
    </div>
  </base-overlay>
</template>

<script>
import { memojis } from '@/assets/memoji/memoji'
import BaseOverlay from '@/components/BaseOverlay.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseOverlay,
    BaseButton,
  },
  emits: ['select'],
  data() {
    return {
      memojis,
      selected: null,
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
    },

    select() {
      const hero = this.memojis.find((el) => el.id === this.selected)
      this.$emit('select', hero)
    },
  },
}
</script>

<style lang="scss" scoped>
.memoji-heroes {
  display: grid;
  grid-template-columns: repeat(auto-fill, rem(78));
  justify-items: center;
  justify-content: space-around;
  align-items: center;
  padding: rem(10) rem(15) rem(15);
  gap: rem(10);
}

.memoji-hero {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    top: rem(-3);
    left: rem(-3);
    width: calc(100% + rem(6));
    height: calc(100% + rem(6));
    border: 2px solid $blue;
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

  body[theme='dark'] & {
    &::before {
      border-color: $darkblue;
    }
  }
}
</style>
