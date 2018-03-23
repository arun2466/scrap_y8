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

  CREATE TABLE tag_games (
    id int NOT NULL AUTO_INCREMENT,
    tag_id int,
    name varchar(255),
    rating varchar(255),
    plays varchar(255),
    url varchar(255),
    status_scrap int,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_id) REFERENCES tags(id));

  CREATE TABLE games (
    id int NOT NULL AUTO_INCREMENT,
    tag_game_id int,
    name varchar(255),
    description text,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_game_id) REFERENCES tag_games(id));
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