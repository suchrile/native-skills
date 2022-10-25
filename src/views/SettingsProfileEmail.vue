<template>
  <div class="email-change">
    <h3 class="email-change__title">
      {{ $t('emailChangeTitle') }}
    </h3>

    <div v-if="step === 1" class="email-change__step">
      <span class="email-change__note" v-html="$t('reauthNote')"> </span>
      <div class="email-change__reauth-form">
        <settings-reauth-form @reauthed="step = 2" />
      </div>
    </div>

    <div v-if="step === 2" class="email-change__step">
      <span class="email-change__note" v-html="$t('emailChangeNote')"> </span>
      <base-input-sheet class="email-change__textfields">
        <li>
          <input
            type="email"
            v-model.trim="emailNew"
            :placeholder="$t('email')"
          />
        </li>
        <li>
          <input
            type="email"
            v-model.trim="emailConfirm"
            :placeholder="$t('emailConfirm')"
          />
        </li>
      </base-input-sheet>
      <base-button
        text="save"
        view="filled"
        size="full"
        class="email-change__button"
        :loading="isSaveButtonLoading"
        :disabled="!isSaveButtonActive"
        @click="changeEmail"
      />
    </div>
  </div>

  <base-message ref="message" :title="messageTitle" :text="messageText" />
</template>

<script>
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, email, not, sameAs, helpers } from '@vuelidate/validators'
import BaseButton from '@/components/BaseButton'
import BaseInputSheet from '@/components/BaseInputSheet'
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
  data: () => ({
    step: 1,
    emailNew: '',
    emailConfirm: '',
    messageTitle: '',
    messageText: '',
    isSaveButtonLoading: false,
  }),
  validations() {
    return {
      emailNew: {
        required,
        email: helpers.withMessage(this.$t('emailChangeNotValid'), email),
        sameAs: helpers.withMessage(
          this.$t('emailChangeNotDifferent'),
          not(this.emailNew == this.userData.email)
        ),
      },
      emailConfirm: {
        required,
        sameAs: helpers.withMessage(
          this.$t('emailChangeDontMatch'),
          sameAs(this.emailNew)
        ),
      },
    }
  },
  computed: {
    ...mapGetters(['userData']),
    isSaveButtonActive() {
      return this.emailNew && this.emailConfirm !== ''
    },
  },
  methods: {
    async changeEmail() {
      this.isSaveButtonLoading = true
      const isFormValid = await this.validateForm()
      if (!isFormValid) {
        this.isSaveButtonLoading = false
        this.emailConfirm = ''
        return
      }
      // try {
      //   await this.$store.dispatch('changeEmail', this.emailNew)
      //   await this.setMessage({ title: 'emailChangeSuccess' })
      //   this.$router.push('/settings/profile')
      // } catch (e) {
      //   alert(e)
      // }
      this.isSaveButtonLoading = false
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
      title ? (this.messageTitle = this.$t(title)) : ''
      text ? (this.messageText = text) : ''
      await this.$refs.message.open()
    },
  },
}
</script>

<style lang="scss" scoped>
.email-change {
  text-align: center;

  &__title {
    margin-top: rem(10);
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
