const {Pool} = require('pg');
const sdc = new Pool({
  user: "johndoe",
  database: "sdc",
  port: 5432
});

const queries = {};

queries.getProducts = (req) => {
  var limit=5;
  if(req.query.count){
    limit=req.query.count;
  }
  const response = sdc.query(`select * from products limit ${limit}`);
  return response;
};
// Planning Time: 0.066 ms
// Execution Time: 0.025 ms

queries.getProductByID = (req) => {
  const productID=req.params.product_id;
  const response = sdc.query(`select * from products left outer join features on products.id = features.product_id where products.id = '${productID}'`);
  return response;
};
// Planning Time: 0.273 ms
//Execution Time: 210.992 ms

//after adding index:
//Planning Time: 0.619 ms
//Execution Time: 1.252 ms

queries.getStyles = (req) => {
  const productID=req.params.product_id;
  const response=sdc.query(`select * from styles left outer join photos on styles.id = photos.styleId
  left outer join skus on styles.id = skus.styleId
  where styles.product_id='${productID}'`);
  return response;
};
//Planning Time: 1.422 ms
//Execution Time: 2395.082 ms

//after adding index:
//Planning Time: 5.127 ms
//Execution Time: 1.948 ms

queries.getRelated = (req) => {
  const productID=req.params.product_id;
  const response=sdc.query(`select * from related_products where related_products.current_product_id='${productID}'`);
  return response;
};
// Planning Time: 0.790 ms
// Execution Time: 628.284 ms

//after adding index:
// Planning Time: 2.279 ms
// Execution Time: 0.632 ms

module.exports = queries;