const express = require('express');
const morgan = require("morgan");
const NodeCache = require( "node-cache" );
const compression = require('compression');
const db = require('./db/queries.js');
const port = 3000;
var app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(compression({level: 6}));
app.use(express.static('public'));

const myCache = new NodeCache({stdTTL: 100});

app.get('/test', (req, res)=>{
  console.log('initial get req');
  res.send('Hi!');
});

//gets all products
app.get('/products', (req, res) => {
  return db.getProducts(req)
    .then(results => res.status(200).send(results.rows))
    .catch(err => res.status(500).send(err))
});

//gets product by id
app.get('/products/:product_id', (req, res) => {
   var {product_id}=req.params;
   if(myCache.has(product_id)){
     res.status(200).send(myCache.get(product_id));
     return;
   }

  return db.getProductByID(req)
    .then(results =>{
      var response={};
      var features=[];
      for(var i=0; i<results.rows.length; i++){
        var featureObj={
          'feature': results.rows[i].feature,
          'value': results.rows[i].value
        };
        features.push(featureObj);
      }
       response['id'] = results.rows[0]['product_id'];
       response['name'] = results.rows[0]['name']
       response['slogan'] = results.rows[0]['slogan'];
       response['description'] = results.rows[0]['description'];
       response['category'] = results.rows[0]['category'];
       response['default_price'] = results.rows[0]['default_price'];
       response['features'] = features;

       myCache.set(product_id, response)
       return response;
    })
    .then(response =>
      res.status(200).send(response))
    .catch(err => res.status(500).send(err))
});

//gets all styles for given product
app.get('/products/:product_id/styles', (req, res) => {
  var { product_id } = req.params;
  if (myCache.has(product_id + ' styles')) {
    res.status(200).send(myCache.get(product_id + ' styles'));
    return;
  }

  return db.getStyles(req)
  .then(results => {
    var rows=results.rows;
    var response={};
    var results=[];
    response['product_id']=rows[0]['product_id'];
    response['results']=results;

    //photos for each styleId
    var photoStorage={};
    for (var i = 0; i < rows.length; i++) {
      if (!photoStorage[rows[i]['styleid']]) {
        photoStorage[rows[i]['styleid']] = [{'thumbnail_url': rows[i]['thumbnail_url'], 'url': rows[i]['url']}];
      } else {
        if (JSON.stringify([{'thumbnail_url': rows[i]['thumbnail_url'], 'url': rows[i]['url']}])
         !==
         JSON.stringify([{'thumbnail_url': rows[i-1]['thumbnail_url'], 'url': rows[i-1]['url']}])
         ){
          photoStorage[rows[i]['styleid']].push({'thumbnail_url': rows[i]['thumbnail_url'], 'url': rows[i]['url']})
        }
      }
    }
    //skus for each styleId
    var skusStorage={};
    for (let i = 0; i < rows.length; i++) {
      if (!skusStorage[rows[i]['styleid']]) {
        skusStorage[rows[i]['styleid']] = [{[rows[i]['id']] : {
          'quantity': rows[i]['quantity'],
          'size': rows[i]['size']
        }}]
      } else {
        if (!skusStorage[rows[i]['styleid']][rows[i]['id']]) {
          skusStorage[rows[i]['styleid']].push({[rows[i]['id']] : {
            'quantity': rows[i]['quantity'],
            'size': rows[i]['size']}
          })
        }
      }
    }

    var checkStyleId = [];
    for (var i=0; i<rows.length; i++){
      if(checkStyleId.includes(rows[i]['styleid'])){
        continue;
      } else {
        checkStyleId.push(rows[i]['styleid']);
        var resultsObj={};
        resultsObj['style_id']=rows[i]['styleid'];
        resultsObj['name']=rows[i]['name'];
        resultsObj['original_price']=rows[i]['original_price'];
        resultsObj['sale_price']=rows[i]['sale_price'];
        resultsObj['default']=rows[i]['default'];
        resultsObj['photos']=photoStorage[rows[i]['styleid']];
        var currentSkusArr=skusStorage[rows[i]['styleid']];
        var skusTransformedObj={};
        for(var i=0;i<currentSkusArr.length;i++){
          skusTransformedObj[Object.keys(currentSkusArr[i])[0]]=currentSkusArr[i][Object.keys(currentSkusArr[i])[0]];
        }
        resultsObj['skus']=skusTransformedObj;
        results.push(resultsObj);
      }
    }
    myCache.set(product_id+ ' styles', response);
    return response;
  })
  .then(response => res.status(200).send(response))
  .catch(err => res.status(500).send(err))
});

//gets id's of related products for a given product
app.get('/products/:product_id/related', (req, res) => {
  var { product_id } = req.params;
  if(myCache.has(product_id+' related')){
    res.status(200).send(myCache.get(product_id+' related'));
    return;
  }

  return db.getRelated(req)
    .then(results => {
      var response=[];
      for (var i=0; i<results.rows.length; i++){
        var row = results.rows[i];
        response.push(row['related_product_id'])
      }
      myCache.set(product_id+' related', response)
      return response;
      })
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err))
});



app.listen(port, () => {
  console.log(`👂 listening at http://localhost:${port}`)
});

module.exports = app;
