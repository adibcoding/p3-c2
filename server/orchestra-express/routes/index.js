const express = require("express");
const PostController = require("../controllers/postsController");
const UserController = require("../controllers/usersController");
const router = express.Router();

router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getOnePost);
router.delete("/posts/:id", PostController.deletePost);
router.put("/posts/:id", PostController.editPost);
router.post("/posts", PostController.createPost);

router.get("/users/:id", UserController.findUserById);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users", UserController.findAllUsers);
router.post("/users", UserController.createUser);
module.exports = router;
