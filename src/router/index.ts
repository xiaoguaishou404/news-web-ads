import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main.vue'
import SingleView from '../views/SingleView.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/single',
      // name: 'single',
      component: SingleView,
      // component: () => import('@/views/SingleView.vue'),
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('@/components/icons/IconCommunity.vue'),
    // },
  ],
})

// let hasr = false
// router.beforeEach((to, from, next) => {
//   console.log({ to })
//   if (hasr) {
//     console.log(11)

//     next()
//   }
//   else {
//     router.addRoute({
//       path: '/aa',
//       name: 'aa',
//       component: () => import('@/views/AboutView.vue'),
//       children: [
//         {
//           path: 'ww',
//           name: 'ww',
//           component: () => import('@/components/icons/IconCommunity.vue'),
//         },
//       ],
//     })
//     // router.addRoute({
//     //   path: '/:pathMatch(.*)*',
//     //  name: 'NotFound',
//     //   component: () => import('@/components/icons/IconCommunity.vue')
//     // });
//     hasr = true
//     console.log(5566)
//     console.log(to)

//     next({ path: to.path, name: to.name })
//     // next( to);
//   }

//   console.log(router.getRoutes())

//   // next(to.path);
// })

export default router
