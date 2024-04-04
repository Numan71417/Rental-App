// controllers/items.js

const connection = require("../dbConnec");

const getItems = (req, res) => {
    const sql = 'SELECT * FROM items';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

module.exports = {
    getItems
};