<template>
  <form class="auth__form">
    <base-text-field type="email" label="email" floating v-model.trim="email" />
    <base-text-field
      type="password"
      label="password"
      floating
      v-model.trim="password"
    />
    <base-button
      type="submit"
      text="continue"
      view="filled"
      size="large full"
      class="auth__form-btn"
      :loading="buttonLoading"
      @click.prevent="submitHandler"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { logIn } from '@/services/auth'
import BaseTextField from '@/components/BaseTextField.vue'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  name: 'the-auth-sign-in-tab',
  components: {
    BaseTextField,
    BaseButton
  },
  data() {
    return {
      email: '',
      password: '',
      buttonLoading: false
    }
  },
  methods: {
    async submitHandler() {
      this.buttonLoading = true
      const userData = {
        email: this.email,
        password: this.password
      }
      try {
        await logIn(userData)
        this.$store.dispatch('getUserData')
        const to = this.$route.query.to ? this.$route.query.to.toString() : '/'
        this.$router.push(to)
      } catch (e) {
        this.buttonLoading = false
      }
    }
  }
})
</script>

<style lang="scss">
.auth__form {
  & .text-field:not(:last-child) {
    margin-bottom: rem(10);
  }

  &-btn {
    margin-top: rem(20);
  }

  &-forgot-password {
    display: block;
    margin-top: rem(25);
    text-align: center;
    color: $blue;
  }

  body[theme='dark'] & {
    &-forgot-password {
      color: $darkblue;
    }
  }
}
</style>
