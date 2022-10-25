import { Module } from 'vuex'
import { RootState } from '@/store/index'
import { User } from '@/types'
import { getAuth } from 'firebase/auth'
import { getDocument } from '@/services/firestore'

export interface UserState {
  data: User
}

const user: Module<UserState, RootState> = {
  state: {
    data: {
      id: '',
      firstname: '',
      lastname: '',
      fullName: '',
      avatar: '',
      email: '',
      emailVerified: false
    }
  },

  mutations: {
    setUserData(state, userData: User) {
      const user = getAuth().currentUser
      if (!user) return
      state.data.id = user.uid
      state.data.firstname = userData.firstname
      state.data.lastname = userData.lastname
      state.data.fullName = `${state.data.firstname} ${state.data.lastname}`
      state.data.avatar = user.photoURL
      state.data.email = user.email
      state.data.emailVerified = user.emailVerified
    },

    clearUserData(state) {
      state.data = {
        id: '',
        firstname: '',
        lastname: '',
        fullName: '',
        avatar: null,
        email: null,
        emailVerified: false
      }
    }
  },

  getters: {
    user: (s) => s.data
  },

  actions: {
    async getUserData({ commit }) {
      const user = getAuth().currentUser
      if (!user) return
      const data = await getDocument({
        collectionPath: 'users',
        documentId: user.uid
      })
      commit('setUserData', data)
    },

    async updateUserData({ dispatch }) {
      await dispatch('getUserData')
    }
  }
}

export default user
