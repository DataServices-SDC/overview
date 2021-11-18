const express = require('express');
const morgan = require("morgan");
const port = 3000;
const db = require('./db');
// const bodyParser = require('body-parser')//pool

// const path = require('path');

var app = express();

//from tutorial making a pool(bookmarked in SDC)
// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )


app.use(express.json());
// app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`👂 listening at http://localhost:${port}`)
});

module.exports = app;