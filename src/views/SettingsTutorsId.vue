<template>
  <div v-if="community" class="community-member-info">
    <ui-table-view class="community-member-info__sheet">
      <ui-table-item>
        <div class="community-member-info__profile profile">
          <div class="profile__avatar">
            <img :src="userData.avatar" alt="Profile preview" />
          </div>
          <div class="profile__info">
            <div class="profile__name">{{ userName }}</div>
            <div class="profile__join-date">
              Дата присоединения: {{ userJoinDate }}
            </div>
          </div>
        </div>
      </ui-table-item>
      <ui-table-item :labels="[userData.email]">
        <div class="community-member-info__account account">
          <span class="account__title">Учетная запись</span>
        </div>
      </ui-table-item>
      <ui-table-item type="disclosure" :labels="[$t(userData.subject)]">
        <div class="community-member-info__account account">
          <span class="account__title">Предмет</span>
        </div>
      </ui-table-item>
    </ui-table-view>
    <ui-table-view>
      <ui-table-item :highlight-on-touch="true" @on-item-click="deleteUser">
        <div class="community-member-info__delete">
          Удалить этого пользователя ({{ userData.firstname }})
        </div>
      </ui-table-item>
    </ui-table-view>
  </div>
  <base-action-sheet
    :actions="actions"
    note="COMMUNITY_MEMBER_DELETE_NOTE"
    ref="alertAction"
  />
</template>

<script>
import { getUserById } from '@/services/user'
import { getCommunity, deleteMember } from '@/services/community'
import { getLocalFormattedDate } from '@/services/date'
import UiTableView from '@/components/UiTableView'
import UiTableItem from '@/components/UiTableItem'
import BaseActionSheet from '@/components/BaseActionSheet.vue'

export default {
  components: {
    BaseActionSheet,
    UiTableItem,
    UiTableView
  },
  props: {
    data: Object
  },
  data() {
    return {
      community: null,
      isOpen: false,
      actions: [{ title: 'delete', action: 'delete', destructive: true }]
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    userData() {
      return this.community.membersData.filter(
        (user) => user.id === this.userId
      )[0]
    },
    userName() {
      return `${this.userData.firstname} ${this.userData.lastname}`
    },
    userJoinDate() {
      return getLocalFormattedDate(this.userData.memberSince)
    }
  },
  methods: {
    async deleteUser() {
      const res = await this.$refs.alertAction.open()
      console.log(res)
      // await deleteMember(this.userId)
    }
  },
  async mounted() {
    this.community = await getCommunity()
  }
}
</script>

<style lang="scss" scoped>
.community-member-info {
  padding-top: rem(25);

  & .table-view:not(:last-child) {
    margin-bottom: rem(30);
  }

  .profile {
    display: flex;
    align-items: center;
    gap: rem(15);

    &__avatar {
      width: rem(60);
      height: rem(60);
    }
    &__name {
      font-size: rem(20);
    }
    &__join-date {
      font-size: rem(14);
    }
  }
  .account {
    &__title {
      font-size: rem(17);
    }
  }
  &__delete {
    text-align: center;
    color: $darkred;
  }
}
</style>
