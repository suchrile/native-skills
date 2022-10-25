<template>
  <memoji-hero @select="onHeroSelect" ref="heroOverlay" />
  <memoji-pose :hero="hero" @select="onPoseSelect" ref="poseOverlay" />
  <memoji-style
    :image-src="croppedImageSrc"
    @select="onStyleSelect"
    ref="styleOverlay"
  />
</template>

<script>
import memojiHero from '@/components/settings/avatar/TheMemojiHeroOverlay'
import memojiPose from '@/components/settings/avatar/TheMemojiPoseOverlay'
import memojiStyle from '@/components/settings/avatar/TheMemojiStyleOverlay'

export default {
  components: {
    memojiHero,
    memojiPose,
    memojiStyle
  },
  emits: ['done'],
  data() {
    return {
      hero: null,
      croppedImageSrc: null,
      finallyImageSrc: null,

      step: 1
    }
  },
  methods: {
    open() {
      this.$refs.heroOverlay.open()
    },

    onHeroSelect(hero) {
      this.hero = hero
      this.$refs.poseOverlay.open()
    },

    onPoseSelect(image) {
      this.croppedImageSrc = image
      this.$refs.styleOverlay.open()
    },

    onStyleSelect(image) {
      this.finallyImageSrc = image
      this.save()
    },

    async save() {
      await this.$store.dispatch('uploadAvatar', this.finallyImageSrc)

      this.$emit('done')
      this.$refs.heroOverlay.close()
      this.$refs.poseOverlay.close()
      setTimeout(() => {
        this.$refs.styleOverlay.close()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped></style>
