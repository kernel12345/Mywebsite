<template>
  <div class="product-management">
    <div class="page-header">
      <h2>商品管理</h2>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="handleExportProducts">导出商品</button>
        <input type="file" ref="importFile" style="display: none" accept=".json" @change="handleImportProducts">
        <button class="btn btn-secondary" @click="$refs.importFile.click()">导入商品</button>
        <button class="btn btn-primary" @click="openAddModal">添加商品</button>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-filter">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="搜索商品名称" class="form-input">
        <button class="btn btn-secondary" @click="fetchProducts">搜索</button>
      </div>
      <div class="filter-box">
        <select v-model="filterCategory" class="form-select">
          <option value="">全部分类</option>
          <option v-for="category in productCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <select v-model="filterStatus" class="form-select">
          <option value="">全部状态</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
          <option value="archived">已归档</option>
        </select>
        <button class="btn btn-secondary" @click="fetchProducts">筛选</button>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="product-list">
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" v-model="selectAll"></th>
            <th>ID</th>
            <th>名称</th>
            <th>分类</th>
            <th>价格</th>
            <th>库存</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td><input type="checkbox" v-model="selectedProducts" :value="product.id"></td>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.Category ? product.Category.name : '未分类' }}</td>
            <td>¥{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <span :class="['status-badge', product.status]">{{ product.status }}</span>
            </td>
            <td>{{ formatDate(product.createdAt) }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="openEditModal(product)">编辑</button>
              <button class="btn btn-sm btn-danger" @click="handleDeleteProduct(product.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <button class="btn btn-sm" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">上一页</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button class="btn btn-sm" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">下一页</button>
    </div>

    <!-- 批量操作 -->
    <div class="batch-actions" v-if="selectedProducts.length > 0">
      <span>已选择 {{ selectedProducts.length }} 个商品</span>
      <button class="btn btn-sm btn-danger" @click="batchDelete">批量删除</button>
      <select v-model="batchStatus" class="form-select-sm">
        <option value="">批量更新状态</option>
        <option value="published">已发布</option>
        <option value="draft">草稿</option>
        <option value="archived">已归档</option>
      </select>
      <button class="btn btn-sm btn-secondary" @click="batchUpdateStatus" :disabled="!batchStatus">更新状态</button>
    </div>

    <!-- 添加/编辑商品弹窗 -->
    <transition name="modal">
      <div v-show="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ isEdit ? '编辑商品' : '添加商品' }}</h3>
            <button class="modal-close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="product-name">商品名称</label>
              <input type="text" id="product-name" v-model="formData.name" class="form-input" placeholder="请输入商品名称">
            </div>
            <div class="form-group">
              <label for="product-description">商品描述</label>
              <textarea id="product-description" v-model="formData.description" class="form-textarea" placeholder="请输入商品描述"></textarea>
            </div>
            <div class="form-group">
              <label for="product-price">价格</label>
              <input type="number" id="product-price" v-model="formData.price" class="form-input" placeholder="请输入价格" step="0.01">
            </div>
            <div class="form-group">
              <label for="product-stock">库存</label>
              <input type="number" id="product-stock" v-model="formData.stock" class="form-input" placeholder="请输入库存">
            </div>
            <div class="form-group">
              <label for="product-category">分类</label>
              <select id="product-category" v-model="formData.categoryId" class="form-select">
                <option value="">请选择分类</option>
                <option v-for="category in productCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="product-image">图片</label>
              <input type="text" id="product-image" v-model="formData.image" class="form-input" placeholder="请输入图片URL">
            </div>
            <div class="form-group">
              <label for="product-status">状态</label>
              <select id="product-status" v-model="formData.status" class="form-select">
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
                <option value="archived">已归档</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">取消</button>
            <button class="btn btn-primary" @click="saveProduct" :disabled="isLoading">{{ isLoading ? '保存中...' : '保存' }}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getProducts, createProduct, updateProduct, deleteProduct as apiDeleteProduct, deleteProducts, updateProductsStatus, getCategories, importProducts as apiImportProducts, exportProducts as apiExportProducts } from '../services/api';

// 商品列表数据
const products = ref([]);
const totalProducts = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索和筛选
const searchQuery = ref('');
const filterCategory = ref('');
const filterStatus = ref('');

// 分类列表
const productCategories = ref([]);

// 选择状态
const selectedProducts = ref([]);
const selectAll = ref(false);
const batchStatus = ref('');

// 弹窗状态
const showModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const formData = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  categoryId: '',
  image: '',
  status: 'draft'
});

