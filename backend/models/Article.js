const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    index: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    index: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    },
    index: true
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
    // 存储为逗号分隔的字符串
    get() {
      const tags = this.getDataValue('tags');
      return tags ? tags.split(',') : [];
    },
    set(value) {
      this.setDataValue('tags', Array.isArray(value) ? value.join(',') : value);
    }
  },
  status: {
    type: DataTypes.ENUM('published', 'draft', 'archived'),
    defaultValue: 'draft',
    index: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'articles',
  timestamps: true,
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['status']
    },
    {
      fields: ['categoryId']
    }
  ]
});

// 关联关系
Article.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Article, { foreignKey: 'categoryId' });

module.exports = Article;