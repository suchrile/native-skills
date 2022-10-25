<template>
  <component :is="layout" />
</template>

<script>
import { setTheme } from '@/services/theme'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

export default {
  components: {
    MainLayout,
    AuthLayout
  },
  data() {
    return {
      setTheme
    }
  },
  computed: {
    layout() {
      if (this.$route.meta.layout === '') {
        document.body.setAttribute('layout', 'main')
        return 'main-layout'
      }
      document.body.setAttribute('layout', this.$route.meta.layout)
      return this.$route.meta.layout + '-layout'
    }
  },
  mounted() {
    this.setTheme()
  }
}
</script>

<style lang="scss">
:root {
  --sat: env(safe-area-inset-top);
  --sar: env(safe-area-inset-right);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
}
html {
  min-height: calc(100% + var(--sat));
  padding: var(--sat) var(--sar) var(--sab) var(--sal);
}
body {
  quotes: '«' '»';
}
#app {
  height: 100%;
  margin-bottom: 100px;
  transition-property: transform, background-color, border-radius;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  background-color: $AppBackgroundColorLight;
}
.no-scroll {
  overflow: hidden;
  user-select: none;
}
.link-in-text {
  text-decoration: underline;
  color: $blue;
}

body.layer {
  background-color: #000 !important;
  .header__body {
    border-radius: rem(12);
  }
  #app {
    border-radius: rem(12);
  }
}

body[theme='dark'] {
  & #app {
    background-color: #000;
  }
  &.layer {
    .header__body {
      background-color: $AppBackgroundColorDark !important;
      border-radius: rem(12);
    }
    #app {
      background-color: $AppBackgroundColorDark;
      border-radius: rem(12);
    }
  }
}
</style>
