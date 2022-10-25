<template>
  <button
    :type="type"
    :disabled="disabled"
    class="button"
    :class="getClasses()"
  >
    <div class="button__content">
      <base-icon
        v-if="icon"
        :name="icon"
        :size="iconSize"
        :icon-only="iconOnly"
        class="button__icon"
      />
      <span v-if="text">{{ $t(text) }}</span>
    </div>
    <transition name="loader-fade">
      <base-loader v-if="loading" size="small" :color="loaderColor" />
    </transition>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLoader from '@/components/BaseLoader.vue'

export default defineComponent({
  name: 'base-button',
  components: { BaseIcon, BaseLoader },
  props: {
    type: String,
    text: String,
    icon: String,
    iconOnly: Boolean,
    size: String,
    view: String,
    color: String,
    disabled: Boolean,
    loading: Boolean
  },
  data: () => ({
    buttonLoading: false
  }),
  computed: {
    iconSize() {
      if (this.size === 'small') return 18
      else if (this.size === 'medium') return 20
      return 22
    },
    loadingClass() {
      return this.buttonLoading ? 'loading' : ''
    },
    loaderColor() {
      if (this.view === 'filled') return 'white'
      return 'blue'
    }
  },
  methods: {
    getClasses() {
      if (this.loading === false) {
        setTimeout(() => (this.buttonLoading = false), 200)
      } else {
        this.buttonLoading = this.loading
      }
      return [this.size, this.view, this.loadingClass]
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  line-height: 1;
  border: none;
  user-select: none;
  cursor: pointer;
  position: relative;
  transition: opacity 0.2s ease-in-out;

  &.loading {
    opacity: 0.8;
    pointer-events: none;
    .button__content {
      opacity: 0;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    transition: inherit;
  }

  &__icon {
    margin-right: rem(5);
  }

  & .loader {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }

  // size classes
  &.small {
    padding: rem(8) rem(14);
    font-size: rem(15);
    border-radius: rem(100);
    &.icon {
      padding: rem(4);
      border-radius: 50%;
    }
  }
  &.medium {
    padding: rem(10) rem(18);
    font-size: rem(17);
    font-weight: 400;
    border-radius: rem(100);
    &.icon {
      padding: rem(5);
      border-radius: 50%;
    }
  }
  &.large {
    padding: rem(13) rem(20);
    font-size: rem(18);
    border-radius: rem(12);
    &.icon {
      padding: rem(6);
      border-radius: 50%;
    }
  }
  &.huge {
    padding: rem(15) rem(20);
    font-size: rem(18);
    border-radius: rem(12);
  }
  &.full {
    width: 100%;
  }

  // view classes
  &.filled {
    color: $AppTextColorLight;
    background-color: $AppMainColor;
    &:active {
      box-shadow: inset 0 0 0 rem(100) rgba($color: #fff, $alpha: 0.2);
    }
    & .button__icon {
      fill: $AppTextColorLight;
    }
  }
  &.tinted {
    color: $blue;
    background-color: rgba($color: $blue, $alpha: 0.15);
    &:active {
      box-shadow: inset 0 0 0 rem(100) rgba($color: #fff, $alpha: 0.3);
    }
    &:disabled {
      opacity: 0.6;
    }
    & .button__icon {
      fill: $blue;
    }
  }
  &.grey {
    color: $blue;
    background-color: rgba($color: $grey, $alpha: 0.15);
    &:active {
      box-shadow: inset 0 0 0 rem(100) rgba($color: $grey, $alpha: 0.05);
    }
    & .button__icon {
      fill: $blue;
    }
  }
  &.bordered {
    color: $blue;
    border: 1.5px solid $blue;
    background: none;
    &:active {
      opacity: 0.6;
      box-shadow: none;
    }
    & .button__icon {
      fill: $blue;
    }
  }
  &.plain {
    padding: rem(8) 0;
    color: $blue;
    line-height: 1.3;
    background: none;
    border-radius: 0;
    &:active {
      opacity: 0.5;
      box-shadow: none;
    }
    &:disabled {
      color: $grey !important;
      opacity: 0.7;
    }
    & .button__icon {
      fill: $blue;
    }
  }
  &.danger & {
    color: $red;
    &__icon {
      fill: $red !important;
    }
  }
  &.icon {
    .button__icon {
      margin-right: 0;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  body[theme='dark'] & {
    &.filled {
      background-color: $darkblue;
    }
    &.tinted {
      color: $darkblue;
      background-color: rgba($color: $darkblue, $alpha: 0.2);
      &:active {
        box-shadow: inset 0 0 0 rem(100) rgba($color: #fff, $alpha: 0.05);
      }
      & .button__icon {
        fill: $darkblue;
      }
    }
    &.grey {
      color: $darkblue;
      background-color: rgba($color: $deepgrey, $alpha: 0.45);
      &:active {
        box-shadow: inset 0 0 0 rem(100) rgba($color: #fff, $alpha: 0.05);
      }
      & .button__icon {
        fill: $darkblue;
      }
    }
    &.bordered {
      color: $darkblue;
      border: 1.5px solid $darkblue;
      &:active {
        opacity: 0.7;
      }
      & .button__icon {
        fill: $darkblue;
      }
    }
    &.plain {
      color: $darkblue;
      &:active {
        opacity: 0.6;
      }
      &:disabled {
        opacity: 0.4;
      }
      & .button__icon {
        fill: $darkblue;
      }
    }
    &.danger {
      color: $darkred !important;
    }
  }
}

.loader-fade-enter-active {
  transition-delay: 0.1s;
}
</style>
