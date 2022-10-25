<template>
  <base-header-mobile />
  <router-view v-slot="{ Component }">
    <template v-if="isWithAnimation">
      <transition
        name="view"
        :enter-from-class="enterClass"
        :leave-to-class="leaveClass"
        @before-enter="onTransitionStart"
        @after-enter="onTransitionEnd"
      >
        <main class="view" :class="{ mobile: isMobile }" :key="Component">
          <base-view-title v-if="isLargeTitle" />
          <component :is="Component" />
        </main>
      </transition>
    </template>
    <template v-else>
      <main :class="{ mobile: isMobile }">
        <base-view-title v-if="isLargeTitle" />
        <component :is="Component" />
      </main>
    </template>
  </router-view>
  <base-footer v-if="isMobile" v-show="isLargeTitle" />
</template>

<script>
import { mapGetters } from 'vuex'
import BaseHeaderMobile from '@/components/BaseHeaderMobile'
import BaseViewTitle from '@/components/BaseViewTitle'
import BaseFooter from '@/components/BaseFooter.vue'

export default {
  components: {
    BaseHeaderMobile,
    BaseViewTitle,
    BaseFooter
  },
  data: () => ({
    isMobile: null
  }),
  async mounted() {
    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)
    await this.$store.dispatch('getUserData')
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  computed: {
    ...mapGetters(['user']),
    isLargeTitle() {
      return this.$route.meta.largeTitle
    },
    isWithAnimation() {
      return this.$route.meta.withAnimation
    },
    enterClass() {
      return this.$route.meta.animation.enterFrom
    },
    leaveClass() {
      return this.$route.meta.animation.leaveTo
    }
  },
  methods: {
    resizeHandler() {
      document.body.clientWidth < 1000
        ? (this.isMobile = true)
        : (this.isMobile = false)
    },
    onTransitionStart() {
      document.body.classList.add('no-scroll')
    },
    onTransitionEnd() {
      document.body.classList.remove('no-scroll')
    }
  }
}
</script>

<style lang="scss">
body[layout='main'] {
  font-family: 'SF Pro Display', sans-serif;
  font-size: $AppDefaultFontSize;
  background-color: $AppBackgroundColorLight;
  color: $AppTextColorDark;
  transition: background-color 0.3s ease;

  &[theme='dark'] {
    background-color: #000;
    color: $AppTextColorLight;
    .view-enter-active,
    .view-leave-active {
      background-color: #000;
    }
  }
}

.mobile {
  padding: 0 rem(15);
}

.view {
  will-change: transform;
}

.view-enter-active,
.view-leave-active {
  width: 100%;
  height: 100%;
  background-color: $AppBackgroundColorLight;
  transition: transform 0.5s cubic-bezier(0.3, 0.8, 0.2, 1);
  position: absolute;
}
.left {
  transform: translate3d(-30%, 0, 0);
}
.right {
  transform: translate3d(100%, 0, 0);
  z-index: 1;
}
</style>
