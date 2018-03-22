var mysql = require('mysql');

let {
  DB_CONNECTION
} = require('./dbconnection');

insertMysql = (table, row, callback) => {
  let sql = `insert into ${table} set ?`;
  sql = mysql.format(sql, row);
  DB_CONNECTION.query(sql, function(err, res) {
    if (err) {
      callback(false, err)
    } else {
      callback(true, res)
    }
  });
}

module.exports = {
  insertMysql
}