const { Post, User, Tag, Category, sequelize } = require("../models");

class PubController {
  static async getPostsPub(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: Category },
          { model: Tag },
        ],
      });

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async getDetailPostsPub(req, res, next) {
    try {
      const { slug } = req.params;
      const post = await Post.findOne({
        where: {
          slug,
        },
        include:[{model: Category}, {model: Tag}]
      });

      if (!post) throw { name: "NotFound" };

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PubController