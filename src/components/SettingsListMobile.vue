<template>
  <base-list-sheet :lists="lists" with-icons />
</template>

<script>
import BaseListSheet from './BaseListSheet.vue'

export default {
  components: {
    BaseListSheet,
  },
  data: () => ({
    lists: [
      [
        {
          title: 'tutors',
          route: '/settings/tutors',
          icon: 'rectangles-mixed-regular',
          class: 'boards',
        },
        {
          title: 'boards',
          route: '/settings/boards',
          icon: 'rectangles-mixed-regular',
          class: 'boards',
        },
        {
          title: 'todoLists',
          route: '/settings/todo-lists',
          icon: 'list-check-regular',
          class: 'todolists',
        },
      ],
      [
        {
          title: 'appearance',
          route: '/settings/appearance',
          icon: 'brightness-regular',
          class: 'appearance',
        },
        {
          title: 'language',
          label: 'currentLanguage',
          route: '/settings/language',
          icon: 'globe-regular',
          class: 'language',
        },
      ],
      [
        {
          title: 'support',
          route: '/settings/support',
          icon: 'circle-question-regular',
          class: 'support',
        },
        {
          title: 'timesFeatures',
          route: '/settings/times-features',
          icon: 'lightbulb-regular',
          class: 'features',
        },
        {
          title: 'reportABug',
          route: '/settings/report-a-bug',
          icon: 'bug-regular',
          class: 'report',
        },
      ],
    ],
  }),
}
</script>

<style lang="scss"></style>
