<template>
  <h1 class="view-title" ref="largeTitle">{{ title }}</h1>
</template>

<script>
export default {
  name: 'base-view-title',
  data() {
    return {
      headerTitle: null,
    }
  },
  computed: {
    title() {
      return this.$t(this.$route.name)
    },
  },
  methods: {
    scrollHandler() {
      if (window.scrollY >= 30) {
        this.headerTitle.classList.remove('hidden')
        this.$refs.largeTitle.classList.add('hidden')
        document.querySelector('.header').classList.add('highlighted')
      } else {
        this.headerTitle.classList.add('hidden')
        this.$refs.largeTitle.classList.remove('hidden')
        document.querySelector('.header').classList.remove('highlighted')
      }
    },
  },
  async mounted() {
    await this.$nextTick()
    this.headerTitle = document.querySelector('.header__title')
    window.addEventListener('scroll', this.scrollHandler)
    if (this.$route.meta.largeTitle) {
      this.headerTitle.classList.add('hidden')
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
    this.headerTitle.classList.remove('hidden')
  },
}
</script>

<style lang="scss" scoped>
.view-title {
  padding: 0 0 rem(10);
  font-size: rem(30);
  font-weight: 700;
  transition: opacity 0.2s ease-in-out;

  &.hidden {
    opacity: 0;
  }
}
</style>
