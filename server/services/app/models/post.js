"use strict";
const { Model } = require("sequelize");
const slugify = require("../helpers/slugify");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
      this.hasMany(models.Tag, {
        foreignKey: "postId",
      });
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be null",
          },
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Slug cannot be null",
          },
          notEmpty: {
            msg: "Slug cannot be empty",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Content cannot be null",
          },
          notEmpty: {
            msg: "Content cannot be empty",
          },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category cannot be null",
          },
          notEmpty: {
            msg: "Category cannot be empty",
          },
        },
      },
      authorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  Post.beforeCreate((post) => {
    post.slug = slugify(post.title);
  });

  Post.beforeUpdate((post) => {
    post.slug = slugify(post.title);
  });

  return Post;
};
