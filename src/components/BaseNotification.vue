<template>
  <div class="notification">
    <div class="notification__body">
      <div v-if="imageSrc" class="notification__image" :style="imageSizeStyle">
        <img :src="imageSrc" alt="Notification image" />
      </div>
      <div class="notification__content">
        <h6 v-if="title" class="notification__title">{{ title }}</h6>
        <span class="notification__text">{{ text }}</span>
      </div>
    </div>
    <div v-if="actions" class="notification__buttons">
      <base-button
        v-for="button in actions"
        :key="button.value"
        view="plain"
        size="large"
        :text="$t(button.title)"
        :class="{ danger: button.type === 'destructive' }"
        @click="$emit('buttonClick', button.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Action } from '@/types'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  props: {
    imageSrc: String,
    imageSize: {
      type: Number,
      default: () => 45
    },
    title: String,
    text: {
      type: String,
      required: true
    },
    createdAt: Number,
    actions: Array as PropType<Action[]>
  },
  emits: ['buttonClick'],
  computed: {
    imageSizeStyle() {
      return `width: ${this.imageSize}px; height: ${this.imageSize}px;`
    }
  }
})
</script>

<style lang="scss" scoped>
.notification {
  background-color: $AppBackgroundColorDark;
  border-radius: rem(12);
  overflow: hidden;
  position: relative;

  &__body {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: rem(15);
    padding: rem(12) rem(15);
  }
  &__image {
    min-width: rem(45);
    min-height: rem(45);
    border-radius: 50%;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  &__content {
    margin-top: rem(-1);
  }
  &__title {
    margin-bottom: rem(2);
    font-size: rem(18);
    font-weight: 500;
  }
  &__text {
    display: block;
  }
  &__buttons {
    display: flex;
    position: relative;
    &:before {
      content: '';
      left: 0;
      top: 0;
      width: 100%;
      height: rem(1);
      background-color: #2d2d30;
      position: absolute;
    }

    & button {
      width: 100%;
      padding: rem(11) 0 !important;
      &:not(:last-child) {
        border-right: rem(1) solid;
        border-color: #2d2d30;
      }
      &:active {
        background-color: #2d2d30;
        opacity: 1 !important;
      }
    }
  }
}
</style>
