<template>
  <h1>Home</h1>
  <button @click="logout">Log out</button>
  <button @click="openActionSheet">Action Sheet</button>
  <base-action-sheet :actions="actions" ref="actionSheet" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { logOut } from '@/services/auth'
import { Action, ActionType } from '@/types'
import BaseActionSheet from '@/components/BaseActionSheet.vue'

export default defineComponent({
  name: 'home-page',
  components: { BaseActionSheet },
  data() {
    return {
      actions: [
        { title: 'delete', value: 'delete', type: ActionType.Destructive }
      ] as Action[]
    }
  },
  methods: {
    async logout() {
      await logOut()
    },
    async openActionSheet() {
      const ref = this.$refs.actionSheet as InstanceType<typeof BaseActionSheet>
      const res = await ref.open()
      console.log(res)
    }
  }
})
</script>

<style lang="scss"></style>
