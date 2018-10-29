DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0 NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
    ON DELETE CASCADE
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("women's", 12.00),
("men's", 5.00),
("accessories", 2.00);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES ('lime green sequin hoodie', 1, '100.50', '151'), 
('purple polka dot overalls', 2, '79.99', '10'),
('red and white striped tall hat', 3, '25.05', '50'),
('\'I love chihuahuas\' tee', 2, '49.99', '147'),
('\'code lyfe\' tee', 1, '38.72', '100'),
('classy monocle', 3, '89.16', '6'),
('zebra print cowboy boots', 2, '1000.01', '1'),
('regular monocle', 3, '39.99', '51'),
('fur bell bottoms', 1, '9999.10', '2'),
('\'classy\' monocle t-shirt', 2, '88.00', '16');

