const Yelp = require('yelpv3');

const yelp = new Yelp({
  app_id: process.env.YELP_APP_ID,
  app_secret: process.env.YELP_APP_SECRET
})

module.exports = {
  fetch: function(queryWithFilters) {
    let searchObj = {
      term: 'attractions',
      location: queryWithFilters.query,
      limit: 20
    };

    return new Promise(function(resolve, reject) {
      yelp.search(searchObj).then(data => resolve(data))
      .catch(err => reject(err));
    });
  }
};
