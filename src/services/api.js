// API服务文件
const API_BASE_URL = 'http://localhost:3001/api';

// 获取所有博客
export async function getBlogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // 返回模拟数据作为备用
    return [
      {
        id: 1,
        title: "Vue 3 新特性详解",
        date: "2026-03-01",
        category: "前端技术",
        excerpt: "Vue 3 带来了许多新特性，包括组合式API、Teleport、Suspense等，本文将详细介绍这些特性的使用方法。"
      },
      {
        id: 2,
        title: "毛玻璃效果实现指南",
        date: "2026-02-15",
        category: "UI设计",
        excerpt: "毛玻璃效果是一种现代UI设计趋势，本文将介绍如何使用CSS实现各种毛玻璃效果。"
      },
      {
        id: 3,
        title: "前后端分离架构实践",
        date: "2026-01-20",
        category: "架构设计",
        excerpt: "前后端分离架构已经成为现代Web开发的主流，本文将分享一些实践经验和最佳实践。"
      }
    ];
  }
}

// 获取单个博客
export async function getBlogById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    // 返回模拟数据作为备用
    return {
      id: id,
      title: "博客标题",
      date: "2026-03-01",
      category: "前端技术",
      content: "这里是博客内容，详细介绍了相关技术和实践经验..."
    };
  }
}

// 创建博客
export async function createBlog(blogData) {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogData)
    });
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

// 更新博客
export async function updateBlog(id, blogData) {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogData)
    });
    if (!response.ok) {
      throw new Error('Failed to update blog');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating blog ${id}:`, error);
    throw error;
  }
}

// 删除博客
export async function deleteBlog(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    throw error;
  }
}