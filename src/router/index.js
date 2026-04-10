import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Blog from '../pages/Blog.vue';
import BlogDetail from '../pages/BlogDetail.vue';
import Admin from '../pages/Admin.vue';
import AdminHome from '../pages/AdminHome.vue';
import ArticleManagement from '../pages/ArticleManagement.vue';
import SystemMonitoring from '../pages/SystemMonitoring.vue';
import SystemTools from '../pages/SystemTools.vue';
import RuoYiWebsite from '../pages/RuoYiWebsite.vue';
import TestDirectory from '../pages/TestDirectory.vue';
import Shop from '../pages/Shop.vue';
import ShopManagement from '../pages/ShopManagement.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'articles',
        name: 'ArticleManagement',
        component: ArticleManagement
      },
      {
        path: 'shop',
        name: 'ShopManagement',
        component: ShopManagement
      },
      {
        path: 'monitoring',
        name: 'SystemMonitoring',
        component: SystemMonitoring
      },
      {
        path: 'tools',
        name: 'SystemTools',
        component: SystemTools
      },
      {
        path: 'ruoyi',
        name: 'RuoYiWebsite',
        component: RuoYiWebsite
      },
      {
        path: 'test',
        name: 'TestDirectory',
        component: TestDirectory
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  // 检查路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // 检查是否已登录
    if (!currentUser) {
      // 未登录，重定向到首页
      next('/');
    } else {
      // 检查是否需要管理员权限
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (currentUser.isAdmin) {
          // 是管理员，允许访问
          next();
        } else {
          // 不是管理员，重定向到首页
          next('/');
        }
      } else {
        // 不需要管理员权限，允许访问
        next();
      }
    }
  } else {
    // 不需要认证，允许访问
    next();
  }
});

export default router;