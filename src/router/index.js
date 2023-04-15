import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {

    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {

    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue')
  },
  {

    path: '/shows',
    name: 'shows',
    component: () => import('../views/ShowsView.vue')
  },
  {

    path: '/single-show/:id',
    name: 'single-show',
    component: () => import('../views/SingleShowView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
