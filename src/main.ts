
import { createApp   }   from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'

import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.min.js'
import '@/assets/css/font-awesome/css/font-awesome.min.css'
import '@/assets/css/style.css'

// import './assets/main.css'


const app = createApp(App)

app.use(createPinia ())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

