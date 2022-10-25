<template>
  <div class="table-view">
    <div v-if="header" class="table-view__header">{{ header }}</div>
    <div class="table-view__body">
      <slot />
    </div>
    <div v-if="footer" class="table-view__footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    header: String,
    footer: String
  }
}
</script>

<style lang="scss" scoped>
.table-view {
  user-select: none;

  &__header {
    display: block;
    margin-bottom: rem(5);
    padding: 0 rem(15);
    font-size: rem(14);
    text-transform: uppercase;
    color: $grey;
  }

  &__body {
    border-radius: rem(12);
    background-color: #fff;
    overflow: hidden;
  }

  &__footer {
    margin-top: rem(10);
    padding: 0 rem(15);
    font-size: rem(14);
    line-height: 1.2;
    color: $grey;
  }

  body[theme='dark'] & {
    &__body {
      background-color: $AppBackgroundColorDark;
    }
  }
}
</style>
