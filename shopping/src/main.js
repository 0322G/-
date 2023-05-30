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
// sockets 封装
import { registerSockets, destroySockets } from '@/utils/sockets'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 监听事件
app.config.globalProperties.$addSockets = registerSockets;
// 移除事件
app.config.globalProperties.$removeSockets = destroySockets;

app.use(store).use(router).use(ElementPlus).use(Particles).mount('#app')
