const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require("./routes/post.routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express()
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json());
// Support multiple allowed origins via env, comma-separated
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,https://ai-captionar.vercel.app')
  .split(',')
  .map(o => o.trim());
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin like mobile apps or curl
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS not allowed from this origin'), false);
    },
    credentials: true,
}));

//AUTH AND POST ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



module.exports = app;