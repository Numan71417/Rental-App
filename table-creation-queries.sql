--  user 
 CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      merchant TINYINT(1) NOT NULL DEFAULT 0,
      name VARCHAR(125) NOT NULL,
      email VARCHAR(125) NOT NULL,
      password VARCHAR(255) NOT NULL,
      mobile VARCHAR(12) NOT NULL,
      photo TEXT
);

-- items 
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
);
  
-- rented
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
);