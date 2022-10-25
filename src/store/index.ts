import { createStore } from 'vuex'
import user from '@/store/user'
import community from '@/store/community'

export interface RootState {
  auth: boolean
}

const state: RootState = {
  auth: false
}

export default createStore({
  state,
  getters: {
    auth: (state) => state.auth
  },
  mutations: {
    setAuth(state, auth: boolean) {
      state.auth = auth
    }
  },
  actions: {},
  modules: {
    user,
    community
  }
})
