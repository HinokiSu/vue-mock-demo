import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { router } from './routes'
import { createPinia } from 'pinia'
import './routes/permission' // 全局路由守卫 权限控制
// 需要将mock引入到 main.ts 中 才会生效
import './mock/index.js'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
