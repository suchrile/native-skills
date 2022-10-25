<template>
  <div class="auth">
    <div class="auth__content">
      <h1 class="auth__title">Times</h1>
      <section class="auth__tabs">
        <div
          v-for="tab in tabs"
          :key="tab.value"
          class="auth__tab"
          :class="{ active: activeTab === tab.value }"
          @click="changeActiveTab(tab)"
        >
          {{ $t(tab.title) }}
        </div>
      </section>
      <component :is="currentTab" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TheAuthSignInTab from '@/components/TheAuthSignInTab.vue'
import TheAuthSignUpTab from '@/components/TheAuthSignUpTab.vue'

export default defineComponent({
  components: {
    TheAuthSignUpTab,
    TheAuthSignInTab
  },
  data: () => ({
    tabs: [
      { title: 'signIn', value: 'sign-in' },
      { title: 'signUp', value: 'sign-up' }
    ],
    activeTab: 'sign-in'
  }),
  computed: {
    currentTab() {
      return 'the-auth-' + this.activeTab + '-tab'
    }
  },
  methods: {
    changeActiveTab(tab) {
      this.activeTab = tab.value
    }
  }
})
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;

  &__content {
    width: 100%;
    padding: rem(30) rem(25) rem(100);
    border-radius: rem(12);
  }

  &__title {
    margin-bottom: rem(35);
    font-size: rem(24);
    text-align: center;
  }

  &__tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: rem(45);
  }

  &__tab {
    font-size: rem(16);
    font-weight: 500;
    text-align: center;
    line-height: 1;
    opacity: 0.5;
    transition: 0.2s ease-in-out;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      left: 0;
      bottom: rem(-14);
      width: 100%;
      height: rem(2);
      opacity: 0;
      visibility: hidden;
      background-color: $blue;
      transform: scale(0);
      transition: 0.2s ease-in-out;
      position: absolute;
    }

    &.active {
      opacity: 1;

      &::after {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
    }
  }

  body[theme='dark'] & {
    &__tab::after {
      background-color: $darkblue;
    }
  }
}
</style>
