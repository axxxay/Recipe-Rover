const userService = require('../service/userService');

const registerUser = async (req, res) => {
    try {
        const user = req.body;
        const response = await userService.registerUser(user);
        res.status(201).json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const user = req.body;
        const response = await userService.loginUser(user);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

module.exports = {registerUser, loginUser};