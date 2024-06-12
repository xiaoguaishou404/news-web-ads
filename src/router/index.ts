import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/mainPage.vue'
import SinglePage from '../views/SinglePage.vue'
import SinglePageTest from '../views/SinglePageTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition
  },
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage,
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/singlePage/:id',
      name: 'SinglePage',
      component: SinglePage,
      meta: {
        keepAlive: true,
      },
    }, {
      path: '/SinglePageTest/:id?',
      name: 'SinglePageTest',
      component: SinglePageTest,
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
