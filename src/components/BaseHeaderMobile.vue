<template>
  <header class="header" ref="header">
    <div class="header__body">
      <div class="header__back" @click="returnBack">
        <transition name="back-icon">
          <base-icon
            v-if="!isLargeTitle"
            name="chevron-left-regular"
            :size="22"
            class="header__back-icon"
          />
        </transition>
        <transition
          name="back-button"
          :enter-from-class="enterClass"
          :leave-to-class="leaveClass"
        >
          <base-button
            v-if="!isLargeTitle"
            view="plain"
            size="medium"
            :text="backRouteName"
            class="header__back-button"
            :key="$route"
          />
        </transition>
      </div>
      <div class="header__title">
        <transition
          name="title"
          :enter-from-class="enterClass"
          :leave-to-class="leaveClass"
        >
          <span :key="$route" id="header-title">{{ title }}</span>
        </transition>
      </div>
      <div class="header__actions" id="header-actions"></div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton'
import BaseIcon from '@/components/BaseIcon'

export default defineComponent({
  name: 'base-header-mobile',
  components: { BaseIcon, BaseButton },
  computed: {
    title() {
      if (this.$route.meta.showTitle) {
        return this.$route.meta.title ?? this.$t(this.$route.name)
      } else return ''
    },
    backRoute() {
      return this.$route.path.substring(0, this.$route.path.lastIndexOf('/'))
    },
    backRouteName() {
      return this.$router.getRoutes().find((el) => el.path === this.backRoute)
        .name
    },
    isLargeTitle() {
      return this.$route.meta.largeTitle
    },
    enterClass() {
      return this.$route.meta.animation.enterFrom
    },
    leaveClass() {
      return this.$route.meta.animation.leaveTo
    }
  },
  methods: {
    returnBack() {
      this.$router.push(this.backRoute)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: rem(45);
  user-select: none;
  &.highlighted & {
    &__body {
      &::after {
        opacity: 1;
      }
    }
  }
  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: rem(10);
    width: inherit;
    height: calc(env(safe-area-inset-top) + rem(45));
    top: 0;
    left: 0;
    padding: env(safe-area-inset-top) calc(env(safe-area-inset-right) + rem(10))
      0 calc(env(safe-area-inset-left) + rem(10));
    background-color: $AppBackgroundColorLight;
    transition-property: background-color, color, border-radius;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    position: fixed;
    z-index: 90;
    &::after {
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.5px;
      background-color: #cdcdd2;
      opacity: 0;
      transition: opacity 0.3s ease;
      position: absolute;
    }
  }
  &__back {
    display: flex;
    align-items: center;
    gap: rem(5);
    height: 100%;
    position: relative;
    &-icon {
      fill: $blue;
    }
    &-button.back-button-enter-active {
      left: rem(19);
      height: 100%;
    }
  }
  &__title {
    height: 100%;
    opacity: 1;
    transition: opacity 0.2s ease;
    position: relative;
    & span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: inherit;
      font-size: rem(17);
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &.hidden {
      opacity: 0;
    }
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: rem(10);
  }
  body[theme='dark'] & {
    &__body {
      background-color: #000000;
      &::after {
        background-color: #282728;
      }
    }
    &__back-icon {
      fill: $darkblue;
    }
  }
}

.back-icon-enter-active,
.back-icon-leave-active {
  transition: opacity 0.25s ease;
}
.back-icon-leave-to,
.back-icon-enter-from {
  opacity: 0;
}

.back-button-enter-active,
.back-button-leave-active,
.title-enter-active,
.title-leave-active {
  top: 0;
  left: 0;
  position: absolute;
  transition-property: transform, opacity;
  transition-duration: 0.35s;
  transition-timing-function: ease;
}

.left {
  opacity: 0;
  transform: translateX(-100%);
}
.right {
  opacity: 0;
  transform: translateX(100%);
}
</style>
