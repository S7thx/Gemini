import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
     path: '/videos',
     name: 'videos',
     component: () => import('../components/VideoComponent.vue')
    },
    {
     path: '/imagens',
     name: 'imagens',
     component: () => import('../components/ImagemComponent.vue')
    },
    {
     path: '/tabela',
     name: 'tabela',
     component: () => import('../components/tabelaComponent.vue')
    }]
})
export default router
