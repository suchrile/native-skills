import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getAuth } from 'firebase/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'auth',
    meta: { layout: 'auth' },
    component: () => import('@/views/AuthPage.vue')
  },
  {
    path: '/',
    name: 'review',
    meta: { auth: true, layout: 'main', showTitle: true, largeTitle: true },
    component: () => import('@/views/ReviewPage.vue')
  },
  {
    path: '/today',
    name: 'today',
    meta: { auth: true, layout: 'main', showTitle: true, largeTitle: true },
    component: () => import('@/views/TodayPage.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    meta: { auth: true, layout: 'main', showTitle: true, largeTitle: true },
    component: () => import('@/views/CalendarPage.vue')
  },
  {
    path: '/tasks',
    name: 'allTasks',
    meta: { auth: true, layout: 'main', showTitle: true, largeTitle: true },
    component: () => import('@/views/TasksPage.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: true,
      withAnimation: true
    },
    component: () => import('@/views/SettingsPage.vue')
  },
  {
    path: '/settings/profile',
    name: 'profile',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsProfile.vue')
  },
  {
    path: '/settings/profile/name',
    name: 'name',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsProfileName.vue')
  },
  {
    path: '/settings/profile/email',
    name: 'email',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: false,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsProfileEmail.vue')
  },
  {
    path: '/settings/profile/password',
    name: 'password',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: false,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsProfilePassword.vue')
  },
  {
    path: '/settings/profile/delete',
    name: 'deleteAccount',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: false,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsProfileDelete.vue')
  },
  {
    path: '/settings/tutors',
    name: 'tutors',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: false,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsTutors.vue')
  },
  {
    path: '/settings/tutors/:id',
    name: 'tutorsid',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsTutorsId.vue')
  },
  {
    path: '/settings/tutors/invite',
    name: 'tutorsInvite',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsTutorsInvite.vue')
  },
  {
    path: '/settings/appearance',
    name: 'appearance',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsAppearance.vue')
  },
  {
    path: '/settings/language',
    name: 'language',
    meta: {
      auth: true,
      layout: 'main',
      showTitle: true,
      largeTitle: false,
      withAnimation: true
    },
    component: () => import('@/views/SettingsLanguage.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser
  const requireAuth = to.matched.some((record) => record.meta.auth)

  if (requireAuth && !currentUser) {
    return next(`/auth?to=${to.path}`)
  }

  document.body.classList.remove('no-scroll', 'layer')
  const app = document.querySelector('#app')
  app && app.removeAttribute('style')

  if (to.path.includes(from.path)) {
    to.meta.animation = {
      enterFrom: 'right',
      leaveTo: 'left'
    }
  } else {
    to.meta.animation = {
      enterFrom: 'left',
      leaveTo: 'right'
    }
  }

  to.meta.from = from

  next()
})

export default router
