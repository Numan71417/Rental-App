// controllers/rented.js

const connection = require("../dbConnec");
const {addPayment} = require("./payment")

const getRented = (req, res) => {

  const sql = `
    SELECT rented.*,       
           items.item_name AS item_name,
           items.price AS item_price,
           items.category AS item_category,
           items.description AS item_desc,
           items.photo AS item_img,
           items.quantity AS quantity,
           items.branch AS branch,
           items.pic1 AS item_otherimg,
           user.name As renter_name
    FROM rented 
    INNER JOIN items ON rented.item_id = items.id
    INNER JOIN user ON rented.renter = user.id
    
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
           items.item_name AS item_name,
           items.price AS item_price,
           items.category AS item_category,
           items.description AS item_desc,
           items.photo AS item_img,
           items.quantity AS quantity,
           items.branch AS branch,
           items.pic1 AS item_otherimg
      FROM rented 
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
  const { renter, item_id, expire, price, days } = req.body;

  // Check if all required fields are provided
  if ( !price || !renter || !item_id || !expire) {
    return res.status(400).json({ error: "Missing required fields" });
  }


  const sql =
    "INSERT INTO rented (renter, item_id, expire, price, days) VALUES (?, ?, ?, ?,?)";
  const values = [renter, item_id, expire, price,days];
  
  const val = { renter, item_id, amount:price };
  const payStatus =  addPayment(val);

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding item:", err);
      return res
        .status(500)
        .json({ error: "Failed to add item to the database" });
    }
    
    res.status(200).json({ result, payStatus, msg: "Added item to DB successfully" });
  });
};

const deleteRental = (req, res) => {
  const { rental_id } = req.params;

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
