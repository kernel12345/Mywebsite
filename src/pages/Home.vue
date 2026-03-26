<template>
  <div class="home">
    <!-- 背景图片 -->
    <div class="background"></div>
    
    <!-- 主内容 -->
    <div class="main-content">
      <!-- 左侧：时钟和网站信息 -->
      <div class="left-section">
        <!-- 时钟 -->
        <div class="clock">
          <div class="clock-face">
            <div class="hour-hand" :style="{ transform: `rotate(${hourDegrees}deg)` }"></div>
            <div class="minute-hand" :style="{ transform: `rotate(${minuteDegrees}deg)` }"></div>
            <div class="second-hand" :style="{ transform: `rotate(${secondDegrees}deg)` }"></div>
            <div class="center-dot"></div>
          </div>
        </div>
        
        <!-- 网站信息 -->
        <div class="site-info">
          <h1 class="site-name">XDCSHUB</h1>
          <p class="welcome-text">Hello, World!</p>
          <p class="site-desc">兄弟CS网站</p>
        </div>
        
        <!-- 社交图标 -->
        <div class="social-icons">
          <a href="https://github.com/kernel12345" target="_blank" class="social-icon">
            <svg class="icon" width="16" height="16">
              <use xlink:href="/icons.svg#github-icon"></use>
            </svg>
          </a>
          <a href="#" class="social-icon">
            <span class="icon-text">C</span>
          </a>
          <a href="#" class="social-icon">
            <span class="icon-text">M</span>
          </a>
          <a href="#" class="social-icon">
            <span class="icon-text">T</span>
          </a>
          <a href="#" class="social-icon">
            <span class="icon-text">I</span>
          </a>
          <a href="#" class="social-icon">
            <span class="icon-text">G</span>
          </a>
        </div>
      </div>
      
      <!-- 右侧：日期、时间和功能按钮 -->
      <div class="right-section">
        <!-- 引言卡片 -->
        <div class="quote-card glass">
          <div :class="{ 'fade': isFading }">
            <p class="quote-text">{{ quoteText }}</p>
            <p class="quote-author">- 「{{ quoteAuthor }}」</p>
          </div>
        </div>
        
        <!-- 日期时间卡片 -->
        <div class="date-time-card glass">
          <p class="date">{{ currentDate }}</p>
          <p class="time">{{ currentTime }}</p>
          <p class="weather">天气数据获取失败</p>
        </div>
        
        <!-- 功能按钮 -->
        <div class="feature-buttons">
          <a href="#" class="feature-button glass">
            <span class="button-icon">📝</span>
            <span class="button-text">博客</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">☁️</span>
            <span class="button-text">网盘</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">🎵</span>
            <span class="button-text">音乐</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">🏠</span>
            <span class="button-text">起始页</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">📋</span>
            <span class="button-text">网址集</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">🔥</span>
            <span class="button-text">今日热榜</span>
          </a>
        </div>
      </div>
    </div>
    
    <!-- 底部版权信息 -->
    <div class="footer">
      <p>Copyright © 2020 - 2024 | Made by 韦旅淦</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 时间相关
const currentTime = ref('');
const currentDate = ref('');
const hourDegrees = ref(0);
const minuteDegrees = ref(0);
const secondDegrees = ref(0);

// 名言相关
const quoteText = ref('不如意事常八九，可与语人无二三。');
const quoteAuthor = ref('别子才司令');
const isFading = ref(false);

// 更新时间
const updateTime = () => {
  const now = new Date();
  
  // 更新时间字符串
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}:${seconds}`;
  
  // 更新日期字符串
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const day = dayNames[now.getDay()];
  currentDate.value = `${year}年${month}月${date}日 ${day}`;
  
  // 更新时钟指针角度
  const totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  secondDegrees.value = (totalSeconds % 60) * 6;
  minuteDegrees.value = (totalSeconds % 3600) * 0.1;
  hourDegrees.value = (totalSeconds % 43200) * (360 / 43200);
};

// 获取随机名言
const getRandomQuote = async () => {
  try {
    // 触发淡出效果
    isFading.value = true;
    
    // 等待淡出完成后更新内容
    setTimeout(async () => {
      const response = await fetch('https://v1.hitokoto.cn/');
      const data = await response.json();
      quoteText.value = data.hitokoto;
      quoteAuthor.value = data.from;
      
      // 触发淡入效果
      setTimeout(() => {
        isFading.value = false;
      }, 100);
    }, 500);
  } catch (error) {
    console.error('获取名言失败:', error);
    // 出错时也要恢复显示
    isFading.value = false;
  }
};

// 定时器
let timer = null;
let quoteTimer = null;

onMounted(() => {
  updateTime();
  getRandomQuote();
  timer = setInterval(updateTime, 1000);
  quoteTimer = setInterval(getRandomQuote, 10000); // 每10秒更新一次名言
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  if (quoteTimer) {
    clearInterval(quoteTimer);
  }
});
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(0.8);
}

.main-content {
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

/* 左侧：时钟和网站信息 */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.clock {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.clock-face {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.hour-hand, .minute-hand, .second-hand {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
  background: white;
  border-radius: 10px;
}

.hour-hand {
  width: 4px;
  height: 30px;
  margin-left: -2px;
  margin-top: -30px;
}

.minute-hand {
  width: 3px;
  height: 40px;
  margin-left: -1.5px;
  margin-top: -40px;
}

.second-hand {
  width: 2px;
  height: 45px;
  margin-left: -1px;
  margin-top: -45px;
  background: #ff6b6b;
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  transform: translate(-50%, -50%);
}

.site-info {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.site-name {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.welcome-text {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.site-desc {
  font-size: 1rem;
  margin: 0;
  opacity: 0.8;
  max-width: 400px;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: bold;
}

.icon-text {
  font-size: 14px;
  font-weight: bold;
}

.icon {
  fill: white;
  width: 16px;
  height: 16px;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* 右侧：日期、时间和功能按钮 */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quote-card, .date-time-card {
  padding: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.quote-card > div {
  transition: opacity 0.5s ease-in-out;
}

.quote-card > div.fade {
  opacity: 0;
}

.quote-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
}

.quote-author {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
  text-align: right;
}

.date-time-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.date {
  font-size: 0.9rem;
  margin: 0 0 0.3rem 0;
}

.time {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 0.3rem 0;
  font-family: 'Courier New', monospace;
}

.weather {
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.8;
}

.feature-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.feature-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  text-decoration: none;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border-radius: 10px;
  min-height: 80px;
}

.feature-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.button-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

.button-text {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 底部版权信息 */
.footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 毛玻璃效果 */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
  
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .left-section {
    align-items: center;
    text-align: center;
  }
  
  .site-name {
    font-size: 2rem;
  }
  
  .time {
    font-size: 1.5rem;
  }
  
  .feature-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .feature-buttons {
    grid-template-columns: 1fr;
  }
  
  .quote-card, .date-time-card {
    padding: 1.2rem;
  }
  
  .feature-button {
    padding: 1.2rem 1rem;
  }
}
</style>