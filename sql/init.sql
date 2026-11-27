CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Keyboard', 150000),
  ('Mouse', 75000),
  ('Monitor', 1200000);
