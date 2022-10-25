<template>
  <footer class="footer">
    <div class="footer__content">
      <router-link v-for="link in links" :key="link.route" :to="link.route">
        <div class="footer__item" :class="{ active: isLinkActive(link.route) }">
          <base-icon :name="link.icon" :size="20" />
          <span>{{ $t(getLinkName(link.route)) }}</span>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  components: { BaseIcon },
  data: () => ({
    links: [
      { route: '/', icon: 'house-regular', exact: true },
      { route: '/today', icon: 'star-regular' },
      { route: '/calendar', icon: 'calendar-lines-regular' },
      { route: '/tasks', icon: 'layer-group-regular' },
      { route: '/settings', icon: 'gear-regular' }
    ]
  }),
  methods: {
    isLinkActive(link) {
      if (link === '/' && link !== this.$route.path) {
        return false
      }
      return this.$route.path.indexOf(link) > -1
    },
    getLinkName(link) {
      return this.$router.options.routes.find((el) => el.path === link).name
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: calc(env(safe-area-inset-bottom));
  background-color: $AppBackgroundColorDark;
  z-index: 90;

  &__content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: rem(8) 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(6);
    width: rem(48);
    opacity: 0.6;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

    &.active {
      opacity: 1;
    }
  }

  & i {
    display: flex;
    align-items: center;
    fill: $AppTextColorLight;
  }

  & span {
    font-size: rem(12);
    line-height: 1;
    white-space: nowrap;
    color: $AppTextColorLight;
  }
}
</style>
