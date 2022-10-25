<template>
  <div class="settings-profile-name">
    <base-header-actions>
      <base-button
        view="plain"
        size="medium"
        text="save"
        :disabled="!canSave"
        :loading="buttonLoading"
        @click="update"
      />
    </base-header-actions>
    <base-input-sheet note="nameChangeNote">
      <li>
        <input
          type="text"
          v-model.trim="firstname"
          :placeholder="$t('firstname')"
        />
      </li>
      <li>
        <input
          type="text"
          v-model.trim="lastname"
          :placeholder="$t('nameChangeLastname')"
        />
      </li>
    </base-input-sheet>
  </div>

  <base-message
    ref="message"
    :title="$t('nameChangeErrorTitle')"
    :text="$t('nameChangeErrorText')"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import capitalize from '@/helpers/string'
import { setName } from '@/services/user'
import BaseInputSheet from '@/components/BaseInputSheet.vue'
import BaseHeaderActions from '@/components/BaseHeaderActions.vue'
import BaseMessage from '@/components/BaseMessage.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseInputSheet,
    BaseHeaderActions,
    BaseMessage,
    BaseButton
  },
  data: () => ({
    capitalize,
    firstname: null,
    lastname: null,
    buttonLoading: false
  }),
  mounted() {
    this.firstname = this.user.firstname
    this.lastname = this.user.lastname
  },
  watch: {
    user() {
      this.firstname = this.user.firstname
      this.lastname = this.user.lastname
    }
  },
  computed: {
    ...mapGetters(['user']),
    canSave() {
      return (
        this.firstname !== this.user.firstname ||
        this.lastname !== this.user.lastname
      )
    }
  },
  methods: {
    async update() {
      if (this.firstname === '') {
        await this.$refs.message.open()
        return
      }
      this.buttonLoading = true
      const toUpdate = {
        firstname: this.capitalize(this.firstname),
        lastname: this.capitalize(this.lastname)
      }
      await setName(toUpdate)
      this.$router.push('/settings/profile')
      this.buttonLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-profile-name {
  padding-top: rem(20);
}
</style>
