const express = require("express");
const PostController = require("../controllers/postController");
const CategoryController = require("../controllers/categoryController");
const PubController = require("../controllers/pubController");

const router = express.Router();

router.get("/posts", PostController.getPosts);
router.get("/posts/:id", PostController.getOnePost);
router.put("/posts/:id", PostController.editPost);
router.delete("/posts/:id", PostController.deletePosts);
router.post("/posts", PostController.addPosts);

router.post("/categories", CategoryController.addCategories);
router.put("/categories/:id", CategoryController.editCategories);
router.delete("/categories/:id", CategoryController.deleteCategories);

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getOneCategory);

router.get("/pub/posts", PubController.getPostsPub);
router.get("/pub/posts/:slug", PubController.getDetailPostsPub);

module.exports = router;
