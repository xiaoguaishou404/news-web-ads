import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyLoad from 'vue3-lazyload'

import App from './App.vue'
import router from './router'

import './assets/js/jquery.min.js'
import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.min.js'




import LoadingOutlined from '@/assets/img/LoadingOutlined.svg'
import error from '@/assets/img/error.jpg'

import '@/assets/css/style.css'
import './assets/index.css'

const app = createApp(App)
app.use(VueLazyLoad, {
  loading: LoadingOutlined,
  error,
  lifecycle: {
  },
})

app.use(createPinia ())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
