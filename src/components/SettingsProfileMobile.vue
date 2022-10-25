<template>
  <section class="settings__profile settings-profile">
    <router-link to="/settings/profile">
      <div class="settings-profile__content">
        <div class="settings-profile__avatar">
          <img :src="userData.avatar" alt="Profile photo" />
        </div>
        <div class="settings-profile__info">
          <span class="settings-profile__name">{{ userData.fullName }}</span>
          <span class="settings-profile__email">{{ userData.email }}</span>
        </div>
        <base-icon
          name="chevron-right-solid"
          :size="13"
          class="settings-profile__chevron"
        />
      </div>
    </router-link>
  </section>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  components: {
    BaseIcon
  },
  computed: {
    userData() {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-profile {
  border-radius: rem(12);
  background-color: #fff;

  &:active {
    background-color: #e5e5e5;
  }

  &__content {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: rem(12) rem(15) rem(12) rem(12);

    & span {
      display: block;
    }
  }

  &__avatar {
    width: rem(60);
    height: rem(60);
    border-radius: 50%;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    margin-left: rem(12);
  }

  &__name {
    font-size: rem(20);
    font-weight: 500;
    line-height: 1;
  }

  &__email {
    line-height: 1;
    opacity: 0.5;
    margin-top: rem(6);
  }

  &__chevron {
    margin-left: auto;
    opacity: 0.3;
  }

  body[theme='dark'] & {
    background-color: $AppBackgroundColorDark;
    &__content {
      color: $AppTextColorLight;
    }
    &__chevron {
      fill: $AppTextColorLight;
    }
    &:active {
      background-color: #2d2d2f;
    }
  }
}
</style>
