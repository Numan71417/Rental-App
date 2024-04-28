// controllers/items.js

const connection = require("../dbConnec");

const getItems = (req, res) => {
    const sql = `SELECT items.* ,
                    owner.name AS owner_name
                    FROM items
                INNER JOIN user AS owner ON items.owner = owner.id
                   
     `;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

const getItem = (req, res) => {
    const {id} = req.params;
    const sql = `SELECT items.* ,
                    owner.name AS owner_name
                    FROM items
                INNER JOIN user AS owner ON items.owner = owner.id
                WHERE items.id = ?
                   
     `;
    connection.query(sql,[id], (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

const addItems = (req, res) => {
    const { item_name, category, price, description,ownerId } = req.body;

    // Check if all required fields are provided
    if (!item_name || !category || !price || !description || !ownerId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate price to ensure it's a valid number
    if (isNaN(price) || parseFloat(price) <= 0) {
        return res.status(400).json({ error: 'Invalid price' });
    }

    // Sanitize inputs to prevent SQL injection
    const sql = 'INSERT INTO items (item_name, category, price, description, owner) VALUES (?, ?, ?, ?, ?)';
    const values = [item_name, category, price, description, ownerId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding item:', err);
            return res.status(500).json({ error: 'Failed to add item to the database' });
        }
        res.status(200).json({ result, msg: 'Added item to DB successfully' });
    });
};

const deleteItem = (req, res) => {
    const { id } = req.params;
 
    if (!id) {
      return res.status(400).json({ error: "Missing Id parameter" });
    }
  
    const sql = "DELETE FROM items WHERE id = ?";
    const values = [id];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error deleting item:", err);
        return res
          .status(500)
          .json({ error: "Failed to delete item from the database" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "item not found" });
      }
  
      res.status(200).json({ msg: "item deleted successfully" });
    });
  };

const editItems = (req, res) => {
    const { id } = req.params;
    const { item_name, category, price, description } = req.body;
    const values = [item_name, category, price, description];

    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    const sql = 'UPDATE item SET item_name = ?, category = ?, price = ?, description = ? WHERE id = ?';

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ error: 'Failed to update item details' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'item not found' });
        }

        res.status(200).json({ message: 'item details updated successfully' });
    });
};



module.exports = {
    getItems,
    addItems,
    getItem,
    editItems,
    deleteItem
};