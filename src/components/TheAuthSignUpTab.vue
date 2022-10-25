<template>
  <form class="auth__form">
    <base-text-field label="firstname" floating v-model.trim="firstname" />
    <base-text-field label="lastname" floating v-model.trim="lastname" />
    <base-text-field type="email" label="email" floating v-model.trim="email" />
    <base-text-field
      type="password"
      label="password"
      floating
      v-model.trim="password"
    />
    <base-text-field type="password" label="passwordConfirm" floating />
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
import { signup } from '@/services/auth'
import BaseTextField from '@/components/BaseTextField.vue'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  name: 'the-auth-sign-up-tab',
  components: {
    BaseTextField,
    BaseButton
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      buttonLoading: false
    }
  },
  methods: {
    async submitHandler() {
      this.buttonLoading = true
      const userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      }
      try {
        await signup(userData)
        this.$router.push('/')
      } catch (e) {
        this.buttonLoading = false
      }
    }
  }
})
</script>

<style lang="scss"></style>
