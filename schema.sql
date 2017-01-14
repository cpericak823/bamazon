CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INT(11) auto_increment NOT NULL,
product_name VARCHAR (250) NOT NULL,
department_name VARCHAR (250) NOT NULL,
price DECIMAL (10, 2) NOT NULL,
stock_quantity INT (11) NOT NULL,
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Canadian Goose Jacket", "Clothing", 600.00, 50),
("Ugg Boots", "Shoes", 150.25, 100),
("Northface Gloves", "Clothing", 24.99, 250),
("LuLu Lemon Leggings", "Clothing", 49.99, 75),
("Hot Hands", "Outdoor Recreation", 4.99, 1000),
("Snowblower", "Patio, Lawn, and Garden", 999.99, 25),
("Swiss Miss K Cups", "Grocery", 12.75, 500),
("EOS Lip Balm", "Beauty", 3.99, 125),
("Heated Blanket", "Home", 35.25, 30),
("Amazon Fire Stick", "Electronics", 50.75, 5000);

select * from products;