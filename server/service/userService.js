const {v4: uuidv4} = require('uuid');
const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

const getUser = async (username, email) => {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{username}, {email}]
            }
        });
        return user;
    } catch (error) {
        throw error;
    }
    
}

const validateUser = (user) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {userName, email, password, DOB, gender} = user;
    if(!userName || !email || !password || !DOB || !gender) {
        const error = new Error('All fields are required');
        error.statusCode = 400;
        throw error;
    } else if(userName.length < 3) {
        const error = new Error('Username should be atleast 3 characters long');
        error.statusCode = 400;
        throw error;
    } else if(!emailRegex.test(email)) {
        const error = new Error('Please enter a valid email address');
        error.statusCode = 400;
        throw error;
    } else if(password.length < 6) {
        const error = new Error('Password should be atleast 6 characters long');
        error.statusCode = 400;
        throw error
    } else if(DOB.length === "") {
        const error = new Error('Please enter your date of birth');
        error.statusCode = 400;
        throw error;
    }
}

const registerUser = async (user) => {
    try {
        validateUser(user);
        const userExists = await getUser(user.userName, user.email);
        if(userExists) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        const {userName, email, password, DOB} = user;
        user.username = userName;
        user.email = email;
        user.dob = DOB;
        user.id = uuidv4();
        console.log(process.env.SALT_ROUNDS)
        user.password = await bcryptjs.hash(password, parseInt(process.env.SALT_ROUNDS));
        await User.create(user);
        return {userRegistered: "User registered successfully"};
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const loginUser = async (user) => {
    try {
        const {userName="", email="", password} = user;
        const dbUser = await getUser(userName, email);
        if(!dbUser) {
            const error = new Error('Invalid username or email');
            error.statusCode = 400;
            throw error;
        }

        const isPasswordMatched = await bcryptjs.compare(password, dbUser.password);
        if(!isPasswordMatched) {
            const error = new Error('Invalid password');
            error.statusCode = 400;
            throw error;
        }

        const payload = {
            username: userName
        };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
        return {jwtToken};
    } catch (error) {
        throw error;
    }
}

module.exports = {registerUser, loginUser};