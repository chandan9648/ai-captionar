
const {registerController,loginController} = require("../controllers/auth.controller");

const express = require('express');

const router = express.Router();

// Register and Login routes
router.post("/register",registerController)
router.post("/login",loginController)

module.exports = router;