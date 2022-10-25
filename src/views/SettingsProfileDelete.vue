<template>
  <div class="account-delete">
    <h3 class="account-delete__title">
      {{ $t('accountDeleteTitle') }}
    </h3>
    <div v-if="step === 1" class="account-delete__step">
      <span class="account-delete__note" v-html="$t('reauthNote')"> </span>
      <div class="account-delete__reauth-form">
        <settings-reauth-form @reauthed="step = 2" />
      </div>
    </div>
    <div v-if="step === 2" class="account-delete__step">
      <span
        class="account-delete__note"
        v-html="$t('accountDeleteNoteStep2', { n: '8' })"
      >
      </span>
      <span class="account-delete__question">Вы уверены?</span>
      <div class="account-delete__actions">
        <base-button
          text="verify"
          view="grey danger"
          size="full"
          class="account-delete__button"
          :loading="isConfirmButtonLoading"
          @click="deleteAccount"
        />
        <base-button
          text="cancel"
          view="filled"
          size="full"
          class="account-delete__button"
          @click="cancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAccount } from '@/services/auth'
import BaseButton from '@/components/BaseButton.vue'
import SettingsReauthForm from '@/components/SettingsReauthForm.vue'

export default {
  components: {
    BaseButton,
    SettingsReauthForm
  },
  data: () => ({
    step: 1,
    isConfirmButtonLoading: false
  }),
  methods: {
    async deleteAccount() {
      this.isConfirmButtonLoading = true
      try {
        await deleteAccount()
        this.$router.push('/auth')
      } catch (e) {
        alert(e)
      }
      this.isConfirmButtonLoading = false
    },
    cancel() {
      this.$router.push('/settings/profile')
    }
  }
}
</script>

<style lang="scss" scoped>
.account-delete {
  text-align: center;

  &__title {
    padding-top: rem(10);
    font-size: rem(24);
    font-weight: 700;
  }
  &__note {
    display: block;
    margin-top: rem(10);
    font-size: rem(17);
    line-height: 1.3;
  }
  &__reauth-form {
    margin-top: rem(25);
  }
  &__question {
    display: block;
    margin-top: rem(15);
    font-size: rem(18);
    font-weight: 600;
  }
  &__actions {
    margin-top: rem(25);
  }
  &__button:not(:last-child) {
    margin-bottom: rem(12);
  }
}
</style>
