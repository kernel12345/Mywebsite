<template>
  <div class="admin-container">
    <!-- 左侧导航栏 -->
    <div class="admin-sidebar">
      <div class="sidebar-header">
        <h1>xdcs后台管理系统</h1>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li class="nav-item active">
            <router-link to="/admin">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles">文章管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/monitoring">系统监控</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/tools">系统工具</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/ruoyi">若依官网</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/test">测试目录</router-link>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <p>Copyright © 2026 XDCS All rights reserved.</p>
      </div>
    </div>
    
    <!-- 右侧主内容区 -->
    <div class="admin-main">
      <!-- 顶部导航栏 -->
      <div class="admin-header">
        <div class="header-left">
          <button class="menu-toggle">☰</button>
          <h2>首页</h2>
        </div>
        <div class="header-right">
          <div class="user-info">
            <button class="logout-button" @click="logout">退出</button>
          </div>
        </div>
      </div>
      
      <!-- 子页面内容 -->
      <div class="admin-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 检查用户是否已登录且是管理员
const checkAdminStatus = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.isAdmin) {
    // 不是管理员，重定向到首页
    router.push('/');
  }
};

// 退出登录
const logout = () => {
  localStorage.removeItem('currentUser');
  router.push('/');
};

onMounted(() => {
  checkAdminStatus();
});
</script>

<style scoped>
/* 全局样式 */
.admin-container {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: url('/images/Cursors.png') 8 8, auto !important;
}

.admin-container * {
  cursor: url('/images/Cursors.png') 8 8, auto !important;
}

/* 左侧导航栏 */
.admin-sidebar {
  width: 200px;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h1 {
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 0.5rem 1rem;
}

.nav-item a {
  color: #bdc3c7;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-item a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active a,
.nav-item.router-link-active a {
  color: white;
  background: #3498db;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #34495e;
  font-size: 0.8rem;
  color: #95a5a6;
  text-align: center;
}

/* 右侧主内容区 */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 顶部导航栏 */
.admin-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}

.header-left h2 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info span {
  color: #333;
  font-weight: 500;
}

.logout-button {
  padding: 0.4rem 0.8rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
}

.logout-button:hover {
  background: #c0392b;
}

/* 主内容区域 */
.admin-main > div:not(.admin-header) {
  padding: 1.5rem;
}

/* 子页面内容区域 */
.admin-content {
  padding: 1.5rem;
  min-height: calc(100vh - 60px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 180px;
  }
  
  .sidebar-header h1 {
    font-size: 1rem;
  }
  
  .admin-header {
    padding: 0 1rem;
  }
  
  .admin-main > div:not(.admin-header) {
    padding: 1rem;
  }
  
  .admin-content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .admin-sidebar {
    width: 150px;
  }
  
  .nav-item a {
    font-size: 0.9rem;
  }
  
  .logout-button {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>