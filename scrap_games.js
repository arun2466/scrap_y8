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

saveGame = (tag_game_id, data, callback) => {
  let INSERTDATA = {
    tag_game_id: tag_game_id,
    name: data.name,
    description: data.description
  }
  console.log(INSERTDATA)
  insertMysql('games', INSERTDATA, (insertStatus, res) => {
    callback();
  })
}


scrapAllGames = ( games, callback ) => {
  console.log('\b\b***************************************************');
  console.log('Pending games to process for games :: ' + games.length);
  console.log('***************************************************');
  if( games.length == 0 ){
    callback();
  } else {
    row = games[0];
    games.splice(0, 1);
    let tag_game_id = row.id;
    let game_url = row.url
    console.log(tag_game_id + ' ----- '+ game_url)

    GENERIC.getHtml(game_url, (status, data) => {
      if (status == 'error') {
        scrapAllGames( games, callback);
      } else {
        let gameDetails = GENERIC.extractGameDetailsFromDom(data);
        if( gameDetails.name == ''){
          callback()
        }else{
          saveGame( tag_game_id, gameDetails, () => {
            updateTable('tag_games', {status_scrap:1}, {id: tag_game_id}, ( status, res) => {
              scrapAllGames( games, callback)
            })
          })
        }
      }
    })
  }
}

start = () => {
  selectMysql('tag_games', {status_scrap:0}, (status, res) => {
    if( status == false ){
      console.log('Some error occurs!!');
    } else{
      console.log('Pending to scrap - ' +  res.length );
      if( res.length == 0 ){
        console.log('0 games to process for games!!');
      }else{
        scrapAllGames( res, () => {
          console.log('All games are processed!!');
        })
      }
    }
  })
}

start();