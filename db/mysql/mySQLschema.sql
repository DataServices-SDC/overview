DROP DATABASE IF EXISTS product_id ;
CREATE DATABASE product_api;
use product_api;

CREATE TABLE products (
  id INT,
  name VARCHAR(30),
  slogan VARCHAR(150),
  description VARCHAR(300),
  category VARCHAR(30),
  default_price INT
);
-- PRIMARY KEY (id)

CREATE TABLE related_products (
  id INT,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY (id)
);
-- FOREIGN KEY (current_product_id) REFERENCES products(id)

CREATE TABLE features (
  id INT,
  product_id INT,
  feature VARCHAR(50),
  value VARCHAR(50),
  PRIMARY KEY (id)
);
-- FOREIGN KEY (product_id) REFERENCES products(id)

CREATE TABLE styles (
  id INT,
  productID INT,
  name VARCHAR(100),
  sale_price TEXT,
  original_price INT,
  default_style INT,
  PRIMARY KEY (id)
);
-- FOREIGN KEY (productID) REFERENCES products(id)

CREATE TABLE photos (
  id INT,
  styleID INT,
  url VARCHAR(100),
  thumbnail_url VARCHAR(100),
  PRIMARY KEY (id)
);
-- FOREIGN KEY (styleID) REFERENCES styles(id)

CREATE TABLE skus (
  id INT,
  styleID INT,
  size VARCHAR(30),
  quantity INT,
  PRIMARY KEY (id)
);
-- FOREIGN KEY (styleID) REFERENCES styles(id)


-- load data statements
-- LOAD DATA LOCAL INFILE '/Users/johndoe/sdc/product/productData/product.csv' INTO TABLE products FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, name, slogan, description, category, default_price);

