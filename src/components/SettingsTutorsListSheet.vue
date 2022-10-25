<template>
  <ui-table-view
    footer="До шести членов Вашей семьи могут состоять в семейной группе."
  >
    <ui-table-item
      v-for="user in data.membersData"
      :key="user.id"
      type="disclosure"
      @onItemClick="onItemClick(user.id)"
      @onItemIconClick="click"
    >
      <template #left>
        <img
          :src="user.avatar"
          :alt="user.firstname"
          class="tutor-list__avatar"
        />
      </template>
      <div class="tutor-list__info">
        <span class="tutor-list__name">
          {{ getTutorName(user.id) }}
        </span>
        <span class="tutor-list__role">{{ getTutorSubject(user.id) }}</span>
      </div>
    </ui-table-item>
    <ui-table-item @onItemClick="$emit('addTutorButtonClick')">
      <div class="add">
        <base-icon name="plus-solid" :size="20" />
        <span>Пригласить репетитора</span>
      </div>
    </ui-table-item>
  </ui-table-view>
</template>

<script>
import { mapGetters } from 'vuex'
import UiTableView from '@/components/UiTableView'
import uiTableItem from '@/components/UiTableItem'
import BaseIcon from '@/components/BaseIcon'

export default {
  components: { BaseIcon, UiTableView, uiTableItem },
  props: {
    data: Object
  },
  emits: ['addTutorButtonClick', 'itemClicked'],
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    isCurrentUser(id) {
      return id === this.user.id
    },
    getTutorName(id) {
      const user = this.data.membersData.find((user) => user.id === id)
      return `
      ${user.firstname}
      ${this.isCurrentUser(id) ? '(я)' : user.lastname}
      `
    },
    getTutorSubject(id) {
      return this.$t(
        this.data.membersData.find((user) => user.id === id).subject
      )
    },
    onItemClick(id) {
      this.$emit('itemClicked', id)
    },
    click() {
      // console.log('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
.tutor-list {
  user-select: none;

  &__avatar {
    width: rem(40);
    margin-right: rem(5);
  }
  &__info {
    line-height: 1.3;
    user-select: none;
  }
  &__name {
    display: block;
    font-size: rem(17);
  }
  &__role {
    display: block;
    font-size: rem(15);
    font-weight: 400;
    opacity: 0.5;
    line-height: 1.3;
  }
}
.add {
  display: flex;
  align-items: center;
  gap: rem(15);
  padding: rem(2) 0;
  color: $blue;
  fill: $blue;

  & i {
    width: rem(40);
  }
}

body[theme='dark'] {
  .add {
    color: $darkblue;
  }
}
</style>
