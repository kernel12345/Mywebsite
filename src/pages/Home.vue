<template>
  <div class="home">
    <!-- 背景图片 -->
    <div class="background" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    
    <!-- 主内容 -->
    <div class="main-content">
      <!-- 左侧：时钟和网站信息 -->
      <div class="left-section">
        <!-- 时钟和网站名称 -->
        <div class="clock-and-name">
          <div class="clock">
            <div class="clock-face">
              <div class="hour-hand" :style="{ transform: `rotate(${hourDegrees}deg)` }"></div>
              <div class="minute-hand" :style="{ transform: `rotate(${minuteDegrees}deg)` }"></div>
              <div class="second-hand" :style="{ transform: `rotate(${secondDegrees}deg)` }"></div>
              <div class="center-dot"></div>
            </div>
          </div>
          <h1 class="site-name">XDCSHUB</h1>
        </div>
        
        <!-- 网站信息 -->
        <div class="site-info glass">
          <p class="welcome-text">Hello, World!</p>
          <p class="site-desc">兄弟CS网站</p>
        </div>
        
        <!-- 社交图标 -->
        <div class="social-icons-container">
          <div class="social-icons">
            <a href="https://github.com/kernel12345" target="_blank" class="social-icon github-icon">
              <svg class="icon" width="16" height="16">
                <use xlink:href="/icons.svg#github-icon"></use>
              </svg>
            </a>
            <a href="https://steamcommunity.com/chat/invite/JEkxtvGe" target="_blank" class="social-icon steam-icon">
              <img src="/images/steam.png" alt="Steam" width="16" height="16">
            </a>
            <a href="#" target="_blank" class="social-icon teamspeak-icon">
              <img src="/images/teamspeak.png" alt="Teamspeak" width="16" height="16">
            </a>
            <a href="https://qm.qq.com/q/bDK3BOyEr6" target="_blank" class="social-icon qq-icon">
              <img src="/images/qq.png" alt="QQ" width="16" height="16">
            </a>
            <div class="github-link">
              去 Github 看看
            </div>
            <div class="steam-link">
              加入steam群组
            </div>
            <div class="qq-link">
              加入QQ群
            </div>
            <div class="teamspeak-link">
              加入我们的teamspeak频道
            </div>
          </div>
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
          <p class="weather">{{ weather }}</p>
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
      <p>Copyright © 2025 - 2026 | Made by 韦旅淦</p>
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

// 天气相关
const weather = ref('北京 15°C 大部分晴天'); // 直接设置默认值
const weatherIcon = ref('');
const temperature = ref('15°C');
const weatherDescription = ref('大部分晴天');
const city = ref('北京');

// 背景图片相关
const backgroundImage = ref('/images/background.jpg'); // 默认背景

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

// 获取天气数据
const getWeatherData = async () => {
  console.log('开始获取天气数据...');
  try {
    // 1. 尝试获取用户 IP 地址和地理位置 - 使用另一个免费的地理位置服务
    try {
      const geoResponse = await fetch('https://ipinfo.io/json');
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        city.value = geoData.city || '北京';
        console.log('获取城市成功:', city.value);
      }
    } catch (geoError) {
      console.error('获取地理位置失败:', geoError);
      city.value = '北京'; // 默认使用北京
    }
    
    // 2. 使用模拟数据测试天气显示功能
    const mockData = {
      current_weather: {
        temperature: 15,
        weathercode: 1
      }
    };
    
    console.log('模拟数据:', mockData);
    
    // 3. 更新天气数据
    temperature.value = `${Math.round(mockData.current_weather.temperature)}°C`;
    weatherDescription.value = getWeatherDescription(mockData.current_weather.weathercode);
    weatherIcon.value = getWeatherIcon(mockData.current_weather.weathercode);
    weather.value = `${city.value} ${temperature.value} ${weatherDescription.value}`;
    
    console.log('天气数据更新成功:', weather.value);
  } catch (error) {
    console.error('获取天气失败:', error);
    weather.value = `${city.value} 天气数据获取失败`;
  }
};

// 根据天气代码获取天气描述
const getWeatherDescription = (weathercode) => {
  const weatherCodes = {
    0: '晴天',
    1: '大部分晴天',
    2: '部分多云',
    3: '多云',
    45: '雾',
    48: '霾',
    51: '小雨',
    53: '中雨',
    55: '大雨',
    56: '冻雨',
    57: '冻雨',
    61: '小雨',
    63: '中雨',
    65: '大雨',
    66: '冻雨',
    67: '冻雨',
    71: '小雪',
    73: '中雪',
    75: '大雪',
    77: '雪',
    80: '阵雨',
    81: '中阵雨',
    82: '大阵雨',
    85: '小雪',
    86: '大雪',
    95: '雷暴',
    96: '雷暴',
    99: '雷暴'
  };
  return weatherCodes[weathercode] || '未知天气';
};

// 根据天气代码获取天气图标
const getWeatherIcon = (weathercode) => {
  // 这里可以根据天气代码返回对应的图标
  return '';
};

// 获取随机背景图片
const getRandomBackground = () => {
  try {
    // 直接使用图片 URL，添加随机参数避免缓存
    const randomParam = Math.random().toString(36).substring(2, 15);
    backgroundImage.value = `https://api.yppp.net/pc.php?${randomParam}`;
  } catch (error) {
    console.error('获取背景图片失败:', error);
    // 失败时使用默认背景
    backgroundImage.value = '/images/background.jpg';
  }
};

// 定时器
let timer = null;
let quoteTimer = null;
let weatherTimer = null;

onMounted(() => {
  updateTime();
  getRandomQuote();
  getRandomBackground(); // 获取随机背景图片
  // 直接设置天气数据
  weather.value = '15°C 大部分晴天';
  console.log('直接设置天气数据:', weather.value);
  // 调用天气数据获取函数
  getWeatherData();
  timer = setInterval(updateTime, 1000);
  quoteTimer = setInterval(getRandomQuote, 10000); // 每10秒更新一次名言
  weatherTimer = setInterval(getWeatherData, 300000); // 每5分钟更新一次天气
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  if (quoteTimer) {
    clearInterval(quoteTimer);
  }
  if (weatherTimer) {
    clearInterval(weatherTimer);
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

.clock-and-name {
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
}

.site-name {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

.social-icons-container {
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  transition: all 0.3s ease;
  position: relative;
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

.github-link, .steam-link, .qq-link, .teamspeak-link {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  position: absolute;
  right: 1rem;
}

.github-icon:hover ~ .github-link {
  opacity: 1;
  visibility: visible;
}

.steam-icon:hover ~ .steam-link {
  opacity: 1;
  visibility: visible;
}

.qq-icon:hover ~ .qq-link {
  opacity: 1;
  visibility: visible;
}

.teamspeak-icon:hover ~ .teamspeak-link {
  opacity: 1;
  visibility: visible;
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
  align-items: center;
  text-align: center;
}

.date {
  font-size: 0.9rem;
  margin: 0 0 0.3rem 0;
}

.time {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 0.3rem 0;
  font-family: 'Courier New', monospace, 'Digital', 'DS-Digital', sans-serif;
  letter-spacing: 1px;
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