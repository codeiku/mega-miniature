import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/data',
    },
    {
      path: '/data',
      name: 'data',
      component: Dashboard,
    },
    {
      path: '/target',
      name: 'target',
      component: () => import('@/views/Target.vue'),
    },
    {
      path: '/impact',
      name: 'impact',
      component: () => import('@/views/Impact.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/Report.vue'),
    },
    {
      path: '/agent',
      name: 'agent',
      component: () => import('@/views/Agent.vue'),
    },
    {
      path: '/studies',
      name: 'studies',
      component: () => import('@/views/Studies.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin.vue'),
    },
  ],
})

export default router