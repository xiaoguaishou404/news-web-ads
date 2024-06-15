import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyLoad from 'vue3-lazyload'

import naive from 'naive-ui'
import App from './App.vue'
import router from './router'

import './assets/js/jquery.min.js'
import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.min.js'

import LoadingOutlined from '@/assets/img/LoadingOutlined.svg'
import error from '@/assets/img/error.jpg'

import '@/assets/css/style.css'
import './assets/index.css'
import utils from './utils'

const app = createApp(App)

app.use(VueLazyLoad, {
  loading: LoadingOutlined,
  error,
  log: false,

  // observerOptions: { root: document.querySelector('#app'), rootMargin: '20000px', threshold: 0.1 },
  lifecycle: {
    loading: () => {
      // console.log('loading')
    },
    error: () => {
      // console.log('error')
    },
    loaded: () => {
      // console.log('loaded')
    },
  },
})

app.use(createPinia ())
app.use(router)
app.use(ElementPlus)
app.use(naive)

app.directive('custom-ads', {
  mounted(el, binding) {
    // :id="utils.getDIvIDCount()"
    el.setAttribute('id', utils.getDIvIDCount())
    console.log(el.getAttribute('id'))

    googletag.cmd.push(() => { googletag.display(el.getAttribute('id')) })
    // googletag.cmd.push(() => {
    //   googletag.pubads().refresh()
    // })

    // binding.value
  },
})

app.mount('#app')
