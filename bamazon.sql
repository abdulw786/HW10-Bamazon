DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);
INSERT INTO products (name,department, price, quantity)l
VALUES ("Iphone7","Electronics", 250, 4),
("Sony TV","Electronics", 150, 10),
("Soccer balls","Sports", 10, 200),
("Soccer shoes","Sports", 25, 100),
("Pizza","Foot", 2.50, 100),
("Fish","Foot", 2.50, 100),
("Chicken","Foot", 2.50, 500),
("Italian Bread","Foot", 2.50, 100),
("Bean Pasta","Foot", 2.50, 100),
("Suger-free Snacks","Foot", 2.50, 500);

