import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/js/jquery.min.js'
import './assets/css/cssFamily.css'
import VueLazyLoad from 'vue3-lazyload'

import App from './App.vue'
import router from './router'

import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.min.js'
import '@/assets/css/font-awesome/css/font-awesome.min.css'
import '@/assets/css/style.css'
import LoadingOutlined from '@/assets/LoadingOutlined.svg'
import error from '@/assets/error.jpg'
import './assets/index.css'
// import './assets/main.css'

const app = createApp(App)
app.use(VueLazyLoad, {
  loading: LoadingOutlined,
  error,
  lifecycle: {
    // loading: (el) => {
    //   console.log('loading', el)
    // },
    error: (el) => {
      console.log('error', el)
    },
    loaded: (el) => {
    //   console.log('loaded', el)
    },
  },
})

app.use(createPinia ())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
