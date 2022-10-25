<template>
  <div class="settings">
    <component :is="layout" />
  </div>
</template>

<script>
import SettingsMainMobile from '@/components/SettingsMainMobile.vue'
import SettingsProfileMobile from '@/components/SettingsProfileMobile.vue'

export default {
  components: { SettingsMainMobile, SettingsProfileMobile },
  computed: {
    layout() {
      return 'settings-main-mobile'
    }
  }
}
</script>

<style lang="scss"></style>
