<template>
  <div class="dashboard">
    <!-- 统计卡片区域 -->
    <div class="stats-cards">
      <div class="stat-card green">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <div class="stat-label">用户总数</div>
          <div class="stat-value">{{ userCount }}</div>
        </div>
      </div>
      <div class="stat-card red">
        <div class="stat-icon">👁️</div>
        <div class="stat-content">
          <div class="stat-label">访问量</div>
          <div class="stat-value">{{ visitCount }}</div>
        </div>
      </div>
      <div class="stat-card teal">
        <div class="stat-icon">🖥️</div>
        <div class="stat-content">
          <div class="stat-label">CPU占用</div>
          <div class="stat-value">{{ cpuUsage }}%</div>
        </div>
      </div>
      <div class="stat-card purple">
        <div class="stat-icon">💾</div>
        <div class="stat-content">
          <div class="stat-label">内存占用</div>
          <div class="stat-value">{{ memoryUsage }}%</div>
        </div>
      </div>
      <div class="stat-card blue">
        <div class="stat-icon">🚀</div>
        <div class="stat-content">
          <div class="stat-label">应用状态</div>
          <div class="stat-value">{{ appStatus }}</div>
        </div>
      </div>
      <div class="stat-card orange">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <div class="stat-label">今日访问</div>
          <div class="stat-value">{{ todayVisit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 状态变量
const userCount = ref(0);
const visitCount = ref(0);
const cpuUsage = ref(0);
const memoryUsage = ref(0);
const appStatus = ref('运行中');
const todayVisit = ref(0);

// 定时器
let systemStatusTimer = null;

// 生成随机数字
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 更新系统状态
const updateSystemStatus = () => {
  // 模拟CPU占用（5-30%）
  cpuUsage.value = Math.floor(Math.random() * 26) + 5;
  
  // 模拟内存占用（30-70%）
  memoryUsage.value = Math.floor(Math.random() * 41) + 30;
};

onMounted(() => {
  // 获取用户数量
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  userCount.value = Object.keys(users).length;
  
  // 模拟访问量
  visitCount.value = getRandomNumber(10000, 50000000);
  
  // 模拟今日访问
  todayVisit.value = getRandomNumber(100, 10000);
  
  // 初始化系统状态
  updateSystemStatus();
  
  // 每5秒更新一次系统状态
  systemStatusTimer = setInterval(() => {
    updateSystemStatus();
  }, 5000);
});

onUnmounted(() => {
  if (systemStatusTimer) {
    clearInterval(systemStatusTimer);
  }
});
</script>

<style scoped>
/* 管理页首页样式 */
.dashboard {
  width: 100%;
}

/* 统计卡片区域 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-card.green .stat-icon {
  background: #27ae60;
}

.stat-card.red .stat-icon {
  background: #e74c3c;
}

.stat-card.teal .stat-icon {
  background: #1abc9c;
}

.stat-card.purple .stat-icon {
  background: #9b59b6;
}

.stat-card.blue .stat-icon {
  background: #3498db;
}

.stat-card.orange .stat-icon {
  background: #f39c12;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>