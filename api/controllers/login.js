const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../dbConnec');

const JWT_SECRET = process.env.JWT;


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        connection.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ error: 'Failed to log in user' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Please Register..' });
            }

            const user = results[0];

            // Verify password
            if (!await bcrypt.compare(password, user.password)) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);

            res.status(200).json({ token });
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to log in user' });
    }
}

module.exports = login;

