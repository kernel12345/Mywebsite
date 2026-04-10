<template>
  <div class="test-directory">
    <div class="directory-header">
      <h2>测试目录</h2>
    </div>
    
    <div class="directory-content">
      <div class="test-categories">
        <div class="category-section">
          <h3>功能测试</h3>
          <div class="test-items">
            <div class="test-item">
              <h4>用户管理测试</h4>
              <p>测试用户注册、登录、权限管理等功能</p>
              <button class="test-button">开始测试</button>
            </div>
            <div class="test-item">
              <h4>文章管理测试</h4>
              <p>测试文章的添加、编辑、删除等功能</p>
              <button class="test-button">开始测试</button>
            </div>
            <div class="test-item">
              <h4>系统设置测试</h4>
              <p>测试系统配置、数据备份等功能</p>
              <button class="test-button">开始测试</button>
            </div>
          </div>
        </div>
        
        <div class="category-section">
          <h3>性能测试</h3>
          <div class="test-items">
            <div class="test-item">
              <h4>页面加载测试</h4>
              <p>测试页面加载速度和响应时间</p>
              <button class="test-button">开始测试</button>
            </div>
            <div class="test-item">
              <h4>数据库性能测试</h4>
              <p>测试数据库查询和操作性能</p>
              <button class="test-button">开始测试</button>
            </div>
            <div class="test-item">
              <h4>并发测试</h4>
              <p>测试系统在多用户并发访问时的性能</p>
              <button class="test-button">开始测试</button>
            </div>
          </div>
        </div>
        
        <div class="category-section">
          <h3>安全测试</h3>
          <div class="test-items">
            <div class="test-item">
              <h4>权限测试</h4>
              <p>测试系统权限控制是否有效</p>
              <button class="test-button">开始测试</button>
            </div>
            <div class="test-item">
              <h4>XSS测试</h4>
              <p>测试系统是否存在XSS漏洞</p>
              <button class="test-button">开始测试</button>
            </div>
            <div class="test-item">
              <h4>SQL注入测试</h4>
              <p>测试系统是否存在SQL注入漏洞</p>
              <button class="test-button">开始测试</button>
            </div>
          </div>
        </div>
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
.test-directory {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.directory-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.directory-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.test-categories {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-section h3 {
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.test-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.test-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.test-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.test-item h4 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.test-item p {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.test-button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
}

.test-button:hover {
  background: #2980b9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .test-items {
    grid-template-columns: 1fr;
  }
}
</style>