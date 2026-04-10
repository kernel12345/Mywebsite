<template>
  <div class="system-monitoring">
    <div class="monitoring-header">
      <h2>系统监控</h2>
    </div>
    
    <div class="monitoring-cards">
      <div class="monitoring-card">
        <h3>服务器状态</h3>
        <div class="status-indicators">
          <div class="status-item">
            <span class="status-label">CPU使用率：</span>
            <span class="status-value">45%</span>
          </div>
          <div class="status-item">
            <span class="status-label">内存使用率：</span>
            <span class="status-value">68%</span>
          </div>
          <div class="status-item">
            <span class="status-label">磁盘使用率：</span>
            <span class="status-value">32%</span>
          </div>
          <div class="status-item">
            <span class="status-label">网络流量：</span>
            <span class="status-value">1.2 MB/s</span>
          </div>
        </div>
      </div>
      
      <div class="monitoring-card">
        <h3>应用状态</h3>
        <div class="app-status">
          <div class="app-item">
            <span class="app-name">前端服务</span>
            <span class="app-status-tag running">运行中</span>
          </div>
          <div class="app-item">
            <span class="app-name">后端服务</span>
            <span class="app-status-tag running">运行中</span>
          </div>
          <div class="app-item">
            <span class="app-name">数据库</span>
            <span class="app-status-tag running">运行中</span>
          </div>
        </div>
      </div>
      
      <div class="monitoring-card">
        <h3>访问统计</h3>
        <div class="visit-stats">
          <div class="stat-item">
            <span class="stat-label">今日访问量：</span>
            <span class="stat-value">1,245</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">本周访问量：</span>
            <span class="stat-value">8,762</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">本月访问量：</span>
            <span class="stat-value">32,154</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">总访问量：</span>
            <span class="stat-value">1,256,789</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 可以在这里添加获取监控数据的逻辑
});
</script>

<style scoped>
.system-monitoring {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.monitoring-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.monitoring-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.monitoring-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.monitoring-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.monitoring-card h3 {
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.status-indicators,
.app-status,
.visit-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item,
.app-item,
.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.status-item:last-child,
.app-item:last-child,
.stat-item:last-child {
  border-bottom: none;
}

.status-label,
.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.status-value,
.stat-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2c3e50;
}

.app-name {
  font-size: 0.9rem;
  color: #2c3e50;
}

.app-status-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.app-status-tag.running {
  background: #2ecc71;
  color: white;
}

.app-status-tag.stopped {
  background: #e74c3c;
  color: white;
}

.app-status-tag.warning {
  background: #f39c12;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .monitoring-cards {
    grid-template-columns: 1fr;
  }
}
</style>