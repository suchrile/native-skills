<template>
  <div class="range">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="onInput"
      class="range__input"
    />
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      inputElement: null,
    }
  },

  emits: ['update:modelValue', 'input'],

  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
      this.$emit('input', event)

      this.setStyle(event.target.value)
    },

    setStyle(value) {
      this.inputElement.style.backgroundSize =
        ((value - this.min) * 100) / (this.max - this.min) + '% 100%'
    },
  },

  mounted() {
    this.inputElement = document.querySelector('.range__input')
    this.setStyle(this.modelValue)
  },
}
</script>

<style lang="scss" scoped>
.range {
  width: fit-content;

  &__input {
    display: block;
    width: rem(250);
    border-radius: 5px;
    background-color: rgba($color: white, $alpha: 0.25);
    background-image: linear-gradient($blue, $blue);
    background-size: 0 100%;
    background-repeat: no-repeat;
    z-index: 2;

    &::-webkit-slider-runnable-track {
      height: rem(5);
      background: transparent;
    }

    &::-webkit-slider-thumb {
      height: rem(24);
      width: rem(24);
      background-color: $AppBackgroundColorLight;
      border-radius: 50%;
      transform: translate(0, rem(-9));
    }

    &,
    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }
  }

  body[theme='dark'] & {
    &__input {
      background-image: linear-gradient($darkblue, $darkblue);
    }
  }
}
</style>
