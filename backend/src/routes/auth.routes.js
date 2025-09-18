const {registerController,loginController, meController, logoutController} = require("../controllers/auth.controller");
const authMiddleware = require('../middleware/auth.middleware');

const express = require('express');

const router = express.Router();

// Register and Login routes
router.post("/register",registerController)
router.post("/login",loginController)
router.get('/me', authMiddleware, meController)
router.post('/logout', authMiddleware, logoutController)

module.exports = router;