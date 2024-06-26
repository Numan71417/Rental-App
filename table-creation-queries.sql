--  user 
CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    isAdmin tinyint(1) DEFAULT 0,
    name VARCHAR(125) NOT NULL,
    email VARCHAR(125) NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(12) NOT NULL,
    location VARCHAR(12) NOT NULL,
    address TEXT,
    photo TEXT
);

-- items 
CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item_name VARCHAR(125) NOT NULL,
      branch INT NOT NULL,
      category VARCHAR(125) NOT NULL,
      price BIGINT(15) NOT NULL,
      description TEXT NOT NULL,
      photo TEXT NOT NULL,
      pic1 TEXT DEFAULT NULL,
      quantity INT NOT NULL,
      FOREIGN KEY (branch) REFERENCES branches(id) ON DELETE SET NULL
);
  
-- rented
CREATE TABLE IF NOT EXISTS rented (
      id INT AUTO_INCREMENT PRIMARY KEY,
      renter INT NOT NULL,
      time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      expire DATETIME DEFAULT NULL,
      item_id INT DEFAULT NULL,
      price BIGINT NOT NULL,
      days INT,
      FOREIGN KEY (renter) REFERENCES user(id),
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- payments
CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      renter INT NOT NULL,
      payment_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      item_id INT DEFAULT NULL,
      amount BIGINT NOT NULL,
      FOREIGN KEY (renter) REFERENCES user(id),
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- branches
CREATE TABLE IF NOT EXISTS branches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      location VARCHAR(20) NOT NULL,
      address TEXT NOT NULL
);