// 计算属性
const selectAllComputed = computed({
  get: () => selectedProducts.value.length === products.value.length && products.value.length > 0,
  set: (value) => {
    if (value) {
      selectedProducts.value = products.value.map(product => product.id);
    } else {
      selectedProducts.value = [];
    }
  }
});

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 获取商品列表
const fetchProducts = async () => {
  try {
    const params = {
      page: currentPage.value,
      limit: pageSize.value,
      categoryId: filterCategory.value,
      status: filterStatus.value,
      search: searchQuery.value
    };
    const response = await getProducts(params);
    products.value = response.products;
    totalProducts.value = response.total;
    totalPages.value = response.pages;
    currentPage.value = response.currentPage;
    // 重置选择
    selectedProducts.value = [];
  } catch (error) {
    console.error('获取商品列表失败:', error);
  }
};

// 获取分类列表
const fetchCategories = async () => {
  try {
    const categories = await getCategories('product');
    productCategories.value = categories;
  } catch (error) {
    console.error('获取分类列表失败:', error);
  }
};

// 打开添加弹窗
const openAddModal = () => {
  isEdit.value = false;
  formData.value = {
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: '',
    status: 'draft'
  };
  showModal.value = true;
};

// 打开编辑弹窗
const openEditModal = (product) => {
  isEdit.value = true;
  formData.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId || '',
    image: product.image || '',
    status: product.status
  };
  showModal.value = true;
};

// 关闭弹窗
const closeModal = () => {
  showModal.value = false;
};

// 保存商品
const saveProduct = async () => {
  try {
    isLoading.value = true;
    if (isEdit.value) {
      await updateProduct(products.value.find(p => p.name === formData.value.name).id, formData.value);
    } else {
      await createProduct(formData.value);
    }
    closeModal();
    fetchProducts();
  } catch (error) {
    console.error('保存商品失败:', error);
  } finally {
    isLoading.value = false;
  }
};

// 删除商品
const handleDeleteProduct = async (id) => {
  if (confirm('确定要删除这个商品吗？')) {
    try {
      await apiDeleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('删除商品失败:', error);
    }
  }
};

// 批量删除
const batchDelete = async () => {
  if (confirm(`确定要删除选中的 ${selectedProducts.value.length} 个商品吗？`)) {
    try {
      await deleteProducts(selectedProducts.value);
      fetchProducts();
    } catch (error) {
      console.error('批量删除商品失败:', error);
    }
  }
};

// 批量更新状态
const batchUpdateStatus = async () => {
  if (batchStatus.value && confirm(`确定要将选中的 ${selectedProducts.value.length} 个商品状态更新为 ${batchStatus.value} 吗？`)) {
    try {
      await updateProductsStatus(selectedProducts.value, batchStatus.value);
      fetchProducts();
    } catch (error) {
      console.error('批量更新商品状态失败:', error);
    }
  }
};

// 切换页码
const changePage = (page) => {
  currentPage.value = page;
  fetchProducts();
};

// 初始化
onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});

// 导出商品
const handleExportProducts = async () => {
  try {
    const productsData = await apiExportProducts();
    const blob = new Blob([JSON.stringify(productsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('导出商品失败:', error);
  }
};

// 导入商品
const handleImportProducts = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const productsData = JSON.parse(e.target.result);
      await apiImportProducts(productsData);
      fetchProducts();
      // 重置文件输入
      event.target.value = '';
    };
    reader.readAsText(file);
  } catch (error) {
    console.error('导入商品失败:', error);
  }
};
</script>

<style scoped>
.product-management {
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

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.search-box, .filter-box {
  display: flex;
  gap: 10px;
  align-items: center;
}

.form-input, .form-select {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 14px;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #4CAF50;
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

.product-list {
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

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.published {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.status-badge.draft {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.status-badge.archived {
  background: rgba(158, 158, 158, 0.2);
  color: #9e9e9e;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.batch-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #2a2a2a;
  border-radius: 4px;
}

.form-select-sm {
  padding: 4px 8px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 12px;
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
  max-width: 600px;
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

.form-textarea {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 14px;
  width: 100%;
  min-height: 100px;
  resize: vertical;
}

.form-textarea:focus {
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
  .search-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box, .filter-box {
    flex-direction: column;
    align-items: stretch;
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