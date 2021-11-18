CREATE DATABASE product_api;

use product_api;

CREATE TABLE products (
  product_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  slogan VARCHAR(150),
  description VARCHAR(300),
  category VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE related_products (
  id INT NOT NULL AUTO_INCREMENT,
  related_products VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE features (
  id INT NOT NULL AUTO_INCREMENT,
  feature VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE styles (
  styles_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  original_price INT,
  sales_price INT,
  default? VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  thumbnail_url VARCHAR(100),
  url VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (styles_id) REFERENCES styles(styles_id)
);

CREATE TABLE skus (
  id INT NOT NULL AUTO_INCREMENT,
  quantity VARCHAR(30),
  size INT,
  PRIMARY KEY (id),
  FOREIGN KEY (styles_id) REFERENCES styles(styles_id)
);
