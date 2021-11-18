const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'product_api',
  password: 'password',
  port: 5432,
});