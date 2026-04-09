<template>
  <div class="blog">
    <!-- 顶部导航 -->
    <div class="blog-header">
      <div class="blog-nav">
        <div class="nav-container">
          <h1 class="blog-title">兄弟CS博客</h1>
          <div class="nav-links">
            <a href="/" class="nav-link">首页</a>
            <a href="/blog" class="nav-link active">文章</a>
            <a href="#" @click.prevent="openLoginModal" class="nav-link login-button">登录</a>
          </div>
        </div>
      </div>
      
      <!-- 搜索栏 -->
      <div class="search-container">
        <div class="search-box">
          <input type="text" placeholder="搜索文章..." class="search-input">
          <button class="search-button">搜索</button>
        </div>
      </div>
      
      <!-- 分类标签 -->
      <div class="category-tags">
        <a href="#" class="category-tag active">全部</a>
        <a href="#" class="category-tag">技术分享</a>
        <a href="#" class="category-tag">项目经验</a>
        <a href="#" class="category-tag">学习笔记</a>
        <a href="#" class="category-tag">生活随笔</a>
        <a href="#" class="category-tag">更多</a>
      </div>
    </div>
    
    <!-- 博客内容区域 -->
    <div class="blog-content">
      <!-- 博客列表 -->
      <div class="blog-list">
        <div v-for="blog in blogs" :key="blog.id" class="blog-card">
          <div class="blog-card-header">
            <h2 class="blog-card-title">{{ blog.title }}</h2>
          </div>
          <div class="blog-card-content">
            <p class="blog-card-excerpt">{{ blog.excerpt }}</p>
          </div>
          <div class="blog-card-footer">
            <div class="blog-card-meta">
              <span class="blog-card-date">{{ blog.date }}</span>
              <span class="blog-card-tags">
                <span v-for="tag in blog.tags" :key="tag" class="blog-card-tag">{{ tag }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧边栏 -->
      <div class="blog-sidebar">
      <!-- 作者信息 -->
      <div class="author-card">
        <div class="author-avatar">
          <img src="/images/XDCS.png" alt="作者头像">
        </div>
        <h3 class="author-name">兄弟CS团队</h3>
        <p class="author-bio">专注于CS相关技术分享和项目开发</p>
      </div>
      
      <!-- 热门标签 -->
      <div class="sidebar-section">
        <h3 class="sidebar-title">热门标签</h3>
        <div class="hot-tags">
          <a href="#" class="hot-tag">Vue</a>
          <a href="#" class="hot-tag">JavaScript</a>
          <a href="#" class="hot-tag">Node.js</a>
          <a href="#" class="hot-tag">CSS</a>
          <a href="#" class="hot-tag">前端</a>
          <a href="#" class="hot-tag">后端</a>
        </div>
      </div>
      
      <!-- 最新文章 -->
      <div class="sidebar-section">
        <h3 class="sidebar-title">最新文章</h3>
        <ul class="latest-posts">
          <li v-for="post in latestPosts" :key="post.id" class="latest-post">
            <a href="#" class="latest-post-link">{{ post.title }}</a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    
    <!-- 登录弹窗 -->
    <transition name="modal">
      <div v-show="showLoginModal" class="modal-overlay" @click="closeLoginModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ isLogin ? '用户登录' : '用户注册' }}</h3>
            <button class="modal-close" @click="closeLoginModal">&times;</button>
          </div>
          <div class="modal-body">
            <!-- 登录表单 -->
            <div v-if="isLogin" class="login-form">
              <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" v-model="loginForm.username" class="form-input" placeholder="请输入用户名">
              </div>
              <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="loginForm.password" class="form-input" placeholder="请输入密码">
              </div>
              <div class="form-actions">
                <button class="login-button" @click="handleLogin">登录</button>
                <button class="cancel-button" @click="closeLoginModal">取消</button>
              </div>
              <div class="form-footer">
                <p>还没有账号？<a href="#" @click.prevent="switchToRegister">立即注册</a></p>
              </div>
            </div>
            
            <!-- 注册表单 -->
            <div v-else class="login-form">
              <div class="form-group">
                <label for="reg-username">用户名</label>
                <input type="text" id="reg-username" v-model="registerForm.username" class="form-input" placeholder="请输入用户名">
              </div>
              <div class="form-group">
                <label for="reg-password">密码</label>
                <input type="password" id="reg-password" v-model="registerForm.password" class="form-input" placeholder="请输入密码">
              </div>
              <div class="form-group">
                <label for="reg-confirm-password">确认密码</label>
                <input type="password" id="reg-confirm-password" v-model="registerForm.confirmPassword" class="form-input" placeholder="请确认密码">
              </div>
              <div class="form-actions">
                <button class="login-button" @click="handleRegister">注册</button>
                <button class="cancel-button" @click="closeLoginModal">取消</button>
              </div>
              <div class="form-footer">
                <p>已有账号？<a href="#" @click.prevent="switchToLogin">立即登录</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 模拟博客数据
const blogs = ref([
  {
    id: 1,
    title: '基于Vue 3 + Vite开发一个现代化的CS网站',
    excerpt: '本文介绍如何使用Vue 3和Vite构建一个现代化的CS网站，包括项目初始化、组件设计、路由配置等内容。',
    date: '2026-04-01',
    tags: ['Vue', 'Vite', '前端']
  },
  {
    id: 2,
    title: 'CS服务器搭建与配置指南',
    excerpt: '详细介绍如何搭建和配置CS服务器，包括硬件选择、系统安装、插件配置等内容。',
    date: '2026-03-25',
    tags: ['CS', '服务器', '配置']
  },
  {
    id: 3,
    title: '前端性能优化实战',
    excerpt: '分享前端性能优化的实战经验，包括代码分割、图片优化、缓存策略等内容。',
    date: '2026-03-18',
    tags: ['前端', '性能优化', 'JavaScript']
  },
  {
    id: 4,
    title: 'Node.js后端开发实践',
    excerpt: '介绍Node.js后端开发的实践经验，包括Express框架使用、数据库设计、API开发等内容。',
    date: '2026-03-10',
    tags: ['Node.js', '后端', 'Express']
  }
]);

// 模拟最新文章数据
const latestPosts = ref([
  { id: 1, title: '基于Vue 3 + Vite开发一个现代化的CS网站' },
  { id: 2, title: 'CS服务器搭建与配置指南' },
  { id: 3, title: '前端性能优化实战' },
  { id: 4, title: 'Node.js后端开发实践' }
]);

// 登录弹窗
const showLoginModal = ref(false);
const isLogin = ref(true); // true 表示显示登录表单，false 表示显示注册表单
const loginForm = ref({
  username: '',
  password: ''
});
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

const openLoginModal = () => {
  showLoginModal.value = true;
  isLogin.value = true; // 默认显示登录表单
};

const closeLoginModal = () => {
  showLoginModal.value = false;
  // 重置表单
  loginForm.value = {
    username: '',
    password: ''
  };
  registerForm.value = {
    username: '',
    password: '',
    confirmPassword: ''
  };
};

const switchToRegister = () => {
  isLogin.value = false;
};

const switchToLogin = () => {
  isLogin.value = true;
};

// 初始化用户数据，内置管理员账号
const initUsers = () => {
  const users = localStorage.getItem('users');
  if (!users) {
    // 内置管理员账号
    const defaultUsers = {
      'admin': {
        username: 'admin',
        password: 'admin123',
        isAdmin: true
      }
    };
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

// 初始化用户数据
initUsers();

const handleLogin = () => {
  // 获取用户数据
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[loginForm.value.username];
  
  // 验证用户是否存在
  if (!user) {
    alert('用户不存在，请先注册！');
    return;
  }
  
  // 验证密码
  if (user.password !== loginForm.value.password) {
    alert('密码错误！');
    return;
  }
  
  // 登录成功，存储当前用户信息
  localStorage.setItem('currentUser', JSON.stringify(user));
  console.log('登录信息:', loginForm.value);
  alert('登录成功！');
  closeLoginModal();
};

const handleRegister = () => {
  // 简单的表单验证
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致！');
    return;
  }
  
  // 获取用户数据
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  
  // 检查用户名是否已存在
  if (users[registerForm.value.username]) {
    alert('用户名已存在！');
    return;
  }
  
  // 注册新用户
  users[registerForm.value.username] = {
    username: registerForm.value.username,
    password: registerForm.value.password,
    isAdmin: false
  };
  
  // 保存用户数据
  localStorage.setItem('users', JSON.stringify(users));
  console.log('注册信息:', registerForm.value);
  alert('注册成功！');
  // 注册成功后切换到登录表单
  switchToLogin();
};

onMounted(() => {
  // 可以在这里添加数据获取逻辑
});
</script>

<style scoped>
.blog {
  min-height: 100vh;
  background: #1a1a1a;
  color: #e0e0e0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 顶部导航 */
.blog-header {
  background: #121212;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover {
  color: #4CAF50;
}

.nav-link.active {
  color: #4CAF50;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4CAF50;
}

.login-button {
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #45a049;
  color: white;
}

/* 搜索栏 */
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 1rem;
}

.search-box {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #333;
  border-radius: 4px 0 0 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.search-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0 4px 4px 0;
  background: #4CAF50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-button:hover {
  background: #45a049;
}

/* 分类标签 */
.category-tags {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-tag {
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  border-radius: 20px;
  color: #e0e0e0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.category-tag:hover {
  border-color: #4CAF50;
  color: #4CAF50;
}

.category-tag.active {
  background: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

/* 博客内容区域 */
.blog-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

/* 博客列表 */
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-card {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.blog-card-header {
  margin-bottom: 1rem;
}

.blog-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e0e0e0;
  margin: 0;
  transition: color 0.3s ease;
}

.blog-card-title:hover {
  color: #4CAF50;
}

.blog-card-content {
  margin-bottom: 1rem;
}

.blog-card-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  color: #b0b0b0;
  margin: 0;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.blog-card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.blog-card-date {
  font-size: 0.8rem;
  color: #888;
}

.blog-card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.blog-card-tag {
  font-size: 0.8rem;
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

/* 右侧边栏 */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.author-card {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #333;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  overflow: hidden;
  border: 2px solid #4CAF50;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e0e0e0;
  margin: 0 0 0.5rem;
}

.author-bio {
  font-size: 0.9rem;
  color: #b0b0b0;
  margin: 0;
}

.sidebar-section {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #333;
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e0e0e0;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hot-tag {
  font-size: 0.8rem;
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hot-tag:hover {
  background: #4CAF50;
  color: white;
}

.latest-posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.latest-post {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
}

.latest-post:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.latest-post-link {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  display: block;
  line-height: 1.4;
}

.latest-post-link:hover {
  color: #4CAF50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .nav-links {
    justify-content: center;
  }
  
  .blog-content {
    grid-template-columns: 1fr;
  }
  
  .blog-sidebar {
    order: -1;
  }
  
  .category-tags {
    justify-content: center;
  }
}

/* 登录表单样式 */
.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #e0e0e0;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.login-button {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #45a049;
}

.cancel-button {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: transparent;
  color: #e0e0e0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  border-color: #4CAF50;
  color: #4CAF50;
}

.form-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #b0b0b0;
}

.form-footer a {
  color: #4CAF50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-footer a:hover {
  color: #45a049;
  text-decoration: underline;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0;
  color: white;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  color: white;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 弹窗过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>