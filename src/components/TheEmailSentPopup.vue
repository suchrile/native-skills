<template>
  <div class="email-sent">
    <div class="email-sent__image">👀</div>
    <h3 class="email-sent__title">
      {{ $t('checkYourInbox') }}
    </h3>
    <span class="email-sent__note">
      {{ $t('confirmationEmailSent') }}
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
    font-size: rem(80);
  }
  &__title {
    font-size: rem(21);
    font-weight: 600;
  }
  &__note {
    display: inline-block;
    margin: rem(12) 0;
    line-height: 1.3;
  }
}
</style>
