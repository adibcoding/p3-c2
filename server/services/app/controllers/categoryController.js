const { Post, User, Tag, Category, sequelize } = require("../models");

class CategoryController {
  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;
      const createdCategory = await Category.create({ name });

      res.status(201).json(createdCategory);
    } catch (err) {
      next(err);
    }
  }

  static async editCategories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name } = req.body;
      const { id } = req.params;
      console.log(id);
      const category = await Category.findOne(
        { where: { id } },
        { transaction: t }
      );

      if (!category) throw { name: "NotFound" };

      const editedCategory = await Category.update(
        { name },
        { where: { id } },
        { transaction: t }
      );
      t.commit();
      res.status(200).json(editedCategory);
    } catch (err) {
      t.rollback();
      next(err);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getOneCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) throw { name: "NotFound" };

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const category = await Category.findOne(
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      if (!category) throw { name: "NotFound" };
      await Category.destroy({ where: { id } }, { transaction: t });
      t.commit()
      res.status(200).json(category);
    } catch (err) {
      t.rollback()
      next(err);
    }
  }
}

module.exports = CategoryController;
