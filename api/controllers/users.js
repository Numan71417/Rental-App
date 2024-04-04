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

module.exports = {
    getUsers
};