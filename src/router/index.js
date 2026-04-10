import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Blog from '../pages/Blog.vue';
import BlogDetail from '../pages/BlogDetail.vue';
import Admin from '../pages/Admin.vue';
import ArticleManagement from '../pages/ArticleManagement.vue';
import SystemMonitoring from '../pages/SystemMonitoring.vue';
import SystemTools from '../pages/SystemTools.vue';
import RuoYiWebsite from '../pages/RuoYiWebsite.vue';
import TestDirectory from '../pages/TestDirectory.vue';

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
        component: {
          template: `
            <div class="dashboard">
              <!-- 统计卡片区域 -->
              <div class="stats-cards">
                <div class="stat-card green">
                  <div class="stat-icon">¥</div>
                  <div class="stat-content">
                    <div class="stat-label">今日收入</div>
                    <div class="stat-value">102,125.00</div>
                  </div>
                </div>
                <div class="stat-card red">
                  <div class="stat-icon">👥</div>
                  <div class="stat-content">
                    <div class="stat-label">用户总数</div>
                    <div class="stat-value">{{ userCount }}</div>
                  </div>
                </div>
                <div class="stat-card teal">
                  <div class="stat-icon">👁️</div>
                  <div class="stat-content">
                    <div class="stat-label">阅读量</div>
                    <div class="stat-value">34,005,000</div>
                  </div>
                </div>
                <div class="stat-card purple">
                  <div class="stat-icon">💬</div>
                  <div class="stat-content">
                    <div class="stat-label">新增留言</div>
                    <div class="stat-value">153条</div>
                  </div>
                </div>
              </div>
              
              <!-- 图表区域 -->
              <div class="charts-section">
                <div class="chart-card">
                  <h3>每周用户</h3>
                  <div class="chart-container">
                    <!-- 这里将放置图表 -->
                    <div class="placeholder-chart bar-chart"></div>
                  </div>
                </div>
                <div class="chart-card">
                  <h3>交易历史记录</h3>
                  <div class="chart-container">
                    <!-- 这里将放置图表 -->
                    <div class="placeholder-chart line-chart"></div>
                  </div>
                </div>
              </div>
              
              <!-- 项目信息表格 -->
              <div class="table-section">
                <h3>项目信息</h3>
                <div class="table-container">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>项目名称</th>
                        <th>开始日期</th>
                        <th>截止日期</th>
                        <th>状态</th>
                        <th>进度</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>设计新主题</td>
                        <td>10/02/2019</td>
                        <td>12/05/2019</td>
                        <td><span class="status-tag pending">进行中</span></td>
                        <td>65%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `,
          data() {
            return {
              userCount: 0
            };
          },
          mounted() {
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            this.userCount = Object.keys(users).length;
          }
        }
      },
      {
        path: 'articles',
        name: 'ArticleManagement',
        component: ArticleManagement
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