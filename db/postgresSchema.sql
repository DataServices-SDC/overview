CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT
);

CREATE TABLE related_products (
  id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);

CREATE TABLE features (
  id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR,
  value VARCHAR
);

CREATE TABLE styles (
  id INT PRIMARY KEY,
  product_id INT,
  name VARCHAR,
  sale_price VARCHAR,
  original_price INT,
  default_style INT
);

CREATE TABLE photos (
  id INT PRIMARY KEY,
  styleId INT,
  url VARCHAR,
  thumbnail_url VARCHAR
);

CREATE TABLE skus (
  id INT PRIMARY KEY,
  styleId INT,
  size VARCHAR,
  quantity INT
);
