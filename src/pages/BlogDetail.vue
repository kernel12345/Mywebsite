<template>
  <div class="blog-detail glass">
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
    <div v-else>
      <h1>{{ blog.title }}</h1>
      <p class="blog-meta">{{ blog.date }} | {{ blog.category }}</p>
      <div class="blog-content">
        <p>{{ blog.content }}</p>
      </div>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getArticle } from '../services/api';

const route = useRoute();
const blogId = route.params.id;
const blog = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await getArticle(blogId);
    blog.value = data;
  } catch (error) {
    console.error(`Error loading blog ${blogId}:`, error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  transition: box-shadow 0.3s ease;
  cursor: url('/images/Cursors.png') 8 8, auto !important;
}

.blog-detail * {
  cursor: url('/images/Cursors.png') 8 8, auto !important;
}

.blog-detail:hover {
  box-shadow: 0 12px 24px rgba(31, 38, 135, 0.2);
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.blog-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.blog-content {
  line-height: 1.8;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(51, 51, 51, 0.8);
  backdrop-filter: blur(5px);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.back-link:hover {
  background-color: rgba(85, 85, 85, 0.9);
  transform: translateY(-2px);
}
</style>