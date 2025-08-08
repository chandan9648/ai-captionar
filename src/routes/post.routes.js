const express = require('express')
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const { createPostController } = require("../controllers/post.controller")
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() })

/* POST /api/posts [protected] {image-file}*/
router.post('/',
    authMiddleware, /* req.user = userData */
    upload.single("image"),
    createPostController
)

module.exports = router;