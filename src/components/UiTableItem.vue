<template>
  <div
    class="table-view-item"
    @touchstart="onItemTouchStart"
    @touchend="onItemTouchEnd"
    @click="$emit('onItemClick')"
    ref="item"
  >
    <div class="table-view-item__wrapper">
      <slot name="left" />
      <div class="table-view-item__content">
        <slot />
      </div>
      <div v-if="labels" class="table-view-item__labels">
        <span
          v-for="label in labels"
          :key="label"
          class="table-view-item__label"
        >
          {{ label }}
        </span>
      </div>
      <base-icon
        v-if="type && types[type]"
        :name="types[type].icon"
        :size="16"
        class="action"
        @click.stop="$emit('onItemIconClick')"
        @touchstart.stop
        @touchend.stop
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  components: { BaseIcon },
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    labels: Array,
    highlightOnTouch: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onItemClick', 'onItemIconClick'],
  data() {
    return {
      highlight: false,
      types: {
        disclosure: { icon: 'chevron-right-regular' },
        info: { icon: 'plus-solid' }
      }
    }
  },
  methods: {
    onItemTouchStart() {
      if (this.highlight) {
        this.$refs.item.classList.add('touched')
      }
    },
    onItemTouchEnd() {
      if (this.highlight) {
        this.$refs.item.classList.remove('touched')
      }
    }
  },
  mounted() {
    if (this.type === 'disclosure') {
      this.highlight = true
    } else {
      this.highlight = this.highlightOnTouch
    }
  }
}
</script>

<style lang="scss" scoped>
.table-view-item {
  display: flex;
  margin-top: rem(-1);
  transition: background-color 0.2s ease;

  &.touched {
    background-color: #e5e5e5;
  }

  &:last-child & {
    &__content:after {
      display: none;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: rem(10);
    width: 100%;
    min-height: rem(44);
    padding: rem(10) rem(15);
  }

  &__content {
    flex-grow: 1;
    font-size: rem(17);
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: rem(-10);
      height: rem(1);
      width: 100vw;
      background-color: #e5e5e5;
    }
  }

  &__labels {
    display: flex;
    align-items: center;
    gap: rem(10);
  }
  &__label {
    font-size: rem(17);
    color: grey;
    line-height: 1;
  }

  .action {
    margin-left: auto;
    fill: $AppTextColorDark;
    opacity: 0.3;
  }

  body[theme='dark'] & {
    &.touched {
      background-color: #2d2d2f;
    }
    &__content:after {
      background-color: #2d2d2f;
    }
    .action {
      fill: $AppTextColorLight;
    }
  }
}
</style>
