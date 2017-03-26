const citygrid = require('./api/citygrid');
const yelp = require('./api/yelp');
const _ = require('underscore');
const priceBased = require('./optimization/price');
const Activities = require('./db/Activities.js');
const asyncMap = require('async/map');

const priceLimit = 4; // hard coded for now, this should be a number from 1 to 4

let apis = [
  citygrid,
  yelp
];

// let filter = array => _.uniq(_.flatten(array), obj => obj.name);

let filter = (array) => (
  _.chain(array)
  .flatten()
  .uniq(obj => obj.name)
  .filter(obj => obj.image.length >= 5) 
  .sortBy(function(obj){ return -obj.rating })
  .first(10)
  .value()
);

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
          console.log(filter(apiResults), "%%%");
          asyncMap(filter(apiResults), 
            (item, transformed) => {
              let query = {
                name: item.name,
                'address.city': item.address.city
              }
              Activities.findAndUpdate(query, item, function(insertResult) {
                item._id = insertResult._id; 
                transformed(null, item);
              });   
            },
            (err, results) => {
              resolve(results);
            }
          );
        });
      })
      .catch(error => console.error(error)); 
  }
};

module.exports = AppService;
