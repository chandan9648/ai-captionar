// api ke ander kya hoga aur kese hoga uske kaam mein ayengi

const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



//REGISTER CONTROLLER
async function registerController(req, res) {
    const { email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie("token", token)

    return res.status(201).json({ message: "User registered successfully", user });
}


//LOGIN CONTROLLER
async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            email: user.email,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController,
    meController: async function meController(req, res) {
        // Protected via auth middleware in route definition
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Not authenticated" });
        res.json({
            user: {
                id: user._id,
                email: user.email
            }
        })
    },

    // LOGOUT CONTROLLER
    logoutController: function logoutController(req, res) {
        res.clearCookie('token');
        res.json({ message: 'Logged out' });
    }
}