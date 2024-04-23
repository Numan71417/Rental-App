// controllers/users.js

const connection = require("../dbConnec");

const getUsers = (req, res) => {
    const sql = 'SELECT * FROM user';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

const addUser = (req, res) => {
    const {  name, email, password, mobile } = req.body;
    const sql = 'INSERT INTO user (name, email, password, mobile) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [ name, email, password, mobile], (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json({ error: 'Error inserting user' });
        }
        return res.status(200).json({ message: 'User inserted successfully', result });
    });
};


module.exports = {
    getUsers,
    addUser,
};