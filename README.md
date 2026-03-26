# 我的网站

## 项目简介

这是一个基于 Vue 3 + Vite + Express + MongoDB 的全栈网站项目。

## 功能特性

- **响应式设计**：适配不同屏幕尺寸
- **实时时钟**：显示当前时间和日期
- **随机名言**：每10秒自动更新一句随机名言，带有淡入淡出效果
- **GitHub 链接**：导航栏包含 GitHub 图标链接
- **版权信息**：显示在页面底部

## 技术栈

- **前端**：Vue 3, Vue Router, Vite
- **后端**：Express, MongoDB, Mongoose
- **样式**：CSS3, 毛玻璃效果

## 项目结构

```
Mywebsite/
├── backend/              # 后端代码
│   ├── models/           # 数据模型
│   ├── routes/           # API 路由
│   ├── app.js            # 后端主文件
│   └── package.json      # 后端依赖
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   ├── favicon.svg       # 网站图标
│   └── icons.svg         # 图标集合
├── src/                  # 前端代码
│   ├── assets/           # 前端资源
│   ├── components/       # 组件
│   ├── pages/            # 页面
│   ├── router/           # 路由
│   ├── services/         # 服务
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── .gitignore            # Git 忽略文件
├── index.html            # HTML 模板
├── package.json          # 前端依赖
└── vite.config.js        # Vite 配置
```

## 安装与运行

### 前端

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 后端

```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 启动后端服务器
npm start

# 启动开发模式（带热重载）
npm run dev
```

## 主要更改

1. **版权信息**：将版权信息移到页面底部
2. **GitHub 图标**：将第一个社交图标替换为 GitHub 图标，链接到 `https://github.com/kernel12345`
3. **随机名言**：集成 Hitokoto 随机名言 API
4. **渐显渐隐效果**：为名言文字添加淡入淡出效果（方框保持不变）
5. **更新间隔**：将名言更新间隔设置为10秒

## API 调用

- **随机名言 API**：`https://v1.hitokoto.cn/`

## 预览

- 前端地址：http://localhost:5173/
- 后端地址：http://localhost:3001/

## 作者

Made by 韦旅淦
