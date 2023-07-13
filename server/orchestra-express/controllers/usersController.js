const { MONGO_SERVER_URL } = require("../config/apiUrl");
const redis = require("../config/redisConnection");
const axios = require("axios");

class UserController {
  static async findAllUsers(req, res, next) {
    try {
      let usersCache = await redis.get("users:get");

      if (!usersCache) {
        const { data: users } = await axios.get(`${MONGO_SERVER_URL}/users`);
        await redis.set("users:get", JSON.stringify(users));
        usersCache = await redis.get("users:get");
      }
      const users = JSON.parse(usersCache);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    try {
      let usersCache = await redis.get("users:get");
      const { id } = req.params;
      let user = {};

      if (!usersCache) {
        const { data } = await axios.get(`${MONGO_SERVER_URL}/users/${id}`);
        user = data;
      } else {
        let users = JSON.parse(usersCache);
        user = users.find((user) => user._id == id);
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, phoneNumber, password, address } = req.body;
      const { data: user } = await axios.post(`${MONGO_SERVER_URL}/users`, {
        username,
        email,
        phoneNumber,
        password,
        address,
      });
      await redis.del("users:get");

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { data: user } = await axios.delete(
        `${MONGO_SERVER_URL}/users/${id}`
      );
      await redis.del("users:get");

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
