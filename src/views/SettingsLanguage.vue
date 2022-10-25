<template>
  <section class="settings-language">
    <base-select-sheet :selectData="selectData" @select="setLanguage($event)" />
  </section>
</template>

<script>
import { languageList, getLanguage, setLanguage } from '@/i18n'
import BaseSelectSheet from '@/components/BaseSelectSheet.vue'

export default {
  components: {
    BaseSelectSheet,
  },
  data() {
    return {
      setLanguage,
      selectData: {
        title: 'languageTitle',
        items: languageList,
        selected: getLanguage().value,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.settings-language {
  margin-top: rem(20);
}
</style>
