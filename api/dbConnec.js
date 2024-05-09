// dbConnec.js

const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

// Function to execute SQL queries to create tables
function createTables() {
  const createUserTableSQL = `
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      merchant TINYINT(1) NOT NULL DEFAULT 0,
      name VARCHAR(125) NOT NULL,
      email VARCHAR(125) NOT NULL,
      password VARCHAR(255) NOT NULL,
      mobile VARCHAR(12) NOT NULL,
      photo TEXT
    )
  `;
  
  const createItemsTableSQL = `
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item_name VARCHAR(125) NOT NULL,
      category VARCHAR(125) NOT NULL,
      price BIGINT(15) NOT NULL,
      description TEXT NOT NULL,
      photo TEXT NOT NULL,
      pic1 TEXT DEFAULT NULL,
      owner INT NOT NULL,
      FOREIGN KEY (owner) REFERENCES user(id)
    )
  `;
  
  const createRentedTableSQL = `
    CREATE TABLE IF NOT EXISTS rented (
      id INT AUTO_INCREMENT PRIMARY KEY,
      seller INT NOT NULL,
      renter INT NOT NULL,
      time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      expire DATETIME DEFAULT NULL,
      item_id INT DEFAULT NULL,
      FOREIGN KEY (seller) REFERENCES user(id),
      FOREIGN KEY (renter) REFERENCES user(id),
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    )
  `;
  
  connection.query(createUserTableSQL, (err) => {
    if (err) {
      console.error('Error creating user table: ' + err.stack);
      return;
    }
    console.log('User table created');
  });
  
  connection.query(createItemsTableSQL, (err) => {
    if (err) {
      console.error('Error creating items table: ' + err.stack);
      return;
    }
    console.log('Items table created');
  });
  
  connection.query(createRentedTableSQL, (err) => {
    if (err) {
      console.error('Error creating rented table: ' + err.stack);
      return;
    }
    console.log('Rented table created');
  });
}




process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });

module.exports = connection;
