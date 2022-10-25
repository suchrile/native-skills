<template>
  <section class="settings-profile">
    <div class="settings-profile__avatar">
      <div class="settings-profile__avatar-preview">
        <img :src="userData.avatar" />
      </div>
      <div class="settings-profile__change-avatar">
        <base-button
          text="changePhoto"
          view="plain"
          size="medium"
          @click="openAvatarOverlay"
        />
      </div>
    </div>

    <base-list-sheet :lists="name" title="name" />
    <base-list-sheet
      :lists="passwordAndRecovery"
      title="passwordAndSecurity"
      @showEmailPopup="showEmailPopup"
    />
    <base-list-sheet :lists="deleteAccount" />

    <div class="settings-profile__actions">
      <base-button
        text="logout"
        view="grey danger"
        size="full large"
        @click.prevent="logout"
      />
    </div>

    <base-action-sheet
      v-if="isActionSheetOpen"
      :actions="actions"
      @choose="isActionSheetOpen = false"
      @cancel="isActionSheetOpen = false"
    />
  </section>

  <the-avatar-overlay ref="avatarOverlay" />

  <!-- popups -->
  <base-popup ref="emailPopup">
    <the-email-popup @emailSent="showEmailSentPopup" />
  </base-popup>

  <base-popup ref="emailSentPopup">
    <the-email-sent-popup />
  </base-popup>
  <!-- popups -->
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseActionSheet from '@/components/BaseActionSheet.vue'
import BaseListSheet from '@/components/BaseListSheet.vue'
import TheEmailPopup from '@/components/TheEmailPopup'
import BasePopup from '@/components/BasePopup.vue'
import TheEmailSentPopup from '@/components/TheEmailSentPopup.vue'
import TheAvatarOverlay from '@/components/settings/avatar/TheAvatarOverlay.vue'

export default {
  components: {
    TheEmailPopup,
    BaseButton,
    BaseActionSheet,
    BaseListSheet,
    BasePopup,
    TheEmailSentPopup,
    TheAvatarOverlay
  },
  data: () => ({
    isActionSheetOpen: false,
    buttonLoading: false,
    isAvatarOverlayOpen: false
  }),
  computed: {
    userData() {
      return this.$store.getters.user
    },
    name() {
      return [
        [
          {
            title: this.userData.fullName,
            route: '/settings/profile/name',
            localized: true
          }
        ]
      ]
    },
    passwordAndRecovery() {
      return [
        [
          {
            title: 'email',
            route: '#',
            label: this.userData.emailVerified ? 'verified' : 'notVerified',
            emit: 'showEmailPopup'
          },
          {
            title: 'changePassword',
            route: '/settings/profile/password'
          }
        ]
      ]
    },
    deleteAccount() {
      return [
        [
          {
            title: 'deleteAccount',
            route: '/settings/profile/delete'
          }
        ]
      ]
    },
    actions() {
      const actionsArr = [
        { title: 'changePhoto', value: 'change' },
        { title: 'chooseMemoji', value: 'choose-memoji' }
      ]
      if (this.userData.avatar) {
        actionsArr.push({
          title: 'deletePhoto',
          value: 'delete',
          danger: true
        })
      }
      return actionsArr
    }
  },
  methods: {
    async openAvatarOverlay() {
      this.$refs.avatarOverlay.open()
    },
    async logout() {
      await this.$store.dispatch('logout')
      await this.$router.push('/auth')
    },
    async showEmailPopup() {
      await this.$refs.emailPopup.open()
    },
    async showEmailSentPopup() {
      await this.$refs.emailPopup.close()
      await this.$refs.emailSentPopup.open()
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-profile {
  padding-top: rem(15);

  &__avatar {
    margin-bottom: rem(5);

    &-preview {
      width: rem(110);
      height: rem(110);
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__change-avatar {
    margin-top: rem(6);
    text-align: center;
  }

  & .list-sheet {
    &:not(:last-child) {
      margin-bottom: rem(20);
    }
  }

  &__actions {
    margin-top: rem(35);
  }
}
</style>
