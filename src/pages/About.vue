<template>
  <div class="about glass">
    <h1>关于我</h1>
    <div class="about-content">
      <div class="about-info glass">
        <h2>个人简介</h2>
        <p>我是一名前端开发工程师，热爱技术，喜欢分享。</p>
        <p>专注于Vue、React等前端框架，以及现代UI设计和用户体验。</p>
        <p>希望通过这个博客分享我的学习心得和技术经验。</p>
      </div>
      <div class="about-skills glass">
        <h2>技术栈</h2>
        <ul>
          <li>前端：Vue 3、React、JavaScript、TypeScript</li>
          <li>UI/UX：CSS3、Sass、Tailwind CSS</li>
          <li>工具：Vite、Webpack、Git</li>
          <li>后端：Node.js、Express.js</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// 关于页组件
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  transition: box-shadow 0.3s ease;
  cursor: url('/images/Cursors.png') 8 8, auto !important;
}

.about * {
  cursor: url('/images/Cursors.png') 8 8, auto !important;
}

.about:hover {
  box-shadow: 0 12px 24px rgba(31, 38, 135, 0.2);
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.about-info, .about-skills {
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.about-info:hover, .about-skills:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(31, 38, 135, 0.2);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #333;
  font-weight: bold;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}
</style>