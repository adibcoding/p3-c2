const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/", UserController.findAllUsers);
router.get("/:id", UserController.findUserById);
router.delete("/:id", UserController.deleteUser);
router.post("/", UserController.createUser);

module.exports = router;
