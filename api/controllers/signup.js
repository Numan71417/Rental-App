const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require("../dbConnec");

const JWT_SECRET = process.env.JWT;


const signup = async (req, res) => {
    try {
        const { name, email, password, mobile, photo } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Using 10 salt rounds

        console.log(name, email, password, mobile, photo);

        connection.query('INSERT INTO user (name, email, password, mobile, photo) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, mobile, photo], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error registering user: 2', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

module.exports = signup;


