const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

module.exports = {
  fetch: function(queryWithFilters) {
    var search = {
      where: queryWithFilters.query.split(' ').join('%20'),
      type: 'attractions',
      sort: 'highestrated'
    };

    return new Promise (function(resolve, reject) {
      let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?type=${search.type}&where=${search.where}&what=places%20to%20visit%20&sort=${search.sort}&format=json&publisher=${process.env.CITYGRID_PUBLISHER}`;
      request(requestString, function(error, response) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          // console.log('a response-----',response.body);
          resolve(response.body);
        }
      });
    });
  }
}
