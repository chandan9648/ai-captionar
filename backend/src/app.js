const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require("./routes/post.routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'https://reliable-caramel-e9abb5.netlify.app', // frontend URL
    credentials: true, // allow cookies to be sent
}));

//AUTH AND POST ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



module.exports = app;