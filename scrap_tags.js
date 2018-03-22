let {
  DB_CONNECTION
} = require('./dbconnection');

let {
  insertMysql
} = require('./mysql');

let GENERIC = require('./generic');

const url_tags = "http://www.y8.com/tags";

saveTags = (data, callback) => {
  if (data.length == 0) {
    callback('all are done')
  } else {
    row = data[0];
    data.splice(0, 1);
    let INSERTDATA = {
        name: row.name,
        url: row.url,
        status_scrap_games: row.status_scrap_games
      }
      insertMysql('tags', INSERTDATA, (insertStatus, res) => {
        saveTags(data, callback)
      })
  }
}

start = () => {
  GENERIC.getHtml(url_tags, (status, data) => {
    if (status == 'error') {
      callback();
    } else {
      let tagsList = GENERIC.extractTagsFromDom(data);
      if (tagsList.length > 0) {
        console.log('Tags found --- ' + tagsList.length )
        saveTags(tagsList, (msg) => {
          console.log('All tags inserted!!')
          process.exit(0);
        })
      } else {
        console.log('tags list is empty!!')
        process.exit(0);
      }
    }
  })

}

start();