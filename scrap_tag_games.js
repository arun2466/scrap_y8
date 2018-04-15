let {
  DB_CONNECTION
} = require('./dbconnection');

let {
  insertMysql,
  selectMysql,
  updateTable
} = require('./mysql');

let GENERIC = require('./generic');

const url_tags = "http://www.y8.com/tags";

saveGames = (tagid, data, callback) => {
  if (data.length == 0) {
    callback('all are done')
  } else {
    row = data[0];
    data.splice(0, 1);

    selectMysql('games', {name: row.name, url: row.url }, (status, res) => {
      if( status == false ){
        console.log('tag Game is already exist!!.. skipping insertion');
        saveGames(tagid, data, callback)
      } else{
        let INSERTDATA = {
          tag_id: tagid,
          name: row.name,
          rating: row.rating,
          plays: row.plays,
          url: row.url,
          status_scrap: 0
        }
        // console.log(INSERTDATA)
        insertMysql('tag_games', INSERTDATA, (insertStatus, res) => {
          saveGames(tagid, data, callback)
        })
      }
    })
  }
}


scrapTagsPaginationUrls = ( tag, urls, callback ) => {
  console.log( 'Pending pagination urls ----------------------------------------------------- ' + urls.length);
  if( urls.length == 0 ){
    callback();
  }else{
    url = urls[0];
    urls.splice(0,1);
    console.log( 'Scraping url --- ' + tag.id + ' ---- ' + tag.name + ' ---- ' + url )
    GENERIC.getHtml(url, (status, data) => {
      if (status == 'error') {
        scrapTagsPaginationUrls( tag, urls, callback )
      } else {
        let gamesList = GENERIC.extractGamesFromDom(data);
        console.log( 'games found :: ' + gamesList.length );
        if( gamesList.length == 0 ){
          callback(); // no more games
        } else {
          saveGames( tag.id, gamesList, () => {
            scrapTagsPaginationUrls( tag, urls, callback )
          })
        }
      }
    })
  }
}


scrapAllGames = ( tags, callback ) => {
  console.log('\b\b***************************************************');
  console.log('Pending tags to process for games :: ' + tags.length);
  console.log('***************************************************');
  if( tags.length == 0 ){
    callback();
  } else {
    row = tags[0];
    tags.splice(0, 1);
    let tag_id = row.id;
    let tag_url = row.url
    console.log(tag_id + ' ----- '+ tag_url)
    let pagesUrl = [];
    pagesUrl.push(tag_url);
    for( i = 2; i <= 100; i++ ){
      let u = tag_url+'?page='+i;
      pagesUrl.push(u);
    }
    scrapTagsPaginationUrls( row, pagesUrl, () => {
      // once a tag is process change its status_scrap_games to 1
      updateTable('tags', {status_scrap_games:1}, {id: tag_id}, ( status, res) => {
        scrapAllGames( tags, callback)
      })
    })
  }
}

start = () => {
  selectMysql('tags', {status_scrap_games:0}, (status, res) => {
    if( status == false ){
      console.log('Some error occurs!!');
    } else{
      console.log('Pending to scrap - ' +  res.length );
      if( res.length == 0 ){
        console.log('0 tags to process for games!!');
      }else{
        scrapAllGames( res, () => {
          console.log('All tags are processed!!');
        })
      }
    }
  })
}

start();