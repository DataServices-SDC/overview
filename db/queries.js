const { Pool, Client } = require('pg');
const $ = require( "jquery" );

const sdc = new Pool({
  user: "johndoe",
  database: "sdc",
  port: 5432
});

const dataQueries = {};

dataQueries.getProducts = () => {
  const response = sdc.query('select * from products limit 5');
  return response;
};

dataQueries.getFeaturesByID = (productID) => {
  // const response = sdc.query('select * from features limit 5');
  const response = sdc.query(`select feature, value from features where current_product_id=$(productID)`);
  return response;
};



module.exports = dataQueries;

var test=dataQueries.getFeaturesByID();
console.log(test);