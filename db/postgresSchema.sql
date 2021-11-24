-- run in postgres terminal, then close
-- DROP DATABASE IF EXISTS sdc;
-- DROP DATABASE sdc WITH (FORCE);
-- CREATE DATABASE sdc;

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
-- CREATE INDEX idx_related_products
-- ON related_products(current_product_id);

-- CONSTRAINT fk_related_products_products
 -- FOREIGN KEY (current_product_id) REFERENCES products(id)

CREATE TABLE features (
  id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR,
  value VARCHAR
);
-- CREATE INDEX idx_product_features
-- ON features(product_id);

-- CONSTRAINT fk_features_products FOREIGN KEY (id) REFERENCES products(id)

CREATE TABLE styles (
  id INT PRIMARY KEY,
  product_id INT,
  name VARCHAR,
  sale_price VARCHAR,
  -- changed sale_price text to varchar, need to reload and copy data
  original_price INT,
  default_style INT
);
-- CREATE INDEX idx_product_styles
-- ON styles(product_id);

  -- CONSTRAINT fk_styles_products FOREIGN KEY (id) REFERENCES products(id)

CREATE TABLE photos (
  id INT PRIMARY KEY,
  styleId INT,
  url VARCHAR,
  thumbnail_url VARCHAR
);
-- CREATE INDEX idx_photo_style
-- ON photos(styleId);

  -- CONSTRAINT fk_photos_styles FOREIGN KEY (id) REFERENCES styles(id)

CREATE TABLE skus (
  id INT PRIMARY KEY,
  styleId INT,
  size VARCHAR,
  quantity INT
);
CREATE INDEX idx_sku_style
ON skus(styleId);

-- CONSTRAINT fk_skus_styles FOREIGN KEY (id) REFERENCES styles(id)

-- copy statements--
-- COPY products FROM '/Users/johndoe/sdc/product/productData/product.csv' DELIMITER ',' CSV HEADER;
-- COPY related_products FROM '/Users/johndoe/sdc/product/productData/related.csv' DELIMITER ',' CSV HEADER;
-- COPY features FROM '/Users/johndoe/sdc/product/productData/features.csv' DELIMITER ',' CSV HEADER;
-- COPY styles FROM '/Users/johndoe/sdc/product/productData/styles.csv' DELIMITER ',' CSV HEADER;
-- COPY photos FROM '/Users/johndoe/sdc/product/productData/photos.csv' DELIMITER ',' CSV HEADER;
-- COPY skus FROM '/Users/johndoe/sdc/product/productData/skus.csv' DELIMITER ',' CSV HEADER;\dt






