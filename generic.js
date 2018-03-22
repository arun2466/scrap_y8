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

module.exports = {
  getHtml,
  extractTagsFromDom
}