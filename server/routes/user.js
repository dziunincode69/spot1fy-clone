const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.get("/verify", UserController.verifyEmail);
router.post("/register", UserController.registerAccount);
router.post("/login", UserController.loginAccount);

module.exports = router;
