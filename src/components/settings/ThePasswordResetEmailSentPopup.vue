<template>
  <div class="email-sent">
    <div class="email-sent__image">👀</div>
    <h3 class="email-sent__title">
      {{ $t('checkYourInbox') }}
    </h3>
    <span class="email-sent__note">
      {{ $t('passwordResetPopupNote') }}
    </span>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped>
.email-sent {
  text-align: center;

  &__image {
    margin: rem(20) 0;
    font-size: rem(80);
    line-height: 1;
  }
  &__title {
    font-size: rem(21);
    font-weight: 600;
    line-height: 1.3;
  }
  &__note {
    display: block;
    margin: rem(15) 0;
    line-height: 1.3;
  }
}
</style>
