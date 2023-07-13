const { hashing } = require("../helpers/bcrypt");
const User = require("../models/user");

class UserController {
  static async findAllUsers(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;
      const foundUser = await User.findById(id);
      if (!foundUser) throw { name: "NotFound" };
      res.status(200).json(foundUser);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      let { email, username, password, phoneNumber, address } = req.body;
      if (!email || !username || !password) throw { name: "InvalidInput" };
      const user = await User.findOne({ email });
      console.log(user);
      if (user) throw { name: "loginError" };
      password = hashing(password);
      const newUser = await User.createUser({
        email,
        username,
        password,
        phoneNumber,
        address,
        role: "Admin",
      });

      res.status(201).json({ message: "User Created Successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const foundUser = await User.findById(id);
      if (!foundUser) throw { name: "NotFound" };
      await User.deleteById(id);

      res.status(200).json({ message: "User Deleted Successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
