<template>
  <div class="select-sheet">
    <span v-if="selectData.title" class="select-sheet__title">
      {{ $t(selectData.title) }}
    </span>
    <div class="select-sheet__wrapper">
      <ul class="select-sheet__items">
        <li
          v-for="item in selectData.items"
          :key="item.title"
          class="select-sheet__item"
          @click="select(item)"
        >
          <div class="select-sheet__item-content">
            <span>{{ $t(item.title) }}</span>
            <base-icon
              v-if="item.value === selected"
              name="check-regular"
              :size="20"
              class="select-sheet__item-selected"
            />
          </div>
        </li>
      </ul>
    </div>
    <span v-if="selectData.notice" class="select-sheet__notice">
      {{ $t(selectData.notice) }}
    </span>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  components: {
    BaseIcon
  },
  props: {
    selectData: Object
  },
  data: () => ({
    selected: null
  }),
  mounted() {
    this.selected = this.selectData.selected
  },
  methods: {
    select(item) {
      this.selected = item.value
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-sheet {
  &:not(:last-child) {
    margin-bottom: rem(20);
  }
  &__wrapper {
    border-radius: rem(10);
    background-color: #fff;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow: hidden;
  }

  &__title {
    display: block;
    margin-bottom: rem(6);
    padding: 0 rem(15);
    font-size: rem(14);
    text-transform: uppercase;
    color: $grey;
  }

  &__notice {
    display: block;
    margin-top: rem(10);
    padding: 0 rem(15);
    font-size: rem(13);
    line-height: 1.2;
    color: $grey;
  }

  &__items {
  }

  &__item {
    position: relative;
    margin-top: rem(-1);
    overflow: hidden;
    cursor: pointer;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: rem(9) rem(15);
      font-size: rem(17);
      user-select: none;
    }

    &-selected {
      fill: $blue;
    }

    &:not(:last-child):after {
      content: '';
      position: absolute;
      left: rem(15);
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: #e5e5e5;
      transition: background-color 0.3s ease;
    }

    &:active {
      background-color: #e5e5e5;
    }
  }

  body[theme='dark'] & {
    &__wrapper {
      background-color: $AppBackgroundColorDark;
    }
    &__item {
      &-selected {
        fill: $darkblue;
      }
      &:not(:last-child):after {
        background-color: #2d2d30;
      }
      &:active {
        background-color: #2d2d30;
      }
    }
  }
}
</style>
