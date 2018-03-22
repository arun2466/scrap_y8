let CONSTANTS = require('./constants');
let mysql = require('mysql');

let CONNECTION = mysql.createConnection({
  host: '127.0.0.1',
  user: CONSTANTS.DATABASE_USER,
  password: CONSTANTS.DATABASE_PASSWORD,
  multipleStatements: true
});

let DB_CONNECTION = mysql.createConnection({
  host: '127.0.0.1',
  user: CONSTANTS.DATABASE_USER,
  password: CONSTANTS.DATABASE_PASSWORD,
  database: CONSTANTS.DATABASE_NAME
});

module.exports = {
  CONNECTION,
  DB_CONNECTION
}