<template>
  <div class="home">
    <div class="glass header">
      <h1>个人博客</h1>
    </div>
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
    <div v-else class="blog-list">
      <div class="blog-card glass" v-for="blog in blogs" :key="blog.id">
        <h2>{{ blog.title }}</h2>
        <p class="blog-meta">{{ blog.date }} | {{ blog.category }}</p>
        <p class="blog-excerpt">{{ blog.excerpt }}</p>
        <router-link :to="`/blog/${blog.id}`" class="read-more">阅读更多</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBlogs } from '../services/api';

const blogs = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await getBlogs();
    blogs.value = data;
  } catch (error) {
    console.error('Error loading blogs:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  padding: 2rem;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-card {
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(31, 38, 135, 0.2);
}

.blog-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.blog-excerpt {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(51, 51, 51, 0.8);
  backdrop-filter: blur(5px);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.read-more:hover {
  background-color: rgba(85, 85, 85, 0.9);
  transform: translateY(-2px);
}
</style>