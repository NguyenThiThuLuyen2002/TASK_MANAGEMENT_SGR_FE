import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// check sidebar
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(Notifications)
app.mount('#app')
