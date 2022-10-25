<template>
  <div class="text-field" :class="{ floating }">
    <input
      class="text-field__input"
      :type="type || 'text'"
      :placeholder="$t(label)"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label v-if="floating" class="text-field__label">
      {{ $t(label) }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: String,
    label: String,
    floating: Boolean,
    modelValue: String
  },
  emits: ['input', 'update:modelValue']
})
</script>

<style lang="scss" scoped>
.text-field {
  &.invalid {
    & .text-field__label {
      color: $red;
    }
    & .text-field__input {
      border-color: $red;
    }
  }
  &.invalid .text-field__input:focus {
    border-color: $softgrey;

    & + .text-field__label {
      color: $grey;
    }
  }

  &__label {
    display: block;
    font-size: rem(16);
    color: $grey;
    line-height: 1;
  }

  &__input {
    display: block;
    width: 100%;
    height: rem(42);
    padding: rem(6) rem(10);
    font-size: rem(16);
    color: $AppTextColorDark;
    border: 1px solid $softgrey;
    border-radius: 8px;
    appearance: none;
  }

  &__hint {
    display: flex;
    align-items: center;
    padding-top: rem(8);
    padding-left: rem(5);
    font-size: rem(14);
    line-height: 1;
    color: $red;

    &::before {
      margin-right: rem(4);
      font-size: rem(16);
    }
  }

  &__input[type='password'] {
    -webkit-text-security: square;
  }

  &__input[type='search']::-webkit-search-decoration,
  &__input[type='search']::-webkit-search-cancel-button,
  &__input[type='search']::-webkit-search-results-button,
  &__input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  &__input::placeholder {
    color: $grey;
  }

  &__input:focus {
    background-color: #fff;
    border-color: $softgrey;
    outline: 0;
  }

  &__input:disabled,
  &__input[readonly] {
    background-color: #f5f5f5;
    opacity: 1;
  }
}

/* with floating label */
.floating {
  position: relative;
}

.floating .text-field__input {
  height: rem(58);
  padding: rem(16) rem(12);
}

.floating .text-field__label {
  position: absolute;
  top: 50%;
  left: 0;
  padding: 0 rem(12);
  pointer-events: none;
  transform-origin: 0 0;
  transform: translateY(-50%);
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.floating .text-field__input::-moz-placeholder {
  color: transparent;
}

.floating .text-field__input::placeholder {
  color: transparent;
}

.floating .text-field__input:focus,
.floating .text-field__input:not(:placeholder-shown) {
  padding-top: rem(28);
  padding-bottom: rem(10);
}

.floating .text-field__input:focus ~ .text-field__label,
.floating .text-field__input:not(:placeholder-shown) ~ .text-field__label {
  opacity: 0.8;
  transform: scale(0.85) translateY(-145%) translateX(0.2rem);
}
</style>
