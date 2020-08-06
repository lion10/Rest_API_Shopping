const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

// Handling incoming endPoints requests

// post signup
router.post("/signup", UserController.users_signup);

// post login
router.post("/login", UserController.users_login);

//delete user
router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
