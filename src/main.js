import 'normalize.css'
import './assets/css/index.css'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from './stores'
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'

import { createApp } from 'vue'
import App from './App.vue'

// 注册wangEditor插件
Boot.registerModule(markdownModule)

createApp(App).use(router).use(pinia).mount('#app')
