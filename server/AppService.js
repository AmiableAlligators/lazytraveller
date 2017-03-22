const citygrid = require('./api/citygrid');
const yelp = require('./api/yelp');
const _ = require('underscore');
const priceBased = require('./optimizaion/price');

const priceLimit = 4; // hard coded for now, this should be a number from 1 to 4

let apis = [
  citygrid,
  yelp
];

let unique = array => _.uniq(_.flatten(array), obj => obj.name);

/**
 * @queryWithFilters is an Object with structure:
 * {
 *   query: String, what the user is searching for,
 *   filters: Array, of filter-ids
 * }
 */
const AppService = {
  find: function(queryWithFilters) {
    let fetches = apis.map(func => {
      return func.fetch(queryWithFilters);
    });

    return Promise.all(fetches)
    .then(apiResults => {
      return new Promise((resolve, reject) => {
        // resolve(priceBased(unique(apiResults), priceLimitation)); // for testing
        resolve(unique(apiResults));
      });
    })
    .catch(error => console.error(error));
  }
};

module.exports = AppService;
