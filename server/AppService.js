const citygrid = require('./api/citygrid');
// const yelplibrary = require('./api/yelplibrary');

let apis = [
  citygrid
  // yelplibrary
];

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

    return Promise.all(fetches);
  }
};

module.exports = AppService;
