<template>
  <div class="shop-management">
    <h2>商品管理</h2>
    
    <!-- 操作按钮 -->
    <div class="management-actions">
      <button class="add-button" @click="openAddModal">添加商品</button>
    </div>
    
    <!-- 商品列表 -->
    <div class="products-list">
      <table class="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>商品名称</th>
            <th>描述</th>
            <th>价格</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>¥{{ product.price }}</td>
            <td>
              <span :class="['status-badge', product.status]">
                {{ product.status === 'active' ? '上架' : '下架' }}
              </span>
            </td>
            <td>
              <button class="edit-button" @click="openEditModal(product)">编辑</button>
              <button 
                :class="['status-button', product.status === 'active' ? 'deactivate' : 'activate']"
                @click="toggleStatus(product.id)"
              >
                {{ product.status === 'active' ? '下架' : '上架' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 添加/编辑商品弹窗 -->
    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ isEditing ? '编辑商品' : '添加商品' }}</h3>
            <button class="modal-close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="form-group">
                <label for="product-name">商品名称</label>
                <input type="text" id="product-name" v-model="productForm.name" class="form-input" required>
              </div>
              <div class="form-group">
                <label for="product-description">商品描述</label>
                <textarea id="product-description" v-model="productForm.description" class="form-input" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="product-price">商品价格</label>
                <input type="number" id="product-price" v-model.number="productForm.price" class="form-input" min="0" step="0.01" required>
              </div>
              <div class="form-group">
                <label for="product-image">商品图片</label>
                <input type="text" id="product-image" v-model="productForm.image" class="form-input" required>
              </div>
              <div class="form-actions">
                <button type="submit" class="save-button">保存</button>
                <button type="button" class="cancel-button" @click="closeModal">取消</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 商品数据
const products = ref([
  {
    id: 1,
    name: '经典款卫衣',
    description: '全部满减7折起',
    price: 199,
    image: '/images/shop/laos.png',
    status: 'active'
  },
  {
    id: 2,
    name: '休闲运动鞋',
    description: '参考价 399 立减100',
    price: 399,
    image: '/images/shop/laos.png',
    status: 'active'
  },
  {
    id: 3,
    name: '时尚背包',
    description: '潮流必备单品',
    price: 299,
    image: '/images/shop/laos.png',
    status: 'inactive'
  },
  {
    id: 4,
    name: '土滨客',
    description: '全部五折 运动风',
    price: 299,
    image: '/images/shop/laos.png',
    status: 'active'
  }
]);

// 弹窗状态
const showModal = ref(false);
const isEditing = ref(false);
const productForm = ref({
  id: null,
  name: '',
  description: '',
  price: 0,
  image: ''
});

// 打开添加商品弹窗
const openAddModal = () => {
  isEditing.value = false;
  productForm.value = {
    id: null,
    name: '',
    description: '',
    price: 0,
    image: ''
  };
  showModal.value = true;
};

// 打开编辑商品弹窗
const openEditModal = (product) => {
  isEditing.value = true;
  productForm.value = { ...product };
  showModal.value = true;
};

// 关闭弹窗
const closeModal = () => {
  showModal.value = false;
};

// 保存商品
const saveProduct = () => {
  if (isEditing.value) {
    // 编辑现有商品
    const index = products.value.findIndex(p => p.id === productForm.value.id);
    if (index !== -1) {
      products.value[index] = { ...productForm.value };
    }
  } else {
    // 添加新商品
    const newProduct = {
      ...productForm.value,
      id: products.value.length + 1,
      status: 'active'
    };
    products.value.push(newProduct);
  }
  closeModal();
  alert('商品保存成功！');
};

// 切换商品状态（上架/下架）
const toggleStatus = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (product) {
    product.status = product.status === 'active' ? 'inactive' : 'active';
    alert(`商品已${product.status === 'active' ? '上架' : '下架'}！`);
  }
};

onMounted(() => {
  // 可以在这里从API获取商品数据
});
</script>

<style scoped>
.shop-management {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shop-management h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.5rem;
}

.management-actions {
  margin-bottom: 1.5rem;
}

.add-button {
  padding: 0.8rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-button:hover {
  background: #45a049;
}

.products-list {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th,
.products-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.products-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.active {
  background: #27ae60;
  color: white;
}

.status-badge.inactive {
  background: #e74c3c;
  color: white;
}

.edit-button {
  padding: 0.4rem 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: background 0.3s ease;
}

.edit-button:hover {
  background: #2980b9;
}

.status-button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.status-button.activate {
  background: #27ae60;
  color: white;
}

.status-button.activate:hover {
  background: #229954;
}

.status-button.deactivate {
  background: #e74c3c;
  color: white;
}

.status-button.deactivate:hover {
  background: #c0392b;
}

/* 弹窗样式 */
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
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
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
  background: #f8f9fa;
}

.modal-body {
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.save-button {
  flex: 1;
  padding: 0.8rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.save-button:hover {
  background: #45a049;
}

.cancel-button {
  flex: 1;
  padding: 0.8rem;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cancel-button:hover {
  background: #7f8c8d;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .shop-management {
    padding: 1rem;
  }
  
  .products-table th,
  .products-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .edit-button,
  .status-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
}
</style>