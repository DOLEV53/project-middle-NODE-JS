const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const verify_logged_in = require("../middleware/verify_logged_in");

// POST http://localhost:3000/api/users/signup
router.post("/signup", userController.signup_post);

// POST http://localhost:3000/api/users/login
router.post("/login", userController.login_post);

//GET http://localhost:3000/api/users/verify
router.get("/verify", verify_logged_in, userController.verify_get);

module.exports = router;
