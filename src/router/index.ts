import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage.vue'
import SinglePage from '../views/SinglePage.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage,
    },
    {
      path: '/singlePage/:id',
      name: 'singlePage',
      component: SinglePage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
