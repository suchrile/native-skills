<template>
  <div class="email-popup">
    <i class="email-popup__image">📨</i>
    <div class="email-popup__address">{{ userData.email }}</div>
    <div v-if="userData.emailVerified" class="email-popup__verified">
      <base-icon
        name="circle-check-regular"
        size="20"
        class="email-popup__icon green"
      />
      <span>{{ $t('verified') }}</span>
    </div>
    <div v-else class="email-popup__verified">
      <base-icon
        name="circle-exclamation-regular"
        size="20"
        class="email-popup__icon yellow"
      />
      <span>{{ $t('notVerified') }}</span>
    </div>
    <div class="email-popup__note">
      {{ $t('emailPopupNote') }}
    </div>
    <div class="email-popup__actions">
      <base-button
        text="change"
        size="large full"
        view="filled"
        class="email-popup__button"
        @click="changeEmail"
      />
      <base-button
        v-if="!userData.emailVerified"
        text="verify"
        size="large full"
        view="filled"
        class="email-popup__button"
        :loading="isVerifyButtonLoading"
        @click="verifyEmail"
      />
    </div>
  </div>

  <base-message ref="message" :title="messageTitle" :text="messageText" />
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIcon from '@/components/BaseIcon'
import BaseButton from '@/components/BaseButton'
import BaseMessage from './BaseMessage.vue'

export default {
  components: { BaseButton, BaseIcon, BaseMessage },
  emits: ['emailSent'],
  data: () => ({
    isVerifyButtonLoading: false,
    messageTitle: '',
    messageText: '',
  }),
  computed: {
    ...mapGetters(['userData']),
  },
  methods: {
    async verifyEmail() {
      this.isVerifyButtonLoading = true
      try {
        await this.$store.dispatch('verifyEmail')
        this.$emit('emailSent')
      } catch (e) {
        this.setMessage(e.code)
      }
      this.isVerifyButtonLoading = false
    },

    setMessage(code) {
      if (code === 'auth/too-many-requests') {
        this.messageTitle = 'tooManyRequests'
        this.messageText = 'tryAgainLater'
        this.$refs.message.open()
      }
    },

    changeEmail() {
      this.$router.push('/settings/profile/email')
    },
  },
}
</script>

<style lang="scss" scoped>
.email-popup {
  text-align: center;

  &__image {
    display: block;
    padding: rem(15) 0;
    font-size: rem(100);
    line-height: 1;
    font-style: normal;
  }
  &__address {
    font-size: rem(22);
    font-weight: 500;
  }
  &__verified {
    display: inline-flex;
    align-items: center;
    gap: rem(5);
  }
  &__note {
    margin-top: rem(10);
    line-height: 1.3;
  }
  &__actions {
    margin-top: rem(20);
    display: flex;
    gap: rem(10);
  }
}
</style>
