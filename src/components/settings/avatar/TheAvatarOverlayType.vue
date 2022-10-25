<template>
  <div class="avatar-type">
    <h2 class="avatar-type__title" v-html="$t('avatarOverlayTitle')"></h2>
    <div class="avatar-type__list">
      <div
        v-for="t in types"
        :key="t.id"
        class="avatar-type__element"
        :class="[
          { disabled: t.disabled },
          { active: selectedType === t.id && !t.disabled },
        ]"
        @click="selectType(t)"
      >
        <div
          class="avatar-type__element-preview avatar-preview"
          :style="`background: ${t.bg}`"
        >
          <img
            v-if="t.image"
            :src="t.image"
            :alt="t.title"
            class="avatar-preview__memoji"
          />
          <span v-else-if="t.emoji" class="avatar-preview__emoji">
            {{ t.emoji }}
          </span>
          <span v-else-if="t.monogram" class="avatar-preview__monogram">
            {{ userInitials }}
          </span>
          <base-icon
            v-else-if="t.icon"
            :name="t.icon"
            :size="42"
            class="avatar-preview__photo"
          />
        </div>
        <div class="avatar-type__element-title">{{ $t(t.title) }}</div>
      </div>
    </div>
    <base-button
      view="filled"
      size="huge full"
      text="continue"
      class="avatar-type__button"
      :disabled="!selectedType"
      @click="$emit('select', selectedType)"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BaseIcon,
    BaseButton,
  },
  emits: {
    select: Number,
  },
  data() {
    return {
      types: [
        {
          id: 1,
          title: 'memoji',
          image: require('@/assets/memoji/memoji_353.png'),
          bg: '#B3E4BB',
        },
        { id: 2, title: 'emoji', emoji: '🫠', bg: '#BADFF2' },
        {
          id: 3,
          title: 'monogram',
          monogram: true,
          bg: 'linear-gradient(to bottom, #BBA9F0, #A087F4)',
        },
        {
          id: 4,
          title: 'photo',
          icon: 'camera-regular',
          bg: '#CACACB',
          disabled: false,
        },
      ],
      selectedType: null,
    }
  },
  computed: {
    ...mapGetters(['userData']),

    userInitials() {
      return this.userData.firstname[0] + (this.userData.lastname[0] || '')
    },
  },
  methods: {
    selectType(type) {
      if (!type.disabled) {
        this.selectedType = type.id
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-type {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 rem(20);

  &__title {
    margin-top: rem(20);
    font-size: rem(30);
    text-align: center;
    line-height: 1.3;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    row-gap: rem(15);
  }

  &__element {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: rem(150);
    height: rem(150);
    position: relative;

    &::before {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid $blue;
      border-radius: rem(18);
      opacity: 0;
      transition: opacity 0.2s ease;
      position: absolute;
    }

    &.active::before {
      opacity: 1;
    }

    & .avatar-preview {
      display: flex;
      justify-content: center;
      align-items: center;
      width: rem(90);
      height: rem(90);
      border-radius: 50%;
      pointer-events: none;

      &__memoji {
        width: 95%;
        transform: translate(rem(1.5), rem(1));
      }

      &__emoji {
        font-size: rem(50);
      }

      &__monogram {
        font-family: 'SF Compact Rounded', sans-serif;
        font-size: rem(40);
        font-weight: 500;
        text-transform: uppercase;
        color: white;
      }

      &__photo {
        fill: white;
      }
    }

    &-title {
      margin-top: rem(10);
      font-size: rem(18);
      line-height: 1;
    }
  }

  &__button {
    margin-bottom: rem(30);
    font-weight: 600;
  }

  body[theme='dark'] & {
    &__element::before {
      border-color: $darkblue;
    }
  }
}
</style>
