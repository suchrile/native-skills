<template>
  <div class="input-sheet">
    <span v-if="title" class="input-sheet__title">
      {{ $t(title) }}
    </span>
    <div class="input-sheet__body">
      <ul class="input-sheet__list">
        <slot />
      </ul>
    </div>
    <span v-if="note" class="input-sheet__note">
      {{ $t(note) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    note: String,
  },
}
</script>

<style lang="scss">
.input-sheet {
  &__title {
    display: block;
    margin-bottom: rem(5);
    padding: 0 rem(15);
    font-size: rem(14);
    text-transform: uppercase;
    color: $grey;
  }

  &__body {
    border-radius: rem(10);
    background-color: #fff;
    margin-bottom: rem(10);
    overflow: hidden;
  }

  & li {
    padding: rem(10) rem(15);
    overflow: hidden;
    position: relative;

    & input {
      width: 100%;
      color: inherit;
      font-size: rem(18);
      border: none;
      outline: none;
      appearance: none;
      background: transparent;
      &::placeholder {
        opacity: 0.5;
      }
    }
    &:not(:last-child)::after {
      content: '';
      left: rem(15);
      bottom: 0;
      width: 100%;
      height: rem(1);
      background-color: #e5e5e5;
      position: absolute;
    }
  }

  &__note {
    display: block;
    margin-top: rem(11);
    padding: 0 rem(15);
    font-size: rem(14);
    line-height: 1.2;
    color: $grey;
  }

  body[theme='dark'] & {
    &__body {
      background-color: $AppBackgroundColorDark;
      & li {
        &:not(:last-child)::after {
          background-color: #2d2d30;
        }
      }
    }
  }
}
</style>
