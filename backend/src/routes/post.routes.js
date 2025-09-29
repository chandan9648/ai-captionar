const express = require('express')
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const { createPostController } = require("../controllers/post.controller")
const multer = require("multer");
const rateLimit = require('express-rate-limit');

const upload = multer({ storage: multer.memoryStorage() })

// Basic rate limiter per IP+user to avoid hammering AI provider
const createCaptionLimiter = rateLimit({
    windowMs: Number(process.env.CAPTION_WINDOW_MS || 60_000), // 1 minute
    max: Number(process.env.CAPTION_MAX_REQUESTS || 5), // 5 requests/min
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req, _res) => {
        // combine user id when available with IP for fairness
        const userId = req?.user?._id?.toString?.() || 'anon';
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'ip-unknown';
        return `${userId}:${ip}`;
    },
    message: { message: 'Too many requests. Please try again shortly.' }
});

/* POST /api/posts [protected] {image-file}*/
router.post('/',
    authMiddleware, /* req.user = userData */
    createCaptionLimiter,
    upload.single("image"),
    createPostController
)

module.exports = router;