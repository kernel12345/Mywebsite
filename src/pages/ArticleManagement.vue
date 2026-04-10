<template>
  <div class="article-management">
    <div class="article-header">
      <h2>文章管理</h2>
      <button class="add-article-button" @click="addArticle">添加文章</button>
    </div>
    
    <div class="article-filters">
      <div class="filter-group">
        <label for="category">分类：</label>
        <select id="category" class="filter-select">
          <option value="all">全部</option>
          <option value="tech">技术分享</option>
          <option value="experience">项目经验</option>
          <option value="notes">学习笔记</option>
          <option value="life">生活随笔</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="status">状态：</label>
        <select id="status" class="filter-select">
          <option value="all">全部</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
        </select>
      </div>
      <div class="filter-group">
        <input type="text" placeholder="搜索文章..." class="search-input">
        <button class="search-button">搜索</button>
      </div>
    </div>
    
    <div class="article-list">
      <table class="article-table">
        <thead>
          <tr>
            <th><input type="checkbox"></th>
            <th>标题</th>
            <th>分类</th>
            <th>发布时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td><input type="checkbox"></td>
            <td>{{ article.title }}</td>
            <td>{{ article.category }}</td>
            <td>{{ article.date }}</td>
            <td>
              <select class="status-select" v-model="article.status" @change="saveArticles">
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
            </td>
            <td>
              <button class="action-button edit" @click="editArticle(article)">编辑</button>
              <button class="action-button delete" @click="deleteArticle(article.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="pagination">
      <button class="page-button">上一页</button>
      <button class="page-button active">1</button>
      <button class="page-button">2</button>
      <button class="page-button">3</button>
      <button class="page-button">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);

// 初始化文章数据
const initArticles = () => {
  const savedArticles = localStorage.getItem('articles');
  if (!savedArticles) {
    // 内置默认文章
    const defaultArticles = [
      {
        id: 1,
        title: '基于Vue 3 + Vite开发一个现代化的CS网站',
        category: '技术分享',
        date: '2026-04-01',
        status: 'published',
        excerpt: '本文介绍如何使用Vue 3和Vite构建一个现代化的CS网站，包括项目初始化、组件设计、路由配置等内容。',
        tags: ['Vue', 'Vite', '前端']
      },
      {
        id: 2,
        title: 'CS服务器搭建与配置指南',
        category: '项目经验',
        date: '2026-03-25',
        status: 'published',
        excerpt: '详细介绍如何搭建和配置CS服务器，包括硬件选择、系统安装、插件配置等内容。',
        tags: ['CS', '服务器', '配置']
      },
      {
        id: 3,
        title: '前端性能优化实战',
        category: '技术分享',
        date: '2026-03-18',
        status: 'draft',
        excerpt: '分享前端性能优化的实战经验，包括代码分割、图片优化、缓存策略等内容。',
        tags: ['前端', '性能优化', 'JavaScript']
      },
      {
        id: 4,
        title: 'Node.js后端开发实践',
        category: '技术分享',
        date: '2026-03-10',
        status: 'published',
        excerpt: '介绍Node.js后端开发的实践经验，包括Express框架使用、数据库设计、API开发等内容。',
        tags: ['Node.js', '后端', 'Express']
      }
    ];
    localStorage.setItem('articles', JSON.stringify(defaultArticles));
    articles.value = defaultArticles;
  } else {
    articles.value = JSON.parse(savedArticles);
  }
};

// 保存文章数据
const saveArticles = () => {
  localStorage.setItem('articles', JSON.stringify(articles.value));
};

// 添加文章
const addArticle = () => {
  const newArticle = {
    id: Date.now(),
    title: '新文章',
    category: '技术分享',
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    excerpt: '文章摘要',
    tags: ['未分类']
  };
  articles.value.push(newArticle);
  saveArticles();
  alert('文章添加成功！');
};

// 编辑文章
const editArticle = (article) => {
  const newTitle = prompt('请输入新标题:', article.title);
  if (newTitle) {
    article.title = newTitle;
    saveArticles();
    alert('文章编辑成功！');
  }
};

// 删除文章
const deleteArticle = (articleId) => {
  if (confirm('确定要删除这篇文章吗？')) {
    articles.value = articles.value.filter(article => article.id !== articleId);
    saveArticles();
    alert('文章删除成功！');
  }
};

onMounted(() => {
  initArticles();
});
</script>

<style scoped>
.article-management {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.article-header h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.add-article-button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-article-button:hover {
  background: #2980b9;
}

.article-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;
  width: 200px;
}

.search-button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-button:hover {
  background: #2980b9;
}

.article-list {
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.article-table {
  width: 100%;
  border-collapse: collapse;
}

.article-table th,
.article-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.article-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.article-table tr:hover {
  background: #f8f9fa;
}

.status-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-tag.published {
  background: #2ecc71;
  color: white;
}

.status-tag.draft {
  background: #f39c12;
  color: white;
}

.status-select {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8rem;
  background: white;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.status-select:focus {
  outline: none;
  border-color: #3498db;
}

.action-button {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;
  margin-right: 0.5rem;
}

.action-button.edit {
  background: #3498db;
  color: white;
}

.action-button.edit:hover {
  background: #2980b9;
}

.action-button.delete {
  background: #e74c3c;
  color: white;
}

.action-button.delete:hover {
  background: #c0392b;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.page-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-button:hover {
  border-color: #3498db;
  color: #3498db;
}

.page-button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-filters {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-select,
  .search-input {
    flex: 1;
    min-width: 200px;
  }
  
  .article-table {
    font-size: 0.9rem;
  }
  
  .article-table th,
  .article-table td {
    padding: 0.5rem;
  }
  
  .action-button {
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
  }
}
</style>