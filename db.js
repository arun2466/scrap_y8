let {
  DATABASE_NAME
} = require('./constants');
let {
  CONNECTION
} = require('./dbconnection');

var checkDB = `SHOW DATABASES LIKE '${DATABASE_NAME}'`;
var q = `
  CREATE DATABASE ${DATABASE_NAME};
  use ${DATABASE_NAME};
  CREATE TABLE tags (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    url varchar(255),
    status_scrap_games int,
    PRIMARY KEY (id) );
`;

CONNECTION.query(checkDB, function(err, results) {
  if (err) {
    console.log('Error occurs')
    console.log(err)
  } else {
    if (results.length > 0) {
      console.log('db already exists')
      process.exit();
    } else {
      CONNECTION.query(q, function(err, results) {
        if (err) {
          console.log(err)
          process.exit();
        } else {
          console.log('db created!!!')
          process.exit();
        }
      });
    }
  }
});