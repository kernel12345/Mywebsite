<template>
  <div class="shop">
    <!-- 顶部导航 -->
    <div class="shop-header">
      <div class="shop-nav">
        <div class="nav-container">
          <h1 class="shop-title">XDCSHUB</h1>
          <div class="nav-links">
            <router-link to="/" class="nav-link">首页</router-link>
            <router-link to="/blog" class="nav-link">文章</router-link>
            <router-link to="/shop" class="nav-link active">小店</router-link>
            <a href="#" @click.prevent="openLoginModal" class="nav-link login-button">登录</a>
          </div>
        </div>
      </div>
      
      <!-- 搜索栏 -->
      <div class="search-container">
        <div class="search-box">
          <input type="text" placeholder="搜索商品..." class="search-input">
          <button class="search-button">搜索</button>
        </div>
      </div>
      
      <!-- 分类标签 -->
      <div class="category-tags">
        <router-link to="/shop" class="category-tag active">全部</router-link>
        <router-link to="/shop?category=clothing" class="category-tag">服装</router-link>
        <router-link to="/shop?category=shoes" class="category-tag">鞋履</router-link>
        <router-link to="/shop?category=bags" class="category-tag">箱包</router-link>
        <router-link to="/shop?category=accessories" class="category-tag">配饰</router-link>
        <router-link to="/shop?category=more" class="category-tag">更多</router-link>
      </div>
    </div>
    
    <!-- 小店内容区域 -->
    <div class="shop-content">
      <!-- 轮播图 -->
      <div class="carousel">
        <div class="carousel-item">
          <img src="/images/shop/laos.png" alt="促销活动" class="carousel-image">
        </div>
      </div>
      
      <!-- 商品列表 -->
      <div class="products-section">
        <h2 class="section-title">限时折扣</h2>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="discount-badge">限时折扣</div>
            </div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-price">¥{{ product.price }}</div>
            <button class="product-button">限时折扣 ></button>
          </div>
        </div>
      </div>
      
      <!-- 推荐商品 -->
      <div class="products-section">
        <h2 class="section-title">推荐商品</h2>
        <div class="products-grid">
          <div v-for="product in recommendedProducts" :key="product.id" class="product-card">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-image">
            </div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-price">¥{{ product.price }}</div>
            <button class="product-button">查看详情 ></button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部版权信息 -->
    <div class="footer">
      <p>Copyright © 2025 - 2026 | Made by 韦旅淦</p>
    </div>
  </div>
    
    <!-- 登录弹窗 -->
    <transition name="modal">
      <div v-if="showLoginModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h2>{{ isLogin ? '用户登录' : '用户注册' }}</h2>
            <button class="close-button" @click="closeLoginModal">&times;</button>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    alert('密码错误，请重新输入！');
    return;
  }
  
  // 登录成功
  alert('登录成功！');
  localStorage.setItem('currentUser', JSON.stringify(user));
  closeLoginModal();
  
  // 跳转到管理页面
  router.push('/admin');
};

const handleRegister = () => {
  // 验证用户名是否已存在
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[registerForm.value.username]) {
    alert('用户名已存在，请重新输入！');
    return;
  }
  
  // 验证密码是否一致
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致，请重新输入！');
    return;
  }
  
  // 注册成功
  const newUser = {
    username: registerForm.value.username,
    password: registerForm.value.password,
    isAdmin: false
  };
  
  users[registerForm.value.username] = newUser;
  localStorage.setItem('users', JSON.stringify(users));
  
  alert('注册成功！');
  isLogin.value = true; // 切换到登录表单
};

// 模拟商品数据
const products = ref([
  {
    id: 1,
    name: '经典款卫衣',
    description: '全部满减7折起',
    price: 199,
    image: '/images/shop/laos.png'
  },
  {
    id: 2,
    name: '休闲运动鞋',
    description: '参考价 399 立减100',
    price: 399,
    image: '/images/shop/laos.png'
  },
  {
    id: 3,
    name: '时尚背包',
    description: '潮流必备单品',
    price: 299,
    image: '/images/shop/laos.png'
  },
  {
    id: 4,
    name: '土滨客',
    description: '全部五折 运动风',
    price: 299,
    image: '/images/shop/laos.png'
  }
]);

// 模拟推荐商品数据
const recommendedProducts = ref([
  {
    id: 5,
    name: '连帽外套',
    description: '时尚百搭',
    price: 259,
    image: '/images/shop/laos.png'
  },
  {
    id: 6,
    name: '板鞋',
    description: '街头潮流',
    price: 329,
    image: '/images/shop/laos.png'
  },
  {
    id: 7,
    name: '斜挎包',
    description: '轻便实用',
    price: 199,
    image: '/images/shop/laos.png'
  },
  {
    id: 8,
    name: '运动裤',
    description: '舒适透气',
    price: 159,
    image: '/images/shop/laos.png'
  }
]);

onMounted(() => {
  // 可以在这里添加数据获取逻辑
});
</script>

<style scoped>
.shop {
  min-height: 100vh;
  background: #1a1a1a;
  color: #e0e0e0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 顶部导航 */
.shop-header {
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

.shop-title {
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

/* 小店内容区域 */
.shop-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 轮播图 */
.carousel {
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

/* 商品列表 */
.products-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #e0e0e0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.product-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4757;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.product-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 1rem;
  color: #e0e0e0;
}

.product-desc {
  font-size: 0.9rem;
  color: #999;
  margin: 0 1rem 1rem;
  line-height: 1.4;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff4757;
  margin: 0 1rem 1rem;
}

.product-button {
  width: calc(100% - 2rem);
  margin: 0 1rem 1rem;
  padding: 0.8rem;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  background: #2a2a2a;
  color: #4CAF50;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-button:hover {
  background: #4CAF50;
  color: white;
}

/* 底部版权信息 */
.footer {
  background: #121212;
  border-top: 1px solid #333;
  padding: 1.5rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
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
  
  .shop-content {
    padding: 1rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .carousel-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .category-tags {
    justify-content: center;
  }
}

/* 登录弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 400px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #333;
}

.modal-header h2 {
  margin: 0;
  color: #e0e0e0;
  font-size: 1.2rem;
}

.close-button {
  background: none;
  border: none;
  color: #999;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #e0e0e0;
}

.modal-body {
  padding: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #e0e0e0;
  font-size: 0.9rem;
}

.form-input {
  padding: 0.8rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: #1a1a1a;
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
  margin-top: 1rem;
}

.login-button {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  font-size: 1rem;
  font-weight: bold;
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
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background: #333;
  border-color: #444;
}

.form-footer {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #999;
}

.form-footer a {
  color: #4CAF50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-footer a:hover {
  text-decoration: underline;
}

/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>