import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import Paginate from 'vuejs-paginate'

// check sidebar
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(Notifications)
app.component('paginate',Paginate)
app.mount('#app')
