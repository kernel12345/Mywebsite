<template>
  <div class="ruoyi-website">
    <div class="website-header">
      <h2>若依官网</h2>
    </div>
    
    <div class="website-content">
      <div class="website-info">
        <h3>关于若依</h3>
        <p>若依是一个基于Spring Boot的快速开发平台，提供了完整的权限管理、代码生成、系统监控等功能。</p>
        <p>若依框架具有以下特点：</p>
        <ul>
          <li>基于Spring Boot 2.x和MyBatis-Plus</li>
          <li>完整的权限管理体系</li>
          <li>代码生成器，可快速生成前后端代码</li>
          <li>丰富的前端组件和页面模板</li>
          <li>支持多数据源、分布式事务等企业级特性</li>
        </ul>
      </div>
      
      <div class="website-links">
        <h3>相关链接</h3>
        <div class="link-list">
          <a href="https://www.ruoyi.vip" target="_blank" class="link-item">
            <div class="link-icon">🌐</div>
            <div class="link-info">
              <div class="link-title">若依官网</div>
              <div class="link-desc">官方网站</div>
            </div>
          </a>
          <a href="https://gitee.com/y_project/RuoYi" target="_blank" class="link-item">
            <div class="link-icon">📁</div>
            <div class="link-info">
              <div class="link-title">若依Gitee仓库</div>
              <div class="link-desc">源代码仓库</div>
            </div>
          </a>
          <a href="https://github.com/yangzongzhuan/RuoYi" target="_blank" class="link-item">
            <div class="link-icon">📁</div>
            <div class="link-info">
              <div class="link-title">若依GitHub仓库</div>
              <div class="link-desc">源代码仓库</div>
            </div>
          </a>
          <a href="https://doc.ruoyi.vip" target="_blank" class="link-item">
            <div class="link-icon">📚</div>
            <div class="link-info">
              <div class="link-title">若依文档</div>
              <div class="link-desc">使用文档和开发指南</div>
            </div>
          </a>
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
.ruoyi-website {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.website-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.website-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.website-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.website-info h3,
.website-links h3 {
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.website-info p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
  margin: 0 0 1rem 0;
}

.website-info ul {
  padding-left: 1.5rem;
  margin: 0;
}

.website-info li {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 0.5rem;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.link-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.link-icon {
  font-size: 1.5rem;
}

.link-info {
  flex: 1;
}

.link-title {
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.link-desc {
  font-size: 0.85rem;
  color: #7f8c8d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .website-content {
    grid-template-columns: 1fr;
  }
}
</style>