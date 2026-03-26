<template>
  <div class="home">
    <!-- 背景图片 -->
    <div class="background"></div>
    
    <!-- 主内容 -->
    <div class="main-content">
      <!-- 左上角：网站信息 -->
      <div class="header-info">
        <div class="logo">
          <div class="clock">
            <div class="clock-face">
              <div class="hour-hand" :style="{ transform: `rotate(${hourDegrees}deg)` }"></div>
              <div class="minute-hand" :style="{ transform: `rotate(${minuteDegrees}deg)` }"></div>
              <div class="second-hand" :style="{ transform: `rotate(${secondDegrees}deg)` }"></div>
              <div class="center-dot"></div>
            </div>
          </div>
          <h1 class="site-name">imsyy.top</h1>
        </div>
        
        <!-- 欢迎语 -->
        <div class="welcome">
          <p class="welcome-text">Hello, World!</p>
          <p class="site-desc">一个建立于 21 世纪的小站，游荡于互联网的边缘</p>
        </div>
        
        <!-- 社交图标 -->
        <div class="social-icons">
          <a href="#" class="social-icon">
            <span class="icon-text">R</span>
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
        <!-- 引言 -->
        <div class="quote glass">
          <p class="quote-text">I'm nothing without you</p>
          <p class="quote-author">- The Flash</p>
        </div>
        
        <!-- 日期和时间 -->
        <div class="date-time glass">
          <p class="date">{{ currentDate }}</p>
          <p class="time">{{ currentTime }}</p>
          <p class="weather">天气数据获取失败</p>
        </div>
        
        <!-- 功能按钮 -->
        <div class="feature-buttons">
          <a href="#" class="feature-button glass">
            <span class="button-icon">B</span>
            <span class="button-text">博客</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">C</span>
            <span class="button-text">网盘</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">M</span>
            <span class="button-text">音乐</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">H</span>
            <span class="button-text">起始页</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">W</span>
            <span class="button-text">网址集</span>
          </a>
          <a href="#" class="feature-button glass">
            <span class="button-icon">T</span>
            <span class="button-text">今日热榜</span>
          </a>
        </div>
      </div>
      
      <!-- 底部版权信息 -->
      <div class="footer">
        <p>Copyright © 2020 - 2026 & Made by imsy & 蜀ICP备2020183143号-1</p>
      </div>
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

// 定时器
let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
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
  padding: 2rem;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.clock {
  width: 60px;
  height: 60px;
  position: relative;
}

.clock-face {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hour-hand, .minute-hand, .second-hand {
  position: absolute;
  background: white;
  transform-origin: bottom center;
  border-radius: 2px;
}

.hour-hand {
  width: 2px;
  height: 15px;
  top: 10px;
}

.minute-hand {
  width: 2px;
  height: 20px;
  top: 5px;
}

.second-hand {
  width: 1px;
  height: 22px;
  top: 3px;
  background: #ff4757;
}

.center-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  position: absolute;
}

.site-name {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.welcome {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.site-desc {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
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

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-end;
}

.quote {
  padding: 1.5rem;
  max-width: 300px;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.quote-text {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.quote-author {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
}

.date-time {
  padding: 1.5rem;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.date {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.time {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.weather {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
}

.feature-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 400px;
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
  min-height: 100px;
}

.feature-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.button-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.button-text {
  font-size: 0.9rem;
}

.footer {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .right-section {
    align-items: center;
  }
  
  .feature-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .header-info {
    align-items: center;
    text-align: center;
  }
  
  .logo {
    justify-content: center;
  }
}
</style>