<template>
  <div class="app">
    <!-- 导航栏 -->
    <nav class="navbar glass">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">个人博客</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/about" class="nav-link">关于我</router-link>
        </div>
      </div>
    </nav>
    
    <!-- 路由视图 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 页脚 -->
    <footer class="footer glass">
      <p>© 2026 个人博客. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup>
// App组件
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease;
}

.navbar:hover {
  box-shadow: 0 4px 20px rgba(31, 38, 135, 0.2);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #666;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #333;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
  transition: box-shadow 0.3s ease;
}

.footer:hover {
  box-shadow: 0 -4px 20px rgba(31, 38, 135, 0.2);
}
</style>