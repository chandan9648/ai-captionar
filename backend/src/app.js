const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require("./routes/post.routes");
const cookieParser = require('cookie-parser');



const app = express()
app.use(cookieParser());
app.use(express.json());

//AUTH AND POST ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


module.exports = app;