<template>
  <div class="reauth-form">
    <base-input-sheet class="reauth-form__input">
      <li>
        <input
          type="password"
          v-model.trim="password"
          :placeholder="$t('password')"
        />
      </li>
    </base-input-sheet>
    <base-button
      text="continue"
      view="filled"
      size="huge full"
      class="reauth-form__continue"
      :loading="isContinueButtonLoading"
      :disabled="!isContinueButtonActive"
      @click="reauth"
    />
    <base-button
      text="forgotPassword"
      view="plain"
      size="medium"
      class="reauth-form__forgot"
      :loading="isForgotButtonLoading"
      @click="sendResetEmail"
    />
  </div>

  <base-popup ref="emailSentPopup">
    <the-password-reset-email-sent-popup />
  </base-popup>

  <base-message ref="message" :title="messageTitle" :text="messageText" />
</template>

<script>
import BaseInputSheet from '@/components/BaseInputSheet.vue'
import BaseButton from '@/components/BaseButton.vue'
import BasePopup from '@/components/BasePopup.vue'
import BaseMessage from './BaseMessage.vue'
import ThePasswordResetEmailSentPopup from '@/components/settings/ThePasswordResetEmailSentPopup.vue'

export default {
  components: {
    BaseInputSheet,
    BaseButton,
    BasePopup,
    BaseMessage,
    ThePasswordResetEmailSentPopup
  },
  emits: ['reauthed'],
  data() {
    return {
      password: '',
      isContinueButtonLoading: false,
      isForgotButtonLoading: false,
      messageTitle: '',
      messageText: ''
    }
  },
  computed: {
    isContinueButtonActive() {
      return this.password === '' ? false : true
    }
  },
  methods: {
    async reauth() {
      this.isContinueButtonLoading = true
      try {
        await this.$store.dispatch('reauth', this.password)
        this.$emit('reauthed')
      } catch (e) {
        this.setMessage(e.code)
        this.password = ''
      }
      this.isContinueButtonLoading = false
    },

    setMessage(code) {
      if (code === 'auth/wrong-password') {
        this.messageTitle = 'oops'
        this.messageText = 'passwordWrongMessageText'
      } else if (code === 'auth/too-many-requests') {
        this.messageTitle = 'tooManyRequests'
        this.messageText = 'tryAgainLater'
      } else {
        this.messageTitle = 'somethingWentWrong'
        this.messageText = 'tryAgainLaterOrContactSupport'
      }
      this.messageTitle = this.$t(this.messageTitle)
      this.messageText = this.$t(this.messageText)
      this.$refs.message.open()
    },

    async sendResetEmail() {
      this.isForgotButtonLoading = true
      await this.$store.dispatch('resetPassword')
      await this.$nextTick()
      await this.$refs.emailSentPopup.open()
      this.isForgotButtonLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.reauth-form {
  &__continue {
    margin-top: rem(15);
  }
  &__forgot {
    margin-top: rem(12);
  }
}
</style>
