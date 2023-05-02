import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
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
  {
    path: '/control-shows',
    name: 'control-shows',
    component: () => import('../views/admin/ControlShowsView.vue')
  },
  {
    path: '/edit-show/:id',
    name: 'edit-show',
    component: () => import('../views/admin/EditShowsView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
