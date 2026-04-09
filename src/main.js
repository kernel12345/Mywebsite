import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 路由守卫，控制雪花效果
router.afterEach((to) => {
  // 检查是否存在雪花效果脚本
  const snowScript = document.querySelector('script[src="https://api.fuchenboke.cn/api/xuehua.js"]')
  if (to.path === '/') {
    // 在首页显示雪花效果
    if (!snowScript) {
      const script = document.createElement('script')
      script.src = 'https://api.fuchenboke.cn/api/xuehua.js'
      document.body.appendChild(script)
    }
  } else {
    // 在其他页面隐藏雪花效果
    if (snowScript) {
      snowScript.remove()
    }
    // 清除可能存在的雪花元素
    const snowElements = document.querySelectorAll('.snowfall')
    snowElements.forEach(element => element.remove())
  }
})

app.use(router).mount('#app')
