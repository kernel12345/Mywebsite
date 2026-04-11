<template>
  <div class="category-management">
    <div class="page-header">
      <h2>分类管理</h2>
      <button class="btn btn-primary" @click="openAddModal">添加分类</button>
    </div>

    <!-- 分类类型切换 -->
    <div class="type-switcher">
      <button 
        v-for="type in categoryTypes" 
        :key="type.value"
        :class="['btn', type.value === activeType ? 'btn-primary' : 'btn-secondary']"
        @click="switchType(type.value)"
      >
        {{ type.label }}
      </button>
    </div>

    <!-- 分类列表 -->
    <div class="category-list">
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" v-model="selectAll"></th>
            <th>ID</th>
            <th>名称</th>
            <th>类型</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td><input type="checkbox" v-model="selectedCategories" :value="category.id"></td>
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ getTypeLabel(category.type) }}</td>
            <td>{{ formatDate(category.createdAt) }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="openEditModal(category)">编辑</button>
              <button class="btn btn-sm btn-danger" @click="handleDeleteCategory(category.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 批量操作 -->
    <div class="batch-actions" v-if="selectedCategories.length > 0">
      <span>已选择 {{ selectedCategories.length }} 个分类</span>
      <button class="btn btn-sm btn-danger" @click="batchDelete">批量删除</button>
    </div>

    <!-- 添加/编辑分类弹窗 -->
    <transition name="modal">
      <div v-show="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ isEdit ? '编辑分类' : '添加分类' }}</h3>
            <button class="modal-close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="category-name">分类名称</label>
              <input type="text" id="category-name" v-model="formData.name" class="form-input" placeholder="请输入分类名称">
            </div>
            <div class="form-group">
              <label for="category-type">分类类型</label>
              <select id="category-type" v-model="formData.type" class="form-select">
                <option value="product">商品分类</option>
                <option value="article">文章分类</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">取消</button>
            <button class="btn btn-primary" @click="saveCategory" :disabled="isLoading">{{ isLoading ? '保存中...' : '保存' }}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCategories, createCategory, updateCategory, deleteCategory as apiDeleteCategory, deleteCategories } from '../services/api';

// 分类类型
const categoryTypes = [
  { label: '商品分类', value: 'product' },
  { label: '文章分类', value: 'article' }
];

// 当前激活的分类类型
const activeType = ref('product');

// 分类列表数据
const categories = ref([]);

// 选择状态
const selectedCategories = ref([]);
const selectAll = ref(false);

// 弹窗状态
const showModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const formData = ref({
  name: '',
  type: 'product'
});

// 计算属性
const selectAllComputed = computed({
  get: () => selectedCategories.value.length === categories.value.length && categories.value.length > 0,
  set: (value) => {
    if (value) {
      selectedCategories.value = categories.value.map(category => category.id);
    } else {
      selectedCategories.value = [];
    }
  }
});

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 获取分类类型标签
const getTypeLabel = (type) => {
  const typeObj = categoryTypes.find(t => t.value === type);
  return typeObj ? typeObj.label : type;
};

// 获取分类列表
const fetchCategories = async () => {
  try {
    const fetchedCategories = await getCategories(activeType.value);
    categories.value = fetchedCategories;
    // 重置选择
    selectedCategories.value = [];
  } catch (error) {
    console.error('获取分类列表失败:', error);
  }
};

// 切换分类类型
const switchType = (type) => {
  activeType.value = type;
  fetchCategories();
};

// 打开添加弹窗
const openAddModal = () => {
  isEdit.value = false;
  formData.value = {
    name: '',
    type: activeType.value
  };
  showModal.value = true;
};

// 打开编辑弹窗
const openEditModal = (category) => {
  isEdit.value = true;
  formData.value = {
    name: category.name,
    type: category.type
  };
  showModal.value = true;
};

// 关闭弹窗
const closeModal = () => {
  showModal.value = false;
};

// 保存分类
const saveCategory = async () => {
  try {
    isLoading.value = true;
    if (isEdit.value) {
      await updateCategory(categories.value.find(c => c.name === formData.value.name).id, formData.value);
    } else {
      await createCategory(formData.value);
    }
    closeModal();
    fetchCategories();
  } catch (error) {
    console.error('保存分类失败:', error);
  } finally {
    isLoading.value = false;
  }
};

// 删除分类
const handleDeleteCategory = async (id) => {
  if (confirm('确定要删除这个分类吗？')) {
    try {
      await apiDeleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('删除分类失败:', error);
    }
  }
};

// 批量删除
const batchDelete = async () => {
  if (confirm(`确定要删除选中的 ${selectedCategories.value.length} 个分类吗？`)) {
    try {
      await deleteCategories(selectedCategories.value);
      fetchCategories();
    } catch (error) {
      console.error('批量删除分类失败:', error);
    }
  }
};

// 初始化
onMounted(async () => {
  await fetchCategories();
});
</script>

<style scoped>
.category-management {
  padding: 20px;
  background: #1a1a1a;
  min-height: 100vh;
  color: #e0e0e0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #4CAF50;
}

.type-switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
}

.btn-secondary {
  background: #666;
  color: white;
}

.btn-secondary:hover {
  background: #555;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn-danger:hover {
  background: #d32f2f;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.category-list {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #333;
}

.table th {
  background: #333;
  font-weight: bold;
}

.table tr:hover {
  background: #333;
}

.batch-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #2a2a2a;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0;
  color: white;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #e0e0e0;
  font-size: 14px;
}

.form-input, .form-select {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 14px;
  width: 100%;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #4CAF50;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .type-switcher {
    flex-direction: column;
  }

  .table {
    font-size: 12px;
  }

  .table th, .table td {
    padding: 8px;
  }

  .batch-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>