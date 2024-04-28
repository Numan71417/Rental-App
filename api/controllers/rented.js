// controllers/rented.js

const connection = require("../dbConnec");

const getRented = (req, res) => {
  // const sql = 'SELECT * FROM rented';
  const sql = `
    SELECT rented.*, 
           seller.name AS seller_name, 
           renter.name AS renter_name, 
           items.item_name AS item_name,
           items.price AS item_price,
           items.category AS item_category,
           items.description AS item_desc,
           items.image AS item_img,
           items.other_image AS item_otherimg
    FROM rented 
    INNER JOIN user AS seller ON rented.seller = seller.id 
    INNER JOIN user AS renter ON rented.renter = renter.id 
    INNER JOIN items ON rented.item_id = items.id
    
`;


  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error", err);
      return res.status(500).json(err);
    }
    res.status(200).json(result);
  });
};

const getSingleRented = (req, res) => {
  const { id } = req.params;

  const sql = `
      SELECT rented.*, 
             seller.name AS seller_name, 
             renter.name AS renter_name, 
             items.item_name AS item_name,
             items.price AS item_price,
             items.category AS item_category,
             items.description AS item_desc,
             items.image AS item_img,
             items.other_image AS item_otherimg
      FROM rented 
      INNER JOIN user AS seller ON rented.seller = seller.id 
      INNER JOIN user AS renter ON rented.renter = renter.id 
      INNER JOIN items ON rented.item_id = items.id
      WHERE rented.id = ?
  `;

  connection.query(sql, [id], (err, result) => {
      if (err) {
          console.error("Error:", err);
          return res.status(500).json({ error: "Failed to retrieve rented item from the database" });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: "Rented item not found" });
      }
      res.status(200).json(result[0]); 
  });
};


const addRental = (req, res) => {
  const {  seller, renter, item_id } = req.body;

  // Check if all required fields are provided
  if ( !seller || !renter || !item_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (seller === renter) {
    return res.status(400).json({ error: "You cannot rent your own product" });
  }

  const sql =
    "INSERT INTO rented (seller, renter, item_id) VALUES (?, ?, ?)";
  const values = [seller, renter, item_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding item:", err);
      return res
        .status(500)
        .json({ error: "Failed to add item to the database" });
    }
    res.status(200).json({ result, msg: "Added item to DB successfully" });
  });
};

const deleteRental = (req, res) => {
  const { rental_id } = req.params;

  // Check if rentalId is provided
  if (!rental_id) {
    return res.status(400).json({ error: "Missing rentalId parameter" });
  }

  const sql = "DELETE FROM rented WHERE id = ?";
  const values = [rental_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error deleting rental:", err);
      return res
        .status(500)
        .json({ error: "Failed to delete rental from the database" });
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rental not found" });
    }

    res.status(200).json({ msg: "Rental deleted successfully" });
  });
};

module.exports = {
  getRented,
  addRental,
  deleteRental,
  getSingleRented
};
