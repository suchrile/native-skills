<template>
  <div class="list-sheet" :class="{ 'with-icon': withIcons }">
    <span v-if="title" class="list-sheet__title">
      {{ $t(title) }}
    </span>
    <ul v-for="list in lists" :key="list" class="list-sheet__body">
      <li v-for="item in list" :key="item.route" class="list-sheet__item">
        <router-link
          class="list-sheet__item-content"
          :to="item.route"
          @click="item.emit ? $emit(item.emit) : ''"
        >
          <div
            v-if="item.icon"
            class="list-sheet__item-icon"
            :class="item.class"
          >
            <base-icon :name="item.icon" :size="18" />
          </div>
          <span class="list-sheet__item-title">
            {{ item.localized ? item.title : $t(item.title) }}
          </span>
          <span v-if="item.label" class="list-sheet__item-label">
            {{ $t(item.label) }}
          </span>
          <base-icon
            name="chevron-right-solid"
            :size="13"
            class="list-sheet__chevron"
          />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  props: {
    lists: Array,
    title: String,
    withIcons: Boolean
  },
  components: {
    BaseIcon
  }
}
</script>

<style lang="scss">
.list-sheet {
  margin-top: rem(15);
  user-select: none;

  &__title {
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

    &:not(:last-child) {
      margin-bottom: rem(10);
    }
  }

  &__item {
    position: relative;
    overflow: hidden;
    margin-top: rem(-1);

    &:not(:last-child):after {
      content: '';
      position: absolute;
      left: rem(15);
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: #e5e5e5;
    }
  }

  &__item-content {
    display: flex;
    align-items: center;
    width: 100%;
    padding: rem(10) rem(15);

    &:active {
      background-color: #e5e5e5;
    }
  }

  &__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(30);
    height: rem(30);
    margin-right: rem(10);
    fill: #fff;
    border-radius: rem(8);
  }

  &__item-title {
    font-size: rem(17);
  }

  &__item-label {
    right: rem(35);
    font-size: rem(17);
    line-height: 1;
    opacity: 0.5;
    position: absolute;
  }

  &__chevron {
    margin-left: auto;
    opacity: 0.3;
  }

  &.with-icon & {
    &__item-content {
      padding: rem(7) rem(15) rem(7) rem(12);
    }
    &__item {
      &:not(:last-child)::after {
        left: rem(52);
      }
    }
  }

  body[theme='dark'] & {
    &__body {
      background-color: $AppBackgroundColorDark;
    }
    &__item:not(:last-child):after {
      background-color: #2d2d2f;
    }
    &__item-content {
      color: $AppTextColorLight;
      &:active {
        background-color: #2d2d2f;
      }
    }
    &__chevron {
      fill: $AppTextColorLight;
    }
  }
}

.boards {
  background-color: $indigo;
}

.todolists {
  background-color: $orange;
}

.appearance {
  background-color: $cyan;
}

.language {
  background-color: $purple;
}

.support {
  background-color: $teal;
}

.features {
  background-color: $yellow;
}

.report {
  background-color: $pink;
}
</style>
