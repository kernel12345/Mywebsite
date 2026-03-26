<template>
  <div class="home">
    <!-- 背景图片 -->
    <div class="background"></div>
    
    <!-- 主内容 -->
    <div class="main-content">
      <!-- 顶部卡片区域 -->
      <div class="top-cards">
        <!-- 引言卡片 -->
        <div class="quote-card glass">
          <p class="quote-text">不如意事常八九，可与语人无二三。</p>
          <p class="quote-author">- 「别子才司令」</p>
        </div>
        
        <!-- 日期时间卡片 -->
        <div class="date-time-card glass">
          <p class="date">{{ currentDate }}</p>
          <p class="time">{{ currentTime }}</p>
          <p class="weather">天气数据获取失败</p>
        </div>
      </div>
      
      <!-- 网站列表区域 -->
      <div class="website-section">
        <h2 class="section-title">网站列表</h2>
        <div class="website-cards">
          <a href="#" class="website-card glass">
            <span class="card-icon">📝</span>
            <span class="card-text">博客</span>
          </a>
          <a href="#" class="website-card glass">
            <span class="card-icon">☁️</span>
            <span class="card-text">网盘</span>
          </a>
          <a href="#" class="website-card glass">
            <span class="card-icon">🎵</span>
            <span class="card-text">音乐</span>
          </a>
          <a href="#" class="website-card glass">
            <span class="card-icon">🏠</span>
            <span class="card-text">起始页</span>
          </a>
          <a href="#" class="website-card glass">
            <span class="card-icon">📋</span>
            <span class="card-text">网址集</span>
          </a>
          <a href="#" class="website-card glass">
            <span class="card-icon">🔥</span>
            <span class="card-text">今日热榜</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 时间相关
const currentTime = ref('');
const currentDate = ref('');

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
  max-width: 1000px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 顶部卡片区域 */
.top-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
}

.quote-card, .date-time-card {
  padding: 2rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.quote-text {
  font-size: 1.3rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.quote-author {
  font-size: 1rem;
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
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.time {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  font-family: 'Courier New', monospace;
}

.weather {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
}

/* 网站列表区域 */
.website-section {
  width: 100%;
}

.section-title {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: "📋";
  font-size: 1.2rem;
}

.website-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.website-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-decoration: none;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border-radius: 12px;
  min-height: 120px;
}

.website-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
  
  .top-cards {
    grid-template-columns: 1fr;
  }
  
  .website-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .time {
    font-size: 2rem;
  }
  
  .quote-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .website-cards {
    grid-template-columns: 1fr;
  }
  
  .quote-card, .date-time-card {
    padding: 1.5rem;
  }
  
  .website-card {
    padding: 1.5rem 1rem;
  }
}
</style>