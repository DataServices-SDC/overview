const express = require('express');
const morgan = require("morgan");
const db = require('./db/queries.js');
const port = 3000;
// const path = require('path');
var app = express();
app.use(express.json());
// app.use(morgan("dev"));

app.get('/products', (req, res) => {
  return db.getProducts()
    .then(
      console.log('successful getProducts req'))
      .then(
      results => res.status(200).send(results.rows))
    .catch(err => console.log('error at getProducts req: ', err))
});


//testing getting features
app.get('/products/:product_id/features', (req, res) => {
  var paramters=req.params;
  return db.getFeaturesByID(paramters.product_id)
    .then(
      console.log('successful getFeaturesByID req'))
      .then(
      results => res.status(200).send(results.rows))
    .catch(err => console.log('error at getFeaturesByID req: ', err))
});

// app.get('/', (req, res) => {
//   res.send('Server up!')
// });

app.listen(port, () => {
  console.log(`👂 listening at http://localhost:${port}`)
});

module.exports = app;