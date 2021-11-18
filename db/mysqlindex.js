const mysql = require('mysql2');

const connection = mysql.createConnection({
  // host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_api'
});

connection.connect(function(err){
  if(err){
    console.log ('error: '+ err.message);
    return;
  } else {
    console.log('connected to the mysql server as id '+connection.threadId);
  }
});

module.exports = connection;