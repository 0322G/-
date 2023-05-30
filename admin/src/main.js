import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入particles
import Particles from "particles.vue3";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store).use(router).use(ElementPlus).use(Particles).mount('#app')
