<template>
  <teleport to="body">
    <transition name="action-sheet">
      <div v-if="isOpen" class="action-sheet" @click.self="cancel">
        <div class="action-sheet__body" :style="getPadding()">
          <ul class="action-sheet__list">
            <li v-if="title || note" class="action-sheet__header">
              <h6 v-if="title" class="action-sheet__title">{{ $t(title) }}</h6>
              <span v-if="note" class="action-sheet__note">{{ $t(note) }}</span>
            </li>
            <li
              v-for="action in actions"
              :key="action.value"
              class="action-sheet__item"
              :class="action.type"
              @click="choose($event, action.value)"
            >
              {{ $t(action.title) }}
            </li>
          </ul>
          <ul v-if="cancelable" class="action-sheet__list">
            <li class="action-sheet__item primary" @click="cancel">
              {{ $t('cancel') }}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Action } from '@/types'

export default defineComponent({
  props: {
    title: String,
    note: String,
    actions: Array as PropType<Action[]>,
    cancelable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  controller: null,
  methods: {
    async open() {
      let resolve
      let reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      this.$options.controller = { resolve, reject }
      document.body.classList.add('no-scroll')
      this.isOpen = true
      return promise
    },
    close() {
      this.isOpen = false
      document.body.classList.remove('no-scroll')
    },
    choose(event: MouseEvent, action: string) {
      this.$options.controller.resolve(action)
      this.close()
    },
    cancel() {
      if (this.cancelable) {
        this.$options.controller.resolve('cancel')
        this.close()
      }
    },
    getPadding() {
      const saveAreaBottom = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--sab')
          .replace('px', '')
      )
      const paddingBottom = saveAreaBottom > 0 ? saveAreaBottom : 10
      return `padding: 0 10px ${paddingBottom}px 10px`
    }
  }
})
</script>

<style lang="scss" scoped>
.action-sheet {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(black, 0.2);
  transition: background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: fixed;
  z-index: 100;
  &__body {
    max-width: rem(500);
    width: 100%;
    margin: 0 auto;
    transform: translateY(0);
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  &__header {
    padding: rem(15) rem(15) rem(17);
    text-align: center;
    position: relative;
    &::after {
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: rem(1);
      background-color: #dbdbdd;
      position: absolute;
    }
  }
  &__title {
    font-size: rem(16);
    font-weight: 500;
    color: rgba(black, 0.55);
  }
  &__note {
    display: block;
    font-size: rem(15);
    color: rgba(black, 0.5);
    &:not(:first-child) {
      margin: rem(8) 0 0;
    }
  }
  &__list {
    border-radius: rem(13);
    background-color: rgba(white, 0.8);
    backdrop-filter: blur(30px);
    overflow: hidden;
    &:not(:last-child) {
      margin-bottom: rem(8);
    }
  }
  &__item {
    padding: rem(18);
    font-size: rem(20);
    line-height: 1;
    color: $blue;
    text-align: center;
    user-select: none;
    position: relative;
    &.primary {
      font-weight: 500;
    }
    &.destructive {
      color: $red;
    }
    &:active {
      background-color: #dbdbdd;
    }
    &:not(:last-child) {
      &::after {
        content: '';
        left: 0;
        bottom: 0;
        width: 100%;
        height: rem(1);
        background-color: #dbdbdd;
        position: absolute;
      }
    }
  }
  body[theme='dark'] & {
    background-color: rgba(black, 0.4);
    &__header:after {
      background-color: #363637;
    }
    &__list {
      background-color: rgba(#313131, 0.75);
    }
    &__title {
      color: rgba(white, 0.55);
    }
    &__note {
      color: rgba(white, 0.5);
    }
    &__item {
      color: $darkblue;
      &.destructive {
        color: $darkred;
      }
      &:active {
        background-color: #363637;
      }
      &:not(:last-child)::after {
        background-color: #363637;
      }
    }
  }
}
.action-sheet-enter-from,
.action-sheet-leave-to {
  background-color: rgba(black, 0) !important;
  & .action-sheet__body {
    transform: translateY(100%);
  }
}
</style>
