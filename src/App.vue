<template>
  <div class="app">
    <!-- 路由视图 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// App组件
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>