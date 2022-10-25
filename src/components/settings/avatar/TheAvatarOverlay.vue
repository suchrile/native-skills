<template>
  <base-overlay ref="overlay">
    <avatar-overlay-type @select="selectType" />
  </base-overlay>
  <component :is="avatarTypeComponent" @done="close" ref="avatarTypeOverlay" />
</template>

<script>
import BaseOverlay from '../../BaseOverlay.vue'
import AvatarOverlayType from './TheAvatarOverlayType.vue'
import TheMemojiSettings from '@/components/settings/avatar/TheMemojiSettings'
import TheEmojiSettings from '@/components/settings/avatar/TheEmojiSettings'
import TheMonogramSettings from '@/components/settings/avatar/TheMonogramSettings'
import thePhotoSettings from '@/components/settings/avatar/ThePhotoSettings'

export default {
  components: {
    TheEmojiSettings,
    TheMemojiSettings,
    BaseOverlay,
    AvatarOverlayType,
    TheMonogramSettings,
    thePhotoSettings,
  },
  data() {
    return {
      avatarType: null,
      avatarTypesComponents: {
        1: 'the-memoji-settings',
        2: 'the-emoji-settings',
        3: 'the-monogram-settings',
        4: 'the-photo-settings',
      },
    }
  },
  computed: {
    avatarTypeComponent() {
      return this.avatarTypesComponents[this.avatarType]
    },
  },
  methods: {
    open() {
      this.$refs.overlay.open()
    },

    close() {
      this.$refs.overlay.close()
    },

    async selectType(typeId) {
      this.avatarType = typeId
      await this.$nextTick()
      this.$refs.avatarTypeOverlay.open()
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-overlay {
  height: 100%;
}

// .slide-enter-active,
// .slide-leave-active {
//   position: absolute;
//   width: 100%;
//   height: 100%;
// }

// .slide-leave-active {
//   z-index: 100;
//   animation: leave 0.5s cubic-bezier(0.2, 0, 0.35, 1);
// }
// .slide-enter-active {
//   // transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
//   // transition: transform 0.5s cubic-bezier(0.25, 0.9, 0.6, 1);
//   // cubic-bezier(0.3, 0.8, 0.35, 1);
//   // cubic-bezier(0.25, 0.75, 0, 1)
//   transition: transform 0.5s cubic-bezier(0.3, 0.8, 0.35, 1);
//   z-index: 101;
// }

// // .left {
// //   transform: translate3d(-30%, 0, 0);
// // }
// .right {
//   transform: translate3d(100%, 0, 0);
// }

// @keyframes leave {
//   80% {
//     transform: translate3d(-35%, 0, 0);
//   }
//   100% {
//     transform: translate3d(-35%, 0, 0);
//   }
// }
</style>
