<template>
  <section class="settings-appearance">
    <base-select-sheet
      :selectData="themes"
      @select="setTheme($event)"
      class="settings-appearance__select-list"
    />
  </section>
</template>

<script>
import { getTheme, setTheme, themeList } from '@/services/theme'
import BaseSelectSheet from '@/components/BaseSelectSheet.vue'

export default {
  components: {
    BaseSelectSheet,
  },
  data: () => ({
    setTheme,
    themes: {
      title: 'appearanceTitle',
      items: themeList,
      selected: getTheme().value,
    },
  }),
}
</script>

<style lang="scss" scoped>
.settings-appearance {
  margin-top: rem(20);
}
</style>
