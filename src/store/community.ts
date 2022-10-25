import { Module } from 'vuex'
import { RootState } from '@/store/index'
import { CommunityMember, Document } from '@/types'

export interface CommunityState {
  init: boolean
  id: string | null
  owner: string | null
  memberIDs: string[] | null
  membersData: CommunityMember[] | null
}

interface qwe extends CommunityState, Document {}

const community: Module<CommunityState, RootState> = {
  state: {
    init: false,
    id: null,
    owner: null,
    memberIDs: null,
    membersData: null
  },

  mutations: {
    setCommunity(state, community: qwe) {
      state.init = true
      state.id = community.documentId
      state.owner = community.owner
      state.memberIDs = community.memberIDs
      state.membersData = community.membersData
    }
  },

  getters: {
    community: (s) => s
  },

  actions: {}
}

export default community
