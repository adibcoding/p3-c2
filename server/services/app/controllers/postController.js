const slugify = require("../helpers/slugify");
const { Post, User, Tag, Category, sequelize } = require("../models");

class PostController {
  static async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [{ model: Category }, { model: Tag }],
      });

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async deletePosts(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const post = await Post.findOne(
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );

      if (!post) throw { name: "NotFound" };

      const deletedPost = Post.destroy({ where: { id } }, { transaction: t });
      t.commit();
      res.status(200).json({ message: "Post Deleted" });
    } catch (err) {
      t.rollback();
      next(err);
    }
  }

  static async getOnePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({
        where: {
          id,
        },
        include: [{ model: Category }, { model: Tag }]
      });

      if (!post) throw { name: "NotFound" };

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async editPost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      // const { userId } = req.extra;
      const { title, content, imgUrl, categoryId } = req.body;
      const post = await Post.findOne(
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );

      if (!post) throw { name: "NotFound" };
      const editedPost = await Post.update(
        {
          title,
          content,
          imgUrl,
          categoryId,
          slug: slugify(title),
        },
        { where: { id } },
        { transaction: t }
      );

      res.status(200).json({ message: "Post Edited" });
    } catch (err) {
      next(err);
    }
  }

  static async addPosts(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // const { userId } = req.extra; jangan lupa ini sementara
      const { title, content, imgUrl, categoryId, name, authorId } = req.body;
      console.log(authorId, title);

      const createdPost = await Post.create(
        {
          title,
          content,
          imgUrl,
          slug: slugify(title),
          categoryId,
          authorId,
        },
        { transaction: t }
      );

      const arrMap = name.map((el) => {
        return { name: el, postId: createdPost.id };
      });
      console.log(arrMap);
      await Tag.bulkCreate(arrMap, { validate: true, transaction: t });
      t.commit();
      res.status(201).json({ message: "Post Created" });
    } catch (err) {
      t.rollback();
      next(err);
    }
  }
}

module.exports = PostController;
