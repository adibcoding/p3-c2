const { MONGO_SERVER_URL, SQL_SERVER_URL } = require("../config/apiUrl");
const redis = require("../config/redisConnection");
const axios = require("axios");
class PostController {
  static async getAllPosts(req, res, next) {
    try {
      let postsCache = await redis.get("posts:get");
      if (!postsCache) {
        const { data: posts } = await axios.get(`${SQL_SERVER_URL}/posts`);
        await redis.set("posts:get", JSON.stringify(posts));
        postsCache = await redis.get("posts:get");
      }
      const posts = JSON.parse(postsCache);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async getOnePost(req, res, next) {
    try {
      let postsCache = await redis.get("posts:get");
      let post = {};
      let users = [];
      const { id } = req.params;

      if (!postsCache) {
        const { data } = await axios.get(`${SQL_SERVER_URL}/posts/${id}`);
        post = data;
      } else {
        const posts = JSON.parse(postsCache);
        post = posts.find((post) => post.id == id);
      }

      let usersCache = await redis.get("users:get");
      if (!usersCache) {
        const { data } = await axios.get(`${MONGO_SERVER_URL}/users`);

        users = data;
      } else {
        users = JSON.parse(usersCache);
      }

      let User = users.find((user) => user._id == post.authorId);

      post.User = User;

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { title, content, imgUrl, categoryId, authorId, name } = req.body;
      const { data: post } = await axios.post(`${SQL_SERVER_URL}/posts`, {
        title,
        content,
        imgUrl,
        categoryId,
        authorId,
        name,
      });
      await redis.del("posts:get");

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async editPost(req, res, next) {
    try {
      const { title, content, imgUrl, categoryId } = req.body;
      const { id } = req.params;
      const { data: post } = await axios.put(`${SQL_SERVER_URL}/posts/${id}`, {
        title,
        content,
        imgUrl,
        categoryId,
      });
      await redis.del("posts:get");

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const { data: post } = await axios.delete(
        `${SQL_SERVER_URL}/posts/${id}`
      );
      await redis.del("posts:get");

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;
