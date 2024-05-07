import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: mainPage,
    },
    
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('@/views/NotFound.vue'),
    // },
  ],
})


export default router
