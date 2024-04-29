// controllers/users.js

const connection = require("../dbConnec");

const getUsers = (req, res) => {
    const sql = 'SELECT * FROM user';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        // console.log(result)
        res.status(200).json(result);
    });
};

const getUser = (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM user WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error', err);
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
  
    // Check if id is provided
    if (!id) {
      return res.status(400).json({ error: "Missing Id parameter" });
    }
  
    const sql = "DELETE FROM user WHERE id = ?";
    const values = [id];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res
          .status(500)
          .json({ error: "Failed to delete user from the database" });
      }
  
      // Check if any rows were affected by the delete operation
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "user not found" });
      }
  
      res.status(200).json({ msg: "user deleted successfully" });
    });
  };

const editUser = (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, photo } = req.body;

    // Check if id is provided
    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }


    const sql = 'UPDATE user SET name = ?, email = ?, mobile = ?, photo = ? WHERE id = ?';

    connection.query(sql, [name, email, mobile, photo, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Failed to update user details' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User details updated successfully' });
    });
};


const merchantAccount = (req, res) => {
    const { id } = req.params;
    var { merchant } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }


    const sql = 'UPDATE user SET merchant = ? WHERE id = ?';

    connection.query(sql, [merchant, id], (err, result) => {
        if (err) {
            console.error('Error updating to merchant:', err);
            return res.status(500).json({ error: 'Failed to update merchant' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User merchant details updated successfully' });
    });
};



module.exports = {
    getUsers,
    getUser,
    deleteUser,
    editUser,
    merchantAccount
};