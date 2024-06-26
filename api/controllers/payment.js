// controllers/rented.js

const connection = require("../dbConnec");

const getPayment = (req, res) => {

  const sql = `
    SELECT payments.*,       
           items.item_name AS item_name,
           items.price AS item_price,
           items.category AS item_category,
           items.description AS item_desc,
           items.photo AS item_img,
           items.quantity AS quantity,
           items.branch AS branch,
           items.pic1 AS item_otherimg,
           user.name AS user_name,
           user.address AS user_address,
           user.mobile AS user_mobile
    FROM rented 
    INNER JOIN items ON payments.item_id = items.id
    INNER JOIN user ON payments.renter = user.id
    
`;


  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error", err);
      return res.status(500).json(err);
    }
    res.status(200).json(result);
  });
};

const getSinglePayment = (req, res) => {
  const { id } = req.params;

  const sql = `
      SELECT payments.*,       
           items.item_name AS item_name,
           items.price AS item_price,
           items.category AS item_category,
           items.description AS item_desc,
           items.photo AS item_img,
           items.quantity AS quantity,
           items.branch AS branch,
           items.pic1 AS item_otherimg,
           user.name AS user_name,
           user.address AS user_address,
           user.mobile AS user_mobile,
           rented.days AS item_days
    FROM payments 
    INNER JOIN items ON payments.item_id = items.id
    INNER JOIN user ON payments.renter = user.id
    INNER JOIN rented ON payments.item_id = rented.item_id
    
    WHERE payments.renter = ?
    WHERE payments.item_id = items.id
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


const addPayment = (val) => {
  const { renter, item_id, amount } = val;

  // Check if all required fields are provided
  if ( !amount || !renter || !item_id ) {
    return { error: "Missing required fields" };
  }

  const sql =
    "INSERT INTO payments (renter, item_id, amount) VALUES (?, ?, ?)";
  const values = [renter, item_id, amount];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding item:", err);
      return { error: "Failed to add item to the database" };
    }
    return { result, msg: "Payment Successful" };
  });
};



module.exports = {
  getPayment,
  addPayment,
  getSinglePayment
};
