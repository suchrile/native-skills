<template>
  <teleport to="#header-actions" v-if="isMounted">
    <div class="temp" :class="{ active: temp }">
      <slot :key="$route" />
    </div>
  </teleport>
  <!--  <div class="teleport" ref="teleport" :key="$route">-->
  <!--    <slot />-->
  <!--  </div>-->
</template>

<script>
export default {
  data() {
    return {
      h: null,
      t: null,
      isMounted: false,
      temp: false,
    }
  },
  async mounted() {
    // await this.$nextTick()
    // this.h = document.querySelector('#header-actions')
    // this.h.append(this.$refs.teleport)
    this.isMounted = true
  },
}
</script>

<style lang="scss">
.header-actions {
  &__body {
    display: flex;
    justify-content: flex-end;
    gap: rem(10);
    padding-left: rem(12);

    & button {
      height: 100%;
      font-weight: 500 !important;
      pointer-events: auto;
    }
  }
}
.teleport {
  opacity: 1;
  transition: opacity 0.4s ease;

  &.hidden {
    opacity: 0;
  }
}
</style>
