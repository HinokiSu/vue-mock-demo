import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 需要将mock引入到 main.ts 中 才会生效
import './mock/index.js'
createApp(App).mount('#app')
