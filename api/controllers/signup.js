const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require("../dbConnec");

// Secret key for JWT
const JWT_SECRET = process.env.JWT;

// const users = [];

const signup = async (req, res) => {
    try {
        const { name, email, password, mobile, photo } = req.body;
        // const image = req.file; 
        // const imageData = image.buffer;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(name,email,password,mobile, photo);

        // Save user to database
        connection.query('INSERT INTO user (name, email, password, mobile, photo) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, mobile, photo], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

module.exports =  signup;

