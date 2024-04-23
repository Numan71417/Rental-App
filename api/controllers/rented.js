// controllers/rented.js

const connection = require("../dbConnec");

const getRented = (req, res) => {
    const sql = 'SELECT * FROM rented';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

const addItems = (req, res) => {
    const { item_name, category, price, description } = req.body;

    // Check if all required fields are provided
    if (!item_name || !category || !price || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate price to ensure it's a valid number
    if (isNaN(price) || parseFloat(price) <= 0) {
        return res.status(400).json({ error: 'Invalid price' });
    }

    // Sanitize inputs to prevent SQL injection
    const sql = 'INSERT INTO items (item_name, category, price, description) VALUES (?, ?, ?, ?)';
    const values = [item_name, category, price, description];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding item:', err);
            return res.status(500).json({ error: 'Failed to add item to the database' });
        }
        res.status(200).json({ result, msg: 'Added item to DB successfully' });
    });
};

module.exports = {
    getItems,
    addItems
};