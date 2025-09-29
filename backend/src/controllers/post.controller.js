const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service")
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");


async function createPostController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        console.log("File received:", file?.originalname, file?.mimetype, file?.size);

        const base64Image = Buffer.from(file.buffer).toString('base64');

        const caption = await generateCaption(base64Image);
        const result = await uploadFile(file.buffer, `${uuidv4()}`);
        const post = await postModel.create({
            caption: caption,
            image: result.url,
            user: req.user._id,
        });
        return res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (err) {
        // If upstream returned a 429 or similar, attempt to forward that intent
        const msg = err?.message || 'Failed to create post';
        const status = err?.status || (/too many requests/i.test(msg) ? 429 : 500);
        const body = { message: msg };
        if (err?.retryAfterMs) body.retryAfterMs = err.retryAfterMs;
        return res.status(status).json(body);
    }
}


module.exports = {
    createPostController
}