let request = require("request");
let cheerio = require('cheerio');

getHtml = (url, callback) => {
  console.log('getHtml will run in 3 seconds!!');
  setTimeout(() => {
    request(url, function(error, response, body) {
      if (!error) {
        callback('success', body);
      } else {
        callback('error', body)
      }
    });
  }, 3000);
}

extractTagsFromDom = (body) => {
  let tags = [];
  jQuery = cheerio.load(body);
  if (jQuery('#items_container').find('li').find('a.tag').length > 0) {
    jQuery('#items_container').find('li').find('a.tag').each(function() {
      let tag_name = jQuery(this).attr('title');
      let tag_url = 'http://www.y8.com' + jQuery(this).attr('href');
      let row = {
        name: tag_name,
        url : tag_url,
        status_scrap_games: 0
      }
      tags.push(row);
    })
  }
  return tags;
}

extractGamesFromDom = (body) => {
  let games = [];
  jQuery = cheerio.load(body);
  if (jQuery('#items_container').find('div.videobox').length > 0) {
    jQuery('#items_container').find('div.videobox').each(function() {
      let game_name = jQuery(this).find('.title').text();
      let game_rating = jQuery(this).find('p.rating').find('span.number').text();
      let game_plays = jQuery(this).find('p.plays-count').text();
      let game_url = 'http://www.y8.com' + jQuery(this).find('div.thumbarea').find('a').attr('href');
      let row = {
        name: game_name ? game_name.trim() : '',
        rating: game_rating ? game_rating.trim() : '',
        plays: game_plays ? game_plays.trim() : '',
        url: game_url ? game_url.trim() : ''
      }
      games.push(row);
    })
  }
  return games;
}

extractGameDetailsFromDom = (body) => {
  let games = [];
  jQuery = cheerio.load(body);

  let name = '';
  let description = '';

  if (jQuery('#details').find('h1').length > 0) {
    name = jQuery('#details').find('h1').text();
  }
  if (jQuery('p[itemprop="description"]').length > 0) {
    description = jQuery('p[itemprop="description"]').text();
  }

  let game = {
    name : name ? name.trim() : '',
    description : description ? description.trim() : ''
  }
  return game;
}

module.exports = {
  getHtml,
  extractTagsFromDom,
  extractGamesFromDom,
  extractGameDetailsFromDom
}