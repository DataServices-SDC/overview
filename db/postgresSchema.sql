CREATE DATABASE productAPI;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT
);

CREATE TABLE related_products (
  id SERIAL PRIMARY KEY,
  current_product_id INT,
  related_product_id INT,
  CONSTRAINT fk_related_products_products FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT,
  feature VARCHAR,
  value VARCHAR,
  CONSTRAINT fk_features_products FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR,
  sale_price INT,
  original_price INT,
  default_style INT,
  CONSTRAINT fk_styles_products FOREIGN KEY (id) REFERENCES products(id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleId INT,
   url VARCHAR,
  thumbnail_url VARCHAR,
  CONSTRAINT fk_photos_styles FOREIGN KEY (id) REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INT,
  size VARCHAR,
  quantity INT,
  CONSTRAINT fk_skus_styles FOREIGN KEY (id) REFERENCES styles(id)
);
