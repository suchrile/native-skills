<template>
  <div class="tutors">
    <div v-if="data" class="tutors__header tutors-header">
      <div class="tutors-header__avatars">
        <div class="tutors-header__avatars-wrapper">
          <div
            v-for="(user, index) in data.membersData"
            :key="user.documentId"
            class="tutors-header__avatar"
            :style="`z-index: ${data.membersData.length - index};`"
          >
            <img :src="user.avatar" :alt="user.firstname" />
          </div>
        </div>
      </div>
      <h2 class="tutors-header__title">Репетиторы</h2>
    </div>
    <settings-tutors-list-sheet
      v-if="data"
      :data="data"
      class="tutors__list"
      @addTutorButtonClick="addTutor"
      @itemClicked="openMemberInfo"
    />

    <div v-if="invites" class="tutors__notifications">
      <base-notification
        v-for="invite in invites"
        :key="invite.documentId"
        :image-src="invite.image.src"
        :image-size="60"
        :title="invite.title"
        :text="invite.text"
        :actions="invite.actions"
        @button-click="onNotificationClick($event, invite)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { addMember, getCommunity, getInvites } from '@/services/community'
import { deleteDocument } from '@/services/firestore'
import { Action, ActionType, Document } from '@/types'
import SettingsTutorsListSheet from '@/components/SettingsTutorsListSheet.vue'
import BaseNotification from '@/components/BaseNotification.vue'

export default defineComponent({
  components: {
    BaseNotification,
    SettingsTutorsListSheet
  },
  data() {
    return {
      data: null,
      invites: [] as Document[]
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  async mounted() {
    this.data = await getCommunity()
    this.invites = await getInvites()
  },

  methods: {
    async addTutor() {
      await this.$router.push('/settings/tutors/invite')
    },
    async onInviteAccept(cid: string) {
      await addMember(cid)
    },
    async onNotificationClick(action: string, invite: any) {
      console.log(invite)
      if (action === 'accept') {
        const user = this.$store.getters.user
        await this.onInviteAccept(invite.communityId)
        await deleteDocument({
          collectionPath: 'users/' + user.id + '/notifications',
          documentId: invite.documentId
        })
        this.invites = this.invites.filter(
          (el) => el.documentId != invite.documentId
        )
        this.data = await getCommunity()
      }
    },
    openMemberInfo(userId: string) {
      this.$router.push('/settings/tutors/' + userId)
    }
  }
})
</script>

<style lang="scss" scoped>
.tutors {
  padding-top: rem(15);

  & .tutors-header {
    &__avatars {
      height: rem(70);
      &-wrapper {
        display: flex;
        justify-content: center;
      }
    }
    &__avatar {
      width: rem(70);
      height: rem(70);
      border: rem(2) solid $AppBackgroundColorLight;
      border-radius: 50%;
      filter: drop-shadow(rem(0) 0 rem(3) rgba(black, 0.2));

      &:not(:first-child) {
        margin-left: rem(-28);
      }
    }
    &__title {
      margin-top: rem(12);
      font-size: rem(23);
      font-weight: 600;
      text-align: center;
    }
  }
  &__list {
    margin-top: rem(15);
  }
  &__notifications {
    margin-top: rem(20);
  }
}
</style>
