const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require("./routes/post.routes");
const cookieParser = require('cookie-parser');
// const cors = require('cors');


const app = express()
app.use(cookieParser());
app.use(express.json());
// app.use(cors({
//     origin: 'https://ai-captionar.vercel.app', // frontend URL
//     credentials: true, // allow cookies to be sent
// }));

//AUTH AND POST ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



module.exports = app;