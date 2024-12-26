import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue3-cookies'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件


import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueCookies)

app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}