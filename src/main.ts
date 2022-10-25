import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { i18n } from '@/i18n'

const firebaseConfig = {
  apiKey: 'AIzaSyDZ_isfSvVQgwARqApINAo42Lfa_KzXWbQ',
  authDomain: 'timestodos.firebaseapp.com',
  databaseURL:
    'https://timestodos-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'timestodos',
  storageBucket: 'timestodos.appspot.com',
  messagingSenderId: '802123938267',
  appId: '1:802123938267:web:deea076c9bfea42ec48ffe',
  measurementId: 'G-CGB86GJMY8'
}

const firebaseApp = initializeApp(firebaseConfig)
getAnalytics(firebaseApp)

// eslint-disable-next-line
let app: any

onAuthStateChanged(getAuth(), () => {
  if (!app) {
    app = createApp(App)
    app.use(store).use(router).use(i18n).mount('#app')
  }
  store.commit('setAuth', !!getAuth().currentUser)
})
