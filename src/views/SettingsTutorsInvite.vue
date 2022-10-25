<template>
  <div class="tutor-invite">
    <base-input-sheet
      note="Введите email пользователя и он получит приглашение."
    >
      <li>
        <input type="text" placeholder="Email" v-model.trim="email" />
      </li>
    </base-input-sheet>
    <base-button
      view="filled"
      size="large full"
      text="Пригласить"
      class="tutor-invite__button"
      :loading="isButtonLoading"
      @click="inviteTutor"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { addDocument } from '@/services/firestore'
import { getUserByEmail } from '@/services/user'
import { getCommunity } from '@/services/community'
import { getDate } from '@/services/date'
import {
  ActionType,
  CommunityInvite,
  NotificationScope,
  NotificationType
} from '@/types'
import BaseInputSheet from '@/components/BaseInputSheet.vue'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseInputSheet
  },
  data() {
    return {
      email: '',
      subject: '',
      isButtonLoading: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async inviteTutor() {
      const comm = await getCommunity()
      const currentUser = this.user
      const user = await getUserByEmail(this.email)
      if (user) {
        const currentUserName = `${currentUser.firstname} ${currentUser.lastname}`
        const invite: CommunityInvite = {
          communityId: comm.id,
          scope: NotificationScope.Community,
          type: NotificationType.CommunityInvite,
          image: {
            src: currentUser.avatar,
            size: 60
          },
          title: currentUserName,
          text: 'Приглашаю тебя в сообщество!',
          createdAt: getDate().toMillis(),
          actions: [
            {
              title: 'reject',
              value: 'reject',
              type: ActionType.Destructive
            },
            {
              title: 'accept',
              value: 'accept',
              type: ActionType.Primary
            }
          ]
        }
        await addDocument({
          collectionPath: 'users/' + user.documentId + '/notifications',
          fields: invite
        })
      } else {
        alert('User with this email does not exists')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.tutor-invite {
  padding-top: rem(30);
  &__title {
    margin: rem(20) 0 rem(30);
    text-align: center;
  }
  &__button {
    margin-top: rem(25);
  }
}
</style>
