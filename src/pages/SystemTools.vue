<template>
  <div class="system-tools">
    <div class="tools-header">
      <h2>系统工具</h2>
    </div>
    
    <div class="tools-grid">
      <div class="tool-card">
        <div class="tool-icon">⚙️</div>
        <h3>网站配置</h3>
        <p>修改网站基本设置、主题颜色、Logo等</p>
        <button class="tool-button">进入配置</button>
      </div>
      
      <div class="tool-card">
        <div class="tool-icon">💾</div>
        <h3>数据备份</h3>
        <p>备份网站数据，防止数据丢失</p>
        <button class="tool-button">备份数据</button>
      </div>
      
      <div class="tool-card">
        <div class="tool-icon">📊</div>
        <h3>系统日志</h3>
        <p>查看系统运行日志和错误信息</p>
        <button class="tool-button">查看日志</button>
      </div>
      
      <div class="tool-card">
        <div class="tool-icon">🔒</div>
        <h3>安全设置</h3>
        <p>配置系统安全选项和权限管理</p>
        <button class="tool-button">安全配置</button>
      </div>
      
      <div class="tool-card">
        <div class="tool-icon">📁</div>
        <h3>文件管理</h3>
        <p>管理网站文件和资源</p>
        <button class="tool-button">管理文件</button>
      </div>
      
      <div class="tool-card">
        <div class="tool-icon">🔄</div>
        <h3>系统更新</h3>
        <p>检查和安装系统更新</p>
        <button class="tool-button">检查更新</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 可以在这里添加初始化逻辑
});
</script>

<style scoped>
.system-tools {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.tools-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.tools-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tool-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tool-card h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.tool-card p {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
}

.tool-button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
}

.tool-button:hover {
  background: #2980b9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>