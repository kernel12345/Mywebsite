// API服务文件
const API_BASE_URL = 'http://localhost:3001/api';

// 用户登录
export async function loginUser(loginData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// 用户注册
export async function registerUser(registerData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// 获取所有用户
export async function getUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// 获取分类列表
export async function getCategories(type) {
  try {
    const url = type ? `${API_BASE_URL}/categories?type=${type}` : `${API_BASE_URL}/categories`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// 创建分类
export async function createCategory(categoryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// 更新分类
export async function updateCategory(id, categoryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    });
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
}

// 删除分类
export async function deleteCategory(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
}

// 批量删除分类
export async function deleteCategories(ids) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    });
    if (!response.ok) {
      throw new Error('Failed to delete categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting categories:', error);
    throw error;
  }
}

// 获取商品列表
export async function getProducts(params) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { total: 0, pages: 0, currentPage: 1, products: [] };
  }
}

// 获取单个商品
export async function getProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

// 创建商品
export async function createProduct(productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// 更新商品
export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
}

// 删除商品
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}

// 批量删除商品
export async function deleteProducts(ids) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    });
    if (!response.ok) {
      throw new Error('Failed to delete products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting products:', error);
    throw error;
  }
}

// 批量更新商品状态
export async function updateProductsStatus(ids, status) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/batch/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids, status })
    });
    if (!response.ok) {
      throw new Error('Failed to update products status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating products status:', error);
    throw error;
  }
}

// 获取文章列表
export async function getArticles(params) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/articles?${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { total: 0, pages: 0, currentPage: 1, articles: [] };
  }
}

// 获取单个文章
export async function getArticle(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    throw error;
  }
}

// 创建文章
export async function createArticle(articleData) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create article');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
}

// 更新文章
export async function updateArticle(id, articleData) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    });
    if (!response.ok) {
      throw new Error('Failed to update article');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating article ${id}:`, error);
    throw error;
  }
}

// 删除文章
export async function deleteArticle(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting article ${id}:`, error);
    throw error;
  }
}

// 批量删除文章
export async function deleteArticles(ids) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    });
    if (!response.ok) {
      throw new Error('Failed to delete articles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting articles:', error);
    throw error;
  }
}

// 批量更新文章状态
export async function updateArticlesStatus(ids, status) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/batch/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids, status })
    });
    if (!response.ok) {
      throw new Error('Failed to update articles status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating articles status:', error);
    throw error;
  }
}

// 商品导入
export async function importProducts(products) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products })
    });
    if (!response.ok) {
      throw new Error('Failed to import products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error importing products:', error);
    throw error;
  }
}

// 商品导出
export async function exportProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/export`);
    if (!response.ok) {
      throw new Error('Failed to export products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error exporting products:', error);
    throw error;
  }
}

// 文章导入
export async function importArticles(articles) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ articles })
    });
    if (!response.ok) {
      throw new Error('Failed to import articles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error importing articles:', error);
    throw error;
  }
}

// 文章导出
export async function exportArticles() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/export`);
    if (!response.ok) {
      throw new Error('Failed to export articles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error exporting articles:', error);
    throw error;
  }
}

// 获取热门标签
export async function getHotTags() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/stats/hot-tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch hot tags');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hot tags:', error);
    return [];
  }
}