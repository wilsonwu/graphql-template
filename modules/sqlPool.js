const mysql = require('mysql');

var sqlPool = mysql.createPool({
  multipleStatements: true,
  connectionLimit : 100,
  host            : process.env.DATABASE_HOST,
  user            : process.env.DATABASE_USER,
  password        : process.env.DATABASE_PASS,
  database        : process.env.DATABASE_NAME
});

module.exports = sqlPool;
