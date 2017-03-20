const citygrid = require('./api/citygrid');
// const yelplibrary = require('./api/yelplibrary');

let libs = [
  citygrid
  // yelplibrary
];

const AppService = {
  find: function(queryObject) {
    let fetches = libs.map(func => {
      return func.fetch(queryObject);
    });

    return Promise.all(fetches);
  },
};

module.exports = AppService;
