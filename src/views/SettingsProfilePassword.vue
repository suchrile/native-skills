<template>
  <div class="password-change">
    <h3 class="password-change__title">
      {{ $t('passwordChangeTitle') }}
    </h3>

    <div v-if="step === 1" class="password-change__step">
      <span
        class="password-change__note"
        v-html="$t('passwordChangeNoteStep1')"
      >
      </span>
      <div class="password-change__reauth-form">
        <settings-reauth-form @reauthed="step = 2" />
      </div>
    </div>

    <div v-if="step === 2" class="password-change__step">
      <span
        class="password-change__note"
        v-html="$t('passwordChangeNoteStep2', { n: minPasswordLenght })"
      >
      </span>
      <base-input-sheet class="password-change__textfields">
        <li>
          <input
            type="password"
            v-model.trim="password"
            :placeholder="$t('password')"
          />
        </li>
        <li>
          <input
            type="password"
            v-model.trim="passwordConfirm"
            :placeholder="$t('passwordConfirm')"
          />
        </li>
      </base-input-sheet>
      <base-button
        text="save"
        view="filled"
        size="full"
        class="password-change__button"
        :loading="isSaveButtonLoading"
        :disabled="!isSaveButtonActive"
        @click="changePassword"
      />
    </div>
  </div>

  <base-message ref="message" :title="messageTitle" :text="messageText" />
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
import BaseInputSheet from '@/components/BaseInputSheet.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseMessage from '@/components/BaseMessage.vue'
import SettingsReauthForm from '@/components/SettingsReauthForm.vue'

export default {
  components: {
    BaseInputSheet,
    BaseButton,
    BaseMessage,
    SettingsReauthForm,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      step: 1,
      password: '',
      passwordConfirm: '',
      minPasswordLenght: 8,
      messageTitle: '',
      messageText: '',
      isSaveButtonLoading: false,
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: helpers.withMessage(
          this.$t('passwordChangeTooShort', { n: this.minPasswordLenght }),
          minLength(this.minPasswordLenght)
        ),
      },
      passwordConfirm: {
        required,
        sameAs: helpers.withMessage(
          this.$t('passwordChangeDontMatch'),
          sameAs(this.password)
        ),
      },
    }
  },
  computed: {
    isSaveButtonActive() {
      return this.password && this.passwordConfirm !== ''
    },
  },
  methods: {
    async changePassword() {
      this.isSaveButtonLoading = true
      const isFormValid = await this.validateForm()
      if (!isFormValid) {
        this.isSaveButtonLoading = false
        this.passwordConfirm = ''
        return
      }
      try {
        await this.$store.dispatch('changePassword', this.password)
        await this.setMessage({ title: 'passwordChangeSuccess' })
        this.$router.push('/settings/profile')
      } catch (e) {
        alert(e)
      }
    },

    async validateForm() {
      this.v$.$validate()
      if (this.v$.$error) {
        await this.setMessage({
          title: 'oops',
          text: this.v$.$errors[0].$message,
        })
        return false
      }
      return true
    },

    async setMessage({ title, text }) {
      this.messageTitle = ''
      this.messageText = ''
      title ? (this.messageTitle = this.$t(title)) : ''
      text ? (this.messageText = text) : ''
      await this.$refs.message.open()
    },
  },
}
</script>

<style lang="scss" scoped>
.password-change {
  text-align: center;

  &__title {
    padding-top: rem(10);
    font-size: rem(24);
    font-weight: 700;
  }
  &__note {
    display: block;
    margin-top: rem(8);
    font-size: rem(17);
    line-height: 1.3;
  }
  &__reauth-form {
    margin-top: rem(25);
  }
  &__textfields {
    margin-top: rem(25);
  }
  &__button {
    margin-top: rem(15);
  }
}
</style>
